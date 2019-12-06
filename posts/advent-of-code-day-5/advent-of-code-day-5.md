# Today's Language - Dart

The language I used today was [Dart](https://dart.dev/) created in 2011 by
Google. Dart was influenced by
[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)),
[Erlang](https://www.erlang.org/),
[Javascript](https://en.wikipedia.org/wiki/JavaScript), and others.

Dart is a statically typed, multi-paradigm language. The language is
primarily object oriented in paradigm, but has support for others such as
functional programming. The aim used to be for Dart to take over Javascript as
a web language. It even had its own dedicated VM for Chrome at one point.
But the language has found new life in being the primary language for the
[Flutter](https://flutter.dev/) framework, a new rendition of "write once,
deploy everywhere". Jam packed with lots of cool features like reified generics,
mixins, and all your usual object oriented goodies, Dart is a language I think
a lot of today's developers would have no problem getting used to using.

## My Experience

I have used Dart a little years back. I was trying to make some small web
application with it.

# Issues

No issues with the language today. Coming from a C/Python background primarily,
the language feels really comfortable. Anyone who has ever written any
Javascript will quickly feel at home in this language.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/5).

# Solution

## Part 1

```dart
import 'dart:async';
import 'dart:io';
import 'dart:math';

class VM {
  num ip;
  List<num> opcodes;
  VM(List<num> opcodes) {
    this.ip = 0;
    this.opcodes = opcodes;
  }
  num getNextOp({num mode = 1}) {
    return mode == 0 ? opcodes[opcodes[ip++]] : opcodes[ip++];
  }
  num getInstruction(num op) {
    return op % 100;
  }
  num getMode(num op, num pos) {
    return op ~/ pow(10, pos + 2) % 10;
  }
  void run() {
    var op = getNextOp();
    while (getInstruction(op) != 99) {
      switch (getInstruction(op)) {
      case 1:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        // We assume that the third arg can never be immediate mode
        opcodes[getNextOp()] = arg1 + arg2;
        break;
      case 2:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        // We assume that the third arg can never be immediate mode
        opcodes[getNextOp()] = arg1 * arg2;
        break;
      case 3:
        opcodes[getNextOp()] = int.parse(stdin.readLineSync());
        break;
      case 4:
        print(getNextOp(mode: 0));
        break;
      default:
        print("Unknown opcode: " + op.toString());
        break;
      }
      op = getNextOp();
    }
  }
}

void main() {
  new File('input').readAsString().then((String contents) {
    var opcodes = contents.split(',').map((String x) => num.tryParse(x)).toList();
    new VM(opcodes).run();
  });
}
```

### Breakdown

Yesterday was very functional in nature. Today was very imperative with some
object oriented bits mixed in. The OO bits today felt a little bit gratuitous,
but for the sake of trying to be a little idiomatic/resembling code I might
usually write in a language like this, I structured it this way.

To make writing the functionality of each opcode easier, I wrote some helper
functions to retrieve the necessary arguments and update state accordingly.

## Part 2

```dart
import 'dart:async';
import 'dart:io';
import 'dart:math';

class VM {
  num ip;
  List<num> opcodes;
  VM(List<num> opcodes) {
    this.ip = 0;
    this.opcodes = opcodes;
  }
  num getNextOp({num mode = 1}) {
    return mode == 0 ? opcodes[opcodes[ip++]] : opcodes[ip++];
  }
  num getInstruction(num op) {
    return op % 100;
  }
  num getMode(num op, num pos) {
    return op ~/ pow(10, pos + 2) % 10;
  }
  void run() {
    var op = getNextOp();
    while (getInstruction(op) != 99) {
      switch (getInstruction(op)) {
      case 1:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        // We assume that the third arg can never be immediate mode
        opcodes[getNextOp()] = arg1 + arg2;
        break;
      case 2:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        // We assume that the third arg can never be immediate mode
        opcodes[getNextOp()] = arg1 * arg2;
        break;
      case 3:
        opcodes[getNextOp()] = int.parse(stdin.readLineSync());
        break;
      case 4:
        print(getNextOp(mode: getMode(op, 0)));
        break;
      case 5:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        if (arg1 != 0) ip = arg2;
        break;
      case 6:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        if (arg1 == 0) ip = arg2;
        break;
      case 7:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        opcodes[getNextOp()] = arg1 < arg2 ? 1 : 0;
        break;
      case 8:
        var arg1 = getNextOp(mode: getMode(op, 0));
        var arg2 = getNextOp(mode: getMode(op, 1));
        opcodes[getNextOp()] = arg1 == arg2 ? 1 : 0;
        break;
      default:
        print("Unknown opcode: " + op.toString());
        break;
      }
      op = getNextOp();
    }
  }
}

void main() {
  new File('input').readAsString().then((String contents) {
    var opcodes = contents.split(',').map((String x) => num.tryParse(x)).toList();
    new VM(opcodes).run();
  });
}
```

### Breakdown

This second part is just a straight extension of the first part. I simply added
in the new required operations. It was simple enough with the helper functions
that I already wrote in part 1.

# Conclusion

Dart is a good language. Is it my favorite, no. But I think it has a lot of
things I often want in a language. I just think it is a little _boring_. I just
don't feel like it pushes the envelope in any particular way. But definitely a
good work horse language, and I hope to see it get more use especially as a key
component to the Flutter project. It certainly made my job today easy!
