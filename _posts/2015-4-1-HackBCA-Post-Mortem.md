---
layout: post
title: "HackBCA Post-Mortem"
modified: 2015-4-1 14:55:00
tags: [Personal, hackathon]
---

## HackBCA
Oh boy, nothing turned out the way that we had originally planned. However, it was a lot of fun, and we ended up having a pretty cool product in the end. We ended up creating a pretty cool bow and arrow game with the Intel Edison board serving as the control scheme. This resulted in us winning Intel's subcategory for most creative, which one us each a [Dell Venue 8 Tablet](http://www.dell.com/us/p/dell-venue-8-3840-tablet/pd).
<!--more-->

## What went wrong
The EMG sensor had arrived two days prior to the event. I went into school the next day to begin the solder work. However, my soldering skills are abyssmal, and it didn't help that I was rushing to finish it up. I had an almost ready sensor by the end of the day.

Then the day of the hackathon, we tried to finish up the sensor. However, it ended up failing and it did not seem to be working. At this point, I sort of began panicking. I gave up on the sensor around 9 or 10. Then, a nice mentor offered me a MYO that he had with him. This was fantastic news... but he didn't have the bluetooth dongle so it didn't work.

At this point, we decided to try and create a control scheme for our game using an Android device. This fell apart because I didn't have Android Studio installed, and I had difficulty setting it up at the time. At the end of all this, we were sitting around 12-1 with the input end of the game not even starting production.

## What went right
This picks up where everything that went wrong ended. My friend came over with the Intel Edison board that he had received from Intel. He wanted me to help teach him to program the board. We explained our problem to him, and he said that his Intel board might be able to serve as that control scheme that we needed. I took a look through the sensors that they gave him. There were two sensors that we could use in order to create something interesting.

Long story short, I spent the rest of the night programming the Intel Edison board to serve as a control scheme.

## Conclusion
This was our final product:

![Final HackBCA product.](https://i.imgur.com/G2vE8uv.jpg)

It was a fantastic experience. I learned a lot that night, and I am pretty proud of the end result. Our team pulled through in the end and we had a pretty cool prize to show for it. I am definitely looking forward to my next Hackathon.

- Brendan
