# Today's Language - BASIC

The language I used today was [BASIC](https://en.wikipedia.org/wiki/BASIC)
created in 1964 by John G. Kemeny and Thomas E. Kurtz. I used a dialect called
[FreeBASIC](https://en.wikipedia.org/wiki/FreeBASIC) which tries to emulate
Microsoft's QuickBASIC as closely as possible. BASIC was influenced by
[ALGOL 60](https://en.wikipedia.org/wiki/ALGOL_60),
[FORTRAN II](https://en.wikipedia.org/wiki/Fortran), and
[JOSS](https://en.wikipedia.org/wiki/JOSS).

BASIC is a statically typed procedural programming language. It has support for
object oriented programming through its user defined types. The user defined
types can have constructors, destructors, member properties and procedures,
operator overloading, etc. So plenty of OO goodies in there.

## My Experience

BASIC may have been the first programming language I have ever come in contact
with. It was around my middle school years that my uncle had bought me a book
on how to write simple video games and the game engine that it supplied on a CD
with the book used some dialect of BASIC as its scripting language. Other than
that, I have not used the language too much.

# Issues

I didn't run into too many problems today. The syntax was a little uncomfortable
at first, but I just had to learn what constructs I had. And honestly, the
syntax was a cakewalk relative to
[yesterday](https://ludusamo.com/blog/#/post/advent-of-code-day-1).

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/2).

# Solution

## Part 1

```basic
'' Read in Instructions from File
DIM numOps AS Integer = 0
REDIM in(0 To 1) AS Integer
OPEN "input-2" FOR INPUT AS #3
DO UNTIL EOF(3)
    INPUT #3, in(numOps)
    numOps += 1
    IF numOps >= UBound(in) THEN
        REDIM PRESERVE in(0 To UBound(in) * 2) AS Integer
    END IF
LOOP
CLOSE #3

'' Restore 1202 Program Alarm State
in(1) = 12
in(2) = 2

'' Main Interpreter Loop
DIM ip AS Integer = 0
WHILE (in(ip) <> 99)
    SELECT Case AS CONST in(ip)
    Case 1
        DIM op1 AS Integer = in(ip + 1)
        DIM op2 AS Integer = in(ip + 2)
        DIM dest AS Integer = in(ip + 3)
        in(dest) = in(op1) + in(op2)
        ip += 3
    Case 2
        DIM op1 AS Integer = in(ip + 1)
        DIM op2 AS Integer = in(ip + 2)
        DIM dest AS Integer = in(ip + 3)
        in(dest) = in(op1) * in(op2)
        ip += 3
    END SELECT
    ip += 1
WEND

PRINT in(0)
```

### Breakdown

Relatively self explanatory so I won't exhaust you too much here. I will just
highlight a few things that may not be obvious.

1. `OPEN "input-2" FOR INPUT AS #3`
    - Opens file "input-2" at file descriptor 3 for reading
2. `REDIM PRESERVE in(0 To UBound(in) * 2) As Integer`
    - This is resizing the array in
        * I am doubling the size (classic growing array dynamic array technique)
    - `PRESERVE` is interesting. It copies the data over from from the array
      after resizing it, otherwise all of the "cells" get initialized to a
      default value (0 in the case of `Integer`
3. The second part under "Main Interpreter Loop" is a pretty standard looking VM

Looking back, the code could be easily simplified to pull out the lines pulling
out the operands for each of the opcodes and just doing an `if` statement on
whether to do an add or a multiply. My only defense is I wrote this thinking of
how I typically write VMs which would allow it to be more extensible. But since
only two opcodes (besides halt) exist in this VM and they both take the same
operands, this definitely could have been simplified.

## Part 2

```basic
FUNCTION RUN_INTERPRETER(noun AS Integer, verb AS Integer) AS Integer
    '' Read in Instructions from File
    DIM numOps AS Integer = 0
    REDIM in(0 To 1) AS Integer
    OPEN "input-2" FOR INPUT AS #3
    DO UNTIL EOF(3)
        INPUT #3, in(numOps)
        numOps += 1
        IF numOps >= UBound(in) THEN
            REDIM PRESERVE in(0 To UBound(in) * 2) AS Integer
        END IF
    LOOP
    CLOSE #3

    '' Restore 1202 Program Alarm State
    in(1) = noun
    in(2) = verb

    '' Main Interpreter Loop
    DIM ip AS Integer = 0
    WHILE (in(ip) <> 99)
        SELECT Case AS CONST in(ip)
        Case 1
            DIM op1 AS Integer = in(ip + 1)
            DIM op2 AS Integer = in(ip + 2)
            DIM dest AS Integer = in(ip + 3)
            in(dest) = in(op1) + in(op2)
            ip += 3
        Case 2
            DIM op1 AS Integer = in(ip + 1)
            DIM op2 AS Integer = in(ip + 2)
            DIM dest AS Integer = in(ip + 3)
            in(dest) = in(op1) * in(op2)
            ip += 3
        END SELECT
        ip += 1
    WEND
    RUN_INTERPRETER = in(0)
END FUNCTION

DIM noun AS INTEGER = 0
DIM verb AS INTEGER = 0
DIM target AS INTEGER = 19690720
'' Run up one of the values to the max it can go
WHILE (RUN_INTERPRETER(noun, verb) < target)
    noun += 1
WEND

'' Slowly draw back and add to the other
WHILE (RUN_INTERPRETER(noun, verb) <> target)
    WHILE (RUN_INTERPRETER(noun, verb) > target)
        noun -= 1
    WEND
    WHILE (RUN_INTERPRETER(noun, verb) < target)
        verb += 1
    WEND
WEND

PRINT "Result:"; noun; ","; verb
PRINT 100 * noun + verb
```

### Breakdown

I essentially took the last part and parameterized the numbers that went into
slots 1 and 2. This made it really easy to rerun trials. Honestly, probably
inefficient that I am doing File I/O to re-retrieve the the opcodes over and
over again, but the input bounds are relatively small for this problem so it
wasn't too big of a deal.

The method I employed to find the pair of numbers was a relatively simple one:

1. I ran one of the numbers (noun) up until it made the result greater than the
   target number while holding the other (verb) at zero.
2. I reduced the noun value until the result was under the target number again.
3. I increased the verb value until the result was equal or greater than the
   target.
4. I repeated steps 2 and 3 until the result settled on the correct number.

This method only works since we are guaranteed that there are two numbers that
will result in the target number. There was probably a more efficient way to
achieve this such as analyzing if the increase of each of the parameters is
linear/the relationship between increasing the input parameters and creating a
system of equations out of it and solving for the parameters.

Since, it was a coding challenge, again with small input bounds, I was fine with
brute forcing it in this case.

# Conclusion

I was a bit conflicted on what language to use today. I didn't want to blow out
some of the more powerful languages I had in my arsenal too early because I knew
that the questions would only get more difficult with each passing day. But I
also didn't want to use a language that was too simple (was juggling the idea of
using BrainFuck earlier in the day) given my limited time. I think BASIC was a
good compromise in the end.

BASIC has a lot of the constructs you would expect in a procedural programming
language with plenty of OO capabilities. The syntax also should be relatively
understandable for the average programmer today (2019). However, it is lacking a
lot of constructs of a more "modern" language. The syntax is also a little bit
more verbose than it arguably needs to be for its actual expressiveness. I would
not want to use this in a larger project/have to maintain code in it. But for a
simple VM like today, it did the job just fine.
