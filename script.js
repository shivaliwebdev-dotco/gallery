// ==============================
// SELECT ELEMENTS
// ==============================

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const imageTitle = document.getElementById("image-title");
const imageCounter = document.getElementById("image-counter");

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// ==============================
// STORE IMAGES
// ==============================

const images = [];

galleryItems.forEach((item) => {

    const img = item.querySelector("img");

    const title = item.querySelector("h3").innerText;

    images.push({
        src: img.src,
        title: title
    });

});

// ==============================
// CURRENT IMAGE
// ==============================

let currentIndex = 0;

// ==============================
// SHOW IMAGE
// ==============================

function showImage(index){

    currentIndex = index;

    lightboxImage.style.opacity = "0";

    setTimeout(() => {

        lightboxImage.src = images[index].src;

        imageTitle.innerText = images[index].title;

        imageCounter.innerText =
            `${index + 1} / ${images.length}`;

        lightboxImage.style.opacity = "1";

    },150);

}

// ==============================
// OPEN LIGHTBOX
// ==============================

galleryItems.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        lightbox.classList.add("show");

        document.body.style.overflow="hidden";

        showImage(index);

    });

});

// ==============================
// CLOSE
// ==============================

function closeLightbox(){

    lightbox.classList.remove("show");

    document.body.style.overflow="auto";

}

closeBtn.addEventListener("click",closeLightbox);

// ==============================
// NEXT IMAGE
// ==============================

function nextImage(){

    currentIndex++;

    if(currentIndex>=images.length){

        currentIndex=0;

    }

    showImage(currentIndex);

}

nextBtn.addEventListener("click",nextImage);

// ==============================
// PREVIOUS IMAGE
// ==============================

function prevImage(){

    currentIndex--;

    if(currentIndex<0){

        currentIndex=images.length-1;

    }

    showImage(currentIndex);

}

prevBtn.addEventListener("click",prevImage);

// ==============================
// CLICK OUTSIDE IMAGE
// ==============================

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

// ==============================
// KEYBOARD SUPPORT
// ==============================

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")) return;

    switch(e.key){

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            prevImage();

            break;

        case "Escape":

            closeLightbox();

            break;

    }

});

// ==============================
// TOUCH SWIPE (MOBILE)
// ==============================

let startX = 0;
let endX = 0;

lightbox.addEventListener("touchstart",(e)=>{

    startX = e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend",(e)=>{

    endX = e.changedTouches[0].screenX;

    if(startX-endX>60){

        nextImage();

    }

    if(endX-startX>60){

        prevImage();

    }

});