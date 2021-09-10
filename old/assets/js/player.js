function openExc(e) {
    if(e.target.id !== "chapter-label") return;
    const chapter = e.path[1];
    chapter.classList.toggle('open-excs');
}
