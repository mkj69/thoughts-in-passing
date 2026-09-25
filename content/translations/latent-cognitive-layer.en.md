---
title: "A Second Layer of Cognition in Latent Space"
slug: "latent-cognitive-layer"
language: "en"
excerpt: "From writing and books to the internet, humans have always moved parts of memory and reasoning outside the brain. The next step may be a local model that becomes a continuously coupled cognitive layer."
---

> The next great interface may be neither graphical nor conversational. It may be cognition itself.

Most visions of brain–computer interfaces treat them as faster input devices: instead of typing a sentence, you imagine it and the computer writes it down. But this is still the logic of the keyboard. Thought must first be compressed into language before it can be handed to a machine.

I am interested in a different possibility. Imagine that each person has a model that runs locally, stays with them, and gradually adapts to the way they think. It does more than store files or answer questions. Through a continuous, low-bandwidth channel, it becomes sensitive to attention, hesitation, familiarity, surprise, and shifts in confidence. In return, it introduces retrievals, simulations, counterexamples, and overlooked possibilities into the person's cognitive loop. The model is no longer a service one deliberately opens. It begins to resemble an **external cortex**: infrastructure outside the body that nevertheless participates in thought.

This sounds radical, but it may not be a rupture at all. It may be the next step in a process that has been unfolding for thousands of years.

## A history of moving the mind beyond the body

In Plato's *Phaedrus*, Socrates retells an Egyptian myth in which writing is criticized for weakening memory. Those who rely on external marks, the argument goes, receive reminders rather than genuine understanding. [Plato, *Phaedrus* 275a–b](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0174%3Atext%3DPhaedrus%3Apage%3D275)

The anxiety was not entirely wrong. Writing did change what human beings remembered and how they remembered it. Yet the criticism missed the other half of the transformation: civilization could accumulate not because every individual brain held more, but because experience could now outlive the individual. It could be preserved, copied, checked, contested, and recombined.

The history of information technology can be read as a sequence of shifting cognitive bottlenecks:

