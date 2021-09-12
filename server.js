const express = require('express');
const app = express();
const utils = require('util');
const fs = require('fs');

const exists = utils.promisify(fs.exists);
const mkdir = utils.promisify(fs.mkdir);
const writeFile = utils.promisify(fs.writeFile);

app.use('/public', express.static('public'));
//body prser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//test route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/player', (req, res) => {
    res.sendFile(__dirname + '/public/player.html')
});
//form route
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});
app.get('/form-v2', (req, res) => {
    res.sendFile(__dirname + '/public/formv2.html');
});
app.get('/:medium/:standard/:subject', (req, res) => {
    res.sendFile(__dirname + `/public/${req.params.medium}/${req.params.standard}/${req.params.subject}.html`);
})

//generate v1 html page 
app.post('/genhtml', async (req, res) => {
    try {
        const isDirExist = await exists(`${__dirname}/public/${req.body.standard}`);
        console.log(isDirExist)
        if (!isDirExist) {
            await mkdir(`${__dirname}/public/${req.body.standard}`);
        }
        await writeFile(`${__dirname}/public/${req.body.standard}/${req.body.subject}.html`, req.body.htmlString);
        return await res.json({
            status: "success",
            message: "created successfully"
        })
    } catch (err) {
        return res.json({
            status: "error",
            message: err
        })
    };
})

//generate v2 html page [player.html]
app.post('/genhtml-v2', async (req, res) => {
    try {
        console.log(`${__dirname}/public/${req.body.medium}/${req.body.standard}`)
        const isDirExist = await exists(`${__dirname}/public/${req.body.medium}/${req.body.standard}`);
        console.log(isDirExist)
        if (!isDirExist) {
            console.log("Creating Directory!");
            await mkdir(`${__dirname}/public/${req.body.medium}/${req.body.standard}/`);
        }
        await writeFile(`${__dirname}/public/${req.body.medium}/${req.body.standard}/${req.body.subject}.html`, req.body.htmlString);
        return res.status(200).json({ status: "success", message: `${req.body.subject} Subject From Class ${req.body.standard.split('-').join(' ')} Created Successfully in ${req.body.medium} Medium` })
    } catch (err) {
        return res.status(400).json({ status: "error", message: `Error  while creating home page: ${err.message}` })
    }
});

//generate v2 html page [player.html]
app.post('/genhome', async (req, res) => {
    try {
        await writeFile(`${__dirname}/public/${req.body.medium}/${req.body.standard}/home.html`, req.body.htmlString);
        return res.status(200).json({ status: "success", message: "home page created successfully" })
    } catch (err) {
        return res.status(400).json({ status: "error", message: `Error  while creating home page: ${err.message}` })
    }
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`UP AND RUNNING ON PORT ${PORT}`));