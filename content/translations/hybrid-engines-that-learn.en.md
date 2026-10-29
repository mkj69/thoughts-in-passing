---
title: "What If an Agent Could Grow Its Own Execution Engine?"
slug: "hybrid-engines-that-learn"
language: "en"
excerpt: "A research sketch: compile repeated agent behavior into code with learnable holes, then let small neural modules gradually take over familiar decisions while the LLM handles uncertainty and structural revision."
---

## From repeated reasoning to a reusable engine

An agent may solve a task many times, with different inputs but a similar underlying structure. It retrieves information, interprets it, checks constraints, chooses an action, and observes the result. Some details change. Much of the computation repeats.

What if those runs became material for constructing a new execution engine?

I imagine an LLM studying tasks, examples, and execution traces, then producing a program with two kinds of components: deterministic code for the parts it can specify clearly, and learnable modules for decisions that remain difficult to express as rules.

Initially, the LLM itself could fill those difficult parts. As experience accumulates, small task-specific networks could learn to take over some of them. The engine would remain usable while it learns, and its structure could change when the original decomposition proves inadequate.

**The question is how an agent can turn experience into a computational structure that becomes cheaper to run without losing the ability to handle exceptions.**

This is a proposed architecture, not a claim that the complete system has already been demonstrated.

![A four-panel diagram showing compilation into code and holes, a hybrid execution loop, teacher-assisted learning inside each hole, and an engine using fewer LLM calls as it matures.](assets/images/hybrid-engine-code-and-holes.png)

*The diagram sketches the idea. “Task never blocked” means that an untrained small module can defer to the LLM; it does not guarantee completion or a correct answer. Click the figure to view it at full size.*

## Compile the structure, leave explicit holes

Consider a bounded scheduling task. The system reads a request, retrieves available time slots, checks hard constraints, ranks the remaining options, and proposes a schedule.

Date arithmetic, availability checks, and database updates can often be implemented as ordinary code. Interpreting “keep the morning relatively free” or balancing several soft preferences may require a learned decision.

The compiler could produce a skeleton containing named holes at those points. Each hole needs an explicit contract: the state it receives, the output it must return, the checks it must pass, and the circumstances in which it should abstain. A ranking hole, for example, could receive valid candidate schedules and return their ordering. The surrounding program would remain responsible for enforcing hard constraints.

Recovering this structure requires more than copying a successful sequence of tool calls. Across traces, the system must distinguish reusable dependencies and branches from accidental details, retries, and failed exploration. Examples expose possible structure, but do not establish that every future case follows it.

**A hole should describe a bounded computation. Its input must contain enough information for that computation to be learnable.**

## Let each hole learn while the engine runs

At first, a hole delegates to the LLM. The system records the local state, the teacher's proposed answer, and whatever verification or subsequent outcome is available. Those records become candidate training examples for a small module.

The word “candidate” matters. An LLM answer is a proposed label, not ground truth. Successful local imitation can still reproduce a teacher's mistakes or damage the larger workflow. Training data should distinguish teacher agreement, local validity, and actual task success.

A module could initially run in shadow mode while the LLM continues to supply the answer. After held-out evaluation, the engine could use it for familiar cases where a calibrated gate predicts acceptable risk and surrounding checks pass. Uncertain or unfamiliar cases would continue to use the teacher, or request clarification when neither component can answer reliably.

The resulting loop is simple in outline: observe a local state, try the small module when eligible, verify its output, and escalate when necessary. New verified examples support later training and evaluation. Updating the deployed module should be a separate, reversible step.

The LLM therefore has three roles: constructing the initial engine, teaching its local modules, and revising the program when its decomposition fails.

## What would it mean to grow a small network?

“Grow” should refer to concrete operations that can be tested. The system might choose an input representation, select a small architecture from a bounded set, collect examples, train it, evaluate it, and insert it behind the hole's interface. It might later change its capacity or split one difficult hole into two simpler computations.

For a prototype, a classifier or ranking network is enough. Automatic architecture discovery can be studied later. The first question is whether a stable local problem can be identified and learned economically.

If a module keeps failing, its size may not be the problem. Perhaps the input omits necessary context. Perhaps two apparently similar situations require different policies. Perhaps the program asks the module to make a decision before the relevant evidence has been collected.

In that case, the LLM could rewrite the surrounding code or revise the interface. Such a revision also changes the learning problem. Old examples may no longer be valid, and affected modules need to be retrained or revalidated before deployment.

## Choose the implementation for each reusable computation

This suggests a broader research question: which repeated behaviors should become code, and which should become learned computation?

- Exact transformations and explicit constraints are candidates for deterministic programs.
- Stable procedures with occasional semantic ambiguity may fit code with LLM fallback.
- Repeated, bounded judgments may fit small specialized networks.
- Broader recurring capabilities may warrant adapters such as LoRA, or other internal learned representations.

These options form a design space, not a literal one-dimensional ladder. A LoRA adapter still depends on a host model; a “latent macro” would need a precise definition of its representation, invocation, and training procedure. Neither should be assumed cheaper simply because it is compact.

The choice should depend on coverage, error tolerance, data requirements, construction cost, and expected reuse. One workflow could use several implementations at once. A component could also return to LLM fallback when its environment changes.

This is where programmatic reuse and learned internalization meet: both preserve useful computation, but in different representations.

## Where TraceCompiler fits

[TraceCompiler](https://arxiv.org/abs/2608.02680) is a relevant reference. It describes mining agent traces into mostly deterministic workflows, recovering dependencies, and retaining runtime LLM nodes where semantic decisions remain unresolved. Its compiler is implemented through an LLM skill rather than a separately trained compiler model.

The extension I am interested in is learning inside those unresolved nodes: giving a hole its own data, local model, deployment gate, and revision process. The paper does not establish this adaptive neural-module mechanism. It provides a useful comparison point, rather than evidence that this proposal has already been implemented.

## What would make the idea convincing?

I would start with a simulator containing repeated scheduling or search-and-ranking workflows, explicit constraints, and measurable outcomes. It should include both familiar cases and new combinations of preferences or branches.

Compare a general LLM agent, generated code with LLM holes, an engine with fixed distilled modules, and an engine whose local modules improve over time. Measure complete task success, latency, teacher calls, and total cost across the learning curve. Construction, training, validation, and failed attempts must all count toward the budget.

The most useful tests would change the language, inputs, or environment after deployment. Can the gate detect that a module is no longer reliable? Does fallback preserve task success? Can structural revision repair the failure without breaking previously supported cases?

Fewer LLM calls would be encouraging only if the engine maintains its coverage and quality. Deterministic code can be consistently wrong, and a confident network can still be wrong. The target is a better complete system.

What interests me most is an agent that develops its own durable way of working: explicit procedures where rules are clear, learned modules where experience helps, and general reasoning where uncertainty remains. Its execution engine would become another thing it can study, improve, and test.
