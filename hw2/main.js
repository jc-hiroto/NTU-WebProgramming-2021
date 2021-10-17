// Create a photo album, with the following features:
// 1. Click the next button to see the next photo
// 2. Click the previous button to see the previous photo
// 2. Click on the image to display the image

var albums = {
    "Memes 1": [
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
        }
    ],
    "Memes 2": [
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
    ],
    "Unknown":[]
}
    
var album_name = "Memes 1";
var images = albums[album_name];
var image_index = 0;
let image_container = document.getElementById("main-image");
let image_title = document.getElementById("image-title");
let image_description = document.getElementById("image-description");
let image_list = document.getElementById("image-list");
let image_index_p = document.getElementById("image-index");

reset_selector();
update_album(album_name);
update_selector();
refresh_image();
refresh_selector();

function home() {
    album_name = "Memes 1";
    image_index = 0;
    reset_selector();
    update_album(album_name);
    update_selector();
    refresh_image();
    refresh_selector();
}

function update_album(album_name) {
    if (albums[album_name] == undefined || albums[album_name].length == 0) {
        // show alert
        alert("Oops! No images in this album :(");
        return;
    }else{
        images = albums[album_name];
        image_index = 0;
        refresh_image();
        reset_selector();
        update_selector();
        refresh_selector();
    }
    target_album = document.getElementById(album_name);
    target_album.className = "sb-btn-selected";
}
function reset_selector(){
    btn_list = document.getElementById("sb-container").children;
    for (let i = 0; i < btn_list.length; i++) {
        if (btn_list[i].className == "sb-btn-selected") {
            btn_list[i].className = "sb-btn";
        }
    }
}
function update_selector() {
    image_list.innerHTML = "";
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
}
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

var konami_keys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'A',
    66: 'B'
  };

var konami_code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'B', 'A'];
var pos = 0;

document.addEventListener('keydown', function(e) {
var key = konami_keys[e.keyCode];
var requiredKey = konami_code[pos];
if (key == requiredKey) {
    pos++;
    if (pos == konami_code.length) {
    eggs();
    pos = 0;
    }
} else {
    pos = 0;
}
});

function eggs() {
    alert("Tasty Konami Easter EGG!");
    for(let i = 0; i < albums["Memes 1"].length; i++) {
        albums["Memes 1"][i].url = "https://www.konami.com/games/s/asia/img/ogp_top.jpg";
        albums["Memes 1"][i].title = "Konami Easter Egg";
        albums["Memes 1"][i].description = "konami.com";
    }
    home();
}