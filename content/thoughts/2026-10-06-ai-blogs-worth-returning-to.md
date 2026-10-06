---
title: "一份值得反复阅读的 AI 博客清单"
slug: "ai-blogs-worth-returning-to"
date: "2026-10-06"
maturity: "evolving"
tags: [reading-list, large-language-models, generative-models, agents]
related: [concepts-a-model-can-think-with, intelligence-in-an-unknown-language, rsi-research-map]
excerpt: "一份偏研究与工程的长期阅读清单，覆盖大模型推理、生成模型、智能体系统、模型内部机制、评估与研究判断。这里收集的不是最新资讯，而是值得回去重读的解释、框架和问题。"
placeholder: false
language: "zh"
defaultLanguage: "en"
---

网上从来不缺 AI 内容，真正稀缺的是那些读完以后会改变问题形状的文章。有些作者擅长把复杂工作重新整理成清楚的知识地图，有些会公开自己仍在摇摆的判断，还有一些文章虽然不再新，却仍然提供了后来讨论反复借用的语言。这份清单不追求收得最多，也不按热度排列。我更想保留一组可以长期回去阅读的入口，并为每一个入口标出它最适合帮助我理解什么。

## 大模型、推理与训练

1. **[Lilian Weng 的 Lil’Log](https://lilianweng.github.io/)** 适合在第一次进入一个主题时建立完整地图。文章通常会把论文、方法谱系和关键技术细节放进同一条叙述里，所以既可以作为入门，也很适合隔一段时间回来查漏补缺。可以先读 [Why We Think](https://lilianweng.github.io/posts/2025-05-01-thinking/)，它把推理模型中的训练方法、推理时计算和评价问题连接在一起。

2. **[Sebastian Raschka 的 Ahead of AI](https://magazine.sebastianraschka.com/)** 更接近一份持续更新的模型研究笔记。它的优点是具体，常常从一篇论文、一个架构变化或一次实现出发，解释新方法究竟改了什么。想比较模型结构时，可以直接从他的 [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/) 开始。

3. **[Nathan Lambert 的 Interconnects](https://www.interconnects.ai/)** 适合跟踪后训练、强化学习、开放模型和研究产业之间的变化。它不只复述论文结果，也会讨论一项工作为什么在此刻重要，以及实验信号、研究叙事和行业判断之间可能有哪些距离。可以从 [A Taxonomy for Next-Generation Reasoning Models](https://www.interconnects.ai/p/next-gen-reasoners) 开始，再把 [RLHF Book](https://rlhfbook.com/) 当作系统性的背景材料。

## 生成模型

4. **[Sander Dieleman 的博客](https://sander.ai/posts/)** 很适合建立生成模型的直觉。他会从几何、信号或概率的角度重新解释熟悉的公式，让不同方法之间的联系变得可见，而不只是给出一串推导。最值得先读的是 [Perspectives on Diffusion](https://sander.ai/2023/07/20/perspectives.html)。

5. **[苏剑林的科学空间](https://spaces.ac.cn/)** 是少见的、长期保持高密度推导的中文技术博客。它尤其适合在“我大概知道结论，但还没有真正理解公式为什么这样写”时回来看。扩散模型系列可以从 [生成扩散模型漫谈（一）：DDPM = 拆楼 + 建楼](https://spaces.ac.cn/archives/9119) 开始，再沿着系列继续读。

6. **[Yang Song 的博客](https://yang-song.net/blog/)** 篇数不多，但几篇文章都靠近 score-based generative modeling 的核心思想。如果想理解 score matching、随机微分方程与扩散模型为什么能够被放在同一个框架里，可以先读 [Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)。

## Agent 与系统工程

7. **[Anthropic Engineering](https://www.anthropic.com/engineering)** 适合观察一个前沿实验室怎样把模型能力组织成可工作的 agent 系统。这里值得注意的往往不是单个提示技巧，而是 context、工具、评价和运行环境如何共同决定系统表现。可以从 [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) 开始。

8. **[Simon Willison 的 Weblog](https://simonwillison.net/)** 保留了大量真实使用 AI 工具时的实验、失败和工作流细节。他很少把尚未稳定的经验包装成宏大的结论，因此特别适合了解 coding agent 在实际项目中能做什么、哪里容易出错。可以先看 [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)。

9. **[Chip Huyen 的博客](https://huyenchip.com/blog/)** 经常从机器学习系统的角度讨论产品化问题。她会把模型、延迟、成本、反馈、记忆与工具使用放进同一个系统，而不是只比较 benchmark。关于 agent，可以从 [Agents](https://huyenchip.com/2025/01/07/agents.html) 开始。

10. **[Eugene Yan 的文章](https://eugeneyan.com/writing/)** 很适合补上“怎样知道系统真的有效”这一层。他写推荐系统、搜索、LLM 应用和评价，通常会把研究结论翻译成可落地的实验问题。对生成式系统的评价感兴趣，可以先读 [Evaluating the Effectiveness of LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/)。

## 模型内部机制与可解释性

11. **[Transformer Circuits](https://transformer-circuits.pub/)** 不是传统意义上的个人博客，更像一个持续生长的机制可解释性研究出版物。它的文章适合精读，不适合快速浏览。早期框架可以从 [A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html) 进入，想看研究方法怎样扩展到真实大模型，可以读 [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)。

12. **[Distill](https://distill.pub/)** 已经不再持续更新，但仍然是解释型机器学习写作的重要档案。它最值得学习的不只是某一篇文章的结论，而是文字、图形和交互怎样共同帮助读者形成直觉。遇到自己只能用公式解释、却说不清几何图景的问题时，很适合回来翻一翻。

## 评估、学习与研究判断

13. **[Thinking Machines Lab 的 Connectionism](https://thinkingmachines.ai/blog/)** 关注模型训练、后训练与研究实践，文章数量不多，但通常会把一个技术选择背后的实验逻辑讲清楚。可以从 [On-Policy Distillation](https://thinkingmachines.ai/blog/on-policy-distillation/) 开始，看蒸馏、强化学习与学生模型自身分布之间的关系。

14. **[Ferenc Huszár 的 inFERENCe](https://www.inference.vc/)** 适合读那些不容易被归进单一论文主题的问题，例如不确定性、贝叶斯视角、生成模型和机器学习研究中的概念误区。可以先读 [Implicit Bayesian Inference in Large Language Models](https://www.inference.vc/implicit-bayesian-inference-in-sequence-models/)。

15. **[Jacob Steinhardt 的 Bounded Regret](https://bounded-regret.ghost.io/)** 更接近研究者的长期思考记录，常常讨论测量、泛化、AI 进展和研究判断中的不确定性。它适合在具体技术之外追问：我们看到的进步到底由什么构成，又有哪些东西尚未被可靠测量。可以从 [Measurement, Optimization, and Take-off Speed](https://bounded-regret.ghost.io/measurement-and-optimization/) 开始。

## 如果只先读五篇

如果不想一开始就打开十五个入口，我会先读下面五篇。它们分别提供推理、生成模型、agent 工程、模型内部机制和评价这五种不同视角：

1. [Why We Think](https://lilianweng.github.io/posts/2025-05-01-thinking/)
2. [Perspectives on Diffusion](https://sander.ai/2023/07/20/perspectives.html)
3. [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
4. [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)
5. [Evaluating the Effectiveness of LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/)

这份清单会继续变化。有些博客适合从头系统阅读，有些只需要挑一两篇真正与当前问题有关的文章。比起把所有链接读完，更有用的方式也许是带着一个具体问题进入，读到自己的问题被重新表述以后就停下来，再把新的关键词带到下一篇文章里。
