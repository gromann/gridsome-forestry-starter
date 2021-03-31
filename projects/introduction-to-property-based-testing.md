---
date: 2021-03-31
thumbnail: ''
title: Introduction to Property based testing
meta-description: In this article, I will give you an overview of this random testing
  technique. This technique will help you to decrease your testing effort and is a
  huge time saver in my software projects.
sumary: |-
  ... or unit testing on Steroids.

  Property-based testing is a random testing technique to decrease your testing effort and helps to write strong tests. Sounds good right? In the following lines, I will give you a brief introduction to this topic.
categories:
- testing
- property-based testing
- functional programming
- quickCheck
project_bg_color: ''
project_fg_color: ''

---
When realizing a Software Project, testing is a crucial part and could take up to [50% of the project cos](https://jaxenter.com/time-estimation-for-software-testing-128078.html#:\~:text=Statistically%20speaking%2C%20testing%20occupies%2020,as%2035%20to%2050%20percent.)t. Especially in a Startup where changes happen daily and must be implemented without much effort. My own experience with testing was that the arrange part of a Unit test takes the biggest amount of effort. Even by using builder patterns, or parameterized tests, you still have to write multiple times the same code just checking for other values. Which does not only costs you time when writing your unit tests but also builds a longer refactoring tail when changing your code. 

Furthermore, it is the most crucial part of the test, if the test data is weak the whole test will be. This leads to an analogy width clock building, not time telling written by JimCollins \[7\]

> ” Excerpts from Built to Last Imagine you met a remarkable person who could look at the sun or stars at any time of day or night and state the exact time and date: “It’s April 23, 1401,2:36 A.M., and 12 seconds.” This person would be an amazing time teller, and we'd probably revere that person for the ability to tell time. But wouldn’t that person be even more amazing if, instead of telling the time, he or she built a clock that could tell the time forever, even after he or she was dead and gone?”

Writing unit tests would be time telling, sure you could say with confidence that the code under test will work for every specific case the test was written. But it would make much more sense to build a clock, in this case, a property-based test that is able to verify the correctness of a program for every possible input. This gives the test also the possibility to detect more uncommon errors by generating values over the whole input range. Property-based testing can speed up the testing process and increase the quality of tests in our project and makes more time for implementing new well-tested features. Which according to [Hughes et.al.](https://dl.acm.org/doi/10.1145/1988042.1988046) was also their main goal when Implementing the first property-based testing framework QuickCheck.

### What is Property-based Testing