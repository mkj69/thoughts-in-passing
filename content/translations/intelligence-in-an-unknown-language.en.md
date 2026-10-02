---
title: "Intelligence in a Language We Do Not Yet Understand"
slug: "intelligence-in-an-unknown-language"
language: "en"
excerpt: "Programs are written inside conceptual systems invented by humans, while neural networks form their own internal representations through optimization. Their opacity may come not only from computational complexity, but from a mismatch of representation, ontology, and scale."
---

> The regularities inside a model may be written in a language we have not yet learned.

I increasingly suspect that discussions of intelligence collapse several different questions into one: **knowledge, capability, abstraction, computability, and understandability.**

Large models invite a seductive picture of unified intelligence. Keep adding parameters, data, and inference time, and perhaps we will eventually obtain one system capable of solving every problem.

Yet no matter how large a model becomes, it is still a computational process. Whether a problem can be solved depends first on whether some computational process can represent and solve it. It does not depend only on how many parameters the model has, how much data it has seen, or how long it is allowed to think.

There is a hidden leap here. Because more and more knowledge can be compressed into one model, we begin to assume that more and more capabilities can be unified as well. We may even start to treat every problem as something that will eventually yield to more computation.

But these are three different claims: that knowledge can share a representation, that capabilities can share an implementation, and that a problem is computationally solvable in the first place.

The deeper question may not be how universal a model can become. It may be:

> **How much of the capability space can one computational paradigm cover? What determines its boundary? When we reach that boundary, what new structures, representations, and ways of interacting with the world will be required?**

## Knowledge can share a foundation while capability depends on representation

One of the most fascinating things about foundation models is that they seem to demonstrate how much heterogeneous knowledge can fit inside one shared base.

Books, papers, webpages, code, and conversations have very different structures, yet all can become training signals and flow into one set of parameters. In a sense, this is the central promise of a foundation model: train one broad base, then adapt it across many downstream tasks. [1]

But there is an easy mistake to make:

> **Knowledge can share a foundation without every capability naturally sharing the same representation.**

Whether a system knows something is not the same as whether it can perform a task efficiently.

Capability depends not only on whether relevant information exists somewhere in the parameters. It also depends on whether a task is easy to **represent, search, execute, and verify** within the current system.

Programming languages make this especially clear.

Many languages can support complex computation, but they do not offer the same basic operations. A database language makes relations, filtering, and joins primitive. A proof language gives direct access to propositions, types, and proof goals. A coding agent with a repository browser, shell, filesystem, tests, and patch tools turns the vague intention to fix a bug into a sequence of local, executable, and checkable operations.

The important difference is not simply what these systems can compute. It is:

> **Which computations become natural under this representation?**

Classic work on programming-language expressiveness already makes this distinction. Two languages may compute the same functions in principle while a construct in one still cannot be expressed locally and naturally in the other without reorganizing the whole program. [2]

For an intelligent system, a more useful question is therefore not:

> Can this system complete task *f* in principle?

It is:

> Under representation *R*, how easy is task *f* to describe, discover, execute, and verify?

We can preserve this intuition with a provisional cost profile:

> C_R(f) = (L_R(f), S_R(f), E_R(f), V_R(f))

Here:

- L_R(f) is the length required to describe the task or solution under representation *R*;
- S_R(f) is the cost of searching for a solution;
- E_R(f) is the computational cost of executing it;
- V_R(f) is the cost of verifying that the result is correct.

These quantities should not be collapsed too quickly into one score, because a representation redistributes difficulty.

One representation may make an answer very short while leaving search almost impossible. Another may execute more slowly but make verification easy. A third may introduce a new primitive that turns a large combinatorial search into one direct, local operation.

The meaningful comparison is not only which system is stronger. It is:

> **How does each representation reshape the difficulty structure of a task?**

A Fourier transform does not enlarge the set of computable functions, but it turns some complicated operations into simple relations. Dynamic programming does not cross a boundary of computability, but it reorganizes repeated search into reusable states. A proof assistant does not create new logical truths, but it turns proofs into objects that can be constructed and checked mechanically.

