# Advent of Code 2019!

Hi, this is the first post in a series that will be devoted to [Advent of Code
2019](https://adventofcode.com/). This is my first time doing this competition/
challenge, and I will be trying to use a different programming language every
single day. The way you see this post layed out will roughly be how I try to
make it each day leading up to Christmas day.

Enjoy!

# Today's Language - J

The language I used today was [J](https://www.jsoftware.com/#/) created in the
early 1990s by Kenneth Iverson and Roger Hui. The language takes after
[APL](https://en.m.wikipedia.org/wiki/APL_(programming_language)) (also by
Iverson), [FP](https://en.m.wikipedia.org/wiki/FP_(programming_language)), and
[FL](https://en.m.wikipedia.org/wiki/FL_(programming_language)).

J is a dynamically typed array programming language. It is a functional language
with support of [function-level
programming](https://en.m.wikipedia.org/wiki/Function-level_programming) through
[tacit programming](https://en.m.wikipedia.org/wiki/Tacit_programming) features.
J excels at solving and representing mathematical problems. Luckily today's
problem was very mathematical in nature.

## My Experience

My experience with J up to this point is not particularly significant. I had
used this language a few times to solve some coding golf problems as the syntax
is very terse.

# Issues

Solving numerical problems in J is actually quite fun and arguably intuitive.
That is, once you, can grok it's unusual syntax by today's standards. The
biggest issue that I ran into was learning how to do file input and output. I
had only ever used this language for code golf problems so the need for any sort
of I/O at all was far and few between.

However, once I had the input read into an array, composing a solution to the
problem was very easy.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/1).

# Solution

## Part 1

```j
d =. > 0 ". each cutopen toJ 1!:1 < 'input-1'
echo +/<.(d%3)-2
```

### Breakdown

I will spend some extra time breaking down since the average reader probably has
never seen (or even heard of) J.

`d =. > 0 ". each cutopen toJ 1!:1 < 'input-1'`

All this line is doing is reading in the file `input-1`, converting each line
into numbers, and putting them into an array. Further breakdown:

1. `1!:1 < 'input-1'`
    - Foreign function call to read in file
2. `toJ`
    - A monad that converts all line endings to LF
3. `cutopen`
    - A monad that takes a string with N lines and converts it into an N
      cell boxed list (you can think of boxes as just cells or memory addresses)
      where each box contains a line of the input
4. `each`
    - A dyad which applies the left hand side to "each" of the element of
      the right hand side
5. `a ". b`
    - A dyad which converts b from a string to a number. If it is a
      malformed number, a is used instead.
6. `>`
    - A monad that "unboxes" its operand

All of that is essentially just prepping the input file contents to be a list of
integers for use **phew**. Now you see why that was the hardest part I had to
deal with. The second line is easier, I promise.

`echo +/<.(d%3)-2`

This one is much easier to read inside out. Lets start here:

`(d%3)`

`%` is division in J. This is because `/` serves a different purpose in this
language as we will see later. So, as a dyad, % takes the left hand side
and divides it by the right hand side. In our case, this is an array divided by
an integer. In J, this means that each element in the array will be divided by
that integer. Good so far? Lets build out a bit more:

`<.(d%3)`

`<.` is a monad that takes the floor of its operand. Simple enough. Since
its operand is an array, it does the operation on each element in the array.

`<.(d%3)-2`

This one is a little more self explanatory. `-` is the subtraction operation. So
as a dyad here, it subtracts the right hand side from the left hand side.
Also, like division, if the left hand side is an array, it will subtract from
each element in the array. Note here that `<.` takes precedence over the `-2`.

`+/<.(d%3)-2`

Here's where things get a little interesting. You can think of `/` almost like a
"reduce" operation of sorts from other functional programming languages. In J,
it is called "insert". What it does is it takes a dyad and inserts it "in
between" each of the elements of the right hand side. This is easier to see with
and example:

`+ / 1 2 3 4 5 6 7 8 9`

is equivalent to

`1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9`

So all this is doing is taking a sum.

All of this culminates in the call to `echo` which just dumps the result to
standard out. On to part 2.

## Part 2

```j
d =. > 0 ". each cutopen toJ 1!:1 < 'input-1'
cfb =: -&2@:<.@:(%&3)
cf =: 3 : 'if. (cfb y) <: 0 do. 0 elseif. 1 do. (cfb y) + (cf (cfb y)) end.'
echo +/ cf"0 d
```

Alright, a lot more to unpack here. The first line is the same as above.

`cfb` is essentially what we did in the first part, but turned into a function.
Let me explain a few parts that may be confusing:

1. `%&3`
    - The `&` is the bond conjunction. It makes a monad out of dyad. In this
      case it is making the dyad `%` into a monad that divides its operand by 3.
    - With this you can understand what `-&2` is doing.
2. `u @: v y`
    - The `@:` it the at conjunction. It makes the composition of the verbs `u`
      and `v`
    - Think of it in terms of functions like this: u(v(y))

So with these two conjunctions, I created a function that:

1. Divides the operand by 3 `%&3`
2. Takes the floor `<.`
3. Subtracts 2 from it `-&2`

All chained together using `@:`.

The next line might be more understandable for those of you who are used to more
"normal" programming languages (of the imperative/OO variety).

What it essentially breaks down to is a recursive function that has two
branches:

1. `if. (cfb y) <: 0 do. 0`
    - If the resulting fuel level is less than zero, return 0
2. `elseif. 1 do. (cfb y) + (cf (cfb y)) end.`
    - Otherwise, return the fuel as well as the recursive call to what the fuel
      requires as fuel.

The last line just applies the recursive function to each element of the input
and then adds them all together.

# Conclusion

I don't anticipate to break down the solutions as much as I did today in the
future, I just thought it was important to otherwise it would be hard to
understand.

J did very well to solve this problem. Unfortunately, J doesn't lend itself to
particularly "readable" programs. It certainly didn't help that I tried to make
the solution very short as well. However, I think learning a J-like language has
some benefits through encouraging a certain kind of "bigger picture" thought
process and results in composing code in ways you might not in other
imperative/object oriented languages. Will I reach for J to solve most of my
programming problems? No. But programming in J helps train a thought process of
taking problem and distilling them down to their smallest logic components.
