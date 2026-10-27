---
title: "Can We Simplify a Trained Neural Network Like an Algebraic Expression?"
slug: "simplifying-trained-neural-networks"
language: "en"
excerpt: "A trained network may be an expensive way to express a simpler computation. Can we uncover its structure and find a cheaper, equivalent implementation, much as repeated addition becomes multiplication?"
---

I have been wondering whether, after training a neural network, we could simplify it like a mathematical expression: transform it into a network that computes the same function with less work.

The intuition comes from a simple example. If a program adds the same number many times, we can write the computation as multiplication:

$$
\underbrace{x+x+\cdots+x}_{n\text{ times}}=nx.
$$

Both sides express the same function, but in a computational system that supports multiplication, they can have different execution costs. Could a trained network contain similar structures? Perhaps it uses many neurons, many layers, or many iterations to accomplish something that could be computed more directly.

Training has found an implementation that works. Can that implementation be simplified further?

## After learning a function, find a cheaper implementation

First, the objective needs to be precise. Suppose a trained network implements a function \(F_\theta\). We want to construct another executable object \(P\): a smaller network, perhaps, or a program combining neural modules with explicit operations. Given an allowed set of operators \(\mathcal A\), an input domain \(D\), and target hardware \(H\), the problem is:

$$
\min_{P\in\mathcal P(\mathcal A)}\operatorname{Cost}_H(P)
\quad\text{subject to}\quad
P(x)=F_\theta(x),\quad\forall x\in D.
$$

Three choices must be specified in advance. Which operations may the new implementation use? On which inputs must it remain equivalent? And what are we trying to reduce: parameter count, arithmetic operations, memory traffic, or latency under particular deployment conditions?

These choices change the problem itself. A network with one million parameters might run more slowly than one with two million parameters that makes better use of hardware parallelism. Giving a sequence of operations a single name does not automatically make it faster. The cost of a new operator must include its actual implementation on the target hardware.

What interests me is a computational transformation with explicit semantics and a cost model. In the strict version, every accepted change should come with an explanation of why it preserves the original function.

## Some simplifications are already easy to write down

The simplest case is duplicated computation. Suppose two neurons produce the same feature, which then contributes to the output with different coefficients:

$$
a\,\operatorname{ReLU}(w^\top x+b)
+c\,\operatorname{ReLU}(w^\top x+b)
=(a+c)\operatorname{ReLU}(w^\top x+b).
$$

The feature only needs to be computed once. If two features have a provable proportional relationship on all relevant inputs, that relationship may also allow them to be merged.

Consecutive affine transformations can be composed as well:

$$
W_2(W_1x+b_1)+b_2
=(W_2W_1)x+(W_2b_1+b_2).
$$

But this example also reminds us that a shorter structure does not guarantee less computation. If the intermediate layer is a narrow bottleneck, two smaller matrix multiplications may be cheaper than the single larger multiplication produced by merging them.

Nonlinearity is not always an obstacle either. If we can prove that the input to a ReLU is nonnegative throughout the specified input domain, the ReLU is the identity on that domain. If its input is always nonpositive, its output is always zero. Such properties may create opportunities for subsequent removal, merging, and linearization.

These examples show that simplification can depend on connectivity, the specific values of the trained weights, and proofs about the input range.

## Existing work already covers parts of this path

There are clear research precedents for this broader direction.

**Structural reparameterization** shows that the structure suited to training can differ from the structure suited to inference. RepVGG uses a multibranch topology during training, then converts it into a simple convolutional structure for inference through structural reparameterization. [1] The relationships that permit merging come from a deliberately designed architecture; they do not imply that arbitrary networks admit the same conversion.

**Computation graph optimization** addresses the implementation after training more directly. TASO automatically generates and verifies graph substitution rules, then uses a cost-driven search to find more efficient equivalent graphs. [2] This is already close to handing a network to an optimizer and asking it to find a cheaper way to write the computation. The guarantees depend on the operator specifications and the arithmetic semantics being used.

**Exact network compression** additionally exploits properties of the network itself. Scaling Up Exact Neural Network Compression by ReLU Stability studies how stable ReLU neurons can support compression while preserving functionality on a specified input domain. [3] That domain is part of the guarantee: a result on a bounded region cannot simply be extended to all real-valued inputs.

Another direction comes closer to reading out what a network has learned. Discovering Symbolic Models from Deep Learning with Inductive Biases uses symbolic regression to extract explicit physical relations from components of graph neural networks with structural priors. [4] It demonstrates a route from neural representations to formulas, but it is not a proof that arbitrary networks can be simplified with exact equivalence over their entire input space.

These works leave me with a further question: after the available local rewrite rules have been exhausted, could we recognize the structure implemented by a stretch of neural computation and find a different algorithm for it?

## From merging operations to recognizing algorithms

Consider a module with an internal iteration:

$$
z_0=0,\qquad z_{k+1}=z_k+c(x),\qquad y=z_n.
$$

If these relationships hold exactly, we can directly obtain:

$$
y=n\,c(x).
$$

This goes beyond removing duplicate nodes. We have recognized a pattern in the entire iteration and replaced it with another way of computing the result. In a fixed-word-size machine model that supports multiplication, this could save many steps. For arbitrary-precision integers, the cost of multiplication itself still needs to be counted.

But a trained module might only approximately follow that update rule. Suppose its actual computation is:

$$
z_{k+1}=z_k+c(x)+\varepsilon_\theta(z_k,x).
$$

