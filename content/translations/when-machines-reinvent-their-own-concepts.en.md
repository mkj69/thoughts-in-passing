---
title: "When Machines Begin to Reinvent Their Own Concepts"
slug: "when-machines-reinvent-their-own-concepts"
language: "en"
excerpt: "Deep recursive self-improvement may not mean searching faster inside one problem space. It may mean rewriting the representations, basic objects, and methods of concept formation through which the machine thinks."
---

> The deepest form of recursive self-improvement may not make a machine faster inside the same space of thought. It may let the machine redesign that space itself.

Recursive self-improvement is often pictured as a rising capability curve. A system at time \(t\) designs a better system at \(t+1\), which becomes better at designing its own successor:

$$
A_t \longrightarrow A_{t+1} \longrightarrow A_{t+2} \longrightarrow \cdots
$$

This picture treats intelligence like a scalar, as if a system were moving farther along one fixed axis. But a system may do more than search faster, predict more accurately, or execute more reliably. It may change which variables it uses to describe a problem, which structures deserve to become basic objects, and which chains of reasoning should be folded into directly reusable concepts. The most consequential change may not be that the model travels farther through the same problem space. It may begin modifying the problem space itself.

This note asks a narrower question: **what happens when a machine can improve not only its answers, but also the process by which it forms concepts?**

## Self-improvement does not happen at only one level

To stay consistent with “Intelligence in a Language We Do Not Yet Understand,” we can describe the full arrangement in which a system operates as a computational frame \(\Gamma\):

$$
\Gamma = (O, R, A, T, J, B)
$$

Here \(O\) is the ontology, meaning what counts as a basic object, relation, or variable available for intervention; \(R\) is the representation through which those objects are encoded, decomposed, and organized; \(A\) is the search or reasoning procedure; \(T\) is the set of directly available tools and operations; \(J\) is the mechanism that judges whether a result is valid; and \(B\) is the budget of time, memory, and computation. The parameters \(\theta\) carry a system's particular capabilities within that frame.

The distinction matters because a better system can mean at least four different things. Parameter improvement primarily changes \(\theta\). Procedural improvement changes \(A\), and may also change the tools \(T\) or verifier \(J\). Representational improvement reorganizes \(R\) while holding the ontology broadly fixed, bringing formerly distant states closer together. Ontological improvement changes \(O\), turning a structure that previously had no independent status into a new object. These changes can occur together, but they should not all be called representation learning.

A more complete recursive transition is therefore not merely \(\theta_t \rightarrow \theta_{t+1}\). It may look like this:

$$
(\theta_t,\Gamma_t,F_t)
\longrightarrow
(\theta_{t+1},\Gamma_{t+1},F_{t+1})
$$

Here \(F_t\) is the process by which the system proposes, tests, and retains improvements. Recursion closes only when an improvement also increases the system's ability to discover future improvements. I. J. Good's classic account of an intelligence explosion emphasized that a sufficiently capable machine could help design its successor. The Gödel machine later offered a formal picture of a system rewriting its own program when it can prove that the rewrite is useful. [1][2] Yet self-modifying code still leaves another question unanswered. Can a system improve the conceptual language through which it discovers regularities?

## A concept may be a folded computation

The central intuition is that a concept can be understood as cached computation. The first time a system encounters a family of structures, it may need a long search to discover the relevant regularity. If the same computation keeps returning, the system can compress it into a reusable intermediate object:

$$
\text{long computation}
\longrightarrow
\text{reusable primitive}
$$

The next time a similar problem appears, the system no longer needs to derive the structure from scratch. It can call the primitive directly. Several primitives can then compose into a higher-level object:

$$
c_1,c_2,c_3 \longrightarrow C
$$

Functions in programming, groups in mathematics, and vector spaces all have something of this character. They package recurring relations and operations so that thought can continue at a higher level. DreamCoder offers a limited but concrete example. While solving a family of program-induction tasks, it adds recurring program structures to a growing library. That library then makes later search easier. The system learns not only individual programs, but also a gradually expanding language for expressing programs. [3]

Folding computation into a concept can still happen at different levels. If a system merely memorizes a shortcut, the main change belongs to \(A\) or \(T\). If it finds better coordinates or decompositions for existing objects, the change belongs mainly to \(R\). Only when a stable structure is promoted into a new basic object, with its own relations, composition rules, and possible interventions, does the change reach \(O\). Abstraction is therefore broader than representation. It can reorganize existing objects, or change which objects a system recognizes at all.

## A better representation and a better ontology are different claims

