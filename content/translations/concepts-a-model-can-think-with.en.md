---
title: "Can Models Invent the Concepts They Think With?"
slug: "concepts-a-model-can-think-with"
language: "en"
tags: [concept-formation, abstraction, machine-ontology, reasoning]
excerpt: "A genuinely new concept is not merely an unfamiliar name. It is a verified structure that can be reused on new problems and eventually change how later reasoning unfolds."
---

> A genuinely new concept does not give an old pattern an unfamiliar name. It gives the model a unit of thought that it can use again.

I keep returning to one question: can a model do more than find new answers? Can it also propose new insights, concepts, and definitions? This may sound like a question about creativity, but I am not primarily interested in whether a model can produce a sentence that has never appeared before. Verbal novelty is easy to manufacture. Combining a few technical words can yield an expression that did not occur in the training data. The harder question is whether a model can recognize a recurring structure across many concrete experiences, express that structure in a stable form, and then let it change how future reasoning happens.

We usually describe scaling in terms of parameters, data, and inference time. A model can know more, or search for longer before it answers. Human cognition, however, does not advance only by extending the same kind of thought. We also invent variables, objects, and operations that fold recurring relationships into concepts we can use directly. The derivative makes rate of change into an object of calculation. Groups place many apparently different symmetries inside one language. Information gives communication, compression, and uncertainty a common measure. Once such a concept exists, a long chain of earlier reasoning can become the starting point of the next thought.

Alongside the question of how long a model can think, we might therefore ask:

> **What can it think with, and can that basic vocabulary continue to grow?**

## New answers, insights, definitions, and concepts

These terms are easy to collapse into one another, but they describe different abilities. A new answer resolves a particular problem. An insight identifies a relation across phenomena that had not previously been made explicit. It may be important, or it may remain a local observation. A definition draws a firmer boundary. It says what a structure applies to, which conditions it satisfies, which operations it supports, and what kind of counterexample would make it fail. A concept must go one step further. It has to become something that later reasoning can actually call upon.

We can provisionally write the progression like this:

$$
\text{concrete experience}
\longrightarrow
\text{insight}
\longrightarrow
\text{definition}
\longrightarrow
\text{reusable concept}
$$

This is not a fixed production line. A person may write down a definition before understanding why it matters. A model may also use a stable internal structure before it has a natural language description for that structure. The useful distinction is that an insight is a candidate relation, a definition is an interface through which it can be communicated and inspected, and a concept becomes part of capability only when it enters later computation and helps the system handle new problems.

This is why asking a model to propose a new concept is a weak test. A model can generate a new term and attach a plausible explanation while none of its later reasoning depends on the term. Conversely, a model might reliably use a structure as an intermediate variable without ever giving it a name. Concept creation cannot be judged from text alone. We have to ask whether the new structure changes the computation the system actually performs.

## A new concept need not escape the old language

New should not mean impossible to express in the existing vocabulary. If a concept had to be logically undefinable in the old language, functions, macros, invented predicates, and abstractions in program libraries would barely qualify. They can usually be expanded into lower-level expressions, but that does not make them trivial. Before the abstraction is added, the system must repeat a long computation each time. Afterwards, it can treat the whole structure as one operation and continue composing above it.

We can therefore evaluate a candidate concept using the computational frame developed in the earlier notes. Suppose a system originally solves tasks inside a frame \(\Gamma\), and adding a candidate concept \(c\) produces a new frame \(\Gamma+c\). On tasks that played no role in choosing the concept, we can compare the resulting changes:

$$
\Delta_{\mathcal D}(c)
=
(\Delta L,\Delta S,\Delta E,\Delta V),
$$

where the terms represent changes in description, search, execution, and verification cost. A concept may shorten an answer while making it harder to verify. It may be powerful in one domain while weakening transfer elsewhere. It may be natural for a machine and costly for a human to understand. There is no need to compress these effects into one score. The more useful question is whether, after accounting for the complexity of the definition itself, the concept still makes a family of new problems easier to express, discover, execute, or check.

