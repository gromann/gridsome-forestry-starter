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
This is the third part of my series on how to Upload images on Amazon S3 from a Vue.Js frontend. In the last part, we were focusing on creating an S3 Bucket and enabling it just for private access. You can find it here if you missed it.

Connecting to a third-party service directly from your frontend application isn't a good idea, because theoretically anyone could access your credentials. Using your API as a middleman is a good way to go, so let's get started!

#### Installing Nuget Packages

For this task you need following Packages

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

The most important thing is to add the FromForm parameter binding to **every** parameter! At next I create an AddImageCommand, this is just a transport class to pass the parameters to my Service. Then the service will be async called. Afterwards a wrapper with that result plus status code or error message will be returned.

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

The first step is to check if the files content type is one of the types you are accepting, images for my case but it could be anything else. 

Now we need to connect to the S3 Buckety by creating an new S3 Client. The Client takes your credentials as well as your Bucket location. You can lookup this in the region column on your S3 Overview. Then just type _Amazon.RegionEndpoint._ and just use autocomplete of your IDE to find the right region. Alternativly you can find It [here](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/Amazon/TRegionEndpoint.html "AWS Regions class"). 

#### Sreaming the files to Amazon S3

When we have created our client we can now stream the file to Amsazon S3. Alternativley you could either create an pre-signed URL or store the file, process it and then transfer it to S3.

To stream the file a new file stream will be opened, writing into the fileBytes Object. In line 22 this Object will be used to create an memoryStream. Inside that stream a PutObject will be created. A putObject is used to add an Object to an S3 Bucket, it consists of the file, the location and the Bucket name.  To be submitted you must have write permissions on this Bucket. And with the configuration from part 2, you must not specify an ACL inside this object, otherwise it will lead to an unauthorized error.

When everything is set up PutObjectAsync will be called, the file will be saved to S3 and an response will be returned. 

When everything was fine I will safe an reserence to the image in my own database you can do whatever you're supposed to do here. 

#### Conclusion

Submitting Images from .net Core is really an easy job todo if you follow along above steps. The major task here is to find out whats wrong when you run into security problems when trying it for the first time. Like I was searching for hours why I am getting 401 errors, it ture´ned out that I had set the ACL modifier which lead to nowhere in my config.

If everything is set up correctly you should be done in no time, so lets get started!

In the next part of my series, i will show you how to access those images in a fast way.

I hope I could help you and save you some time, if you got feedback just contact me in the say hi section.

Happy coding,

Alex.