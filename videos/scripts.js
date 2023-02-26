var videoPlaying = false;
let r = document.querySelector(":root")

var controlsActive = false;
var controlsTimeout = 0;

var seekingVideoIntervallID;
var finderPercentage;
var wasPlayed = false;
var muted = false;
var isInFullscreen = false;

var mouseX;


window.onload = function () {
    setInterval(updateControls, 10);
    setInterval(updateVideofinder, 100);
}

function init() {
    let element;
    element = document.body;

    element.addEventListener("mousemove", showControls);

    var video = document.getElementById("video");
    video.autoplay = true;
    video.addEventListener("ended", videoEnded)


    playbuttonMode1 = document.getElementById("play-button-stopped");
    playbuttonMode2 = document.getElementById("play-button-playing");
    playbuttonMode1.style.setProperty("display", "block");
    playbuttonMode2.style.setProperty("display", "none")

    var active = document.getElementById("sound-active");
    var mute = document.getElementById("sound-mute");
    active.style.setProperty("display", "block");
    mute.style.setProperty("display", "none")

    document.getElementById("playArea").addEventListener("click", toggleVideo)
    document.getElementById("finder").addEventListener("mousedown", seekVideo)
    document.getElementById("finder").addEventListener("mouseup", stopSeekingVideo)
    document.addEventListener("fullscreenchange", function () { isInFullscreen = !isInFullscreen })
    element.addEventListener("mouseup", stopSeekingVideo)
    element.addEventListener("mousemove", updateMousePos)
}

function updateMousePos(event) {
    mouseX = event.clientX;
}


function toggleVideo() {

    wasPlayed = true;
    var video = document.getElementById("video");
    playbuttonMode1 = document.getElementById("play-button-stopped");
    playbuttonMode2 = document.getElementById("play-button-playing");

    if (!videoPlaying) {
        video.play();
        playbuttonMode1.style.setProperty("display", "none");
        playbuttonMode2.style.setProperty("display", "block")
        videoPlaying = true;
        console.log("playing now")
    } else {
        video.pause();
        playbuttonMode1.style.setProperty("display", "block");
        playbuttonMode2.style.setProperty("display", "none")
        videoPlaying = false;
    }
}

function videoEnded() {
    videoPlaying = false
    video.pause;
}

function triggerVideoSeeking() {
    return window.setInterval(function () {
        var pos = mouseX;
        var finderBound = document.getElementById("finder").getBoundingClientRect();
        var finderSize = finderBound.right - finderBound.left
        finderPercentage = (pos - finderBound.left) / finderSize;
        video.currentTime = video.duration * finderPercentage

        console.log(finderPercentage)
    }, 10);
}

function seekVideo() {
    var pos = mouseX;
    var finderBound = document.getElementById("finder").getBoundingClientRect();
    var finderSize = finderBound.right - finderBound.left


    seekingVideoIntervallID = triggerVideoSeeking();

    console.log(pos + " " + finderSize);
}

function stopSeekingVideo() {
    window.clearInterval(seekingVideoIntervallID);
    console.log("Mouse up")
}


function updateVideofinder() {
    var video = document.getElementById("video");
    var time = video.currentTime;
    var bufferedTime = video.buffered.end(0);
    var videoLength = video.duration;

    r.style.setProperty("--videoTime", ((time / videoLength) * 100) + "%");
    r.style.setProperty("--videoBufferedTime", ((bufferedTime / videoLength) * 100) + "%");

    if (time == videoLength) {
        playbuttonMode1.style.setProperty("display", "block");
        playbuttonMode2.style.setProperty("display", "none")
        videoPlaying = false;
    }
}

function updateControls() {
    if (controlsActive && controlsTimeout > 0) {
        controlsTimeout--;
    }

    if (controlsTimeout <= 0) {
        controlsActive = false;
        controlsTimeout = 0;
        r.style.setProperty("--controlsVisible", 0);
        r.style.setProperty("cursor", "none");

    }
}

function showControls() {
    controlsActive = true;
    controlsTimeout = 250;
    r.style.setProperty("--controlsVisible", 1);
    r.style.setProperty("cursor", "pointer");
}

function skip10() {
    video.currentTime += 10;
}

function skipM10() {
    video.currentTime -= 10;
}

function toggleMute() {
    var active = document.getElementById("sound-active");
    var mute = document.getElementById("sound-mute");

    if (muted) {
        video.muted = false;
        muted = false;
        active.style.setProperty("display", "block");
        mute.style.setProperty("display", "none")
    } else {
        video.muted = true;
        muted = true;
        active.style.setProperty("display", "none");
        mute.style.setProperty("display", "block")
    }
}

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function toggleFullscreen() {
    if (!isInFullscreen) {
        openFullscreen();
    } else {
        closeFullscreen();
    }
}

function returnToMainPage() {
    window.location.replace("../index.html");
}

function nextEpisode(number) {
    window.location.replace("vidEp" + number + ".html");
}