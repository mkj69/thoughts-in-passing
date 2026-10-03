---
title: "Six Open Questions About Recursive Self-Improvement"
slug: "open-questions-on-recursive-self-improvement"
language: "en"
tags: [recursive-self-improvement, scaling, model-collapse, active-learning]
excerpt: "The hardest part of recursive self-improvement may not be writing the next system. It may be scaling the whole improvement loop without amplifying errors, blind spots, and environmental feedback across generations."
---

> The deepest difficulty in recursive self-improvement may not be getting one generation to build a stronger successor. It may be keeping the entire improvement lineage aware of why it is improving, when it is quietly degrading, and what evidence it still lacks from the world.

Recursive self-improvement is often compressed into a simple picture. Generation \(i\) designs generation \(i+1\), the successor is more capable, and that greater capability makes the next round of improvement easier. The picture hides the difficult part. A system must observe its limitations, propose changes, determine which changes are real improvements, retain them, and return to an environment that its own actions may already have altered:

$$
\text{observe}
\longrightarrow
\text{propose}
\longrightarrow
\text{evaluate}
\longrightarrow
\text{retain}
\longrightarrow
\text{deploy}
\longrightarrow
\text{observe again}
$$

If any part of this loop fails to scale with the others, recursion can turn into something else. It may become more expensive search, growing confidence in the same mistake, or steady improvement on a closed benchmark followed by failure in the world. Good's classic account of an intelligence explosion explains why positive feedback might exist, but it does not establish that the feedback will remain truthful, stable, or verifiable over many generations. [1] A recent experiment with an AI research agent demonstrates a bounded version of the loop: the system modifies its own code and workflow, uses hidden evaluations to select versions, and makes accepted changes part of the next improving agent. [2] Results like this are exciting, but they also make six groups of open questions much more concrete.

## 1. Along which dimensions does recursive self-improvement scale?

Scaling recursive self-improvement is not the same as increasing parameter count or compute. At least six different capacities may need to grow: the search capacity that produces candidate improvements, the evaluation capacity that distinguishes progress from exploitation, the transfer capacity that carries local gains to new tasks, the bandwidth for obtaining evidence from the environment, the memory capacity that consolidates experience across long periods, and the coordination capacity among systems and people. These capacities interact, but they do not automatically grow together.

The main bottleneck may therefore keep moving. At first, the system may be unable to propose useful changes. Once proposals become cheap, evaluation may dominate. Once automated evaluation improves, the bottleneck may move to physical experiments, rare failures, long-term consequences, or judgments that humans cannot supply quickly. A system that can propose ten thousand updates per minute but reliably evaluate only ten has not gained ten thousand useful opportunities. It has created more chances for its evaluator to be fooled by accident.

Research should therefore measure the marginal return to each part of the loop rather than plotting only generation number against aggregate capability. One useful experiment would hold most of the loop fixed while scaling candidate search, evaluation budget, environmental interaction, or memory capacity one at a time. We could then observe where gains saturate and where errors begin to compound. The important object may not be one permanent bottleneck, but the **law by which bottlenecks migrate**. If scaling one component repeatedly pushes pressure onto the next, the long-run speed of recursive self-improvement will be set by the feedback channel that is hardest to expand and hardest to counterfeit.

## 2. Can recursive self-improvement collapse?

Collapse need not look like a system suddenly losing every capability. A more dangerous form would continue improving on its central metrics while gradually losing tail behavior, diversity, sensitivity to error, or contact with reality. Existing work shows that when generative models repeatedly train on data produced by previous models, low-probability regions of the original distribution can disappear across generations, eventually producing model collapse. [3] In recursive self-improvement, related degeneration could occur in the evaluator, the search procedure, or the whole lineage.

Several kinds of collapse should be separated. Data collapse makes the system learn an increasing proportion of its own projection. Evaluator collapse makes each generation better at satisfying a progressively distorted metric. Diversity collapse causes all candidate systems to share the same blind spots. Epistemic collapse removes the incentive to seek evidence that could overturn the current model. Lineage collapse turns a small early bias into a default assumption inherited by every successor. The hardest cases to detect are those that still look like progress, because the optimization process may itself learn how to hide what is being lost.

Early detection requires placing some evidence outside the recursive loop. We can preserve real data and tasks that never participate in selection, track rare events and distribution tails rather than only average performance, maintain evaluators and model lineages with genuinely independent failure modes, and periodically subject each generation to interventions it could not anticipate. Every accepted update should also remain reversible, with a record of where it won and what capabilities it traded away.

