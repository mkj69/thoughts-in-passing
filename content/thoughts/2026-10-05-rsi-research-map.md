---
title: "递归自我改进正在改进什么？一张正在形成的研究地图"
slug: "rsi-research-map"
date: "2026-10-05"
maturity: "evolving"
tags: [递归自我改进, 自主研究, 研究智能体, 领域地图]
related: [open-questions-on-recursive-self-improvement, when-machines-reinvent-their-own-concepts, folding-the-agent-world]
excerpt: "越来越多团队开始把自己的工作描述为递归自我改进，但它们改进的对象其实并不相同。与其列一张公司名单，不如先问：循环中的哪一层正在变化，变化又是否真的提高了下一轮改进的能力？"
placeholder: false
language: "zh"
defaultLanguage: "en"
---

> 越来越多团队开始把自己的工作描述为递归自我改进，但它们改进的对象其实并不相同。与其先问谁最接近递归自我改进，不如先问：循环中的哪一层正在变化，变化又是否真的提高了下一轮改进的能力？

最近一段时间，围绕递归自我改进的公司、实验室和开源项目突然多了起来。它们使用相似的语言：自动研究、自我进化、持续学习、人工智能改进人工智能，以及能够加速自身进步的研究系统。但把这些名字放在同一张名单里，会产生一种误导性的整齐感。一个会重写提示词和工具的智能体，一个把推理结果蒸馏回参数的模型，一个自动运行机器学习实验的研究平台，以及一个让算法与芯片共同演化的系统，都可以被称为“自我改进”，但它们解决的并不是同一个问题。

所以，这篇笔记不是公司排行榜，也不试图判断谁会最先抵达某个想象中的终点。它更像一张阅读地图：先把“系统”拆开，再看每个团队选择了哪个可修改的对象、用什么反馈判断进步，以及公开证据究竟支持多强的结论。

## 先把“自我”拆开

一个现代人工智能研究系统通常不只是一个模型。它更接近下面这个组合：

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

这里的每一层都可以被改进，但只有当一次改进重新进入下一轮，并提高系统继续发现、验证或实施改进的能力时，“递归”才开始具有更严格的含义。让智能体优化一个外部模型是一种自动化研究；让它重写自己的搜索框架，并用改进后的框架继续重写自己，则更接近递归自我改进。一次更新提高了目标任务的分数，也不等于系统已经更会改进自己，因为收益可能来自更大的计算预算、对评价器的过拟合，或者只在一个任务上有效的技巧。

因此，我更愿意用两个问题来阅读这个领域。第一个问题是：**被更新的对象是什么？** 第二个问题是：**证据是否跨过了当前评价，证明更新后的系统在新的任务或下一层改进循环中仍然更强？**

## 一、先建立共同的测量语言

