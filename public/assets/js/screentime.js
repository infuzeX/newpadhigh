class VideoScreenTimeRecorder {
    chapter;
    duration;
    startTime;
    watchTime;

    constructor(chapter, lectureDuration) {
        this.chapter = chapter;
        this.duration = lectureDuration;
        this.startTime = 0;
        this.watchTime = 0;
    }

    recordStartTime() {
        this.startTime = Date.now();
    }
    recordWatchTime() {
        const seconds = ((Date.now() - this.startTime) / 1000).toFixed(2);
        this.watchTime += Number.parseFloat(seconds);
    }

    getRecordedData() {
        return {
            chapter: this.chapter,
            duration: this.duration,
            watchTime: this.watchTime
        }
    }
}