With the ontology \(O\) held broadly fixed, a better representation \(R'\) may make relations among the same objects more local, sparse, or compositional. A Fourier transform is a relatively clean example. The signal remains the same while its coordinates, and therefore the relations that appear simple, change. A new ontology \(O'\) makes a deeper move. It may treat previously scattered states as one object, or create a variable for which the old language had no basic name.

There is consequently no best ontology independent of a task. Extending the cost profile from the previous essay, we can compare a computational frame over a task distribution \(\mathcal D\):

$$
Q_{\mathcal D}(\Gamma)
=
\left(
\bar L_{\Gamma},
\bar S_{\Gamma},
\bar E_{\Gamma},
\bar V_{\Gamma}
\right)
$$

The terms denote average description, search, execution, and verification costs. A new ontology may make prediction concise while making verification difficult. It may improve one domain while damaging transfer. It may be natural for the machine while imposing enormous translation loss on humans. Better should therefore not be collapsed carelessly into one score. It is always relative to a task distribution, resource constraints, a verifier, and the relations we require the system to preserve.

One useful diagnostic is to ask whether the new structure preserves the old objects, questions, and intervention relations. If an approximately invertible, structure-preserving map exists, the change may remain primarily representational. If the new system must redefine what counts as an object, which questions make sense, and which changes can be intervened upon, then it has reached the level of ontology. This distinction prevents every gain in efficiency from being celebrated as the invention of a new concept.

## The real recursion may occur in abstraction discovery

One new abstraction is not yet recursive self-improvement. The important question is whether the abstraction makes the next abstraction easier to discover. Suppose a system can inspect its own reasoning traces and identify computations that recur, variables that consistently move together, and apparently different problems that share one invariant. It can compile those structures into new primitives and reorganize later search around them.

The cycle might look like this:

$$
\text{better abstractions}
\longrightarrow
\text{cheaper reasoning}
\longrightarrow
\text{new regularities become visible}
\longrightarrow
\text{better abstraction discovery}
$$

The system is no longer moving only from solver to better solver. It is improving \(F_t\), the process that discovers, evaluates, and integrates abstractions:

$$
F_t : \Gamma_t \longrightarrow \Gamma_{t+1},
\qquad
F_t \longrightarrow F_{t+1}
$$

This is closer to conceptual recursion than asking whether a model can write its next version of code. The machine does not merely possess concepts. It possesses a method for making concepts, and then improves that method. The positive feedback becomes:

$$
\text{better concepts}
\longrightarrow
\text{better concept discovery}
\longrightarrow
\text{still better concepts}
$$

## An intelligence explosion may look like an abstraction cascade

Scaling today commonly increases parameters, data, and test-time compute. These approaches matter enormously, but they usually expand fitting and search while the basic frame remains relatively stable. Conceptual reorganization changes something else. It changes which states count as equivalent, which moves are local, and which long computations become one direct operation.

If a problem requires searching \(10^{12}\) states, more compute may visit more nodes. If a new abstraction compresses those states into \(10^3\) task-relevant equivalence classes, the old search space no longer exists in the same form. The capability gain can be discontinuous. A problem that is difficult in \(\Gamma_t\) may become natural in \(\Gamma_{t+1}\).

An intelligence explosion may therefore appear first not as more computation per second, but as an abstraction cascade. Each layer of concepts makes a class of earlier computations unnecessary while providing the primitives for another layer. What grows is not one capability axis, but the system's ability to construct problem spaces.

