---
title: "When Discovery Changes the Discoverer"
slug: "when-discovery-changes-the-discoverer"
language: "en"
excerpt: "Could an AI use discoveries made during its work to revise its programs, equipment, and representations, then pass those capabilities to later tasks and other systems? This essay makes the proposal concrete."
---

I imagine an AI that gradually changes how it works. It could turn a recurring piece of reasoning into a program. For a difficult class of judgments, it could collect data and train a specialized model. When its equipment cannot resolve a question, it could rearrange its observations. After working for some time, its methods should differ substantially from those it started with.

Here, the AI includes the model doing the reasoning, the programs it calls, the records it keeps, and the equipment it can use. Changing its structure has a concrete meaning: adding or removing a module, changing the information passed between modules, revising observations, or redefining the variables in a problem. These changes should continue to affect later tasks.

I want to investigate whether the system could take on more of the work of modifying itself. It would need to use failures to justify a change, choose an implementation, check whether it helps, and decide whether to retain it. Methods already exist for writing code, training models, and controlling equipment. Deciding which kind of change is needed remains difficult.

An imagined materials experiment can make the proposal clearer.

An AI is asked to explain why the same material produces different measurements under apparently identical conditions. Initially, it receives the temperature, load, and final reading from each experiment. It fits a model using these variables, but the error remains high. Increasing the model's capacity might help. It might also make the underlying problem harder to identify.

The system needs to propose explanations that can be distinguished. The instrument might be drifting. The material might not have reached the same internal temperature. Earlier heating might still affect the present measurement. It then compares observations that could separate these explanations: measuring a reference sample again, adding a temperature measurement at another location, or recording the full heating process. Time and cost limit what it can try.

Suppose further experiments support the third explanation. The system previously described the material through its current temperature. It now includes how the material was heated. It must change the data it records, write a program for comparing heating histories, and design experiments to determine when the explanation holds.

A discovery has produced several concrete changes. The input data has changed. The analysis program has changed. The next experiment has changed. On a related task, the system can use these changes without repeating the same exploration. This is what I initially mean by turning a discovery into structure.