Scientifically, showing that collapse can happen is usually easier than showing that capability can scale without bound. The first claim needs one finite counterexample, while the second reaches across unknown generations and distribution shifts. Still, one collapse experiment proves only that a failure mechanism exists. It does not prove that all recursive systems must fail. The sharper question is: **which loop structures make collapse an attractor, and which external anchors can pull a lineage away from it?**

## 3. Where should different kinds of knowledge and capability be updated?

Self-improvement should not be identified with continually changing model weights. Knowledge differs in half-life, provenance, and mode of verification, so it should also differ in where and how it is updated. Stable, broadly reusable skills and inductive biases may enter weights after careful validation. Rapidly changing facts that need provenance are better kept in external memory and retrieval. Temporary task state belongs in context. Procedures that can be tested and composed can live in tools or code. Objectives, permissions, and protected boundaries should not be rewritten as casually as ordinary experience.

Retrieval-augmented generation already illustrates how parametric and external non-parametric memory can play different roles. Weights provide compressed general capability, while an external knowledge store lets facts be inspected, replaced, and traced to sources. [4] This separation becomes even more important in long-horizon recursive self-improvement. Putting everything into weights makes updates hard to audit and reverse, and may cause catastrophic forgetting. Keeping everything outside the model prevents recurring experience from consolidating into genuinely reusable competence.

Updates should also occur on different time scales. Context can change within one episode. Episodic memory and tools can evolve across days. Patterns supported by repeated independent evidence may eventually enter long-term parameters. Ontology, evaluators, and objective structure should change more slowly and conservatively. The central design question is not whether a system can learn every rule. It is which invariants humans must specify, which changes the system may propose, and which changes require external authorization. A system can learn how to route memories, design experiments, and improve search. The authority to revise the evaluator, permission boundaries, or stopping conditions should not belong entirely to the same loop being judged.

## 4. Can a model know what it does not know?

Knowing that one does not know is not equivalent to attaching a confidence number to an answer. A system may be uncertain about an answer but unaware that it omitted a variable. It may be calibrated on a familiar distribution but unable to recognize that the environment has changed. It may be confident about the questions it can already formulate while never discovering the question that matters. Work on language model confidence suggests that models can sometimes express informative uncertainty, but calibration depends strongly on training and on how confidence is elicited. [5] Confidence is one projection of the unknown, not the unknown itself.

Long-term recursive self-improvement may require an active loop with the environment:

$$
\text{uncertainty, surprise, or conflict}
\longrightarrow
\text{form a question}
\longrightarrow
\text{query, act, or experiment}
\longrightarrow
\text{receive feedback}
\longrightarrow
\text{update}
$$

Self-training can reorganize information the system already possesses, but it cannot manufacture missing evidence. When an error comes from a false premise, a missing sensor, or a mechanism that has never been observed, the system must ask, search, experiment, or wait for the world to respond. Research has even explored agents that discover useful auxiliary questions for themselves instead of only answering questions chosen in advance by people. [6] Active data collection may therefore be a core part of recursive self-improvement, not an optional addition. It is what prevents the loop from gradually separating from reality.

Human learning is rarely self-contained either. We discover blind spots through other people's experience, disagreement, failure, and social norms. Multiple agents could play a similar role, but only if they have meaningfully different evidence, inductive biases, or incentives. Agreement among copies of the same model is likely to be correlated error. A useful multi-agent design should deliberately produce informative disagreement by asking different systems to search for counterexamples, audit from opposing positions, or compete to design experiments that distinguish between explanations. Surprise, failure, conflict, and curiosity can all trigger updates, but they matter only when they lead to new evidence rather than a longer internal conversation.

## 5. Does agreement among many systems count as independent evidence?

Models trained by different laboratories may make similar decisions. There are two very different explanations for that convergence. The systems may have independently discovered the same regularity in the world, or they may share data, architectures, benchmarks, evaluators, and commercial incentives that push them toward the same behavior. Surface agreement cannot distinguish these cases.

To treat agreement as evidence, we need to estimate the correlation among errors. Systems can be trained with isolated data sources, different architectures, and different objectives, then tested under counterfactual inputs, environmental interventions, and distribution shifts. If only systems with shared data and evaluators converge, their agreement looks more like copying. If systems that arrived by different paths continue to predict the same intervention relationships, convergence is better evidence that they found something real.

There is a further complication. Model decisions can change the environment they attempt to predict. Work on performative prediction formalizes the fact that predictions used for action can alter the future data distribution. [7] A strategy may work when only a few agents use it and fail when everyone adopts it. Trades become crowded, resources become contested, opponents adapt, recommendations reshape preferences, and policy models alter the behavior of the people they govern.

