---
title: "如果神经网络的权重也可以像代码一样被编写？"
slug: "can-neural-network-weights-be-programmed"
date: "2026-10-17"
maturity: "evolving"
tags: [neural-programming, weight-space-learning, recursive-self-improvement, ai-agents]
related: [open-questions-on-recursive-self-improvement, why-the-rsi-bottleneck-keeps-moving, concepts-a-model-can-think-with]
excerpt: "我们为什么默认智能只能通过训练被写入神经网络？从让 Agent 研究和修改权重，到学习权重演化，再到将 Neural Program 编译成模型权重，这是一条关于神经网络可编程性的研究猜想。"
placeholder: false
language: "zh"
defaultLanguage: "en"
---

*What If Neural Network Weights Could Be Programmed?*

## 一个有点奇怪的问题

最近在思考 Recursive Self-Improvement（RSI）的时候，我突然产生了一个疑问：

为什么一个能够修改自己代码的 Agent，不能直接修改自己的模型权重？

现在讨论 RSI 时，我们通常想到的是 Agent 修改自己的 prompt、memory、tools、search algorithm，甚至重新编写整个 agent harness。

但是，对于一个神经网络而言，真正决定它如何计算的，不就是那些权重吗？

一个模型的权重文件，本质上不过是大量数字：

$$
\theta=(w_1,w_2,\ldots,w_N)
$$

为什么这些数字一定要通过 gradient descent 得到？

为什么 Agent 不能直接打开权重文件，分析其中的数值关系，然后决定：

$$
w_{135728}:0.032\rightarrow0.047
$$

如果修改代码可以改进 Agent，直接修改权重为什么不可以？

当然，任意修改数字大概率会破坏模型。但这似乎只是说明我们还不知道应该怎么修改，而不是说明这种修改在原理上不可能。

这让我开始思考一个更根本的问题：

**Training 是产生神经网络权重的唯一方式吗？**

## 1. 如果权重也是一种数据呢？

我们已经习惯让语言模型阅读文本、图像和代码。

但神经网络的权重为什么不能成为另一种数据模态？

假设我们收集大量不同能力、不同训练阶段的模型：

$$
\mathcal D=\{
(\theta_1,R_1),
(\theta_2,R_2),
\ldots,
(\theta_n,R_n)
\}
$$

其中 \(\theta_i\) 是模型权重，\(R_i\) 是模型的性能或行为描述。

能否训练一个模型理解这些权重之间的关系？

例如，它是否能够判断哪个网络更擅长推理，哪些参数变化与某种能力有关，以及怎样修改一个网络才能让它表现得更好？

这并不是完全没有先例。

