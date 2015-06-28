---
layout: post
title: "Problem: Perimeter"
modified: 2014-12-28 20:00:00
tags: [USACO]
---

## Problem
This is a [link](http://www.usaco.org/index.php?page=viewproblem2&cpid=243) to the problem.

## Solution
This problem was considerably easier than the other problems in the same competition. I just simply utilized a recursive floodfill in order to determine the perimeter.

This was done by first completely loading the field into an array. However, I had to ensure that the floodfill wouldn't get stuck so I had a dummy rows and columns surrounding the field.

X = Empty
O = Hay
Actual Field:

X X X X

X O O X

X O X X

X X X X


With Dummy Row and Columns:

X X X X X X

X X X X X X

X X O O X X

X X O X X X

X X X X X X

X X X X X X


It may seem a bit overkill here, but it was necessary if the borders were completely filled.

From there I just began at (0, 0), I started here because I knew that this cell had to be clear because it was part of my dummy rows and columns.

Then the floodfill just took care of the work. I just ensured to mark the ones that I had passed and moved on. If it hit a hay bale, it simply marked it and just checked how many sides were empty and added that to the overall perimeter.

And then the algorithm just took over.

This was my full solution:

{% highlight html linenos %}

#include <iostream>
#include <fstream>

#define MAX_N 10000
#define FIELD_SIZE 102

/* N hay bales (1 <= N <= 10000)
 * Field is a 100x100 grid
 * E/a hay bale takes up 1x1
 * All hay bales are connected in one mass
 *
 * Objective: Determine the perimeter that this mass creates.
*/

using namespace std;

int N, field[FIELD_SIZE][FIELD_SIZE], visited[FIELD_SIZE][FIELD_SIZE], perimeter = 0;

int numSurrounded(int x, int y) {
	return ((field[y-1][x] == 1) ? 1 : 0) + ((field[y+1][x] == 1) ? 1 : 0) + 
		((field[y][x+1] == 1) ? 1 : 0) + ((field[y][x+1] == 1) ? 1 : 0);
}

void checkCell(int x, int y) {
	if (visited[y][x] == 1) return;
	if (field[y][x] == 0) {
		visited[y][x] = 1;
		if (y != 0) checkCell(x, y - 1);
		if (y < FIELD_SIZE - 1) checkCell(x, y + 1);
		if (x != 0) checkCell(x - 1, y);
		if (x < FIELD_SIZE - 1) checkCell(x + 1, y);
	} else {
		cout << x << " " << y << endl;
		perimeter++;	
	}
}

void solve() {
	checkCell(0, 0);
}

int main() {
	int x, y;
	ifstream fin("perimeter.in");
		fin >> N;
		for (int i = 0; i < N; i++) {
			fin >> x >> y;
			field[y][x] = 1;
		}
	fin.close();
	solve();
	ofstream fout("perimeter.out");
		cout << perimeter;
		fout << perimeter << endl;
	fout.close();	

	return 0;
}

{% endhighlight %}

- Brendan
