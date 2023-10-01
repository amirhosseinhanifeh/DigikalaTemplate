// window.onscroll = function () {
// 	var sticky = document.getElementById("fixmenu");
// 	var sticky2 = document.getElementById("res-fixmenu");
//
// 	console.log(sticky);
// 	if (self.pageYOffset > 205) {
// 		sticky.classList.add("mystyle2");
// 		sticky2.classList.add("mystyle3");
// 	}
// 	if (self.pageYOffset < 205) {
// 		sticky.classList.remove("mystyle2");
// 		sticky2.classList.remove("mystyle3");
// 	}
// }
$(document).ready(function () {
	var showChar = 200;  
	var ellipsestext = "...";
	var moretext = "نمایش بیشتر";
	var lesstext = "نمایش کمتر";
	$('.more').each(function() {
		var content = $(this).html();
 
		if(content.length > showChar) {
 
			var newP = content.substr(0, showChar);
			var remainingPart = content.substr(showChar, content.length - showChar);
 
				var html = newP + 
				'<span class="moreellipses">' + 
				ellipsestext+ 
				'&nbsp;</span><span class="morecontent"><span>' + 
				remainingPart +
			 '</span>&nbsp;&nbsp;<a class="morelink">' +
			  moretext +
				'</a></span>';
			$(this).html(html);
		}
	});
 
	$(".morelink").click(function(){
		if($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).html(moretext);
		} else {
			$(this).addClass("less");
			$(this).html(lesstext);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
	// 
	$(".lazy").slick({
		// // lazyLoad: 'ondemand', // ondemand progressive anticipated
		autoplay: true,

		autoplaySpeed: 3000,
		infinite: true,
		dots: false,
		arrows: true,
		cssEase:'linear',
		slidesToShow:1,
		slidesToScroll:1,
		fade: true,
		centerMode: true
	});
	// 
	$(".lazy2").slick({
		// lazyLoad: 'ondemand', // ondemand progressive anticipated
		infinite: true,
		dots: true,
		rtl:true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
	});
	// 
	$(".lazy3").slick({
		// // lazyLoad: 'ondemand', // ondemand progressive anticipated
		autoplay: true,
		autoplaySpeed: 3000,
		infinite: true,
		dots: false,
		arrows: true,
		cssEase:'linear',
		slidesToShow:1,
		slidesToScroll:1,
		fade: true,
		centerMode: true
	});
		// categories
	$('.categories .responsive').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		initialSlide: 3,
		slidesToScroll: 1,
		arrows: true,
		spaceBetween: 30,
		// autoplay: true,
		// autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					spaceBetween: 20,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 15,
				},


			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					spaceBetween: 0,
				},
			}
		],
	});
	//products
	$('.products .responsive').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		initialSlide: 3,
		slidesToScroll: 1,
		arrows: true,
		spaceBetween: 30,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					spaceBetween: 20,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 15,
				},


			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 10,
				},
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					spaceBetween: 0,
				},
			}
		],
	});
	//news
	$('.sec-news .responsive').slick({
		dots: false,
		infinite: true,
		slidesToShow: 3,
		initialSlide: 3,
		slidesToScroll: 1,
		arrows: true,
		spaceBetween: 30,
		// autoplay: true,
		// autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 20,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 15,
				},


			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					spaceBetween: 0,
				},
			}
		],
	});
	//brands
	$('.brands .responsive').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		initialSlide: 3,
		slidesToScroll: 1,
		arrows: true,
		spaceBetween: 30,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					spaceBetween: 20,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 15,
				},


			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					spaceBetween: 0,
				},
			}
		],
	});
	// search
	$(function () {
		$('a[href="#search"]').on('click', function (event) {
			event.preventDefault();
			$('#search').addClass('open');
			$('#search  form  input[type="search"]').focus();
		});

		$('#search, #search button.close').on('click keyup', function (event) {
			if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
				$(this).removeClass('open');
			}
		});

		$('form').submit(function (event) {
			event.preventDefault();
			return false;
		})
	});
	// sidebar
	$('.triggerSidebar').click(function () {
		$('.sidebar').css('left', '0px')
		$('.overlay').css('display', 'block')
	})

	var sembunyikan = function () {
		$('.overlay').css('display', 'none')
		$('.sidebar').css('left', '-320px')
	}

	$('.hideSidebar').click(sembunyikan)
	$('.overlay').click(sembunyikan)
// 
	$('.arrowItem ').click(function () {
		var label = $(this).parent('.acnav__label');
		var parent = label.parent('.has-children');
		var list = label.siblings('.acnav__list');
		if ( parent.hasClass('is-open') ) {
			list.slideUp('fast');
			parent.removeClass('is-open');
		}
		else {
			list.slideDown('fast');
			parent.addClass('is-open');
		}
	});

// 
var value = 1
$(".counter").val(value);
$('.increment').on("click", function () {
	value = parseInt(value + 1);
	$(".counter").val(value);
});
$('.decrement').on("click", function () {
	if (value > 1) {
		value = parseInt(value - 1);
		$(".counter").val(value);
	} else {
		value = 1;
		$(".counter").val(value);
	}
});
// quantity list product
var selectedInput = $('.product-quantity input');
$('.add').click(function () {
	// maximom
	// if (selectedInput.val() < 10) {
	selectedInput[0].stepUp(1);
	// }
});

$('.sub').click(function () {
	if (selectedInput.val() > 1) {
		selectedInput[0].stepDown(1);
	}
});


$(".show-more").click(function () {
	if ($(".text").hasClass("show-more-height")) {
		$(this).text("بستن");
	} else {
		$(this).text("ادامه مطلب");
	}

	$(".text").toggleClass("show-more-height");
});
// 
	$('.related_slider .slider').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		initialSlide: 3,
		slidesToScroll: 1,
		arrows: true,
		spaceBetween: 30,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					spaceBetween: 20,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 15,
				},


			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					spaceBetween: 10,
				},
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					spaceBetween: 0,
				},
			}
		],
	});


	// 
	// activation carousel plugin
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 5,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			0: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 4,
			},
		}
	});
	var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs
		},
	});
	// change carousel item height
	// gallery-top
	let productCarouselTopWidth = $('.gallery-top').outerWidth();
	$('.gallery-top').css('height', productCarouselTopWidth);

	// gallery-thumbs
	let productCarouselThumbsItemWith = $('.gallery-thumbs .swiper-slide').outerWidth();
	$('.gallery-thumbs').css('height', productCarouselThumbsItemWith);

	// activation zoom plugin
	if ($('.easyzoom').length != 0){
		var $easyzoom = $('.easyzoom').easyZoom();
	}
});

// ==========================================================================//
