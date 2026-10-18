---
title: "What If Neural Network Weights Could Be Programmed?"
slug: "can-neural-network-weights-be-programmed"
language: "en"
excerpt: "Why do we assume intelligence must be trained into a neural network? From agents studying and editing weights to learning their evolution and compiling neural programs, this essay explores a conjecture about neural network programmability."
---

## A slightly strange question

Recently, while thinking about recursive self-improvement (RSI), a question occurred to me:

Why can an agent that modifies its own code not directly modify its own model weights?

When we discuss RSI today, we usually imagine agents changing their prompts, memory, tools, search algorithms, or even rewriting their entire harness.

But for a neural network, aren't the weights what determine how it computes?

A model's weight file is, in essence, a large collection of numbers:

$$
\theta=(w_1,w_2,\ldots,w_N)
$$

Why must these numbers be obtained through gradient descent?

Why couldn't an agent open a weight file, analyze the numerical relationships, and decide:

$$
w_{135728}:0.032\rightarrow0.047
$$

If changing code can improve an agent, why couldn't changing weights do the same?

Of course, arbitrary numerical changes would probably damage the model. But that seems to show that we do not yet know how to make the right changes, rather than that such changes are impossible in principle.

This led me to a more fundamental question:

**Is training the only way to produce neural network weights?**

## 1. What if weights were another kind of data?

We are already accustomed to language models reading text, images, and code.

Why couldn't neural network weights become another data modality?

Suppose we collected many models with different capabilities and at different stages of training:

$$
\mathcal D=\{
(\theta_1,R_1),
(\theta_2,R_2),
\ldots,
(\theta_n,R_n)
\}
$$

Here, \(\theta_i\) denotes a model's weights, and \(R_i\) describes its performance or behavior.

Could we train a model to understand the relationships among these weights?

For example, could it determine which network reasons better, which parameter changes relate to a particular capability, and how to modify a network to improve its behavior?

There are already precedents.

