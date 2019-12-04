# Today's Language - Nim

The language I used today was [Nim](https://nim-lang.org/)
created in 2008 by Andreas Rumpf. Nim was influenced by
[Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)),
[Python](https://www.python.org/),
[C++](https://en.wikipedia.org/wiki/C%2B%2B), and more.

Nim is a statically typed, multi-paradigm language. It aims to be a general
purpose systems level language with both functional and object oriented
features. Nim is compiled and has support for algebraic datatypes and
metaprogramming via a macro system. Lots of cool features packed in this
language.

## My Experience

I have never used Nim, only heard of it.

# Issues

I didn't run into any problems with the language itself today (in fact, I quite
liked it and hope to use it more for some project in the future). I think I had
a harder time with the problem today, and I am still a little unhappy with my
solution.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/3).

# Solution

## Part 1

```nim
import strutils
import streams
import sequtils

type Point = tuple[x, y: int]
type Line = tuple[startPoint, endPoint: Point]

proc calcEndPoint(startPoint: Point, move: string): Point =
  var endPoint : Point = (startPoint.x, startPoint.y)
  case move[0]:
    of 'U':
      endPoint.y += parseInt(move[1..^1])
    of 'D':
      endPoint.y -= parseInt(move[1..^1])
    of 'L':
      endPoint.x -= parseInt(move[1..^1])
    of 'R':
      endPoint.x += parseInt(move[1..^1])
    else: discard
  result = endPoint

proc createLine(startPoint: Point, move: string): Line =
  result = (startPoint, calcEndPoint(startPoint, move))

proc getLines(moves: seq[string]): seq[Line] =
  var lines: seq[Line]
  var prevPoint: Point = (0, 0)
  for move in moves:
    let newPoint = createLine(prevPoint, move)
    lines.add(newPoint)
    prevPoint = newPoint.endPoint
  result = lines

proc horizontal(a: Line): bool =
  result = a.startPoint.x != a.endPoint.x

proc parallel(a: Line, b: Line): bool =
  result = (horizontal(a) and horizontal(b)) or
    (not horizontal(a) and not horizontal(b))

proc isInBetween(a: int, b: int, c: int): bool =
  result = (a <= b and a >= c) or (a <= c and a >= b)

proc findIntersections(line1: seq[Line], line2: seq[Line]): seq[Point] =
  var intersections: seq[Point]
  for sub1 in line1:
    for sub2 in line2:
      if parallel(sub1, sub2):
        continue
      if horizontal(sub1) and
          isInBetween(sub1.startPoint.y, sub2.startPoint.y, sub2.endPoint.y) and
          isInBetween(sub2.startPoint.x, sub1.startPoint.x, sub1.endPoint.x):
        if sub2.startPoint.x != 0 and sub1.startPoint.y != 0:
          intersections.add((sub2.startPoint.x, sub1.startPoint.y))
      elif not horizontal(sub1) and
         isInBetween(sub1.startPoint.x, sub2.startPoint.x, sub2.endPoint.x) and
         isInBetween(sub2.startPoint.y, sub1.startPoint.y, sub1.endPoint.y):
        if sub1.startPoint.x != 0 and sub2.startPoint.y != 0:
          intersections.add((sub1.startPoint.x, sub2.startPoint.y))
  result = intersections

proc distFromOrigin(x: Point): int =
  result = abs(x.x) + abs(x.y)

var fin = newFileStream("input", fmRead)

var line = ""
if not isNil(fin):
  discard fin.readLine(line)
  let moves = line.split(",")
  let sublines1 = getLines(moves)
  discard fin.readLine(line)
  let secondMoves = line.split(",")
  let sublines2 = getLines(secondMoves)
  echo sublines1
  echo sublines2
  let intersections = findIntersections(sublines1, sublines2)
  echo intersections
  let distances = map(intersections, distFromOrigin)
  echo distances
  echo min(distances)

  fin.close()
```

### Breakdown

So, I am not too proud of this solution, but it got the job done. The algorithm
I came up with essentially constructs two lists of line segments based off of
the movements described in the input file. I then run through each segment of
the line and check if any of the movements causes an intersection with the other
line's segments. Upon encountering one, I record the segment's location. A lot
of the logic was only able to be so simple because all of the segments only
moved in the x or the y direction.

The algorithm I came up with ended with a complexity of O(N^2). I don't know if
there was a better way, but part of me is hoping that there is.

## Part 2