New capability, in other words, does not always come from more parameters, more data, or more computation.

Sometimes it comes from a new coordinate system.

This may reveal something basic about intelligence:

> **Intelligence is not only what a system can compute. It is also the ability to find a representation in which important computations become short, natural, discoverable, executable, verifiable, and reusable.**

## Algorithms are compressions written in a human ontology

Many formulas, algorithms, and scientific theories can be understood as forms of compression.

*F = ma* condenses a large family of possible motions into one short relation. Quicksort covers indefinitely many inputs with a simple recursive structure. The minimum description length principle formalizes a related intuition: a good model should minimize the combined complexity of the model and the data described through it. [3]

Human-readable algorithms, however, have a special property:

**They are not only short. They are written in a conceptual language that fits human cognition.**

Variables, functions, sets, recursion, objects, causality, probability, and proof are not the only coordinate system permitted by the universe.

They are abstractions that humans gradually invented through mathematics, logic, and scientific practice.

When we call an algorithm interpretable, the path may therefore look like this:

> computation → human mathematical ontology → understanding

An algorithm is understandable not only because it is concise, but because it has already been expressed through primitives we know how to think with.

The algorithm has not merely performed a computation.

It has already performed part of the translation for us.

## A model also compresses, but it is not required to use our concepts

Neural networks compress too.

Recurring statistical structure in the training data becomes absorbed into parameters, activations, and intermediate representations. A capable model must form internal structure that supports prediction, generation, and reasoning. Otherwise, it could not generalize across such varied inputs.

The crucial point is that the training objective never asks this structure to follow familiar human conceptual boundaries.

The objective does not require the model to form the internal objects we would have chosen.

It asks only for better performance.

The black box may therefore not be empty of structure. Structure may be present while its basic units fail to match the ontology humans already possess.

There is a further possibility. The structure may become visible only at the right scale.

Physics offers many examples of this. At the microscopic level we find particles and local interactions. At the macroscopic level, variables such as temperature, pressure, and phase transitions appear.

Temperature is not a property of one particle.

It becomes a natural object only after many microscopic degrees of freedom have been coarse-grained in the right way.

Neural networks may have a similar problem of scale.

We often search for explanations at the level of one neuron, one local feature, or one named concept. The model's natural abstractions may instead live in higher-order subspaces, population activity, cross-layer computations, or dynamic trajectories.

Model opacity may therefore contain two different mismatches.

The first is an **ontological mismatch**. The objects through which a model organizes computation may not follow familiar human boundaries.

The second is a **scale mismatch**. The scale at which we inspect the model may not be the scale at which its abstractions actually emerge.

A large model may be computing through a representational system unlike human mathematical ontology, while we have not even found the right resolution at which to observe it.

If so, interpretability should not stop at assigning a human label to an activation.

It needs to search for two things:

> **The model's native conceptual structure, and the natural scale at which that structure appears.**

## Language models have not escaped the human ontology

The idea of a machine-native ontology can easily be made too strong.

Today's language models did not grow up in a world independent of human concepts.

Their main material is language written by people.

Natural language already carries structures selected through long cultural, scientific, and social practice. We speak of objects, causes, promises, deception, functions, and proofs. These concepts appear throughout the training data and shape the language that a model must predict and generate.

An LLM's internal representation is therefore unlikely to escape human ontology completely.

But one distinction matters:

> **A human semantic interface does not require a human internal decomposition.**

The model must receive and produce human language, so some alignment with our conceptual system is unavoidable.

It can still implement that semantic behavior through a very different decomposition.

One human concept may split across several distributed variables. Several concepts that seem independent to us may share one set of underlying structures inside the model.

A compiler provides a useful analogy.

Loops, variables, and functions are high-level abstractions designed for humans. After optimization, an intermediate representation may unroll the loop, eliminate the variable, fuse operations, and completely alter the original module boundaries.

