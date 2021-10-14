// Create a photo album, with the following features:
// 1. Click the next button to see the next photo
// 2. Click the previous button to see the previous photo
// 2. Click on the image to display the image

var images = [
                {
                    "title": "IS THIS A ?",
                    "description": "Ref: memes.tw",
                    "url": "https://memeprod.ap-south-1.linodeobjects.com/user-template/98996b8124e004cc88b6d1c3860799fc.png"
                },
                {
                    "title": "Star Wars Meme",
                    "description": "Ref: memes.tw",
                    "url": "https://memeprod.ap-south-1.linodeobjects.com/user-template/354bff692c042a0c9f23fa164d17fc03.png"
                },
                {
                    "title": "Distracting BOI",
                    "description": "Ref: memes.tw",
                    "url": "https://memeprod.ap-south-1.linodeobjects.com/user-template/e454fa4be160c258c29044ad034f74bd.png"
                },
                {
                    "title": "Buff DOGE v.s Cheems",
                    "description": "Ref: memes.tw",
                    "url": "https://memeprod.ap-south-1.linodeobjects.com/user-template/0b867ebd37ca67b8cbd7d0f009e74af0.png"
                },
                {
                    "title": "Sad cat",
                    "description": "Ref: memes.tw",
                    "url": "https://memeprod.ap-south-1.linodeobjects.com/user-template/65d37cb62a8b3b73ca8a214460312fcc.png"
                },
                {
                    "title": "Highway turn",
                    "description": "Ref: memes.tw",
                    "url": "https://memeprod.ap-south-1.linodeobjects.com/user-template/46f63e21ef26e981b9477262d002fa60.png"
                }
            ]
var image_index = 0;
let image_container = document.getElementById("main-image");
let image_title = document.getElementById("image-title");
let image_description = document.getElementById("image-description");
let image_list = document.getElementById("image-list");
let image_index_p = document.getElementById("image-index");

for (let i = 0; i < images.length; i++) {
    let image_item = document.createElement("img");
    image_item.src = images[i].url;
    image_item.className = "img-selector"
    image_item.id = "img-s-"+i;
    image_item.addEventListener("click", function() {
        target_image_index = this.id.split("-")[2];
        if (target_image_index != image_index) {
            image_index = target_image_index;
            refresh_image();
            refresh_selector();
        }
    });
    image_list.appendChild(image_item);
}


refresh_image();
refresh_selector();

function next_image() {
    image_index++;
    refresh_image();
    refresh_selector();
}
function prev_image() {
    image_index--;
    refresh_image();
    refresh_selector();
}
function refresh_image() {
    if (image_index >= images.length) {
        image_index = 0;
    }else if (image_index < 0) {
        image_index = images.length - 1;
    }
    console.log(image_index);
    image_container.src = images[image_index].url;
    image_title.innerHTML = images[image_index].title;
    image_description.innerHTML = images[image_index].description;
    image_index_p.innerHTML = (image_index + 1) + "/" + images.length;
}
function refresh_selector() {
    let selector = document.getElementsByClassName("img-selector");
        for(let i = 0; i < selector.length; i++) {
            if (i == image_index) {
                set_selector(selector[i], true);
            } else {
                set_selector(selector[i], false);
            }
        }
}

function set_selector(selector, is_active) {
    if(is_active) {
        selector.style.outline = "5px solid #333333";
        selector.style.outline_offset = "-3px";
        selector.style.opacity = "0.5";
        selector.style.cursor = "not-allowed";
    }else {
        selector.style.outline = "none";
        selector.style.opacity = "";
        selector.style.cursor = "";
    }
}

