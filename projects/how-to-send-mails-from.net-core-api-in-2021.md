---
thumbnail: "/uploads/kutan-ural-ycxbgq7nua8-unsplash.jpg"
title: How to send mails from .net Core API in 2021
date: 2021-03-11
categories:
- ".net"
- Backend-Development
- MailKit
project_bg_color: ''
project_fg_color: "#000000"
sumary: 'In this post, I want to provide you a simple guide on how to send mails from
  your API using MailKit. '

---
I had an UseCase where I had to send different emails to our clients depending on what they did on our application. To do this I first started using the SMTP client, as many Blogposts and StackOverflow answers might suggest. But I was not happy with its behavior, so I dug a bit deeper into the topic. I finally found [MailKit](https://github.com/jstedfast/MailKit), a powerful package with the goal to provide the .net community a robust RFC, compatible email Client.

It is also recommended by [Microsoft documentation](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=net-5.0), so I gave it a try.

#### Setting up MailKit

First of all, install the MailKit NuGet package.

    Install-Package MailKit

The create a new MimeMessage, with from and to, add your subject and body.

So this is pretty natural and like you would do when using your email client to send Mails.

Up next you have to set up a connection to your Email Client.

This is where the time will go since sometimes you will run into trouble. Some mail servers like mine, do not accept requests from non-https servers. So since localhost has no certificates I was not able to test this locally, instead, I had to push my code every time and wait till it is running on my remote instance till I can test if it works.
when trying to do this from localhost you probably recieve following error:

    MailKit.Security.SslHandshakeException: An error occurred while attempting to establish an SSL or TLS connection.
    
    
    
    The server's SSL certificate could not be validated for the following reasons:
    
    • The server certificate has the following errors:
    
      • Die Sperrfunktion konnte keine Sperrprüfung für das Zertifikat durchführen.
    
    
    
     ---> System.Security.Authentication.AuthenticationException: The remote certificate is invalid according to the validation procedure.
    

To create a client you need to provide your SMTP server address and port.

Next, you need to tell your username (could be your mail address or not, depends on your mail server provider), and password.

_When using Gmail, you will have to set an_ [_App Password_](https://support.google.com/accounts/answer/185833) _for your account, otherwise, your request will be rejected and you will receive:_ 

    MailKit.Security.AuthenticationException: 535: 5.7.8 Username and Password not accepted. Learn more at
    5.7.8  https://support.google.com/mail/?p=BadCredentials g26sm1148794ejz.70 - gsmtp
    

Then the email will be sent and the client should be disconnected again.

And that's it!

Bellow, you can find my code, just copy and adapt it to your needs.

```cs  	 var message = new MimeMessage();
                message.From.Add(new MailboxAddress("from name", "from@email.com"));
                message.To.Add(new MailboxAddress("to name", "to@email.com"));
                message.Subject = "Look at this!";
    
                message.Body = new TextPart("plain")
                {
                    Text = @"Hey!
                    I just wanted you to tell about the awesome blog i recently found!
                    www.the-koi.com so go and check it out! 
                    reguards, 
                    yourName"
                };
    
                using (var client = new SmtpClient())
                {
                    client.Connect("<smtp server>", 465, true);
    
                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate("from@email.com", "<password>");
    
                    client.Send(message);
                    client.Disconnect(true);
                }
    
    
                return ServiceResult.Ok();
```

#### Conclusion

SMTPCLient hat ist problems, by using MailKit most of these problems were gone and you end up with a robust, powerful and well-documented email client.

I hope I could help you and save you some time, if you got feedback just contact me in the say hi section or [buy me a coffee](https://www.buymeacoffee.com/thekoi) if you want to support me.

Happy coding,

Alex.