The final program still satisfies the same goal without preserving the source code's conceptual decomposition.

A language model may work in a similar way.

It can use irony, deception, or causality fluently without containing one sharply bounded and permanently located object for each word.

The relevant structure may be distributed, dependent on context, or stable only within a higher-level dynamic process.

The better question is not:

> Does an LLM possess an ontology completely independent of ours?

It is:

> **Under the strong semantic constraint of human language, how much representational freedom remains inside the model?**

Which structures converge toward human concepts because of language supervision?

Which structures are still reorganized in a way that is more natural for the machine?

Which concepts are aligned only at the output, and which correspond to stable internal computations?

## When will a machine form an ontology of its own?

If language models remain constrained by the semantic interface of human language, a natural question follows:

> **What happens as that constraint weakens?**

The question may matter even more outside pure language models.

A system that learns primarily from experimental measurements rather than human prose does not need to begin with our existing divisions. It may form latent variables that are highly natural for prediction but have never received separate human names.

An agent that learns mainly through self-play may build representations for planning, strategy, and long-term credit assignment rather than for verbal expression.

An embodied system acting in the physical world may discover state variables that are indispensable for control but do not correspond to any existing word.

A structure that requires several human concepts to describe may be one directly usable object for the machine.

As training shifts from imitating human text toward predicting the world, optimizing long-term reward, manipulating an environment, and performing experiments, the relation between machine and human representations may change systematically.

Some human concepts may have stable counterparts inside a model. Some may split into several structures. Others that humans treat as separate may share one representation. Important machine-native abstractions may have no natural human names at all.

The real question is:

> **What determines convergence and divergence between machine and human representations?**

Is it the data, objective, architecture, form of interaction, or the environment in which the system persists?

## Different capabilities may require different abstractions

The preceding argument suggests something else:

> **There is no best representation independent of a task.**

Primitives that support formal proof may be poor tools for understanding social relationships. A state space suited to molecular dynamics may not support long-horizon planning. A token sequence suited to language generation may not be the best representation for controlling a body.

The future of AI may therefore involve more than making one foundation model larger and larger.

Knowledge may share a broad base while different capabilities require different memory structures, tools, world models, time scales, training processes, and forms of abstraction.

What emerges may not be one unified machine mind, but many substantially different machine ontologies.

An AI formed around mathematics, one that learns alongside cells and laboratory instruments, and one that acts persistently in the physical world may possess not only different knowledge, but different basic units for dividing reality.

Their relationship to present models may be more than that of stronger successors.

They may resemble new **cognitive species**.

The distinction would not be a matter of appearance. It would concern what counts as a basic object, which regularities are easy to discover, which explanations feel natural, and which questions are worth asking.

## From representation to ontology: how intelligence reshapes a problem space

A representation does more than shorten an answer after it has been found.

It changes how a system searches for the answer.

When the same problem is expressed differently, the meaning of one small step can change. Candidate solutions that were far apart may become neighbors. Regularities that were hidden may become easy to see.

Consider one periodic signal. It can be represented as a long list of sampled values, or through amplitude, frequency, and phase.

In the first representation, changing the frequency requires coordinated changes to many values. In the second, it requires changing one variable.

The signal is the same, but the geometry of search is not.

Search difficulty is therefore not a fixed property of task *f*. It depends on the task, representation, search procedure, and computational budget together:

> S_R(f; A, B)

Here *R* is the representation, *A* is the search procedure, and *B* is the available budget.

A good abstraction often does not help a system search the old space faster. It reorganizes the space.

Solutions that were distant may become local neighbors. A transformation that required many operations may become one direct operation because the new representation treats it as primitive.

Many important cognitive transitions work this way. They do not accelerate the old search. They make the old search unnecessary in its previous form.

Dynamic programming is a simple example. It does not change whether a problem is computable. By introducing states and subproblems, it rewrites repeated search as reusable local structure.

A Fourier transform does something similar. It does not create new regularities in a signal. It turns relations that are complicated in the time domain into simpler ones in the frequency domain.

