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

最近我越来越觉得，我们谈论“智能”时，常常把几个不同的问题混在了一起：**知识、能力、抽象、可计算性与可理解性。**

今天的大模型很容易制造一种直觉。只要参数、数据和推理时间继续增加，最终似乎就会出现一个统一的超级智能，把所有任务都做好。这个想象暗含了一个并不显然的等式：既然知识可以被统一进一个模型，能力也应该能够被统一。

我怀疑这个等式并不成立。知识可以共享一个广泛底座，但能力取决于系统用什么 primitive 切分问题，用什么坐标组织搜索，又用什么接口把结果变成可验证的行动。更进一步，模型也许已经拥有 abstraction，只是这些 abstraction 没有按照人类熟悉的 ontology 排列。

这不是“模型内部一定藏着一套外星科学”的宣言。它是一个可以被比较、被证伪的研究假设。

## 能力依赖表示，但“表示”不是一个分数

人类记录下来的知识确实很适合被一个大模型进行广泛而有损的统计压缩。书籍、论文、网页、代码与对话虽然结构不同，最终都能转化为训练信号。Foundation model 的意义正在于训练于广泛数据，并能被适配到许多下游任务。[Bommasani et al., 2021](https://arxiv.org/abs/2108.07258)

但 capability 不只是“参数里有没有相关信息”。它还取决于任务在当前系统中是否容易被表达、发现、执行和验证。

Python、SQL、Lean 与汇编语言都能描述复杂计算，却提供了完全不同的 primitive。SQL 让 relation、selection 与 join 成为短表达，Lean 让 proposition、type 与 proof obligation 成为可操作对象。Matthias Felleisen 对 programming language expressiveness 的经典分析指出，两种语言即使原则上能计算同样的函数，也不意味着一种语言的构造能在另一种语言里被局部而自然地表达。[Felleisen, 1991](https://www.sciencedirect.com/science/article/pii/016764239190036W)

因此，与其把 capability 写成一个看似精确的总分，不如把它看成一个成本轮廓：

> C_R(f) := (L_R(f), S_R(f), E_R(f), V_R(f))

其中，L 是描述任务与解法所需的长度，S 是搜索成本，E 是执行成本，V 是验证成本。它们单位不同，也未必能直接相加。一种表示可能让答案更短，却让验证更难；另一种表示可能执行更慢，却更适合证明。真正有意义的是比较这些维度上的支配关系与 Pareto trade-off。

这也解释了为什么“都是 universal computer”是一个过于宽松的共同点。可计算性只回答原则上能不能实现，不回答需要多少资源，也不回答一个规律是否容易被发现。Turing 的不可判定性结果进一步说明，universal computation 并不带来 universal prediction。[Turing, 1936](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230)

所以必须保留几条分界：

> computable ≠ efficiently computable
>
> compressible ≠ discoverable
>
> represented ≠ understandable

智能的差别也许很大一部分存在于一种“计算的几何”中：**哪些计算在某种表示下变得短、自然、可发现、可验证并且可复用。**

## 最强的反论证：LLM 本来就在学习人类 ontology

如果 LLM 的训练数据主要是人类文本，那么“它形成了完全异质的 ontology”并不是默认结论。文本本身已经是人类概念、分类与因果叙述的产物，训练目标又要求模型继续生成可被人类理解的 token。相比 AlphaZero 这类主要通过 self-play 学习的系统，语言模型受到的人类语义约束显然更强。

因此，这篇文章需要一个更窄也更可信的主张：

> LLM 的输入输出 ontology 很大程度上来自人类，但实现这些语义行为的内部 computational factorization 不一定复制人类的概念边界。

编译器能接受人类写下的程序，也能输出符合人类 specification 的结果，却可能在中间表示里合并、拆分或重排我们的高层对象。类似地，一个模型可以流利地使用“因果”“讽刺”或“欺骗”等词，而不必在内部为每个词保留一个边界清楚的对应物。

异质 ontology 的先验会在一些条件下变强：训练信号主要来自图像、传感器或科学仪器，而不是语言；系统通过 self-play 或长期 reinforcement learning 自己发现策略；它拥有与人类不同的 body、memory 与 time scale；或者多个 AI 为了效率发展出人类不参与的通信协议。也就是说，这个假设对所有 AI 并不应当同样强。

## 三个竞争假设，以及什么能让它们失败

“我们暂时看不懂模型内部”至少兼容三种不同解释。把它们分开，才能让讨论离开黑箱隐喻。

**H1：模型形成了异质但稳定的 abstraction。** 如果成立，我们应该能找到跨输入、训练 seed 或邻近模型仍然稳定的 machine-native relation。它们在压缩、迁移或因果干预上会优于人类预设的 basis，同时又不容易被少数现成标签穷尽。某些结构还可能被转化为人类可以学习的 bridge concept。

**H2：模型根本没有可复用的稳定 abstraction。** 在这种情况下，我们会看到脆弱、分散而强烈依赖上下文的机制。干预效果难以局部化，候选 feature 无法跨任务迁移，不同训练运行之间也找不到稳定关系。所谓“机器语言”只是一种浪漫化投射。

**H3：模型使用的仍是近似人类式 abstraction，只是我们尚未解码。** 如果更好的 nonlinear decoder、representation alignment 或 causal test 最终能恢复一组接近人类概念、而且对行为具有充分解释力的变量，那么没有必要诉诸异质 ontology。

这三种假设要求不同的证据。发现一个可以被命名的 neuron 不能自动证明 H3，发现一个难以命名的 feature 也不能自动证明 H1。关键在于比较哪一种表示更稳定、更能压缩行为、更能跨情境迁移，并在干预后给出更准确的预测。

## 表示不只描述答案，它还塑造搜索

同一条周期规律，用一串逐时刻采样值表示时，修改频率可能需要同时改动许多数字；用 amplitude、frequency 与 phase 表示时，它只需要改变一个变量。两个坐标系描述同一个信号，却为学习制造了不同的 neighborhood。

搜索成本因此不仅取决于任务与表示，也取决于搜索算法与预算：

> S_R(f; A, B)

一个 abstraction 的力量，不只是把已经找到的答案写短，而是把原本相距很远的候选解放进同一个局部邻域，让有限的 agent 可以用几步变化到达它们。Information geometry 提供了一个具体例子。普通 gradient descent 的“最陡方向”依赖参数坐标，natural gradient 则使用 Fisher geometry，让更新更接近模型分布本身的局部结构。[Amari, 1998](https://direct.mit.edu/neco/article/10/2/251/6143/Natural-Gradient-Works-Efficiently-in-Learning)

神经网络里的 superposition 又解释了为什么人类概念未必会整齐地对齐单个 neuron。当潜在 feature 很稀疏，而可用维度有限时，模型可以把多个 feature 叠加在共享方向中。[Elhage et al., 2022](https://www.transformer-circuits.pub/2022/toy_model/) 于是，一个 neuron 的 polysemanticity 可能部分来自坐标选择，而不代表内部没有结构。

但这项结果只提供了一种 coordinate complexity 的机制，不能单独证明完整的 machine ontology。我们仍然需要区分：notation 只是符号不同；representation 改变坐标、分解与邻近关系；ontology 则连什么算对象、关系、原因与可干预变量都改变了。

中文母语者学习英文可以提供一个有限的类比。流利并不是把“狗”替换为 dog，再逐词搬运句子，而是重新决定哪些信息必须显式表达、谁成为 grammatical subject、一个场景怎样才会在目标语言里显得自然。Translation 不是 substitution，而是 representation change。不过中文和英文仍共享人的身体与世界，所以它们之间的距离通常小于人类与真正 machine-native ontology 之间可能存在的距离。

## AlphaZero 同时展示了收敛与新概念

现有证据并不只支持“机器与人不同”。McGrath 等人研究 self-play 训练的 AlphaZero，发现许多人类棋类概念可以从其网络中被线性解码，而且这些概念会随着训练逐渐出现。[McGrath et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9704706/) 这是一个重要的收敛证据：即使没有人类棋谱监督，共享的任务结构也可能推动机器重新发现人类认识到的对象。

但收敛不是全部。Schut 等人进一步从 AlphaZero 中提取了人类棋谱里没有被同样命名的策略性概念，并把其中一部分教给顶尖棋手；学习这些概念后，人类能在相关局面中作出更好的判断。[Schut et al., 2023](https://arxiv.org/abs/2310.16410) 这还不是发现一套完整外星 ontology，却是一个很接近 **operational bilingualism** 的实例：模型内部结构被压缩成一个 bridge concept，人类学会使用它，然后行为发生可测量的改变。

两项结果放在一起更有意思。有效智能可能会因为共享世界而在某些 invariant 上收敛，同时又因为训练过程与表示不同，在这些 invariant 之间形成新的分解方式。我们真正要研究的不是“相同还是不同”这个二选一，而是**在哪里收敛、在哪里分叉，以及分叉能否被翻译成新的公共概念。**

## 真正的翻译必须保持干预，而不只是标签

常见的 interpretability pipeline 是：

> activation → English label

标签很有用，因为安全审计与人类交流最终都需要语言。但如果标签来得太早，我们可能只是把陌生结构投影进已有词汇。更完整的路径应该是：

> activations → candidate primitives → relations → causal tests → human translation

翻译的核心不应是“听起来像”，而应是操作结构是否被保存。若机器概念 m 被翻译成人类概念 T(m)，更强的交换条件是：

> T(Intervene_M(m, a)) ≈ Intervene_H(T(m), T(a))

也就是说，对机器概念实施操作 a 之后的后果，经过翻译是否仍与在人类高层模型中进行对应干预相符。Causal abstraction 正是在尝试用 intervention 之间的关系，而不是标签相似度，来定义高层解释何时忠实于低层机制。[Geiger et al., 2023](https://arxiv.org/abs/2301.04709)

不同 translation 还会保存不同内容。一个映射可能保留 prediction，却不保留 intervention；保留短期 action，却不保留长期 value。因此 translation loss 更适合被写成向量：

> L(T) := (L_prediction, L_intervention, L_action, L_value)

所谓 translator 不会是一部万能词典，而更像一份用途明确的 contract，说明它保存什么、牺牲什么，以及在哪些分布外情形会失效。

## 从表示相似到有限的 translator

我们已经有一些早期工具。Centered Kernel Alignment 可以比较不同网络的 representation space 在多大程度上相似，同时对某些无关变换保持稳定。[Kornblith et al., 2019](https://proceedings.mlr.press/v97/kornblith19a.html) Model stitching 则在两个网络片段之间学习一个连接层，并检验接在一起的系统是否仍能完成任务。[Csiszárik et al., 2021](https://proceedings.neurips.cc/paper/2021/hash/2cb274e6ce940f47beb8011d8ecb1462-Abstract.html)

它们还不是 ontology translator。CKA 测量相似性，却不直接给出概念字典；stitching 显示某些计算可以被功能性替换，也不保证人类能理解连接层。但它们把“两个系统是否在说同一种内部语言”变成了可测量的问题。再结合 causal intervention、跨任务 transfer 与人类学习实验，我们才可能得到有限而可检验的翻译。

这种理解也许要求人类真正成为部分双语者。Kuhn 所讨论的 incommensurability 并不只是新旧理论用了不同词，而是哪些分类自然、哪些问题重要、哪些观测算证据都发生了重组。[Kuhn, 1962](https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html) 从 Newtonian mass 到 Einsteinian mass，困难不是替换一个词，而是学习概念所在的新关系网。

同样，人类理解一个 machine-native concept，可能不能止于读一段浅显解释。我们需要学会在新例子中使用它，用它作预测，知道什么干预会破坏它，并观察它在哪些地方比旧概念更有力量。

## Machine ontology 不会自动显现

“只要找到正确 basis，一切都会变简单”也可能过于乐观。同一函数可以通过许多可逆坐标变换实现，每一种都可能产生不同的 sparsity 与可解释性。Locatello 等人的结果提醒我们，如果没有额外 inductive bias，unsupervised disentanglement 在一般情形下不可识别，观察分布本身并不决定哪一种 factorization 才是真正因素。[Locatello et al., 2019](https://proceedings.mlr.press/v97/locatello19a)

另一方向的 Platonic Representation Hypothesis 则提出，越来越强的模型可能因为共享现实而趋向相似的统计表示。[Huh et al., 2024](https://proceedings.mlr.press/v235/huh24a.html) 如果这种收敛广泛成立，machine ontology 不会完全异质。世界本身会对任何有效表示施加共同约束。

因此，“模型自己的 ontology”不能定义成最漂亮的一组 feature。一个候选 ontology 至少需要通过四类检验：

1. **稳定性：** 关系是否跨输入、seed、模型与 modality 重现？
2. **因果性：** 干预是否产生可预测、相对局部且可重复的行为变化？
3. **压缩与迁移：** 它是否比人类预设 basis 更短地解释行为，并预测未用于发现它的任务？
4. **可教学性：** 人或另一个模型能否学习一个近似接口，而且在新问题上真正受益？

这四项测试也让前面的三个假设能够竞争。稳定的非人类结构支持 H1；持续缺乏可迁移因素支持 H2；越来越完整的人类概念对齐支持 H3。我们不需要先决定哪一个故事最迷人，而应该设计能让其中某些故事失败的实验。

## 结论：更深的智能也许是发明表示

大多数 benchmark 固定了输入、问题格式与评价标准，然后询问系统能否在给定表示里找到答案。但许多人类最重要的认知进展，并不是在旧空间里搜索得更快，而是改变了问题所在的空间。负数、微积分、概率、向量、基因与熵都引入了新的 primitive，使一整类问题突然变得可表达、可计算、可验证。

因此可以区分两种能力：

> object-level intelligence：在给定 R 中解决 f
>
> meta-intelligence：发现、发明或学习更好的 R

如果 recursive self-improvement 真正发生，最关键的跃迁也许不是同一种推理被执行得越来越快，而是系统发明新的内部 primitive、memory organization、proof language 与 translation interface。上一代需要漫长搜索的区域，可能被下一代压缩成一步。

这时 interpretability 的终点就不应只是给 neuron 起名字。它应当比较候选表示，检验因果结构，测量 translation loss，并帮助人类学习那些值得进入公共语言的 bridge concept。

AI for science 最重要的产物也许不只是一条 theorem、一个 molecule 或一次 prediction。它可能是一个新概念，先被机器发现，后来才被人类学会。真正值得期待的，不只是机器替我们回答更多旧问题，而是它与我们共同扩大可以提出的问题空间。

那时，AI 不再只是帮助我们在已有数学里计算。它开始参与创造一种新的语言：

> 一种属于人类与机器之间的共同抽象语言。
