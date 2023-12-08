/* swiper js */
var swiper = new Swiper(".keyboard-control", {
    slidesPerView: 3,
    spaceBetween: 30,
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false
    },
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        420: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

/* gallery js */
var lightboxVideo = GLightbox({
    selector: '.glightbox'
});
lightboxVideo.on('slide_changed', ({ prev, current }) => {
    console.log('Prev slide', prev);
    console.log('Current slide', current);

    const { slideIndex, slideNode, slideConfig, player } = current;
});
/* gallery js */

/* sticky */
$(document).ready(function () {

    var stickyElement = $(".sticky"),
        stickyClass = "sticky-pin",
        stickyPos = 68, //Distance from the top of the window.
        stickyHeight;

    //Create a negative margin to prevent content 'jumps':
    stickyElement.after('<div class="jumps-prevent"></div>');
    function jumpsPrevent() {
        stickyHeight = stickyElement.innerHeight();
        stickyElement.css({ "margin-bottom": "-" + stickyHeight + "px" });
        stickyElement.next().css({ "padding-top": + stickyHeight + "px" });
    };
    jumpsPrevent(); //Run.

    //Function trigger:
    $(window).resize(function () {
        jumpsPrevent();
    });

    //Sticker function:
    function stickerFn() {
        var winTop = $(this).scrollTop();
        //Check element position:
        winTop >= stickyPos ?
            stickyElement.addClass(stickyClass) :
            stickyElement.removeClass(stickyClass) //Boolean class switcher.
    };
    stickerFn(); //Run.

    //Function trigger:
    $(window).scroll(function () {
        stickerFn();
    });

});
/* sticky */

/* cover image */
$(".cover-image").each(function () {
    var attr = $(this).attr('data-bs-image-src');
    if (typeof attr !== typeof undefined && attr !== false) {
        $(this).css('background', 'url(' + attr + ') center center');
    }
});
/* cover image */

/* tooltip installation */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
/* tooltip installation */

/* counter js */
$(window).on("load resize", function () {

    var counters = $(".count");
    var countersQuantity = counters.length;
    var counter = [];

    for (i = 0; i < countersQuantity; i++) {
        counter[i] = parseInt(counters[i].innerHTML);
    }

    var count = function (start, value, id) {
        var localStart = start;
        setInterval(function () {
            if (localStart < value) {
                localStart++;
                counters[id].innerHTML = localStart;
            }
        }, 5);
    }

    for (j = 0; j < countersQuantity; j++) {
        count(0, counter[j], j);
    }
});
/* counter js */

/* back to top */
const scrollToTop = document.querySelector(".scrollToTop");
const $rootElement = document.documentElement;
const $body = document.body;
window.onscroll = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const clientHt = $rootElement.scrollHeight - $rootElement.clientHeight;
    if (window.scrollY > 100) {
        scrollToTop.style.display = "flex";
    } else {
        scrollToTop.style.display = "none";
    }
};
scrollToTop.onclick = () => {
    window.scrollTo(0, 0);
};
/* back to top */


// ==== for menu scroll
const pageLink = document.querySelectorAll(".nav-scroll");

pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(elem.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            offsetTop: 1 - 60,
        });
    });
});

// section menu active
function onScroll(event) {
    const sections = document.querySelectorAll(".nav-scroll");
    const scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
        const currLink = sections[i];
        const val = currLink.getAttribute("href");
        const refElement = document.querySelector(val);
        const scrollTopMinus = scrollPos + 73;
        if (
            refElement.offsetTop <= scrollTopMinus &&
            refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
            document.querySelector(".nav-scroll").classList.remove("active");
            currLink.classList.add("active");
        } else {
            currLink.classList.remove("active");
        }
    }
}

window.document.addEventListener("scroll", onScroll);

// Select all elements with the class "live-chat"
const liveChatElements = document.querySelectorAll(".live-chat");

// Define a function to recursively search for elements within iframes
function querySelectorAllInIframes(selector, contentWindow = window) {
    let elements = [];
    
    // Select all iframes within the current window's document
    const iframes = contentWindow.document.body.querySelectorAll('iframe');
    
    // Recursively search within each iframe
    iframes.forEach(iframe => {
        elements = elements.concat(querySelectorAllInIframes(selector, iframe.contentWindow));
    });
    
    // Select elements matching the provided selector within the current window's document
    const matchingElements = Array.from(contentWindow.document.body.querySelectorAll(selector));
    
    if (matchingElements.length > 0) {
        // Simulate a click on the first matching element
        matchingElements[0].click();
    }
    
    return elements;
}

// Add a click event listener to all elements with the class "live-chat"
liveChatElements.forEach(liveChatElement => {
    liveChatElement.addEventListener('click', () => {
        console.log("Working");
        // Search for elements with the ID "button-body" within iframes
        querySelectorAllInIframes('#button-body');
    });
});