[Weight Space Learning](https://arxiv.org/abs/2406.09997) treats neural network parameters themselves as objects of learning. [DeepWeightFlow](https://arxiv.org/abs/2601.05052) goes further, investigating how flow matching can generate complete neural network weights.

These works made me realize:

**Weights can be the input and output of another learning system, as well as the result of learning.**

But what I am really curious about is what would happen if, beyond using a specialized weight-generation model, we asked an agent with general reasoning abilities to study these numbers.

## 2. Letting an agent study a neural network like a scientist

Imagine a large model and a small model.

The large model does not need to solve the small model's task directly. Its job is to study the small model.

It can read weights, inspect activations, analyze failures, perform interventions, and observe how each modification changes behavior.

The process might look like this:

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

Suppose the small model consistently fails on a particular class of mathematical problems.

The agent could try to locate relevant computational circuits, predict the consequences of a weight edit, then actually change the numbers and run tests.

Through many experiments, it might gradually develop knowledge about the network's internal computation.

Different agents could even divide the work: some studying attention, others studying MLPs, analyzing errors, designing experiments, or proposing concrete weight edits.

But there is a crucial difficulty.

**Analyzing mathematical relationships among numbers does not amount to understanding their causal effects on model behavior.**

Neural networks have distributed representations, feature superposition, and redundant parameterizations. The function of one floating-point number usually cannot be understood independently of the other parameters.

A capable weight-editing agent should therefore do more than read weights and produce plausible explanations.

It should make predictions that can be tested:

> If this group of parameters is modified in a particular way, how will the model's behavior change on a particular class of inputs?

Moreover, its predictive ability must go beyond random search or conventional black-box optimization.

Perhaps that is what it would really mean for an agent to understand neural network weights.

## 3. Can we learn how weights evolve?

If model weights can be data, could we also learn how they change during training?

Suppose we save checkpoints at different stages:

$$
\theta_0,\theta_1,\theta_2,\ldots,\theta_T
$$

Conventional training updates parameters through gradients:

$$
\theta_{t+1}
=
\theta_t-\eta\nabla_\theta\mathcal L(\theta_t)
$$

But could we directly learn a law of weight evolution?

For example:

$$
\frac{d\theta_t}{dt}=v_\phi(\theta_t,t)
$$

Given a weaker model, could a learned vector field then directly produce a stronger one?

Research has begun exploring this possibility. For example, [Gradient Flow Matching for Learning Update Dynamics in Neural Network Training](https://arxiv.org/abs/2505.20221) studies flow matching as a way to learn parameter-update dynamics produced by existing optimizers.

There is, however, a distinction I consider essential.

**Learning how weights change is different from learning how weights should change.**

If a flow merely predicts how SGD would update the parameters, we are imitating an existing optimization process.

If our goal is to make the model more capable, what we really want to learn is:

$$
p(\Delta\theta\mid\theta,\text{Desired Capability})
$$

In other words: given the current model and the capability we want to improve, directly produce effective weight edits.

This could become a different route to capability improvement.

Of course, matching a probability distribution does not automatically guarantee better performance. Learned updates could leave useful regions of parameter space or introduce forgetting.

It remains a research direction that needs to be tested.

## 4. A more fundamental shift: from training weights to programming them

As I followed this thought further, I realized that my real interest might be less about which algorithm changes the numbers.

Instead:

**Why couldn't we program a neural network the way we program a computer?**

For conventional computers, we do not manually edit enormous collections of machine instructions.

We use higher-level programming languages:

$$
\text{Source Code}
\xrightarrow{\text{Compiler}}
\text{Machine Instructions}
$$

Could neural networks have an analogous process?

$$
\boxed{
\text{Neural Program}
\xrightarrow{\text{Compiler}}
\text{Neural Network Weights}
}
$$

Instead of deciding the value of every floating-point number by hand, we would describe the computation we want in a higher-level language.

A compiler would then generate the weights.

We might describe how a neural circuit should compare numbers, track state, perform carry operations, or combine several computational modules.

There is already an interesting precedent.

Google DeepMind's [Tracr](https://github.com/google-deepmind/tracr) can compile RASP programs into Transformers with concrete weights.

For certain explicitly specified sequence computations, this means we can **construct a Transformer directly rather than obtain it through training**.

It made me realize that implementing a neural network's computational function does not inherently require gradient descent.

Of course, there is an enormous distance between compiling a sequence algorithm and directly programming complex language understanding or mathematical reasoning.

But at least conceptually, we have a starting point.

## 5. Weights may be more like machine code

On reflection, asking an agent to edit billions of floating-point numbers directly may not be the best approach.

Just as modern programmers do not need to understand every machine instruction individually, future agents may not need to interpret neural network parameters one by one.

A more sensible approach might be to develop a higher-level neural programming language.

Such a language would describe:

- What function a neural computational module should perform.
- How modules should exchange information.
- Which internal representations should be established and maintained.
- How different computational circuits should be composed.
- How to modify existing computational structures while preserving prior capabilities as much as possible.

A neural compiler would then translate these descriptions into concrete parameters.

In this picture, weights resemble machine code, while the neural program is what we actually write and maintain.

This raises an interesting question:

**The Transformer is an architecture well suited to training. Is it also well suited to being programmed?**

Perhaps enabling agents to actively design and modify their own internal computation will require more than new training algorithms. It may also require neural architectures that are more modular, composable, and interpretable.

## 6. From programming neural networks to neural networks programming themselves

Eventually, this idea returns to the original question of RSI.

Today, an agent can read its own code, identify a defect, change the code, and run tests.

What would happen if it also had its own neural program?

Let the neural program of generation \(t\) be \(\mathcal P_t\), with corresponding model weights:

$$
\theta_t=C(\mathcal P_t)
$$

The agent could analyze its current capabilities and propose a new program:

$$
\mathcal P_{t+1}
=
A_t(\mathcal P_t,\text{Failures},\text{Experiments})
$$

Then recompile:

$$
\theta_{t+1}=C(\mathcal P_{t+1})
$$

If evaluation confirms that the new version is more capable, the modification is retained.

Recursive self-improvement would then extend beyond changes to the surrounding software.

An agent could also modify the neural structures that implement its own computation.

More interestingly, if the next generation became better both at solving tasks and at designing neural programs, this improvement could continue recursively.

That does not imply automatic or unlimited performance growth. The model-design space may be extraordinarily complex, verification may be expensive, and local improvements may damage other capabilities.

The real challenge is to find a neural program representation that is verifiable, composable, and transferable.

## 7. Questions that remain unanswered

I see at least five questions worth further investigation.

**First, could there be a general-purpose neural programming language?**

RASP can describe some sequence computations. How could a language describe more complex knowledge, concepts, and reasoning abilities?

**Second, can neural circuits be composed like software modules?**

If two circuits each implement a different function, can they be combined without retraining?

**Third, can an agent learn to infer the necessary neural program changes from behavioral failures?**

This would amount to a debugging mechanism for neural networks.

**Fourth, can we decompile an existing model into some kind of neural program?**

If compilation runs in this direction:

$$
\mathcal P\rightarrow\theta
$$

Could we study the reverse direction?

$$
\theta\rightarrow\hat{\mathcal P}
$$

This connects directly to mechanistic interpretability, but must confront representational redundancy and the possibility that a complex network has no concise programmatic explanation.

**Fifth, can a model continually improve its own capabilities without conventional gradient-based training?**

This may be the central research question behind the entire conjecture.

## Closing thought: must intelligence be trained?

I do not think future neural networks will necessarily abandon training altogether.

Training is a highly effective way to extract complex regularities from large amounts of data. Reproducing that ability through explicit programming may be far harder than it sounds.

But I am beginning to think we should not regard training as the only way to produce intelligent models.

Future AI systems might possess three abilities at once:

**Learning**: acquiring new knowledge and representations from data.

**Programming**: constructing new neural computational structures through explicit design.

**Self-modification**: actively changing their internal implementation in response to behavior and experimental feedback.

These abilities may coexist.

Perhaps one day, an agent will do more than write Python and modify its tools and workflows. It will also write a neural program and compile it into the weights of its next generation.

At that point, neural network weights will be more than the numerical residue of a training process.

They may also be a computational representation that can be understood, designed, written, and maintained.

And the question that initially sounded slightly strange—

**"Why can't an agent directly modify its own weight file?"**

—may become a more natural one:

**"If an agent can write its own code, why can't it write its own neural network?"**

## References

- Weiss et al., [Thinking Like Transformers](https://arxiv.org/abs/2106.06981), ICML 2021.
- Lindner et al., [Tracr: Compiled Transformers as a Laboratory for Interpretability](https://arxiv.org/abs/2301.05062), NeurIPS 2023.
- Schürholt et al., [Towards Scalable and Versatile Weight Space Learning](https://arxiv.org/abs/2406.09997), ICML 2024.
- Gupta et al., [DeepWeightFlow: Re-Basined Flow Matching for Generating Neural Network Weights](https://arxiv.org/abs/2601.05052), ICLR 2026.
- Shou et al., [Gradient Flow Matching for Learning Update Dynamics in Neural Network Training](https://arxiv.org/abs/2505.20221), 2025.

