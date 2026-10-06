---
title: "递归自我改进正在改进什么？一张正在形成的研究地图"
slug: "rsi-research-map"
date: "2026-10-05"
maturity: "evolving"
tags: [递归自我改进, 自主研究, 研究智能体, 领域地图]
related: [open-questions-on-recursive-self-improvement, when-machines-reinvent-their-own-concepts, folding-the-agent-world]
excerpt: "越来越多团队都在谈递归自我改进，可它们口中的“自我”并不是同一个东西。真正值得追问的是：系统改了哪里，这次改变又有没有让下一次改进变得更容易？"
placeholder: false
language: "zh"
defaultLanguage: "en"
---

> 越来越多团队都在谈递归自我改进，可它们口中的“自我”并不是同一个东西。与其急着判断谁走得最远，不如先问：系统改了哪里，这次改变又有没有让下一次改进变得更容易？

最近，研究递归自我改进的公司、实验室和开源项目一下子多了起来。它们常用的词也很像：自动研究、自我进化、持续学习、人工智能改进人工智能，或者让研究系统加速自身进步。可一旦把这些名字排成一张名单，差别反而容易被抹平。会重写提示词和工具的智能体、把推理结果蒸馏回参数的模型、自动运行机器学习实验的平台，以及让算法与芯片一起演化的系统，都可能被称为“自我改进”，但它们所说的“自我”并不相同，想解决的问题也不相同。

我不太想把它写成一张公司排行榜，更不想假装已经知道终点在哪里。这篇笔记更像一张阅读地图：先把一个人工智能研究系统拆开，再看各个团队究竟在改哪一部分、怎样判断修改有没有用，以及他们公开的结果到底能说明什么。

## 先把“自我”拆开

今天的人工智能研究系统早已不只是一个模型。更准确地说，它是下面这些部分一起工作的结果：

$$
\text{研究系统}
=
\text{模型权重}
+
\text{智能体框架}
+
\text{记忆与工具}
+
\text{评价器}
+
\text{任务环境}
+
\text{计算硬件}
$$

其中任何一层变得更好，都可以宽泛地叫作“改进”。但要称得上递归，要求要高得多：这次改变不能只让系统把眼前的任务做得更好，它还要回到下一轮循环里，帮助系统更有效地发现、验证或实现新的改变。让智能体替一个外部模型寻找更好的训练方法，属于自动化研究；让它改写自己的搜索框架，再用新的框架继续改写自己，才更接近严格意义上的递归自我改进。即便分数上升了，也不能立刻推出系统更会改进自己，因为提升可能只是来自更多计算、对评价器的迎合，或者一个只在当前任务上碰巧有效的技巧。

所以，阅读这些项目时，我主要抓住两个问题：**系统到底改了什么？** 以及，**这种改进离开眼前的测试以后还成立吗？它能不能帮助系统完成下一轮改进？**

## 一、先把大家放到同一把尺子上