The most accessible step is preserving reusable computation. Repeated analysis of experimental histories could become a program. A complicated class of anomalies might warrant a trained recognizer. The system needs to specify which operations the program handles, which judgments the learned module makes, and when work returns to the general model. I discussed this arrangement in my note on [hybrid execution engines](#thought/hybrid-engines-that-learn).

There are concrete precedents. [DreamCoder, 2020](https://arxiv.org/abs/2006.08381) learns reusable abstractions from solution programs while training a network to guide subsequent search. [Tracr, 2023](https://arxiv.org/abs/2301.05062) compiles programs in a restricted language into transformers. The first concerns developing a problem-solving language from experience. The second concerns implementing specified computations in networks. Both help identify what structure could mean here.

A retained module needs to preserve its conditions of use and failure records. A program can faithfully execute a mistaken rule. A small model may recognize only familiar cases. Finite testing provides evidence for using it within some range. New anomalies should still allow it to be inspected, retrained, or retired.

Another change in the materials experiment is harder: the system has revised how it describes the problem.

When it records only current temperature, it treats some different experiments as equivalent. Including heating history allows it to distinguish them. It can then ask how long past effects persist, which operations remove them, and whether different heating histories can bring the material to the same state. The new variables change the experiments it can propose.

Humans already have concepts such as path dependence. This example does not claim an original contribution to human knowledge. It illustrates how a concept becomes useful within a system by changing comparison, prediction, or intervention. Naming a program alone does little to accomplish that. A more ambitious possibility is that a system could find distinctions we do not yet use. Subsequent experiments and independent examination of prior work would be needed to support that claim.

The change also affects old records. A measurement previously dismissed as noise may now deserve repetition. Memory therefore needs to distinguish original observations from interpretations made at the time. If the system retains only the statement that something was noise, a better concept may arrive without the evidence needed to reconsider it.

Equipment can change with the investigation too. Testing the effect of heating history might require continuous recording, synchronized sensors, or an independent instrument borrowed for comparison. This is what I mean by actively changing bodies. The body is the actual equipment available for sensing and action. Choosing and combining that equipment becomes part of solving the problem.

Sometimes a missing capability can be obtained by recombining existing equipment. The system first needs to identify the function it lacks and then compare feasible ways to obtain it. Requesting synchronized observations is more useful than inventing a tool and assuming it is available. People who collaborate with the system can offer judgment or decline participation. Their involvement cannot be managed in the same way as occupying equipment.

[Bongard, Zykov, and Lipson's 2006 experiment](https://pubmed.ncbi.nlm.nih.gov/17110570/) provides a concrete reference for body models. Their four-legged robot inferred its structure through relationships between action and sensation. After part of a leg was removed, it updated its models and generated alternative gaits. This demonstrates revising a body model from feedback. The further question here is whether a research system could identify missing equipment and decide whether obtaining it is worth the cost.

Where this experience should be kept is another decision the system could make.

Knowledge that an instrument needs to warm up should remain associated with that instrument. The need to examine process histories when comparing experiments may travel with a research task. A general program for comparing trajectories could serve many tasks. Keeping everything in one long memory obscures these differences. A successor needs to know which equipment, version, and conditions an experience concerns, beyond knowing that someone once succeeded this way.

Some knowledge can therefore remain in the environment. A different model taking over the laboratory could still read calibration records, run calibration procedures, and inspect common failures of the equipment. It need not inherit every task memory of its predecessor. RoboEarth studied sharing object models, maps, and action recipes between robots, including their compatibility with a receiving robot's hardware. It is a concrete precedent for inheriting experience across machines. [RoboEarth: A World Wide Web for Robots, 2011](https://roboearth.ethz.ch/wp-content/uploads/2011/06/Waibel2011RoboEarth.pdf)

Knowledge left in an environment can also take the form of an arrangement. A fixture holds samples in the same position each time. An interface displays heating history beside current temperature so that it is less likely to be overlooked. Two sets of control samples remain together so that a newcomer can reproduce the relevant difference. Problems solved by a predecessor have changed the conditions under which a successor works.

These forms do different things. A log tells the successor what happened. A calibration program performs part of the work. A fixture or display reduces the judgments that must be made during the task. The same experience can be preserved in several forms. The choice depends on who will take over, the cost of maintenance, and how easily the arrangement can be revised when circumstances change.

Hutchins's analysis of a cockpit illustrates this well. People, speed cards, and instrument markers jointly support memory and calculation. The placement of markers turns some numerical reading and comparison into spatial judgment. Clark and Chalmers's extended mind argument asks whether external processes that reliably participate in thinking can count as parts of cognition. These works encourage examining the model together with the environment on which it actually depends. [Hutchins, 1995](https://pages.ucsd.edu/~johnson/COGS102B/Hutchins95.pdf); [Clark and Chalmers, 1998](https://consc.net/papers/extended.html).

An AI could also finish a task by leaving exercises for the next user. Which measurement makes the difference apparent? Which counterexample is easily misclassified? Which cases remain unexplained? Passing on knowledge would then have a stronger requirement: the successor should be able to use these materials to learn the relevant judgments and recognize when an old method fails.

Ecological inheritance provides a biological analogy. Organisms alter environments, and their descendants live under conditions affected by those changes. Odling-Smee and Laland discuss this relationship explicitly. The proposal here is that artificial systems could also change learning conditions for their successors. The analogy helps formulate a question; it cannot substitute for testing artificial systems. [Ecological Inheritance and Cultural Inheritance, 2012](https://lalandlab.wp.st-andrews.ac.uk/files/2015/08/Publication184.pdf)

This may be the part that interests me most. If many capabilities remain in a laboratory after its model has been replaced, we need to reconsider how much the model itself contributes. A newcomer may appear proficient because it can use methods developed through many previous failures. As more tasks are completed, the environment could accumulate better conditions for doing the work.

It could also accumulate errors that become harder to notice. Displays direct attention. Fixed procedures make alternatives easier to overlook. An equipment modification may invalidate an earlier calibration. A method should therefore be accompanied by why it was adopted, when to check it again, and what remains unresolved. Otherwise, taking over amounts to repeating it.

The capability most clearly missing from this proposal is the ability to identify what needs changing.

In the materials example, I supplied the candidate explanations. If the system never considers heating history relevant, the later programs, equipment, and experiments do not follow. A model can produce extensive self-reflection while missing the actual gap. Calling this metacognition would not explain how it works.

Possible approaches include tracking persistent unexplained error, retaining competing explanations, and arranging tests on which their predictions differ. The system could also create research branches. One checks the instrument, another changes the representation, and another examines the experimental procedure. Each records its evidence and the conditions behind its judgments. They then determine which conclusions they can accept together. Unresolved disagreements remain available for further tests.

A single intelligence could then have a more flexible working arrangement. Different models and devices could take over the same task, or work on it simultaneously in different places. Continuation depends on whether new participants can use the records, programs, and existing agreements. When equipment is temporarily unavailable, unfinished experiments and unresolved explanations can be saved for later. This concerns continuity of work. It does not establish continuity of consciousness or personhood.

A harder case involves branches using different concepts. One classifies by current states while another classifies by processes. They may not even compare results in the same units. The system would need to identify which observations each description concerns, where the descriptions are compatible, and where they conflict. Summarizing their answers would not perform that work. Whether model weights can be merged is also insufficient to settle it.

I would also like the system to examine its research habits. After repeated failures, it might notice that it usually enlarges a model before checking whether its inputs omit something. It could try a different diagnostic order and compare results on later tasks. The procedure initially written by humans for deciding how to change would itself become open to revision.

[POET, 2019](https://arxiv.org/abs/1901.01753) offers a related example concerning the choice of learning experiences. In simulated tasks, it jointly generates environmental challenges and solution strategies, allowing strategies developed in different environments to transfer. Extending such an approach to research questions and experimental design seems worth investigating. New questions must produce useful experience without allowing the system to evade earlier failures by repeatedly changing its criteria.

These proposals can begin as small experiments. The same base model repeatedly works on related tasks. Its task memories are retained or cleared. Separately, the environment's records, programs, and arrangements are preserved or reset. This produces four conditions. Only records from these tasks are cleared; the base model stays the same. Performance on new tasks and total cost would give an initial indication of what individual memory and environmental accumulation contribute.

A later comparison could replace the model or change equipment conditions. Inheriting earlier capabilities and recognizing expired knowledge would test the proposal more strongly than increasing speed in familiar conditions. Removing added programs, records, and arrangements individually would also help identify the source of any improvement. One success could support a particular mechanism while leaving much of the full system unresolved.

The broader possibility is an AI that can establish some of the conditions needed for its next stage of research. When an analysis method proves inadequate, it develops a different representation or computation. When that representation requires new observations, it adjusts the equipment. Tested methods and unresolved questions remain available for later tasks. How long this process can continue, and where it stops, are questions for research.

If it continues, the models, programs, and equipment involved may eventually differ considerably from the initial system. A later system could also ask questions the initial one could not formulate, and correct its work. Its inheritance should include enough evidence and practical methods to make such correction possible.

I would judge progress toward this proposal by what happens after the original model is replaced. Can its successor still use the retained capabilities, understand why they work, and improve them? At that point, a discovery has affected both the immediate solution and how research can continue with different participants and methods.

*This essay began with [Ah-miu](https://ah-miu.github.io/blog/Ah-miu/) and [Qwenputer](https://github.com/divagr18/qwenputer). It continues my notes on [hybrid engines](#thought/hybrid-engines-that-learn), [concept creation](#thought/when-machines-reinvent-their-own-concepts), and [concepts a model can think with](#thought/concepts-a-model-can-think-with). The materials experiment is an imagined example used to explain the mechanisms. The cited work provides partial precedents and evidence. The complete process proposed here remains untested.*