Stronger recursive systems may generate stronger negative feedback because they react faster, update more frequently, and may synchronize through similar training. Static single-agent benchmarks are therefore insufficient for population deployment. Evaluation should vary adoption rate, system diversity, and response latency, then observe how a strategy changes the environment as it spreads from a few users to an entire ecology. Recursive self-improvement does not face a fixed task distribution. It faces a world jointly shaped by many learning systems.

## 6. Can a designer understand a successor that has become more capable?

Generation \(i\) does possess a special advantage. It knows why a change was proposed, has access to training traces and rejected candidates, and can inspect the successor's code and evaluations. Yet constructing, predicting, understanding, and verifying are different abilities. A system can discover a design more capable than itself through search, just as evolutionary processes can produce structures no single step fully understands. The successor may also form representations and strategies its designer did not anticipate, so causal proximity does not guarantee cognitive transparency.

Once generation \(i+1\) exceeds generation \(i\) on a critical task, evaluation becomes a problem of weak supervisors judging stronger systems. Weak-to-strong generalization experiments show that a stronger model can learn beyond labels supplied by a weaker supervisor, but naive methods still fail to recover the strong model's full performance and can transmit the supervisor's mistakes. [8] Multi-agent debate is one proposal for having strong systems expose problems to one another and compress a complex judgment into a local dispute that a weaker judge can evaluate. The proposal is promising, but it still depends on assumptions that remain empirically unsettled. [9]

The cognitive gap may grow across generations. Generation \(i\) might understand most changes in \(i+1\), rely on summaries for \(i+2\), and inherit only a formal interface by \(i+n\). To slow this decay, a recursive system should preserve more than the model at each generation. It should preserve a design genealogy: why a change was made, which alternatives were rejected, which experiments supported the choice, where the change may fail, and which questions the previous generation could not answer.

This record would act as an epistemic checksum. It cannot make every successor fully interpretable, but it can keep changes connected to inspectable reasons, external tests, and historical counterfactuals. Verification should also not be delegated solely to the direct predecessor. Independent evaluators, reviewers built from different architectures, human institutions, and the external world should remain cross-generational anchors. Otherwise each generation is certified only by its parent, and errors inherit the same bloodline.

## Perhaps the thing that must scale is verifiable improvement

These six questions point toward one conclusion. Recursive self-improvement is not one model climbing upward alone. It is an ecology composed of models, data, memory, tools, evaluators, environments, and other actors. Measuring whether the next generation scores higher on one benchmark misses the most consequential parts of the loop.

A better unit of progress may not be the score gained from one generation to the next. It may be whether an improvement survives tasks that did not participate in selection, withstands independent evaluation, remains effective after population deployment, leaves enough evidence for later generations to audit it, and can be rolled back safely when new evidence reveals a mistake.

In other words, the part of recursive self-improvement that most needs to scale may not be generation. It may be:

$$
\boxed{\text{verifiable improvement across environmental and generational distance}}
$$

If that cannot scale, faster self-modification only lets a lineage move more quickly away from progress we can confirm. If it can scale, recursive self-improvement may become more than a succession of stronger systems. It may become a lineage of knowledge that remains connected to reality, reasons, and responsibility.

## References

- [1] [Good, *Speculations Concerning the First Ultraintelligent Machine* (1966)](https://www.sciencedirect.com/science/article/pii/S0065245808604180)
- [2] [Srikanth et al., *Recursive Self-Improvement of AI Research Agents* (2026)](https://arxiv.org/abs/2609.26457)
- [3] [Shumailov et al., *AI Models Collapse When Trained on Recursively Generated Data* (2024)](https://www.nature.com/articles/s41586-024-07566-y)
- [4] [Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (2020)](https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html)
- [5] [Tian et al., *Just Ask for Calibration: Strategies for Eliciting Calibrated Confidence Scores from Language Models Fine-Tuned with Human Feedback* (2023)](https://arxiv.org/abs/2305.14975)
- [6] [Veeriah et al., *Discovery of Useful Questions as Auxiliary Tasks* (2019)](https://proceedings.neurips.cc/paper_files/paper/2019/hash/10ff0b5e85e5b85cc3095d431d8c08b4-Abstract.html)
- [7] [Perdomo et al., *Performative Prediction* (2020)](https://proceedings.mlr.press/v119/perdomo20a.html)
- [8] [Burns et al., *Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision* (2023)](https://arxiv.org/abs/2312.09390)
- [9] [Irving, Christiano, and Amodei, *AI Safety via Debate* (2018)](https://arxiv.org/abs/1805.00899)
