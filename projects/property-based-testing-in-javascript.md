---
date: 2021-04-16
thumbnail: "/uploads/dog-testing-software.jpg"
title: Property-based testing in JavaScript
meta-description: In this article, I will give you an overview of Property-based testing
  within Javascript. I will compare the Libraries fastCheck, JsVerify, and test-Check.
  And then I'm going to explain fast-Check in detail with example tests.
sumary: JavaScript is a very powerful and flexible language. But javaScripts flexibility
  comes at a cost. You will often end up with problems like adding strings to numbers
  when doing calculations or similar strange behaviors. I think every experienced
  developer has its own anecdotes. (Mine could fill another article. Leave me an eMail
  if I should write it! :) ) This sometimes strange behavior makes it even more important
  to have strong tests and find those situations. Property-based testing is a testing
  method with the ability to do that with its randomized test data generation you\`re
  chances are high to find such errors.
categories:
- testing
- property-based testing
- javaScript
- fastCheck
project_bg_color: ''
project_fg_color: ''

---
### Selection of the right JavaScript testing Libary

For JavaScript, there exist several Property-based testing Libraries, all of them are following Quick-Check \[6\] which was implemented in Haskell. Some of them to mentions are JsVerify \[12\], fast-check \[8\], and test check \[4\]. Another option would be using scala.js and ScalaCheck, but for this approach, you have to import the SUT as a Js. Object into an external scala project and there is no jest support, so the test program must be run by hand every time, and there is no native support for Vue.js which makes UI testing very hard. Also, JsVerifyhas no out of the box jest support, according to its documentation\[12\] they just have support for Mocca and jasmine but not for Jest, and since the last commit was in 2018 and according to this article \[14\] by default there are just very small integers created and not normally distributed values I will not consider using it. In Table 1 fast check test check and scalaCheck are compared about their features and how they will match the needs of the project. TestCheck and FactCheck.js are supported by Jest out of the box. Both of them provide nearly the same functionality of quick-Check and are very well documented. TestCheck is a little bit easier to understand because they use the same naming conventions quickCheck,scalaCheck or FsCheck are using, fastCheck.js is still being maintained since there are still commits on the Github Repository. TestChecks last commit was in 2018, but still, have some issues with test data generation \[14\].

[tab1]

  feature                   fast-check             testcheck                   scalaCheck
  ------------------------- ---------------------- --------------------------- ------------
  Shrinking                                                                    
  combine Properties        no                     no                          
  Generators                but different syntax   but issues with objet Gen   
  Arbitaries                                       no                          
  Model Based Testing                              no                          
  Jest support                                                                 no
  CI integrable                                                                no
  Stars on GitHub           1.5k                   1.1k                        1.6k
  Last GitHub Commit [^1]   14.07.2020             26.03.2018                  07.07.2020

[^1]: checked on 14.07.2020


### Conclusion

When it comes to testing, unit testing is like asking for the time, property-based testing is having a watch and no testing is like being somewhere alone without a clock. You can roughly estimate the time but no one knows if the estimation was right.

Property-based testing is also a very effective way to get strong test data since you do not have to write it on your own. Think about the time it takes to provide a unit test with all the data it needs. With property-based testing, you just provide the structure of your data and the frameworks will handle the rest, hundreds of tests with different data will be executed and you will get confidence that your code works for any case.