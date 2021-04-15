---
date: 2021-03-31
thumbnail: "/uploads/dog-testing-software.jpg"
title: Property-based testing in JavaScript
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

Writing unit tests would be time telling, sure you could say with confidence that the code under test will work for every specific case the test was written. But it would make much more sense to build a clock, in this case, a property-based test that can verify the correctness of a program for every possible input. This gives the test also the possibility to detect more uncommon errors by generating values over the whole input range. Property-based testing can speed up the testing process and increase the quality of tests in our project and makes more time for implementing new well-tested features. Which according to [Hughes et.al.](https://dl.acm.org/doi/10.1145/1988042.1988046) was also their main goal when Implementing the first property-based testing framework QuickCheck.

### What is Property-based Testing

Property-based testing is a testing technique where random input data is used to produce an output, which then has to fulfill different properties.

This testing technique combines random testing by covering a high amount of input values with example-based testing by reaching high feature compliance, as described in the image below.

![Property based testing compared to other testing techniques.](/uploads/property-based-testing-vs-unit-testing.png)

In contrast to Example-based testing, these properties do not have to go into details about an output. So there must not be an oracle to produce another output value, this output value will be compared to. Moreover, there will be characteristics derived from the specifications the output has to fulfill.

### Property-based Testing compared to Unit testing

I will compare testing a sort function by Unit and property-based testing. The tested sort function should be able to sort an array of integers in ascending order. With unit testing, testing will look something like bellow.

``` js
    test("sortIsCorrectlySorting", () => {
      expect(sort([])).toEqual([]);
      expect(sort([0])).toEqual([0]);
      expect(sort(null)).toEqual(null);
      expect(sort([1, 4, 3, 2, 5])).toEqual([1, 2, 3, 4, 5]);
    });
```

These tests are good to validate the code’s behavior in edge cases and for just one given array. But what if there is an off-by-one error in the implementation of sort, the above tests would not be able to detect this. So an ideal test of this function should go over the complete definition area of the system under test (SUT). For sort, this would be every array of integers, so writing unit tests for every array of integers would be a lot of work.

If we could generate arrays of random length filled with random integers this would save a lot of work. This is exactly what property-based testing does, for example when testing a new sort algorithm there will be automatically created hundreds of different arrays, then the SUT will be executed. To verify the Output of the sort function there is now no need to execute another sort function and compare the two arrays with each other as we did in the Unit test. Instead, there will be defined Properties that hold for every possible input.

For this given example good properties would be:

* The length before and after sort will stay the same
* Sorting the Array twice will lead to the same Result
* Every item in the sorted array must be smaller than its successor

These properties are implemented in JavaScript using the awesome framework [fast-Check](https://dubzzz.github.io/fast-check.github.com/) below.

``` js 

test("sortIsCorrectlySorting", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), array => {
      var sorted = sort(array);
      // The length before and after sort will stay the same
      expect(sorted).toHaveLength(array.length);
      // Sorting the Array twice will lead to the same Result
      expect(arrayEquals(sorted, sort(sorted))).toBe(true);
      // Every item in the sorted array must be smaller than its successor
      sorted.foreach(item => {
        expect(item).toBeLessThanOrEqual(sorted[sorted.findIndex(item) + 1]);
      });
    })
  );
});
```

These tests are a bit longer than the unit tests from above but the biggest difference is that there is no actual array created. That means each test is independent of the type of input. Do you also need to sort floating point numbers? No problem, just replace fc.integer() with fc.float() in the generator. With unit testing, you probably had to rewrite the arrange part of each test.

Another advantage is that this code will execute hundreds of times, each time with different input data.

Revisiting the clock building not time telling analogy from my introduction, of course, building the clock takes longer than telling the time, but in a long run, it is way faster giving someone this clock than telling the time every time.

### How to find an error?

But what is if a test case fails? With so many test runs with different data, how can I find an Input that caused the error?

If a test case fails the failing output of the test case will be minimized to a minimal failing test case and as always the line in where the test case failed. This process is called shrinking and is giving the developer the possibility to reproduce the failing test case and to find the bug that caused the error. Many frameworks like fast check also provide the possibility to reproduce the test with the same failing test case. For the sort example, you will get the smallest array where the test failed. The shrinking process is similar to delta debugging \[14\], which searches for a minimal input of a failing test case.

### Conclusion

When it comes to testing, unit testing is like asking for the time, property-based testing is having a watch and no testing is like being somewhere alone without a clock. You can roughly estimate the time but no one knows if the estimation was right.

Property-based testing is also a very effective way to get strong test data since you do not have to write it on your own. Think about the time it takes to provide a unit test with all the data it needs. With property-based testing, you just provide the structure of your data and the frameworks will handle the rest, hundreds of tests with different data will be executed and you will get confidence that your code works for any case.