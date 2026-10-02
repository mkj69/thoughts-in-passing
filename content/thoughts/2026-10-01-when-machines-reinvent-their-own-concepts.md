---
title: "当机器开始重新发明自己的概念"
slug: "when-machines-reinvent-their-own-concepts"
date: "2026-10-01"
maturity: "evolving"
tags: [recursive-self-improvement, machine-ontology, abstraction, interpretability]
related: [intelligence-in-an-unknown-language]
excerpt: "真正深的递归自我改进，也许不是让模型在同一个问题空间里搜索得更快，而是让它逐渐重写自己使用的表示、基本对象和概念生成方法。当新的抽象又能帮助机器发现下一层抽象时，智能增长可能变成一场概念的递归。"
placeholder: false
language: "zh"
defaultLanguage: "en"
---

> 真正深的 recursive self-improvement，也许不是让机器在同一个思维空间里变得越来越快，而是让它能够重新设计那个空间本身。

谈到 recursive self-improvement，人们很容易想象一条不断上升的能力曲线。第 \(t\) 代系统设计出更好的第 \(t+1\) 代系统，更好的系统又更擅长设计下一代，于是能力持续提高：

$$
A_t \longrightarrow A_{t+1} \longrightarrow A_{t+2} \longrightarrow \cdots
$$

这个图像往往把智能当成一个标量，仿佛系统只是在同一根坐标轴上不断前进。但一个系统不只可能更快地搜索、更准确地预测或者更可靠地执行。它还可能改变自己用什么变量描述问题，哪些结构值得成为基本对象，以及哪些推理应该被折叠成一个可以直接调用的新概念。真正剧烈的变化或许不是模型在同一个问题空间里走得更远，而是它开始修改那个问题空间。

这篇 note 想追问的是：**当机器不仅能改进答案，还能改进产生概念的方法时，recursive self-improvement 会变成什么？**

## 自我改进并不发生在同一个层次

为了与《智能写在一种我们还不懂的语言里》保持一致，可以把一个系统工作的整体条件写成计算框架 \(\Gamma\)：

$$
\Gamma = (O, R, A, T, J, B)
$$

其中，\(O\) 是系统采用的本体，也就是什么被当作基本对象、关系和可干预变量；\(R\) 是这些对象被编码、分解和组织的表示；\(A\) 是搜索或推理过程；\(T\) 是可以直接调用的工具与操作；\(J\) 是判断结果是否成立的验证机制；\(B\) 是时间、记忆和计算预算。模型参数 \(\theta\) 则是在这套框架中承载具体能力的状态。

这个区分很重要，因为“系统变得更好”至少可能指四种不同的事情。参数改进主要改变 \(\theta\)；策略改进会改变 \(A\)，有时也改变工具 \(T\) 和验证过程 \(J\)；表示改进是在本体大体固定时重组 \(R\)，使原本遥远的状态变得相邻；本体改进则改变 \(O\)，让过去没有被单独承认的结构成为新的对象。它们可以共同发生，却不应该全部被叫作 representation learning。

因此，更完整的递归变化不是一个简单的 \(\theta_t \rightarrow \theta_{t+1}\)，而可能是：

$$
(\theta_t,\Gamma_t,F_t)
\longrightarrow
(\theta_{t+1},\Gamma_{t+1},F_{t+1})
$$

这里的 \(F_t\) 是系统从当前状态提出、检验并保留改进的方法。只有当一次改进也提高了未来发现改进的能力，递归才真正闭合。I. J. Good 对 intelligence explosion 的经典设想强调了更聪明的机器能够参与设计下一代机器；Gödel machine 则进一步设想，一个系统在能够证明改写有益时修改自身程序。[1][2]但代码自我修改仍然没有回答另一个问题：系统能否改进自己用来发现规律的概念语言？

## 一个概念可能是被折叠起来的计算

