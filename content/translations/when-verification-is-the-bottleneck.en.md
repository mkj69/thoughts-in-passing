---
title: "Some Problems Are Hard Because Verification Is Hard"
slug: "when-verification-is-the-bottleneck"
language: "en"
tags: [verification, evaluation, feedback, open-endedness]
excerpt: "I use seven categories for tasks that are hard to verify: cost, delay, noise, subjectivity, interaction, value conflict, and open-ended goals. They are better understood as different failure modes than as a ladder of difficulty."
---

> As answers become easier to generate, the scarce resource may no longer be more candidates. It may be a good enough reason to believe that one of them is genuinely better.

I have been trying to classify tasks by asking a simple question: when something is hard to verify, what exactly is missing? That question led me to seven provisional categories: costly, delayed, noisy, subjective, interactive, value-laden, and open-ended. My first guess was that AI might surpass humans in roughly the same order. The first three mainly lack resources, so computation, experiments, and time can gradually buy better feedback. In the last four, even the meaning of “better” is not fully settled, which makes them seem much harder.

Once I placed the seven categories next to one another, however, the ordering began to look less straightforward. Several very different difficulties are hiding inside the phrase “hard to verify.” There is another complication as well. We often use simulators, proxy metrics, predictive models, or preference models to speed up feedback, but doing so does not make verification disappear. It creates one more thing that needs to be verified. We still have to ask whether the substitute evaluator continues to represent the original goal after repeated optimization.

## Three different difficulties sit behind the seven categories

Looking back, the seven categories are not seven degrees of the same problem. They fall more naturally into three groups. In the first, **the evidence is difficult to obtain**. Costly, delayed, and noisy tasks usually have a relatively stable outcome, but seeing it is expensive, slow, or statistically demanding. In the second, **the object of evaluation changes**. Subjective tasks depend on who is judging, while interactive tasks also depend on users, opponents, and the system's own actions. In the third, **the target is still being formed**. Value-laden tasks must decide whose values count, while open-ended tasks may reshape the question, goal, and evaluation criteria as exploration proceeds.

This makes the original ordering look less like a simple ladder. When evidence is expensive or slow, engineering and experimental design can often improve the channel. When the object changes, we need to follow how people and environments respond. When the target itself is unsettled, evaluation is no longer a score assigned after the task. It has become part of the task. The deeper distinction is not simply which category is harder, but whether we are waiting for a fact, estimating a relationship, or deciding together what is worth pursuing.

## 1. Costly verification: simulation makes trial and error cheaper, but does not replace reality

The first category is the most intuitive. Progress in drugs, materials, chips, and robotics is often slow not because ideas are scarce, but because each real experiment is expensive, dangerous, or irreversible. Simulators can increase the speed of trial and error by many orders of magnitude. Techniques such as domain randomization have also shown that policies learned in simulation can sometimes transfer to real visual and robotic control tasks. [1]

A simulator does not create truth from nothing. It contains only the variables its designers know how to represent, while a sufficiently capable optimizer may find the seams between simulation and reality. The original problem has merely moved. We now have to ask not only whether the design works in the real world, but also when the simulator remains worth trusting. A small number of real experiments is therefore not just a final calibration step. It must keep returning to show us where the simulator's boundary lies.

## 2. Delayed verification: when the final outcome is late, we build a proxy

Medicine, education, policy, and long-term investment do have eventual outcomes, but those outcomes arrive too late. The natural response is to train an intermediate model that predicts them. In practice, this introduces a surrogate endpoint. Drug development has confronted this problem for a long time. The FDA accepts surrogate endpoints that predict clinical benefit in specific settings, while emphasizing that validity depends on the disease, treatment mechanism, and context of use. Later trials can still overturn the earlier judgment. [2]

Waiting for the real outcome while training a predictive model does not fully convert a delayed task into an immediate one. It exchanges some waiting time for model risk. Correlation between a short-term measure and a long-term result does not mean that actively changing the measure will change the result. A more reliable system lets the fast proxy screen candidates while the delayed outcomes continue to correct it. It does not quietly allow the proxy to become the truth simply because the proxy is more convenient.

## 3. Noisy verification: observing an outcome is not the same as identifying the effect of a decision

