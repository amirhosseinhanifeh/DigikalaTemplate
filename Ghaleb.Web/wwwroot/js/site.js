// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const slideshow = new Swiper('.slideshow', {
    // Optional parameters
    loop: true,
    autoplay: true,
});
const products = new Swiper('.products', {
    // Optional parameters
    loop: true,
    scrollbar: false,
    // If we need pagination

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: true,
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
        1440: {
            slidesPerView: 6,
            spaceBetween: 50,
        },
    },
});

