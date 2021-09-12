let selectedFile = null, selectedStandard = 'CLASS-1', selectedMedium = 'english', videosObject = null, subjects = [];
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

const setStatus = (res) => {
    const status = document.querySelector('.status');
    const li = document.createElement('li');
    li.innerText = res.message;
    li.style.color = res.status !== "success" ? "orangered" : "yellowgreen";
    status.appendChild(li);
}

const convertFileIntoJson = (file, sheetName) => {
    let fileReader = new FileReader();
    var rawData = null;
    return new Promise((resolve, reject) => {
        //read file
        fileReader.readAsBinaryString(file);
        //parse json from file
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook.SheetNames)
            //convert excel to json
            rawData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        }
        fileReader.onloadend = () => resolve(rawData);
        fileReader.onerror = (err) => reject(err)
    })
}

const sortSubjectLecture = (videosObject) => {
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
    });
    return sortLecture.subjects;
}

//generate home page
async function genHome(data) {
    const rawRes = await fetch('/genhome', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await rawRes.json();
}

document.getElementById('button').addEventListener("click", async () => {
    if (!selectedFile) setStatus({ status: "error", message: "PLease Select A File!" });
    const subjectsInGrade = [];
    const rawSubjectData = await convertFileIntoJson(selectedFile, selectedStandard);
    const subjectLectures = sortSubjectLecture(rawSubjectData);
    //generate class subject player page
    for await (subjectData of subjectLectures) {
        try {
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
            subjectsInGrade.push(subjectData.name)
            setStatus(res);
        } catch (err) {
            setStatus(err)
        }
    }

    //generate class home
    try {
        const data = {
            standard: selectedStandard,
            medium: selectedMedium,
            subjects: subjectsInGrade
        }
        data["htmlString"] = homeTemplate(data.subjects)
        const res = await genHome(data);
        setStatus(res);
    } catch (err) {
        setStatus(err);
    }
});
