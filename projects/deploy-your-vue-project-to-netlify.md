---
thumbnail: "/uploads/datei_000.jpeg"
title: Safe time, money and nerves by deploying your project to Netlify.
date: 2021-03-11
categories:
- Cloud
- Netflify
- DevOps
- CI
- vue.js
- gridsome
- devHack
project_bg_color: ''
project_fg_color: "#000000"
sumary: 'In this guide, I want to show you how to save nerves and cost when deploying
  a vue.js Application.  We will set up continuous integration to deploy your vue.Js
  app to netlify. I will go through the main interface, set up a custom domain, and
  secure everything with HTTPS. '

---
In this Post i will guide you through the steps i took when deploying an project to Netlify.

Netlify is similar to AWS another cloud service, they offer a huge free plan with up to 100GB/month of traffic. Moreover, I love them for their great user experience when it comes to deployment compared to AWS and Microsoft azure. Bellow, I will describe all the steps it takes to get your app up and running.

Af first sign in Using your Github account, then you will come to your home Page, I will describe their elements later.

#### Set up a Github CI

![](/uploads/startci.png)

From the home menu click on create a new site and chose GitHub, authorize netlify to your GitHub account, and then chose either all repositories or just one, as I did on the left to install netlify.

In the next step choose the repository you want to build your site from.

In step 3 you need to specify your build settings, this highly depends on your application. When you are using **gridsome** your Build command is **gridsome Build** and the publish directory is dist.

When using **nuxt** it would be **nuxt Build**, the directory stays the same, and with **plain vue** it stays **npm run build.** Finding these commands for every other framework is also no rocket science and is normally described in the framework's documentation.

![](/uploads/screencapture-app-netlify-start-repos-gromann-the-koi-2021-03-09-14_18_27.png)

...And that's it! Hit **Deploy site** and netlify is doing the rest for you! Just wait a few minutes and your site is up and running. Awesome right?

#### Register a domain

When the Upload is done you can proceed with registring a domain for your Project. You could either use a third party service like amazon Route 53, which is a little cheaper from the second year on. Or use netlifys service and simply register it there and they handle all the DNS pain for you.

![](/uploads/register-domain.png)

I have registered my domain directly within netlify, to complete I just hat to submit my payment information and confirm my purchase. After a few seconds, [https://www.the-koi.com/](https://www.the-koi.com/ "https://www.the-koi.com/") was up and running!

For your SSL certificate, you just have to click on verify DNS, then everything should be fine and you have a nice Trustful website online!

Reload after some minutes and your Domain managment tab Should look something like this:

![](/uploads/screencapture-app-netlify-sites-goofy-nightingale-aa6742-settings-domain-2021-03-09-18_03_08.png)

And that's it! Your Page is online and now you could focus on your SEO and how to get traffic.

#### Conclusion

Deploying your code to netlify takes really no time and you end up having a fast and secure server to serve your content.

Compared to WordPress you are also running on a budget, your only expenses are 13€ per year for the domain, and that's it!

If you want to know more about netlify or got feedback for this article, just [say hi](https://www.the-koi.com/contact), or buy me a coffee.

Happy coding,

Alex.