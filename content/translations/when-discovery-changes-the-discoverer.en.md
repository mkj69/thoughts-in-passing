---
title: "Choosing a Body and Keeping Knowledge in the Environment"
slug: "when-discovery-changes-the-discoverer"
language: "en"
excerpt: "An AI chooses and combines equipment for a task. The equipment and its environment retain experience, so another AI can take over both the capabilities and what previous users learned about them."
---

I want to explore two connected ideas. An AI could actively choose and combine the equipment it uses for a task. When the task ends, some of its experience could remain with that equipment and its environment, available to the next user.

The first idea concerns how an AI acquires capabilities. The second concerns how experience accumulates. Together, they suggest a way of working worth studying. An AI arrives with a task, takes over local equipment and knowledge, adjusts the combination as needed, and leaves useful experience behind when it finishes.

By actively changing bodies, I mean changing the equipment actually available for sensing and action. A body could consist of a camera and speaker. It could also include a mobile robot, a manipulator, and several dispersed sensors. The model, task records, and objective could continue while the equipment changes.

For example, an AI is asked to locate an intermittent noise in a room. Initially, it has access only to a camera in the corner. The video cannot answer the question. It needs to identify the missing observation and look for equipment that can provide it. Suppose a microphone is available. The system could connect it and establish when the noise occurs. If the source remains uncertain, it could request a mobile device with a microphone and compare recordings near several possible locations.

During this task, the AI must decide what body it needs next. The fixed camera may sometimes be sufficient. At other times, it needs hearing and movement. Once the mobile device is available, it must check whether sound and position records correspond, which places the device can reach, and which operations are no longer available. These changes must enter its assessment of its own capabilities.

All of this could be implemented through tool interfaces. The additional requirement in this proposal is that the system adjusts the combination of available capabilities according to the task. It needs to justify an adjustment, compare its cost, and check whether the resulting combination supports the intended observation or action. Saying that a microphone is needed does not establish whether one exists, can be connected, or will work well after connection.

Choosing a body also includes deciding to keep the current one. Connecting and calibrating a mobile device may take considerable time, while an existing recording already rules out an explanation. The system should be able to judge whether another capability is worth obtaining. Otherwise, changing bodies could become an endless accumulation of equipment.

Phantom capability errors suggest another opportunity. If a system mistakenly assumes that it has a device, the attempted operation cannot proceed. The need behind the error is still worth examining. What was the system trying to observe or change? Recasting an imagined capability as an explicit requirement creates a chance to seek alternatives. Whether the system can identify that requirement accurately is an experimental question.