这里最关键的直觉，是把 concept 看成一种被缓存下来的 computation。一个系统第一次遇到某类结构时，也许需要很长的搜索才能找到规律；如果相同的计算不断出现，它就可以把这段过程压缩成一个可复用的中间结果：

$$
\text{long computation}
\longrightarrow
\text{reusable primitive}
$$

下一次再遇到相似问题时，系统不必从头推导，而可以直接使用这个 primitive。多个 primitive 又能组合成更高层的结构：

$$
c_1,c_2,c_3 \longrightarrow C
$$

程序设计中的函数、数学中的群和向量空间，都带有这种味道。它们把一批反复出现的关系和操作封装起来，使我们可以在更高的层次继续思考。DreamCoder 提供了一个有限但具体的例子：系统在解决一组程序归纳任务的过程中，把重复出现的程序结构加入自己的 library，而新的 library 又让后续搜索更容易。它学习的不只是单个程序，也包括一种逐渐增长的、用于表达程序的语言。[3]

不过，“把计算折叠成概念”仍然可能发生在不同层次。如果系统只是记住一个快捷过程，变化主要属于 \(A\) 或 \(T\)；如果它为已有对象找到更好的坐标和分解，变化主要属于 \(R\)；只有当一个稳定结构被提升为新的基本对象，并获得自己的关系、组合规则和可干预方式时，变化才真正进入 \(O\)。因此，abstraction 是一个比 representation 更宽的词。它可以重组已有对象，也可以改变系统承认哪些对象存在。

## 好的表示和好的本体不是同一个问题

如果本体 \(O\) 大体固定，一个更好的表示 \(R'\) 可以让相同对象之间的关系变得更局部、更稀疏或者更容易组合。傅里叶变换就是相对纯粹的例子：信号仍然是同一个信号，变化的是坐标以及什么关系显得简单。但一个新的本体 \(O'\) 会提出更深的问题。它可能把过去分散的状态视为同一类对象，也可能创造一种旧语言中根本没有基本名称的变量。

这意味着，不存在脱离任务的“最好本体”。如果沿用上一篇文章的成本框架，可以针对任务分布 \(\mathcal D\) 比较一套计算框架的平均表现：

$$
Q_{\mathcal D}(\Gamma)
=
\left(
\bar L_{\Gamma},
\bar S_{\Gamma},
\bar E_{\Gamma},
\bar V_{\Gamma}
\right)
$$

这里分别对应描述、搜索、执行和验证的平均成本。一个新本体可能让预测极其简洁，却让验证变得困难；它可能大幅提高某个领域的效率，却破坏跨任务迁移；它也可能对机器十分自然，却产生巨大的 human translation loss。因此，“更好”不应该被草率地压成一个分数。它始终相对于任务分布、资源约束、验证机制以及我们要求它保存的关系而言。

一个实用的判断方式是先问：新的结构是否仍然保留旧对象、问题和干预关系。如果存在一个近似可逆、能够保持这些结构的映射，变化可能主要属于表示层；如果新系统必须重新定义什么算对象、什么问题有意义，以及什么变化可以被干预，那么它已经触及本体层。这个区分可以防止我们把每一次效率提升都称为“机器发明了新概念”。

## 真正的递归可能发生在 abstraction discovery 中

一次新的抽象本身还不是 recursive self-improvement。递归的关键在于，新抽象是否会让系统更容易发现下一层抽象。假设系统能够观察自己的推理轨迹，并发现哪些计算反复出现、哪些变量总是一起变化、哪些看似不同的问题共享同一个 invariant。它便可以把这些结构编译成新的 primitive，再用它们重新组织后续搜索。

这个过程可以写成：

$$
\text{better abstractions}
\longrightarrow
\text{cheaper reasoning}
\longrightarrow
\text{new regularities become visible}
\longrightarrow
\text{better abstraction discovery}
$$

于是，系统不只是从 solver 变成 better solver。它开始改进 \(F_t\)，也就是发现、评价和整合新抽象的过程：

