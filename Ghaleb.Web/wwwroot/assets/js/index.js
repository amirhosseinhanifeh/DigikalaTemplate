$(document).ready(function () {
    //Ripple
    let $btnRipple = $('.btn--ripple'),
        $btnRippleInk, btnRippleH, btnRippleX, btnRippleY;
    $btnRipple.on('mouseenter', function (e) {
        let $t = $(this);
        if ($t.find(".btn--ripple-ink").length === 0) {
            $t.prepend("<span class='btn--ripple-ink'></span>");
        }

        $btnRippleInk = $t.find(".btn--ripple-ink");
        $btnRippleInk.removeClass("btn--ripple-animate");
        if (!$btnRippleInk.height() && !$btnRippleInk.width()) {
            btnRippleH = Math.max($t.outerWidth(), $t.outerHeight());
            $btnRippleInk.css({height: btnRippleH, width: btnRippleH});
        }

        btnRippleX = e.pageX - $t.offset().left - $btnRippleInk.width() / 2;
        btnRippleY = e.pageY - $t.offset().top - $btnRippleInk.height() / 2;
        $btnRippleInk.css({top: btnRippleY + 'px', left: btnRippleX + 'px'}).addClass("btn--ripple-animate");
    });
    //menu
    $('header .menu-button').on('click',function () {
        $('.menu-nav').css('right','0')
    })
    $('.menu-nav .fa-close').on('click',function () {
        $('.menu-nav').css('right','-16rem')
    })
    $('.menu-m .fa-plus').on('click',function () {
        $(this).css('display','none')
        $('.fa-minus').css('display','block')
        $(this).parent().find('.sub-menu').slideDown(300)
    })
    $('.menu-m .fa-minus').on('click',function () {
        $(this).css('display','none')
        $('.fa-plus').css('display','block')
        $(this).parent().find('.sub-menu').slideUp(300)
    })
    //
    var targetOffset = $(" header").offset().top;

    var $w = $(window).scroll(function(){
        if ( $w.scrollTop() > targetOffset ) {
            $(' header').css({
                'background-color' : '#fff',
                'position' : 'fixed',
                'top': 0,
                'width': '100%',
                'border-radius': '0',
                'padding': '10px 14%',
            })
        } else {
            $(' header').css({
                'background-color' : '#ffffff7d',
                'position' : 'absolute',
                'top': '1.5rem',
                'width': '75%',
                'border-radius': '34px',
                'padding': '10px',
            })
        }
    });
    // swiper
    var headerSwiper = new Swiper(".hero-swiper", {
        speed : 1000,
        navigation: {
            nextEl: ".prev-slider",
            prevEl: ".next-slider",
        },

        loop:true,
        autoplay :{
            delay : 3000,
            disableOnInteraction : false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,

        },
    });
    var CategorySwiper = new Swiper(".Category-slider", {
        loop: true,
        navigation: {
            nextEl: ".prev-slider",
            prevEl: ".next-slider",
        },
        breakpoints: {
            // when window width is >= 0
            0: {
                slidesPerView: 1,
                spaceBetween: 82,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 82,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 82,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 85,
            }
        }
    });
    var productSlider = new Swiper('.product-swiper', {
        loop: true,
        navigation: {
            nextEl: ".prev-slider",
            prevEl: ".next-slider",
        },
        breakpoints: {
            // when window width is >= 0
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 40,
            }
        }
    })
    var blogSlider = new Swiper('.blog-swiper', {
        loop: true,
        navigation: {
            nextEl: ".prev-slider",
            prevEl: ".next-slider",
        },
        breakpoints: {
            // when window width is >= 0
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    })
    var slickSwiper = new Swiper('.slick-list-swiper', {
        loop: true,
        navigation: {
            nextEl: ".prev-slider",
            prevEl: ".next-slider",
        },
        autoplay :{
            delay : 3000,
            disableOnInteraction : false,
        },
        breakpoints: {
            // when window width is >= 0
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 40,
            }
        }
    })
    var slider_swiper = new Swiper('.slider_swiper', {
        loop: true,
        navigation: {
            nextEl: ".prev-slider",
            prevEl: ".next-slider",
        },
        breakpoints: {
            // when window width is >= 0
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 40,
            }
        }
    })
})