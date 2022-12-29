// Toggle Spin Class On Icon
document.querySelector('.toggle i').onclick = function() {
    // toggle class fa-spin for rotation
    this.classList.toggle('fa-spin')
    // toggle class fa-spin for rotation
    document.querySelector('.setting-box').classList.toggle('open')
}

// Check if There's Local Storage Color Option
let mainColors = localStorage.getItem('color-option');

if (mainColors !== null) {
    document.documentElement.style.setProperty('--mainC', mainColors)

    // remove active class From All Childrens
    document.querySelectorAll('.option-box ul li').forEach(element => {
        element.classList.remove('active')

            // add active class on target On Local Storage Item
            if (element.dataset.color === mainColors ) {
                element.classList.add('active');
            }
    })

}

// Switch Color
const colorsLi = document.querySelectorAll('.option-box ul li')
// Loop On All List Item
colorsLi.forEach(li => {
    // Click On All List Item
    li.addEventListener('click' , (e) => {

        // set color on root
        document.documentElement.style.setProperty('--mainC', e.target.dataset.color)

        // set color on local storage 
        localStorage.setItem('color-option', e.target.dataset.color);

        // remove active class From All Childrens
        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active')
        })

        // add active class on target
        e.target.classList.add('active')

    })
})


// random BG option
let backgroundOption = true;

// variable to control interval
let bgInterval;


// Check if There's Local Storage Bg Option
let bGLocal = localStorage.getItem('bg-option');

if (bGLocal !== null) {

    if(bGLocal === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // Remove Active Class From All Spans
    document.querySelectorAll('.option-box .option span').forEach(element => {
        element.classList.remove('active')
    })

    if (bGLocal === 'true') {
        document.querySelector('.yes').classList.add('active')
    } else {
        document.querySelector('.no').classList.add('active')
    }

}


// Switch BG 
const bgLi = document.querySelectorAll('.option-box .option span')
// Loop On All Span's
bgLi.forEach(span => {
    // Click On All Span
    span.addEventListener('click' , (e) => {

        // remove active class From All Spans
        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active')
        })

        // add active class on target
        e.target.classList.add('active')


        if (e.target.dataset.bg === 'yes') {
            
            backgroundOption = true;
            randomizeImage();
            localStorage.setItem('bg-option',true)

        } else {
            backgroundOption = false;
            clearInterval(bgInterval)
            localStorage.setItem('bg-option',false)
        }

    });
});



// Select Langing Page Element 
let landingPage = document.querySelector('.landing-page')

// Get Array Of Imgs
let imgsArray = ['landing-1.jpg','landing-2.jpg','landing-3.jpg','landing-4.png','landing-5.jpg'];




// function to randomize images
function randomizeImage() {
    if (backgroundOption = true) {
        bgInterval = setInterval( () => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change BackGroung Img Url 
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")'
        },1000)
    }
}



// Select Skills Selector 
let ourSkills = document.querySelector('.skills');

window.onscroll = function () {

    // Skills Offset Top 
    let skillsOt = ourSkills.offsetTop;

    // Outer Hight
    let skillsOh = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // window Scroll Top
    let windowScrollTop = this.pageYOffset;


    if (windowScrollTop > (skillsOt + skillsOh - windowHeight ) ) {

        let allSkills = document.querySelectorAll('.skill-box .progress span');
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        });

    };
};



// Create PopUp With The Image
let ourGallery = document.querySelectorAll('.img-box img');

ourGallery.forEach(img => {
    img.addEventListener('click',(e) => {

        //  create overlay element
        let overlay = document.createElement('div');

        //  Add Clas To Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay To Body
        document.body.appendChild(overlay);

        // Create Popup Box
        let popupBox = document.createElement('div');

        //  Add Clas To Overlay
        popupBox.className = 'popup-box';

        // Create Img Box
        let popupImg = document.createElement('img');

        // Set Img Source
        popupImg.src = img.src;

        // Add Img To Popup Box
        popupBox.appendChild(popupImg);

        // Apend popupBox To Body
        document.body.appendChild(popupBox);


        if (img.alt !== null) {
            // Create Heading
            let imgHeading = document.createElement('h3');

            // Create Text Heading
            let imgText = document.createTextNode(img.alt);

            // Append Text To Heading
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }


        // Create Close Span 
        let closeBtn = document.createElement('span');

        // Create The Close Button Text
        let closeBtnText = document.createTextNode('X');

        // Append closeBtnText To The closeBtn
        closeBtn.appendChild(closeBtnText);

        // Add CLass To ClosrBtn
        closeBtn.className = 'close-btn';

        // Append closeBtn To The Popup Box
        popupBox.appendChild(closeBtn);
    });
});


// Close Popup
document.addEventListener('click', function (e) {
    if(e.target.className === 'close-btn') {
        // Remove PopUp
        e.target.parentNode.remove();

        // Remove Overlay 
        document.querySelector('.popup-overlay').remove();
    }
})



// Select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

allBullets.forEach(bulltet => {
    bulltet.addEventListener('click' , (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    });
});



// Reset Function 
document.querySelector('.reset').onclick = function() {

    // to clear any thing saved in local storage but not save 
    // localStorage.clear();

    // to clear any thing saved in local storage
    localStorage.removeItem('color-option');
    localStorage.removeItem('bg-option');
    // to reload page
    window.location.reload();
}


// Toggle Menue
let toggle = document.querySelector('.header .toggle');
let links = document.querySelector('.link-container ul');

toggle.onclick = function(e) {

    this.classList.toggle('m-active');

    links.classList.toggle('open')

    e.stopPropagation();

}

links.onclick = function (e) {
    e.stopPropagation();
}


// If you click anywhere outside menue and toggle  , close the links bar
document.addEventListener('click' , (e) => {
    if (e.target !== toggle && e.target !== links )  {
        if (links.classList.contains('open')) {

            toggle.classList.toggle('m-active');
            links.classList.toggle('open')
        }
    }
})