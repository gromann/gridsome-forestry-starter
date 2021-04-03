---
thumbnail: "/uploads/img_0853.jpg"
title: Build a blog with gridsome and forestry
date: 2021-03-19
categories:
- Netflify
- vue.js
- gridsome
- start blogging
- forestry
project_bg_color: ''
project_fg_color: "#000000"
sumary: "Gridsome is an awesome framework when it comes to blogging, and forestry
  is the perfect CMS for easily getting started! \n\nIn this post, I want to show
  you how to set up your personal blog fast and for free by using those two frameworks."
meta-description: 'I will show you how to save money and gain flexibility by building
  your Blog wir an JAMStack like Forestry and vue/ Gridsome '

---
When it comes to creating a blog, most people tend to chose WordPress with Elementor. This sounds also like an amazing combination, there are a whole bunch of finished teams and also a high amount of plugins for integrating ads, analytics, or optimizing SEO. But it comes at a cost. You will have to pay for the commercial WordPress, maybe for some plugins and themes, and since WordPress needs a Database, you will need to pay for domain hosting.

When using gridsome with a JAM stack, you only have to pay for your domain. Forestry is offering an amazing free plan and is directly integrated into your git repo, so you also do not pay for any database or API hosting.

Gridsome is a Static site generator, and static sides could be hosted at [netlify ](https://www.netlify.com/pricing/)and [azure static](https://azure.microsoft.com/en-us/pricing/details/app-service/static/) for free! So you only need to pay for your domain.

Another huge advantage is that you are way more flexible and highly customizable. So let's get started! 

### Picking a gridsome Starter

Gridsome provides a list of [amazing starters](https://gridsome.org/starters/) on their homepage! Just pick one that fits your needs and you are ready to go!

### Connecting Forestry

![](/uploads/gridsome-forestry.png)

For all of your Forestry starters, you will find this button, where you are creating a new project inside your repo with this code as a template.

After that, the forestry app will open and you will find your CMS Overview. 

![](/uploads/gridsome-forestry-ov.png)

From here first go to Theme Config, and edit your Blog name etc. to get started. Al of the changes you make here will simply editing the markdown files you find inside your project, 

As a first step I will recommend entering your Blog name and a short description, this happens in the Theme Config section.

![](/uploads/gridsome-forestry-theme.png)

Here I have set everything to my needs, as you can also see on my home page. 

All the changes you make in these editors are saved into markdown files you will find inside your project and committed when you are hitting the save button. 

In the Front matter you can customize all these fields and add me ones, just make sure to add them also in your vue app.

### Directory Structure

As I mentioned before, all of your changes from the CMS will be saved to Markdown files, you can customize everything, but you also need to customize your code. Here I want to show you where you find all the stuff you need. 

![](/uploads/gridsome-forestry-structure.png)

In the .forestry folder, all your config will be saved, you can find here all the fields you need for your pages. 

Posts and projects contain your actual content, there are the markdown files containing your awesome Articles. So if you don't have an active internet connection you could also edit them here!

Pages contain the main pages of your blog, gridsome is automatically creating routes to them with their name inside.

Under templates, you will find the templates for your posts, if you add something in the front matter you also have to add it here!

Under Uploads, you will find your uploaded media for the blog posts.

The rest should be clear for you if you have vue basics. 

#### Conclusion

You must not spend any money when building a blog, you can also come up with fast, beautiful, and flexible solutions by using JAM stacks like this one. By going this way you end up having an flexible future prove solution which will fit exactly your needs. It also wont take you long, I promise!

I will definitely be working on more articles on Building such blogs, so please subscribe to my email list and stay tuned!

I also hope that you have enjoyed reading this article and I would be glad if you send me links to blogs built with this tutorial in the [say Hi section](https://www.the-koi.com/contact). 

Thanks for reading! If you want to know more about Gridsome or got problems or feedback for this article, just [say hi](https://www.the-koi.com/contact), or [buy me a coffee](https://www.buymeacoffee.com/thekoi).

Happy coding,

Alex.