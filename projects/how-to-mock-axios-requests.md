---
date: 2021-04-17
thumbnail: "/uploads/mock-axios-request.jpg"
title: How to mock Axios requests.
meta-description: I will give you a guide on how to mock axios requests using jest.
  This solution is an easy and quick way to solve this task. It will also work for
  other frameworks like chai or Jasmine. So let's click and let me solve your problem.
sumary: "Testing with JavaScript could sometimes be a huge pain. I know from myself
  that sometimes it is just frustrating when you have some simple components to test
  but nothing works as expected. \n\nEspecially if these components are loading data
  from an API via Axios etc. I will show you a quick way on how to mock those responses
  and get quick tests which are focusing on the correctness of your code and not your
  API data. "
categories:
- testing
- axios
- jest
- javaScript
project_bg_color: ''
project_fg_color: ''

---
### Installing axios-mock-adapter

By installing [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) you will get the ability to mock all axios requests.

    npm install axios-mock-adapter --save-dev

### Importing and using axios-mock-adapter in your JavaScript tests

first of all, make sure to Import everything needed into your test file. 
	```js
    import axios from "axios";
    const MockAdapter = require("axios-mock-adapter");
    const mock = new MockAdapter(axios);
    import { yourMockResponse } from "../mockedResponse/yourEndpointSomeId";
	```
At next define the requests to mock, for better readability I have defined my URL directly inside the tests, but I would recommend keeping them all in a separate list with URL and mocked response. So you will stay DRY and do not need to search for your response every time you need to mock the same request.

      mock
        .onGet(
          "yourURL.com/api/yourEndpoint/someId"
        )
        .reply(200, yourMockResponse);

I also highly recommend saving all your responses in your own files, otherwise, your test files themselves would come to a complete mess. 

When everything is done you can use your mock at the top of your test. 

Axios will intercept all requests and use your status code and data instead. 

This is also a great way to test your code's behavior with incorrect responses or response codes.

### Conclusion

I have explained how to mock any Axios request, store the responses properly, and a way to keep track of all the URLs and responses. This guide is a fast and easy way to mock Axios requests inside your javaScript tests and will save you a lot of troubles and nerves. 

My solution will work with jest, chai, and Jasmine. I have testes it using vue.js with vue-test-utils but it will work for reacting, angular, and vanilla.js too.

I hope I could provide you some value and you could speed up your testing process. 

If you liked this article and want to read more about software testing, leave me a message or support me with buy me a coffee.