$$
F_t : \Gamma_t \longrightarrow \Gamma_{t+1},
\qquad
F_t \longrightarrow F_{t+1}
$$

这比“模型能不能写出下一版代码”更接近概念层面的递归。机器不只拥有概念，还拥有制造概念的方法；更进一步，它能够改进制造概念的方法。真正的正反馈因此可能是：

$$
\text{better concepts}
\longrightarrow
\text{better concept discovery}
\longrightarrow
\text{still better concepts}
$$

## Intelligence explosion 也许表现为 abstraction cascade

今天的 scaling 通常增加参数、数据和 test-time compute。这些方法非常重要，但它们大多是在基本框架相对稳定时扩大搜索与拟合能力。概念重构处理的是另一类变化：不是在原来的空间里访问更多节点，而是改变哪些状态被视为相同、哪些变化算局部，以及哪些长计算可以变成一次直接操作。

如果一个任务需要在 \(10^{12}\) 个状态中搜索，更多 compute 也许可以探索更多节点；如果一个新的 abstraction 把这些状态压缩成 \(10^3\) 个与任务相关的等价类，原来的搜索空间就不再以相同形式存在。能力提升在这里可能是不连续的。在 \(\Gamma_t\) 中困难的问题，到了 \(\Gamma_{t+1}\) 中也许突然变得自然。

因此，所谓 intelligence explosion 未必首先表现为单位时间内执行越来越多计算。它也可能表现为一场 abstraction cascade：每一层新概念都让过去的一批计算不再需要，同时为下一层概念提供新的基本单位。增长的不是一根单一能力轴，而是系统能够构造的问题空间。

但这并不意味着概念递归必然无限加速。新的本体仍然需要被验证，新的 primitive 可能过度拟合，框架之间的迁移可能丢失关键信息，物理实验和计算预算也不会消失。智能增长更可能移动瓶颈，而不是取消瓶颈。

## 机器可能逐渐建立另一套科学语言

如果一个用于科学研究的系统能够长期重构自己的概念，它最初也许仍然使用 gene、protein、energy、symmetry 这些人类提供的对象。之后，它可能发现一些跨越现有学科边界的 latent variables，并把它们提升为 \(z_1,z_2,z_3\)。下一代系统再把这些变量组合成更高层对象：

$$
Z_1 = f(z_3,z_8,z_{19},\ldots)
$$