```nim
import strutils
import streams
import sequtils

type Point = tuple[x, y: int]
type Line = tuple[startPoint, endPoint: Point]
type IntersectionWithSteps = tuple[intersection: Point, numSteps: int]

proc calcEndPoint(startPoint: Point, move: string): Point =
  var endPoint : Point = (startPoint.x, startPoint.y)
  case move[0]:
    of 'U':
      endPoint.y += parseInt(move[1..^1])
    of 'D':
      endPoint.y -= parseInt(move[1..^1])
    of 'L':
      endPoint.x -= parseInt(move[1..^1])
    of 'R':
      endPoint.x += parseInt(move[1..^1])
    else: discard
  result = endPoint

proc createLine(startPoint: Point, move: string): Line =
  result = (startPoint, calcEndPoint(startPoint, move))

proc getLines(moves: seq[string]): seq[Line] =
  var lines: seq[Line]
  var prevPoint: Point = (0, 0)
  for move in moves:
    let newPoint = createLine(prevPoint, move)
    lines.add(newPoint)
    prevPoint = newPoint.endPoint
  result = lines

proc horizontal(a: Line): bool =
  result = a.startPoint.x != a.endPoint.x

proc parallel(a: Line, b: Line): bool =
  result = (horizontal(a) and horizontal(b)) or
    (not horizontal(a) and not horizontal(b))

proc isInBetween(a: int, b: int, c: int): bool =
  result = (a <= b and a >= c) or (a <= c and a >= b)

# We can do this because the line only travels in one direction at a time
proc distanceTraveled(l: Line): int =
  result = abs(l.startPoint.x - l.endPoint.x) + abs(l.startPoint.y - l.endPoint.y)

proc findIntersectionDistances(line1: seq[Line], line2: seq[Line]): seq[int] =
  var intersections: seq[int]
  var num1Steps = 0
  for sub1 in line1:
    num1Steps += distanceTraveled(sub1)
    var num2Steps = 0
    for sub2 in line2:
      num2Steps += distanceTraveled(sub2)
      if parallel(sub1, sub2):
        continue
      if horizontal(sub1) and
          isInBetween(sub1.startPoint.y, sub2.startPoint.y, sub2.endPoint.y) and
          isInBetween(sub2.startPoint.x, sub1.startPoint.x, sub1.endPoint.x):
        if sub2.startPoint.x != 0 and sub1.startPoint.y != 0:
          let distanceTraveled = num1Steps - distanceTraveled(sub1) +
            num2Steps - distanceTraveled(sub2) +
            abs(sub2.startPoint.x - sub1.startPoint.x) +
            abs(sub1.startPoint.y - sub2.startPoint.y)
          intersections.add(distanceTraveled)
      elif not horizontal(sub1) and
         isInBetween(sub1.startPoint.x, sub2.startPoint.x, sub2.endPoint.x) and
         isInBetween(sub2.startPoint.y, sub1.startPoint.y, sub1.endPoint.y):
        if sub1.startPoint.x != 0 and sub2.startPoint.y != 0:
          let distanceTraveled = num1Steps - distanceTraveled(sub1) +
            num2Steps - distanceTraveled(sub2) +
            abs(sub1.startPoint.x - sub2.startPoint.x) +
            abs(sub2.startPoint.y - sub1.startPoint.y)
          intersections.add(distanceTraveled)
  result = intersections

var fin = newFileStream("input", fmRead)

var line = ""
if not isNil(fin):
  discard fin.readLine(line)
  let moves = line.split(",")
  let sublines1 = getLines(moves)
  discard fin.readLine(line)
  let secondMoves = line.split(",")
  let sublines2 = getLines(secondMoves)
  echo sublines1
  echo sublines2
  let distances = findIntersectionDistances(sublines1, sublines2)
  echo distances
  echo min(distances)

  fin.close()
```

### Breakdown

In this part, I used essentially the same algorithm as the prior section. The
only thing I changed was what the algorithm was recording. Every time an
intersection is encountered, I record the sum of the distance traveled to reach
that intersection. It just took a little extra book keeping in the for loops,
but nothing too complicated.

# Conclusion

Nim today was basically on a whim. I wanted a language that was procedural or
OO in nature, and this is the one I ended up deciding to use. I actually really
like Nim's design. From my couple hours with it, I would call it a C/C++/Python
mixture with a lot of cool extra features like a sane macro system and algebraic
types (at least those were the bits that I found cool). Unfortunately, I didn't
get to use all too much of what this language had to offer today. Yet, Nim had
plenty of facilities to get this problem done. Hopefully in the future I will
get to use this language more.