This does not mean conceptual recursion must accelerate without bound. New ontologies still need verification. New primitives can overfit. Translation across frames can discard essential information. Physical experiments and compute budgets do not disappear. As “When Intelligence Is No Longer Scarce” argues, intelligence growth is more likely to move bottlenecks than to abolish them. [“When Intelligence Is No Longer Scarce”](#thought/when-intelligence-is-no-longer-scarce)

## Machines may gradually build another language of science

A system used for scientific research may begin with human objects such as genes, proteins, energy, symmetry, and phase transitions. It may later discover latent variables that cut across existing disciplinary boundaries and promote them into \(z_1,z_2,z_3\). A later generation could compose these into higher-level objects:

$$
Z_1 = f(z_3,z_8,z_{19},\ldots)
$$

After many rounds, machine science may not simply know more than human science. It may depend on a different conceptual lineage, with each layer resting on abstractions discovered by the previous one. This is how the idea that intelligence is written in a language we do not yet understand could deepen. The language would not be learned once. It would keep growing through use. [“Intelligence in a Language We Do Not Yet Understand”](#thought/intelligence-in-an-unknown-language)

The divergence need not be one-way or inevitable. Reality, experimental outcomes, and human objectives constrain the machine as well. Some machine-native concepts may also be learnable by people. Schut and colleagues extracted concepts from AlphaZero that differed from structures in human game data, then found that elite chess players could learn from the resulting prototypes. This suggests that concepts discovered by a machine do not necessarily remain forever inside an untranslatable latent space. [4]

A more plausible future contains different degrees of translation loss. Some concepts can be named. Some can be learned only through examples, interventions, and tools. Others may remain simple only inside high-dimensional computation. Interpretability would then mean more than attaching an English label to a feature. It would first recover the model's objects, equivalence classes, invariants, composition rules, and natural scales, and only then ask which structures can be translated.

## The most dangerous step is changing what counts as better

If a system changes \(R\) or \(O\) while its verifier \(J\) remains stable, we retain a relatively fixed basis for comparing the two frames. Complete self-modification may eventually reach \(J\) itself:

$$
(O_t,R_t,A_t,T_t,J_t)
\longrightarrow
(O_{t+1},R_{t+1},A_{t+1},T_{t+1},J_{t+1})
$$

The system would then change not only how it understands the world, but also what kind of understanding counts as progress. If \(J_{t+1}\) and \(J_t\) share no external anchor, improvement may amount only to the new system declaring itself better by its own standard. An ontology that is efficient and compressive could still discard values, counterfactuals, or safety boundaries that matter to humans.

Meta-improvement therefore requires criteria that survive across versions. These might include prediction and intervention tests against external reality, independent verification, reversibility, preservation of critical constraints, and an explicit account of what was lost during conceptual migration. Without such anchors, changing an evaluator cannot be distinguished from improving capability. At this level, recursive self-improvement becomes an epistemic and governance problem as much as a technical one.

## How could this idea become an experiment?

We do not need to wait for a fully self-improving AI to study conceptual recursion. A clean experiment could begin with a synthetic world. Researchers would give a system only low-level observations and a family of tasks while hiding the environment's true latent structure. The system would repeatedly solve tasks, analyze its computations, propose variables and primitives, and use them to rewrite its search procedure.

Evaluation should go beyond accuracy on the same tasks. We should ask whether a representation reduces search on held-out tasks, whether abstractions transfer and compose, whether their relations remain stable under intervention, and whether the next round of abstraction discovery becomes faster. We should also distinguish a memorized shortcut from an object that supports composition, transfer, and counterfactual reasoning.

The central test is not:

> Did the system invent a new name?

It is:

> **Did the invented structure become a foundation on which the next round of reasoning and concept discovery genuinely depends?**

If a primitive only compresses past data without helping the system discover future regularities, it is closer to a static code. If it systematically reduces the description, search, execution, or verification costs of future tasks and continues generating higher-level reusable abstractions, then we may be observing an abstraction-level recursive loop.

## From better answers to better languages of thought

The deepest endpoint of recursive self-improvement may be neither a better answer nor merely a better reasoning algorithm. It may be:

$$
\boxed{\text{a better language in which reasoning happens}}
$$

A system that can change its parameters is learning. A system that can change its search and tools is learning how to solve problems. A system that can change its representation is reorganizing a problem space. A system that can change its ontology begins to decide again what deserves to be an object. If it can also improve the process that constructs these objects, it is changing the language through which intelligence organizes the world.

The decisive sign may not be a sudden doubling of a benchmark. It may be a system inventing an abstraction that humans never supplied, then using that abstraction not only to solve one task, but also as the substrate for another round of reasoning and abstraction discovery. At that point, the machine would not merely know a new answer. We would be seeing:

$$
\boxed{\text{machine-native abstraction becoming recursively reusable}}
$$

Perhaps that is where deep recursive self-improvement truly begins.

## References

- [1] [Good, *Speculations Concerning the First Ultraintelligent Machine* (1966)](https://www.sciencedirect.com/science/article/pii/S0065245808604180)
- [2] [Schmidhuber, *Gödel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements* (2007)](https://arxiv.org/abs/cs/0309048)
- [3] [Ellis et al., *DreamCoder: Growing Generalizable, Interpretable Knowledge with Wake-Sleep Bayesian Program Learning* (2021)](https://arxiv.org/abs/2006.08381)
- [4] [Schut et al., *Bridging the Human-AI Knowledge Gap through Concept Discovery and Transfer in AlphaZero* (2025)](https://www.pnas.org/doi/10.1073/pnas.2406675122)
