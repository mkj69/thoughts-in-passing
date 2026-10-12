---
title: "Some Problems Are Hard Because Verification Is Hard"
slug: "when-verification-is-the-bottleneck"
language: "en"
tags: [verification, evaluation, feedback, open-endedness]
excerpt: "Cost, delay, noise, subjectivity, interaction, value conflict, and open-ended goals describe seven real obstacles to verification. They do not, however, form a simple ladder of difficulty."
---

> As answers become cheaper to generate, the scarce resource may no longer be candidate solutions. It may be evidence that gives us reason to believe one solution is actually better.

I recently came across a useful classification of tasks by why they are difficult to verify. It separates them into seven types: costly, delayed, noisy, subjective, interactive, value-laden, and open-ended. It then proposes that AI may surpass humans in roughly the same order. The first three lack resources, so more computation, experiments, and time can gradually buy the missing feedback. The last four lack a settled definition of success and should therefore remain difficult for longer.

I think the classification identifies something important, but it does not yet support a general ordering from easy to hard. It places several fundamentally different problems inside the single phrase “hard to verify.” It also understates a recurring difficulty. When we use a simulator, proxy metric, predictive model, or preference model to make feedback faster, we usually do not eliminate verification. We create a new object that must itself be verified. We now have to establish that the substitute evaluator remains faithful to what we originally cared about after it is placed under strong optimization pressure.

## At least three different problems hide inside unverifiability

The seven types can first be reorganized into three groups. The first concerns the **evidence channel**. Costly, delayed, and noisy tasks usually assume that a relatively fixed outcome exists, but observing it is expensive, slow, or statistically demanding. The second concerns **state-dependent evaluation**. Subjective tasks depend on who is evaluating, while interactive tasks depend on other agents, users, and the system's own actions. The third concerns **target formation**. Value-laden tasks require a decision about whose values count, while open-ended tasks must partly invent the goal, question, and evaluation criteria together.

These three problems cannot be placed on one scale without losing what matters. A narrow evidence channel can often be improved through engineering and experimental design. A changing target requires conditioning, game-theoretic evaluation, or continued deployment tests. When the target itself has not been settled, evaluation has become part of the task. The most important difference is not simply how hard each class is. It is whether we are waiting for a fact, estimating a relation, or collectively deciding what is worth pursuing.

## 1. Costly verification: simulation expands trial and error, but does not replace reality

The diagnosis of costly tasks is largely correct. Progress in drugs, materials, chips, and robotics is often slow not because candidate designs are scarce, but because each real experiment is expensive, dangerous, or irreversible. Simulators can increase feedback bandwidth by many orders of magnitude. Techniques such as domain randomization have also shown that policies trained in simulation can transfer to real visual and robotic control tasks. [1]

A simulator, however, is not a free source of truth. It contains the variables its designers know how to model, and an optimizer may discover the seams between the simulated world and the real one. The question then moves from whether the design works in reality to whether the simulator remains trustworthy under the relevant interventions. A small number of real experiments is not merely a final calibration step. It is part of the continuing test of the simulator's boundary. Costly tasks can be transformed in part, but they cannot fully escape real feedback.

## 2. Delayed verification: predicting the outcome introduces a surrogate endpoint

Medicine, education, policy, and long-term investment often have eventual outcomes, but those outcomes arrive too late. Training an intermediate model to predict the long-term result is a natural response, yet the model is effectively a surrogate endpoint. Drug development has made this problem unusually explicit. The FDA allows surrogate endpoints that predict clinical benefit in specific settings, while emphasizing that validity depends on the disease, treatment mechanism, and context of use. Later confirmatory trials can still overturn the original prediction. [2]

This means that waiting plus a predictive model does not turn a delayed task into an instantly verifiable one. It exchanges some temporal cost for model risk. Correlation between a short-term measure and a long-term outcome does not establish that changing the measure will change the outcome. Stronger evidence asks whether the relationship survives intervention, population shift, and repeated use in selecting treatments or policies. A reliable system lets the fast proxy screen candidates while delayed truth continues to correct it. It does not gradually allow the proxy to replace truth.

## 3. Noisy verification: observing an outcome is not the same as identifying the effect of a decision

