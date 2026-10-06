---
title: "What Is Recursive Self-Improvement Actually Improving? A Map of an Emerging Field"
slug: "rsi-research-map"
language: "en"
tags: [recursive-self-improvement, autonomous-research, research-agents, field-map]
excerpt: "More teams are describing their work as recursive self-improvement, but they are not improving the same object. The useful question is which layer of the loop changes and whether that change actually makes the next improvement easier."
---

> More teams are describing their work as recursive self-improvement, but they are not improving the same object. Before asking who is closest to RSI, it helps to ask which layer of the loop changes and whether that change actually makes the next improvement easier.

Companies, laboratories, and open-source projects working around recursive self-improvement have appeared remarkably quickly. They use a shared vocabulary: automated research, self-evolution, continual learning, AI improving AI, and research systems that accelerate their own progress. Putting all of them into one list, however, creates a false sense of uniformity. An agent that rewrites its prompts and tools, a model that distills search back into its weights, a platform that automates machine learning experiments, and a system that co-evolves algorithms with chips can all be called self-improving. They are not solving the same problem.

This note is therefore not a company ranking, and it does not try to predict who will reach an imagined finish line first. It is a reading map. The aim is to separate the components of a research system, identify what each team has made modifiable, examine the feedback used to recognize progress, and keep public evidence distinct from a project's long-term ambition.

## First, unpack the self

A modern AI research system is not just a model. It is closer to the following composite:

$$
\text{research system}
=
\text{model weights}
+
\text{agent harness}
+
\text{memory and tools}
+
\text{evaluator}
+
\text{task environment}
+
\text{compute substrate}
$$

Every layer can improve, but recursion acquires a stricter meaning only when an improvement returns to the next round and increases the system's ability to discover, evaluate, or implement further improvements. An agent optimizing an external model is doing automated research. An agent rewriting its own search framework and then using the revised framework to rewrite itself is closer to recursive self-improvement. A higher task score is also not enough by itself. The gain might come from a larger compute budget, overfitting to the evaluator, or a trick that works on only one task.

I find two questions useful when reading this field. First, **what is being updated?** Second, **does the evidence extend beyond the current evaluation and show that the updated system remains better on new tasks or in the next layer of the improvement loop?**

## 1. Building a common language of measurement

