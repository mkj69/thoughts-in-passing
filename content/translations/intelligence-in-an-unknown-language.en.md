---
title: "Intelligence in a Language We Do Not Yet Understand"
slug: "intelligence-in-an-unknown-language"
language: "en"
excerpt: "Large models may not lack abstraction. They may be compressing the world in a conceptual language unlike our mathematical ontology. Interpretability may need to discover that machine-native language before translating it for us."
---

> The inside of a model may not be chaotic. Its regularities may simply be written in a language we have not yet learned.

I increasingly suspect that discussions of intelligence collapse several different questions into one: **knowledge, capability, abstraction, computability, and understandability.**

Large models create a powerful intuition. If parameters, data, and inference time keep increasing, perhaps a unified superintelligence will eventually become good at everything. Hidden inside that picture is an equation that deserves scrutiny: if knowledge can be unified inside one model, then capability should become unified too.

I doubt that the equation holds. Knowledge may share a broad foundation, but capability depends on the primitives a system uses to divide a problem, the coordinates in which it searches, and the interfaces through which its results become verifiable actions. A model may already possess abstractions that are not organized according to a familiar human ontology.

This is not a declaration that every model contains a secret alien science. It is a research hypothesis that should be compared with alternatives and made falsifiable.

## Capability depends on representation, but representation is not a score

