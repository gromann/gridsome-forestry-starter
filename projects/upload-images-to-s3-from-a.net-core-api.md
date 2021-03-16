---
thumbnail: "/uploads/sendi-gibran-oals6skzc_s-unsplash.jpg"
title: Upload Images to S3 from a .net core API
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
[In the first part, we were focusing on building a drag&drop Vue component to upload the files.](https://www.the-koi.com/projects/upload-images-from-vue/)

[The last article was all about handling the images inside that backend and forwarding them to your S3 Bucket.](https://www.the-koi.com/projects/create-and-manage-an-amazon-s3-bucket/)

This is the third part of my Series on how to Upload images on Amazon S3 from a Vue.Js frontend.  Here it is all about creating an AWS bucket to store your uploaded files.

[In the last section, I will tell you how to access your images in a fast way.](https://www.the-koi.com/projects/load-your-s3-images-blazing-fast-using-aws-cloudfront/)

Connecting to a third-party service directly from your frontend application isn't a good idea, because theoretically anyone could access your credentials. Using your API as a middleman is a good way to go, so let's get started!

### Preqireties

You need a working .net Core API, and a created Amazon S3 Bucket with your credentials for it. 

#### Installing Nuget Packages

For this task, you need the following Packages

* AWSSDK.Core
* AWSSDK.S3

#### Building the Endpoint

Our controller will receive a FormFile and a path to save it to. For me accessing the formData object and extracting the path and file took me a lot of googling, so I thought of including it in this guide.

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

The most important thing is to add the FromForm parameter binding to **every** parameter! At next I create an AddImageCommand, this is just a transport class to pass the parameters to my Service. Then the service will be async called. Afterward, a wrapper with that result plus a status code or an error message will be returned.

#### Connecting to Amazon S3

Next inside the service make sure to have your access key, access secret, and bucket name accessible. I would recommend saving those in .net's [Secret Manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows "microsoft documentation of secret Manager"), but you can also save them in some Config files.

    public async Task<ServiceResult<ImageDto>> UploadImageToS3(AddImageCommand command)
            {
                ServiceResult<ImageDto> imageDto;
                IFormFile file = command.File;
    			// check for the right content type
                if (!file.ContentType.Contains("image"))
                {
                    return ServiceResult.InvalidEntity<ImageDto>("Only Images are accepted!");
                }
    
                // connecting to the client
                var client = new AmazonS3Client(accessKey, accessSecret, Amazon.RegionEndpoint.EUCentral1);
    
                // get the file and convert it to the byte[]
                byte[] fileBytes = new Byte[file.Length];
                file.OpenReadStream().Read(fileBytes, 0, Int32.Parse(file.Length.ToString()));
    
                var fileName = file.FileName;
                var bucketName = bucket + command.Bucket;
                PutObjectResponse response = null;
    
                using (var stream = new MemoryStream(fileBytes))
                {
                    var request = new PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = fileName,
                        InputStream = stream,
                        ContentType = file.ContentType
                    };
                    // specify no ACL, else upload will be blocked by S3!
                    response = await client.PutObjectAsync(request);
                }
    ;
    
                if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
                {
                    // this model is up to you, i have saved a reference to my database 
                    // to connect the images with users etc.
                    AddImageReferenceCommand addImageReferenceCommand = new AddImageReferenceCommand
                    {
                        Bucket = command.Bucket,
                        Key = fileName,
                        Name = fileName
                    };
                    // adds the image reference
                    imageDto = await _imageService.AddImage(addImageReferenceCommand);
                }
                else
                {
                // do some error handling
                }
    
                return imageDto;
            }

The first step is to check if the file content type is one of the types you are accepting, images for my case but it could be anything else.

Now we need to connect to the S3 Bucket by creating a new S3 Client. The Client takes your credentials as well as your Bucket location. You can look up this in the region column on your S3 Overview. Then just type _Amazon.RegionEndpoint._ and just use autocomplete of your IDE to find the right region. Alternatively, you can find It [here](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/Amazon/TRegionEndpoint.html "AWS Regions class").

#### Streaming the files to Amazon S3

When we have created our client we can now stream the file to Amazon S3. Alternatively, you could either create a pre-signed URL or store the file, process it, and then transfer it to S3.

To stream the file a new file stream will be opened, writing into the file bytes Object. In line 22 this Object will be used to create a memoryStream. Inside that stream, a PutObject will be created. A putObject is used to add an Object to an S3 Bucket, it consists of the file, the location, and the Bucket name.  To be submitted you must have write permissions on this Bucket. And with the configuration from part 2, you must not specify an ACL inside this object, otherwise, it will lead to an unauthorized error.

When everything is set up PutObjectAsync will be called, the file will be saved to S3 and a response will be returned.

When everything was fine I will save a reference to the image in my own database you can do whatever you're supposed to do here.

#### Conclusion

Submitting Images from .net Core is really an easy job to do if you follow along with the above steps. The major task here is to find out what's wrong when you run into security problems when trying it for the first time. Like I was searching for hours why I am getting 401 errors, it turned out that I had set the ACL modifier which leads to nowhere in my config.

If everything is set up correctly you should be done in no time, so let's get started!

[In the next part of my series, I will show you how to access those images in a fast way.](https://www.the-koi.com/projects/load-your-s3-images-blazing-fast-using-aws-cloudfront/)

I hope I could help you and save you some time, if you got feedback just contact me in the say hi section or you can [support me and buy me a coffee](https://www.buymeacoffee.com/thekoi).

Happy coding,

Alex.