The [OpenRSI Foundation](https://openrsi.foundation/) and its developing [OpenRSI Index](https://index.openrsi.foundation/) are not a company claiming to have completed RSI. They are closer to public measurement infrastructure for the field. The project aims to turn real foundation-model development into executable, reproducible, and comparable tasks across pretraining, post-training, vision generation, and related stages. Research agents are then measured by how far they can improve these tasks beyond human baselines. The Index remains an early preview, but its direction matters: the object of evaluation should not be whether an agent can complete one experiment. It should be the attributable improvement the agent produces inside a real research stack.

This project should not be confused with [Frontis's OpenRSI](https://github.com/FrontisAI/OpenRSI). The first is a community evaluation and collaboration platform. The second is a collection of models, training environments, and evolutionary search tools for machine learning engineering. They share a name but are not the same organization or project. The naming collision is itself evidence that the field's categories are still forming.

A common measurement language matters because every team can otherwise choose the most convenient boundary around the self. A system might modify prompts while treating the underlying model as an external constant. Another might train a better model while leaving the human researchers who designed the training method outside the loop. Both improve only part of the full system. A credible evaluation should at least fix cost, separate visible feedback from hidden tests, follow several successive updates, and examine whether the new version transfers to tasks that did not participate in selection.

## 2. Rewriting agent code: the loop that is easiest to close today

Software engineering has become the most active test bed for RSI not because coding is equivalent to general intelligence, but because its feedback is fast, inexpensive, and executable. An agent can read its own code, propose a modification, run tests in a sandbox, use a benchmark to keep or revert the change, and let the retained version enter the next round. This turns system-modifies-system from a thought experiment into something that can be run repeatedly.

The [Darwin Gödel Machine](https://sakana.ai/dgm/), developed by [Sakana AI](https://sakana.ai/) with the University of British Columbia, is one of the clearest examples. Instead of keeping only the best current version, it maintains an expanding archive of agents from which later modifications can branch. In the published experiments, rewriting tools and workflows raised performance from 20.0 to 50.0 percent on SWE-bench and from 14.2 to 30.7 percent on Polyglot. The interesting result is not just the score. Open-ended search preserved temporarily weaker stepping stones that later became useful ancestors. Sakana subsequently created a dedicated [RSI Lab](https://sakana.ai/rsi-lab/) that places DGM, ShinkaEvolve, the AI Scientist, and other evolutionary research systems in one research lineage.

[SICA](https://github.com/MaximeRobeyns/self_improving_coding_agent) uses a smaller and more reproducible loop. It evaluates the current coding agent, asks that agent to improve its own repository, and evaluates the new version again. The paper reports an increase from 17 to 53 percent on a random subset of SWE-bench Verified. This remains a bounded experiment, but it offers a valuable minimal pattern in which the object of modification, evaluation environment, and version lineage are directly inspectable. iGent is associated with the researchers, although the public SICA repository and paper are more useful technical entry points than the company's product page.

[Weco AI](https://www.weco.ai/) adds another level with [AIDE²](https://www.weco.ai/blog/first-evidence-of-recursive-self-improvement). The inner agent optimizes machine learning code, heuristic algorithms, or an agent harness. The outer agent rewrites the inner agent itself. Over eight days and 100 outer iterations, the system retained seven successive improvements, and some of the gains transferred to tasks that were not part of optimization. Weco is also careful about what this result does not establish. On its own ladder, AIDE² reaches the net-positive level, but the evidence does not yet show that the improved inner agent is a decisively better outer improver. It did not pass what the team calls the ignition test. This restraint is unusual and valuable in a field with overloaded terminology.

[Poetiq](https://poetiq.ai/) defines the self as an entire optimizing system made of a model, code, prompts, and search strategies rather than model weights alone. It calls this route a self-optimizing optimizer and states that its current results come mainly from optimizing harnesses and code rather than changing parameters. [Prime Intellect](https://www.primeintellect.ai/) similarly makes context, memory, skills, subagents, and research workflows mutable in [Prime Agent](https://www.primeintellect.ai/blog/prime-agent). Prime Agent is best understood as a modifiable runtime for long-horizon autonomous work. These projects matter because they treat cognitive structure outside the model as a first-class research object. The ability of a framework to edit itself, however, is not yet proof that those edits produce persistent and transferable recursive gains.

## 3. Moving improvements into model weights

External code can change quickly, but many capabilities still depend on the underlying model. If every gain remains in prompts, scripts, and tools, the system may become increasingly elaborate without acquiring a better internal prior. A second line of work therefore tries to write discoveries from search or reasoning back into model weights.

Deep Cogito's models frame this route as Iterated Distillation and Amplification. The system first spends more inference-time computation to obtain a better policy, then distills the result back into parameters so that the next round begins from a stronger prior. [Cogito v2](https://www.deepcogito.com/research/cogito-v2-preview) describes the goal more explicitly as a move from inference-time search to iterative policy improvement. This differs from merely extending a chain of thought. In the ideal case, each expensive search becomes cheaper intuition for the next generation. Better model performance and a better method for improving models are still separate claims, however, and the latter requires evidence across iterations.

[Frontis-MA1](https://github.com/FrontisAI/OpenRSI) places parameter learning and external search inside the same machine learning engineering environment. It trains program-evolution operations such as Draft, Improve, Debug, and Crossover from executable feedback, then composes them into long-horizon search through OpenMLE-Evo. The project explicitly separates gains from model post-training and gains from the search system, and it tests the transfer of each component on the held-out NatureBench Lite environment. That separation is important because it prevents model improvement and additional search from collapsing into one score with no clear attribution.

[Recursive](https://www.recursive.com/) aims to build systems that improve AI research through open-ended algorithms. Its public early system can propose ideas for a target objective, implement changes, run experiments, check variance and reward hacking, and choose subsequent branches. [The reported experiments](https://www.recursive.com/articles/first-steps-toward-automated-ai-research) cover fixed-budget model training, training speed, and GPU kernel optimization. This is better described as strong evidence for an automated AI research loop than as evidence that general RSI has already been achieved. It shows that several parts of research can be automated continuously. Whether the system becomes increasingly better at improving its own research ability across generations is a separate measurement problem.

[Ineffable Intelligence](https://www.ineffable.ai/) places its goal directly on superlearning that can continue discovering knowledge and skills without relying on human data. Compared with projects that have released detailed experiments, code, or technical reports, its public material is currently closer to a research program. It belongs on the map because of the problem it has chosen, not because a stated ambition should be treated as equivalent to an empirical result.

## 4. Reconnecting the research loop to the physical world

Code, mathematics, and small training experiments share one advantage: their feedback can be automated quickly. Scientific research has to contend with costly experiments, ambiguous observations, equipment failures, and delays measured in days or months. If recursive self-improvement is ultimately meant to create new knowledge, it cannot remain entirely inside digital benchmarks. It must learn to ask the world questions and accept answers that do not fit its expectations.

[Periodic Labs](https://periodic.com/) is connecting models to high-throughput physical laboratories. The thesis is not that language models should reread the existing literature indefinitely. Experiments should generate data that does not yet exist online, and models should gradually help decide what to make, how to synthesize it, and how to interpret what was actually produced. [Building Labs that Learn](https://periodic.com/news/building-labs-that-learn) shows an early version of this loop in which experimental data trains scientific models and those models move closer to experiment selection and analysis. It is better described as a learning laboratory than as complete RSI, but it supplies the environmental feedback that many software-only loops lack.

[Inherent](https://inherentlabs.ai/) begins by training AI scientists to reproduce verifiable research. [Faraday](https://inherentlabs.ai/research/training-to-replicate) is not asked to generate prose that resembles a paper. It is asked to implement the methods in a paper and verify the result. Replication may sound less ambitious than original discovery, but it is a critical intermediate capability. A system that cannot reliably reconstruct existing work will struggle to distinguish a new mechanism from noise, leakage, or an experimental mistake.

[Autoscience](https://www.autoscience.ai/) also focuses on running machine learning research, exploring ideas, and converting what is learned into better models. [Mirendil](https://mirendil.com/) more explicitly proposes redesigning the AI laboratory so that models, training, evaluation, deployment, and research workflows accelerate together. These teams represent institutional self-improvement. The optimized object is no longer one agent file or one parameter set but the laboratory's throughput for producing new capability. This direction may prove important, although current public materials establish system goals and boundaries more clearly than they establish a reproducible, compounding loop.

## 5. Co-evolving algorithms and hardware

Some teams extend the loop to the compute substrate. [Ricursive Intelligence](https://www.ricursive.com/) begins with chip design and aims to use AI to improve chips, then use better chips to accelerate the next AI systems. Ricursive and Recursive are different companies. Ricursive, with an i after the R, focuses on the AI and chip-design loop. Recursive focuses on open-ended algorithms and automated AI research.

[Extropic](https://extropic.ai/) takes a more unusual route. It is developing thermodynamic computing hardware while training specialized research agents to discover algorithms suited to that hardware. [First Sparks of Thermodynamic Recursive Intelligence](https://extropic.ai/writing/baby-thermo-rsi) reports an early step: post-training an open model on the reproduction of classic connectionist experiments, with a longer-term plan to bring measurements from physical thermodynamic chips into the feedback loop. The recursive relationship here is not merely software modifying software. Algorithmic discoveries expand what the hardware can do, while the hardware may reduce the energy cost of running the research agents. If that loop closes, the object of improvement expands from models and code to the computing substrate itself.

## 6. Comparing the projects without being carried away by the word recursive

For now, I would separate public evidence into five levels. This is not a permanent leaderboard. It is a sequence of questions to ask when a new result appears.

- **Research vision.** A team identifies continual learning or self-improvement as its goal but has not yet released enough reproducible experimental evidence.
- **Bounded automated research.** A system can propose, execute, and select improvements in a fixed environment, but the object being improved remains external to the research system.
- **Local self-modification.** A system changes its own code, harness, memory, or weights and improves on the current evaluation.
- **Transfer across tasks or generations.** The gain survives hidden tasks, different models, different environments, or later generations rather than merely fitting the current score.
- **Improvement of the improvement process.** The new system is not only better at the target task. It is also better at producing its successor, and that advantage persists under a fixed resource budget.

There is now substantial evidence at the second and third levels, with some evidence reaching the fourth. The fifth level is the stronger recursive question because capability must return to the mechanism that creates the next capability. Even if one experiment shows positive feedback, we still need to ask whether that feedback saturates, whether humans must continually provide new tasks and evaluators, and whether the original evaluation remains valid after the system changes its environment.

This is also why I would not label every company from the original conversation an RSI company. Teams such as [NeoCognition](https://neocognition.io/), [Adaption](https://adaptionlabs.ai/), [Reflection](https://reflection.ai/), and [d/dx](https://ddx.inc/) are adjacent to autonomous R&D, continual learning, or next-generation research systems, but their public positioning and technical evidence are not identical. Keeping adjacent work on a watchlist is more honest than forcing every name into one category to make a complete-looking table.

## What I currently see in this map

The clearest trend is not that one architecture has won. It is that the model is no longer treated as the only container of capability. Code, context, memory, evaluators, experimental environments, organizational workflows, and hardware can all preserve experience, and each can become the object of the next update. Different teams are effectively choosing different time scales. Prompts can change within minutes. Agent frameworks can evolve across hours or days. Weight updates require longer cycles. Physical laboratories and chips change more slowly but can introduce evidence that does not exist in the digital world.

The central difficulty is also shifting from generating a candidate improvement to knowing whether it is genuinely better. Candidate ideas are becoming cheap, while reliable evaluation, transfer, physical experiments, failure attribution, and long-term maintainability remain expensive. The more effectively a system optimizes against an evaluator, the more we need hidden tests, independent replication, resource constraints, and new data from the environment. Otherwise, a faster loop may simply turn a local metric into a system-wide blind spot more quickly.

The most useful thing to follow is therefore not the number of companies using the RSI label. It is how their loops gradually close: which experiences enter code, which enter weights, which remain in external memory, and which must come from the physical world; whether evaluators can keep up with the systems they judge; and whether an improvement leaves a causal record clear enough for the next generation to understand what it inherited. When these questions have reproducible answers, recursive self-improvement will become less of an evocative umbrella and more of a collection of research results that can be compared, challenged, and accumulated.

## Official sites and technical entry points

The links below use clean official sites, project pages, repositories, or papers. They contain no tracking parameters added by a chat platform.

- [OpenRSI Foundation](https://openrsi.foundation/) · [OpenRSI Index](https://index.openrsi.foundation/) · [code](https://github.com/OpenRSI-Foundation/OpenRSI-Index)
- [Recursive](https://www.recursive.com/) · [early automated AI research results](https://www.recursive.com/articles/first-steps-toward-automated-ai-research)
- [Weco AI](https://www.weco.ai/) · [AIDE² technical article](https://www.weco.ai/blog/first-evidence-of-recursive-self-improvement) · [paper](https://arxiv.org/abs/2609.26457)
- [Sakana AI RSI Lab](https://sakana.ai/rsi-lab/) · [Darwin Gödel Machine](https://sakana.ai/dgm/) · [code](https://github.com/jennyzzt/dgm)
- [SICA code](https://github.com/MaximeRobeyns/self_improving_coding_agent) · [paper](https://arxiv.org/abs/2504.15228)
- [Poetiq](https://poetiq.ai/) · [RSI perspective](https://poetiq.ai/posts/rsi_perspective/) · [code](https://github.com/poetiq-ai/poetiq-arc-agi-solver)
- [Prime Intellect](https://www.primeintellect.ai/) · [Prime Agent](https://www.primeintellect.ai/blog/prime-agent) · [measuring autonomous research](https://www.primeintellect.ai/blog/measuring-autonomous-research)
- [Frontis](https://frontis.ai/) · [OpenRSI and Frontis-MA1](https://github.com/FrontisAI/OpenRSI) · [paper](https://arxiv.org/abs/2607.28568)
- [Deep Cogito](https://www.deepcogito.com/) · [Cogito v1](https://www.deepcogito.com/research/cogito-v1-preview) · [Cogito v2](https://www.deepcogito.com/research/cogito-v2-preview)
- [Ineffable Intelligence](https://www.ineffable.ai/)
- [Inherent](https://inherentlabs.ai/) · [training AI scientists to replicate research](https://inherentlabs.ai/research/training-to-replicate)
- [Autoscience](https://www.autoscience.ai/)
- [Mirendil](https://mirendil.com/) · [announcement](https://mirendil.com/news/announcing-mirendil/)
- [Periodic Labs](https://periodic.com/) · [Building Labs that Learn](https://periodic.com/news/building-labs-that-learn)
- [Ricursive Intelligence](https://www.ricursive.com/)
- [Extropic](https://extropic.ai/) · [early thermodynamic recursive intelligence experiment](https://extropic.ai/writing/baby-thermo-rsi)

## Further reading

- [Schmidhuber, Gödel Machine](https://people.idsia.ch/~juergen/goedelmachine.html)
- [Clune, AI-generating algorithms](https://arxiv.org/abs/1905.10985)
- [Silver and Sutton, The Era of Experience](https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf)
- [METR, RE-Bench](https://github.com/METR/RE-Bench)
- [ICLR 2026 Workshop on Recursive Self-Improvement](https://recursive-workshop.github.io/)
