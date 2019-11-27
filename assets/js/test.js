console.log("Hello, world")

var modalOverlay = document.getElementById("modal-overlay");
var modalImg = document.getElementById("modal-content")

var openModal = function (img) {
    // When an image is clicked, put its source in the modal and display it
    // console.log("click open");
    // console.log(img.src);
    // img.classList.add('active-modal');
    modalImg.src = img.src;
    modalOverlay.classList.add('active');
}

var closeModal = function () {
    modalOverlay.classList.remove('active');
}

window.onload = function () {
    // Get all elements inside the page-content
    var page_imgs = document.getElementById("main-content").querySelectorAll("img:not(#modal-content)");
    // Add click opener to every image
    for (var i = 0; i < page_imgs.length; i++) {
        page_imgs[i].addEventListener('click', function () { openModal(this) });
        page_imgs[i].addEventListener("mouseover", function () { this.style.cursor = "zoom-in" })
    }
}

modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keyup', function (e) {
    // Close the image modal if ESC is pressed
    var key = e.key || e.keyCode;
    if (key == 'Escape' || key == 'Esc' || key == 27) {
        closeModal();
    }
}
)