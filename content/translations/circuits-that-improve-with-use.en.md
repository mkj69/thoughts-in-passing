---
title: "Can an Existing Model Strengthen Its Circuits Through Use?"
slug: "circuits-that-improve-with-use"
language: "en"
excerpt: "Can repeated experience improve the computations already inside a model? Five approaches to editing existing weights, grounded in circuit localization and a testable goal: less repeated reasoning without sacrificing quality."
---

A model has solved many similar problems. The inputs change, but some computations recur: recognize a relation, apply a few rules, compare two results, and make a decision. On the next problem of the same kind, it may still generate a long chain of reasoning from the beginning.

Could those experiences directly change the computations already inside the model, so that it handles similar tasks more reliably and with less effort?

The object of study here is the original model. Its architecture stays the same, the same network performs the main computation, and experience is written back into its existing parameters. Adding a small network to handle familiar problems is another useful approach, but it is outside the implementation considered in this note.

**The goal is for repeated use to improve how the same model accesses and executes its existing neural circuits, and, where possible, to reduce repeated reasoning.**

This is a research proposal. “Strengthening neural circuits” supplies an intuition; the mechanism must still be defined and tested in an artificial network.

## From holes in an execution engine to computations inside a model

In [What If an Agent Could Grow Its Own Execution Engine?](#thought/hybrid-engines-that-learn), I described repetitive tasks as a program skeleton with learnable holes. That design has a practical advantage: we know which hole an experience should affect, and we have an interface at which to inspect its inputs and outputs.

The question now moves inside the model. Can we locate the existing pathway responsible for a computation and let experience change that pathway directly?

A program hole does not map neatly onto a block of neural weights. A function may be distributed across layers, attention heads, MLPs, and feature directions. Different functions may also share parameters. A subtask with a clear semantic boundary need not have an equally clear parameter boundary.

The first job is therefore to establish an experimentally supported correspondence between a computation in a family of tasks and the internal states and parameters that implement it. That correspondence gives “what to strengthen” a concrete object.

![Experience from use supports localization and proposed edits to an existing circuit; independent evaluation determines whether the edit is written back into the same model.](assets/images/circuits-that-improve-with-use/existing-circuit-en.svg)

*The update in this diagram changes the original model's parameters. External tools may perform analysis and editing, but the evaluated improvement must persist in the edited model itself.*

## Three different meanings of strengthening

I would distinguish three possible changes.

**More reliable access.** The model already possesses a computation but does not use it effectively on some inputs. After an edit, the appropriate task cues more reliably elicit that computation.

**More reliable execution.** The relevant pathway is used, but information is corrupted or transformed incorrectly along the way. After an edit, the operation works more consistently on new inputs.

**Less repeated reasoning.** The model reaches comparable or better quality in fewer autoregressive steps, with less rederivation, backtracking, or unproductive repetition.

The first two do not imply the third. A more accurate model may produce reasoning of the same length. Conversely, a model that stops earlier may simply omit necessary computation.

With the architecture and inference implementation fixed, a weight edit generally does not reduce the dense matrix operations performed in each forward pass. A more realistic efficiency target is to reduce the generation steps, retries, and repeated calls needed to finish a task while preserving quality.

## Locate before editing

A neuron that is highly active during a successful run is not necessarily responsible for the success. It may register the result, or merely correlate with the computation that matters.

I would begin with controlled input pairs that share as much surface structure as possible while differing in a relation essential to the task. Ablating, replacing, or patching internal states can then test which interventions change the target behavior. Candidate circuits also need checks on new inputs and unrelated tasks, so that the explanation does not describe only one example.

[Causal tracing in ROME](https://rome.baulab.info/) provides a relevant example: perturbing and restoring internal states helps locate factual retrieval, followed by edits to related MLP weights. It shows that some local computations can be located and edited. Extending this approach to multistep skills requires further evidence.

A localization result remains a working hypothesis. Restoring an answer through a state intervention does not establish a unique, harmless parameter edit. An edge in an analysis graph may not correspond to an independently editable group of raw weights. The proposed update must ultimately be tested on the actual parameters.

## 1. Change the contribution of an existing pathway

The most direct approach is to change how a candidate circuit contributes to subsequent computation.

For an MLP output projection, this could mean scaling a small set of output columns, changing how the corresponding features write to the residual stream. Another option is to adjust a direction within an identified subspace to reduce interference with the target computation. If the transformation can be folded into the original weights, deployment does not require an additional adapter.

Strengthening does not require every number to increase. A useful edit may amplify relevant information or attenuate an interfering contribution. Parameter sharing, normalization, and downstream nonlinearities all affect the result, so small, restricted edits are a sensible starting point for measurement.

[Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) reports a related result: editing selected MLP output weights in Qwen3.5-0.8B suppressed a direction associated with repetitive reasoning and helped the model finish answers. The authors did not obtain a reliable mathematical improvement on Gemma 3 270M, which exhibited less looping.

That comparison establishes a useful boundary. Removing an obstacle to an existing capability is a testable starting point. It does not show that amplifying selected connections can create a missing reasoning skill.

## 2. Train only the existing parameters implicated in the computation

A second approach retains gradient learning but restricts where updates can occur. If a parameter mask \(M_C\) identifies the candidate circuit, an update can take the form:

$$
\theta' = \theta - \eta\,M_C\odot\nabla_\theta\mathcal L.
$$

Original parameters outside the mask are frozen. No new network or deployed LoRA branch is required: the update is written directly into the selected weights.

[Work on sparse fine-tuning through dynamic circuits](https://aclanthology.org/2026.findings-emnlp.679/) has explored restricting parameter updates using circuit selection. It provides a concrete basis for this approach. The extension considered here is to organize verified experience from ongoing use into repeated local updates.

If reducing repeated reasoning is part of the goal, the learning signal must reflect it. Merely imitating the original long solutions may make those solutions more reliable without teaching the model to compute less. Possible objectives include learning from verified shorter solutions or optimizing computation cost subject to correctness, followed by evaluation on new inputs.

An especially informative control is to update a random set of the same number of parameters at comparable layer locations. If careful localization does not outperform that control, the gain cannot be attributed to understanding the internal computation.

## 3. Use local activity and feedback to produce updates

A third approach is closer to the intuition of plasticity during use. The system records activity at candidate connections and uses verified feedback to modulate their updates.

A schematic three-factor rule is:

$$
\Delta W_{ij}=\eta\,a_t\,e_{ij}.
$$

Here, \(e_{ij}\) is a trace of the connection's recent activity, and \(a_t\) is a feedback signal relative to a baseline. The expression illustrates an update depending on both local activity and task outcome. It is not a complete algorithm that can be applied unchanged to an arbitrary LLM.

[Differentiable plasticity](https://proceedings.mlr.press/v80/miconi18a.html) and [neuromodulated plasticity](https://arxiv.org/abs/2002.10585) have studied such mechanisms. Those systems typically design and train networks for plastic updates. Their results do not imply that arbitrary pretrained Transformer weights will tolerate the same rule.

Within the scope of this proposal, the candidate circuit can define the allowed update region, with a local rule modifying its original weights after a task. Update magnitudes, normalization, replay, and retention would all require empirical choices.

The central difficulty is credit assignment. A correct answer does not mean that every active connection should receive an update in the same direction. Repetition without reliable feedback can also consolidate mistakes. Persistence across sessions must come from saved parameters; an effect that exists only in session state does not meet the goal of this note.

## 4. Write a desired local mapping into an existing matrix

A fourth approach uses the mathematical structure of a local computation to solve for a parameter edit directly.

Suppose an existing linear module maps a nonzero representation \(k\) to \(Wk\), and the desired output is \(v\). A simple rank-one update is:

$$
W'=W+\frac{(v-Wk)k^{\mathsf T}}{k^{\mathsf T}k}.
$$

In exact arithmetic, this guarantees \(W'k=v\). A specified local mapping can therefore be changed by writing the weights directly.

The formula does not preserve every other input, and it does not tell us what \(v\) should be. Representations that overlap with \(k\) are affected by the same update. Practical editing needs reference inputs to constrain interference, while the target internal representation must itself be justified through credible behavioral requirements and experiments.

[ROME](https://rome.baulab.info/) is a more complete related example for factual associations that also considers preserving existing mappings. The simplified expression above illustrates a linear-layer write. It is neither the full ROME algorithm nor a formula for installing an entire multistep reasoning skill in one operation.

This approach is worth testing when a recurring failure can be traced to a stable local mapping. If the failure comes from an algorithm distributed across many layers, a single local write may be inadequate.

## 5. Let an editor propose weight patches for the original model

A fifth approach delegates the editing strategy to a system that can investigate the network. It reads the original model's weights, activations, successes, and failures; develops a hypothesis about the computation; and proposes a restricted modification.

The editor could try the preceding operations or devise a more elaborate local transformation. Its distinction from the fourth approach lies in how an edit is found, not necessarily in the final patch's shape. A constrained mathematical edit starts from an explicit local objective and a solution rule. An editor may also need to discover the objective and the editing procedure.

This extends the question in [What If Neural Network Weights Could Be Programmed?](#thought/can-neural-network-weights-be-programmed). Existing weight-programming experiments supply early evidence, but the ability to produce useful patches still needs evaluation across repeated edits, unfamiliar inputs, and retained capabilities.

The constraint here is explicit: the editor can change existing parameters, while architecture, layer count, and parameter shapes remain fixed. External computation is allowed during learning. At deployment, the edited original model must produce the task answers itself.

[Qwenputer](https://divagr.com/blog/qwenputer) shows that deterministic computations can be constructed as modules inside a network, but it embeds its CPU using additional dimensions and layers. It therefore motivates neural programmability without demonstrating this proposal. Writing a known algorithm into an existing distributed representation while preserving other capabilities is a more constrained problem.

## A shared update loop

These five approaches are not mutually exclusive categories. The first restricts the form of a patch; the second and third specify update rules; the fourth solves mathematical constraints; and the fifth lets an editor choose and design modifications. They can act on the same existing parameters.

Their common loop is to identify a recurring local problem from use, propose a candidate circuit, generate an edit, evaluate it on independent data, and retain successful edits in a new version of the original model. Updates can happen between tasks rather than changing weights throughout an answer.

I would separate learning from ongoing use from immediately deploying every update. The system can continually collect experience and propose patches in batches, admitting only evaluated patches into subsequent inference. A fixed-weight forward pass does not automatically save new parameters to a checkpoint; that write must be implemented explicitly.

## When does a stronger circuit save reasoning?

The most promising starting point is a computation the model already possesses but accesses inconsistently, executes under interference, or surrounds with unproductive repetition. An edit might allow the existing capability to appear through a shorter process.

A stronger goal is to make processing that previously required several steps occur through more effective computation in the existing network. Short-solution supervision or direct editing could test this possibility. They cannot establish in advance that every task admits such compression.

A fixed architecture, finite precision, and the computational depth available per step impose constraints. Some input dependencies genuinely require sequential processing. Copying a later token's hidden state into an earlier position does not automatically preserve its context or KV cache. A successful local substitution is not yet a generalizable shortcut.

Efficiency experiments must therefore measure correctness and actual cost together. Earlier answers, less explanatory text, and earlier stopping are insufficient evidence that repeated reasoning has been usefully replaced.

## An experiment I would start with

Choose a small, analyzable open model and a bounded rule-execution task that it can already solve reasonably reliably with longer reasoning. Confirm that capability on independent samples, then investigate reproducible internal differences between short-reasoning failures and long-reasoning successes.

The first stage could compare contribution adjustments and localized gradient updates. Controls would include the frozen model, ordinary fine-tuning under the same budget, and random-mask updates matched for parameter count and approximate layer location. Every condition should have the same available supervision. Localization, editing, failed attempts, and evaluation all count toward the budget. Direct writes and an LLM editor can be added once a stable local objective has been identified.

The evaluation should answer several separate questions:

- Does the gain survive clearing context, removing analysis-time activation interventions, and reloading the checkpoint?
- Does it transfer to inputs, phrasings, and rule combinations excluded from localization and updating?
- At comparable accuracy, do generation steps, retries, latency, and cumulative cost decrease?
- After improving several tasks in sequence, are earlier capabilities retained, or do local edits interfere cumulatively?
- Does reverting the candidate patch or intervening on the proposed pathway change the gain as predicted?

The final check helps test the mechanistic explanation, but it cannot establish a unique circuit by itself. Convincing results should combine behavioral generalization, persistence, and causal evidence consistent with the hypothesis.

The initial comparison should be between two complete learning curves: repeated use with frozen weights, and repeated use with updates to existing circuits. Including the cost of updating reveals when this form of practice begins to pay off.

## Can experience change the next computation?

The change I want to test is specific: **after a sequence of tasks, the same model has acquired targeted changes to its original parameters. Those changes let it use existing computations more reliably on new, similar tasks and, where possible, reduce repeated reasoning.**

This does not require creating a capability from nothing, and success is not measured by how many weights change. A local patch that stabilizes a frequently used computation while preserving other capabilities would already answer part of the question.

The stronger result would be cumulative improvement. After a task, the model would retain a verified internal change alongside the new conversation. Its next computation could begin from that change.

*This note proposes directly modifying an existing model's parameters. The cited work supports circuit localization, sparse learning, plastic updates, or weight editing separately. It does not establish that their combination can deliver stable, long-term improvements in reasoning efficiency for general-purpose LLMs.*
