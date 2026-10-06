---
title: "AI Blogs Worth Returning To"
slug: "ai-blogs-worth-returning-to"
language: "en"
tags: [reading-list, large-language-models, generative-models, agents]
excerpt: "A long-term reading list for language models, generative modeling, agent systems, interpretability, evaluation, and research judgment. These are not news feeds, but explanations and frameworks worth revisiting."
---

There is no shortage of AI writing online. What is harder to find is writing that changes the shape of a question after you read it. Some authors are unusually good at turning a dense research area into a clear map. Others show their uncertainty and let the reader see how a judgment is formed. A few publications are no longer active, yet still supply the language that newer discussions quietly depend on. This list is not meant to be exhaustive or ranked by popularity. It is a set of places worth returning to, with a note on what each one is especially useful for.

## Language models, reasoning, and training

1. **[Lilian Weng's Lil'Log](https://lilianweng.github.io/)** is one of the best places to build a map when entering a topic for the first time. Her articles connect papers, lines of work, and technical details inside one narrative, so they work both as introductions and as references to revisit later. A good starting point is [Why We Think](https://lilianweng.github.io/posts/2025-05-01-thinking/), which connects training methods for reasoning models with inference-time computation and evaluation.

2. **[Sebastian Raschka's Ahead of AI](https://magazine.sebastianraschka.com/)** reads like a continuously updated notebook on model research. Its strength is specificity. Posts often begin with a paper, an architectural change, or an implementation and explain what actually changed. For comparing model designs, start with the [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/).

3. **[Nathan Lambert's Interconnects](https://www.interconnects.ai/)** is useful for following post-training, reinforcement learning, open models, and the changing relationship between research and industry. It goes beyond restating results and asks why a piece of work matters now, as well as where experimental evidence, research narratives, and industry judgment may diverge. Start with [A Taxonomy for Next-Generation Reasoning Models](https://www.interconnects.ai/p/next-gen-reasoners), then use the [RLHF Book](https://rlhfbook.com/) for a more systematic foundation.

## Generative modeling

4. **[Sander Dieleman's blog](https://sander.ai/posts/)** is especially good for developing intuition about generative models. He often reinterprets familiar equations through geometry, signals, or probability, making connections between methods visible instead of presenting only a sequence of derivations. The best place to begin is [Perspectives on Diffusion](https://sander.ai/2023/07/20/perspectives.html).

5. **[Su Jianlin's Scientific Spaces](https://spaces.ac.cn/)** is a rare Chinese-language technical blog that has sustained a high density of mathematical derivation over many years. It is particularly valuable when you roughly know a result but still do not understand why the equations take the form they do. The diffusion series begins with [DDPM as Demolition and Construction](https://spaces.ac.cn/archives/9119).

6. **[Yang Song's blog](https://yang-song.net/blog/)** has relatively few posts, but several sit very close to the central ideas of score-based generative modeling. To understand why score matching, stochastic differential equations, and diffusion models belong in one framework, begin with [Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/).

## Agents and systems engineering

7. **[Anthropic Engineering](https://www.anthropic.com/engineering)** is useful for seeing how a frontier lab turns model capabilities into working agent systems. The most important lessons are usually not isolated prompting tricks, but the way context, tools, evaluation, and runtime environments jointly determine behavior. Start with [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

8. **[Simon Willison's Weblog](https://simonwillison.net/)** records a large number of concrete experiments, failures, and workflows involving AI tools. He rarely turns unstable experience into a grand conclusion, which makes the site particularly valuable for understanding what coding agents can do in real projects and where they break. Begin with [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/).

9. **[Chip Huyen's blog](https://huyenchip.com/blog/)** often approaches AI products as machine learning systems. Her writing places models, latency, cost, feedback, memory, and tool use inside the same system rather than comparing benchmarks in isolation. For agents, start with [Agents](https://huyenchip.com/2025/01/07/agents.html).

10. **[Eugene Yan's writing](https://eugeneyan.com/writing/)** is a good way to add the question of how we know a system is actually working. He writes about recommendation, search, LLM applications, and evaluation, often translating research findings into experiments that can be run in practice. For generative-system evaluation, begin with [Evaluating the Effectiveness of LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/).

## Inside models and interpretability

11. **[Transformer Circuits](https://transformer-circuits.pub/)** is not a conventional personal blog. It is closer to a growing research publication on mechanistic interpretability. The articles reward close reading rather than skimming. For the early framework, begin with [A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html). To see how the methods extend to a real large language model, read [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html).

12. **[Distill](https://distill.pub/)** is no longer actively publishing, but it remains an important archive of explanatory machine learning writing. Its enduring lesson is not only in the conclusions of individual articles, but in how prose, diagrams, and interaction can work together to create intuition. It is worth revisiting whenever a topic can be expressed in equations but its geometric picture remains unclear.

## Evaluation, learning, and research judgment

13. **[Thinking Machines Lab's Connectionism](https://thinkingmachines.ai/blog/)** covers training, post-training, and research practice. There are not many articles, but they tend to make the experimental logic behind a technical choice explicit. Start with [On-Policy Distillation](https://thinkingmachines.ai/blog/on-policy-distillation/) for a discussion of distillation, reinforcement learning, and the student's own distribution.

14. **[Ferenc Huszár's inFERENCe](https://www.inference.vc/)** is a good place for questions that do not fit neatly inside one paper category, including uncertainty, Bayesian views, generative models, and conceptual mistakes in machine learning research. A useful starting point is [Implicit Bayesian Inference in Large Language Models](https://www.inference.vc/implicit-bayesian-inference-in-sequence-models/).

15. **[Jacob Steinhardt's Bounded Regret](https://bounded-regret.ghost.io/)** is closer to a researcher's long-term notebook, often concerned with measurement, generalization, AI progress, and uncertainty in research judgment. It is valuable when you want to step outside a particular technique and ask what the progress we observe is actually made of, and what has not yet been measured reliably. Begin with [Measurement, Optimization, and Take-off Speed](https://bounded-regret.ghost.io/measurement-and-optimization/).

## If I were starting with five articles

Rather than opening all fifteen sites at once, I would begin with these five. Together they offer five distinct perspectives on reasoning, generative modeling, agent engineering, internal mechanisms, and evaluation:

1. [Why We Think](https://lilianweng.github.io/posts/2025-05-01-thinking/)
2. [Perspectives on Diffusion](https://sander.ai/2023/07/20/perspectives.html)
3. [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
4. [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)
5. [Evaluating the Effectiveness of LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/)

This list will keep changing. Some of these sites reward systematic reading from the beginning, while others are best approached through the one or two posts that match the question at hand. Trying to finish every link is probably less useful than entering with a concrete question, stopping when the question has been reformulated, and carrying the new vocabulary into the next piece.