[Weight Space Learning](https://arxiv.org/abs/2406.09997) 已经尝试将神经网络的参数本身作为学习对象。[DeepWeightFlow](https://arxiv.org/abs/2601.05052) 进一步研究了如何通过 Flow Matching 生成完整的神经网络权重。

这些工作让我意识到：

**权重不仅可以是学习的结果，也可以成为另一个学习系统的输入和输出。**

但我真正好奇的是：如果我们不只使用一个专门训练的权重生成模型，而是让一个具有通用推理能力的 Agent 去研究这些数字，会发生什么？

## 2. 让 Agent 像科学家一样研究神经网络

设想有一个大模型和一个小模型。

大模型不需要直接解决小模型的任务，而是负责研究小模型。

它能够读取权重、查看 activation、分析错误案例，对模型进行干预实验，并观察每次修改后的行为变化。

整个过程可能是：

$$
\text{Observe}
\rightarrow
\text{Hypothesize}
\rightarrow
\text{Edit}
\rightarrow
\text{Evaluate}
\rightarrow
\text{Revise}
$$

假设小模型总是在某类数学问题上出错。

Agent 可以尝试定位相关的计算电路，预测某个权重修改会产生什么影响，然后真正修改这些数字并运行测试。

经过大量实验，它可能逐渐形成一套关于神经网络内部计算的知识。

甚至可以让不同 Agent 分工：有的研究 attention，有的研究 MLP，有的分析错误，有的设计实验，还有的提出具体权重修改。

但这里存在一个关键问题。

**分析数字之间的数学关系，不等于理解这些数字对模型行为的因果作用。**

神经网络具有分布式表示、特征叠加和参数化冗余。一个浮点数的功能通常不能脱离其他参数而独立理解。

因此，一个真正有能力的 Weight-Editing Agent，不应该只是阅读权重并生成听起来合理的解释。

它应该能够做出可以被验证的预测：

> 如果把这组参数按照某个方式修改，模型在某一类输入上的行为将怎样变化？

而且，这种预测能力必须超越随机搜索或传统黑盒优化方法。

这也许才是 Agent 理解神经网络权重的真正含义。

## 3. 权重的变化能不能被学习？

进一步想，如果模型的权重可以作为数据，那么训练过程中的权重变化，是不是也可以被学习？

假设我们保存某个模型在训练不同阶段的 checkpoint：

$$
\theta_0,\theta_1,\theta_2,\ldots,\theta_T
$$

传统训练通过梯度更新：

$$
\theta_{t+1}
=
\theta_t-\eta\nabla_\theta\mathcal L(\theta_t)
$$

但有没有可能直接学习一种权重演化规律？

例如：

$$
\frac{d\theta_t}{dt}=v_\phi(\theta_t,t)
$$

然后给定一个较弱模型，通过学习到的向量场，直接得到一个更强的模型？

相关研究已经开始探索这种可能性。例如 [Gradient Flow Matching for Learning Update Dynamics in Neural Network Training](https://arxiv.org/abs/2505.20221) 研究了用 Flow Matching 学习已有优化器产生的参数更新规律。

不过，这里有一个我认为非常重要的区别。

**Learning how weights change 不等于 Learning how weights should change。**

如果 Flow 只是预测 SGD 会怎样更新参数，那么我们实际上是在模仿一个已有的优化过程。

但如果目标是让模型变得更聪明，我们真正希望学习的是：

$$
p(\Delta\theta\mid\theta,\text{Desired Capability})
$$

也就是：给定当前模型及希望改进的能力，直接产生有效的权重修改。

这可能成为一种不同于传统训练的能力改进方式。

当然，概率分布匹配并不自动保证模型性能提升。学到的更新可能偏离有效参数区域，也可能引入遗忘。

因此，这仍然只是一个需要验证的研究方向。

## 4. 一个更根本的转变：从训练权重到编写权重

继续思考下去，我发现自己真正感兴趣的也许不是用什么算法修改数字。

而是：

**为什么我们不能像编写程序一样，直接编写神经网络？**

对于传统计算机，我们不会直接手工编辑海量机器指令。

我们使用高级编程语言：

$$
\text{Source Code}
\xrightarrow{\text{Compiler}}
\text{Machine Instructions}
$$

那么，神经网络能否有类似的过程？

$$
\boxed{
\text{Neural Program}
\xrightarrow{\text{Compiler}}
\text{Neural Network Weights}
}
$$

我们不再手动决定每一个浮点数应该是多少，而是用一种更高级的语言描述希望实现的计算。

随后由编译器自动生成权重。

例如，我们可以描述一个神经电路应该如何比较数字、追踪状态、执行进位运算，或者将多个计算模块组合起来。

实际上，这个方向已经有很有意思的先例。

Google DeepMind 的 [Tracr](https://github.com/google-deepmind/tracr) 可以将 RASP 程序编译成具有具体权重的 Transformer。

这意味着，对于某些明确指定的序列计算，我们确实可以**直接构造 Transformer，而不是通过训练得到它**。

它让我意识到：神经网络的计算功能，并不天然要求必须通过梯度下降才能实现。

当然，从编译一个序列算法，到直接编写复杂的语言理解和数学推理能力，还有非常大的距离。

但是，至少在概念上，我们已经有了一个起点。

## 5. 权重也许更像机器码

仔细想想，直接让 Agent 修改数十亿个浮点数，可能并不是最好的方法。

就像现代程序员不需要直接理解所有机器指令一样，未来的 Agent 也未必需要逐个理解神经网络参数。

更合理的方式，也许是建立一种高层次的 Neural Programming Language。

这种语言不直接描述权重数值，而是描述：

- 一个神经计算模块应该执行什么功能；
- 模块之间应该如何交换信息；
- 哪些内部表示需要被建立和维护；
- 不同计算电路应该如何组合；
- 怎样修改已有计算结构而尽量保留原有能力。

然后，通过某种 Neural Compiler，将这些描述转换为具体参数。

在这种设想中，权重类似于机器码，而 Neural Program 才是我们真正编写和维护的对象。

这也引出了一个有意思的问题：

**Transformer 是一种适合训练的架构，但它是否也是一种适合被编程的架构？**

也许未来为了让 Agent 能够主动设计和修改自己的内部计算，我们需要的不只是新的训练算法，还可能是一种更加模块化、可组合、可解释的神经网络架构。

## 6. 从编写神经网络，到神经网络编写自己

最后，这个想法又回到了最初的 RSI。

今天，一个 Agent 可以读取自己的代码，发现缺陷，修改代码，再运行测试。

那么，如果它也拥有自己的 Neural Program，会发生什么？

设第 \(t\) 代 Agent 的神经程序为 \(\mathcal P_t\)，对应的模型权重为：

$$
\theta_t=C(\mathcal P_t)
$$

Agent 可以分析当前能力，提出新的程序：

$$
\mathcal P_{t+1}
=
A_t(\mathcal P_t,\text{Failures},\text{Experiments})
$$

再重新编译：

$$
\theta_{t+1}=C(\mathcal P_{t+1})
$$

经过验证，如果新版本确实更强，就将其保留下来。

这意味着，Recursive Self-Improvement 不再局限于修改外围的软件系统。

Agent 可以进一步修改实现自身计算的神经结构。

更有意思的是，如果下一代 Agent 不仅解决任务的能力更强，而且设计 Neural Programs 的能力也更强，那么这种改进可能继续递归发生。

但这并不意味着性能会自动、无限地增长。模型设计空间可能极其复杂，验证成本可能很高，局部改进也可能损害其他能力。

真正的挑战是找到一种可验证、可组合、可迁移的神经程序表示。

## 7. 一些仍然没有答案的问题

我觉得至少还有五个值得进一步研究的问题。

**第一，是否存在一种通用的 Neural Programming Language？**

RASP 能够描述部分序列计算，但怎样描述更复杂的知识、概念和推理能力？

**第二，神经电路可以像软件模块一样组合吗？**

如果两个电路分别实现两种功能，是否能够在不重新训练的情况下将它们组合起来？

**第三，Agent 能否学会从行为错误反推出需要修改的神经程序？**

这相当于为神经网络建立一种 debugging 机制。

**第四，能否从已有模型中反编译出某种 Neural Program？**

如果编译方向是：

$$
\mathcal P\rightarrow\theta
$$

那么我们能否研究反方向：

$$
\theta\rightarrow\hat{\mathcal P}
$$

这与 mechanistic interpretability 有直接联系，但需要面对表示冗余以及复杂网络未必具有简洁程序解释的问题。

**第五，模型能否在不进行传统梯度训练的情况下，持续改进自身能力？**

这可能是整个设想最核心的研究问题。

## 结语：智能一定要被训练出来吗？

我并不认为未来的神经网络一定会完全摆脱训练。

事实上，训练是一种非常高效的方式，可以从大量数据中提取复杂规律。想要通过明确编程复制这种能力，可能比想象中困难得多。

但我开始觉得，我们也许不应该将训练视为产生智能模型的唯一方式。

未来的 AI 系统可能同时具备三种能力：

**Learning**：通过数据学习新的知识和表示。

**Programming**：通过显式设计构造新的神经计算结构。

**Self-Modification**：根据自身行为和实验反馈，主动修改内部实现。

这三种能力或许并不互斥。

也许有一天，Agent 不仅能够编写 Python、修改自己的工具和工作流程，还能够编写一种神经程序，并将其编译成自己下一代的权重。

到那时，神经网络的权重将不再仅仅是训练过程留下的结果。

它们也可能成为一种能够被理解、设计、编写和维护的计算表示。

而那个最初看起来有些奇怪的问题——

**“为什么 Agent 不能直接修改自己的权重文件？”**

也许会变成一个更加自然的问题：

**“如果 Agent 能够编写自己的代码，为什么不能编写自己的神经网络？”**

## References

- Weiss et al., [Thinking Like Transformers](https://arxiv.org/abs/2106.06981), ICML 2021.
- Lindner et al., [Tracr: Compiled Transformers as a Laboratory for Interpretability](https://arxiv.org/abs/2301.05062), NeurIPS 2023.
- Schürholt et al., [Towards Scalable and Versatile Weight Space Learning](https://arxiv.org/abs/2406.09997), ICML 2024.
- Gupta et al., [DeepWeightFlow: Re-Basined Flow Matching for Generating Neural Network Weights](https://arxiv.org/abs/2601.05052), ICLR 2026.
- Shou et al., [Gradient Flow Matching for Learning Update Dynamics in Neural Network Training](https://arxiv.org/abs/2505.20221), 2025.


