const videoplayer = document.querySelector('.video-player');
const video = videoplayer.children[0];
const playlist = videoplayer.children[1];

video.children[0].children[0].src = "/public/videos/Learning D3 Part 1 -  Basic Selections_HD.mp4";

function openExc(e) {
    if (e.target.id !== "chapter-label") return;
    const chapter = e.path[1];
    chapter.classList.toggle('open-excs');
}

function playVideo(e) {
    video.children[0].pause();
    video.children[0].children[0].setAttribute('src', e.target.id);
    video.children[0].load();
    video.children[0].play();
}
