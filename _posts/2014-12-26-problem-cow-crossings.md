---
layout: post
title: "Problem: Cow Crossings"
modified: 2014-12-26 20:00:00
tags: [USACO]
---

## Problem
This is a [link](http://www.usaco.org/index.php?page=viewproblem2&cpid=242) to the problem.

## Solution
First task that I had to accomplish was to figure out how to determine if they were crossing or not. This ended up to be rather simple since their start and end Y positions are fixed. What it turns out to be is that one cow's path must "surround" the other to be crossing.

So essentially: 
Given a cow A with path (x1, x2) and cow B with path (x3, x4). They would cross if: 

{% highlight html linenos %}

(x1 < x3 && x2 > x4) // Essentially saying that A "surrounds" B
(x3 < x1 && x4 > x2) // Also true if B surrounds A

{% endhighlight %}

After establishing that, in order to simplify the problem, I ordered all of the cows based on their start positions in order.
What this accomplished was that I knew as I went along, all the cows prior to the one being checked would have their first value less than the current cow. This means I just had to check if there was a cow previous to it with a larger ending position in order for there to exist a cow that surrounds it. So, I simply kept track of the largest end position. If it was greater, than I knew that the cow would cross with a cow even if I didn't know which one.

If I left it here, then my solution would be wrong. There may be cases where a cow that would have crossed it hadn't occured yet. So I simply checked backwards as well. As I went forward I also kept a list of ones that I already checked off as not safe. Going backwards got all of the rest.

This was my full solution:

{% highlight html linenos %}

#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
#include <utility>

#define pb push_back
#define mp make_pair
#define a first
#define b second
#define MAX_N = 100000

/* N cows (1 <= N <= 100000)
 * Road runs horizontally
 * One sided described by y = 0; other by y = 1
 * The cows will cross the road based on a_i and b_i which are their initial and final x positions
 * 1M <= a_i, b_i <= 1M
 * Cows are "safe" if their path does not intersect another cows's
 *
 * Objective: Count the number of safe cows.
*/

using namespace std;

typedef pair<int, int> cow;
typedef vector<cow> VP;

int N, output, checked[100000];
VP cows;

bool compareCows(const cow &a, const cow &b) {
	return a.a < b.a;
}

void solve() {
	output = 0;	
	int nSC = 0; // not safe cows
	int maxB = -2000000;
	for (int a = 1; a < N; a++) {
		if (maxB >= cows[a].b) {
			checked[a] = 1;
		       	nSC++;	
		}
		maxB = (maxB > cows[a].b) ? maxB : cows[a].b;
	}
	int minB = 2000000;	
	for (int a = N - 1; a >= 0; a--) {
		if (minB <= cows[a].b && checked[a] != 1) nSC++;	
		minB = (minB < cows[a].b) ? minB : cows[a].b;
	}
	output = N - nSC;
}

int main() {
	ifstream fin("crossings.in");
		fin >> N;
		int a, b;
		for (int i = 0; i < N; i++) {
			fin >> a >> b;
			cows.pb(mp(a, b));
		}
		sort(cows.begin(), cows.end(), compareCows);
	fin.close();

	solve();

	ofstream fout("crossings.out");
	fout << output << endl;
	fout.close();
	return 0;
}

{% endhighlight %}

- Brendan