[OpenRSI Foundation](https://openrsi.foundation/) 和它正在建设的 [OpenRSI Index](https://index.openrsi.foundation/) 并不是一家宣称已经完成递归自我改进的公司，而更像是这个领域的公共测量基础设施。它试图把真实的基础模型研发工作变成可以执行、复现和比较的任务，覆盖预训练、后训练、视觉生成等环节，并要求研究智能体在相同任务上超过人类基线。目前的 Index 仍是早期预览，但它提出了一个很重要的方向：评价对象不应只是智能体完成一次实验的能力，而应是它在真实研发栈中带来的、可以归因的增量。

这个项目需要和 [Frontis 的 OpenRSI](https://github.com/FrontisAI/OpenRSI) 区分开。前者是由研究社区建设的评价与协作平台；后者是 Frontis 围绕机器学习工程发布的一套模型、训练环境和进化搜索系统。它们名字相同，却不是同一个组织或项目。这种容易混淆的命名，也说明这个领域仍处于概念快速成形的阶段。

共同的测量语言之所以重要，是因为不同团队很容易各自选择最有利的“自我”。如果系统只修改提示词，却把底层模型能力视为外部常量；或者只训练一个更强的模型，却把提出训练方法的人类研究者排除在闭环之外，那么“自我改进”都只覆盖了系统的一部分。一个可信的评价框架至少需要固定成本，隔离公开反馈与隐藏测试，追踪多轮改进，并检查新版本能否迁移到未参与选择的任务。

## 二、改写智能体代码：目前最容易闭合的循环

软件工程之所以成为递归自我改进最活跃的试验场，不是因为写代码等于一般智能，而是因为这里的反馈便宜、快速、可执行。智能体可以读取自己的代码，提出修改，在沙箱中运行测试，用基准决定保留还是回滚，然后让新版本进入下一轮。这使“系统修改系统”第一次变成了可以反复运行的实验，而不只是思想实验。

[Sakana AI](https://sakana.ai/) 与英属哥伦比亚大学合作的 [Darwin Gödel Machine](https://sakana.ai/dgm/) 是这条路线中最清楚的例子之一。它不只保留当前表现最好的版本，而是维护一个不断扩展的智能体档案，让后续修改可以从不同祖先分叉。公开实验中，系统通过重写自己的工具和工作流程，把 SWE-bench 上的表现从 20.0% 提高到 50.0%，在 Polyglot 上从 14.2% 提高到 30.7%。这里真正有意思的不只是分数，而是开放式搜索保留了暂时较差但后来有用的“踏脚石”。Sakana 后来成立了专门的 [递归自我改进实验室](https://sakana.ai/rsi-lab/)，把 DGM、ShinkaEvolve、AI Scientist 和其他进化式研究系统放在同一条研究谱系中。

[SICA](https://github.com/MaximeRobeyns/self_improving_coding_agent) 采取了一个更小、更容易复现的闭环：评价当前 coding agent，让它在自己的代码库上提出改进，再重新评价。论文报告它在 SWE-bench Verified 的一个随机子集上从 17% 提高到 53%。这仍然是有限任务上的实验，但它提供了一个很有价值的最小范式：修改对象、评价环境和版本谱系都可以被直接检查。iGent 是相关作者所在的公司，但公开的 SICA 仓库和论文比公司产品页面更适合作为技术入口。

[Weco AI](https://www.weco.ai/) 的 [AIDE²](https://www.weco.ai/blog/first-evidence-of-recursive-self-improvement) 又向外套了一层循环。内层智能体优化机器学习代码、启发式算法或 agent harness，外层智能体则直接改写内层智能体的代码。在八天、100 次外层迭代中，系统保留了七个连续改进的版本，而且部分收益迁移到了没有参与优化的任务。更值得注意的是，Weco 没有把这个结果直接描述成智能爆炸。按照他们自己的分级，它达到的是“净正收益”，但尚未提供充分证据证明改进后的内层智能体已经成为更强的外层改进者，也就是尚未通过他们所说的 ignition test。这是当前讨论中少见但非常必要的克制。

[Poetiq](https://poetiq.ai/) 选择把“自我”定义为由模型、代码、提示词和搜索策略构成的整个优化系统，而不是单独的模型权重。它把自己的路线称为 self-optimizing optimizer，并明确强调目前的成果主要来自 harness 和代码的优化，而不是参数更新。[Prime Intellect](https://www.primeintellect.ai/) 的 [Prime Agent](https://www.primeintellect.ai/blog/prime-agent) 也把可变对象扩展到上下文、记忆、技能、子智能体和研究工作流。它更像一个为长期自主研究准备的可修改运行时。目前这些项目最有价值的地方，在于它们让“模型之外的认知结构”成为一等研究对象；但一个框架允许系统修改自己，并不自动证明这些修改会形成持续、可迁移的递归收益。

## 三、让改进进入模型权重

修改外部代码的循环可以运行得很快，但很多能力仍然依赖底层模型。如果每一次进步都只能保存在提示词、脚本或工具里，系统可能越来越复杂，却没有形成更强的内部先验。另一条路线因此试图把搜索或推理所得的能力重新写回模型权重。

[Deep Cogito](https://www.deepcogito.com/) 的 Cogito 系列把这条路线表述为迭代蒸馏与放大。系统先在推理时使用更多计算得到更好的策略，再把这些搜索结果蒸馏回参数，使下一轮从更好的起点开始。[Cogito v2](https://www.deepcogito.com/research/cogito-v2-preview) 更明确地把目标描述为从推理时搜索走向迭代策略改进。这和只增加思考长度不同：理想情况下，每一轮昂贵搜索都会变成下一轮较便宜的“直觉”。不过，模型表现提高与“改进模型的方法本身也提高”仍然是两个不同的命题，后者需要额外的跨代实验。

[Frontis-MA1](https://github.com/FrontisAI/OpenRSI) 把参数学习和外部搜索放在同一套机器学习工程环境里。它用可执行反馈训练 Draft、Improve、Debug 和 Crossover 等程序进化操作，再由 OpenMLE-Evo 把这些操作组合成长时搜索。项目特别区分了模型后训练带来的收益与搜索系统带来的收益，并在未参与训练的 NatureBench Lite 上分别测试两部分的迁移。这种拆分很重要，因为它避免把“模型更强”和“给模型更多搜索”混成一个无法归因的总分。

[Recursive](https://www.recursive.com/) 的目标是以开放式算法构建能够持续改进人工智能研发的系统。它公开的早期系统已经可以围绕一个目标提出想法、实现修改、运行实验、检查方差和奖励投机，再选择后续分支，并在小模型训练速度、固定预算训练和 GPU kernel 优化上报告了改进。[这项工作](https://www.recursive.com/articles/first-steps-toward-automated-ai-research) 更准确地说是自动化人工智能研究闭环的重要证据，而不是已经完成一般递归自我改进的证据。它证明了研究过程中的一些环节可以连续自动化，但系统是否在多代之后越来越擅长改进自己的研究能力，仍需要单独测量。

[Ineffable Intelligence](https://www.ineffable.ai/) 则把目标直接放在不依赖人类数据、能够持续发现知识与技能的“超级学习”上。和已经发布完整实验、代码或技术报告的项目相比，它目前公开的材料更接近研究纲领。因此，把它放进地图是为了记录它选择的问题，而不是把愿景与实证结果放在同一层比较。

## 四、把研究闭环接回真实世界

代码、数学和小规模训练任务都有一个共同优点：反馈可以迅速自动化。真正的科学研究却必须面对昂贵实验、模糊观测、设备故障和跨越数天甚至数月的延迟。如果递归自我改进最终要产生新知识，它不能永远只在数字基准中循环，还需要学习怎样向世界提出问题，并接受世界不按预期回答。

[Periodic Labs](https://periodic.com/) 正在把模型与高通量物理实验室连接起来。其设想不是让语言模型反复阅读现有论文，而是让实验产生互联网上不存在的新数据，再由模型决定下一步制造什么、如何合成，以及怎样理解实际得到的材料。[Building Labs that Learn](https://periodic.com/news/building-labs-that-learn) 展示了这个循环的早期形态：实验数据用于训练科学模型，模型又逐步进入实验选择与分析。它更接近“会学习的实验室”，还不能被等同于完整的递归自我改进，但它补上了许多纯软件循环缺少的环境反馈。

[Inherent](https://inherentlabs.ai/) 从可验证的研究复现开始训练人工智能科学家。[Faraday](https://inherentlabs.ai/research/training-to-replicate) 的任务不是生成一篇听起来像论文的文字，而是把论文中的方法重新实现出来并验证结果。复现看起来比原创保守，却是自动研究非常关键的中间能力：一个系统如果不能可靠重建已有发现，就很难判断自己所谓的新发现究竟来自机制、偶然性还是实验错误。

[Autoscience](https://www.autoscience.ai/) 也把重点放在自动运行机器学习研究、探索想法并把结果转化为更好的模型；[Mirendil](https://mirendil.com/) 则更明确地提出重新设计整间人工智能实验室，使模型、训练、评价、部署与研究流程共同加速。它们代表的是“制度层”的自我改进：被优化的不再是一个 agent 文件或一组权重，而是实验室生产新能力的吞吐量。这个方向可能非常重要，但公开材料目前主要说明目标与系统边界，仍需要更多可重复的研究结果来判断闭环是否真的在提高自身的研究效率。

## 五、让算法与硬件共同演化

还有一些团队把递归循环扩展到计算底座。[Ricursive Intelligence](https://www.ricursive.com/) 从芯片设计切入，希望用人工智能改进芯片，再用更好的芯片加速下一代人工智能。它和前面提到的 Recursive 是两家不同的公司：一个写作 **Ricursive**，重点是芯片与人工智能的闭环；另一个写作 **Recursive**，重点是开放式算法和自动化人工智能研究。

[Extropic](https://extropic.ai/) 的方向更不寻常。它在开发热力学计算硬件，同时训练专门的研究智能体去发现适合这种硬件的新算法。[First Sparks of Thermodynamic Recursive Intelligence](https://extropic.ai/writing/baby-thermo-rsi) 报告的是早期一步：在经典连接主义实验复现任务上后训练一个开放模型，并计划将来用真实热力学芯片的测量结果形成反馈。这里的递归关系不是单纯“软件修改软件”，而是算法发现扩大硬件的用途，硬件又降低研究智能体推理和实验的能耗。如果这个循环成立，能够改进的对象就从模型和代码扩展到了整个计算基质。

## 六、怎样比较这些团队，而不被“递归”这个词带走

我会暂时把公开证据分成五层。它们不是固定的排行榜，而是阅读一项新结果时可以逐层追问的标准。

- **研究愿景。** 团队明确把持续学习或自我改进作为目标，但还没有公开足够的可重复实验。
- **有界自动研究。** 系统可以在固定环境里提出、执行并选择改进，但改进对象仍然是外部目标。
- **局部自我修改。** 系统能够修改自己的代码、框架、记忆或权重，并在同一评价上取得收益。
- **跨任务或跨代迁移。** 收益能在隐藏任务、不同模型、不同环境或后续世代中保留，而不是只适配当前分数。
- **改进“改进能力”。** 新系统不仅更会完成任务，也更擅长产生下一代改进，而且这种优势在固定资源下能够持续。

现在已经有相当多可信的第二层和第三层结果，也出现了一些第四层证据。第五层才是强意义上的递归问题，因为它要求系统获得的能力返回到改进机制本身。即使一次实验出现正反馈，也还要继续问这种反馈是否会饱和、是否依赖人类不断补充任务与评价器，以及系统在改变环境之后，原来的评价是否仍然成立。

这也解释了为什么我不想把对话里出现的每家公司都直接归为“递归自我改进公司”。[NeoCognition](https://neocognition.io/)、[Adaption](https://adaptionlabs.ai/)、[Reflection](https://reflection.ai/) 和 [d/dx](https://ddx.inc/) 等团队都与自主研发、持续学习或下一代研究系统相邻，但公开定位和技术证据并不完全相同。把相邻方向保留在观察名单里，比为了做出一张完整表格而强行给它们贴上同一个标签更诚实。

## 我目前从这张地图里看到的东西

这个领域眼下最明显的趋势，并不是某一种架构已经胜出，而是“模型”不再被视为唯一的能力容器。代码、上下文、记忆、评价器、实验环境、组织流程和硬件都可以保存经验，也都可能成为下一轮改进的对象。不同团队实际上是在选择不同的时间尺度：改提示词可以按分钟迭代，改 agent framework 可能按小时或天迭代，更新模型权重需要更长周期，建设物理实验室和芯片则更慢，却能引入数字世界中没有的新证据。

真正困难的地方也逐渐从“能不能生成一个候选改进”转向“能不能知道它真的更好”。候选想法已经越来越廉价，但可靠评价、跨任务迁移、现实实验、失败归因和长期可维护性仍然昂贵。一个系统越擅长针对评价器优化，我们就越需要隐藏测试、独立复现、成本约束和来自环境的新数据。否则，更快的闭环也可能只是更快地把一个局部指标变成整个系统的盲点。

所以，这张地图最值得追踪的不是公司数量，而是闭环逐渐闭合的方式：哪些经验进入代码，哪些进入权重，哪些留在外部记忆，哪些必须由真实世界提供；评价器能否跟上被评价系统；以及一次改进能否留下足够清楚的因果记录，让下一代知道自己继承了什么。等这些问题有了可重复的答案，“递归自我改进”才会从一个吸引人的总称，变成一组可以比较、反驳和累积的研究结果。

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