Randomness in business, marketing, hiring, sports, and investment can be reduced through larger samples and better experimental design. Work on best-arm identification makes the cost concrete. When the true difference between two choices is small, the number of samples needed to distinguish them reliably grows quickly. [3] Separating skill from luck is not only a slogan. It has a specific statistical cost.

Another problem is often mistaken for noise: confounding. We can observe what followed a decision without knowing what would have happened under another decision. More data reduces random error, but it does not automatically repair selection bias. The same person, company, or game cannot experience two mutually exclusive choices at once. Randomized trials, natural experiments, and causal assumptions matter because the missing object is not merely more data. It is a credible counterfactual.

## 4. Subjective verification: no universal answer does not mean no verification

Music, writing, humor, and design do not have a single ranking that everyone accepts, but that does not make them impossible to evaluate. Once the question becomes what user \(u\) will prefer in context \(c\), we can test whether the system predicts the person's response to an unseen work, notices when preferences change, and asks when it is uncertain. Research on preference learning also shows that compressing disagreement into an average label can erase important structure. Preserving distinct preferences or populations can be more accurate than assuming a generic user. [4][5]

What subjective tasks lack is not verification itself, but a universal standard that remains valid after the person and context have been removed. Separate models for different people, or a set of Pareto-optimal choices, may be more honest than one reward. Yet “preserve diversity” does not solve everything automatically. We still have to decide whose preferences to collect, how to interpret a person's changing judgment, and when personalization begins to reinforce short-term impulses. The result should look more like a map of preferences than a universal leaderboard.

## 5. Interactive verification: evaluation changes the world being evaluated

The difficult part of negotiation, teaching, counseling, markets, and policy prediction is that the system is not facing a stationary object. A prediction triggers action, action changes the other party, and the changed environment then determines whether the original prediction looks correct. Performative prediction gives this loop a formal description: once a model is deployed, it begins changing the future data on which it will be evaluated. [6] A market strategy that works when only a few people use it may fail as soon as everyone adopts it.

User simulators and multi-agent self-play can expand training, but simulated people still differ from real ones. Real people also learn, resist, form coalitions, and change what they want. A static score from one interaction is therefore not enough. We want to know whether the system still works with different opponents, whether it fails as adoption grows, what happens after others adapt, and whether everyone is eventually pushed toward a worse equilibrium.

## 6. Value-laden verification: competence can be evaluated, while the target still requires legitimacy

Disagreements about ethics, law, fairness, and public policy cannot honestly be compressed into a neutral scalar reward. The problem is not only inaccurate measurement. People may genuinely care about different things. Social choice theory goes further: under sufficiently general conditions, no preference aggregation rule can satisfy a set of individually natural requirements at the same time. [7] Collective choice is still possible, but every aggregation rule contains tradeoffs that should be made public and defended.

Value-laden questions still contain many things we can check. Factual premises can be false, arguments can contradict themselves, legal interpretations can omit precedent, decision processes can exclude people who should have standing, and policies can produce effects opposite to what they promised. AI may help us see these failures more clearly, but being better at inspection does not automatically grant authority over the final objective. We need to separate **competence** from **authorization**. A system may predict the consequences of different policies more accurately, while the tradeoff between those consequences still belongs to the people who must live with them.

## 7. Open-ended verification: goals are not absent, but formed during the process

When we choose a research direction, propose a new problem, set a long-term strategy, or imagine a novel, the objective is not fully present at the beginning. Saying that these tasks have no objective at all still goes too far. Researchers care about novelty, feasibility, explanatory power, possible impact, and their own curiosity, but exploration can reorder those criteria. What makes the task open-ended is that a candidate answer may change which question seems worth asking next.

Research on open-ended learning already uses novelty, learning progress, and human judgments of interestingness to select new environments. POET generates problems and solutions together. OMNI learns a model of interestingness from human data and uses it to choose the next task. [8][9] These projects show that open search can be made computational, but they also bring the original question back. Whose interests does the model represent? What does it fail to notice? After long optimization, will it start rewarding shortcuts that only the model itself finds interesting?

One experiment on research ideation captures this complexity well. After blind review by more than one hundred NLP researchers, model-generated ideas scored higher than expert ideas on novelty and slightly lower on feasibility. At the same time, the model was poor at evaluating its own ideas and tended to produce less diverse proposals. [10] AI may outperform humans early in one stage of an open task, while the value of the overall direction remains unclear until the idea is carried out and becomes part of a longer chain of knowledge.

