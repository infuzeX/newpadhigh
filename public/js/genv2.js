let selectedFile = null, selectedStandard = 'CLASS-1', selectedMedium = 'English', videosObject = null, subjects = [];
const html = document.querySelector('html');

//get file inputs
document.getElementById('file').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})
document.getElementById('standard').addEventListener("change", (event) => {
    selectedStandard = event.target.value;
})
document.getElementById('medium').addEventListener("change", (event) => {
    selectedMedium = event.target.value;
})

document.getElementById('button').addEventListener("click", async () => {
    if (selectedFile) {
        const subjectsInGrade = [];
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook.SheetNames)
            //convert excel to json
            console.log(selectedStandard);
            videosObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[selectedStandard]);
            console.log(videosObject);
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
            console.log(sortLecture.subjects);
            //generate classes
            sortLecture.subjects.forEach(async subjectData => {
                try {
                    subjectsInGrade.push(subjectData.name)
                    const temp = await playerTemplate(subjectData, selectedStandard);
                    const resp = await fetch('/genhtml-v2', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            standard: selectedStandard,
                            medium: selectedMedium,
                            subject: subjectData.name,
                            htmlString: temp
                        })
                    })
                    var res = await resp.json();
                    if (subjectsInGrade.length === sortLecture.subjects.length)
                        res = await genHome()
                    console.log(res);
                } catch (err) {
                    console.log(err)
                }
            })
            //generate home page
            async function genHome() {
                const temp = homeTemplate(subjectsInGrade)
                const rawRes = await fetch('/genhome', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        standard: selectedStandard,
                        medium: selectedMedium,
                        subjects: subjectsInGrade,
                        htmlString: temp
                    })
                })
                return await rawRes.json();
            }

        }
    } else {
        alert('Please Select a Excel File!');
    }
});
