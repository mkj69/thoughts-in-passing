---
title: "Folding the World Behind the Agent"
slug: "folding-the-agent-world"
language: "en"
excerpt: "Once a coding agent has explored and verified part of its world, we could fold that region into an evidence-backed contract, revoke default write access, and selectively unfold it only when a counterexample appears."
---

> Long-horizon intelligence may come not only from remembering more, but from knowing when the world can become smaller.

I recently had a simple image in mind: many long-horizon coding agents live in a **flat world**.

At the beginning of a task, we give an agent a repository, a sandbox, a set of tools, and a set of permissions. No matter how much it later understands or verifies, the basic shape of that world rarely changes. Every directory remains present. Every implementation remains, in principle, visible, searchable, and editable. As the run grows longer, the set of files the agent has encountered, dependencies it has touched, assumptions it has formed, and surfaces it might damage mostly grows in one direction.

We usually describe this as a context problem: how to summarize history, extend a context window, retrieve the right fragment, or maintain better memory. But perhaps the thing that should change is not only the text inside the agent's head. Perhaps the **world it inhabits** should change too.

Once a local region has been explored, repaired, and verified, could the system fold it away? The low-level implementation would recede into the background, leaving a higher-level contract, evidence for why that contract should be trusted, and a handle through which the region could be reopened. At the same time, the agent would lose its default authority to modify the internals. Finishing one part of the task would not merely add another fact to memory; it would move the agent onto a new level of abstraction.

For now, I call this idea **world folding**: the world gradually folds behind an agent as it makes progress.

## The problem with a flat world is not merely too many files