[OpenRSI Foundation](https://openrsi.foundation/) 和它正在建设的 [OpenRSI Index](https://index.openrsi.foundation/) 做的事情，不是宣布某个系统已经实现了递归自我改进，而是尝试给这个领域提供一套共同的测试。它把预训练、后训练、视觉生成等真实的基础模型研发工作整理成可执行、可复现、能够相互比较的任务，再看研究智能体能否在同样的条件下超过人类基线。Index 目前仍是早期预览，不过它抓住了一个关键点：我们真正想测的，不是智能体能不能独立跑完一次实验，而是它究竟为整条研发流程带来了多少可以确认、也可以归因的进步。

这里容易混淆的一点是，它和 [Frontis 的 OpenRSI](https://github.com/FrontisAI/OpenRSI) 不是同一个项目。前者是研究社区共同建设的评价与协作平台，后者则是 Frontis 面向机器学习工程发布的一套模型、训练环境和进化搜索系统。两个项目恰好用了同一个名字，也从侧面说明这个领域的概念和边界还没有完全稳定下来。

没有共同的尺子，每个团队都可以把“自我”的边界画在最方便的位置。一个系统可能会修改提示词，却把底层模型当作永远不变的外部条件；另一个系统可能训练出了更强的模型，却把提出训练方法的人类研究者留在循环之外。它们都可以说自己在改进，但说的其实只是整个系统的一部分。比较这些工作时，至少应该固定资源成本，把系统看得到的反馈和真正用于检验的隐藏测试分开，连续追踪多轮变化，还要看新版本能不能在没有参与筛选的任务上继续奏效。

## 二、为什么大家先从改写智能体开始

软件工程成了递归自我改进最活跃的试验场，并不是因为会写代码就等于拥有一般智能，而是因为代码特别容易形成闭环。智能体可以读自己的实现，提出修改，在沙箱中运行测试，根据结果决定保留还是回滚，然后让留下来的版本继续参加下一轮。反馈来得快，成本也相对可控，于是“系统修改系统”终于可以被一遍遍重复，而不再只是一个思想实验。

[Sakana AI](https://sakana.ai/) 与英属哥伦比亚大学合作的 [Darwin Gödel Machine](https://sakana.ai/dgm/) 是一个很直观的例子。它不会只留下眼下分数最高的版本，而是保存一整个不断生长的智能体家族，让后来的修改可以从不同的祖先继续分叉。在公开实验里，系统靠改写自己的工具和工作流程，把 SWE-bench 上的表现从 20.0% 提高到 50.0%，在 Polyglot 上从 14.2% 提高到 30.7%。比数字更有意思的是，有些当时表现一般的版本并没有立刻被丢掉，后来反而成了通向更好方案的中间台阶。Sakana 随后成立了专门的 [递归自我改进实验室](https://sakana.ai/rsi-lab/)，把 DGM、ShinkaEvolve、AI Scientist 等工作串成了一条更完整的研究路线。

[SICA](https://github.com/MaximeRobeyns/self_improving_coding_agent) 把这个循环缩得更小，也更容易复现：先测试当前的编程智能体，再让它直接修改自己的代码库，然后重新测试。论文报告说，它在 SWE-bench Verified 的一个随机子集上从 17% 提高到了 53%。这仍然只是有限任务中的结果，但实验的好处是足够清楚：系统改了什么、在哪里接受测试、不同版本怎样一步步产生，都可以直接检查。iGent 是相关作者所在的公司，不过如果想理解技术本身，公开的 SICA 仓库和论文比公司产品页更值得先看。

[Weco AI](https://www.weco.ai/) 的 [AIDE²](https://www.weco.ai/blog/first-evidence-of-recursive-self-improvement) 在外面又加了一层。内层智能体负责改进机器学习代码、启发式算法或智能体框架，外层智能体则直接改写这个内层智能体。在八天和 100 次外层迭代中，系统留下了七个连续变好的版本，其中一部分收益也延伸到了没有参与优化的任务。更难得的是，Weco 没有顺势把它说成智能爆炸。按照团队自己的分级，这个结果达到了“净正收益”，但还不足以证明被改进的内层智能体已经变成了更强的外层改进者，也就是说，它还没有通过团队所谓的“点火测试”。在一个概念经常被说得过满的领域里，这种保留很重要。

[Poetiq](https://poetiq.ai/) 对“自我”的理解更宽：需要改进的不是一组孤立的模型权重，而是模型、代码、提示词和搜索策略共同组成的优化系统。它把这条路线称为 self-optimizing optimizer，并强调目前的进展主要来自对智能体框架和代码的修改，而不是重新训练参数。[Prime Intellect](https://www.primeintellect.ai/) 的 [Prime Agent](https://www.primeintellect.ai/blog/prime-agent) 也采用了类似的视角，让系统能够改动自己的上下文、记忆、技能、子智能体和研究流程。Prime Agent 更像一个为长期自主工作准备的、可以一边使用一边调整的运行环境。这些项目提醒我们，模型之外同样存在大量会影响能力的结构。不过，允许系统修改这些结构是一回事，证明修改能持续积累、还能迁移到新的任务上，则是另一回事。

## 三、当改进不再只留在代码里

修改提示词、脚本和工具，通常比重新训练模型快得多。但如果所有经验都留在模型外面，系统可能会不断长出新的补丁和流程，却没有真正学会更好的起点。因此，另一批团队关心的是：能不能把搜索和推理中得到的经验重新写回模型，让下一次思考不用再从原处开始？

[Deep Cogito](https://www.deepcogito.com/) 的 Cogito 系列把这个过程称为迭代蒸馏与放大。模型先在推理阶段花费更多计算，搜索出更好的做法，再把这些结果蒸馏回参数，让下一轮一开始就站在更好的位置上。[Cogito v2](https://www.deepcogito.com/research/cogito-v2-preview) 进一步把重点放在迭代策略改进上。它想做的不只是让模型想得更久，而是把一次昂贵搜索沉淀成下一次更便宜的“直觉”。不过，模型本身变强了，不等于改进模型的过程也变强了；要证明后者，仍然需要观察连续几代系统怎样变化。

[Frontis-MA1](https://github.com/FrontisAI/OpenRSI) 则把模型学习和外部搜索放进了同一套机器学习工程环境。它先利用可执行反馈训练起草、改进、调试和交叉组合等程序操作，再由 OpenMLE-Evo 把这些操作组织成长时间的搜索。这个项目有意把两种收益分开：一部分来自模型经过后训练后确实变得更好，另一部分来自搜索过程本身更加充分；随后，它又在没有参与训练的 NatureBench Lite 上分别检查两者能否迁移。这样的拆分很有价值，因为“模型更强”和“模型获得了更多搜索机会”很容易在一个总分里被混为一谈。

[Recursive](https://www.recursive.com/) 想用开放式算法持续加快人工智能研发。它公开的早期系统已经能够围绕一个目标提出想法、实现修改、运行实验、检查方差与奖励投机，然后根据结果决定接下来探索哪条分支；在小模型训练、固定预算下的性能和 GPU kernel 优化上，系统也找到了进一步的改进。[这些结果](https://www.recursive.com/articles/first-steps-toward-automated-ai-research) 很好地说明了人工智能研究的若干环节已经可以被连续自动化，但还不能直接说明一般性的递归自我改进已经实现。真正未回答的问题是：经过多轮以后，这个系统会不会越来越擅长改进自己的研究方法，而不仅仅是越来越擅长解决当前给定的问题。

[Ineffable Intelligence](https://www.ineffable.ai/) 把目标定得更远：希望系统不再依赖人类提供的现成数据，也能持续发现新的知识和技能。与那些已经公开详细实验、代码或技术报告的项目相比，它现在展示出来的内容更像一份研究宣言。把它放进这张地图，是因为它选择的问题值得关注，并不意味着它的愿景已经可以和实验结果放在同一层比较。

## 四、让循环真正碰到现实世界

代码、数学和小规模训练任务有一个共同的便利：结果很快就能回来，而且容易自动判断。真正的科学研究没有这么干净。实验昂贵，观测可能含糊，设备会出故障，一个答案有时要等上几天甚至几个月。如果递归自我改进最终要帮助我们获得新的知识，它就不能永远待在数字基准里。系统还要学会怎样向现实世界提问，并在世界给出意外答案时修改自己的判断。

[Periodic Labs](https://periodic.com/) 正在把模型接入高通量的物理实验室。它的设想不是让语言模型反复咀嚼已有论文，而是通过真实实验产生互联网上从未出现过的数据，再让模型参与判断下一步应该制造什么、怎样合成，以及实验最终得到了什么材料。[Building Labs that Learn](https://periodic.com/news/building-labs-that-learn) 展示了这个想法的早期形态：实验数据反过来训练科学模型，模型又逐渐参与后续实验的选择与分析。它现在更像一间“会学习的实验室”，还不是完整的递归自我改进，但它补上了纯软件循环最缺的一样东西：来自现实的反馈。

[Inherent](https://inherentlabs.ai/) 选择先从研究复现做起。[Faraday](https://inherentlabs.ai/research/training-to-replicate) 的任务不是写一篇看起来像论文的文字，而是真正把论文里的方法重新实现出来，再检查能不能得到相符的结果。复现听上去没有原创发现那么耀眼，却是自动研究不可跳过的一步：如果一个系统连已有结论都无法稳定重建，它也很难知道自己的“新发现”究竟来自新的机制、一次偶然，还是实验代码里的错误。

[Autoscience](https://www.autoscience.ai/) 也在尝试自动运行机器学习研究，让系统探索想法，并把实验所得转化成更好的模型。[Mirendil](https://mirendil.com/) 走得更整体一些：它想重新设计整间人工智能实验室，让模型训练、评价、部署和研究流程一起加速。在这些项目里，需要改进的不再只是某个智能体文件或某一组权重，而是实验室产生新能力的整个过程。这可能是递归自我改进很重要的一层，不过它们目前公开的内容更多是在描述目标和系统边界。要判断实验室是否真的越来越会做研究，还需要看到更多能够独立重复的结果。

## 五、当硬件也进入改进循环

还有一些团队把循环一直延伸到了计算硬件。[Ricursive Intelligence](https://www.ricursive.com/) 从芯片设计切入，希望先用人工智能设计更好的芯片，再让这些芯片加速下一代人工智能。这里尤其容易被名字绕晕：它和前面提到的 Recursive 是两家公司。**Ricursive** 研究的是芯片与人工智能之间的相互加速，**Recursive** 关注的则是开放式算法和自动化人工智能研究。

[Extropic](https://extropic.ai/) 的方向更特别。它一边开发热力学计算硬件，一边训练专门的研究智能体，为这种新硬件寻找合适的算法。[First Sparks of Thermodynamic Recursive Intelligence](https://extropic.ai/writing/baby-thermo-rsi) 展示的是这个计划很早的一步：先在经典连接主义实验的复现任务上后训练一个开放模型，未来再把真实热力学芯片的测量结果接入循环。这里不再只是“软件修改软件”。新的算法可能让硬件做更多事情，而硬件又可能降低研究智能体推理和实验的能耗。如果两边真的能互相推动，被改进的就不只是模型和代码，而是整个计算方式。

## 六、不要让“递归”这个词掩盖差别

为了不被宏大的说法带着走，我暂时把公开结果分成五层。这不是给公司排座次，而是提醒自己在看到一项新成果时，还应该继续问到哪一步。

- **先有一个方向。** 团队明确想做持续学习或自我改进，但还没有公开足够的可重复实验。
- **在有限环境里自动研究。** 系统能够提出想法、执行实验并选择更好的结果，但它改进的仍然是外部目标。
- **开始修改自己。** 系统会改自己的代码、框架、记忆或权重，而且在当前测试里确实变好了。
- **离开当前测试后仍然有效。** 收益可以迁移到隐藏任务、不同模型、不同环境或后续版本，而不只是适应眼前的分数。
- **连“怎样改进”也一起变强。** 新系统不只更会完成任务，也更擅长产生下一次改进，并且这种优势在固定资源下能够延续。

目前已经有不少可信的结果走到了第二层和第三层，也有少数实验开始显示出第四层的迁移。真正困难的是第五层，因为系统新获得的能力必须反过来增强产生下一次改进的过程。即便某个实验里出现了正反馈，也还要看它会不会很快饱和，是不是仍然依赖人类不断提供新任务和评价方法，以及系统改变了周围环境以后，原来的测试还能不能说明问题。

这也是为什么我没有把对话里出现的每家公司都直接归入“递归自我改进”。[NeoCognition](https://neocognition.io/)、[Adaption](https://adaptionlabs.ai/)、[Reflection](https://reflection.ai/) 和 [d/dx](https://ddx.inc/) 都在研究相邻的问题，例如自主研发、持续学习或下一代研究系统，但它们的公开定位和已经拿出的技术证据并不一样。与其为了凑出一张整齐的表格而把所有名字贴上同一个标签，不如先把它们放在观察名单里，等待更具体的结果。

## 这张地图让我看到什么

这张地图里最明显的趋势，并不是某种架构已经胜出，而是大家开始不再把模型看成能力唯一的容器。代码、上下文、记忆、评价器、实验环境、组织流程和硬件都能保存经验，也都可能在下一轮里发生变化。不同团队其实选择了不同的时间尺度：提示词可以几分钟改一次，智能体框架可以在几小时或几天里迭代，更新模型权重需要更长的周期，物理实验室和芯片的变化最慢，却能带回数字世界里原本不存在的新证据。

困难也在悄悄转移。现在，提出一个看起来合理的改进已经越来越便宜，真正昂贵的是判断它究竟有没有变好：结果能不能迁移，现实实验是否支持，失败到底来自哪里，留下来的系统又能不能继续维护。系统越擅长迎合评价器，我们就越需要隐藏测试、独立复现、严格的成本约束和来自环境的新数据。否则，循环虽然变快了，却可能只是更快地把一个局部指标放大成整个系统的盲点。

因此，比公司数量更值得追踪的，是这些循环究竟怎样一点点闭合：哪些经验被写进代码，哪些进入权重，哪些留在外部记忆里，又有哪些只能由真实世界提供；评价器能不能跟上被评价的系统；一次改变是否留下了足够清楚的来龙去脉，让下一代知道自己继承了什么。只有当这些问题开始得到可重复的回答，“递归自我改进”才会慢慢从一个吸引人的总称，变成一批能够相互比较、接受反驳并继续积累的研究结果。

## 官网与技术入口

以下链接均使用官网、项目主页、代码仓库或论文的干净地址，不包含聊天平台添加的追踪参数。

- [OpenRSI Foundation](https://openrsi.foundation/) · [OpenRSI Index](https://index.openrsi.foundation/) · [代码](https://github.com/OpenRSI-Foundation/OpenRSI-Index)
- [Recursive](https://www.recursive.com/) · [自动化人工智能研究的早期结果](https://www.recursive.com/articles/first-steps-toward-automated-ai-research)
- [Weco AI](https://www.weco.ai/) · [AIDE² 技术文章](https://www.weco.ai/blog/first-evidence-of-recursive-self-improvement) · [论文](https://arxiv.org/abs/2609.26457)
- [Sakana AI 递归自我改进实验室](https://sakana.ai/rsi-lab/) · [Darwin Gödel Machine](https://sakana.ai/dgm/) · [代码](https://github.com/jennyzzt/dgm)
- [SICA 代码](https://github.com/MaximeRobeyns/self_improving_coding_agent) · [论文](https://arxiv.org/abs/2504.15228)
- [Poetiq](https://poetiq.ai/) · [递归自我改进观点](https://poetiq.ai/posts/rsi_perspective/) · [代码](https://github.com/poetiq-ai/poetiq-arc-agi-solver)
- [Prime Intellect](https://www.primeintellect.ai/) · [Prime Agent](https://www.primeintellect.ai/blog/prime-agent) · [自主研究评估](https://www.primeintellect.ai/blog/measuring-autonomous-research)
- [Frontis](https://frontis.ai/) · [OpenRSI 与 Frontis-MA1](https://github.com/FrontisAI/OpenRSI) · [论文](https://arxiv.org/abs/2607.28568)
- [Deep Cogito](https://www.deepcogito.com/) · [Cogito v1](https://www.deepcogito.com/research/cogito-v1-preview) · [Cogito v2](https://www.deepcogito.com/research/cogito-v2-preview)
- [Ineffable Intelligence](https://www.ineffable.ai/)
- [Inherent](https://inherentlabs.ai/) · [训练人工智能科学家复现研究](https://inherentlabs.ai/research/training-to-replicate)
- [Autoscience](https://www.autoscience.ai/)
- [Mirendil](https://mirendil.com/) · [项目介绍](https://mirendil.com/news/announcing-mirendil/)
- [Periodic Labs](https://periodic.com/) · [会学习的实验室](https://periodic.com/news/building-labs-that-learn)
- [Ricursive Intelligence](https://www.ricursive.com/)
- [Extropic](https://extropic.ai/) · [热力学递归智能的早期实验](https://extropic.ai/writing/baby-thermo-rsi)

## 延伸阅读

- [Schmidhuber，Gödel Machine](https://people.idsia.ch/~juergen/goedelmachine.html)
- [Clune，AI-generating algorithms](https://arxiv.org/abs/1905.10985)
- [Silver 与 Sutton，The Era of Experience](https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf)
- [METR，RE-Bench](https://github.com/METR/RE-Bench)
- [ICLR 2026 递归自我改进研讨会](https://recursive-workshop.github.io/)
