var modalOverlayImg = document.getElementById("modal-overlay-img");
var modalImg = document.getElementById("modal-content-img")
var modalOverlayVideo = document.getElementById("modal-overlay-video");
var modalVideo = document.getElementById("modal-content-video")

var openImgModal = function (img) {
    // When an image is clicked, put its source in the modal and display it
    // console.log("click open");
    // console.log(img.src);
    // img.classList.add('active-modal');
    modalImg.src = img.src;
    modalOverlayImg.classList.add('active');
}

var openVideoModal = function (video) {
    // When a video is clicked, put its source in the modal and display it
    source = video.getElementsByTagName("source")[0].src
    console.log(source)
    modalVideo.src = source;
    modalOverlayVideo.classList.add('active');
}

var closeModal = function () {
    modalOverlayImg.classList.remove('active');
    modalOverlayVideo.classList.remove('active');
}

window.onload = function () {
    // Get all elements inside the page-content
    var page_imgs = document.getElementById("main-content").querySelectorAll("img:not(#modal-content):not(#header-img)");
    var page_vids = document.getElementById("main-content").querySelectorAll("video:not(#modal-content)");
    // Add click opener to every image
    for (var i = 0; i < page_imgs.length; i++) {
        page_imgs[i].addEventListener('click', function () { openImgModal(this) });
        page_imgs[i].addEventListener("mouseover", function () { this.style.cursor = "zoom-in" })
    }
    // Add click opener to videos
    for (var i = 0; i < page_vids.length; i++) {
        page_vids[i].addEventListener('click', function () { openVideoModal(this) });
        page_vids[i].addEventListener("mouseover", function () { this.style.cursor = "zoom-in" })
    }
}

modalOverlayImg.addEventListener('click', closeModal);
modalOverlayVideo.addEventListener('click', closeModal);

document.addEventListener('keyup', function (e) {
    // Close the image modal if ESC is pressed
    var key = e.key || e.keyCode;
    if (key == 'Escape' || key == 'Esc' || key == 27) {
        closeModal();
    }
}
)