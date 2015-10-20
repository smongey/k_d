/* jshint devel:true */

var l = function (honk) { console.log(honk); };

var kd = {
	$w : $(window),
	$d : $(document),
	$b : $('body'),
	url : window.location.href,
	home : 'http://' + window.location.host + '/index.html',
	slides : [],
	currIndex : 0
};


kd.$d.keypress(function (e) {
    l(e.keyCode);
    if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    	l('triggered');
    }
});

kd.$d.on('click', 'a.about', function(e){

	kd.ajaxReq(e, 'about')

}).on('click', 'a.contact', function(e){

	kd.ajaxReq(e, 'contact');

}).on('click', 'a.logo', function(e){

	kd.ajaxReq(e, 'home');

}).on('click', 'a.totop', function(e){

	e.preventDefault();

	$('html, body').animate({
		scrollTop: '0'
	}, 1000, 'easeInOutQuint');

}).on('click', '.home .third, .home .half', function(e){
	l($(this).find('img').attr('src').length);
});


kd.$w.load(function(){
	setTimeout(function(){
		$('#loader').addClass('out');
	}, 500);
});


kd.$d.ready(function(){
	var url = window.location.pathname;
	if(url.indexOf('contact') > -1) {

		$('body').addClass('contact');
		$('a.contact').addClass('active');
		$('section.contact').removeClass('out');

	} else if (url.indexOf('about') > -1) {

		$('body').addClass('about');
		$('a.about').addClass('active');
		$('section.about').removeClass('out');

	} else {

		$('section.home').removeClass('out');

		kd.makeSlider();


	}
	l(kd.url);

	$('#loader .logo').removeClass('out')
});

// var popped = ('state' in window.history && window.history.state !== null),
// 	initialURL = location.href;

$(window).bind('popstate', function(e) {
	e.preventDefault();
	// l(location.href.indexOf('index'));
	if(location.href.indexOf('index') > 0) {
		// l('home');
		kd.ajaxReq(e, 'home');
	} else if (location.href.indexOf('contact') > 0) {
		// l('contact');
		kd.ajaxReq(e, 'contact');
	} else if (location.href.indexOf('about') > 0) {
		// l('about');
		kd.ajaxReq(e, 'about');
	}


	// var lastlocation
  // Ignore inital popstate that some browsers fire on page load
  // var initialPop = !popped && location.href == initialURL
  // popped = true
  // if (initialPop) return;
  // l(window.history)
  // l(e);


  // showMailOverview(); // exmaple function to display all email since the user has click Back.

});



kd.ajaxReq = function(e){

	switch(arguments[1]) {
		case "home":
			
			e.preventDefault();
			if (e.type === 'click') { 
				window.history.pushState('', 'Kr&aring;kvik &amp; D&rsquo;Orazio', kd.home);
				l('h fired');
			}
			$('a.about, a.contact').removeClass('active');
			$('section.about, section.contact, section.home').addClass('out');
			setTimeout(function(){
				$('#wrap').empty().load(kd.home + ' #wrap > *', function(){
					$('body').removeClass().addClass('home');
					setTimeout(function(){
						$('section.home').removeClass('out');
					}, 500)
				});
			}, 500);

			if (kd.slides === []){
				l('arse');
			}

			break;

		case "contact":
			
			e.preventDefault();
			$('a.contact').addClass('active');
			$('a.about').removeClass('active');
			if (e.type === 'click') { 
				window.history.pushState('', 'Contact &mdash; Kr&aring;kvik &amp; D&rsquo;Orazio', 'contact.html');
				l('c fired');
			}
			$('section.about, section.contact, section.home').addClass('out');
			setTimeout(function(){
				$('#wrap').empty().load('contact.html #wrap > *', function(){
					$('body').removeClass().addClass('contact');
					setTimeout(function(){
						$('section.contact').removeClass('out');
					}, 500)
				});
			}, 500);
			break;

		case "about":
			
			e.preventDefault();
			
			$('a.about').addClass('active');
			$('a.contact').removeClass('active');
			
			if (e.type === 'click') { 
				window.history.pushState('', 'About &mdash; Kr&aring;kvik &amp; D&rsquo;Orazio', 'about.html');
				l('a fired');
			}
			$('section.about, section.contact, section.home').addClass('out');
			setTimeout(function(){
				$('#wrap').empty().load('about.html #wrap > *', function(){
					$('body').removeClass().addClass('about');
					setTimeout(function(){
						$('section.about').removeClass('out');
					}, 500)
				});
			}, 500);
			break;
		default:
			l('no param passed into ajax Request');
	}
}

kd.makeSlider = function(){

	$('.home img').each(function(i){
		l($(this).attr('src'));
		kd.slides.push($(this).attr('src'));
	});

}
