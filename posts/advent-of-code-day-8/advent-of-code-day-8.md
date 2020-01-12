
# Today's Language - Java

The language I used today was
[Java](https://en.wikipedia.org/wiki/Java_(programming_language))
created in 1995 by James Gosling. Bash was influenced by
[Ada 83](https://en.wikipedia.org/wiki/Ada_(programming_language)),
[C++](https://en.wikipedia.org/wiki/C%2B%2B),
[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)), and others.

Java is a general purpose programming language that highly emphasizes class
based, object oriented design. Java syntactically is in the C family and was
created with a "write once, run anywhere" mentality for its design. This is
achieved through the Java Virtual Machine (JVM) which many other languages
target now today.

## My Experience

Java was the first programming language that I ever learned. I learned it back
in highschool and used to watch a lot of YouTube videos of other coders putting
up tutorials on how to write videogames and game engines in it.

Though, I haven't used it much in recent years.

# Issues

I originally tried this problem in R. I don't know why I was having such a
difficult time, but I just was not able to work anything out using R. Because of
that, I swapped to using Java because I just needed to complete this problem.

# Problem

See the problem statement [here](https://adventofcode.com/2019/day/8).

# Solution

```java
import java.util.Scanner;
import java.io.*;
import java.util.*;

public class Main {

  public static int count(String data, char c) {
    int count = 0;
    for (int i = 0; i < data.length(); i++) {
      if (data.charAt(i) == c) {
        count++;
      }
    }
    return count;
  }
  public static List<String> splitEqually(String text, int size) {
    List<String> ret = new ArrayList<String>((text.length() + size - 1) / size);

    for (int start = 0; start < text.length(); start += size) {
        ret.add(text.substring(start, Math.min(text.length(), start + size)));
    }
    return ret;
  }

  public static void main(String[] args) throws IOException {
    File f = new File("input");
    Scanner scanner = new Scanner(f);

    String data = scanner.nextLine();
    scanner.close();

    List<String> chunks = splitEqually(data, 150);
    String leastZeroString = "";
    int leastZeros = 150;

    // PART 1
    for (String chunk : chunks) {
      if (count(chunk, '0') < leastZeros) {
        leastZeroString = chunk;
        leastZeros = count(chunk, '0');
      }
    }
    System.out.println(count(leastZeroString, '1') * count(leastZeroString, '2'));

    // PART 2
    char[] finalImage = chunks.get(0).toCharArray();
    for (int chunkNum = 1; chunkNum < chunks.size(); chunkNum++) {
      System.out.println(chunkNum);
      System.out.println(chunks.get(chunkNum));
      for (int i = 0; i < chunks.get(0).length(); i++) {
        if (finalImage[i] == '2' && chunks.get(chunkNum).charAt(i) != '2') {
          finalImage[i] = chunks.get(chunkNum).charAt(i);
        }
      }
    }
    for (int y = 0; y < 6; y++) {
      for (int x = 0; x < 25; x++) {
        System.out.print(finalImage[y * 25 + x]);
      }
      System.out.println();
    }
  }
}
```

### Breakdown

The first part of this problem was a prerequisite of the second part, so I will
just present the solution together here. A lot of today was simple string
manipulation. For part 1, I chunked the input string into groups of 150 and
counted the number of zeroes across each of the groups. I then extracted the
least count of zeroes that I could find.

For part 2, I went through the same groupings of 150 and applied the changes
from each layer until I came to a final image. I then rendered the final image
in ascii and interpreted it to find the final answer.

# Conclusion

I barely used any of Java's good points in today's challenge. I really used it
as more of a procedural language that had some useful libraries in its standard
library that I was already familiar with. However, Java is primarily an object
oriented language and encourages design of that nature, so maybe today's
challenge wasn't as good of an indication of it.
