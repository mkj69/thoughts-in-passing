---
title: "What Is Recursive Self-Improvement Actually Improving? A Map of an Emerging Field"
slug: "rsi-research-map"
language: "en"
tags: [recursive-self-improvement, autonomous-research, research-agents, field-map]
excerpt: "More teams are talking about recursive self-improvement, but they do not mean the same thing by the self. The useful questions are what changed and whether that change makes the next improvement easier."
---

> More teams are talking about recursive self-improvement, but they do not mean the same thing by the self. Before asking who is furthest ahead, it helps to ask what changed and whether that change makes the next improvement easier.

Companies, laboratories, and open-source projects working on recursive self-improvement have appeared remarkably quickly. Much of their language sounds familiar: automated research, self-evolution, continual learning, AI improving AI, and research systems that speed up their own progress. Yet a single list can hide more than it reveals. An agent that rewrites its prompts and tools, a model that distills search back into its weights, a platform that runs machine learning experiments, and a system that co-evolves algorithms with chips may all be called self-improving. They do not mean the same thing by the self, and they are not solving the same problem.

I do not want to turn this into a company ranking or pretend that the field has an agreed finish line. This note is closer to a reading map. It takes an AI research system apart, asks which part each team is changing and how it decides that a change helped, then compares those claims with the evidence that has actually been made public.

## First, unpack the self

An AI research system is no longer just a model. It is the result of several parts working together:

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

Any one of these layers can get better, and in the broadest sense that is an improvement. Recursion asks for something stronger. A change should not merely help with the task in front of the system. It should return to the next round and help the system discover, test, or carry out another change. An agent searching for a better way to train an external model is doing automated research. An agent rewriting its own search process and then using the revised process to rewrite itself is closer to RSI in the stricter sense. Even a higher score is not enough on its own, since the gain may come from more compute, overfitting to the evaluator, or a trick that happens to work on one task.

I therefore keep two questions in mind when reading this work: **what exactly changed?** And **does the gain survive beyond the test in front of us, perhaps even helping the system make its next improvement?**

## 1. First agree on what counts as progress

