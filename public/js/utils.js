const videos = [
    { subject: "evs", lecture: "About Myself", chapter: "chapter 1", link: "https://vimeo.com/548929443/32be5c638a" },
    { subject: "evs", lecture: "Air and water", chapter: "chapter 2", link: "https://vimeo.com/548929574/fdfa99f438" },
    { subject: "evs", lecture: "Animal life", chapter: "chapter 3", link: "https://vimeo.com/548929704/6f06079156" },
    { subject: "evs", lecture: "Clothes", chapter: "chapter 4", link: "https://vimeo.com/548929847/a8ea64a0e6" },
    { subject: "evs", lecture: "Food", chapter: "chapter 5", link: "https://vimeo.com/548929970/6631a9dc18" },
    { subject: "evs", lecture: "Housing", chapter: "chapter 6", link: "https://vimeo.com/548930075/8dbd77ad2b" },
    { subject: "evs", lecture: "Living things and Non Living things", chapter: "chapter 7" },
    { subject: "evs", lecture: "Major Directions", chapter: "chapter 8", link: "https://vimeo.com/548930212/3319f77f67" },
    { subject: "evs", lecture: "Our Family", chapter: "chapter 9", link: "https://vimeo.com/548930314/2b997127e1" },
    { subject: "evs", lecture: "Our Festivals", chapter: "chapter 10", link: "https://vimeo.com/548930435/678961fbe5" },
    { subject: "evs", lecture: "Our Neighborhood", chapter: "chapter 11", link: "https://vimeo.com/548930602/ca6006fbe5" },
    { subject: "evs", lecture: "Our Universe", chapter: "chapter 12", link: "https://vimeo.com/548930797/6b36e2306d" },
    { subject: "evs", lecture: "Our School", chapter: "chapter 13", link: "https://vimeo.com/548930690/73d97fb58a" },
    { subject: "evs", lecture: "Plant Life", chapter: "chapter 14", link: "https://vimeo.com/548930902/4c749911c2" },
    { subject: "evs", lecture: "Safety and First Aid", chapter: "chapter 15", link: "https://vimeo.com/548931018/61e014ddf0" },
    { subject: "evs", lecture: "The Human Body", chapter: "chapter 16", link: "https://vimeo.com/548931173/bc11f9db63" }
];

function updateLinks(link) {
    if (!link) return;
    link = link.replace("vimeo.com", "player.vimeo.com/video");
    return link.split('/').splice(0, 5).join('/');
}

class SortVideoLecture {
    subjects;
    constructor() {
        this.subjects = []
    }
    insertNewSubject({ subject, chapter, lecture, link }) {
        this.subjects.push({
            name: subject,
            chapters: [{
                name: chapter,
                lectures: [{
                    name: lecture,
                    link
                }]
            }]
        })
    }

    insertNewChapter(subject, { lecture, chapter, link }) {
        subject.chapters.push({
            name: chapter,
            lectures: [{
                name: lecture,
                link
            }]
        })
    }

    insertNewLecture(chapter, { lecture, link }) {
        chapter.lectures.push({
            name: lecture,
            link
        })
    }

    findSubject(subjectName) {
        return this.subjects.find(subject => subject.name === subjectName);
    }
    findChapter(subject, chapterName) {
        return subject.chapters.find(chapter => chapter.name === chapterName);
    }

}

const sortLecture = new SortVideoLecture();
videos.forEach(video => {
    const subject = sortLecture.findSubject(video.subject);
    if (!subject) {
        sortLecture.insertNewSubject(video);
        return;
    }
    const chapter = sortLecture.findChapter(subject, video.chapter);
    if (!chapter) {
        sortLecture.insertNewChapter(subject, video);
        return;
    }
    sortLecture.insertNewLecture(chapter, video);
})