---
title: "Some Problems Are Hard Because Verification Is Hard"
slug: "when-verification-is-the-bottleneck"
language: "en"
tags: [verification, evaluation, feedback, open-endedness]
excerpt: "I divide hard-to-verify tasks into seven categories: cost, delay, noise, subjectivity, interaction, value, and open-endedness. The categories help locate the bottleneck, but they may not predict the order in which AI surpasses us."
---

> As answers become easier to generate, the scarce resource may no longer be the answer itself. It may be our ability to tell whether the answer deserves to be trusted.

I keep returning to a question: why do some fields move slowly even when they have no shortage of ideas? Mathematics has proofs and software has tests. In drug development, education, investing, art, or research strategy, feedback is expensive, delayed, noisy, or hard to define in the first place. A model can produce a hundred plausible proposals in seconds, but we may have no equally fast way to tell which one is actually good.

That led me to divide hard-to-verify tasks into seven rough categories: costly, delayed, noisy, subjective, interactive, value-laden, and open-ended. My first intuition was that AI might surpass humans in roughly that order. The first three mainly lack resources, so more computation, experiments, and time should help. In the last four, the goal or standard itself is unstable, which seemed much harder.

The ordering became less tidy as soon as I looked at real cases. Most tasks belong to several categories at once. More importantly, whenever we speed up feedback with a simulator, a proxy metric, or a preference model, verification does not go away. We build something easier to ask, then inherit a new question: how closely does this substitute still track what we actually care about?

## Seven ways verification can get stuck

## 1. Cost: reality is too expensive to query often

Cost is the most intuitive case. Drug, material, chip, and robotics research rarely suffers from a shortage of candidate designs. The expensive part is trying each design in the real world. Some experiments take years, some destroy equipment, and some cannot safely be run on people. Simulation is attractive because it can turn dozens of trials into millions. Domain randomization has also helped policies trained in simulation transfer to real visual and robotic control tasks. [1]

But a simulator can reproduce only what its designers know how to model. The stronger the optimizer, the more likely it is to find a small seam between simulation and reality and turn that seam into a shortcut. Real experiments cannot appear only once at the end to certify the simulation. They have to keep returning, showing us where the model of the world stops being trustworthy.

## 2. Delay: the answer arrives after the decision

Medicine, education, policy, and long-term investing do have eventual outcomes. They simply arrive too late for the decision in front of us. The usual response is to find an earlier signal that can stand in for the final result. Drug development calls such signals surrogate endpoints. The FDA accepts them in specific settings as predictors of clinical benefit, while repeatedly stressing that their validity depends on the disease, treatment mechanism, and context. Later trials can still overturn the earlier conclusion. [2]

A proxy is a way of borrowing an answer from the future. It can help screen possibilities early, but it cannot replace the delayed outcome that justified it. A short-term measure may correlate with a long-term result without causing it. If the real outcome stops flowing back to correct the proxy, a model built to save time can slowly become a self-confirming standard.

## 3. Noise: one success tells us very little

Business, hiring, marketing, sports, and investing often produce quick results, but those results contain a great deal of luck. Research on best-arm identification makes the basic problem clear: the closer two options really are, the more samples we need before we can confidently say that one is better. [3] A short streak of success is rarely enough to establish a repeatable skill.

Some apparent noise is actually a causal problem. We can observe what happened after a decision, but we never see the same person make a different decision at the same moment. More data can reduce random error without removing selection bias. At that point, the missing ingredient is not simply a larger sample. It is a randomized trial, a natural experiment, or a credible set of causal assumptions.

## 4. Subjectivity: the answer needs a “for whom”

With music, writing, humor, and design, the question itself changes. There may be no ranking that everyone accepts, but evaluation does not have to collapse into pure intuition. Replace “Is this essay good?” with “Will user \(u\) like it in context \(c\)?” and several testable questions appear. Can the model predict how this person will respond to an unseen work? Can it notice that their preferences have changed? Will it ask when it is uncertain?

Research on preference learning also suggests that averaging disagreement into one label can erase the most useful structure. Preserving differences among people or populations can lead to better predictions. [4][5] Personalization creates its own problems, of course. We still have to decide whose preferences to collect, how to interpret inconsistent choices, and whether the system is learning what someone values or merely reinforcing a passing impulse. The right output may be a changing map of preferences, not a universal leaderboard.

