function generateSubject(subjects) {
  var temp = ""
  subjects.forEach(subject => {
    temp += `<a class="item ${subject} lock">
      <img id="item-1" src="/public/images/subjects/${subject}.svg">
      <i class="fa fa-lock"></i>
    </a>`
  })
  return temp;
}

function homeTemplate(data) {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Padhhigh</title>
      <link rel="stylesheet" href="/public/css/home.css">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    </head>
    
    <body>
      <header>
    
        <nav>
          <div id="navbar">
    
            <div id="logo" class="reverse">
              <div class="mobile-btn" style="font-size:30px;cursor:pointer; font-weight:bold; color: #FFB100;"
                onclick="openNav()">&#9776;</div>
              <img class="logo" src="/public/images/logo.png">
            </div>
    
            <div id="links">
              <div class="dropdown">
                <div class="profile">
                  <h4><span class="user-name"></span></h4>
                  <i class="fa fa-angle-down" style="font-size:30px; margin-left: 10px;padding: ;"></i>
                </div>
                <div class="dropdown-content">
                  <a href="/profile" style="font-weight: 400;"><i class="fa fa-edit"></i> Edit Profile</a>
                  <hr>
                  <a href="/logout" style="font-weight: 400;"><i class="fa fa-sign-out"></i> Logout</a>
    
                </div>
              </div>
            </div>
    
          </div>
        </nav>
    
        <!-- Mobile Menu -->
        <div id="mySidenav" class="sidenav">
          <a style="cursor:pointer;" class="closebtn" onclick="closeNav()">&times;</a>
          <a href="/profile"><i class="fa fa-edit"></i> Edit Profile</a>
          <a href="/logout"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
    
      </header>
    
      <section class="section-quiqUnderstanding">
    
        <div class="heading">
          <center>
            <h1>Quiq Understanding</h1>
          </center>
        </div>
    
        <div class="container">
          ${generateSubject(data)}
        </div>
    
        <div class="slogn">
          <center>
            <h2>
              Don't memorise, understand concepts<br> Do Padhhigh, Aim High
            </h2>
          </center>
        </div>
    
      </section>
    
    
      <script>
        function openNav() {
          document.getElementById("mySidenav").style.width = "250px";
        }
        function closeNav() {
          document.getElementById("mySidenav").style.width = "0";
        }
      </script>
      <script src="/public/js/home.js"></script>
    </body>
    
    </html>`
}