The [OpenRSI Foundation](https://openrsi.foundation/) and its developing [OpenRSI Index](https://index.openrsi.foundation/) are not claiming that one particular system has completed RSI. They are trying to give the field a shared set of tests. The project turns real work in pretraining, post-training, vision generation, and other parts of foundation-model development into tasks that can be executed, reproduced, and compared, then asks how far a research agent can improve them beyond human baselines under the same conditions. The Index is still an early preview, but it focuses on the right object. The question is not merely whether an agent can finish one experiment. It is how much confirmed, attributable progress the agent adds to a real research process.

One naming detail is easy to miss: this is not the same project as [Frontis's OpenRSI](https://github.com/FrontisAI/OpenRSI). The former is a community evaluation and collaboration platform. The latter is Frontis's collection of models, training environments, and evolutionary search tools for machine learning engineering. The fact that two distinct efforts adopted the same name says something about how unsettled the field's categories still are.

Without a common yardstick, each team can draw the boundary around the self wherever it is most convenient. One system may rewrite prompts while treating the underlying model as a fixed external resource. Another may train a better model while leaving the human researchers who designed the training method outside the loop. Both can claim improvement, but each changes only part of the larger system. A useful comparison should hold resource cost fixed, keep visible feedback separate from hidden tests, follow several successive updates, and check whether a new version still works on tasks that played no role in selecting it.

## 2. Why so many projects begin by rewriting the agent

Software engineering has become the busiest test bed for RSI, not because writing code is the same as general intelligence, but because code makes it unusually easy to close the loop. An agent can inspect its own implementation, propose a change, run tests in a sandbox, keep or revert the patch, and let the surviving version enter the next round. Feedback arrives quickly and the cost is relatively manageable, so a system modifying itself becomes an experiment that can be repeated rather than a thought experiment alone.

The [Darwin Gödel Machine](https://sakana.ai/dgm/), developed by [Sakana AI](https://sakana.ai/) with the University of British Columbia, offers a particularly clear example. Instead of keeping only the best agent found so far, it preserves a growing family of agents and allows later modifications to branch from different ancestors. In the published experiments, changes to tools and workflows raised performance from 20.0 to 50.0 percent on SWE-bench and from 14.2 to 30.7 percent on Polyglot. The scores are only part of the story. Some versions that looked mediocre at first were not discarded and later became useful stepping stones toward stronger designs. Sakana has since created a dedicated [RSI Lab](https://sakana.ai/rsi-lab/) that connects DGM, ShinkaEvolve, the AI Scientist, and related work into a broader research program.

[SICA](https://github.com/MaximeRobeyns/self_improving_coding_agent) makes the loop smaller and easier to reproduce. It evaluates a coding agent, lets that agent modify its own repository, and then evaluates the new version. The paper reports an increase from 17 to 53 percent on a random subset of SWE-bench Verified. The experiment is still bounded, but its simplicity is useful: we can inspect what changed, where the system was tested, and how one version led to the next. The researchers are associated with iGent, although the public repository and paper are better starting points for understanding the technical work than the company's product page.

[Weco AI](https://www.weco.ai/) adds another loop around the first with [AIDE²](https://www.weco.ai/blog/first-evidence-of-recursive-self-improvement). The inner agent improves machine learning code, heuristic algorithms, or an agent harness, while the outer agent rewrites that inner agent. Over eight days and 100 outer iterations, the system retained seven successive improvements, and some of the gains carried over to tasks that had not been part of optimization. Just as important, Weco is explicit about what the experiment did not show. On the team's own ladder, AIDE² reached the net-positive level, but there is not yet strong evidence that the improved inner agent became a better outer improver. In their terms, it did not pass the ignition test. That restraint matters in a field where claims can easily outrun the evidence.

[Poetiq](https://poetiq.ai/) draws a wider boundary around the self. What improves is not an isolated set of model weights but an optimizing system made of models, code, prompts, and search strategies. Poetiq calls this a self-optimizing optimizer and emphasizes that its results so far come mainly from changing harnesses and code rather than retraining parameters. [Prime Intellect](https://www.primeintellect.ai/) takes a related view in [Prime Agent](https://www.primeintellect.ai/blog/prime-agent), where context, memory, skills, subagents, and research workflows can all change over time. Prime Agent is best understood as a working environment for long-horizon autonomy that can be revised while it is being used. These projects remind us that much of a system's capability lives outside the model. Still, allowing those structures to change is one claim; showing that the changes accumulate and transfer is another.

## 3. When improvement no longer stays outside the model

Prompts, scripts, and tools can change much faster than model weights. Yet if every lesson remains outside the model, the surrounding system may accumulate more patches and procedures without learning a better place from which to begin. A different line of work therefore asks whether the experience gained through search and reasoning can be written back into the model, so that the next attempt does not have to start from the same point.

Deep Cogito describes this process as Iterated Distillation and Amplification. The model first spends more computation during inference to find a better policy, then distills the result back into its parameters so that the next round begins from a stronger position. [Cogito v2](https://www.deepcogito.com/research/cogito-v2-preview) places even more emphasis on iterative policy improvement. The aim is not merely to think for longer, but to turn one expensive search into cheaper intuition for the next attempt. A stronger model and a stronger process for improving models are still different achievements, however. Establishing the second requires watching what happens across several iterations.

[Frontis-MA1](https://github.com/FrontisAI/OpenRSI) places model learning and external search inside the same machine learning engineering environment. It uses executable feedback to train operations such as drafting, improving, debugging, and combining programs, then lets OpenMLE-Evo compose those operations into a longer search. The project deliberately separates gains that come from post-training the model from gains that come from running a stronger search process, and it tests each component on the held-out NatureBench Lite environment. This distinction matters because a better model and more opportunities to search can otherwise disappear into the same aggregate score.

[Recursive](https://www.recursive.com/) is using open-ended algorithms to speed up AI research. Its early public system can propose an idea for a target objective, implement a change, run the experiment, check variance and reward hacking, and decide which branch to explore next. [The reported experiments](https://www.recursive.com/articles/first-steps-toward-automated-ai-research) found further gains in small-model training, fixed-budget performance, and GPU kernel optimization. These results are good evidence that several parts of AI research can now be automated as a continuous process. They are not yet evidence that general RSI has been completed. The unanswered question is whether, after several rounds, the system becomes better at improving its own research process rather than simply better at solving the task it was given.

[Ineffable Intelligence](https://www.ineffable.ai/) sets its sights further out, on a form of superlearning that can keep discovering knowledge and skills without depending on ready-made human data. Compared with projects that have released detailed experiments, code, or technical reports, its public material currently reads more like a research declaration. It belongs on this map because the problem is worth watching, not because an ambition should be treated as equivalent to an experimental result.

## 4. Letting the loop encounter the physical world

Code, mathematics, and small training experiments share one convenience: results arrive quickly and can often be judged automatically. Scientific research is not so clean. Experiments are expensive, observations are ambiguous, equipment fails, and an answer may take days or months to arrive. If RSI is eventually meant to help create new knowledge, it cannot remain inside digital benchmarks forever. A system must also learn how to ask the physical world a question and revise its beliefs when the answer is not what it expected.

[Periodic Labs](https://periodic.com/) is connecting models to high-throughput physical laboratories. Its premise is not that language models should reread the existing literature forever. Physical experiments can create data that has never appeared online, and models can gradually help decide what to make, how to synthesize it, and what was actually produced. [Building Labs that Learn](https://periodic.com/news/building-labs-that-learn) shows an early form of this loop: experimental data trains scientific models, and those models begin to participate in the selection and analysis of later experiments. This is better described as a laboratory that learns than as complete RSI, but it provides what many software-only loops lack most: feedback from reality.

[Inherent](https://inherentlabs.ai/) begins with research replication. [Faraday](https://inherentlabs.ai/research/training-to-replicate) is not asked to write prose that sounds like a paper. It must implement the paper's methods and check whether the reported result can actually be recovered. Replication may sound less glamorous than original discovery, but it is a step that automated research cannot skip. A system that cannot reliably reconstruct existing work will have trouble deciding whether its own apparent discovery came from a new mechanism, a lucky run, or an error in the experiment.

[Autoscience](https://www.autoscience.ai/) is also trying to run machine learning research automatically, explore ideas, and turn experimental results into better models. [Mirendil](https://mirendil.com/) takes a broader view and proposes redesigning the AI laboratory so that training, evaluation, deployment, and research workflows accelerate together. In these projects, the thing being improved is no longer one agent file or one set of weights. It is the laboratory's entire process for producing new capability. That may become an important layer of RSI, although the public material currently describes goals and system boundaries more clearly than it demonstrates a reproducible, compounding loop.

## 5. When hardware enters the improvement loop

Some teams extend the loop all the way down to hardware. [Ricursive Intelligence](https://www.ricursive.com/) begins with chip design, using AI to design better chips and then using those chips to accelerate the next generation of AI. The names are easy to confuse, but Ricursive and Recursive are different companies. Ricursive, with an i after the R, focuses on the feedback loop between AI and chip design. Recursive focuses on open-ended algorithms and automated AI research.

[Extropic](https://extropic.ai/) takes a more unusual route. It is developing thermodynamic computing hardware while training specialized research agents to find algorithms suited to that hardware. [First Sparks of Thermodynamic Recursive Intelligence](https://extropic.ai/writing/baby-thermo-rsi) shows an early step in that plan: post-training an open model to reproduce classic connectionist experiments, with the longer-term aim of feeding measurements from physical thermodynamic chips back into the loop. This is no longer just software modifying software. New algorithms may expand what the hardware can do, while the hardware may lower the energy cost of reasoning and experimentation. If the two sides begin to push each other forward, the object of improvement becomes the computing approach itself.

## 6. Do not let the word recursive erase the differences

To avoid being carried away by the largest claims, I currently sort public results into five levels. This is not a ranking of companies. It is a reminder of how many questions remain when a new result appears.

- **A direction has been chosen.** The team clearly wants continual learning or self-improvement but has not yet released enough reproducible experiments.
- **Research is automated inside a bounded environment.** The system can propose ideas, run experiments, and select better results, but it is still improving an external target.
- **The system begins to modify itself.** It changes its own code, harness, memory, or weights and becomes better on the current evaluation.
- **The gain survives beyond the current test.** The improvement transfers to hidden tasks, different models, new environments, or later versions rather than merely fitting the visible score.
- **The process of improving also gets better.** The new system is not only better at the task. It is better at producing its next improvement, and that advantage persists under a fixed resource budget.

We now have a fair amount of credible evidence at the second and third levels, and a smaller number of experiments begin to show the transfer described by the fourth. The fifth is the difficult recursive step, because a new capability must feed back into the process that creates the next one. Even when an experiment shows positive feedback, we still need to ask whether the effect soon saturates, whether humans must keep supplying new tasks and evaluators, and whether the original test remains meaningful after the system changes its environment.

This is why I have not labeled every company from the original conversation an RSI company. [NeoCognition](https://neocognition.io/), [Adaption](https://adaptionlabs.ai/), [Reflection](https://reflection.ai/), and [d/dx](https://ddx.inc/) all work on nearby problems such as autonomous R&D, continual learning, or new kinds of research systems, but their public goals and technical evidence are not the same. Rather than forcing every name into one category to complete a table, it is more useful to keep adjacent work on a watchlist and wait for more specific results.

## What this map makes visible

The clearest trend is not that one architecture has won. It is that researchers are beginning to treat the model as only one place where capability can live. Code, context, memory, evaluators, experimental environments, organizational workflows, and hardware can all preserve experience, and any of them may change in the next round. Different teams are effectively choosing different time scales. Prompts can change in minutes, agent frameworks over hours or days, and model weights over longer cycles. Physical laboratories and chips move slowest, but they can return evidence that did not previously exist in the digital world.

The hard part is also moving. Producing a plausible candidate improvement is becoming cheap. Determining whether it is genuinely better remains expensive: the result must transfer, physical evidence may be needed, failures must be explained, and the resulting system still has to be maintainable. The better a system becomes at pleasing its evaluator, the more we need hidden tests, independent replication, strict resource constraints, and new data from the environment. Otherwise a faster loop may simply turn a local metric into a system-wide blind spot at greater speed.

What matters most, then, is not how many companies adopt the RSI label. It is how the loops gradually close: which experiences enter code, which enter weights, which remain in external memory, and which can come only from the physical world; whether evaluators can keep pace with the systems they judge; and whether each change leaves enough of a causal record for the next version to understand what it inherited. As these questions begin to receive reproducible answers, recursive self-improvement can become less of an evocative umbrella and more of a body of research that can be compared, challenged, and built upon.

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
