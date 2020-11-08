VANTA.NET({
  el: "#page",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xdb809a,
  backgroundColor: 0xededed,
  points: 20.00,
  maxDistance: 16.00
})

var page = document.getElementById('page').clientHeight;
var mask = document.querySelector('.mask');
const animationH = document.querySelectorAll('._animation');

var navigation = document.getElementById('navigation');
var burger = document.getElementById('burgerButton');

burger.addEventListener('click', function (event) {
    event.preventDefault();

    navigation.classList.toggle('show');
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        navigation.classList.remove('show');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};


window.onscroll = function showHeader () {

    var header = document.querySelector('.header');

    if (window.pageYOffset > (page)) {
        header.classList.add('header_fixed');
    } else {
        header.classList.remove('header_fixed');
    }

}

window.addEventListener('load', () => {
    mask.classList.add('hide');
    setTimeout(() => {
        mask.remove()
    }, 800);
});


if (animationH.length > 0) {
    window.addEventListener('scroll', animScroll);

    function offset(el) {
        const rect = el.getBoundingClientRect(),
              scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    function animScroll() {
        for(let i = 0; i < animationH.length; i++) {
            const animItem = animationH[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight  - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight  - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                animItem.classList.remove('_active');
            }
        }
    }
    animScroll();
}



