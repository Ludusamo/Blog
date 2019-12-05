# Today's Language - F#

The language I used today was [F#](https://fsharp.org/) created in 2005 by
Microsoft. F# was influenced by
[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)),
[Erlang](https://www.erlang.org/), [Haskell](https://www.haskell.org/), and
others.

F# is a strong, statically typed, multi-paradigm language. It makes use of the
Common Language Infrastructure like C#. It has support for functional,
imperative, and object oriented programming methodologies. By design, functional
methodologies are more encouraged by the language. Its nice having some of the
other options.

## My Experience

I have never used F#, but have used a bunch of the languages it was inspired by.

# Issues

No issues with the language today. I have used some Haskell, Elm, and ML so the
overall syntax felt fairly familiar. Most of the trouble came with finding out
what sort of library functions were already available, but those were all a
short google search away.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/4).

# Solution

## Part 1

```fsharp
let adjIsSame (i : int) (numStr : string) : bool =
  numStr.[i] = numStr.[i + 1]

let hasTwoSameAdj numStr =
  List.reduce (fun a b -> a || b)
    [for i = 0 to ((String.length numStr) - 2) do
      yield (adjIsSame i numStr)]

let isIncreasing numStr =
  List.reduce (fun a b -> a && b)
    [for i = 0 to ((String.length numStr) - 2) do
      yield (numStr.[i] <= numStr.[i + 1])]

let isSixDigits numStr =
  String.length numStr = 6

let fitsCriteria numStr =
  isSixDigits numStr
    && isIncreasing numStr
    && hasTwoSameAdj numStr

let range = seq { 158126 .. 624574 }
printf "%A"
  (range
    |> Seq.map string
    |> Seq.map fitsCriteria
    |> Seq.filter (fun a -> a)
    |> Seq.length)
```

### Breakdown

Today's question was strangely more simple than the past few days. There is
probably an elegant number theory method for coming to the answer, but the range
was small enough to brute force. F# (functional languages in general) made the
solution today pretty elegant. For those that have never seen a ML, Haskell, etc
here are a few highlights from the solution:

1. Functions don't explicitly need paranthesis covering their arguments
    - `func(a, b)` isn't necessary, simply space separated is enough
      `func a b`
2. There are very few types in this solution because of type inference
    - A lot of languages these days have at least local type inference, but F#
      has full type inference.
3. It is easy to compose functions with `|>`
    - i.e. `list |> func1 |> func2` is like `func2(func1(list))` in other
      languages

Another thing I really like about F# is the good support for imperative
programming. Looking at `hasTwoSameAdj` and `isIncreasing` it was very easy for
me to more or less write them the way I would in say Python. And, it still
composed very well with the other functional constructs.

## Part 2

```fsharp
let splitAt f list =
  let rec splitAtAux acc list =
    match list with
      | x::y::ys when f x y -> List.rev (x::acc), y::ys
      | x::xs -> splitAtAux (x::acc) xs
      | [] -> (List.rev acc), []
  splitAtAux [] list

let foldUntilEmpty f list =
  let rec foldUntilEmptyAux acc list =
    match f list with
      | l, [] -> l::acc |> List.rev
      | l, rest -> foldUntilEmptyAux (l::acc) rest
  foldUntilEmptyAux [] list

let splitAtEvery f list = foldUntilEmpty (splitAt f) list

let hasTwoSameAdj numStr =
  (splitAtEvery (<>) (Seq.toList numStr))
    |> List.map List.length
    |> List.exists (fun l -> l = 2)

let isIncreasing numStr =
  List.reduce (fun a b -> a && b)
    [for i = 0 to ((String.length numStr) - 2) do
      yield (numStr.[i] <= numStr.[i + 1])]

let isSixDigits numStr =
  String.length numStr = 6

let fitsCriteria numStr =
  isSixDigits numStr
    && isIncreasing numStr
    && hasTwoSameAdj numStr

let range = seq { 158126 .. 624574 }
printf "%A"
  (range
    |> Seq.map string
    |> Seq.map fitsCriteria
    |> Seq.filter (fun a -> a)
    |> Seq.length)
```

### Breakdown

In this part, not much really changed. I just had to change one of my criteria:
`hasTwoSameAdj`. In order to solve this section, I had to employ a little more
work/had to get a little bit out of my comfort zone to do something a little
more idiomatic in F#. In particular, I wrote a set of functions to produce
groupings of same consecutive numbers (`splitAtEvery`). This made it easy to
find if there were groups of two of them to match the criteria.

Looking back, this would have made for a more elegant part 1 too.

# Conclusion

I would describe F# as a gateway drug to Haskell/ML. I think F# gives you a lot
of the cool functional features of those languages as well as features like
pattern matching, constructs for lazy evaluation, and others. At the same time,
it was nice to be able to use some imperative constructs when I wanted to today.
Though the language doesn't exactly encourage them, they are there and, if used
in localized scopes, they play very nicely with the functional bits as well.
