/* jshint devel:true */

var l = function (honk) { console.log(honk); };

var kd = {
	$w : $(window),
	$d : $(document),
	$b : $('body'),
	url : window.location.href
};


kd.$d.keypress(function (e) {
    l(e.keyCode);
    if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    	l('triggered');
    }
});

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
			setTimeout(function(){
				$('section.contact').removeClass('out');
			}, 500)
		});
	}, 500);


}).on('click', 'a.logo', function(e){

	e.preventDefault();
	l('home clicked');
	window.history.pushState('', 'Kr&aring;kvik &amp; D&rsquo;Orazio', kd.url);
	// $('section.home').toggleClass('out');
	$('a.about, a.contact').removeClass('active');
	$('section.about, section.contact, section.home').addClass('out');
	setTimeout(function(){
		$('#wrap').empty().load(kd.url + ' #wrap > *', function(){
			$('body').removeClass().addClass('home');
			setTimeout(function(){
				$('section.home').removeClass('out');
			}, 500)
		});
	}, 500);

}).on('click', 'a.totop', function(e){
	e.preventDefault();

	$('html, body').animate({
		scrollTop: '0'
	}, 1000, 'easeInOutQuint');

});


kd.$d.ready(function(){
	var url = window.location.pathname;
	if(url.indexOf('contact') > -1) {

		$('body').addClass('contact');
		$('a.contact').addClass('active');

	} else if (url.indexOf('about') > -1) {

		$('body').addClass('about');
		$('a.about').addClass('active');

	} else {
		$('section.home').removeClass('out');
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



