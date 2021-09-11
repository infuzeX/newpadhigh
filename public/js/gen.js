let selectedFile = null, selectedStandard = 'CLASS 1', selectedMedium = 'English', videosObject = null, subjects = [];
const html = document.querySelector('html');

//get file inputs
document.getElementById('file').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})
document.getElementById('standard').addEventListener("change", (event) => {
    selectedStandard = event.target.value;
})

document.getElementById('button').addEventListener("click", () => {
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook.SheetNames)
            //convert excel to json
            videosObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[selectedStandard]);
            //update links
            videosObject.map(video => video.link = updateLinks(video.link));
            //sort link for subject
            const sortLecture = new SortVideoLecture();
            videosObject.forEach(video => {
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
            console.log(sortLecture.subjects)
            sortLecture.subjects.forEach(async subject => {
                try {
                    const temp = await mainTemplate(subject, selectedStandard);
                    const resp = await fetch('/genhtml', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            standard:selectedStandard,
                            subject: subject.name,
                            htmlString: temp
                        })
                    })
                    const res = await resp.json();
                    console.log(res);
                } catch (err) {
                    console.log(err)
                }
            })
        }
    } else {
        alert('Please Select a Excel File!');
    }
});
