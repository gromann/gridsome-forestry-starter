---
thumbnail: "/uploads/kutan-ural-ycxbgq7nua8-unsplash.jpg"
title: Build an email list using gridsome and MailChimp
date: 2021-03-11
categories:
- MailChimp
- EmailList
- gridsome
- vue-meta
project_bg_color: ''
project_fg_color: "#000000"
sumary: 'In this post, I want to show you how to set up a personal email list using
  MailChimp. '

---
As you have probably read before, if not, you will read it now, an personal email list is a very important marketing tool for you and your product. You have the ability to keep connected with your users, or customers who are loyal enough to share their email with you and want to keep informed about your next article. Another important thing is that an email list is actually your property. So please keep these two things in mind, set up your email list immediately, and most importantly treat your subscribers respectfully. They are your most valuable resource, so don't spam them, create beautiful valuable emails, and do not sell their contact information!

### Create your MailChimp Account

If you have less than 2.000 subscribers, Mailchimp is free, up to 50.000 subscribers costs you 9,99/month, so the free plan is good to start.

So go to MailChimp.com and create your account, enter all your information and confirm your email. Then you will find yourself on your personal dashboard.

### Build your signUp form

Go to audience-> signUp forms.

Ther you chose your audience and then you can choose the type of form that you want. I have chosen the pop-up form, _if you find this annoying, please email me or write it in the say Hi section_.

When chosen a type you get to the form builder, from there you can build your forms, obviously. So enter everything you want and confirm.

![](/uploads/mailchimp-popup.png)

When you are ready, you can also directly connect your website and add their script to the head of your site. So let\`s do this!

Entering a script in your head tag is with vue.js a little bit tricky.

Gridsome is using by default [vue-meta](https://vue-meta.nuxtjs.org/api/#install). By using vue-meta you can access your applications head simply from your main.js.

```js 
    head.script.push({
        innerHTML: '!function(c,h,i,m,p){m=c.createElement(h),' +
            'p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script",' +
            '"https://chimpstatic.com/mcjs-connected/js/users/.../....js");',
        id: "yourId"
    });
```

_head.script.push_, adds a script tag to your head, parameters like id are defined in the same way as attributes in an Objet. 

To add your javaScript snippet, simply put it behind the _innerHtml_. 

When they found the tag you can continue and everything is set up.

Now you can wait for your subscribers and start your campaigns.

When I have gained enough knowledge and subscribers, I will post more articles on Mailchimp, how to make nice campaigns, and provide you with valuable tips and tricks. To subscribe to not miss it!

Happy mailing,

Alex.