---
layout: post
title: "Toy Language Update"
modified: 2015-3-10 19:53:00
tags: [Programming, ToyLanguage]
---
## Wow it's been a while.
So, my first (and last) update on this was... 4 months ago??? Wow... Well now that it is summer time, I have more time to update this blog. The progress on the Toy Language didn't just not progress at all during all that time, I have been working on it in my spare time in between school. However, now I have more time to dedicate on it.

## Progress
During the past four months, I have been focusing most of my time mostly coming up with the lexical analyzer and the parser. However, now I am realizing that I have delved so deep into my code that I lost sight of the bigger picture. So, now I am taking a step back and re-evaluating the steps I need to take.

## VM
The first step I would like to take now is to step away from my compiler code and make a Virtual Machine. I have been doing some research on virtual machines during the past week and I have learned quite a bit. I have two basic implementations of a stack machine and a register machine. While my knowledge is imperfect, from what I can understand, these are the perks and downsides of the two systems:

### Stack Machine

Positives
- Highly portable
- Operands are implicit
- Easy to write compilers for

Negatives
- More instructions (PUSH and POP ops)
- Relatively slower than register machine
- Difficult to optimize Bytecode

### 
Register Machine

Positives
- Fewer instructions
- Easy to optimize Bytecode
- Relatively faster

Negatives
- Not as portable
- Long instructions
- Difficult to write compilers for

### What I decided to use
For the given reasons, while the register machine was very tempting, I have decided to use the stack machine due to the relative ease of creating one. There is nothing to stop me from switching to a register machine later on. But for now, for simplicity's sake, I am going to be going forward with a stack machine.

## Conclusion
So, for now, that's all. I will probably make more regular updates on the progress of the VM. As soon as the VM is done, I will be able to move forward and relook at my compiler. Hopefully, with a VM that I can understand, I will have an easier time parsing and converting the language into the necessary format.

- Ludusamo
