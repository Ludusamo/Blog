# Today's Language - Haskell

The language I used today was
[BASH](https://en.wikipedia.org/wiki/Bash_(Unix_shell))
created in 1990 by Lennart Augustsson, Dave Barton, and many others. Bash was
influenced by other shells that preceded it such as the
[Bourne Shell](https://en.wikipedia.org/wiki/Bourne_shell).

Bash is a Unix shell and a
[command language](https://en.wikipedia.org/wiki/Command_language)
making it very good for orchestrating programs together. Bash is a scripting
language with weak, dynamic typing.

## My Experience

I have used Bash shell scripts pretty extensively in the past. My
[dotfile repo](https://github.com/Ludusamo/.dotfiles) makes use of shell scripts
to set up new environments and sync changes.

# Issues

There were a few problems I ran into today with using bash, but they were mostly
self imposed due to my decision to use named pipes for communication. I also had
some issues with variable passing in Bash, particularly with array passing. Bash
doesn't actually allow you to pass array "values" to functions, you can only
the expanded array/its elements. As a result, I had to employ a trick where I
expanded and unexpanded the array every time it was passed to the array.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/7).

# Solution

## Part 1

```bash
#!/bin/bash

generatePermutations() {
  local k=$1 && shift
  local A=($@)
  if [ $k -eq 1 ]
  then
    echo ${A[*]}
  else
    for (( i=0; i<$k; i++ ))
    do
      (generatePermutations $((k-1)) ${A[*]})
      A=($@)
      local tmp=${A[i]}
      A[i]=${A[k-1]}
      A[k-1]=$tmp
    done
  fi
}

phaseSignals=(0 1 2 3 4)
len=${#phaseSignals[*]}

IFS=$'\n'
for p in $(generatePermutations $len ${phaseSignals[@]})
do
  IFS=$' '
  arr=($p)
  (echo ${arr[4]}; (echo ${arr[3]}; (echo ${arr[2]}; (echo ${arr[1]}; (echo ${arr[0]}; echo 0) | ./intcode) | ./intcode) | ./intcode) | ./intcode) | ./intcode
done | sort -n | tail -1
```

### Breakdown

I used bash for this problem because it allowed me to orchestrate a pipeline of
programs easily. It was simple to link executions of my intcode interpreter
through `stdin` and `stdout` in bash.

The only real algorithmic complexity to this problem was generating the set of
phase signals to try. For this, I utilized
[Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm) to generate
permutations. I then took the permutations and ran them through as stdin to
intstances of intcode. The set of results generated with each permutation was
then fed through Unix utilities `sort` and `tail` to find the answer.

## Part 2

```bash
#!/bin/bash

generatePermutations() {
  local k=$1 && shift
  local A=($@)
  if [ $k -eq 1 ]
  then
    echo ${A[*]}
  else
    for (( i=0; i<$k; i++ ))
    do
      (generatePermutations $((k-1)) ${A[*]})
      A=($@)
      local tmp=${A[i]}
      A[i]=${A[k-1]}
      A[k-1]=$tmp
    done
  fi
}

phaseSignals=(5 6 7 8 9)
len=${#phaseSignals[*]}

mkfifo fifo
IFS=$'\n'
for p in $(generatePermutations $len ${phaseSignals[@]})
do
  IFS=$' '
  arr=($p)
  echo 0 > fifo &
  echo $((echo ${arr[4]}; (echo ${arr[3]}; (echo ${arr[2]}; (echo ${arr[1]}; (echo ${arr[0]}; cat < fifo) | ./intcode) | ./intcode) | ./intcode) | ./intcode) | ./intcode | tee fifo | tail -1)
done | sort -n | tail -1
rm -rf fifo
```

### Breakdown

The second part of this challenge was done in almost the same way. The setup is
exactly the same. The only difference is instead of feeding in 0 to the first
process, I used a fifo to funnel in 0 to the first process and then used the
last process output as the input to the first process input. This creates a
loop of input and output.

# Conclusion

This was the first time I had to use a fifo for interprocess communication.
I found it a useful exercise. I also think that bash was the correct choice of
language for today. I feel like I slightly cheated by not rewriting the intcode
machine in a new language today, but I really wasn't in the mood to keep
rewriting it. But, bash definitely made it easy to reuse then intcode solution
that I already had.
