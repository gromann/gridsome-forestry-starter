---
thumbnail: "/uploads/img_0884.JPG"
title: Vue crop images, the elegant way
date: 2021-03-18
categories:
- awesome libaries
- vue images
- image editing
project_bg_color: ''
project_fg_color: "#000000"
sumary: "I this guide, I want to show you how to build a vue component to crop and
  upload images, in a fast and scalable way. \n\nTo accomplish this, I\\`m using vue
  advanced cropper."

---
Hello, and welcome (back). In one of my previous examples, I showed you how to do vue image upload in an easy way. But sometimes you do not only want to upload images, you also want to transform them to fit, for example in a predefined box.

To accomplish this I will make another component where the user could adjust the image to fit your needs. All this will happen using a library called [vue advanced cropper](https://norserium.github.io/vue-advanced-cropper/introduction/getting-started.html), and they hold what the name promises. So let's get started!

### Install vue advanced cropper

    npm install -S vue-advanced-cropper

### Building the component

![](/uploads/cropdone.png)

First of all import the Cropper library and also its CSS. then just use it as any other component. Give a source to the image you want to crop and that's basically it!

To beautify the whole thing I added the _example-cropper_ CSS class, where I basically just set a height and width to prevent the cropper from growing over the window size and get unusable.

As an image source, you can use everything you want, also our elegant drag&drop component from [this tutorial](https://www.the-koi.com/projects/upload-images-from-vue/).

To access the cropped images use _this_.$refs.cropper.getResult(); this will access the cropper component and get the cropped image out of it! And that's it! In the [Documentation](https://norserium.github.io/vue-advanced-cropper/introduction/getting-started.html), there are many ways to extend your cropper to fit exactly your requirements!

Implementing this should take just some minutes and you will end up with a functional and elegant vue image crop component.

Below you can find the complete code, feel free to copy and use it!

```js 
    <template>
      <v-card width="auto">
        <div class="example">
          <cropper ref="cropper" class="example-cropper" :src="image" />
                <drop-zone
      			v-model="image"
      			:label="upload"
      			:location="location"
      			@uploaded="newImagesUploaded"
      			class="pb-15"
    			/>
          <div class="button-wrapper">
            <span class="button" @click="cropImage">Crop image</span>
          </div>
        </div></v-card
      >
    </template>
    
    <script>
    import plannerEventBus from "../bars/planner/plannerEventBus";
    import { Cropper } from "vue-advanced-cropper";
    import "vue-advanced-cropper/dist/style.css";
    export default {
      name: "uploadPlannerBgImgCard",
      components: {
        Cropper
      },
      props: {},
      data() {
        return {
          image:
            "https://images.pexels.com/photos/4218687/pexels-photo-4218687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        };
      },
      methods: {
        cropImage() {
          const result = this.$refs.cropper.getResult();
          const newTab = window.open();
          newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
            "image/jpeg"
          )}"></img>`;
        }
      }
    };
    </script>
    
    <style>
    .example-cropper {
      border: solid 1px #eee;
      min-height: 300px;
      width: 100%;
      height: 85vh;
    }
    
    .button-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 17px;
    }
    
    .button {
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      background: #35b392;
      cursor: pointer;
      transition: background 0.5s;
      font-family: Open Sans, Arial;
      margin: 0 10px;
    }
    
    .button:hover {
      background: #38d890;
    }
    
    .button input {
      display: none;
    }
    </style>
```

### Conclusion

Vue advanced cropper is an amazing library to easily build a bullet-proof image crop functionality for your vue project. This library is not only easy to use, but it is also highly extendable and customizable. The documentation is also very easy to follow with many examples.

_Note: This is no affiliate, this is pure enthusiasm!_

I hope I could help you and save you some time, if you got feedback just contact me in the say hi section. If I could help you, you can support me by [buying me a coffee](https://www.buymeacoffee.com/thekoi).

Happy coding,

Alex