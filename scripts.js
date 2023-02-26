var previewToggled = false;
var scrollHeight = 0;
var lastScrollHeight = 0;

function init() {
    let element;
    element = document.body;

    scrollHeight = element.scrollTop;

    document.getElementById('preview-exit').addEventListener("click", togglePreview)
    /*document.getElementById('preview-enter').addEventListener("click", togglePreview)*/

    addEventListener("scroll", onBodyScroll)

    var previewbuttons = document.getElementsByClassName('info-panel-previewbutton');
    for (i = 0; i < previewbuttons.length; i++) {
        previewbuttons[i].addEventListener("click", togglePreview)
        console.log("Added preview eventlistener to item " + i)
    }
    var playbuttons = document.getElementsByClassName('info-panel-playbutton');
    for (i = 0; i < playbuttons.length; i++) {
        /*playbuttons[i].addEventListener("click", togglePreview)
        console.log("Added play eventlistener to item " + i)*/
    }

    
}



function togglePreview(number) {
    let element;
    element = document.documentElement;

    

    if (previewToggled) {
        previewToggled = false;
        console.log(previewToggled + " " + element.scrollTop)
        element.classList.toggle("preview-toggled")

        element.scrollTop = scrollHeight;

    } else {
        previewToggled = true;
        console.log(previewToggled + " " + element.scrollTop)
        scrollHeight = element.scrollTop;
        element.scrollTop = 0;

        let r = document.querySelector(":root")
        r.style.setProperty("--scrollHeight", -scrollHeight + "px");

        element.classList.toggle("preview-toggled")
    }
}

function onBodyScroll() {
    body = document.documentElement;
    thisScrollHeight = body.scrollTop;

    if (thisScrollHeight > 0 && lastScrollHeight === 0) {
        document.getElementById("nav-bar-container-background").classList.toggle("nav-bar-background-hidden");
        console.log("toggled");
    }

    if (thisScrollHeight === 0 && lastScrollHeight > 0) {
        document.getElementById("nav-bar-container-background").classList.toggle("nav-bar-background-hidden");
        console.log("toggled");
    }

    lastScrollHeight = thisScrollHeight;
}

function playEpisode(number) {
    window.location.replace("./videos/vidEp" + number + ".html");
}