## 5. Interaction: the system changes the people it predicts

Interactive tasks go one step further. In negotiation, teaching, counseling, markets, or policy, evaluation depends not only on who the other person is, but also on what the system has already done. A prediction triggers an action, the action changes the other party, and their response shapes the next round of data. Performative prediction studies exactly this loop: once deployed, a model begins to alter the distribution on which it will later be judged. [6] A trading strategy may work when only a few people use it and lose its advantage as soon as everyone learns it.

User simulators and multi-agent self-play can accelerate training, but they cannot fully reproduce real people. People learn, resist, form coalitions, and sometimes change what they want because the system exists. A high score in one interaction is not enough. We also need to know whether the system works with new opponents, whether it fails as adoption grows, and whether long-term use pushes everyone toward a worse outcome.

## 6. Values: predicting the consequences does not grant the right to choose the goal

Disputes about ethics, law, fairness, and public policy are not merely cases of insufficient data. People often care about genuinely different things, and those differences cannot be compressed without loss into a neutral-looking score. Social choice theory goes further: under broad conditions, no rule for aggregating preferences can satisfy every requirement that seems reasonable on its own. [7] Collective choice is still possible, but no formula makes the tradeoffs disappear.

AI can still inspect many parts of a value-laden argument. It can find false premises, contradictions, missing legal precedent, or groups likely to be harmed by a policy. Those abilities help answer whether we understand the consequences. They do not answer who gets to decide which consequences are acceptable. Predicting more accurately is a form of competence. Choosing the objective also requires authorization. The two are easy to conflate, but they are not the same.

## 7. Open-endedness: the question changes while we explore it

The final category is the one I find most interesting and hardest to define. When we choose a research direction, set a long-term strategy, or imagine a novel, we are not optimizing a fixed score under a fixed question. Novelty, feasibility, explanatory power, possible impact, and personal curiosity all matter, but their relative importance changes during exploration. An unexpected result can even make the original question no longer worth asking.

Open-ended learning has begun to turn parts of this process into computational systems. POET generates problems and solutions together. OMNI learns from human data which environments seem interesting, then uses that model to select the next task. [8][9] These projects show that open search is not beyond computation. They also bring the familiar question back. Whose interests does the model represent? What does it fail to notice? After enough optimization, will it prefer shortcuts that only the model itself finds interesting?

A blind study with more than one hundred NLP researchers revealed a similar tension. Model-generated research ideas scored higher on novelty and slightly lower on feasibility, while the model was poor at judging its own ideas and tended to generate less diverse proposals. [10] AI may surpass people early in one part of an open-ended task, while the value of the overall direction remains unclear until someone carries it out and it enters a longer chain of knowledge.

## Verification has not disappeared. It has moved up one level

Across all seven categories, the same move keeps appearing. When feedback from reality is too slow, we build a faster evaluator. A simulator stands in for a real experiment. A surrogate endpoint stands in for a long-term outcome. A statistical estimate stands in for repeated trials. A preference model saves us from asking every time. A user simulator stands in for a person, while a model of interestingness temporarily decides what is worth exploring next.

These substitutes are useful. Many tasks would be impossible to train without them. The difficulty is that they also become optimization targets. Research on reward gaming shows that even a small mismatch between proxy reward and the real objective can widen under stronger optimization. Direct preference optimization can show the same pattern: the proxy score keeps rising while underlying quality has already plateaued or declined. [11][12] Making a domain trainable does not necessarily solve verification. It may simply move us from verifying the answer to verifying the evaluator.

The goal is not to avoid proxies, but to preserve a route back to reality. Simulation needs spot checks in real deployment. Short-term measures need delayed outcomes to flow back. Preference models need broad population coverage, and user simulators need continued calibration against real people. Once a proxy can no longer be corrected by the original target, an imperfect map becomes the only world the system can see.

## Will AI surpass us in this order?

