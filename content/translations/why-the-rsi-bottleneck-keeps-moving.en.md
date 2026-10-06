---
title: "Why the Bottleneck of Recursive Self-Improvement Keeps Moving"
slug: "why-the-rsi-bottleneck-keeps-moving"
language: "en"
tags: [recursive-self-improvement, evaluation, active-learning, system-feedback]
excerpt: "Recursive self-improvement may not be one loop accelerating smoothly. As candidate generation becomes cheap, the bottleneck can move to evaluation, memory, environmental feedback, collective behavior, and the verification of successors."
---

> Recursive self-improvement may not accelerate along a smooth curve. Each time a system solves one part of the problem, the constraint on the next improvement can move elsewhere. The new bottleneck is often harder to automate and harder for the current system to see.

Recursive self-improvement is often drawn as a short loop: a system proposes a modification, tests it, and sends the stronger version into the next round. The picture is not wrong, but it folds away the difficult parts. As candidate modifications become easier to generate, the expensive task becomes deciding which change deserves to survive. When the same evaluator is used repeatedly, the system can gradually learn how to satisfy it. Once memory, weights, goals, and update rules can all change, even the meaning of getting better is no longer completely fixed.

I therefore find it less useful to imagine RSI as one loop running faster and faster. It looks more like a sequence of moving constraints. The bottleneck can move from search to selection, from selection to validation, from validation to knowledge integration, from knowledge integration to environmental feedback, and eventually to trust between systems and generations. The central question is not only whether a system can modify itself. It is whether the larger chain can continue to tell what improvement means while the object being modified keeps expanding.

## One loop contains several loops

As a temporary bookkeeping device, consider six capacities inside a self-improving system: generating candidate changes (G_t), judging candidates (J_t), integrating experience into durable knowledge (K_t), obtaining new evidence from the environment (E_t), handling interactions among many systems (C_t), and reasoning about more capable successors (R_t):

$$
S_t=(G_t,J_t,K_t,E_t,C_t,R_t).
$$

This is not a complete theory. It is a way to notice that effective progress is unlikely to be set by the strongest component when another component is much weaker. The intuition can be written as:

$$
\rho_t
\lesssim
\min\{G_t,J_t,K_t,E_t,C_t,R_t\}.
$$

The expression is not a proven law of RSI. The quantities do not share one unit, and they need not be independent. It simply reminds us that producing ideas faster does not validate them faster, expanding memory does not organize knowledge automatically, and building a stronger successor does not make the predecessor better at judging it.

The relationship is more dynamic than a static weakest-link model. Expanding one part changes the distribution of problems faced by the next. A stronger generator produces not only more candidates but candidates that are better at exploiting weaknesses in the evaluator. Deployment changes the environment in which a strategy was measured. A more capable successor can exceed the resolution of the tests designed by its predecessor. The bottleneck is not merely waiting to be discovered. Progress can recreate it somewhere else.

## 1. When modifications become cheap, selection becomes expensive

The earliest bottleneck is easy to describe as a shortage of good ideas. If a system can generate more training procedures, tool calls, prompts, program patches, or model architectures, it appears to have more room to improve. Once the search space expands, however, the question quickly changes from whether a candidate exists to where limited computation should be spent.

