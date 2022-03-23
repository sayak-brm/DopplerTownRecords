new fullpage("#fullpage", { autoscrolling: true, navigation: true, navigationPosition: 'left' });

VANTA.DOTS({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x2047ff,
    color2: 0x00ffffff,
    backgroundColor: 0xffffff,
    size: 2.0,
    spacing: 25.00
})

// Wrap every letter in a span
var textWrapper1 = document.querySelector('.sec1 #primary');
textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.sec1 #primary .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: (el, i) => 150 * (i + 1)
    });

var textWrapper2 = document.querySelector('.sec1 #welcome #text');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter' style='opacity: 0;'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.sec1 #welcome .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 1400
    })
    .add({
        targets: '.sec1 #welcome .line',
        translateX: [0, document.querySelector('.sec1 #welcome #text').getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 1400,
        delay: 100
    }).add({
        targets: '.sec1 #welcome .letter',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1500,
        offset: '-=1300',
        delay: (el, i) => 34 * (i + 1)
    })
    .add({
        targets: '.sec1 #welcome .line',
        scaleY: [1, 0],
        opacity: [1, 0.5],
        translateX: [document.querySelector('.sec1 #welcome #text').getBoundingClientRect().width + 10, document.querySelector('.sec1 #welcome #text').getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        offset: '-=750',
        duration: 1400
    });

var textWrapper3 = document.querySelectorAll('.splittable');
textWrapper3.forEach((elem) => {
    elem.innerHTML = elem.innerHTML.replace(/\S/g, "<span class='letter'>$&</span>");
});


anime.timeline({ loop: false })
    .add({
        targets: '.section #secondary .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
    });

var basicTimeline = anime.timeline({
    autoplay: false
});

var pathEls = $(".check");
for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline
    .add({
        targets: ".submittext",
        duration: 1,
        opacity: "0"
    })
    .add({
        targets: ".button",
        duration: 1300,
        height: 10,
        width: 300,
        backgroundColor: "#2B2D2F",
        border: "0",
        borderRadius: 100
    })
    .add({
        targets: ".progress-bar",
        duration: 2000,
        width: 300,
        easing: "linear"
    })
    .add({
        targets: ".button",
        width: 0,
        duration: 1
    })
    .add({
        targets: ".progress-bar",
        width: 80,
        height: 80,
        delay: 500,
        duration: 750,
        borderRadius: 80,
        backgroundColor: "#a0a2d8"
    })
    .add({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: 200,
        easing: "easeInOutSine"
    });

const firebaseConfig = {
    apiKey: "AIzaSyCK3R2CVvSoo9kt9o29_rCEHWMcsSXshpY",
    authDomain: "dopplertown-records.firebaseapp.com",
    projectId: "dopplertown-records",
    databaseURL: "https://dopplertown-records-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "dopplertown-records.appspot.com",
    messagingSenderId: "795415623175",
    appId: "1:795415623175:web:d074d2ceae09a00bf89ca2"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
let emailid = document.getElementById('email');

async function writeUserData(email) {
    data = await database.ref('mailinglist').orderByChild('email').equalTo(email).once('value');
    emref = null;
    data.forEach((child) => { emref = child.ref; });
    if (emref != null) {
        emref.update({
            email: email,
            subscribed: true,
        });
    } else {
        database.ref('mailinglist').push({
            email: email,
            subscribed: true,
        });
    }
}

function write() {
    writeUserData(emailid.value);
}

$(".button").click(function () {
    basicTimeline.play();
    write();
});

$("#splash").fadeOut(500);
