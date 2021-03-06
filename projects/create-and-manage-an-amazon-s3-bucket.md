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
sumary: Everything you need to know about setting up AWS S3 Buckets, adding IAM users
  for controlled access, and Configuring CORS for your S3 Bucket, to provide safe
  resource sharing.

---
[In the last part, we were focusing on building a drag&drop Vue component to upload the files.](https://www.the-koi.com/projects/upload-images-from-vue/)

This is the second part of my Series on how to Upload images on Amazon S3 from a Vue.Js frontend.  Here it is all about creating an AWS bucket to store your uploaded files.

[Section three will all about handling the images inside that backend and forwarding them to your S3 Bucket.](https://www.the-koi.com/projects/create-and-manage-an-amazon-s3-bucket/)

You can skip this if you want to use another server technology.

[In the last section, I will tell you how to access your images in a fast way using amazon CloudFront.](https://www.the-koi.com/projects/load-your-s3-images-blazing-fast-using-aws-cloudfront/)

Amazon S3 is a cloud storage service from Amazon AWS. When treated right it is fast, secure and with about 0,023 $ per GB, it is also one of the cheapest ways of storing your Data in the Cloud. So let\`s give it a try and start creating a Bucket and upload the first files.

### Creating the Amazon S3 Bucket

First of all, visit the AWS [console](https://aws.amazon.com/console/ "aws console") and log in, or sign up if you are new to AWS.

Up next click on services on the top left and chose S3 under Storage.

![](/uploads/createbucket.png "The S3 Bucket overview.")

Inside the S3 page, you can see all your Buckets with their names, region creation date, and most important their visibility, like below. Next click on Create Bucket.

![You will be asked for the name and region.](/uploads/createawsbucket.png "Create Aws Bucket")

To ensure the best performance the location should be near to you, when downloading content there could also a CDN used where you are using always the nearest possible location to your users, more on this in part 4 of my series.

At next in the security settings chose to block all public settings. If nothing is blocked everyone could access the files inside your bucket.

Next hit create Bucket, now your bucket is created and we can move on creating IAM Users and setting up access policies.

You also don\`t need to create all folders you will need manually, this happens automatically when uploading the first file to this location. I have wasted a lot of time on this.

### Add IAM User

Next, navigate to your IAM Management console and click Add user.

![](/uploads/addiamuser.png)

Make sure to check programmatic access, you will need the generated keys in [part 3](https://www.the-koi.com/projects/create-and-manage-an-amazon-s3-bucket/).

![](/uploads/addiamuserpermissions.png)

Grant the user full access to perform all CRUD operations on your S3 Bucket.

I will skip the next steps and resume directly to 5.

![](/uploads/iam-access.png)

When everything is done you receive your keys, download the CSV and save it in a safe place, you will need them in part 3.

### Configure CORS for S3

At next set, the right CORS config, **set everything to * won't be an option!**

For this go to the permissions tab, scroll down to the CORS settings and click edit.

Now change the config that only your API could perform Put, Post, Delete, Get Operations, and only your frontend could perform get operations.

_If you are developing on localhost, setting the Origins for get to * is ok, but make sure to change it before production._

Bellow is my Configuration:

``` 
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "https://myFrontend.net"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "https://myApi.net"
        ],
        "ExposeHeaders": []
    }
]
```

This is everything you have to do to create your S3 Bucket. Now you can either directly upload your files, or you can follow my series and start using your own app to upload them.

[In the next part of my series, we are going to bring life into this bucket by pushing from our .net core 3.1 API to it.](https://www.the-koi.com/projects/create-and-manage-an-amazon-s3-bucket/)

### Conclusion

Setting up Amazon S3 buckets is a really quick and easy way to store your Data in the cloud. YOu can get up and running in just a few minutes and by the way, I showed you these files are also protected against unprohibited access. 

I hope I could help you and save you some time, if you got feedback just contact me in the say hi section or [buy me a coffee](https://www.buymeacoffee.com/thekoi) if you want to support me.

Happy coding,

Alex.