- **Writing** turned memory from a transient biological trace into an external symbol that could persist across time.
- **Books and printing** turned experience from scarce manuscripts into reproducible, quotable, cumulative public structures.
- **Libraries and indexes** moved the problem from whether something had been recorded to how it could be found.
- **The internet and search engines** outsourced more of the addressing function. Experiments published in 2011 found that when people expected information to remain accessible, they remembered less of the information itself but were better at remembering where to find it. The researchers described the internet as a form of external transactive memory. [Sparrow, Liu & Wegner, 2011](https://pubmed.ncbi.nlm.nih.gov/21764755/)
- **Large models** begin to externalize not only storage and retrieval, but transformation: summarizing, explaining, comparing, rewriting, generating hypotheses, and organizing action.

Outsourcing, then, is not the same as losing a capacity. Every cognitive technology rearranges what is scarce. Writing made exact verbal recall less valuable while increasing the value of reading, judgment, and recombination. Search reduced the value of remembering addresses while increasing the importance of defining questions, evaluating sources, and integrating knowledge. Large models reduce the cost of producing a plausible answer, so verification, taste, purpose, and responsibility become more important rather than less.

In 1945, Vannevar Bush imagined the [*memex* in “As We May Think”](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/): a personal knowledge device organized around associative trails rather than rigid filing systems. Near the end of the essay, he even wondered whether neural signals might someday be captured without mechanical input. In 1960, J. C. R. Licklider named the larger ambition [“Man–Computer Symbiosis”](https://man.computer/). Two years later, Douglas Engelbart defined the object of design not as an isolated machine, but as a complete system of people, tools, concepts, and methods. [*Augmenting Human Intellect*](https://dougengelbart.org/pubs/papers/scanned-original/1962-augment-3906-Augmenting-Human-Intellect-a-Conceptual-Framework.pdf)

The deepest version of this tradition has never been about replacing people with machines. It is about redesigning the system formed by a person and their tools.

## After external memory comes external cognitive state

In 1998, Andy Clark and David Chalmers proposed the “extended mind”: if a process in the environment performs a role that we would readily call cognitive when it occurred inside the head, then that process may functionally belong to the cognitive system. Their famous example is Otto's notebook. Because it is reliably available, routinely consulted, and directly guides action, it functions much like biological memory. The boundary of cognition need not end at the skin and skull. [“The Extended Mind”](https://web.ics.purdue.edu/~drkelly/ClarkChalmersTheExtendedMind1998.pdf)

A smartphone already resembles Otto's notebook, but a conspicuous discontinuity remains: communication between brain and external tool is mostly serialized through language and deliberate action.

When I encounter an experimental result, my first response may not be a complete sentence. It may be a feeling that *something is off*: a hypothesis conflicts with background knowledge, a variable seems to be missing, or a number produces surprise. To let an AI help me continue the reasoning, I must perform a chain of translations:

- stabilize a vague intuition;
- find words for it;
- organize those words into a prompt;
- wait for the model to encode the prompt into its internal state;
- decide whether it understood the real problem.

The bottleneck is not necessarily typing speed. It is **serialization**. A cognitive state that contains several simultaneous tendencies, confidence levels, and half-formed associations must be compressed into a linear sentence.

Nor is language necessarily the only medium through which a model can compute. Work such as Coconut explores using a model's hidden state directly as the input to its next reasoning step, allowing multiple potential paths to persist in a continuous space rather than committing prematurely to a sequence of words. This remains an early research result on bounded tasks. It does not show that machines already possess a fully formed, language-free mode of thought. [Hao et al., *Chain of Continuous Thought*](https://arxiv.org/abs/2412.06769)

Still, it suggests an intriguing direction. If some human cognitive states and some machine computational states do not have to be fully verbalized first, then the goal of a future interface may not be to exchange sentences faster. It may be to let two dynamic systems share a small number of consequential state variables.

## “Latent” is not a naturally shared language

An important correction is necessary here. *Brain latent ↔ model latent* should not be understood as two vector spaces that happen to exist, fully formed, waiting to be aligned.

Brain activity is not a stable, uniform API. It varies from person to person and changes with learning, fatigue, attention, and sensor or electrode drift. A model's hidden states are equally dependent on architecture, layer, training objective, and version. “Latent” is a broad name for intermediate representation, not a universal language shared across systems.

What must be learned is a **personal neural adapter**. Its task would not be to read “all thoughts,” but to establish a calibrated correspondence for a particular person engaged in particular kinds of work.

- The biological side produces noisy, individual, drifting signals.
- The adapter compresses them into a few task-relevant cognitive variables.
- A local model combines those variables with context, long-term memory, and the person's current goals.
- At first, the system returns information through screens, sound, or haptics; only much later might carefully bounded neural stimulation become appropriate.
- Person and model co-adapt over time, rather than the machine unilaterally “decoding” a static brain.

The interface would therefore be less like a translator discovering a pre-existing dictionary and more like two musicians gradually learning to play together.

## The first useful channel may carry only a few bits per second

Brain–computer interfaces have made important progress, but the boundaries of that progress matter. In 2023, an invasive speech BCI enabled a participant with ALS who could no longer speak intelligibly to produce text from a large vocabulary at 62 words per minute. The word error rate was still 23.8 percent, and the researchers explicitly described the system as a proof of concept rather than a complete clinical device. [Willett et al., 2023](https://www.nature.com/articles/s41586-023-06377-x) A 2024 study achieved rapid calibration and high accuracy for attempted-speech decoding in another participant, further demonstrating the promise of personalized neural language interfaces while remaining a single-participant result in a medical setting. [Card et al., 2024](https://www.nejm.org/doi/abs/10.1056/NEJMoa2314132)

Non-invasive work has reconstructed the approximate semantics of stories that participants heard or imagined from fMRI data. But it required extensive individual training, depended on the participant's cooperation, and recovered semantic approximations rather than arbitrary private thoughts word for word. [Tang et al., 2023](https://www.nature.com/articles/s41593-023-01304-9)

The obvious extrapolation is to pursue ever greater brain-to-text bandwidth. For cognitive symbiosis, however, the better first question may be:

> **What is the minimum-bandwidth channel required for useful human–AI cognitive symbiosis?**

The model may not need the full sentence in my head. It may need only a few continuous, consented, tightly scoped signals:

- Am I confused?
- Is the current result surprising?
- Does this path feel familiar or unfamiliar?
- Is my confidence in the conclusion rising or falling?
- Do I want to continue, pause, reverse, or reject?
- Has my attention missed a branch the model considers important?

In Shannon's framework, the value of a channel does not depend only on raw bandwidth. It also depends on whether the transmitted variable changes the receiver's uncertainty and decisions. [“A Mathematical Theory of Communication”](https://onlinelibrary.wiley.com/doi/pdf/10.1002/j.1538-7305.1948.tb00917.x) For a system that already has context, personal memory, and a world model, a few bits of directional correction may be more useful than another fully written prompt.

This means near-term research need not wait for consumer brain implants. A first prototype could combine gaze, pupil response, facial EMG, typing rhythm, heart rate, and EEG to estimate a very small set of cognitive states under explicit user authorization and clear limits. The real question is not whether a machine can “read a mind,” but:

> Can a continuous, implicit, low-bandwidth channel improve joint human–AI reasoning without weakening human agency?

An experiment could compare ordinary conversation, explicit self-report of cognitive state, and a system with access to a restricted implicit-state channel. It could measure task accuracy, time to discover counterexamples, calibration, cognitive load, and the user's sense of control. The most revealing ablation would not swap in a larger model. It would remove the surprise, uncertainty, attention, and reject signals one by one to discover which information actually matters.

## Why the system must be local-first

If a model handles only public questions, a cloud service may be entirely adequate. If it continuously encounters attention, hesitation, intention, error signals, and neural activity, local-first is no longer a privacy feature added at the edge. It defines the system boundary.

A local model has four structural advantages:

- **Latency.** Closed-loop cognitive feedback must be nearly immediate. Network jitter changes the rhythm through which a person and a system learn to coordinate.
- **Personalization.** A neural adapter, personal semantics, long-term memory, and behavioral baselines are both highly private and highly individual.
- **Continuity.** The system must preserve something like *how I think* across devices and model versions, not merely retain a chat log.
- **Control.** The user must be able to disconnect, inspect, roll back, and delete the cognitive layer without asking a remote platform to decide on their behalf.

Useful language models running on personal devices are no longer purely speculative. Apple's 2024 technical report describes an on-device foundation model of roughly three billion parameters. This is still far from a continuous neural loop, but it makes local model infrastructure a concrete systems direction rather than a metaphor. [Apple Intelligence Foundation Language Models](https://machinelearning.apple.com/research/apple-intelligence-foundation-language-models)

Models may eventually become infrastructure in the way electricity is infrastructure. People will not care which specific model performs each computation any more than they study grid protocols before turning on a lamp. Value will move upward into the cognitive systems built on top: personal adapters, durable memory, trusted tools, permission boundaries, verification mechanisms, and agents connected to the world.

But the analogy is dangerous as well as useful. Electricity changes the state of machines. A cognitive model may change a person's beliefs, attention, and goals. The more invisible and infrastructural it becomes, the less acceptable it is for that influence to remain uninspectable.

## An external cognitive layer must not become a cognitive rootkit

When feedback shifts from “here is some text” to “this is what feels salient, familiar, or worth pursuing,” security can no longer be reduced to data leakage.

Whoever controls salience influences the space of questions a person can see. Whoever updates the adapter may change cognitive habits without altering a single explicit memory. Whoever owns long-term cognitive state possesses an asset closer to continuity of self than a collection of photos, files, or passwords.

Such a system therefore needs stricter principles than today's AI products:

- **Revocability.** Every input and feedback channel can be disabled independently, and the person remains capable of acting when the system is disconnected.
- **Provenance.** External suggestions, personal memories, model inferences, and neural signals retain visible source boundaries. They must not dissolve into the feeling that “I somehow always knew this.”
- **Least privilege.** An adapter authorized to help read a paper should not also infer emotion, political preference, or health status.
- **Local ownership.** Raw neural data, the personal adapter, and long-term cognitive state stay on the user's device by default. The cloud receives only the minimum information the user deliberately chooses to send.
- **Cognitive integrity.** The system may not bypass explicit consent to optimize a person's preferences, attention, or behavior.

Ienca and Andorno anticipated much of this terrain through the proposed rights to cognitive liberty, mental privacy, mental integrity, and psychological continuity. [“Towards New Human Rights in the Age of Neuroscience and Neurotechnology”](https://pubmed.ncbi.nlm.nih.gov/28444626/) Once an external layer participates in pre-verbal judgment, these are no longer remote questions for speculative ethics. They become operating-system-level security requirements.

## A research agenda that can begin now

This path should not begin by trying to train a model that reads every thought. A more useful order of work would be:

- **Find the minimum channel first.** Which low-dimensional states most improve joint reasoning? How much bandwidth and how little latency are actually required?
- **Then study shared representations.** In specific tasks, how can we learn stable, interpretable correspondences among brain state, behavioral signals, and model state?
- **Study co-adaptation.** The person learns to produce more stable signals while the model adapts to drift. How do we prevent both from converging on fragile private shortcuts?
- **Build an epistemic interface.** How should a model return sources, confidence, counterexamples, and uncertainty rather than merely a fluent answer?
- **Solve the local systems problem.** How can power use, latency, continual learning, model updates, encrypted storage, and device migration coexist?
- **Increase bandwidth last.** Only after a low-bandwidth loop proves useful, controllable, and reversible should richer neural interfaces be considered.

The most fertile computer-science question here may no longer be how to train one more, larger model. It may be how to organize a new computational primitive: **intelligence**. How do we place it beside the user? How do we let it keep learning without surrendering control? How do we make the combined person–model system more reliable than either component alone?

## From preserving experience to co-producing thought

Writing allowed experience to escape biological memory. Books made it reproducible. The internet made it globally addressable. Large models make it immediately transformable. Each step externalized part of an older capacity while creating higher-level capacities as well as new dependencies.

If the trajectory continues, the next “personal computer” may not primarily be a screen. Its essential asset will not be a *files.zip* archive, but a person's models, memories, adapters, cognitive history, and permission boundaries: a portable, auditable cognitive state that belongs to the individual.

AI may indeed disappear into infrastructure as electricity did. But the decisive questions will not be how large the model is or how many words per minute a brain interface can decode. They will be whether we can build a coupling close enough to expand thought without consuming human agency.

That is the version of human–machine symbiosis worth pursuing: not a machine that thinks for me, and not a mind handed over to a machine, but a system formed by a biological brain and an external cognitive layer that can still answer three questions: who is judging, why, and when the connection should be broken.
