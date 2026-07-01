/* ==========================================================
   FOR OMAR ❤️
   Romantic Anniversary Website
   script.js
========================================================== */

// ==========================================================
// ELEMENTS
// ==========================================================

const overlay = document.getElementById("passwordOverlay");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");

const mainContent = document.getElementById("mainContent");

const music = document.getElementById("bgMusic");

const playPauseBtn = document.getElementById("playPause");
const playPauseIcon = playPauseBtn.querySelector("i");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const heartsContainer = document.getElementById("hearts-container");

// ==========================================================
// PASSWORD
// ==========================================================

function unlockWebsite() {

    const password = passwordInput.value.trim().toLowerCase();

    if (password === "love") {

        overlay.classList.add("hide");

        mainContent.classList.add("show");

        music.play().catch(() => {});

        playPauseIcon.classList.remove("fa-play");
        playPauseIcon.classList.add("fa-pause");

    } else {

        errorMessage.textContent = "Wrong magic word ❤️";

        passwordInput.value = "";

        passwordInput.focus();

    }

}

unlockBtn.addEventListener("click", unlockWebsite);

passwordInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        unlockWebsite();

    }

});

// ==========================================================
// PLAY / PAUSE
// ==========================================================

playPauseBtn.addEventListener("click", function(){

    if(music.paused){

        music.play();

        playPauseIcon.classList.remove("fa-play");
        playPauseIcon.classList.add("fa-pause");

    }

    else{

        music.pause();

        playPauseIcon.classList.remove("fa-pause");
        playPauseIcon.classList.add("fa-play");

    }

});

// ==========================================================
// DURATION
// ==========================================================

music.addEventListener("loadedmetadata", ()=>{

    progressBar.max = Math.floor(music.duration);

    duration.textContent = formatTime(music.duration);

});

// ==========================================================
// UPDATE PROGRESS
// ==========================================================

music.addEventListener("timeupdate", ()=>{

    progressBar.value = music.currentTime;

    currentTime.textContent = formatTime(music.currentTime);

});

// ==========================================================
// SEEK
// ==========================================================

progressBar.addEventListener("input", ()=>{

    music.currentTime = progressBar.value;

});

// ==========================================================
// SONG ENDED
// ==========================================================

music.addEventListener("ended", ()=>{

    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");

});

// ==========================================================
// TIME FORMAT
// ==========================================================

function formatTime(seconds){

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2,"0")}`;

}

// ==========================================================
// FLOATING HEARTS
// ==========================================================

const heartIcons = [

    "❤",
    "💕",
    "💖",
    "💗",
    "💘"

];

function createHeart(){

    const heart = document.createElement("span");

    heart.classList.add("heart");

    heart.innerHTML =
        heartIcons[Math.floor(Math.random()*heartIcons.length)];

    heart.style.left = Math.random()*100 + "%";

    heart.style.fontSize =
        (18 + Math.random()*25) + "px";

    heart.style.animationDuration =
        (8 + Math.random()*8) + "s";

    heart.style.opacity =
        Math.random();

    heartsContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },16000);

}

setInterval(createHeart,350);

// ==========================================================
// SCROLL REVEAL
// ==========================================================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach((item)=>{

        const windowHeight = window.innerHeight;

        const revealTop = item.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ==========================================================
// AUTO FOCUS
// ==========================================================

window.onload = ()=>{

    passwordInput.focus();

};

// ==========================================================
// PREVENT DRAGGING IMAGES
// ==========================================================

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});

// ==========================================================
// LOOP VIDEO (OPTIONAL)
// ==========================================================

const video = document.querySelector("video");

if(video){

    video.loop = true;

}

// ==========================================================
// LITTLE SURPRISE
// Every click creates a tiny heart
// ==========================================================

document.addEventListener("click",function(e){

    if(overlay.classList.contains("hide")){

        const heart = document.createElement("div");

        heart.innerHTML = "❤";

        heart.style.position = "fixed";

        heart.style.left = e.clientX + "px";

        heart.style.top = e.clientY + "px";

        heart.style.pointerEvents = "none";

        heart.style.fontSize = "20px";

        heart.style.zIndex = "99999";

        heart.style.transition = "all 1s ease";

        document.body.appendChild(heart);

        requestAnimationFrame(()=>{

            heart.style.transform =
                "translateY(-70px) scale(2)";

            heart.style.opacity = "0";

        });

        setTimeout(()=>{

            heart.remove();

        },1000);

    }

});