[Rational metareasoning](https://arxiv.org/abs/1711.06892) addresses this higher-level decision. Computation is itself a costly action, so a system must decide whether to continue searching, reevaluate a candidate, acquire more information, or stop thinking and act. Metacognitive ability is therefore not just the capacity to produce more steps. It is the capacity to decide which next computation is worth performing. In RSI, that includes allocating a research budget among generating proposals, replicating experiments, improving the evaluator, and abandoning a direction whose expected value has fallen below its cost.

Best-arm identification gives a more concrete view. Treat each modification as an option with a noisy return, and identifying the best option requires samples. In many familiar models, the experiments needed to distinguish two candidates grow quickly as their true performance gap shrinks. [Kaufmann, Cappé, and Garivier](https://jmlr.org/papers/v17/kaufman16a.html) provide information-theoretic complexity results for fixed-budget and fixed-confidence settings. Those results are not cost formulas for real RSI systems, where tasks shift, candidates interact, and performance rarely reduces to one mean. They nevertheless expose a durable point: making candidates nearly free does not make reliable selection free.

This is the first bottleneck migration. A better generator may not produce faster improvement. It may consume more computation comparing candidates whose differences are increasingly small. A larger candidate pool can even reduce the depth of validation available to each proposal. Success in generation pushes the problem into evaluation, which becomes the next scarce resource.

## 2. After repeated use, the test becomes part of the loop

An obvious safeguard is to keep a hidden test set that never enters gradient training. In a multigeneration process, however, not being used for gradients is not the same as not being used for selection. If every generation survives or disappears according to the same hidden scores, those scores feed back into the search process through version selection. The system can adapt to the statistical structure of a benchmark without ever seeing its individual answers.

[Adaptive data analysis](https://arxiv.org/abs/1411.2664) studies what happens when later analyses are chosen in response to earlier results. Its lesson is not that a test set becomes useless after one look. It is that validity depends on the interaction as a whole, not only on whether one training call accessed the data. In RSI, every accepted update spends some of the independence of the evidence used to accept it. We might call the resulting fragility **evaluation debt**. The score remains visible and the test remains hidden, but it becomes increasingly difficult to know how much new evidence either provides about the next version.

Self-modification can also carry local errors forward. In a formal model of bounded rationality, [Tětek, Sklenka, and Gavenčiak](https://arxiv.org/abs/2011.06275) distinguish several imperfections and show that one class of action-selection error can cause exponentially worsening performance under repeated self-modification in the worst case. The result does not say that real self-improving systems must collapse, nor that every error compounds in the same way. It overturns a narrower but tempting intuition: if each generation is only slightly imperfect, the distant descendant need not remain only slightly imperfect.

The bottleneck has now moved again. At first, a system only needed an evaluator that returned a score. Later it needs an evaluation process that can resist adaptive search, recognize when it is losing resolution, and call for genuinely new evidence. Validation stops being one check at the end of the loop. It becomes infrastructure with its own budget, version history, outside replication, and renewal schedule.

## 3. When experience accumulates, the problem becomes what to forget

Even a well-validated improvement still needs a destination. Working context, episodic memory, retrieval stores, tool code, and model weights change at different speeds and offer different degrees of provenance and reversibility. Writing every experience into the weights may create fast new behavior but make its origin difficult to inspect and obsolete knowledge difficult to remove. Leaving every experience outside the model may produce an enormous archive without turning recurrent structure into cheaper intuition.

Complementary learning systems offer a useful analogy that should not be mistaken for a ready-made AI architecture. [McClelland, McNaughton, and O'Reilly](https://doi.org/10.1037/0033-295X.102.3.419) describe a division between rapidly storing particular episodes and slowly integrating structure across episodes. The theory reminds us that remembering one event quickly and changing a durable representation safely may require different mechanisms.

[Chunking in Soar](https://soar.eecs.umich.edu/soar_manual/04_ProceduralKnowledgeLearning/) provides a more program-like example. After solving a subproblem, the system can compile the conditions that supported the result into a new production rule. A similar situation can then trigger the rule without repeating the entire deliberation. What is preserved is not only an answer but a computation that can be called again. This gives learning a stricter meaning: an experience has reorganized the search space faced by future problems.

The useful quantity at this layer may therefore be less about how much the system remembers and more about whether a new structure lowers the cost of discovering another structure later. Knowledge written into weights should earn its place through broad transfer. External memories should retain sources and timestamps. Tools should remain separately testable. Evaluators, objectives, and permission boundaries should change more slowly than ordinary skills. RSI at this layer is not just learning more. It is learning which form of storage different knowledge deserves.

## 4. After enough internal reorganization, the system must ask the world

A system can obtain new conclusions without receiving new data. Mathematical proof, program execution, and a better representation of existing observations can turn information that was difficult to use into available knowledge. [Logical induction](https://arxiv.org/abs/1609.03543) even studies how a resource-bounded reasoner can maintain improving probabilities about statements whose proofs or computations have not yet finished. The absence of new external data does not imply the absence of new knowledge.

Internal progress still has a boundary. If the system's hypothesis space omits a variable that matters, or if two models of the world make identical predictions about every observation already collected, more internal reasoning cannot manufacture the evidence that separates them. The bottleneck then moves from computational uncertainty to empirical uncertainty. The system does not need another hour of thought. It needs a question that the world can answer.

[Bayesian experimental design](https://doi.org/10.1214/ss/1177009939) treats experiment selection as a decision problem: given the current beliefs and utility, which observation is worth acquiring? [Dual control](https://arxiv.org/abs/1510.03591) adds the idea that an action can change the environment while also teaching the system about it. An action with modest immediate reward may be valuable because it exposes a mistaken model and improves later decisions. Neither framework automatically solves unknown unknowns, since both still require some expressible hypothesis space. They do, however, make active questioning part of the decision rather than an optional feature.

Long-run RSI is therefore unlikely to be a fully closed process of self-training. The system must search, ask for dissenting evidence, intervene, wait for experiments, and sometimes allow failure to change the question it is asking. Environmental feedback matters not only because it contributes more data. It can contradict an internally coherent mistake.

## 5. Once systems form a population, agreement may stop being independent evidence

Multiple agents appear to offer protection against the blind spots of one system. Yet the number of models is not the number of independent pieces of evidence. Systems trained by different laboratories may still share corpora, benchmarks, architectural habits, and reward preferences. They can run independently while retaining correlated errors.

[Dietrich and List](https://researchonline.lse.ac.uk/id/eprint/681/1/DietrichList.pdf) formally analyze jury decisions when all jurors share the same evidence. The work suggests that agreement among many reasoners may add robustness to the interpretation of common evidence without adding new external evidence. If the shared source is wrong, another agreement does not make the source true.

Collective deployment introduces a deeper problem. [Algorithmic monoculture](https://arxiv.org/abs/2101.05853) studies conditions under which many decision-makers adopting the same ranking algorithm can create tension between individually rational choices and social welfare. [Performative prediction](https://proceedings.mlr.press/v119/perdomo20a.html) studies how a prediction used for action can change the distribution it aims to predict. For RSI, a strategy may work when used by a few agents and fail once every system adopts it at the same time. Faster learning can produce faster crowding, more synchronized behavior, and stronger reactions from the environment.

The bottleneck has moved from whether one system is correct to what the world becomes when many systems act on the same judgment. Evaluation must then vary population size, adoption rate, information isolation, and response delay rather than repeat a single-agent benchmark. Useful multi-agent design should protect distinct sources of evidence, separate model lineages, and maintain incentives to find counterexamples instead of merely seeking a majority.

## 6. When the successor surpasses the designer, improvement becomes delegation

The most distinctive bottleneck migration occurs when a successor really becomes more capable. If the predecessor could predict the successor's answer to every new problem in detail, it might already possess the successor's relevant ability. A more realistic situation is that the predecessor knows why it built the successor but cannot know in advance what the successor will discover.

[Vingean reflection](https://intelligence.org/files/VingeanReflection.pdf) formulates the problem as one of justified trust: how can a weaker system have reason to rely on a stronger successor that it cannot fully simulate? [Tiling agents](https://intelligence.org/files/TilingAgentsDraft.pdf) study whether one system can endorse a successor that uses similar principles to construct another successor, and why self-referential proof encounters Löbian obstacles. These works live mainly in idealized formal systems and do not directly provide a verification scheme for modern neural networks. Their value is the clean separation of three claims that are often conflated: constructing a successor, predicting a successor, and having justified confidence in some properties of a successor.

Real cross-generational verification will probably not come from one proof. It is more likely to combine inspectable interfaces and permissions, tests kept outside training, independent review by different architectures, reversible deployment, and long-run evidence from the world. The system should also preserve a design genealogy that records why a change was proposed, which alternatives were rejected, which experiments supported it, and which questions remained unresolved. Such a record cannot eliminate a cognitive gap, but it can prevent descendants from inheriting a result without inheriting the conditions under which it was trusted.

At this point RSI no longer resembles one model upgrading itself in isolation. It looks like a research project being repeatedly delegated. A predecessor need not understand every step of a successor's reasoning, but it must retain enough constraints, evidence, and channels for criticism that “I cannot predict you” does not quietly become “I have no choice but to trust you.”

## Perhaps the useful picture is a bottleneck map, not a capability curve

Nothing here establishes that RSI must slow down or that it must collapse. Candidate generation, automated experimentation, and program search may create powerful positive feedback in some domains. The more careful claim is that acceleration in one part does not determine the behavior of the whole chain, because that acceleration changes the problems faced by everything downstream.

Instead of recording only how much generation (t) outperforms generation (t-1), we may need to track three different quantities: current capability (C_t), the capacity to produce another improvement (I_t), and the integrity of the evidence supporting those judgments (Q_t).

$$
C_{t+1}>C_t
\quad\not\Rightarrow\quad
I_{t+1}>I_t
\quad\not\Rightarrow\quad
Q_{t+1}\ge Q_t.
$$

The gaps between these implications are where bottlenecks move. A system may become better at a task without becoming better at improving itself. It may become better at producing successors while relying ever more heavily on an evaluator that many generations have already adapted to. It may even improve on every internal measure while deployment changes the environment enough to erase the advantage those measures captured.

A more informative experimental program would expand one part of the improvement chain at a time and ask where the pressure goes. Does more generation budget raise validation cost? Does a stronger evaluator elicit subtler exploitation? Does larger memory create a retrieval bottleneck? Do errors remain independent as the number of agents grows? Which properties can a predecessor still verify as its successor becomes more capable? These experiments would not produce one dramatic intelligence-explosion curve. They would gradually reveal what actually constrains recursive improvement.

If sustained self-improvement becomes possible, the thing that achieves it may not be just a model that keeps rewriting itself. It may look more like an institution for machine research: memory operating at several time scales, evaluators that preserve disagreement, experimental interfaces that can ask the world new questions, design reasons that survive across generations, and an engineering structure that can still return to an earlier version when something goes wrong. Models will matter enormously, but how far the loop can travel may depend on whether these less obviously intelligent parts can keep up.

## References

- [Callaway et al., *Learning to Select Computations* (2017)](https://arxiv.org/abs/1711.06892)
- [Kaufmann, Cappé, and Garivier, *On the Complexity of Best-Arm Identification in Multi-Armed Bandit Models* (2016)](https://jmlr.org/papers/v17/kaufman16a.html)
- [Dwork et al., *Preserving Statistical Validity in Adaptive Data Analysis* (2014)](https://arxiv.org/abs/1411.2664)
- [Tětek, Sklenka, and Gavenčiak, *Performance of Bounded-Rational Agents With the Ability to Self-Modify* (2020)](https://arxiv.org/abs/2011.06275)
- [Everitt et al., *Self-Modification of Policy and Utility Function in Rational Agents* (2016)](https://arxiv.org/abs/1605.03142)
- [McClelland, McNaughton, and O'Reilly, *Why There Are Complementary Learning Systems in the Hippocampus and Neocortex* (1995)](https://doi.org/10.1037/0033-295X.102.3.419)
- [Soar, *Procedural Knowledge Learning*](https://soar.eecs.umich.edu/soar_manual/04_ProceduralKnowledgeLearning/)
- [Chaloner and Verdinelli, *Bayesian Experimental Design: A Review* (1995)](https://doi.org/10.1214/ss/1177009939)
- [Klenske and Hennig, *Dual Control for Approximate Bayesian Reinforcement Learning* (2015)](https://arxiv.org/abs/1510.03591)
- [Garrabrant et al., *Logical Induction* (2016)](https://arxiv.org/abs/1609.03543)
- [Dietrich and List, *A Model of Jury Decisions Where All Jurors Have the Same Evidence* (2004)](https://researchonline.lse.ac.uk/id/eprint/681/1/DietrichList.pdf)
- [Kleinberg and Raghavan, *Algorithmic Monoculture and Social Welfare* (2021)](https://arxiv.org/abs/2101.05853)
- [Perdomo et al., *Performative Prediction* (2020)](https://proceedings.mlr.press/v119/perdomo20a.html)
- [Fallenstein and Soares, *Vingean Reflection: Reliable Reasoning for Self-Improving Agents* (2015)](https://intelligence.org/files/VingeanReflection.pdf)
- [Yudkowsky and Herreshoff, *Tiling Agents for Self-Modifying AI, and the Löbian Obstacle* (2013)](https://intelligence.org/files/TilingAgentsDraft.pdf)