This separates a concept from an ordinary summary. A summary compresses what has already happened. A concept should change what reasoning can happen next. It not only shortens the past, but also makes new combinations and new questions visible.

## A concept may undergo two transformations

Concept learning is often described as extracting an explicit rule from examples, but a complete process may have two directions. The first runs from nonsymbolic experience and low-level computation toward a structure that can be stated. A system encounters related problems, notices that the same relationship keeps returning, and promotes that relationship into a definition with boundaries and operational rules:

$$
\text{recurring low-level structure}
\longrightarrow
\text{explicit concept}
$$

Making the concept explicit allows it to be verified, corrected, shared, and composed. It also lets us inspect what the system actually found rather than seeing only its final answers. Yet if the model must restate the full definition and reproduce the entire derivation every time it uses the concept, the concept has not fully become intuition. A second direction is needed. After repeated and successful use, the structure can be compiled into faster internal computation, so the model no longer has to spell out the whole process each time.

$$
\text{explicit concept}
\longrightarrow
\text{repeated use}
\longrightarrow
\text{compiled intuition}
$$

The first direction makes an implicit structure visible. The second makes a verified structure fluent again. Neither is sufficient by itself. A system that can recite definitions without using them resembles someone who has memorized a textbook but cannot think through it. A system that develops an efficient latent shortcut but cannot externalize or inspect it may be powerful, but it will be difficult to correct and unable to pass the discovery to others.

The interesting loop appears when the two directions connect:

$$
\text{discovery}
\longrightarrow
\text{definition}
\longrightarrow
\text{verification}
\longrightarrow
\text{reuse}
\longrightarrow
\text{internalization}
\longrightarrow
\text{higher-level discovery}
$$

At that point, a concept is no longer only the result of one investigation. It becomes material for the next one.

## Existing work covers different pieces of the chain

Several research traditions already make concept creation more than a philosophical metaphor. COINVENT represents concepts as formal theories with operations, relations, and constraints, then studies how structural mappings, generalization, and blending can construct new theoretical objects. [1] Predicate invention asks how a system can introduce a relation that had no independent representation in its original vocabulary. These approaches show that a concept can have explicit internal structure and can be proposed through an executable transformation rather than through unconstrained verbal generation.

Another line of work locates the value of a concept in reuse. DreamCoder solves families of program-induction problems while extracting recurring structures from the programs it finds and adding them to a growing library. [2] A new library element can still be expanded into old operations, but it changes how later programs can be expressed and found. Here a concept is not a label. It is a piece of computation promoted into a new primitive. Related work on library learning asks which abstractions remain worth adding after the cost of defining them is taken into account.

Compression and reuse do not yet prove that a concept captures stable structure in the world. An arbitrary code can also shorten a training set. Causal abstraction demands something stronger: an appropriate mapping between high-level variables and a low-level system should preserve not only observations, but also relevant interventions. [3] This lets us ask whether a candidate concept is merely convenient notation or whether it supports new prediction, counterfactual reasoning, and action.

These traditions have not converged into a system that can freely create machine-native scientific concepts. A formal theory, a program-library abstraction, a neural latent variable, and a natural language definition are still different objects. Placing them along one chain is nevertheless useful because it shows us what remains missing: how to propose a structure from experience, decide that it deserves independent status, verify it on new problems, and make it part of later computation.

## How would we know the model is not recalling or decorating?

Concept creation first faces a novelty problem. If a model proposes groups, entropy, or a familiar dynamic-programming state, it has not necessarily rediscovered that structure. It may be drawing on language already present in pretraining. Proving that an idea never entered the training data in any form is nearly impossible, but the test can be made stricter. Researchers can use task families generated after training, unfamiliar symbol systems, or constructed worlds with coherent hidden structure. They can withhold the high-level vocabulary and ask whether the model builds a stable intermediate object from low-level regularities alone.

Even after direct recall is made less likely, unfamiliarity is not usefulness. A candidate concept should continue to work away from the examples that produced it. It should survive changes in superficial notation, reduce a real cost on held-out tasks, and make consistent predictions when its variables are intervened upon. If the system is prevented from using the structure, the related capability should decline in an intelligible way. The strongest evidence is not that the model can repeat the definition, but that later computation has acquired an observable dependence on the structure.