Representation is therefore not merely the language used to describe an answer.

It also specifies how search happens.

It determines:

- what counts as a variable;
- what counts as a local change;
- which states are near one another;
- which structures can be reused;
- which directions are easy to explore.

At this point, a finer distinction becomes important. When we say that a system uses a different representation, we may be referring to changes of very different depths.

The first level is **notation**.

The underlying objects and relations stay the same. Only the symbols change. Renaming *x* as *z* usually does not change the problem.

The second level is **representation**.

The objects remain broadly similar, but the coordinates, decomposition, and neighborhood relations change. The time and frequency domains describe the same signal, yet some operations are complicated in one and natural in the other.

The third level is **ontology**.

Now the system changes what counts as an object, relation, relevant factor, or intervenable variable.

The three levels affect different things:

> notation → how something is written

> representation → how search happens

> ontology → how the world is divided

Notation changes expression. Representation changes the geometry of learning and search. Ontology changes the way a system divides the problem itself.

Representation asks:

> **How should the same world be organized?**

Ontology asks:

> **What is the world divided into in the first place?**

This makes neural networks more interesting.

If the difference between a model and a human remains at the level of representation, then the problem may mainly be one of coordinate transformation. With the right decoder, the model's structure may still map onto concepts that humans already have.

If the difference reaches the level of ontology, the problem changes.

The model may not be using different coordinates for our objects. It may be deciding differently:

> **What counts as an object?**

That is where a machine-native ontology becomes a serious possibility.

Part of intelligence may therefore consist not in searching a fixed space more powerfully, but in discovering representations that bring distant solutions closer and turn long chains of reasoning into local, natural operations.

A deeper intelligence may go further. It may alter the space itself by inventing new basic concepts, deciding that different objects deserve to be represented, and making previously awkward questions natural for the first time.

The strongest intelligence may not only find answers faster.

It may decide again:

> **In which space should the answer be sought?**

## We may need a translator between humans and AI

If humans and machines eventually form different ontologies, interpretability cannot mean only attaching a human label to an internal state.

We may need a bidirectional conceptual translation layer:

> human intention ↔ translation layer ↔ machine ontology

In one direction, it would turn a human question into a form that the machine can naturally represent and search. In the other, it would return a machine discovery to a conceptual space where people can inspect, debate, and act on it.

The hard question is not simply whether translation is possible. It is:

> **What should a translation preserve?**

A mapping may preserve prediction but not explanation, correlation but not intervention, or short-term action but not long-term value.

A good translation cannot require only that two concepts sound similar.

It should preserve their operational relations as far as possible.

If changing a machine concept produces a particular consequence, then after translating that concept into the human conceptual space, a corresponding change should produce a similar result.

Translation must preserve more than names. It must preserve structure.

Work on causal abstraction has begun to formalize related questions. Whether a high-level description is faithful to a lower-level mechanism should not be judged only by label similarity. It should also be tested through the intervention relations that remain intact. [4]

Different translations may serve different purposes.

One may be appropriate for scientific prediction, another for safety control. One may transfer a strategy between two systems without being able to explain the reason to a person.

A reliable translation must tell us explicitly:

> What did it preserve, and what did it lose?

## Understanding may require us to become bilingual

Even if a machine concept can be converted into one clear human sentence, that does not mean we understand it.

Understanding a concept usually means more than knowing which word corresponds to it.

We need to know when it applies, which concepts are nearby, what happens when it changes, where it fails, and what new predictions it makes possible.

Conceptual change in the history of science provides a closer analogy.

The difference between two theories is often not merely that they use different words. A new theory can reorganize which questions matter, which classifications feel natural, and which observations count as evidence. [5]

Human understanding of a machine-native concept may therefore not end when the model generates a plain explanation.

We may have to learn how to use the concept.

We would judge new examples with it, manipulate it in experiments, use it to predict structures we previously could not see, and gradually acquire a limited but operational bilingualism.