Randomness in business, marketing, hiring, sports, and investment can indeed be reduced through larger samples and better statistical designs. Work on best-arm identification makes the cost concrete. When the true difference between two options is small, the number of samples needed to distinguish them reliably grows quickly. [3] Separating skill from luck is therefore not only a slogan. It has a real sample-complexity price.

This category often contains another problem, however: confounding. Seeing what happened after a decision does not tell us what would have happened under a different decision. More data reduces random error but does not automatically remove selection bias. Nor can we literally compare several decisions under the exact same circumstances, because one person, company, or game cannot simultaneously experience mutually exclusive choices. Randomized trials, natural experiments, and explicit causal assumptions matter because the missing object is not only more data. It is a credible counterfactual.

## 4. Subjective verification: no universal answer does not mean no verification

Music, writing, humor, and design have no ranking shared by everyone, but it does not follow that every judgment is equally good. Once the question becomes what user (u) will prefer in context (c), it produces testable predictions. Can the system predict that person's response to an unseen work? Does the prediction remain stable over time? Can the system recognize uncertainty and ask? Research on preference learning has found that compressing disagreement into an average label discards important structure, while explicitly modeling preference distributions or distinct populations can outperform the assumption of a generic user. [4][5]

What this category lacks is not verification itself, but a universal standard with no index attached. Conditioning on individuals, maintaining multiple models, or preserving a Pareto frontier is more honest than searching for one reward. Even “preserve diversity” is not an automatic technical answer. Someone must still decide whose preferences to collect, how to treat a person's changing judgment, and when personalization begins to reinforce short-term impulses. Subjective tasks can be verified, but the result should look like a preference map rather than a single leaderboard.

## 5. Interactive verification: evaluation changes the world being evaluated

Negotiation, teaching, counseling, markets, and policy prediction are unusual because the system is not observing a stationary object. A prediction triggers action. Action changes the other party. The altered environment then determines whether the prediction appears correct. Performative prediction gives this phenomenon a formal description: deploying a model changes the future data distribution on which that model will be evaluated. [6] In a market, a strategy that succeeds when only a few actors use it may fail after everyone adopts it.

User simulators and multi-agent self-play can expand training, but they inherit the reality gap of costly verification and add a further problem. The people being modeled learn, resist, and change their preferences. A better target for evaluation is therefore not a static score from one interaction, but robustness across opponents, adoption rates, and timescales. We need to know whether the system remains useful after the other party adapts, how performance changes as more people deploy it, and whether it moves the environment toward an equilibrium that makes every participant worse off.

## 6. Value-laden verification: competence can be evaluated, while the target still requires legitimacy

Disagreements about ethics, law, fairness, and public policy cannot honestly be compressed into a neutral scalar reward. They contain legitimate conflicts of value, not merely measurement error. Social choice theory goes further. Under sufficiently general conditions, there is no preference aggregation rule that simultaneously satisfies a set of individually natural requirements. [7] This does not make collective choice impossible. It means every aggregation rule includes tradeoffs that must be defended in public.

Value-laden questions are not beyond all verification. Factual premises can be false. Arguments can be inconsistent. A legal interpretation can omit precedent. A process can exclude people who should have standing. A policy can produce effects opposite to those it promised. AI can help inspect each of these layers, but greater competence at inspection does not automatically grant authority over the final objective. We need to distinguish **competence** from **authorization**. A system may predict policy consequences more accurately, while the question of how to trade those consequences off still belongs to the people affected by them.

## 7. Open-ended verification: goals are not absent, but formed during the process

When selecting a research direction, proposing a new problem, setting a long-term strategy, or imagining a novel, the objective is not fully specified in advance. Yet saying that such tasks have no objective goes too far. Researchers use partial criteria such as novelty, feasibility, explanatory power, expected impact, and curiosity. What makes the process open-ended is that exploration can reorder those criteria. A candidate answer may change which question seems worth asking.

Research on open-ended learning has already used novelty, learning progress, and human judgments of interestingness to select new environments. POET generates problems and solutions together. OMNI uses a model of interestingness learned from human data to choose tasks. [8][9] These projects show that open search can be made computational, but they also reveal the boundary of the conversion. Once an interestingness model is introduced, we must ask whose sense of interest it represents, what it omits, and what strange shortcuts it will reward after long optimization.

