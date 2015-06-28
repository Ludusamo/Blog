---
layout: post
title: "Problem: Message Relay"
modified: 2014-12-25 20:00:00
tags: [USACO]
---

##Introduction
This is the one time that I will add an introduction as it is the first time I am doing this.
To help myself improve, I will be solving more USACO problems in hopes that I become good enough to start advancing. This blog will hopefully motivate me to keep practicing problems. I will be doing problems either on the training pages or from past competitions.

## Problem
This is a [link](http://www.usaco.org/index.php?page=viewproblem2&cpid=241) to the problem.

## Solution
This problem was fairly straight forward. I could simply just loop through the number of cows and follow their message paths to determine whether it was going to be forced into a loop. If the number of steps taken (number of times message is forwarded) exceeds N, then I would know that the cow was loopy. There are definitely more elegant ways of completing the problem. However, since N can't exceed 1000, and with this solution the worst case is just O(N^2), I could just brute force it like this.

This was my full solution:

{% highlight html linenos %}

#include <iostream>
#include <fstream>
#include <algorithm>
#include <vector>
#include <utility>

#define pb push_back

// N cows (1 <= N <= 1000)
// Communication with tin cans
// Each cow can forward message to at most 1 cow
// Cow i; F(i) = (cow that i forwards to)
// if F(i) = 0; i cannot forward messages
// cow = loopy if message gets stuck in loop
// want to avoid loopy cows
//
// Objective: Count number of none loopy cows.
//
// Strategy: Vector keeping track of all the cows, who they forward to
// 		and if they are loopy or not. 

using namespace std;

typedef vector<int> VI;

int N, output;
VI cows;

bool checkBranch(int i) {
	int currentCow = i;
	int numSteps = 0;
	while (numSteps <= N) {
		cout << i << " " << cows[i] << endl;
		if (cows[i] == -1) return true;
		i = cows[i];
		numSteps++;
	}
	return false;
}

void solve() {
	for (int i = 0; i < N; i++) {
		cout << i << endl;
		if (checkBranch(i)) output++;	
		cout << endl;
	}		
}

int main() {
	ifstream fin("relay.in");	
	fin >> N;
	int buffer;
	for (int i = 0; i < N; i++) {
		fin >> buffer;	
		buffer -= 1;
		cows.pb(buffer);
	}
	fin.close();	
	solve();

	ofstream fout("relay.out");
	fout << output << endl;
	fout.close();
	return 0;
}

{% endhighlight %}

- Brendan