The recorded body of human knowledge is unusually suited to broad, lossy statistical compression. Books, papers, webpages, code, and conversations have different structures, yet each can become training signal. A foundation model is defined by this broad training and its adaptability across many downstream tasks. [Bommasani et al., 2021](https://arxiv.org/abs/2108.07258)

Capability, however, is not merely a question of whether relevant information exists somewhere in the parameters. It also depends on whether a task is easy to express, discover, execute, and verify inside the current system.

Python, SQL, Lean, and assembly can all describe complex computations, but they offer different primitives. SQL makes relations, selection, and joins short. Lean turns propositions, types, and proof obligations into manipulable objects. Matthias Felleisen's classic treatment of programming-language expressiveness shows that two languages may compute the same functions in principle without allowing a construct from one language to be expressed locally and naturally in the other. [Felleisen, 1991](https://www.sciencedirect.com/science/article/pii/016764239190036W)

Instead of reducing capability to a deceptively precise sum, it is more useful to treat it as a cost profile:

> C_R(f) := (L_R(f), S_R(f), E_R(f), V_R(f))

Here L is the length required to describe the task and solution, S is search cost, E is execution cost, and V is verification cost. They have different units and need not be directly additive. One representation may shorten an answer while making it harder to verify. Another may execute more slowly while making proof easier. The meaningful comparison concerns dominance across these dimensions and the Pareto trade-offs among them.

This also explains why saying that two systems are universal computers tells us very little. Computability asks whether a process can be implemented in principle. It does not tell us how many resources are required or whether a regularity can be discovered. Turing's undecidability result goes further: universal computation does not provide universal prediction. [Turing, 1936](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230)

Several boundaries must therefore remain visible:

> computable ≠ efficiently computable
>
> compressible ≠ discoverable
>
> represented ≠ understandable

A large part of intelligence may live in a geometry of computation: **which computations become short, natural, discoverable, verifiable, and reusable under a representation.**

## The strongest objection: an LLM is already learning a human ontology

If an LLM is trained primarily on human text, then a radically heterogeneous ontology should not be the default assumption. Text is already a product of human concepts, categories, and causal narratives. The training objective also requires the model to continue producing tokens that people can understand. Compared with a system such as AlphaZero, which learns mainly through self-play, a language model is subject to much stronger human semantic constraints.

The credible version of the thesis is therefore narrower:

> An LLM's input and output ontology is largely inherited from humans, but the internal computational factorization that implements its semantic behavior need not reproduce human conceptual boundaries.

A compiler accepts programs written for humans and produces results that satisfy a human specification, while its intermediate representation may merge, split, or reorder our high-level objects. Likewise, a model can fluently use words such as causality, irony, or deception without maintaining one clean internal object for each word.

The prior for a heterogeneous ontology becomes stronger under particular conditions: training signals come mainly from images, sensors, or scientific instruments rather than language; a system discovers strategies through self-play or long-horizon reinforcement learning; it has a body, memory, and time scale unlike ours; or multiple AIs develop efficient protocols without human participation. The claim should not be equally strong for every kind of AI.

## Three competing hypotheses and what could make them fail

Our current difficulty in understanding a model is compatible with at least three explanations. Separating them turns the black-box metaphor into an empirical question.

**H1: The model has heterogeneous but stable abstractions.** We should find machine-native relations that recur across inputs, training seeds, or neighboring models. They should outperform a human-chosen basis in compression, transfer, or causal intervention while resisting exhaustive description by a few existing labels. Some of them may become bridge concepts that people can learn.

**H2: The model has no stable reusable abstraction.** We should instead observe brittle, distributed, context-bound mechanisms. Intervention effects should resist localization, candidate features should fail to transfer across tasks, and relations should not recur across training runs. In this case, the idea of a machine language would be a romantic projection.

**H3: The model uses approximately human abstractions that we have not decoded.** Better nonlinear decoders, representational alignment, or causal tests may eventually recover variables close to human concepts that are also sufficient to explain behavior. If so, there is no need to posit a heterogeneous ontology.

These hypotheses require different evidence. A neuron that accepts an English label does not by itself establish H3. A feature that resists naming does not establish H1. The relevant comparison is which representation remains stable, compresses behavior, transfers across contexts, and predicts the consequences of intervention.

## Representation shapes search, not only description

Consider the same periodic signal represented first as a sequence of sampled values and then through amplitude, frequency, and phase. Changing frequency may require coordinated edits to many samples in the first representation and only one parameter in the second. Both coordinate systems describe the same signal, but they create different neighborhoods for learning.

Search cost therefore depends not only on the task and representation, but also on the search algorithm and available budget:

> S_R(f; A, B)

The power of an abstraction is not merely that it shortens a solution after the solution has been found. It can move candidates that were far apart into one local neighborhood, allowing a bounded agent to reach them in a few steps. Information geometry gives a concrete example. The steepest direction in ordinary gradient descent depends on the parameter coordinates. Natural gradient uses the Fisher geometry so that an update reflects the local structure of the model distribution more directly. [Amari, 1998](https://direct.mit.edu/neco/article/10/2/251/6143/Natural-Gradient-Works-Efficiently-in-Learning)

Superposition offers another reason why human concepts need not align neatly with individual neurons. When latent features are sparse and available dimensions are limited, a model can pack multiple features into shared directions. [Elhage et al., 2022](https://www.transformer-circuits.pub/2022/toy_model/) A polysemantic neuron may partly reflect a poor coordinate choice rather than an absence of structure.

This result supplies one mechanism for coordinate complexity. It does not establish a complete machine ontology. We still need to distinguish three levels. Notation changes surface symbols. Representation changes coordinates, decomposition, and neighborhood structure. Ontology changes what counts as an object, relation, cause, or intervenable variable.

For a native Chinese speaker learning English, fluency does not come from replacing “狗” with dog and moving each word into a new slot. The speaker must decide which information becomes explicit, what serves as the grammatical subject, and which structure makes a scene natural in the target language. Translation is representation change, not substitution. Yet Chinese and English still share human bodies and a human world. Their distance is probably smaller than the possible distance between a person and a genuinely machine-native ontology.

## AlphaZero shows both convergence and new concepts

Existing evidence does not point only toward machine difference. McGrath and colleagues studied a self-play-trained AlphaZero system and found that many human chess concepts could be linearly decoded from its network, with recognizable concepts emerging over training. [McGrath et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9704706/) This is important evidence for convergence. Shared task structure can drive a machine to rediscover objects that humans also recognize, even without supervision from human games.

Convergence is not the whole story. Schut and colleagues extracted strategic concepts from AlphaZero that did not already have the same place in the human chess vocabulary, then taught some of them to expert players. Learning the concepts improved human judgments in relevant positions. [Schut et al., 2023](https://arxiv.org/abs/2310.16410) This is not proof of a complete alien ontology. It is, however, close to a case of **operational bilingualism**: an internal structure becomes a bridge concept, people learn to use it, and their behavior changes in a measurable way.

Together, these results suggest a more interesting picture than either sameness or difference. Effective intelligences may converge on some invariants because they face the same world, while their training and representations divide and connect those invariants differently. The real questions are where they converge, where they branch, and whether a branch can be translated into a new public concept.

## A real translation must preserve intervention, not only labels

A familiar interpretability pipeline looks like this:

> activation → English label

Labels are useful because safety audits and human communication ultimately require language. If the label arrives too early, however, it may project an unfamiliar structure into a word we already know. A fuller path would be:

> activations → candidate primitives → relations → causal tests → human translation

The central criterion should not be whether the translation sounds similar. It should be whether operational structure survives. If a machine concept m is translated into a human concept T(m), a stronger commuting condition is:

> T(Intervene_M(m, a)) ≈ Intervene_H(T(m), T(a))

After operation a is applied to the machine concept, do the consequences still agree with the corresponding intervention in the human high-level model? Work on causal abstraction tries to define faithful high-level explanations through relations among interventions rather than resemblance among labels. [Geiger et al., 2023](https://arxiv.org/abs/2301.04709)

Different translations will also preserve different things. A mapping can preserve prediction but not intervention, or short-term action but not long-term value. Translation loss is therefore better treated as a vector:

> L(T) := (L_prediction, L_intervention, L_action, L_value)

A translator would not be a universal dictionary. It would be a purpose-specific contract stating what it preserves, what it sacrifices, and where it is likely to fail outside its tested distribution.

## From representational similarity to a limited translator

We already have some early tools. Centered Kernel Alignment can compare how similar the representational spaces of different networks are while remaining invariant to certain irrelevant transformations. [Kornblith et al., 2019](https://proceedings.mlr.press/v97/kornblith19a.html) Model stitching learns a connecting layer between fragments of two networks and tests whether the combined system can still perform a task. [Csiszárik et al., 2021](https://proceedings.neurips.cc/paper/2021/hash/2cb274e6ce940f47beb8011d8ecb1462-Abstract.html)

Neither method is an ontology translator. CKA measures similarity but does not produce a conceptual dictionary. Stitching shows that some computations can be functionally substituted, but it does not make the connector intelligible to a person. Still, these methods turn the question of whether two systems speak a related internal language into something measurable. Combined with causal intervention, cross-task transfer, and human learning experiments, they may support limited and testable translation.

Such understanding may require humans to become partly bilingual. Kuhn's discussion of incommensurability concerned more than different words in old and new theories. It concerned a reorganization of which classifications were natural, which questions mattered, and which observations counted as evidence. [Kuhn, 1962](https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html) The difficulty in moving from Newtonian mass to Einsteinian mass is not finding a replacement word. It is learning the new network of relations in which the concept lives.

Likewise, understanding a machine-native concept may require more than reading a plain-language explanation. We may need to use it on new examples, make predictions through it, learn which interventions break it, and discover where it is more powerful than an older concept.

## A machine ontology will not reveal itself automatically

The claim that everything becomes simple in the correct basis can also be too optimistic. The same function can be implemented through many invertible transformations of internal coordinates, each producing a different kind of sparsity or interpretability. Locatello and colleagues showed that, without additional inductive biases, unsupervised disentanglement is not identifiable in the general case. The observed distribution alone does not determine which factorization contains the true factors. [Locatello et al., 2019](https://proceedings.mlr.press/v97/locatello19a)

The Platonic Representation Hypothesis points in another direction. Increasingly capable models may converge toward similar statistical representations because they encounter the same reality. [Huh et al., 2024](https://proceedings.mlr.press/v235/huh24a.html) If this convergence is broad, a machine ontology will not be wholly heterogeneous. The world itself will constrain every representation that works.

A model's own ontology therefore cannot mean the most visually appealing feature set. A candidate ontology should pass at least four tests:

1. **Stability:** Do its relations recur across inputs, seeds, models, and modalities?
2. **Causality:** Do interventions produce predictable, relatively localized, and repeatable changes in behavior?
3. **Compression and transfer:** Does it explain behavior more compactly than a human-chosen basis and predict tasks that were not used to discover it?
4. **Teachability:** Can a person or another model learn an approximate interface and then benefit on new problems?

These tests allow the three earlier hypotheses to compete. Stable nonhuman structure supports H1. A persistent lack of transferable factors supports H2. Increasingly complete alignment with human concepts supports H3. We do not need to decide which story is most attractive. We need experiments that can make some of the stories fail.

## Conclusion: deeper intelligence may invent representations

Most benchmarks fix an input space, a problem format, and an evaluation rule, then ask whether a system can find the answer inside that representation. Many of the most important human cognitive advances did not come from searching an old space faster. They changed the space in which a problem could be posed. Negative numbers, calculus, probability, vectors, genes, and entropy introduced primitives that made whole families of questions expressible, computable, and verifiable.

We can therefore separate two capabilities:

> object-level intelligence: solving f inside a given R
>
> meta-intelligence: discovering, inventing, or learning a better R

If recursive self-improvement occurs, its most important transitions may not be the same reasoning process running faster. A system may invent new internal primitives, memory organizations, proof languages, and translation interfaces. A region that required a long search for one generation could become one step for the next.

The endpoint of interpretability would then be more than assigning names to neurons. It would compare candidate representations, test causal structure, measure translation loss, and help people learn the bridge concepts that deserve to enter a public language.

The most important product of AI for science may be more than a theorem, a molecule, or a prediction. It may be a new concept, first discovered by a machine and only later learned by people. What matters is not only whether machines answer more of our old questions, but whether they help us enlarge the space of questions we can ask.

At that point, AI would no longer be helping us compute within existing mathematics. It would be participating in the creation of a new language:

> a shared language of abstraction between humans and machines.