Experiments on research ideation offer a useful warning. A blind study involving more than one hundred NLP researchers found that model-generated ideas could score higher than expert ideas on novelty, although they were slightly weaker on feasibility. The same study found significant weaknesses in model self-evaluation and diversity of generation. [10] AI may therefore surpass humans early in particular stages of an open task, while the value of a research direction may remain unclear until the idea is executed and becomes part of a much longer chain of knowledge.

## Proxy evaluators do not remove verification. They move it upward

All seven categories share a recurring structure. To obtain faster feedback, we build a substitute evaluator. We replace reality with a simulator, long-term outcomes with surrogate endpoints, repeated trials with statistical estimates, continuous questioning with a preference model, real people with user simulators, public deliberation with rules or constitutions, and open-ended direction with an interestingness model.

These substitutions can be extremely useful, but they also create new optimization targets. Research on reward gaming shows that when a proxy reward and the intended objective differ, strong optimization can magnify the gap. Even direct preference optimization can reach a point where proxy scores rise while underlying quality plateaus or declines. [11][12] A field becoming trainable is therefore not the same as it becoming reliably verifiable. We have moved from verifying the solution to verifying the evaluator.

Every conversion should preserve an evidential path back to the original target. Simulation needs real deployment audits. Short-term proxies need delayed outcomes to flow back. Statistical estimates need identification assumptions and sensitivity checks. Preference models need population coverage. User simulations need calibration with real people. Value decisions need legitimate procedures. Open search needs evidence that it continues to produce directions that remain useful later. If the evaluator stops accepting correction from the original target, it gradually becomes the only world the system optimizes.

## Will AI surpass humans in the order of the seven categories?

The claim that the first three lack resources while the last four lack definitions is a valuable intuition, but it does not imply a fixed ordering. Robotics and drug development appear near the beginning as costly tasks, yet may remain slow because real tests are expensive, safety constraints are strong, and the simulation gap persists. Image style, recommendation, and advertising creative are subjective, yet they can iterate rapidly because preference data is abundant and frequent. Games are interactive, but self-play works extraordinarily well when rules, states, and winning conditions are fixed. Research ideation is open-ended, yet models can already compete with experts on novelty under controlled blind review.

Four variables may predict the rate of progress better than the category number:

1. **Feedback bandwidth:** How many relatively independent evaluations can be obtained per unit of time?
2. **Evaluator fidelity:** Does the score still represent the original target after strong optimization?
3. **Distributional stability:** How quickly do tasks, users, and opponents change after deployment?
4. **Error reversibility:** Can failure be undone cheaply, or does it harm people, alter institutions, or contaminate future data?

AI should improve fastest where feedback is frequent, the evaluator is difficult to game, the environment is relatively stable, and errors are reversible. Whether a task is subjective or objective is not sufficient to determine its learning rate. A task with a perfectly clear answer that arrives ten years later may be harder to learn than a subjective task receiving a million user choices every day.

## A more falsifiable set of predictions

If this analysis is useful, it should produce claims that observation could overturn:

1. In costly and delayed domains, learned evaluators will initially accelerate progress. If the fraction of real feedback keeps falling, the gap between proxy score and real outcomes will widen again under stronger optimization.
2. In subjective domains, personalized or distributional preference models will outperform a universal score, but the advantage will shrink as users drift and feedback becomes sparse.
3. Multi-agent self-play will progress fastest when rules are fixed and participants are symmetric. Its gains will weaken when real people can change rules, leave the system, or form coalitions.
4. Across domains, feedback bandwidth, evaluator fidelity, distributional stability, and error reversibility will explain the rate of AI progress better than a task's position in the seven-part list.

The seven categories are therefore worth keeping, but as a diagnostic map rather than a capability ladder. They remind us that most of the world does not provide the cheap, immediate, and stable verifier of a mathematics problem. More importantly, they encourage a further question whenever we see an impressive score. Did the score come from reality, a proxy, one population's preferences, or an environment that the system itself helped create?

Humans may remain involved longest in value-laden and open-ended domains, but not necessarily because human judgment will always be more capable. The deeper reason is that people are not external judges in these domains. Their interests, experiences, conflicts, and curiosity partly constitute the target. AI can help discover options, predict consequences, expose contradictions, and propose directions unfamiliar to us. Performance alone, however, cannot determine who has the authority to choose the goal, nor can it prove that a new goal should become everyone's goal. Near this boundary, verification is no longer only a way of measuring the world. It is also part of deciding which world we want to enter together.

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