## Each layer of verification creates something else to verify

The same move appears in all seven categories. To obtain faster feedback, we build a substitute evaluator. We use a simulator instead of reality, a surrogate endpoint instead of a long-term outcome, a statistical estimate instead of a single result, a preference model instead of asking every time, a user simulator instead of a real person, and a rule, constitution, or model of interestingness to make an open judgment temporarily fixed.

These substitutes are often useful, but they also become new optimization targets. Research on reward gaming shows that if a gap remains between proxy reward and the real objective, sufficiently strong optimization can force that gap wider. Even direct preference optimization can produce cases in which the proxy score keeps rising while underlying quality has already plateaued or declined. [11][12] A domain becoming trainable is not the same as it becoming reliably verifiable. We have moved the problem from verifying the solution to verifying the evaluator.

Each conversion should therefore leave a path back to the original target. Simulation needs audits in real deployment. Short-term proxies need delayed outcomes to flow back. Statistical estimates need explicit identification assumptions. Preference models need population coverage. User simulations need continued calibration with real people. Value judgments need legitimate public procedures. Open search needs evidence that it keeps producing directions that remain useful later. Once an evaluator stops accepting correction from the original target, the map slowly becomes the only world the system can see.

## Will AI surpass humans in the order of the seven categories?

My original guess about the ordering therefore needs to be more cautious. The idea that the first three categories lack resources while the last four lack definitions remains useful, but it does not imply a fixed path. Robotics and drug development sit in the earlier costly category, yet real tests are expensive, safety constraints are severe, and simulation never matches reality perfectly. Progress may remain slow. Image style, recommendation, and advertising creative are subjective, but abundant preference feedback allows them to iterate quickly. Games are interactive, yet self-play works extraordinarily well when rules, states, and winning conditions are fixed. Research ideation is open-ended, yet models can already compete with experts on novelty in controlled blind review.

Instead of asking where a task sits in the list, four questions may better predict how quickly AI will improve:

1. **Feedback bandwidth:** How many relatively independent evaluations can be obtained per unit of time?
2. **Evaluator fidelity:** Does the score still represent the original target after strong optimization?
3. **Distributional stability:** How quickly do tasks, users, and opponents change after deployment?
4. **Error reversibility:** Can failure be undone cheaply, or does it harm people, alter institutions, or contaminate future data?

AI should improve fastest where feedback is frequent, the evaluator is difficult to game, the environment is relatively stable, and mistakes can be reversed. Whether a task is subjective or objective does not determine its learning rate on its own. A task with a perfectly clear answer that arrives ten years later may be harder to learn than a subjective task that receives a million user choices every day.

## If the framework is useful, it should leave predictions that can fail

If this is more than another exercise in classification, it should leave a few claims that reality may eventually overturn:

1. In costly and delayed domains, learned evaluators will initially accelerate progress. If the fraction of real feedback keeps falling, the gap between proxy score and real outcomes will widen again under stronger optimization.
2. In subjective domains, personalized or distributional preference models will outperform a universal score, but the advantage will shrink as users drift and feedback becomes sparse.
3. Multi-agent self-play will progress fastest when rules are fixed and participants are symmetric. Its gains will weaken when real people can change rules, leave the system, or form coalitions.
4. Across domains, feedback bandwidth, evaluator fidelity, distributional stability, and error reversibility will explain the rate of AI progress better than a task's position in the seven-part list.

I still want to keep the seven categories, but not as a ladder of capability. They work better as a diagnostic map, reminding us that most of the world does not offer the cheap, immediate, and stable verifier of a mathematics problem. More importantly, they force us to ask one more question whenever we see an impressive score. Did it come from reality, a proxy, one population's preferences, or an environment already changed by the system's own actions?

Humans may remain involved longest in value-laden and open-ended domains, but not because human judgment must always be more capable. The deeper reason is that people are not external judges in these domains. Our interests, experiences, conflicts, and curiosity partly constitute the target. AI can help us discover options, predict consequences, expose contradictions, and propose directions we have never considered. Higher performance, however, cannot determine who has the authority to choose the goal, nor can it prove that a new goal should become everyone's goal. At this boundary, verification is no longer only a way to measure the world. It is also part of deciding what kind of world we want to enter together.

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
