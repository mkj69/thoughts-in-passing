---
title: "Intelligence in a Language We Do Not Yet Understand"
slug: "intelligence-in-an-unknown-language"
language: "en"
excerpt: "Large models may not lack abstraction. They may be compressing the world in a conceptual language unlike our mathematical ontology. Interpretability may need to discover that machine-native language before translating it for us."
---

> The inside of a model may not be chaotic. Its regularities may simply be written in a language we have not yet learned.

I increasingly suspect that discussions of intelligence collapse several different questions into one: **knowledge, capability, abstraction, computability, and understandability.**

Large models create a powerful intuition. If we keep adding parameters, data, and inference time, perhaps a unified superintelligence will eventually become good at everything. Hidden inside that picture is an equation that deserves more scrutiny: if knowledge can be unified inside one model, then capability should become unified too.

I am not sure that follows.

## Knowledge may share a foundation while capability remains representation-dependent

The public record of human knowledge is unusually suited to broad, lossy statistical compression. Books, papers, webpages, code, and conversations have different structures, but each can become training signal. A foundation model is defined by this broad training and its adaptability across many downstream tasks. [Bommasani et al., 2021](https://arxiv.org/abs/2108.07258)

Capability, however, is not merely a question of whether relevant information exists somewhere in the parameters. It also depends on whether a task is easy to express, search, execute, and verify inside the current system.

Python, SQL, Lean, and assembly can all describe complex computations, but they offer different primitives. SQL exposes relations, selection, and joins. Lean exposes propositions, types, and proof obligations. A coding agent's repository browser, shell, filesystem, test runner, and patch tool transform the vague intention to fix a bug into a sequence of executable operations.

Matthias Felleisen's classic treatment of programming-language expressiveness separates two ideas that are often confused. Two languages may compute the same functions in principle, while a construct in one language still cannot be expressed locally and naturally in the other without reorganizing the whole program. [Felleisen, 1991](https://www.sciencedirect.com/science/article/pii/016764239190036W)

The central question about capability may therefore be more than:

> Can this system, in principle, complete task f?

A more useful question is:

> Under representation R, how easy is task f to describe, discover, execute, and verify?

As provisional notation rather than an established metric, we might write:

> C_R(f) = L_R(f) + S_R(f) + E_R(f) + V_R(f)

Here L is description length, S is the cost of searching for a solution, E is execution cost, and V is verification cost. Two systems may be equivalent in computability while differing by many orders of magnitude in C_R(f) because their representations are different.

This may be part of the geometry of intelligence. Intelligence is not only a set of possible computations. It is also a structure that determines **which computations become short, natural, discoverable, and reusable.**

## Algorithms are compressions written in a human ontology

Many formulas, algorithms, and scientific theories can be understood as forms of compression. F = ma summarizes a large family of possible motions. The central structure of quicksort covers indefinitely many concrete inputs. Rissanen's minimum description length principle turns a related intuition into a criterion for statistical modeling: a good model should minimize the combined description of the model and the data encoded through it. [Rissanen, 1978](https://www.sciencedirect.com/science/article/pii/0005109878900055)

Human-readable algorithms have a special property. They are not merely short. They are written in a conceptual language closely matched to human cognition. Variables, functions, sets, recursion, objects, causality, probability, and proof are not the only coordinate system the universe permits. They are abstractions that humans gradually constructed through mathematics, logic, and scientific practice.

When we call an algorithm interpretable, the actual path may look like this:

> computation → human mathematical ontology → understanding

We understand it not only because the program is short, but because it has already been translated into primitives we know how to think with.

## A model also compresses, but it is not required to use our concepts

A neural network also performs a kind of compression. Statistical structure in the training data becomes embedded in parameters and activations. Yet the optimization objective never asks the model to organize regularities through concepts such as variable, object, recursion, deception, or cause. It asks for lower loss.

That permits a stronger hypothesis:

> The model may not lack abstraction. Its abstractions may be heterogeneous with ours.

The black-box problem may not be a simple absence of structure. The model may contain structure whose primitives are missing from our vocabulary.

Imagine a geometric object that has a one-line equation in the right coordinates. After a complicated nonlinear change of coordinates, the same object can look hopelessly irregular. Some apparent neural complexity may likewise be coordinate complexity rather than intrinsic complexity.

A model might contain latent objects that are extremely natural for prediction but have never been named by humans. A single object could combine what we separately call syntax, semantics, causal structure, social relation, and uncertainty. Those belong to different disciplines for us. For the model, they may form one primitive.

This does not imply that a clean secret science already exists inside every model. It makes a narrower point. Failure to find a human-readable label is not logically equivalent to absence of abstraction.

## From Chinese to English: translation is not word substitution

As a native Chinese speaker learning English, it is easy at first to imagine the task as finding corresponding words. 狗 becomes dog, 桌子 becomes table, and the words are rearranged into a new order. The real difficulty quickly appears outside vocabulary.

Chinese and English do not always require speakers to make the same information explicit. Chinese can rely heavily on context, omit an already established subject, and frequently organize sentences around a topic. English more often requires the subject, tense, articles, and syntactic roles to appear in the surface form. Research on Chinese learners of English has observed the transfer of topic-prominent structures from Chinese into English, with that influence changing across the learning process. [Gong, 2019](https://www.benjamins.com/catalog/jsls.17016.gon)

Translating “这件事，我昨天已经处理好了” is therefore not a matter of moving each fragment into a fixed slot. The translator must reconstruct who becomes the grammatical subject, which information must be encoded explicitly, and which structure feels like a natural thought in the target language.

This does not mean that a language determines which concepts its speakers can think. A more careful claim is that different languages ask speakers to attend to different information at the moment of speaking. Slobin calls this process **thinking for speaking**. When experience is organized into speakable form, grammar influences which features must be selected and encoded. [Slobin, 1987](https://spot.colorado.edu/~michaeli/courses/LAM5430/5430e_reserves/Thinking_for_Speaking.pdf)

Fluency is therefore not possession of a larger Chinese-English dictionary. It is the ability to reconstruct the same scene under two representational systems. Translation is not substitution. It is representation change.

## Programming languages amplify the difference

Natural languages still share a large body of physical experience and social reality. Programming languages show more sharply how abstraction can change capability.

Python, SQL, Lean, and assembly can all participate in complex computation, but they make entirely different objects primitive. SQL turns relations, selections, and joins into short expressions. Lean makes propositions, types, and proof obligations manipulable. Assembly exposes machine state while making high-level intention painfully long.

The fact that all of them compute does not give them the same practical capabilities. If a task must first be translated into thousands of low-level operations, it may be computable in theory while remaining almost undiscoverable to a real cognitive system.

Programming languages suggest a stronger analogy. A model's internal representation may be not only the language in which it describes the world, but also the programming language that determines which capabilities it can acquire naturally.

## Different capabilities may require different abstractions

The capability cost introduced earlier can be turned into a selection problem:

> R*(f) = argmin_R C_R(f)

For a task f, which representation R minimizes the combined cost of description, search, execution, and verification?

The crucial point is that R* probably depends on f. Primitives suited to formal proof may be poor tools for understanding social relationships. A state space suited to molecular dynamics may not support long-horizon planning. A token sequence suited to language generation may not be the best representation for controlling a body.

The future of AI may therefore involve more than scaling one foundation model indefinitely. Knowledge may share a broad foundation, while different capabilities require different forms of memory, tools, world models, time scales, training loops, and abstraction.

What emerges may not be one unified machine mind but many substantially different machine ontologies. An AI formed around mathematics, an AI that learns alongside cells and laboratories, and an AI that acts persistently in the physical world may possess not only different knowledge but different primitives for dividing reality.

Their relationship to current models might be more than that of stronger successors. They may resemble new **cognitive species**, distinguished not by appearance but by what counts as primitive, which regularities are easy to discover, and which explanations feel natural inside them.

## We may need a translator between humans and AI

If humans and different AIs use different ontologies, interpretability cannot stop at attaching English labels to activations. We may need a bidirectional conceptual compiler:

> human intention ↔ translator ↔ machine ontology

It would translate a human question into a representation that an AI can search naturally, then translate the discovered structure back into concepts that humans can inspect, contest, and act upon. It would also need to state what was lost in translation instead of merely producing a plausible explanation.

The future may require more than human-to-AI translation. Different AIs may need translators between one another:

> O_human ↔ O_math-AI ↔ O_biology-AI ↔ O_embodied-AI

Multilingual machine translation has already explored interlingua-like representations that allow different languages to communicate through a shared latent space. [Lu et al., 2018](https://arxiv.org/abs/1804.08198) The interlingua imagined here would go deeper. It would connect not Chinese and English sentences, but the primitives through which different cognitive systems construct concepts, evidence, and causal relations.

Such a translator could itself become a new kind of AI. Its defining capability would not be solving one domain problem. It would preserve structure across ontologies, expose translation loss, and discover invariants shared by otherwise different minds.

The result may be neither humans finally decoding one machine language nor every machine converging on the same language. It may be an ecology of cognitive languages. Humans, mathematical AIs, biological AIs, and embodied AIs could collaborate through an evolving interlingua while retaining their most powerful abstractions.

That would be something new: not a single superintelligence, but a **plural intelligence ecology**.

## Existing evidence supports two opposing intuitions

Interpretability research has recovered structures that are more stable than individual neurons. Sparse autoencoders can decompose dense activations into sparser and relatively more monosemantic features. In some settings, the resulting features identify directions with causal roles in model behavior. [Cunningham et al., 2024](https://proceedings.iclr.cc/paper_files/paper/2024/hash/1fa1ab11f4bd5f94b2ec20e794dbfa3b-Abstract-Conference.html) Anthropic later scaled a related approach to Claude 3 Sonnet and extracted a very large dictionary of recognizable features. [Templeton et al., 2024](https://transformer-circuits.pub/2024/scaling-monosemanticity/)

Other work finds that some high-level concepts behave like directions in activation space. Yet the meaning of a linear representation depends on counterfactual definitions and on the inner product used to define the geometry. [Park, Choe & Veitch, 2023](https://arxiv.org/abs/2311.03658) Research on space and time has also identified linear structures that remain relatively stable across prompts and entity types in several language models. [Gurnee & Tegmark, 2024](https://openreview.net/forum?id=jE8xbmvFin)

These results show that model internals are not devoid of recoverable structure. They do not prove that the recovered structures are identical to the primitives the model actually uses. A sparse feature comes from a particular dictionary-learning objective. A linear direction depends on a chosen geometry. Our tools may reveal structure while simultaneously imposing the kind of structure we prefer.

An intriguing counter-hypothesis points in the other direction. The Platonic Representation Hypothesis proposes that stronger models across architectures and modalities may converge toward a shared statistical model of reality. [Huh et al., 2024](https://proceedings.mlr.press/v235/huh24a.html) If broad convergence exists, a machine ontology may not be wholly alien. The world itself may exert common pressure on any effective representation.

The real answer may therefore be neither complete identity nor complete difference. Human and machine representations may converge on some invariants while differing in how they divide, compose, and use those invariants.

## Interpretability should not end too early at an English label

A common interpretability pipeline looks like this:

> activation → English label

We find a feature and ask whether it represents deception, France, quotation marks, or a grammatical pattern. This is useful because safety audits and human communication ultimately require language. But if the label arrives too early, a strange and richer structure may be projected into a concept we already know.

Another pipeline would look like this:

> activations → machine-native primitives → relations → machine-native theory → human translation

Here the immediate goal is not to name every feature. It is to recover an ontology with predictive and causal power. Which primitives recur reliably? How do they compose? Which relations survive changes in layer, prompt, model seed, and architecture? How does intervening on them change behavior?

Only then do we study the mapping:

> O_machine ↔ O_human

This resembles first contact with a genuinely unfamiliar scientific language. The first question should not be which word corresponds to our noun. It should be how the system divides the world into basic units in the first place.

## A machine ontology will not reveal itself automatically

The claim that everything becomes simple in the correct basis can also be too optimistic. Representations are usually not unique. The same function can be implemented through many invertible transformations of internal coordinates, each offering a different kind of sparsity or interpretability.

Locatello and colleagues provide an important warning. Without additional inductive biases, unsupervised disentanglement is not identifiable in the general case from the observed distribution alone. [Locatello et al., 2019](https://proceedings.mlr.press/v97/locatello19a) The data may not determine which factorization contains the true factors.

A model's own ontology cannot simply mean the most visually pleasing set of latent features. It should survive stricter tests:

- **Stability:** Do the same relations recur across inputs, training seeds, layers, and neighboring models?
- **Causality:** Do interventions produce predictable and localized changes in behavior?
- **Compositionality:** Can the primitives generate higher-level regularities rather than merely collect correlated examples?
- **Compression:** Does the representation yield a shorter and more accurate account of behavior or external data?
- **Transfer:** Does the structure predict tasks that were not used to discover it?
- **Translatability:** Can a human learn an approximate interface that preserves what matters and makes translation loss explicit?

Machine-native does not mean exempt from human standards. An ontology gains meaning through prediction, intervention, compression, and transfer, not through an attractive feature visualization alone.

## Computability is an extremely permissive common denominator

If both human minds and models can ultimately be viewed as computations, do their representational differences become irrelevant? The opposite may be true.

Universal computation tells us whether a process can be implemented in principle. It says nothing about required time or memory, and nothing about which representation makes a regularity easy to find, prove, or reuse. Computational complexity theory was created to study precisely this missing layer. [Hartmanis & Stearns, 1965](https://dl.acm.org/doi/10.1145/321250.321266)

The computable world also contains general limits. Turing's classical result rules out a universal decision procedure that always settles the corresponding termination question for arbitrary programs and inputs. [Turing, 1936](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230)

Therefore:

> universal computation ≠ universal prediction

The shortest-program perspective is even more directly connected to abstraction. For an object x, we can ask how short the shortest program that generates it is under a universal machine U:

> K_U(x) = min |p| such that U(p) = x

This turns optimal compression into a mathematical object. Chaitin's work on program size for finite binary sequences is one of the foundations of this theory. [Chaitin, 1966](https://dl.acm.org/doi/10.1145/321356.321363) Yet Kolmogorov complexity itself is uncomputable. No general algorithm can guarantee the shortest description of every arbitrary object.

There is another subtlety. K_U(x) is relative to the description language U. The invariance theorem says that changing universal languages changes complexity by a language-dependent additive constant. For finite tasks in the real world, that constant can matter enormously. A short explanation never exists independently of a representation.

Several distinctions must therefore remain intact:

> computable ≠ efficiently computable

> computable ≠ predictable

> compressible ≠ able to discover the compression

> internally represented ≠ humanly understandable

A system may be capable of a computation without completing it under realistic resources. A regularity may have a short description without any learner finding it. A model may contain structure that no concept in the current human ontology can express faithfully.

## A research program for machine-native science

This idea can become more concrete than the instruction to name neurons.

First, search for **invariant structure** rather than the most interesting English label. Train different models on the same task. Vary seeds, architectures, modalities, and objectives. Then ask which geometric relations, composition rules, or intervention effects remain.

Second, separate feature discovery from relation discovery. The important object may not be an isolated primitive but an algebra, graph, or dynamic transformation among primitives. An ontology is not only a vocabulary. It also contains a grammar that specifies valid compositions and inferences.

Third, build a bidirectional translator. Human concepts should project into machine-native structure, and machine structures should be approximately translatable back. Both directions should report information loss instead of producing only a fluent explanation.

Fourth, validate through intervention rather than aesthetic appeal. If a candidate primitive belongs to the model's computation, changing it should produce predictable effects across contexts while minimizing unrelated damage.

Finally, test whether the recovered structure can create a **new concept**. A latent structure becomes scientifically interesting if it shortens the description of data, proposes an experimental distinction that did not exist before, or helps humans solve new problems after they learn to use it. Only then might it be more than an internal shortcut. It might deserve a place in a shared language.

## Intelligence may be a geometry of computation

Human mathematics is an extraordinarily powerful compression language. Algorithms are shareable and checkable compressions written in that language. A large model may be another kind of compression machine. It forms representations from data without any obligation to rediscover our conceptual boundaries.

Model opacity therefore need not imply internal chaos. A more interesting and unsettling possibility is that regularities exist inside the model, but their language has not yet been translated.

The deepest goal of future interpretability may not be to force every machine structure back into concepts humans already possess. It may be to let machines demonstrate that our way of dividing the world is not the only one.

The most important product of AI for science might then be more than a theorem, a molecule, or a prediction. It might be a new concept, first discovered by a machine and only later learned by humans.

At that point, AI would no longer be helping us compute within existing mathematics. It would be participating in the creation of a new language:

> a shared language of abstraction between humans and machines.
