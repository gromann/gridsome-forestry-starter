---
thumbnail: "/uploads/sendi-gibran-oals6skzc_s-unsplash.jpg"
title: Upload Images to S3 from a .net core API
date: 2021-03-08
categories:
- AWS
- S3
- Cloud
- ".net"
- Backend Development
project_bg_color: ''
project_fg_color: "#000000"
sumary: 'In this guide, I want to show you how to process formData objects in .net,
  how to connect your API to your AWS resources, and finally how to Stream files through
  your API on your S3 Bucket. '

---
This is the third part of my Series on how to Upload images on Amazon S3 from a Vue.Js frontend. In the last part, we were focusing on creating an S3 Bucket and enabling it just for private access. You can find it here if you missed it.

Connecting to a third-party service directly from your frontend application isn't a good idea, because theoretically anyone could access your credentials. Using your API as a middleman is a good way to go, so let's get started!

#### Building the Endpoint

Our controller will receive a FormFile and a path to save it to. For me accessing the formData object and extracting the path and file took me a lot of googeling, so I thought of including it in this guide.

Below you can find the endpoint from my controller, it is just available to authenticated users. I will explain how to do this in another post, so stay tuned!

```cs
    [HttpPost]
    [DisableRequestSizeLimit]
    [Authorize(Policy = "Admin")]
    public async Task<ActionResult<ImageDto>> Post([FromForm] IFormFile File, [FromForm] string Path)
    {
        AddImageCommand addImageCommand = new AddImageCommand { File = File, Bucket = Path };
    
        return FromValueServiceResult(await _imageS3Service.UploadImageToS3(addImageCommand));
    }
```

The most important thing is to add the FromForm parameter binding to **every** parameter! Next inside the service make sure to have your access key, access secret, and bucket name accessible. I would recommend saving those in .nets [Secret Manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows "microsoft documentation of secret Manager"), but you can also save them in some Config files. 

In the next part of my series, we are going to bring life into this bucket by pushing from our .net core 3.1 API to it.

I hope I could help you and save you some time, if you got feedback just contact me in the say hi section.

Happy coding,

Alex.