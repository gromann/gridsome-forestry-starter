---
thumbnail: "/uploads/sendi-gibran-oals6skzc_s-unsplash.jpg"
title: Create and manage an Amazon S3 Bucket
date: 2021-03-08
categories:
- AWS
- S3
- Cloud
project_bg_color: ''
project_fg_color: "#000000"
sumary: "Photo by [sendi gibran](https://unsplash.com/@sendi_r_gibran?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  on [Unsplash](https://unsplash.com/s/photos/cloud?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
  \n\nI will talk about how to set up an Amazon S3 Bucket, add a User and control
  the access rights that no one can do unallowed changes."

---
This is the second part of my Series on how to Upload images on Amazon S3 from a Vue.Js frontend. In the last part, we were focusing on building a drag&drop vue component to upload the files. Now it is all about creating an AWS bucket to store your uploaded files.

#### Creating the Amazon S3 Bucket

First of all, visit the AWS [console](console.aws.amazon.com "aws console") and log in, or sign up if you are new to AWS. 

Up next click on services on the top left and chose S3 under Storage. 

![](/uploads/createbucket.png "The S3 Bucket overview.")

Inside the S3 page, you can see all your Buckets with their names, region creation date, and most important their visibility, like below. Next click on Create Bucket.

![You will be asked for the name and region.](/uploads/createawsbucket.png "Create Aws Bucket")

To ensure the best performance the location should be near to you, when downloading content there could also a CDN used where you are using always the nearest possible location to your users, more on this in part 4 of my series.

At next in the security settings chose to block all public settings. If nothing is blocked everyone could access the files inside your bucket. 

Next hit create Bucket, now your bucket is created and we can move on creating IAM Users and setting up access policies. 

#### Add IAM User

Next, navigate to your IAM Management console and click Add user. 

![](/uploads/addiamuser.png)

Make sure to check programmatic access, you will need the generated keys in section 3.