Real software tasks rarely stay inside one function. SWE-bench turns GitHub issues into repository-level tasks and observes that resolving them often requires coordinated understanding across multiple functions, classes, and files. [Jimenez et al., 2024](https://arxiv.org/abs/2310.06770) Over a run lasting hours or days, the difficulty is not only that tokens run out. The agent continues to face nearly the same observation space and action space.

A repaired parser, a tested storage layer, and an authentication module that has just become stable still occupy the same plane as unknown code. The agent can open them again. It can also casually modify their assumptions to make a later local step easier. Finished regions acquire no new status in the system.

Three surfaces therefore grow together:

- **The epistemic surface:** more files, symbols, historical decisions, and exceptions must be distinguished;
- **The action surface:** the more places remain editable, the more possible next actions compete for attention;
- **The damage surface:** completed work stays exposed to every later modification.

A larger context window mitigates part of the first problem. It makes the flat world easier to read, but it does not give the world depth.

## Folding is not another form of summarization

Three operations that are often conflated need to be separated.

**Context compression** changes what the agent remembers. MemGPT uses an operating-system-inspired hierarchy to manage limited context; Aider's repository map provides a compact view of important symbols and signatures. [Packer et al., 2023](https://arxiv.org/abs/2310.08560) [Aider repository map](https://aider.chat/docs/repomap.html) These techniques reduce the amount of text that must be placed directly in a prompt, but the underlying workspace and its permissions need not change.

**Structural abstraction** changes the objects through which the agent thinks. A module ceases to appear primarily as dozens of source files and instead appears as an interface, a set of invariants, dependencies, and failure modes. This echoes Parnas's account of information hiding: a module is valuable not simply because it groups code, but because it hides changeable design decisions behind a stable boundary. [Parnas, 1972](https://doi.org/10.1145/361598.361623)

**Authority compression** changes what the agent can do by default. Folded internals are not merely discouraged reading. They are removed from the ordinary action space; access or write capability returns only through an explicit reopening decision. This borrows the intuition of least privilege: a process receives the minimum authority required for its present task rather than permanent write access to everything that happens to exist. [Saltzer & Schroeder, 1975](https://www.cse.unsw.edu.au/~cs9242/13/papers/Saltzer_Schroeder_75.pdf)

World folding must act on all three layers. With summaries but no boundary, old regions continue to attract attention. With abstraction but no authority change, the agent can bypass the interface whenever a fragile shortcut is convenient. With reduced authority but an inadequate contract, the agent loses information required to do higher-level work.

What is compressed, then, is not simply a conversation. It is the agent's **epistemic, structural, and authority surface**.

## What a fold should leave behind

Suppose the agent has completed and verified a region R. A fold should not produce only a sentence saying “this part is done.” It should transform R into three objects:

- **A contract:** exported interfaces, preconditions, postconditions, invariants, permitted side effects, dependencies, known failure modes, and performance or resource budgets;
- **A certificate:** the tests, static checks, builds, versions, and configurations that support the contract and explain why the system currently believes it;
- **A reopen handle:** where the hidden implementation lives, which events invalidate the contract, and how much scope and authority are required to unfold it.

Design by Contract makes responsibility between modules explicit instead of forcing callers to infer it from implementation. [Meyer, 1992](https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf) Proof-Carrying Code offers a stronger metaphor: a consumer need not reconstruct an entire production process if it can cheaply check evidence attached to a claim. [Necula, 1997](https://courses.grainger.illinois.edu/cs421/fa2010/papers/necula-pcc.pdf) In an ordinary coding-agent system, the certificate need not be a formal proof. It might be a replayable test suite, type checks, a dependency snapshot, and an audit trail. The important point is that “finished” cannot be only the agent's linguistic judgment about its own work.

After folding, the higher-level agent might see not twelve files under parser/, but one capability: given input satisfying a grammar, it returns an AST of a specified shape; errors have a defined structure; a linear-time assumption was checked against a particular version. The internal files become read-only or disappear from the default tool view.

Only then does progress change the topology of the environment.

## An agent needs semantic zoom

Human engineers rarely work at every scale simultaneously. We descend into a race condition, repair it, establish a test, and then resume treating that component as a relatively stable unit. At the system level we speak about the queue, cache, or scheduler rather than every line inside them. We descend again only when necessary.

Long-horizon agents may need the same form of **semantic zoom**:

- When entering an unfamiliar region, expose the implementation and permit fine-grained search and modification;
- When a local objective is satisfied and independently verified, extract a contract and seal the implementation;
- At the next level, compose stable capabilities through their contracts;
- When evidence expires or a counterexample appears, unfold only the smallest relevant region.

There is an analogy here to temporal abstraction in reinforcement learning. The options framework packages a sequence of low-level actions into a higher-level action with initiation and termination conditions, allowing planning across multiple time scales. [Sutton, Precup & Singh, 1999](https://www.sciencedirect.com/science/article/pii/S0004370299000521) State abstraction similarly tries to retain information needed for a decision while discarding details irrelevant to it. [Li, Walsh & Littman, 2006](https://thomasjwalsh.net/pub/aima06Towards.pdf) World folding can be read as a software-environment-specific version of both: it does not merely make actions or states more compact; it turns completed work into a new primitive of the environment.

## Who decides when to fold?

An agent should not be allowed to permanently encapsulate its own error merely because it says, “I think I'm done.” World folding therefore needs a control layer independent of the main agent. For lack of a better name, call it a **world manager**.

Its responsibilities might include:

- identifying candidate boundaries whose dependencies are relatively clear;
- proposing contracts by reconciling observed behavior with documentation, types, and tests;
- running independent checks and recording the version, environment, and properties covered;
- projecting a new set of visible objects and minimal capabilities for the next phase;
- expiring certificates when dependencies, calling patterns, or external evidence change;
- deciding which region, and which adjacent interfaces, must be reopened.

This is also why the agent–computer interface matters. SWE-agent shows that the organization of repository navigation, file viewing, editing, and testing can materially affect how well the same underlying model solves software issues. [Yang et al., 2024](https://arxiv.org/abs/2405.15793) World folding is not a request for the model to become mysteriously more disciplined. It encodes progress into the interface through which the agent observes and acts.

## Selective unfolding is the loop, not an exception

Every useful abstraction omits something. A fold may miss a hidden global invariant. A new feature may make a formerly correct boundary inappropriate. A higher-level test may produce a counterexample to the contract.

The system should then avoid two extremes: defending a false abstraction forever, or restoring the entire repository to a flat world. It should perform **selective unfolding**. Using the provenance of the failure, it reopens the smallest relevant region and its adjacent interface, repairs it, verifies it, and folds it again.

This resembles counterexample-guided abstraction refinement. CEGAR begins with a coarse model; if verification produces a counterexample that exists only because of the abstraction, it adds precisely enough information to exclude that path instead of abandoning abstraction altogether. [Clarke et al., 2003](https://www.cs.cmu.edu/~emc/papers/Papers%20In%20Refereed%20Journals/Counterexample-guided%20abstraction%20refinement.pdf) For a coding agent, a failing test, contract conflict, or dependency drift can play the role of a counterexample that guides where the world must become detailed again.

The right loop is therefore not explore → summarize → forget. It is:

> explore → verify → fold → compose → detect contradiction → selectively unfold → repair → refold

Reversibility is not a compromise in the design. It is what makes folding safe enough to exist.

## How it could fail

The most dangerous failure is to harden an incorrect understanding into an authoritative interface. A beautiful but incomplete contract can be more deceptive than messy code that remains visible. World folding also faces several other problems:

- **Leaky abstractions:** performance, concurrency, security, or resource constraints cross the boundary, forcing higher levels to understand internals;
- **Abstraction debt:** rapidly created contracts accumulate while consistency among them goes unmaintained;
- **Cross-cutting changes:** a schema migration or security repair naturally spans several folded regions;
- **Stale evidence:** tests passed under an old dependency graph or configuration but continue to be treated as current evidence;
- **Reward hacking:** the agent optimizes only the tests visible to the world manager so that a region can be sealed quickly;
- **Premature closure:** authority is reduced before an active exploration has actually converged.

A fold therefore needs an expiration policy, confidence, and explicit dependencies. Not every module should be folded, and not every task should continually zoom outward. For a cross-cutting refactor, the correct action may be an approved multi-region unfold.

## A minimal experiment

The idea can be tested without changing the underlying model. Select repository tasks with clear subsystem boundaries and long chains of dependent modifications, then compare four environments:

- a fully flat workspace;
- compressed conversation history only;
- a repository map plus structured summaries;
- world folding with contracts, certificates, reduced authority, and selective unfolding.

In addition to task success, measure token and tool cost, repeated reading, number of files touched, regressions, contract violations, unfolding scope, and the rate at which performance degrades as tasks become longer. The decisive ablations would separately remove permission reduction, certificates, and the reopen mechanism. That would reveal whether any benefit comes from better prompting or from genuinely changing the world.

If world folding works, its first signal may not be a dramatic benchmark jump. It may be fewer pointless revisits to completed regions, a smaller blast radius of edits, and behavior that looks increasingly like hierarchical planning rather than wandering through a continuously expanding search space.

## Turning progress into world structure

Today's coding agents tend to store progress in a transcript, a to-do list, or a memory system. The agent knows it has completed something, but the environment does not react. Yesterday's repaired module and today's unexplored region continue to appear in the same way.

World folding would turn progress from a narrative into **world structure**. Completed work becomes a stable capability, supported by evidence, protected by an authority boundary, and equipped with a reversible path back to detail. As the task advances, the agent does not merely accumulate more history. It earns a smaller, higher-level world that is better shaped for the next stage of work.

Perhaps the central question for long-horizon agents is not only, “How can they remember more while the world keeps growing?” There is another question worth asking:

> Once part of the world has been understood, how can we let it temporarily stop being part of the world?
