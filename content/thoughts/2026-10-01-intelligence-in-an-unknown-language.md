---
title: "智能写在一种我们还不懂的语言里"
slug: "intelligence-in-an-unknown-language"
date: "2026-10-01"
maturity: "evolving"
tags: [machine-ontology, interpretability, abstraction, computability]
related: [latent-cognitive-layer, folding-the-agent-world]
excerpt: "大模型也许并非没有抽象能力。它可能正在使用一种与人类数学 ontology 不同的语言压缩世界。真正的 interpretability，或许应该先发现这种机器原生语言，再研究如何把它翻译给人。"
placeholder: false
language: "zh"
defaultLanguage: "en"
mindMap: "machine-native-language"
---

> 模型内部也许并不混乱。真正的问题可能是，那里的规律写在一种我们还没有学会的语言里。

最近我越来越觉得，我们谈论“智能”时，可能把几个本来不同的问题混在了一起：**知识、能力、抽象、可计算性，以及可理解性。**

今天的大模型很容易制造一种直觉。只要参数继续增加，数据继续扩大，推理时间继续延长，最终似乎就会出现一个统一的超级智能，把所有任务都做好。这个想象暗含了一个并不显然的等式：既然知识可以被统一进一个模型，能力也应该能够被统一。

但知识的统一和能力的统一，可能是两件完全不同的事。

## 知识可以共享底座，能力却依赖表示

