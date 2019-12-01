# New Blogging Solution

I decided to create a new blog website in preparation for the [Advent of
Code](https://adventofcode.com/) competiton this year. I am planning on
challenging myself to it and wanted to blog about my experiences. I did not like
my old blog too much. Sure, it looked nice, but I like writing my own stuff that
I use around here, and the prior blog was created using
[Ghost](https://ghost.org/). Ghost is a great blogging platform, but I wanted to
try to create something simple on my own, and this is my swing at it.

# Design Goals

I had a few things in mind before I set out to put together this blog. I wanted
to put some restraints for myself to keep it focused:

- The blog should be a single page application and largely data driven
- The blog should not use as few external dependencies as possible
- The blog's visual design should be relatively plain, simple, and (hopefully)
  readable

## Single Page Application (SPA)

For my blog, I want to be able to add/edit posts without having to rebuild the
actual website or make any changes. This might seem obvious, but not all
static blogs necessarily work this way. In addition, I wanted to be able to just
write my blog posts in Markdown and ideally push it up to the same repository
and have the website just be updated from there.

For this to work, I employed a technique that is pretty popular these days:
[Single Page
Application](https://en.wikipedia.org/wiki/Single-page_application).
The idea of the single page application is to have all user interactions
update/rewrite the current page rather than load new pages from the server. So
when a new blog post is received, the blog post is fetched, and the home page is
overwritten to display the post. This allows me to dynamically retrieve Markdown
files that have the post contents and then render them to the page on the fly.
Now, if I want to add a new post, I just have to edit some metadata and include
the actual Markdown and media files for the post itself. No extra build step is
required which is great!

## KISS (Keep It Simple Stupid)

Because I tend to overengineer my projects, I wanted to restrain myself to using
as much vanilla ES6, HTML5, and CSS3 as possible. In addition, I wanted to have
as few external libraries as possible.

Now don't get me wrong, there is **nothing** wrong with [your](https://vuejs.org/)
[favorite](https://reactjs.org/) [web](https://angularjs.org/)
[framework](https://emberjs.com/). In fact, I think they are very good at what
they do and for larger projects where there is more complexity to manage, they
make a whole lot of sense.  But the amount of boilerplate that comes along with
those frameworks in dependencies and build process was, in my opinion, too much
compared to **<50** lines of
[HTML](https://github.com/Ludusamo/blog/blob/31959/index.html) and **<200**
lines of [CSS](https://github.com/Ludusamo/blog/blob/31959/style/index.css) and
[Javascript](https://github.com/Ludusamo/blog/blob/31959/src/index.js)
respectively.

I wasn't able to have zero library dependencies though. I brought in:

- [Showdown](https://github.com/showdownjs/showdown)
  - I was not about to write a Markdown parser for this project
- [JSYAML](https://www.npmjs.com/package/js-yaml)
  - Same reasoning, I was not writing a YAML parser
- [MomentJS](https://momentjs.com/)
  - This one I could arguably have done without, but it made my life a lot
    easier with formatting date strings

In addition to these Javascript libraries, I brought in a few fonts via [Google
Fonts](https://fonts.google.com/)

## Visuals

So, I am not a design person as much as I wish to be. So, I tried not to get too
fancy with it, and I learned some CSS concepts along the way:

- Flexbox
- Animations
- Hover effects/Other cool selectors

The majority of the site you see is mostly grey scale (with a few subtle effects
hidden in there). I was hoping this would give it a clean, readable design.
Though, as I am not a designer, I would love some feedback if you have any!

# Project finished! (Kinda...)

Proud to call this project finished! Its not everyday that I start a project and
actually get something done... very often not the case. There are a bunch of
things I want to add:

- Tag searching
- Better visuals
- Blog series support
- RSS Feed

But those can wait for another day, for now, the minimum viable product for this
blog is complete and working!
