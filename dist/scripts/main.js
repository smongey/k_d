var l=function(t){console.log(t)},kd={$w:$(window),$d:$(document),$b:$("body"),url:window.location.href};kd.$d.keypress(function(t){l(t.keyCode),103==t.keyCode&&($(".grid").toggleClass("active"),l("triggered"))}),kd.$d.on("click","a.about",function(t){t.preventDefault(),l("about clicked"),$("a.about").addClass("active"),$("a.contact").removeClass("active"),window.history.pushState("","About &mdash; Kr&aring;kvik &amp; D&rsquo;Orazio","about.html"),$("section.about, section.contact, section.home").addClass("out"),setTimeout(function(){$("#wrap").empty().load("about.html #wrap > *",function(){$("body").removeClass().addClass("about"),setTimeout(function(){$("section.about").removeClass("out")},500)})},500)}).on("click","a.contact",function(t){t.preventDefault(),l("contact clicked"),$("a.contact").addClass("active"),$("a.about").removeClass("active"),window.history.pushState("","Contact &mdash; Kr&aring;kvik &amp; D&rsquo;Orazio","contact.html"),$("section.about, section.contact, section.home").addClass("out"),setTimeout(function(){$("#wrap").empty().load("contact.html #wrap > *",function(){$("body").removeClass().addClass("contact"),setTimeout(function(){$("section.contact").removeClass("out")},500)})},500)}).on("click","a.logo",function(t){t.preventDefault(),l("home clicked"),window.history.pushState("","Kr&aring;kvik &amp; D&rsquo;Orazio","/"),$("a.about, a.contact").removeClass("active"),$("section.about, section.contact, section.home").addClass("out"),setTimeout(function(){$("#wrap").empty().load(kd.url+" #wrap > *",function(){$("body").removeClass().addClass("home"),setTimeout(function(){$("section.home").removeClass("out")},500)})},500)}).on("click","a.totop",function(t){t.preventDefault(),$("html, body").animate({scrollTop:"0"},1e3,"easeInOutQuint")}),kd.$d.ready(function(){var t=window.location.pathname;t.indexOf("contact")>-1?($("body").addClass("contact"),$("a.contact").addClass("active")):t.indexOf("about")>-1?($("body").addClass("about"),$("a.about").addClass("active")):$("section.home").removeClass("out"),l(kd.url.href)}),$(window).bind("popstate",function(t){t.preventDefault()});