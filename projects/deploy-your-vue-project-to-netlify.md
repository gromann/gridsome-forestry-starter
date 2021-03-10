---
thumbnail: "/uploads/datei_000.jpeg"
title: Deploy your vue Project to Netlify
date: 2021-03-11
categories:
- AWS
- S3
- Cloud
- ".net"
- Backend Development
- Amazon
project_bg_color: ''
project_fg_color: "#000000"
sumary: 'In this guide, I want to show you how to process formData objects in .net,
  how to connect your API to your AWS resources, and finally how to Stream files through
  your API on your S3 Bucket. '

---
This is the last part of my series on how to Upload images on Amazon S3 from a Vue.Js frontend. In the last part, we have uploaded our Images from a .net core API. You can find it here if you missed it.

Once the files are uploaded the next requirement is to access them. There are several ways to access your files from an S3 bucket. You could either set everything to the public, which I do not recommend as you may already know, and access them directly with your buckeu URL + location + key. But

![](/uploads/50usnq.jpg)

The next option would be using the S3 JS Libary to generate signedURLs and access the images in that way, this is verry safe but verry slow and you would need IAM user credidentials on your client side. Another way is uning presigned URLs, this is a safe and faster way. Even faster is accessing your images through Amazon CoundFront.

Amazon CloudFront is a fast content delivery network (CDN), made to serve your content in a fast and secure way from all over the world. This keeps your latency low and your users safe. The best thing about it is, it is amazingly cheap, 10 TB data out per month will cost you about 0.085 € So lets dive into it!

#### Setting up a CloudFront Distribution

Go to your aws console and chose [cloudFront](https://console.aws.amazon.com/cloudfront/), then you will see a list of your Distribution. A Distribution is a set up CDN. The two Interesting columns for you would be the **Domain Name** and the origin. The **Origin** is the service CloudFront is forwarding, so this should be your S3 Bucket when we are done. 

The other important column for you is the **Domain Name**, this is the URL from where you can access youre images. Your final image URL then is _Domain Name + location + filename._

To set up a new Distribution click on **Create Distribution**, chose **Web** as delevery method and click **Get Started.**

Origin Domain Name is your S3 Bucket created in Part 2, optionally you could also specify a path, this would be an folder inside your Bucket. Default cloudFront is accessing the home directory of your Bucket. 

Select **restrict Bucket access**, **Create new Identity** and **Yes, Update Bucket Policy**. Then AWS will handle everything to make shure ther are just Authenticated requests allowed to S3 and CloudFront is the only endpoint to get your files from. 

To further improve security chose HTTPS Only, this leads to an set HSTS Header and drops all http headders. Also allow only Get, Head and Options. Chose restrict viewer access No, we well do that in one of my next Articles.

The rest you can set according to your personal preferences. I would also recomend logging, therefore you can just chose an Bucket for your logs and an file prefix to easily find them. 

Bellow you can see my exampe Configuration:

![](/uploads/screencapture-console-aws-amazon-cloudfront-home-2021-03-09-11_32_08.png)

After submitting your Distribution is goind to be created. You can go Back to the Overview and check the Status, after successfull creation it should switch to deployed. 

![](/uploads/clofro-ov.png)

Then we can verify that the distribution works as expected.

#### Acess the Uploaded image through Distribution

I've uploaded the title image of this article to S3, to check if everything works fine we now need to build the URL to this image with the file name: Datei_000.jpeg. 

To Access your image you now need to build your URL: 

https://<your Distribution>/<optionally a folder>/<your file>

This would be for my Image:

https://d152puo1m6akm.cloudfront.net/Datei_000.jpeg

If you access is only with http you will recieve an 403 error since http is not allowed. 

#### Conclusion

Accessing your images via CloudFront is an easy way to improve the loading performance of your project since it is faster than accessing S3 directly. Moreover it is a good way to improve the security since you can force using https and restricting to different headers way easier than directly in S3.

This was the last part of my S3 series, i hope i could help you, and let me know in the say Hi section how you've liked it or if you were facing any difficulties durring this article. Im looking forward to your feedback.

Happy coding,

Alex.