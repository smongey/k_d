/* jshint devel:true */
"use strict";

var l = function (honk) { console.log(honk); };

var kd = {
	$w : $(window),
	$d : $(document),
	$b : $('body'),
	url : window.location.href,
	slides : [],
	slideIndex : 0
};




kd.$d.on('click', 'a.about', function(e){

	e.preventDefault();
	l('about clicked');
	// $('section.home').toggleClass('out');
	$('a.about').addClass('active');
	$('a.contact').removeClass('active');
	window.history.pushState('', 'About &mdash; Kr&aring;kvik &amp; D&rsquo;Orazio', 'about.html');
	$('section.about, section.contact, section.home').addClass('out');
	setTimeout(function(){
		$('#wrap').empty().load('about.html #wrap > *', function(){
			$('body').removeClass().addClass('about');
			kd.responsiveClasses();
			setTimeout(function(){
				$('section.about').removeClass('out');
			}, 500)
		});
	}, 500);

}).on('click', 'a.contact', function(e){

	e.preventDefault();
	l('contact clicked');
	// $('section.home').toggleClass('out');
	$('a.contact').addClass('active');
	$('a.about').removeClass('active');
	window.history.pushState('', 'Contact &mdash; Kr&aring;kvik &amp; D&rsquo;Orazio', 'contact.html');
	$('section.about, section.contact, section.home').addClass('out');
	setTimeout(function(){
		$('#wrap').empty().load('contact.html #wrap > *', function(){
			$('body').removeClass().addClass('contact');
			kd.responsiveClasses();
			setTimeout(function(){
				$('section.contact').removeClass('out');
			}, 500)
		});
	}, 500);

}).on('click', 'a.logo', function(e){

	e.preventDefault();
	l('home clicked');
	window.history.pushState('', 'Kr&aring;kvik &amp; D&rsquo;Orazio', window.location.origin);
	// $('section.home').toggleClass('out');
	$('a.about, a.contact').removeClass('active');
	$('section.about, section.contact, section.home').addClass('out');
	setTimeout(function(){
		$('#wrap').empty().load('/ #wrap > *', function(){
			$('body').removeClass().addClass('home');
			kd.responsiveClasses();
			setTimeout(function(){
				$('section.home').removeClass('out');
			}, 500)
		});
	}, 500);

}).on('click', 'a.totop', function(e){
	e.preventDefault();
	l(e);
	$('html, body').animate({
		scrollTop: 0
	}, 1000, 'easeInOutQuint');

}).on('click', '.home img', function(e) {
	e.preventDefault();
	// l($(this).data('slide'));
	
	kd.slideIndex = $(this).data('slide');
	l(kd.slideIndex);

	kd.goToSlide(kd.slideIndex);

	$('.slideshow').removeClass('out');
	$('html').css('overflow-y', 'scroll');
	$('body').addClass('noscroll');

}).on('click', '.slideshow', function(e){
	e.preventDefault();
	l(e.target);
	if(e.target == $('.slideshow')[0]) {
		$(this).addClass('out');
		$('html').css('overflow-y', 'hidden');
		$('body').removeClass('noscroll');
		$('.slideshow li').removeClass('active');
	} else {
		l('next slide');
		kd.goToSlide(kd.slideIndex + 1);
	}
}).on('keydown', function(e) {
	if(!$('.slideshow').hasClass('out')) {
		if(e.keyCode == 37 || e.keyCode == 38) {
			l('previous');
			kd.goToSlide(kd.slideIndex - 1);
		} else if(e.keyCode == 39 || e.keyCode == 40) {
			l('next slide');
			kd.goToSlide(kd.slideIndex + 1);
		}
	}
	if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    }
});

kd.$d.ready(function(){
	var url = window.location.pathname;
	if(url.indexOf('contact') > -1) {

		$('body').addClass('contact');
		$('a.contact').addClass('active');
		setTimeout(function(){
			$('section.contact').removeClass('out');
		}, 300);
	} else if (url.indexOf('about') > -1) {

		$('body').addClass('about');
		$('a.about').addClass('active');
		setTimeout(function(){
			$('section.about').removeClass('out');
		}, 300)
	} else {
		$('section.home').removeClass('out');

		$('img:not(.slideshow img)').each(function(){
			kd.slides.push(this.src);
		});
	}
	l(kd.url);
});


// var popped = ('state' in window.history && window.history.state !== null),
// 	initialURL = location.href;

$(window).bind('popstate', function(e) {
	e.preventDefault();
	// var lastlocation
  // Ignore inital popstate that some browsers fire on page load
  // var initialPop = !popped && location.href == initialURL
  // popped = true
  // if (initialPop) return;
  //l(window.history)
  //l(e);


  // showMailOverview(); // exmaple function to display all email since the user has click Back.

});


kd.$d.ready(function(){

    kd.responsiveClasses();

	// setTimeout(function(){
		$('#preloader').removeClass('loading');
	// }, 100);
});


kd.$w.resize(function(){

    kd.responsiveClasses();

});


kd.goToSlide = function(index){
	l(index);
	if (index < 0) {
		kd.slideIndex = kd.slides.length - 1;
	} else if (index == kd.slides.length) {
		kd.slideIndex = 0;
	} else {
		kd.slideIndex = index;
	}
	var slides = $('.slideshow li').toArray();
	$('.slideshow li').removeClass('active');
	$(slides[kd.slideIndex]).addClass('active');
}

// Functions
kd.responsiveClasses = function(){
	var current_width = kd.$w.width();
	//do something with the width value here!
	if(current_width < 499) {
		// phone
		$('body').removeClass("tablet sdesktop desktop super").addClass("phone");
		$('.image').insertBefore('.text');
		setTimeout(function() {
			$('.text').css('width', '99.9%');
		}, 300);
		$('li.contact').insertAfter('li.about');
		$('li.top').insertBefore('li.insta');

		// $('.three > *, .two > *')
		// $('.full:not(.view)').remove();

	} else if(current_width > 500 && current_width < 849) {
		// tablet
		$('body').removeClass("phone sdesktop desktop super").addClass("tablet");
		$('.image').insertBefore('.text');
		$('li.contact').insertAfter('li.logo');
		$('li.top').insertAfter('li.insta');
	} else if (current_width > 850 && current_width < 1100) {
		// sdesktop
		$('body').removeClass("phone tablet desktop super").addClass("sdesktop");
		$('.text').insertBefore('.image');
		$('li.contact').insertAfter('li.logo');
		$('li.top').insertAfter('li.insta');
	} else if (current_width > 1101 && current_width < 1439) {
		// desktop
		$('body').removeClass("phone tablet sdesktop super").addClass("desktop");
		$('.text').insertBefore('.image');
		$('li.contact').insertAfter('li.logo');
		$('li.top').insertAfter('li.insta');
	} else if (current_width > 1440) {
		// super
		$('body').removeClass("phone tablet sdesktop desktop").addClass("super");
		$('.text').insertBefore('.image');
		$('li.contact').insertAfter('li.logo');
		$('li.top').insertAfter('li.insta');
	}
	if(current_width < 650){
		$('body').addClass("mobile");
	}
	if(current_width > 651){
	  $('body').removeClass("mobile");
	}
};

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