My original distinction between resource-limited tasks and definition-limited tasks still feels useful, but it is a starting point rather than a law. Robotics and drug development fall into the supposedly earlier costly category, yet expensive real-world tests and strict safety requirements may keep them slow for a long time. Recommendation systems and advertising are subjective, but abundant preference data lets them improve quickly. Chess is interactive, yet self-play works extremely well because the rules, states, and winning condition are fixed. Research direction is open-ended, yet models can already compete with experts on novelty in a controlled blind review.

Four other features may matter more than a task's position in the list: how often feedback returns, whether the evaluator remains trustworthy under strong optimization, how quickly the environment changes after deployment, and whether mistakes can be reversed. A task with a perfectly objective answer that arrives ten years later may be harder to learn than a subjective task receiving a million user choices every day. Conversely, AI can improve quickly on a subjective or interactive task when rules are stable, feedback is dense, and errors are cheap to undo.

This also makes parts of the framework falsifiable. If real feedback becomes scarce, proxy scores in costly and delayed domains should gradually drift away from real outcomes. If human preferences keep changing, the advantage of personalized models over a universal score should weaken over time. And once self-play leaves environments with fixed rules and symmetric participants, its gains should become less reliable than they are in games. If none of these patterns appears, then this account of verification is missing something important.

I still want to keep the seven categories, but not as a ladder from easy to hard. They work better as seven questions to ask when a system produces an impressive score. Did the score come from reality, from a proxy, from one population's preferences, or from an environment the system has already changed through its own actions?

Humans may remain involved longest in value-laden and open-ended tasks, but not necessarily because human judgment will always be better. The more practical reason is that people are not outside referees in these domains. Our interests, experiences, conflicts, and curiosity are part of the target. AI can help us discover options, predict consequences, expose contradictions, and suggest directions we had never considered. But when the question becomes who chooses the objective and who bears the consequences, verification is no longer only a technical problem.

## References

- [1] [Tobin et al., “Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World” (2017)](https://arxiv.org/abs/1703.06907)
- [2] [U.S. Food and Drug Administration, “Surrogate Endpoint Resources for Drug and Biologic Development”](https://www.fda.gov/drugs/development-resources/surrogate-endpoint-resources-drug-and-biologic-development)
- [3] [Kaufmann, Cappé, and Garivier, “On the Complexity of Best-Arm Identification in Multi-Armed Bandit Models” (2016)](https://jmlr.org/papers/v17/kaufman16a.html)
- [4] [Wang et al., “Aligning Language Models with Human Preferences via a Bayesian Approach” (2023)](https://proceedings.neurips.cc/paper_files/paper/2023/hash/99b419554537c66bf27e5eb7a74c7de4-Abstract-Conference.html)
- [5] [Bakker et al., “Fine-tuning Language Models to Find Agreement among Humans with Diverse Preferences” (2022)](https://proceedings.neurips.cc/paper/2022/hash/f978c8f3b5f399cae464e85f72e28503-Abstract-Conference.html)
- [6] [Perdomo et al., “Performative Prediction” (2020)](https://proceedings.mlr.press/v119/perdomo20a.html)
- [7] [Arrow, “A Difficulty in the Concept of Social Welfare” (1950)](https://doi.org/10.1086/256963)
- [8] [Wang et al., “Enhanced POET: Open-Ended Reinforcement Learning through Unbounded Invention of Learning Challenges and Their Solutions” (2020)](https://proceedings.mlr.press/v119/wang20l.html)
- [9] [Zhang et al., “OMNI: Open-endedness via Models of Human Notions of Interestingness” (2023)](https://arxiv.org/abs/2306.01711)
- [10] [Si, Yang, and Hashimoto, “Can LLMs Generate Novel Research Ideas? A Large-Scale Human Study with 100+ NLP Researchers” (2024)](https://arxiv.org/abs/2409.04109)
- [11] [Skalse et al., “Defining and Characterizing Reward Gaming” (2022)](https://proceedings.neurips.cc/paper_files/paper/2022/hash/3d719fee332caa23d5038b8a90e81796-Abstract-Conference.html)
- [12] [Rafailov et al., “Scaling Laws for Reward Model Overoptimization in Direct Alignment Algorithms” (2024)](https://proceedings.neurips.cc/paper_files/paper/2024/hash/e45caa3d5273d105b8d045e748636957-Abstract-Conference.html)