Compositionality raises the bar further. A concept that solves only the examples from which it was created may be a local shortcut. A concept that has entered a language of thought should combine with other concepts to generate objects, problems, and consequences that were not individually demonstrated before. At that point, we are measuring more than transfer. We are asking whether the abstraction has expanded the space that the system can naturally express and explore.

## Machine-discovered concepts still have to enter a shared language

In his discussion of pure mathematics in the age of AI, Stephen Wolfram distinguishes finding new results from creating new structures. He argues that even a formally valuable mathematical concept must be knitted into mathematical culture before it can become part of the vocabulary researchers use routinely. [4] This is not merely dissemination that happens after discovery. It is part of the concept's life. A definition must become understandable, examples must accumulate, notation must stabilize, and other people must learn when the concept is useful.

Machine-discovered concepts may make this translation problem sharper. A structure can be simple for high-dimensional computation yet require dozens of interdependent definitions in human language. It may have no natural name and be learnable only through prototypes, interactive tools, or a family of interventions. Work on discovering and transferring concepts from AlphaZero offers a limited but important example. Concepts extracted from the system could be presented through corresponding prototypes and learned by expert chess players. [5] Machine discovery and human understanding may therefore admit more possibilities than complete translation or permanent opacity. Some concepts may be learned through examples, practice, and tools even when no concise verbal gloss captures them.

A complete account of concept creation may therefore include a social and epistemic chain:

$$
\text{machine discovery}
\longrightarrow
\text{explicit definition}
\longrightarrow
\text{empirical test}
\longrightarrow
\text{human-machine translation}
\longrightarrow
\text{shared use}
$$

A latent structure useful to one model can still improve capability, but a concept that enters shared knowledge must allow others to inspect it, challenge it, use it in new settings, and revise it when necessary. A concept is not only compression. It is also a cognitive interface that can be inherited.

## Scaling the abstractions used in thought

We have become accustomed to asking how long a model can think. We ask less often whether, after enough experience, it must continue thinking with the same primitives. If a system repeatedly expands longer reasoning inside the same conceptual vocabulary, more computation can still help, but it may rediscover similar intermediate structures again and again. Another route is to let some of those structures settle into new primitives, allowing the next attempt to begin from a higher level.

This does not mean that more concepts are always better. Too many abstractions can enlarge the search space again. A mistaken definition can mislead a whole family of problems at once, and a highly specialized concept may hide memorization rather than support generalization. The difficult ability is not continual vocabulary growth. It is deciding when a new concept is worth creating, what evidence should preserve it, how it should combine with existing structures, and when it should be abandoned or rewritten.

The sign that a model has begun to create concepts may therefore not be a word that nobody has heard before. It may be a family of formerly difficult problems becoming ordinary. The system no longer repeats the same long computation because it has acquired a new starting point, and that starting point makes another layer of regularity visible for the first time. What has scaled is no longer only the length of thought, but the language in which thought can occur.

## References

- [1] [Schorlemmer et al., *Concept Invention* (2018)](https://link.springer.com/book/10.1007/978-3-319-65602-1)
- [2] [Ellis et al., *DreamCoder: Growing Generalizable, Interpretable Knowledge with Wake-Sleep Bayesian Program Learning* (2021)](https://arxiv.org/abs/2006.08381)
- [3] [Geiger et al., *Causal Abstraction: A Theoretical Foundation for Mechanistic Interpretability* (2024)](https://arxiv.org/abs/2301.04709)
- [4] [Wolfram, *What's the Future for Pure Math Research in the Age of AI?* (2026)](https://writings.stephenwolfram.com/2026/09/whats-the-future-for-pure-math-research-in-the-age-of-ai/)
- [5] [Schut et al., *Bridging the Human-AI Knowledge Gap Through Concept Discovery and Transfer in AlphaZero* (2025)](https://www.pnas.org/doi/10.1073/pnas.2406675122)
