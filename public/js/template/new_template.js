function addExcercises(excercises) {
    let excs = "";
    excercises.forEach((video, index) => {
        excs += `<li onclick="playVideo(event)" id="${video.link}">${video.name}</li>`
    })
    return excs;
}
function addChapters(chapters) {
    let chpts = "";
    chapters.forEach((chapter, index) => {
        chpts += `<li onclick="openExc(event)" class="chapter">
      <label id="chapter-label">${chapter.name}</label>
      <ul class="excs">
        ${addExcercises(chapter.lectures)};
      </ul>
    </li>`
    });
    return chpts;
}

function playerTemplate(data, standard) {
    return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/public/css/player.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&display=swap"
          rel="stylesheet">
      <title>Padhhigh</title>
  </head>
  
  <body>
      <header>
          <div class="head">
              <div onclick="toggleMenu()" class="menu">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <img src="/public/images/logo.png">
          </div>
          <div class="nav">
              <h2>${standard.split('-').join(' ').toUpperCase()} - CBSE</h2>
              <ul class="nav-list">
                  <li onclick="toggleMenu()" id="close">
                      <i class="fa fa-times"></i>
                  </li>
                  <li id="profile"><img src="/public/images/user.png"></li>
                  <li><a><i class="fa fa-edit"></i>&nbsp;&nbsp;Edit Profile</a></li>
                  <li><a><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a></li>
              </ul>
          </div>
      </header>
  
      <div class="content">
          <h2>${data.name.toUpperCase()}</h2>
          <!--video player start-->
          <div class="video-player">
              <div class="video">
                  <video height="100%" controls>
                      <source src="" type="video/mp4">
                  </video>
              </div>
  
              <div class="playlists">
                  <span><i class="fa fa-list"></i>&nbsp;&nbsp;Lectures</span>
                  <ul class="videos chapters">
                      ${addChapters(data.chapters)}
                  </ul>
              </div>
          </div>
          <ul class="watchTime"></ul>
          <!--video player end-->
      </div>
  
  </body>
  
  <script defer src="/public/js/index.js"></script>
  <script defer src="/public/js/player.js"></script>
  
  </html>`
}