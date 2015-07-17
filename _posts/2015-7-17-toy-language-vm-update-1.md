---
layout: post
title: "Toy Language: VM Update 1"
modified: 2015-7-17 9:06:00
tags: [Programming, ToyLanguage, VM]
---
## Progress
So, this is one of my updates on the progress of the VM. I think it is currently at a point that I can go forward with continuing on writing my compiler. Originally, I wrote some code that demonstrated how my language would look. This was the code:

{% highlight html linenos %}

int a = 10
int b = 10
if (a == b)
	print("hi")

{% endhighlight %}

My original thought was, if I could get my compiler and programming language to do at least that, then I could expand from there. In fact, my VM should be able to handle much more than that. It has branching and can make calls to functions as well. 

There are no object oriented code structures yet and there are also no support for arrays. I will deal with those in the future. For now, everything will also compile down to my VM's bytecode.

At this point, I will probably begin to work on my compiler. I will most likely be implementing a recursive descent parser to handle the parsing of my language.

For now, that is all because I got to go to work soon. Further updates will be made in the future.

- Ludusamo
