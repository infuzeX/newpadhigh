function insertFunctions(unitsLen) {
    let functionsList = "";
    for (let i = 0; i < unitsLen; i++) {
        functionsList += ` function myFunction${i ? i : ""}() {
            var x = document.getElementById("ch${i + 1}");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }`
    }
    return functionsList;
}

function insertlectures(lectures) {
    let lecturesList = ""
    lectures.forEach(lecture => {
        lecturesList += `<li>
        <a href="${lecture.link}" class="meet-title">
            <i class="bx bx-right-arrow"></i>
            ${lecture.name}
        </a>
    </li>`
    })
    return lecturesList;
}

function insertChapters(chapters) {
    let chapterslist = "";
    chapters.forEach((chapter, index) => {
        chapterslist += `<div class="curriculum-list">
        <h4 onclick="myFunction${index ? index : ""}()">Chapter ${index + 1} ${typeof chapter.name === "number" ? "" : ":"+chapter.name}</h4>
        <div style="display:none" id="ch${index + 1}">
            <ul>
                ${insertlectures(chapter.lectures)}
            </ul>
        </div>
    </div>`
    })
    return chapterslist;
}


function mainTemplate(subject, standard) {
    return `<!doctype html>
    <html lang="zxx">
    
    
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
        <!-- Owl Theme Default CSS -->
        <link rel="stylesheet" href="../assets/css/owl.theme.default.min.css">
        <!-- Owl Carousel CSS -->
        <link rel="stylesheet" href="../assets/css/owl.carousel.min.css">
        <!-- Owl Magnific CSS -->
        <link rel="stylesheet" href="../assets/css/magnific-popup.css">
        <!-- Animate CSS -->
        <link rel="stylesheet" href="../assets/css/animate.css">
        <!-- Boxicons CSS -->
        <link rel="stylesheet" href="../assets/css/boxicons.min.css">
        <!-- Flaticon CSS -->
        <link rel="stylesheet" href="../assets/css/flaticon.css">
        <!-- Meanmenu CSS -->
        <link rel="stylesheet" href="../assets/css/meanmenu.css">
        <!-- Nice Select CSS -->
        <link rel="stylesheet" href="../assets/css/nice-select.css">
        <!-- Odometer CSS-->
        <link rel="stylesheet" href="../assets/css/odometer.css">
        <!-- Style CSS -->
        <link rel="stylesheet" href="../assets/css/style.css">
        <!-- Responsive CSS -->
        <link rel="stylesheet" href="../assets/css/responsive.css">
    
        <!-- Favicon -->
        <link rel="icon" type="image/png" href="../assets/img/favicon.png">
        <!-- Title -->
        <title>Padhhigh</title>
    </head>
    
    <body>
        <!-- Start Preloader Area -->
        <div class="loader-wrapper">
            <div class="loader">
                <div class="dot-wrap">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </div>
        <!-- End Preloader Area -->
    
        <!-- Start Navbar Area -->
        <div class="navbar-area">
            <!-- Menu For Mobile Device -->
            <div class="mobile-nav">
                <a href="index.html" class="logo">
                    <img src="../assets/img/logo.png" alt="Logo">
                </a>
            </div>
    
            <!-- Menu For Desktop Device -->
            <div class="main-nav">
                <div class="container-fluid">
                    <nav class="navbar navbar-expand-md">
                        <a class="navbar-brand" href="index.html">
                            <img src="../assets/img/logo.png" alt="Logo">
                        </a>
    
                        <div class="collapse navbar-collapse mean-menu">
                            <ul class="navbar-nav m-auto">
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        Home
    
                                    </a>
    
    
                                </li>
    
    
                                <li class="nav-item">
                                    <a href="https://padhhigh.com" class="nav-link">
                                        QUIQ
    
                                    </a>
    
    
                                </li>
    
    
    
                                <li class="nav-item">
                                    <a href="https://padhhigh.com/#why" class="nav-link">
                                        WHY PADHHIGH ?
    
                                    </a>
    
    
                                </li>
                                <li class="nav-item">
                                    <a href="https://padhhigh.com" class="nav-link active">
                                        FREE DEMO
    
                                    </a>
    
    
                                </li>
    
                                <li class="nav-item">
                                    <a href="https://padhhigh.com" class="nav-link">Contact</a>
                                </li>
    
    
    
    
    
    
    
    
                            </ul>
    
                            <!-- Start Other Option -->
                            <div class="others-option">
                                <div class="option-item">
                                    <i class="search-btn bx bx-search"></i>
                                    <i class="close-btn bx bx-x"></i>
    
                                    <div class="search-overlay search-popup">
                                        <div class='search-box'>
                                            <form class="search-form">
                                                <input class="search-input" name="search" placeholder="Search" type="text">
    
                                                <button class="search-button" type="submit"><i
                                                        class="bx bx-search"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
    
    
                            </div>
                            <!-- End Other Option -->
                        </div>
                    </nav>
                </div>
            </div>
    
            <!-- Start Others Option For Responsive -->
    
            <!-- End Others Option For Responsive -->
        </div>
        <!-- End Navbar Area -->
    
        <!-- Start Page Title Area -->
        <div class="page-title-area bg-25">
            <div class="container">
                <div class="page-title-content">
                    <h2 class="standard-subject">CBSE ${subject.name.toUpperCase()}</h2>
                    <ul>
                        <li class="active standard-class">${standard}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- End Page Title Area -->
    
        <!-- Start Single Course Area -->
        <style>
            .wid {
                display: block;
                margin-left: 3%;
                margin-right: 3%;
            }
    
            a:hover {
                background-color: gray;
            }
    
            a:active {
                background-color: #ffb607;
            }
        </style>
        <script>
        ${insertFunctions(subject.chapters.length)}
        </script>
        <!--lecture section start-->
        <section class="single-course-area ptb-100">
        <div class="tabs_item wid">
        <div class="curriculum-content tab_content ">
            <h3 style="background-color:#ffb607;color:white;text-size:100px">
                <center>CURRICULUM</center>
            </h3>
            ${insertChapters(subject.chapters)}
        </div>
    </div>
        </section>
        <!--lecture section end-->
        <!-- End Single Course Area -->
    
    
    
        <!-- Start Footer Bottom Area -->
        <footer class="footer-bottom-area">
            <div class="container">
                <div class="copyright-wrap">
                    <p>Copyright @2020 PADHHIGH</a></p>
                </div>
            </div>
        </footer>
        <!-- End Footer Bottom Area -->
    
        <!-- Start Go Top Area -->
        <div class="go-top">
            <i class='bx bx-chevrons-up'></i>
            <i class='bx bx-chevrons-up'></i>
        </div>
        <!-- End Go Top Area -->
    
        <!-- Jquery-3.5.1.Slim.Min.JS -->
        <script src="../assets/js/jquery-3.5.1.slim.min.js"></script>
        <!-- Popper JS -->
        <script src="../assets/js/popper.min.js"></script>
        <!-- Bootstrap JS -->
        <script src="../assets/js/bootstrap.min.js"></script>
        <!-- Meanmenu JS -->
        <script src="../assets/js/jquery.meanmenu.js"></script>
        <!-- Wow JS -->
        <script src="../assets/js/wow.min.js"></script>
        <!-- Owl Carousel JS -->
        <script src="../assets/js/owl.carousel.js"></script>
        <!-- Owl Magnific JS -->
        <script src="../assets/js/jquery.magnific-popup.min.js"></script>
        <!-- Nice Select JS -->
        <script src="../assets/js/jquery.nice-select.min.js"></script>
        <!-- Parallax JS -->
        <script src="../assets/js/parallax.min.js"></script>
        <!-- Appear JS -->
        <script src="../assets/js/jquery.appear.js"></script>
        <!-- Odometer JS -->
        <script src="../assets/js/odometer.min.js"></script>
        <!-- Form Validator JS -->
        <script src="../assets/js/form-validator.min.js"></script>
        <!-- Contact JS -->
        <script src="../assets/js/contact-form-script.js"></script>
        <!-- Ajaxchimp JS -->
        <script src="../assets/js/jquery.ajaxchimp.min.js"></script>
        <!-- Custom JS -->
        <script src="../assets/js/custom.js"></script>
    </body>
    
    
    </html>`
}