[Bongard, Zykov, and Lipson's 2006 study](https://pubmed.ncbi.nlm.nih.gov/17110570/) provides a reference for body models. Their four-legged robot inferred its structure through relationships between action and sensation. After part of a leg was removed, it updated its models and generated alternative gaits. This illustrates revising an understanding of the body through feedback. The further question here is whether a system can actively seek and connect another set of sensing and action capabilities for a task.

The other half of the proposal concerns what happens when it takes over that equipment. Could it also inherit experience accumulated through earlier use?

In the same room, previous users might have discovered that a microphone introduces a delay, that recordings near a window often include wind, or that the mobile device produces noise of its own in a particular position. If these observations remain only in the previous AI's private task records, a newcomer may have to learn them again. Even with identical interfaces, familiarity with equipment makes a difference.

I would like some knowledge to remain associated with devices and places. A microphone's delay record belongs with that microphone. A synchronization method belongs with the combination of devices for which it works. Locations prone to interference belong in the room's records. The data could be stored locally or remotely. Keeping knowledge in the environment means that people or AIs taking over these objects can find and use it without acquiring every memory of the previous AI.

This knowledge could take at least three forms. The most direct is a record: where an operation failed, under which conditions a measurement was reliable, and when it was last checked. Another is a runnable method, such as a calibration routine or synchronization procedure. Some knowledge also takes the form of an arrangement: marked measurement locations, a mount that makes sensor placement repeatable, or an interface that compares a device's own noise with external sound.

These forms serve different purposes. Records provide grounds for judgment. Programs carry out operations. Mounts and interfaces reduce the problems that must be worked out on site. A system can benefit without reasoning through its predecessors' entire experience. It also needs access to why these arrangements exist, so that it can revise them when conditions change.

[RoboEarth, 2011](https://roboearth.ethz.ch/wp-content/uploads/2011/06/Waibel2011RoboEarth.pdf) studied sharing object models, environmental maps, and action recipes between robots. It also addressed whether a receiving robot has the hardware needed to use that knowledge. This is an important precedent. The further question here is how shared knowledge could inform equipment selection. When choosing devices, a system could also examine their accumulated experience of use.

Two sets of equipment with similar specifications could then have different value. One is newly connected and requires exploration. Another has dependable calibration, established procedures, and clear failure records. In choosing a body, the system would consider both hardware capabilities and the tested practices it can inherit. Experience associated with equipment would influence later equipment choices.

After completing a task, the AI could write newly confirmed delays, a failed calibration, or a useful measurement location back to the relevant device or place. Judgments specific to the task would remain in its task records. Experience useful to other users would remain in the environment. Deciding what to leave and how to state its conditions of use would itself require judgment.

What interests me most is that this accumulation could survive a model replacement. The next visitor might use another model or have no experience of the task. If it can understand the interfaces and retained knowledge, it has a chance to avoid some earlier mistakes. The time a model has spent working and the time a collection of equipment has been used could represent two different learning histories.

This also applies when different AIs use the same body in succession. The equipment needs to retain its actual state: what the previous user changed, which programs are still running, and which calibrations are no longer valid. Another possibility is one AI using equipment in two places at once. Every observation and action must then be associated with the appropriate place. Otherwise, conditions from one room could be misapplied to another.

More environmental knowledge is not always better. Moving a microphone may invalidate an interference record. Repairs may change a device's delay. Inheriting experience should include checking its applicability. The system needs to distinguish a currently usable method from an older record that offers guidance but requires another trial.

Research on human cognition provides concrete examples of external arrangements participating in thought. Hutchins examined how people, speed cards, and instrument markers jointly support memory and calculation in a cockpit. Some marker arrangements turn reading and comparing numbers into spatial judgments. Clark and Chalmers's extended mind argument asks whether external processes that reliably participate in thought can count as parts of cognition. These studies suggest examining an AI's capabilities together with the equipment and environment on which it actually depends. [Hutchins, 1995](https://pages.ucsd.edu/~johnson/COGS102B/Hutchins95.pdf); [Clark and Chalmers, 1998](https://consc.net/papers/extended.html).

Extended further, an AI could deliberately improve the conditions for the next handover. It might make an important measurement easy to repeat, preserve confusing recordings for comparison, or leave a set of unexplained anomalies. The next user could begin learning from these materials and check earlier judgments again.

Ecological inheritance offers a biological analogy. Organisms alter environments, and their descendants encounter conditions affected by those changes. Odling-Smee and Laland discuss this relationship explicitly. The proposal here is that artificial systems could also change the learning and working conditions of their successors. The analogy helps formulate a question. Its effects would still need to be tested in artificial systems. [Ecological Inheritance and Cultural Inheritance, 2012](https://lalandlab.wp.st-andrews.ac.uk/files/2015/08/Publication184.pdf)

The future that interests me is one in which an AI need not carry a fixed collection of devices or independently retain every experience of using them. It could work in different places, take over local capabilities and methods, and recombine them for the task. The AIs using the equipment could keep changing while the equipment and environment retain a longer history of experience.

This would not make every device available on demand. Resources, permissions, costs, and other users' plans determine the actual choices. A person can help obtain an observation or decline to participate. Human involvement remains a collaborative relationship. Organizing capabilities does not imply ownership of those who provide them.

The idea could first be tested in software simulation. Several rooms would have different tool combinations, delays, and failure patterns. The same base model would perform a series of tasks. Compare predetermined equipment with permission to adjust it, and preserved environmental experience with experience cleared between uses. These four combinations could help distinguish gains from equipment selection and gains from retained knowledge.

Then clear the model's task memories and let another model take over. Measure how much capability it recovers and how much exploration it needs. Change some equipment conditions and check whether it recognizes that earlier experience no longer applies. Alongside task success, account for finding equipment, calibration, and maintaining records. A system that carries its memories between environments should also be included as a comparison, to establish the practical value of leaving knowledge in place.

The result I hope to see is concrete. A newly arrived AI finds a suitable equipment combination, uses local experience to begin working, and revises that experience when it discovers a change. After it leaves, the next user can still benefit. Active body selection and environmental knowledge meet in that handover.

*This essay began with [Ah-miu](https://ah-miu.github.io/blog/Ah-miu/), an exploration of combining capabilities across devices. The intermittent noise in the room is an imagined task used to explain the proposal. The cited work provides relevant precedents. The full process described here, combining active equipment selection with lasting accumulation of environmental experience, remains a research proposal to be tested.*