The translator itself could become a new kind of intelligent system.

Its primary task would not be solving one domain problem directly. It would search for shared structure across ontologies, propose experiments that distinguish competing explanations, expose translation loss, and help humans form new intermediate concepts.

These concepts would belong neither entirely to existing human language nor directly reproduce a machine's internal structure.

They would be **bridge concepts**.

Mathematical notation is not natural language, yet it lets people who speak different languages share a proof. Humans and machines may eventually construct a similar common layer of abstraction.

## Will multiple intelligences diverge or converge?

If tasks, training signals, and forms of interaction shape representation, a larger question follows:

> **Will different kinds of intelligence eventually form different ontologies?**

Divergence is easy to imagine.

A mathematical intelligence works with theorems, proofs, and symbolic structures. A biological intelligence works with experiments, molecular interactions, and causal interventions. An embodied intelligence lives with continuous control, noisy perception, and physical feedback.

They optimize different objectives and possess different sensors, memories, time scales, and action spaces. There is no reason to assume that they will divide the world through the same basic concepts.

A machine trained alongside a theorem prover may develop internal objects suited to proof search. A system that operates laboratory equipment for years may form entirely different state variables and causal decompositions.

Multi-agent research has already shown that agents can develop communication protocols that are effective for a task without becoming naturally interpretable or compositional for humans. [6]

At the same time, there is an opposing force:

> **Convergence imposed by a shared reality.**

If two systems try to predict the same physical world, cell, or society, both must answer to some stable structures.

They may not use the same primitives, yet they may meet at invariants such as symmetries, conservation laws, causal structures, or reproducible experiments.

The future may therefore contain neither one universal ontology nor entirely private worlds that cannot communicate.

A more plausible pattern is:

> **Highly divergent low-level representations, with partial convergence at higher-level regularities.**

Different intelligences may divide the world differently while still aligning around some stable structure.

The future may not converge into one unified supermind.

Instead, several cognitive systems may continue to diverge along different tasks, bodies, environments, and time scales. Mathematical intelligences, biological intelligences, embodied intelligences, and scientific agents may each develop abstractions and ontologies fitted to their own problems.

Their difference will not be only a matter of which one is stronger.

They may resemble different cognitive species, distinguished by what counts as an object, which regularities are easy to discover, which explanations feel natural, and which questions are worth asking at all.

> **That would be something new: not one superintelligence, but a plural ecology of intelligence.**

This also pushes interpretability toward a harder problem.

If the future contains several heterogeneous cognitive ontologies, we will no longer be trying only to understand one neuron or one local feature inside one model.

The real question will be:

> **How do we understand an intelligence that does not divide the world as humans do?**

The answer may not be to force every machine representation back into our existing concepts.

We may first need to discover the basic objects, relations, invariants, and natural scales that remain stable inside the other system. Only then can we decide which parts map onto human concepts and which parts require us to learn something new.

The hardest task of future interpretability may not be making machines resemble programs that can be read line by line.

It may be:

> **Teaching us to understand a cognitive structure unlike our own.**

Perhaps the black box was never without a language.

Perhaps it speaks one we have not yet learned to read.

## References

- [1] [Bommasani et al., *On the Opportunities and Risks of Foundation Models* (2021)](https://arxiv.org/abs/2108.07258)
- [2] [Felleisen, *On the Expressive Power of Programming Languages* (1991)](https://www.sciencedirect.com/science/article/pii/016764239190036W)
- [3] [Rissanen, *Modeling by Shortest Data Description* (1978)](https://www.sciencedirect.com/science/article/pii/0005109878900055)
- [4] [Geiger et al., *Causal Abstraction for Faithful Model Interpretation* (2023)](https://arxiv.org/abs/2301.04709)
- [5] [Kuhn, *The Structure of Scientific Revolutions* (1962)](https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html)
- [6] [Kottur et al., *Natural Language Does Not Emerge Naturally in Multi-Agent Dialog* (2017)](https://aclanthology.org/D17-1321/)
