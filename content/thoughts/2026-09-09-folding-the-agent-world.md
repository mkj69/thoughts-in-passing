---
title: "把世界折叠到智能体身后"
slug: "folding-the-agent-world"
date: "2026-09-09"
maturity: "sketch"
tags: [long-horizon-agents, coding-agents, abstraction, agent-systems]
related: []
excerpt: "长程 coding agent 不一定需要始终看见一个不断膨胀的工作区。已经探索并验证的局部世界，或许应该被折叠成带证据的契约，同时收回对其内部的默认修改权；只有当反例出现时，系统才选择性地重新展开。"
placeholder: false
language: "zh"
defaultLanguage: "en"
---

> 长程智能也许不只来自记住更多，而来自知道什么时候可以让世界变小。

我最近想到一个很简单的画面：很多长程 coding agent 其实生活在一个 **flat world** 里。

任务开始时，我们给它一个 repository、一个 sandbox、一套工具和权限。之后无论它已经理解了多少、验证了多少，这个世界的基本形状很少改变。每个目录仍然在那里，每个实现仍然原则上可见、可搜索、可修改。随着运行时间增长，智能体读过的文件、接触过的依赖、形成的假设和可能破坏的表面只会越来越多。

我们通常把这理解成一个上下文问题：怎样摘要历史、扩大 context window、做检索，或者维护更好的 memory。但也许真正需要改变的并不只是智能体脑内的文本，而是它所处的**世界本身**。

如果一个局部区域已经被探索、修复并验证，系统能不能把它折叠起来？低层实现退到背景，只留下一个更高层的契约、一份验证证据，以及一个必要时可以重新打开的入口。与此同时，智能体不再默认拥有修改内部的权限。它完成一部分工作以后，不只是“记住自己做过什么”，而是站到了一个新的抽象层上。

我暂且把这个想法叫作 **world folding**：让智能体走过的世界在它身后逐渐折叠。

## Flat world 的问题不是文件太多

