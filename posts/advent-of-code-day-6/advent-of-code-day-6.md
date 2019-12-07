# Today's Language - Haskell

The language I used today was [Haskell](https://www.haskell.org/) created in
1990 by Lennart Augustsson, Dave Barton, and many others. Haskell was influenced
by [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)),
[Standard ML](https://en.wikipedia.org/wiki/Standard_ML),
[Clean](https://en.wikipedia.org/wiki/Clean_(programming_language)), and others.

Haskell is a statically typed, purely functional language. The language if
fully type inferenced and lazily evaluated.
primarily object oriented in paradigm, but has support for others such as
functional programming. The aim used to be for Dart to take over Javascript as
a web language. It even had its own dedicated VM for Chrome at one point.
But the language has found new life in being the primary language for the
[Flutter](https://flutter.dev/) framework, a new rendition of "write once,
deploy everywhere". Jam packed with lots of cool features like reified generics,
mixins, and all your usual object oriented goodies, Dart is a language I think
a lot of today's developers would have no problem getting used to using.

## My Experience

I have only use Haskell a little bit before. I have used Elm a good deal though
which has a lot of its syntax and semantics borrowed from Haskell.

# Issues

I am still not very comfortable with these purely functional languages, but it
gets easier every time I use them. It was pretty doable after a little warming
up with the language.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/6).

# Solution

## Part 1

```haskell
import qualified Data.Map as Map
import qualified Data.Set as Set

swap :: (a, a) -> (a, a)
swap (a, b) = (b, a)

splitOn :: Char -> String -> (String, String)
splitOn delim = fmap (drop 1) . break (delim ==)

numOrbiters :: Map.Map String String -> String -> Int
numOrbiters orbits name =
  case (Map.lookup name orbits) of
    Just next -> 1 + (numOrbiters orbits next)
    Nothing -> 0

flattenTupleList :: [(a, a)] -> [a]
flattenTupleList list = concatMap (\(a,b) -> [a,b]) list

main = do
  x <- readFile "input"
  let splitElements = map (splitOn ')') (lines x)
  let orbits = Map.fromList (map swap splitElements)
  let objects = Set.fromList (flattenTupleList splitElements)
  print (sum (map (numOrbiters orbits) (Set.toList objects)))
```

### Breakdown

My first instinct about this problem was to construct a graph/tree and walk the
nodes from top to bottom counting recursively from the root. That would have
worked fine, but constructing that tree from the input wasn't something I was
immediately comfortable with, so I tried a different approach.

Instead, I created a mapping of children to their parents pointing back to the
root. With that, I walked from each node back to the root and added up the sum
of those counts to get the number of direct and indirect orbits. Haskell was a
great language to model this sort of algorithm in and resulted in pretty terse
code.

## Part 2

```haskell
import qualified Data.Map as Map
import qualified Data.Set as Set

swap :: (a, a) -> (a, a)
swap (a, b) = (b, a)

splitOn :: Char -> String -> (String, String)
splitOn delim = fmap (drop 1) . break (delim ==)

numOrbitUntil :: Map.Map String String -> String -> String -> Int
numOrbitUntil orbits ancestor name
  | ancestor == name = 0
  | otherwise = case (Map.lookup name orbits) of
      Just parent -> 1 + numOrbitUntil orbits ancestor parent
      Nothing -> 0

ancestry :: Map.Map String String -> String -> [String]
ancestry orbits name =
  case (Map.lookup name orbits) of
    Just parent -> name : (ancestry orbits parent)
    Nothing -> [name]

isIn :: Eq a => [a] -> a -> Bool
isIn [] _ = False
isIn (x:xs) y
  | x == y = True
  | otherwise = isIn xs y

commonAncestor :: Map.Map String String -> String -> String -> String
commonAncestor orbits a b =
  head (filter (isIn (orbitAncestry b)) (orbitAncestry a))
  where orbitAncestry = ancestry orbits

main = do
  x <- readFile "input"
  let splitElements = map (splitOn ')') (lines x)
  let orbits = Map.fromList (map swap splitElements)
  let ca = (commonAncestor orbits "YOU" "SAN")
  print ((numOrbitUntil orbits ca "YOU")
    - 1
    + (numOrbitUntil orbits ca "SAN")
    - 1)
```

### Breakdown

This second part used a similar approach to the first part. However, this time,
instead of walking to the root, I walked to a common ancestor between "SAN" and
"YOU". By finding the number of steps to that common ancestor for both of those
nodes, I could add them together (-2 to adjust for an additional hop each) to
get the number of hops to get to each other.

# Conclusion

I learned a lot more about Haskell today than I had before. I am appreciating
the language more every chance that I get to use it. What I really liked about
it when writing recursive algorithms like the one today is how easy the language
makes expressing them. I think one of the harder bits was to get over some of
the syntactical bits like how function types are declared. The error messages
are also a little bit difficult for a newcomer, but after using it for a little
bit, it definitely gets easier. I hope to get to use this language more in the
future because it was pretty fun trying to change my thinking into a purely
functional mindset.
