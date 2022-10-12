'use strict';

const navbar = document.querySelector('[data-navbar]');
const header = document.querySelector('.header');

header.addEventListener('click', function(e) {
    let button = e.target.closest('button');
    let link = e.target.closest('.navbar-link');
    if(button || link) {
        e.preventDefault();
        navbar.classList.toggle('active');
    }
});


window.addEventListener('scroll', function(e) {
    if(window.scrollY > 120) {
        header.classList.add('fixed');
    } else if(window.scrollY < 50){
        header.classList.remove('fixed');
    }
})


const carouselWrapper = document.querySelector('.carousel-list');
const buttonPrev = document.querySelector('[data-carousel-prev]');
const buttonNext = document.querySelector('[data-carousel-next]');
let carouselItems = document.querySelectorAll('.carousel-item');

function setClasses(index) {
    let carouselItems = document.querySelectorAll('.carousel-item');
    for(let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].classList.remove('active');
        if(i == index) {
            carouselItems[i].classList.add('active');
        }
    }
}

function delay(elem, first) {
    carouselItems = document.querySelectorAll('.carousel-item');
    setTimeout(() => {
        elem.remove();
        if(first) {
            carouselWrapper.append(elem);
        } else {
            carouselWrapper.insertBefore(elem, carouselItems[0]);
        }
        
        
    }, 100);
}


function move(direction) {
    carouselItems = document.querySelectorAll('.carousel-item');
    let index = 1;
    let firstElement = carouselItems[0];
    let lastElement = carouselItems[carouselItems.length - 1];
    if(direction == 'prev') {

        carouselWrapper.style.left = carouselItems[0].clientWidth + 5 + 'px';
        index--;
        if(index < 0) index = carouselItems.length - 1;
        setClasses(index);
        delay(lastElement, null);

    } else if(direction == 'next') {

        carouselWrapper.style.left = -carouselItems[0].clientWidth + 5 + 'px';
        index++;
        if(index > carouselItems.length - 1) index = 0;
        setClasses(index);
        delay(firstElement, true);

    }

    carouselWrapper.style.left = 0;    
}

buttonPrev.addEventListener('click', function() {
    move('prev');
});

buttonNext.addEventListener('click', function() {
    move('next');
});