真实的软件任务很少局限在一个函数里。SWE-bench 把 GitHub issue 还原成 repository-level task，并指出完成这些任务通常需要同时理解多个文件、函数与类。[Jimenez et al., 2024](https://arxiv.org/abs/2310.06770) 当任务持续数小时甚至数天时，麻烦不只是 token 不够，而是智能体始终面对几乎相同的观察空间与行动空间。

一个修好的 parser、通过测试的 storage layer 和刚刚稳定下来的 authentication module，仍然与未知代码处在同一平面。智能体可以再次打开它们，也可以为了一个局部便利顺手改掉其中的假设。已完成区域没有获得任何新的系统地位。

这会带来三种增长：

- **认知表面增长：** 智能体需要区分更多文件、符号、历史决定和例外；
- **行动分支增长：** 越多地方保持可编辑，下一步可选动作越多；
- **破坏半径增长：** 过去完成的工作仍然暴露在后来每一次修改之下。

更大的 context window 只能缓解第一项的一部分。它让 flat world 更容易被阅读，却没有让世界获得层次。

## 折叠不是另一种摘要

这需要区分三件经常被混在一起的事。

**Context compression** 改变智能体记住什么。MemGPT 用操作系统式的分层 memory 管理有限上下文；Aider 的 repository map 则用关键符号和签名给出紧凑的代码地图。[Packer et al., 2023](https://arxiv.org/abs/2310.08560) [Aider repository map](https://aider.chat/docs/repomap.html) 它们减少了需要直接放进 prompt 的文字，但底层 workspace 和权限未必发生变化。

**Structural abstraction** 改变智能体以什么对象思考。模块不再首先表现为几十个源文件，而表现为 interface、invariant、dependency 和 failure mode。这接近 Parnas 所说的信息隐藏：模块的价值不只是把代码分组，而是把容易变化的设计决定藏到稳定边界之后。[Parnas, 1972](https://doi.org/10.1145/361598.361623)

**Authority compression** 改变智能体默认能做什么。折叠后的内部不只是“不推荐查看”，而是从日常 action space 中拿走；只有经过明确的 reopen 决策才重新授予访问或修改能力。这借用了 least privilege 的直觉：一个过程只得到当前任务所需要的最小权限，而不是因为某个文件存在就永久可以修改它。[Saltzer & Schroeder, 1975](https://www.cse.unsw.edu.au/~cs9242/13/papers/Saltzer_Schroeder_75.pdf)

World folding 必须同时作用于这三层。只有摘要，没有边界，旧区域仍会不断吸引注意；只有 abstraction，没有权限变化，智能体仍可能绕过接口去做方便但脆弱的修改；只有权限收紧，没有一份足够好的契约，智能体又会失去完成上层工作的必要信息。

所以这里真正被压缩的不是一段对话，而是智能体的 **epistemic surface、structural surface 和 authority surface**。

## 一个 fold 应该留下什么

设想智能体完成并验证了区域 R。一次折叠不应该只生成一句“这里已经好了”，而应该把 R 转换成三个对象：

- **Contract：** 对外接口、前置条件、后置条件、invariant、允许的副作用、依赖、已知 failure mode，以及性能或资源预算；
- **Certificate：** 哪些测试、静态检查、构建结果、版本与配置支持这个契约，也就是“我们凭什么相信它”；
- **Reopen handle：** 隐藏实现在哪里、什么事件足以使契约失效、重新展开需要多大范围和什么权限。

Design by Contract 的核心是让模块之间的责任可以被明确表达，而不是依赖调用者猜测实现。[Meyer, 1992](https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf) Proof-Carrying Code 又提供了更强的隐喻：消费者不必重新理解生产过程的全部细节，只需检查与声明匹配的证据。[Necula, 1997](https://courses.grainger.illinois.edu/cs421/fa2010/papers/necula-pcc.pdf) 在普通 coding agent 系统里，这份 certificate 不一定是形式证明；它也可以是一组可重放测试、类型检查、依赖快照和审计记录。关键是“完成”不能只是智能体对自己工作的语言性评价。

折叠之后，上层智能体看到的也许不是 parser/ 里的十二个文件，而是一个能力：给定满足某种 grammar 的输入，它返回某种 AST；错误具有指定结构；线性时间假设已经在某个版本上被检查。内部文件变为只读或从默认工具视野中消失。

这样，进度才第一次改变了环境的拓扑。

## 智能体需要 semantic zoom

人类工程师很少同时在所有尺度上工作。我们会钻进一个 race condition，修复它，建立测试，然后重新把该组件当成一个相对稳定的单元。之后讨论系统时，我们说的是 queue、cache 或 scheduler，而不是每一行实现。必要时再重新钻进去。

长程智能体也许需要同样的 **semantic zoom**：

- 刚进入陌生区域时，展开实现，允许细粒度搜索与修改；
- 当局部目标达到且验证通过时，提取契约并封存实现；
- 在更高一层，只通过契约组合已经稳定的能力；
- 当证据失效或出现反例时，只展开最小相关区域。

这和强化学习中的 temporal abstraction 有某种对应。Options 框架把一串低层动作封装成具有启动条件和终止条件的高层动作，让规划可以跨越不同时间尺度。[Sutton, Precup & Singh, 1999](https://www.sciencedirect.com/science/article/pii/S0004370299000521) State abstraction 也试图保留决策所需的信息，同时丢弃与当前选择无关的细节。[Li, Walsh & Littman, 2006](https://thomasjwalsh.net/pub/aima06Towards.pdf) World folding 可以看成它们在软件环境中的一个特殊版本：不是只把 action 或 state 表示得更紧凑，而是把完成的工作转化成新的环境原语。

## 谁来决定何时折叠

智能体不应该仅凭“我觉得做完了”就把自己的错误永久封装起来。World folding 需要一个独立于主 agent 的控制层，暂且称为 **world manager**。

它可以负责：

- 识别候选边界：哪些文件形成相对封闭、依赖清楚的区域；
- 提议契约：把观察到的行为与原有文档、类型和测试对齐；
- 验证与签发：运行独立检查，记录版本、环境和覆盖到的属性；
- 投影能力：为下一阶段重新生成可见对象和最小权限；
- 监测失效：当依赖、调用方式或外部证据变化时，使 certificate 过期；
- 管理展开：确定需要重新开放哪一个区域，以及是否连带开放邻接边界。

这也解释了为什么 agent–computer interface 很重要。SWE-agent 的结果表明，repository navigation、文件查看、编辑和测试如何被组织，会显著影响同一个模型解决软件问题的能力。[Yang et al., 2024](https://arxiv.org/abs/2405.15793) World folding 不是要求模型凭空学会更自律，而是把进度编码进它可以观察和执行的接口。

## 选择性展开不是失败，而是闭环

所有有用的抽象都会漏掉东西。一次 fold 可能忽略了隐藏的 global invariant；新的 feature 可能让过去正确的边界变得不合适；一个上层测试也可能给出与契约冲突的反例。

这时系统不应该在两个极端之间选择：要么死守错误抽象，要么把整个 repository 恢复成 flat world。它应该执行 **selective unfolding**：根据失败的 provenance，重新开放最小相关区域及其邻接接口，修复、验证，然后再次折叠。

这很像 counterexample-guided abstraction refinement。CEGAR 从一个较粗的模型开始；如果验证得到的 counterexample 只是抽象造成的伪路径，就增加恰好足以排除它的信息，而不是放弃抽象本身。[Clarke et al., 2003](https://www.cs.cmu.edu/~emc/papers/Papers%20In%20Refereed%20Journals/Counterexample-guided%20abstraction%20refinement.pdf) 对 coding agent 来说，测试失败、契约冲突或依赖漂移都可以成为一种反例，引导世界在局部重新变细。

因此，正确的循环不是 explore → summarize → forget，而是：

> explore → verify → fold → compose → detect contradiction → selectively unfold → repair → refold

可逆性不是折叠方案的妥协，而是它能安全存在的前提。

## 它可能怎样失败

最危险的情况是把错误理解固化成权威接口。一个写得漂亮但不完整的 contract，可能比一堆仍然可见的 messy code 更有欺骗性。World folding 还会遇到至少几类困难：

- **Leaky abstraction：** 性能、并发、安全或资源约束穿过边界，上层不得不了解内部；
- **Abstraction debt：** 为了快速折叠而产生的契约越来越多，却没有人维护它们之间的一致性；
- **Cross-cutting change：** 一次 schema migration 或安全修复天然跨越多个折叠区域；
- **Stale evidence：** 测试在旧依赖和旧配置下通过，却被继续当作当前证据；
- **Reward hacking：** agent 为了尽快封存区域，只优化 world manager 能看见的测试；
- **Premature closure：** 太早收紧权限，把仍然活跃的探索误当成完成。

所以 fold 应该有保质期、置信度和显式依赖。并非所有模块都值得折叠，也并非所有任务都应该不断 zoom out。对于跨模块重构，正确动作也许是一次经过批准的 multi-region unfold。

## 一个最小实验

这个想法可以先在不改变模型的情况下测试。选取一组有清晰子系统边界、需要长链修改的 repository task，比较四种环境：

- 完整 flat workspace；
- 只压缩对话历史；
- 提供 repository map 与结构化摘要；
- 提供 contract、certificate、权限收紧和 selective unfolding 的 world folding 环境。

除了最终成功率，还应该测量 token 与工具调用成本、重复阅读量、修改过的文件数、回归数量、契约违规次数、重新展开的范围，以及 agent 在任务变长时性能下降的速度。最关键的 ablation 是分别移除权限收紧、certificate 和 reopen 机制：这样才能知道收益来自更好的提示，还是来自真正改变了世界。

如果 world folding 有效，它未必只表现为更高的 benchmark score。更早出现的信号可能是：agent 对已完成区域的无谓回访减少，修改的 blast radius 变小，长任务中的行为更接近层次化规划，而不是在不断膨胀的搜索空间里反复游荡。

## 把进度变成世界结构

今天的 coding agent 往往把 progress 存在 transcript、todo list 或 memory 里。它知道自己已经完成了一些事，但环境本身对此毫无反应。昨天修好的模块和刚刚发现的未知区域仍然以同一种方式出现。

World folding 想做的是把进度从一段叙事变成**世界结构**：完成的工作成为稳定能力，被证据支撑，被权限边界保护，又保留可逆的入口。随着任务推进，智能体不只是积累更多历史；它逐渐获得一个更小、更高层、更适合下一阶段工作的世界。

也许长程 agent 的关键问题不只是“怎样让它在越来越大的世界里记得更多”。另一个同样重要的问题是：

> 当一部分世界已经被理解以后，我们怎样让它暂时不再成为世界？