Replacing it with \(n\,c(x)\) discards the original network's error terms. The change might bring us closer to the intended task algorithm, but it would no longer be exactly equivalent to the trained network.

This distinction is easy to overlook: **recovering the correct algorithm behind a task and preserving the actual function of a trained network are different objectives.** Exact equivalence preserves the network's mistakes. If we allow those mistakes to be corrected, we need a separate task specification and a definition of acceptable behavioral change.

I also do not expect every network to yield a short formula. Some computations may require complicated nonlinear combinations; some networks may have no readily exploitable redundancy. A useful pattern might also be distributed across many neurons, rather than confined to an existing module with a clear boundary.

A practical starting point may therefore be local: select a small computation, define its input-output interface, propose a simpler candidate, and check whether the replacement is valid. Reconnect it to the original system only when the surrounding network guarantees the conditions required for local equivalence.

## Recursive modules clarify another distinction

This question also makes me think about networks that mix ordinary neurons with recursive units. Some nodes perform a single transformation; others repeatedly apply the same update rule internally.

Such a structure might make repeated computation easier to represent explicitly. But there are two different benefits to distinguish:

- Replacing many repeated modules with a loop that shares parameters can reduce the parameter count and the length of the program description. The cost of executing the steps remains.
- Finding a closed form for the loop, a faster way to compose its operations, or steps that can safely be skipped creates an opportunity to reduce actual computation.

Folding a hundred operations into one recursive node does not eliminate those hundred operations. The interesting question is whether the system can discover a shortcut in the recursive structure and justify it.

This makes the training structure itself a design choice: can it make useful computations easy to learn, while also making the learned structure easy to inspect and optimize?

## How I would start testing the idea

I would begin with small models and local modules, giving the simplification process a starting point that can be checked.

The first step is to build controlled examples. We can construct networks containing repeated features, stable ReLUs, composable affine transformations, and iterations with known solutions, then check whether the system recovers the known equivalent simplifications. These examples can validate the tools, but they do not represent the difficulty of arbitrary trained networks.

The second step is to study networks obtained through training. Freeze the network, treat its actual function as the specification, and let the system propose local replacements. The candidate language could begin with a small set of operations such as affine transformations, ReLU, addition, and multiplication. For suitable subproblems, we could try exact algebra, mixed-integer methods, or SMT verification. Candidates supported only by sample tests should be separately labeled as empirical approximations.

The third step is to compare actual costs. Baselines should include the constant folding, elimination of duplicate computations, and operator fusion already provided by ordinary compilers, so existing optimizations are not counted again as new gains. Alongside parameter counts and operation counts, we should measure latency and memory use at a fixed hardware configuration, numerical precision, and batch size.

If we relax the objective to permit approximation, the new constraint should also be explicit. For example, under a given input distribution \(\mathcal D\):

$$
\mathbb E_{x\sim\mathcal D}
\left[\lVert P(x)-F_\theta(x)\rVert^2\right]
\leq\delta.
$$

This provides a different guarantee from equivalence on every input, and a different one again from equal task accuracy. These directions can be explored in parallel, but their results should be reported separately.

We also need to count the cost of optimization itself. Suppose search and verification cost \(C_{\mathrm{opt}}\), and each deployed invocation saves \(\Delta C>0\). Using a consistent measure of cost, it takes approximately \(C_{\mathrm{opt}}/\Delta C\) invocations to recover the initial investment. An expensive offline proof might make sense for a frequently used inference module, but not for a model run only a few times.

The numerical semantics must be explicit too. An identity over real numbers does not automatically guarantee bitwise agreement in floating-point arithmetic. Exactly preserving a floating-point program, preserving a function under real-number semantics, and allowing bounded numerical error are different verification tasks.

## Could training be followed by understanding and rewriting?

In my [note on neural network programmability](#thought/can-neural-network-weights-be-programmed), I asked whether we could start with a program and compile a network that implements it. Here, the question proceeds in the other direction: given a network that has learned a computation, can we identify its structure and write a better implementation?

Training may be an effective way to discover an implementation. Simplification asks whether, after that discovery, we can understand the implementation further and reduce the cost of using it each time.

This is still a research question. It does not promise that every network has a substantially smaller equivalent form, and it does not require us to begin by decompiling an entire large model into a program. Even proposing, proving, and deploying a cheaper equivalent computation within certain local modules would be concrete progress.

The example I most want to see is simple: a network takes many steps to do something, and a system points out that those steps can be replaced by another operation. Both why the replacement holds and where the savings come from can be checked.

Like looking at a long sequence of additions and finally realizing that we can write a multiplication sign.

## References

- [1] Ding et al., [RepVGG: Making VGG-style ConvNets Great Again](https://arxiv.org/abs/2101.03697), CVPR 2021.
- [2] Jia et al., [TASO: Optimizing Deep Learning Computation with Automated Generation of Graph Substitutions](https://catalyst.cs.cmu.edu/projects/taso.html), SOSP 2019.
- [3] Serra et al., [Scaling Up Exact Neural Network Compression by ReLU Stability](https://papers.neurips.cc/paper_files/paper/2021/hash/e35d7a5768c4b85b4780384d55dc3620-Abstract.html), NeurIPS 2021.
- [4] Cranmer et al., [Discovering Symbolic Models from Deep Learning with Inductive Biases](https://papers.neurips.cc/paper_files/paper/2020/hash/c9f2f917078bd2db12f23c3b413d9cba-Abstract.html), NeurIPS 2020.