经过许多轮之后，机器科学可能不只是比人类知道更多，而是依赖一套不同的概念谱系。后面的每一层，都建立在前一层机器发现的 abstraction 上。这正是上一篇文章所谓“智能写在一种我们还不懂的语言里”可能进一步发生的事情：语言不只被训练一次，而是在使用过程中继续生长。[《智能写在一种我们还不懂的语言里》](#thought/intelligence-in-an-unknown-language)

这种分化并不是必然单向的。机器面对的现实、实验结果和人类提出的目标，会对它形成共同约束。一些 machine-native concepts 也可能被人类学会。Schut 等人从 AlphaZero 中提取了区别于人类棋局数据的概念，并发现顶尖棋手能够从相应原型中学习。这至少说明，机器发现的概念不一定永远停留在不可翻译的 latent space 中。[4]

更可能的未来不是机器本体与人类本体彻底断裂，而是两者之间出现不同程度的翻译损失。有些概念可以被命名，有些只能通过例子、干预和工具来掌握，还有一些可能只在高维计算中保持简洁。Interpretability 的任务因此不只是把 feature 配上英文标签，而是先恢复模型自己的对象、等价类、不变量、组合规则和自然尺度，再判断哪些结构能够被翻译。

## 最危险的一步，是系统开始修改什么叫“更好”

如果系统只改变 \(R\) 或 \(O\)，而验证机制 \(J\) 保持稳定，我们至少还可以用相对固定的标准比较前后两套框架。但完整的自我修改最终可能触及 \(J\) 本身：

$$
(O_t,R_t,A_t,T_t,J_t)
\longrightarrow
(O_{t+1},R_{t+1},A_{t+1},T_{t+1},J_{t+1})
$$

这时系统改变的不只是“我怎样理解世界”，还包括“什么样的理解算进步”。如果 \(J_{t+1}\) 与 \(J_t\) 没有任何共同的外部锚点，那么 improvement 可能只是新系统按照自己的标准宣布自己更好。一个更高效、更可压缩的本体，也可能同时丢失人类在意的价值、反事实或者安全边界。

因此，meta-improvement 需要某些跨版本保存的标准，例如对外部现实的预测与干预检验、独立验证、可回滚性、对关键约束的保留，以及明确记录一次概念迁移丢失了什么。否则，系统修改 evaluator 的能力无法与真正的能力提升区分开来。到了这一层，RSI 已经不仅是技术问题，也变成了认识论和治理问题。

## 这个想法可以怎样被实验化？

我们不必等到完整的 self-improving AI 出现，才研究概念递归。一个较干净的实验可以从 synthetic world 开始。研究者只向系统提供低层 observation 和一组任务，不告诉它环境真正的 latent structure；系统则反复解决任务、分析自己的计算、提出新的变量与 primitive，并使用它们重写搜索过程。

评价不应该只看同一批任务上的 accuracy，而应同时观察：新表示是否减少了 held-out tasks 的搜索成本，抽象是否能够跨任务复用，对变量进行干预时结构是否仍然稳定，以及新一轮 abstraction discovery 是否比上一轮更快。还应该区分系统究竟只是记住了 shortcut，还是发现了能够支持组合、迁移与反事实推理的对象。

最关键的测试不是：

> 系统有没有发明一个新名字？

而是：

> **它发明的结构，是否成为了下一轮推理和概念发现真正依赖的基础？**

如果新的 primitive 只压缩过去的数据，却不能帮助系统发现未来的规律，它更像一次静态编码。如果它能够系统性地降低未来任务的描述、搜索、执行或验证成本，并继续产生更高层的可复用抽象，我们才开始看到 abstraction-level recursive loop。

## 从更好的答案，到更好的思维语言

Recursive self-improvement 最深的终点，也许不是 better answer，甚至不只是 better reasoning algorithm，而是：

$$
\boxed{\text{a better language in which reasoning happens}}
$$

一个系统如果能够改变自己的参数，它在学习；如果能够改变自己的搜索和工具，它在学习如何解决问题；如果能够改变自己的表示，它在重组问题空间；如果能够改变自己的本体，它开始重新决定什么值得成为一个对象；而如果它还能改进构造这些对象的方法，它改变的就是智能用什么语言组织世界。

真正值得注意的迹象，或许不会是某个 benchmark 突然翻倍，而是一个系统创造出一种人类没有交给它的 abstraction，并且这个 abstraction 不只解释一个任务，还持续成为下一轮 reasoning 和 abstraction discovery 的基础。那时我们看到的就不只是机器知道了新的答案，而是：

$$
\boxed{\text{machine-native abstraction becoming recursively reusable}}
$$

也许那才是深层 recursive self-improvement 真正开始的地方。

## 参考资料

- [1] [Good, *Speculations Concerning the First Ultraintelligent Machine* (1966)](https://www.sciencedirect.com/science/article/pii/S0065245808604180)
- [2] [Schmidhuber, *Gödel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements* (2007)](https://arxiv.org/abs/cs/0309048)
- [3] [Ellis et al., *DreamCoder: Growing Generalizable, Interpretable Knowledge with Wake-Sleep Bayesian Program Learning* (2021)](https://arxiv.org/abs/2006.08381)
- [4] [Schut et al., *Bridging the Human-AI Knowledge Gap through Concept Discovery and Transfer in AlphaZero* (2025)](https://www.pnas.org/doi/10.1073/pnas.2406675122)