人类公开记录下来的知识，确实很适合被一个大模型进行广泛而有损的统计压缩。书籍、论文、网页、代码和对话虽然结构各异，最终都能转化成训练信号。Foundation model 的意义正在于训练于广泛数据，并能够被适配到许多下游任务。[Bommasani et al., 2021](https://arxiv.org/abs/2108.07258)

但 capability 不只是“参数里有没有相关信息”。它还取决于一个任务在当前系统中是否容易被表达、搜索、执行和验证。

Python、SQL、Lean 和汇编语言都能描述复杂计算，但它们为问题提供的 primitive 完全不同。SQL 直接提供 relation、selection 和 join。Lean 直接提供 proposition、type 和 proof obligation。一个 coding agent 的 repo browser、shell、filesystem、test runner 和 patch tool，则把“修复代码库中的 bug”从一段含糊意图变成一组可执行操作。

Matthias Felleisen 对 programming language expressiveness 的经典分析正是在区分两件事：两种语言也许原则上能计算相同函数，却不意味着一种语言的构造可以在另一种语言中被局部、自然地表达，而不需要重写整个程序。[Felleisen, 1991](https://www.sciencedirect.com/science/article/pii/016764239190036W)

所以 capability 的核心问题也许不只是：

> 这个系统理论上能不能完成任务 f？

更有用的问题是：

> 在 representation R 下，任务 f 有多容易被描述、发现、执行和验证？

可以先用一个并非标准定义的记号来保存这个直觉：

> C_R(f) = L_R(f) + S_R(f) + E_R(f) + V_R(f)

其中 L 是描述任务所需的长度，S 是找到解法的搜索成本，E 是执行成本，V 是验证成本。两套系统即使在可计算性上等价，也可能因为 R 不同，在 C_R(f) 上相差许多个数量级。

这也许就是 intelligence 的一部分几何结构。智能不只是“能算什么”，而是**哪些计算在一种表示下变得短、自然、可发现并且可复用。**

## 算法是写在人类 ontology 里的压缩

很多数学公式、算法和科学理论都可以被理解为一种压缩。F = ma 用一个短关系概括大量可能的运动情形。Quicksort 的核心结构覆盖了无数具体输入。Rissanen 的 minimum description length 原则把一个相关思想变成统计建模准则：好的模型应当在模型本身的长度与用模型描述数据的长度之间取得最短的总描述。[Rissanen, 1978](https://www.sciencedirect.com/science/article/pii/0005109878900055)

但人类可读的算法有一个特殊属性。它们不只是短，还使用了一套与人类认知高度匹配的 conceptual language。变量、函数、集合、递归、对象、因果、概率和证明，并不是宇宙强制规定的唯一坐标系。它们是人类经过数学、逻辑和科学实践逐步发明出来的抽象。

当我们说一个算法“可解释”时，真正发生的过程也许是：

> computation → human mathematical ontology → understanding

它容易被理解，不只因为代码行数少，也因为它已经被翻译到我们熟悉的 primitive 里。

## 模型也在压缩，但没有义务使用我们的概念

神经网络同样在做某种压缩。训练数据中的统计结构被吸收到参数与激活中，但 optimization objective 从来没有要求模型使用“变量”“物体”“递归”“欺骗”或“因果”这些人类概念来组织规律。它只要求某种 loss 下降。

于是一个更强的假设出现了：

> 模型不是没有 abstraction，而是它的 abstraction 与人类 abstraction 异质。

所谓黑箱，也许并不只是缺乏结构。它可能包含结构，但结构所使用的 primitive 不在我们的词典里。

想象一个在合适坐标系中只有一行表达式的几何对象。经过复杂的非线性坐标变换以后，它会显得异常混乱。类似地，一部分 neural complexity 也许是 coordinate complexity，而不是 intrinsic complexity。

模型可能拥有一些对预测极其自然、却从未被人类命名的 latent object。它们也许同时混合我们分别称为语法、语义、因果结构、社会关系和不确定性的东西。对人类而言，这些属于不同学科。对模型而言，它们可能本来就是一个统一对象。

这不是说模型一定已经拥有一套整洁的秘密科学。它只是指出“我们没有找到人类可读标签”与“内部不存在抽象”之间没有逻辑等价关系。

## 从中文学习英文：翻译不是逐词搬运

作为中文母语者学习英文，一开始很容易把任务想成寻找对应词。“狗”是 dog，“桌子”是 table，然后把词按照另一种顺序重新排列。但真正的困难很快会出现在词汇之外。

中文与英文并不总是要求说话者显式表达同样的信息。中文可以高度依赖语境、省略已经明确的主语，并经常围绕 topic 组织句子；英文通常更强地要求 subject、时态、冠词和句法角色出现在表面结构中。关于中国学习者英语的研究也观察到 topic-prominent 结构从中文向英文迁移，而且这种影响会随着学习过程逐渐变化。[Gong, 2019](https://www.benjamins.com/catalog/jsls.17016.gon)

因此，把“这件事，我昨天已经处理好了”翻译成英文，并不是把每个片段放进固定槽位。译者需要重新决定谁成为 grammatical subject，什么信息需要被明确编码，以及目标语言里哪种结构听起来像一种自然的 thought。

这并不意味着语言决定了人能不能思考某个概念。更谨慎的说法是，不同语言会在说话的瞬间要求人注意不同的信息。Slobin 把这个过程称为 **thinking for speaking**：当经验被组织成可说出的语言时，grammar 会影响哪些特征必须被选择和编码。[Slobin, 1987](https://spot.colorado.edu/~michaeli/courses/LAM5430/5430e_reserves/Thinking_for_Speaking.pdf)

流利因而不是拥有一张更大的中英词典，而是能够在两种表示之间重建同一个场景。Translation 不是 substitution，而是 representation change。

## 程序语言把这种差异放大了

自然语言之间仍然共享大量身体经验与社会世界。程序语言则更清楚地展示了 abstraction 如何改变 capability。

Python、SQL、Lean 和 assembly 原则上都可以参与复杂计算，但它们把完全不同的东西设为 primitive。SQL 让 relation、selection 和 join 成为短表达；Lean 让 proposition、type 和 proof obligation 成为可操作对象；assembly 则把机器状态暴露出来，却让高层意图变得漫长。

所以“都能计算”并不等于“拥有相同能力”。如果一个任务必须先被翻译成数千步底层操作，它虽然理论上可计算，在实际认知系统中却可能几乎不可发现。

程序语言给出了一个更强的类比：模型内部的 representation 也许不只是它描述世界的语言，同时也是决定它能自然获得哪些能力的 programming language。

## 不同能力也许需要不同的抽象

前面定义的 capability cost 可以进一步写成一个选择问题：

> R*(f) = argmin_R C_R(f)

对于任务 f，什么 representation R 能让描述、搜索、执行与验证的总成本最低？

关键是，R* 很可能依赖 f。适合形式证明的 primitive 未必适合理解社会关系；适合分子动力学的状态空间未必适合长期规划；适合生成语言的 token sequence 也未必是控制机器人身体的最佳表示。

这意味着未来 AI 的方向未必只是把一个 foundation model 持续放大。知识也许可以共享一个广泛底座，但不同 capability 可能需要不同的 memory、tool、world model、time scale、training loop 和 abstraction。

我们最终看到的可能不是一个统一的机器心智，而是许多彼此差异很大的 machine ontology。一个为数学形成的 AI、一个与细胞和实验室共同学习的 AI、一个在物理世界中长期行动的 AI，可能不仅拥有不同知识，也会用不同 primitive 切分现实。

它们与今天模型的关系，或许不只是“更强的下一代”。它们可能更像新的 **cognitive species**：差异不由外表定义，而由什么对它而言是 primitive、什么规律容易发现、什么解释算自然来定义。

## 我们与 AI 之间也许需要一种翻译器

如果人类与不同 AI 使用不同 ontology，interpretability 就不应只是把 activation 配上 English label。我们需要的可能是一种双向的 conceptual compiler：

> human intention ↔ translator ↔ machine ontology

它把人类的问题翻译成某种 AI 容易搜索的表示，再把机器发现的结构翻译回人类能够检查、争论和行动的概念。它还必须明确哪些内容在翻译中丢失，而不是只生成一段听起来合理的解释。

而且未来不只需要 human-to-AI translation。不同 AI 之间也可能需要 translator：

> O_human ↔ O_math-AI ↔ O_biology-AI ↔ O_embodied-AI

多语言机器翻译已经探索过 interlingua-like representation，让不同语言通过共享的 latent space 发生转换。[Lu et al., 2018](https://arxiv.org/abs/1804.08198) 但这里设想的 interlingua 更深。它连接的不是中文句子与英文句子，而是不同认知系统用来构造概念、证据和因果关系的 primitive。

这样的 translator 也许本身会成为一种新的 AI。它不以解决某个领域问题为主要能力，而以跨 ontology 保存结构、标记 translation loss、寻找共同 invariant 为能力。

最终形成的可能不是“人类终于读懂了机器语言”，也不是所有机器都收敛到同一种语言，而是一个由许多认知语言组成的生态。人类、数学 AI、生物 AI 和 embodied AI 通过不断演化的 interlingua 合作，同时保留各自最有力量的抽象。

那会是一种新的东西：不是单一的超级智能，而是一种 **plural intelligence ecology**。

## 已有证据同时支持两种相反的直觉

Interpretability 研究已经发现了一些比单个 neuron 更稳定的结构。Sparse autoencoder 可以把密集激活分解成更稀疏、相对更 monosemantic 的 feature，并在一些任务上定位具有因果作用的方向。[Cunningham et al., 2024](https://proceedings.iclr.cc/paper_files/paper/2024/hash/1fa1ab11f4bd5f94b2ec20e794dbfa3b-Abstract-Conference.html) Anthropic 随后把类似方法扩展到 Claude 3 Sonnet，并提取了数量巨大的可识别 feature。[Templeton et al., 2024](https://transformer-circuits.pub/2024/scaling-monosemanticity/)

另一些工作发现，某些高层概念可以表现为 activation space 中的方向，但“线性表示”究竟意味着什么，取决于 counterfactual 定义和所采用的 inner product。[Park, Choe & Veitch, 2023](https://arxiv.org/abs/2311.03658) 对空间和时间的研究也在多个模型中找到了跨 prompt 与实体类型相对稳定的线性结构。[Gurnee & Tegmark, 2024](https://openreview.net/forum?id=jE8xbmvFin)

这些结果说明模型内部并非完全没有可恢复结构。但它们还不能证明这些结构与模型真正使用的 primitive 完全一致。Sparse feature 是通过特定 dictionary learning objective 得到的，linear direction 又依赖所选择的几何。工具可能发现了模型的结构，也可能同时把我们偏好的结构施加给了模型。

还有一个有趣的反方向假设。Platonic Representation Hypothesis 认为，随着不同架构与模态的模型变强，它们的 representation 可能逐渐趋向一个共享的统计现实模型。[Huh et al., 2024](https://proceedings.mlr.press/v235/huh24a.html) 如果这种收敛广泛成立，机器 ontology 就未必完全“外星”。现实世界本身可能对有效表示施加共同约束。

因此真正的问题可能不是“模型表示与人类表示相同还是不同”。更可能的情况是：它们在某些 invariant 上收敛，在如何切分、组合和使用这些 invariant 时仍然不同。

## Interpretability 不应该过早结束在 English label

今天一种常见流程是：

> activation → English label

我们找到一个 feature，然后问它是不是 deception、France、quotation marks 或某一种语法结构。这当然有用，因为安全审计和人类沟通最终都需要语言。但如果标签给得太早，我们可能会把一个更奇怪、更丰富的结构强行投影成已有概念。

另一条路线可以是：

> activations → machine-native primitives → relations → machine-native theory → human translation

在这条路线里，interpretability 的目标不是先给每个 feature 起名字，而是先恢复一套具有预测力与因果效力的 ontology。我们想知道哪些 primitive 稳定出现，它们如何组合，哪些关系跨 layer、prompt、model seed 和 architecture 保持不变，以及对它们进行 intervention 时，模型行为如何改变。

之后才研究映射：

> O_machine ↔ O_human

这更像第一次接触一种真正陌生的科学语言。我们不应该先问“哪个词对应我们的 noun”，而应该先问“这套系统用什么基本单位切分世界”。

## 但 machine ontology 并不会自动显现

“只要找到正确 basis，一切都会变简单”本身也可能过于乐观。Representation 通常不是唯一的。同一函数可以在许多可逆变换后的内部坐标中实现，而每个坐标系都可能提供不同的稀疏性和可解释性。

Locatello 等人的结果给出了重要警告。在没有额外 inductive bias 的情况下，仅从观测分布中进行 unsupervised disentanglement 在一般情形下不可识别。[Locatello et al., 2019](https://proceedings.mlr.press/v97/locatello19a) 换句话说，数据本身未必能告诉我们哪一种 factorization 才是“真正的因素”。

因此，“模型自己的 ontology”不能只意味着最漂亮的一组 latent feature。它至少需要通过几个更严格的测试：

- **稳定性：** 相同关系是否跨输入、训练 seed、层和相邻模型持续出现；
- **因果性：** intervention 是否产生可预测且局部的行为变化；
- **组合性：** primitive 是否能构成更高层规律，而不只是相关性标签；
- **压缩性：** 这套表示是否让模型行为或外部数据获得更短、更准确的描述；
- **迁移性：** 结构是否能预测未参与发现的新任务；
- **可翻译性：** 人类能否学习一个保留关键信息的近似接口，并明确知道翻译损失在哪里。

Machine-native 不等于不需要人类标准。恰恰相反，一个 ontology 是否有意义，必须靠预测、干预、压缩和迁移来约束，而不能只靠一张看起来合理的 feature visualization。

## 可计算性是一个过于宽松的共同点

如果人脑与模型最终都可以被视为 computation，是否意味着它们的表示差异终究无关紧要？答案可能恰好相反。

Universal computation 只说明某个过程原则上能否被实现。它没有说明需要多少时间与 memory，也没有说明哪一种表示让规律容易发现、证明和复用。计算复杂性理论从一开始就在研究这层差别。[Hartmanis & Stearns, 1965](https://dl.acm.org/doi/10.1145/321250.321266)

而且，可计算世界内部本身就存在一般性限制。Turing 的经典结果表明，不存在一个适用于任意程序与输入的通用判定过程，可以总是正确解决相应的停止问题。[Turing, 1936](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230)

所以：

> universal computation ≠ universal prediction

与抽象更直接相关的是最短程序的思想。对对象 x，可以问在给定 universal machine U 下，生成它的最短程序有多长：

> K_U(x) = min |p| such that U(p) = x

这把“最优压缩”变成了一个数学对象。Chaitin 对有限二进制序列的 program size 研究是这一理论的奠基工作之一。[Chaitin, 1966](https://dl.acm.org/doi/10.1145/321356.321363) 但 Kolmogorov complexity 本身不可计算。不存在一个普遍算法，能够为任意对象保证找到其最短描述。

更微妙的是，K_U(x) 还相对于描述语言 U。Invariance theorem 告诉我们，更换通用语言只会带来一个依赖于语言的加法常数，但在现实中的有限任务上，这个常数可以非常重要。所谓“短解释”从来不是脱离表示而存在的。

因此几组概念必须保持分离：

> computable ≠ efficiently computable

> computable ≠ predictable

> compressible ≠ able to discover the compression

> internally represented ≠ humanly understandable

一个系统能够执行某个计算，不代表它能在可接受资源内完成；一个规律存在短描述，不代表学习系统能找到它；一个模型内部存在结构，也不代表人类已有的 ontology 足以说出它。

## 一个关于 machine-native science 的研究议程

这个想法可以被转化成比“给 neuron 起名字”更具体的研究问题。

第一步不是寻找最有趣的 English label，而是寻找 **invariant structure**。对同一任务训练不同模型，改变 seed、architecture、modality 和 objective，观察哪些几何关系、composition rule 或 intervention effect 保留下来。

第二步是把 feature discovery 与 relation discovery 分开。Primitive 可能并不重要，重要的也许是 primitive 之间的代数、图结构或动态变换。一个 ontology 不只是一份词表，也是一套允许哪些组合与推理的 grammar。

第三步是构建双向 translator。人类概念应能投影到 machine-native structure，机器结构也应能被近似翻译回来。两种方向都要报告 information loss，而不是只给一个流畅说明。

第四步是用干预而不是美感验证。一个候选 primitive 如果真的属于模型的计算结构，改变它应该在多种上下文中产生可预测结果，同时尽量不扰动无关能力。

最后一步是检验它能否创造**新概念**。如果一组 latent structure 能让科学数据获得更短描述，提出此前没有的实验区分，或者让人类在学习后更快解决新问题，那么它才可能不仅是模型的内部捷径，而是一个值得进入共同语言的 abstraction。

## Intelligence 也许是计算的几何

人类数学是一种极其强大的 compression language。算法是用这套语言写下来的、可以被共享和检查的压缩。大模型则可能是另一类 compression machine。它从数据中形成表示，却没有义务重新发现我们的概念边界。

所以模型不可解释，未必意味着内部一团混乱。另一个更有趣、也更令人不安的可能性是：那里存在规律，只是规律使用的语言还没有被翻译。

未来 interpretability 最重要的任务，可能不是持续把机器压回人类已经知道的概念，而是让机器向我们展示：我们切分世界的方式并不是唯一的。

那时 AI for science 最重要的产物或许不只是一个 theorem、一种 molecule 或一条 prediction。它可能是一个新的概念，一个由机器首先发现、再由人类慢慢学会使用的 conceptual primitive。

如果这一天到来，AI 就不只是在帮助我们计算已有的数学。它开始参与创造一种新的语言：

> 一种属于人类与机器之间的共同抽象语言。
