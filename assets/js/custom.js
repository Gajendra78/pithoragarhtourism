$(document).ready(function () {
  "use strict";
  
  // document.oncontextmenu =new Function("return false;")
  // document.onselectstart =new Function("return false;")

  // 1. Scroll To Top

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 600) {
      $(".return-to-top").fadeIn();
    } else {
      $(".return-to-top").fadeOut();
    }
  });

  $(".return-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );

    return false;
  });

  // 2. range js

  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 12000,
    values: [2677, 9241],
    slide: function (event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });
  $("#amount").val(
    "$" +
    $("#slider-range").slider("values", 0) +
    " - $" +
    $("#slider-range").slider("values", 1)
  );

  // Quantity Buttons Shop

  $(".qtyplus").on("click", function () {
    var b = $(this).parents(".quantity-form").find("input.qty"),
      c = parseInt(b.val(), 10) + 1,
      d = parseInt(b.attr("max"), 10);
    d || (d = 9999999999), c <= d && (b.val(c), b.change());
  });
  $(".qtyminus").on("click", function () {
    var b = $(this).parents(".quantity-form").find("input.qty"),
      c = parseInt(b.val(), 10) - 1,
      d = parseInt(b.attr("min"), 10);
    d || (d = 1), c >= d && (b.val(c), b.change());
  });

  // 3.Countdown timer

  function makeTimer() {
    var endTime = new Date("jan 2022 12:00:00 ");
    var endTime = Date.parse(endTime) / 1000;

    var now = new Date();
    var now = Date.parse(now) / 1000;

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    );

    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $("#days").html(days + '<span class="camp">Days</span>');
    $("#hours").html(hours + '<span class="camp">Hour</span>');
    $("#minutes").html(minutes + '<span class="camp">Minute</span>');
    $("#seconds").html(seconds + '<span class="camp">Second</span>');
  }

  setInterval(function () {
    makeTimer();
  }, 1000);

  // 4. owl carousel

  // i. #testimonial-carousel

  var owl = $("#testemonial-carousel");
  owl.owlCarousel({
    items: 3,
    margin: 0,

    loop: true,
    autoplay: true,
    smartSpeed: 1000,

    //nav:false,
    //navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],

    dots: true,
    autoplayHoverPause: true,

    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      640: {
        items: 1,
      },
      767: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // 5. datepicker
  $('[data-toggle="datepicker"]').datepicker();

  // 6. Smooth Scroll spy

  $(".header-area").sticky({
    topSpacing: 0,
  });

  //=============

  $("li.smooth-menu a").bind("click", function (event) {
    event.preventDefault();
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top - -1,
        },
        1200,
        "easeInOutExpo"
      );
  });

  $("body").scrollspy({
    target: ".navbar-collapse",
    offset: 0,
  });

  // 7.animation support

  $(window).load(function () {
    $(".about-us-txt h2")
      .removeClass("animated fadeInUp")
      .css({ opacity: "0" });
    $(".about-us-txt button")
      .removeClass("animated fadeInDown")
      .css({ opacity: "0" });
  });

  $(window).load(function () {
    $(".about-us-txt h2").addClass("animated fadeInUp").css({ opacity: "0" });
    $(".about-us-txt button")
      .addClass("animated fadeInDown")
      .css({ opacity: "0" });
  });
});


// animation on scroll




// Mobile Navigation
if ($('.nav-menu').length) {
  var $mobile_nav = $('.nav-menu').clone().prop({
    class: 'mobile-nav d-lg-none'
  });
  $('body').append($mobile_nav);
  $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
  $('body').append('<div class="mobile-nav-overly"></div>');

  $(document).on('click', '.mobile-nav-toggle', function (e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    $('.mobile-nav-overly').toggle();
  });

  $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
    e.preventDefault();
    $(this).next().slideToggle(300);
    $(this).parent().toggleClass('active');
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav, .mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }
    }
  });
} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
  $(".mobile-nav, .mobile-nav-toggle").hide();
}

// Navigation active state on scroll
var nav_sections = $('section');
var main_nav = $('.nav-menu, #mobile-nav');

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop() + 200;

  nav_sections.each(function () {
    var top = $(this).offset().top,
      bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      if (cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
      }
      main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
    }
    if (cur_pos < 300) {
      $(".nav-menu ul:first li:first").addClass('active');
    }
  });
});

// Toggle .header-scrolled class to #header when page is scrolled
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  } else {
    $('#header').removeClass('header-scrolled');
  }
});

if ($(window).scrollTop() > 100) {
  $('#header').addClass('header-scrolled');
}




var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
var index = 0;


function prevSlide(n) {
  index += n;
  console.log("prevSlide is called");
  changeSlide();
}

function nextSlide(n) {
  index += n;
  changeSlide();
}

changeSlide();

function changeSlide() {

  if (index > slides.length - 1)
    index = 0;

  if (index < 0)
    index = slides.length - 1;



  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";

    dots[i].classList.remove("active");


  }

  slides[index].style.display = "block";
  dots[index].classList.add("active");



}

const slidesElm = document.querySelectorAll(".slider-container .slide-box");

Array.from(slidesElm).forEach((slide) => {
  slide.addEventListener("click", () => {
    Array.from(slidesElm).forEach((sld) => sld.classList.remove("active"));
    slide.classList.add("active");
  });
});


// trek page
// $(function () {
//   $('#myTab li:last-child a').tab('show');
// })


























"use strict"; function __weatherwidget_init() { var a = document.getElementsByClassName("weatherwidget-io"), i = []; if (0 !== a.length) { for (var t = function (t) { var e = a[t], o = {}; o.id = "weatherwidget-io-" + t, o.href = e.href, o.label_1 = e.getAttribute("data-label_1"), o.label_2 = e.getAttribute("data-label_2"), o.font = e.getAttribute("data-font"), o.icons = e.getAttribute("data-icons"), o.mode = e.getAttribute("data-mode"), o.days = e.getAttribute("data-days"), o.theme = e.getAttribute("data-theme"), o.basecolor = e.getAttribute("data-basecolor"), o.accent = e.getAttribute("data-accent"), o.textcolor = e.getAttribute("data-textcolor"), o.textAccent = e.getAttribute("data-textAccent"), o.highcolor = e.getAttribute("data-highcolor"), o.lowcolor = e.getAttribute("data-lowcolor"), o.suncolor = e.getAttribute("data-suncolor"), o.mooncolor = e.getAttribute("data-mooncolor"), o.cloudcolor = e.getAttribute("data-cloudcolor"), o.cloudfill = e.getAttribute("data-cloudfill"), o.raincolor = e.getAttribute("data-raincolor"), o.snowcolor = e.getAttribute("data-snowcolor"), o.windcolor = e.getAttribute("data-windcolor"), o.fogcolor = e.getAttribute("data-fogcolor"), o.thundercolor = e.getAttribute("data-thundercolor"), o.hailcolor = e.getAttribute("data-hailcolor"), o.dayscolor = e.getAttribute("data-dayscolor"), o.tempcolor = e.getAttribute("data-tempcolor"), o.desccolor = e.getAttribute("data-desccolor"), o.label1color = e.getAttribute("data-label1color"), o.label2color = e.getAttribute("data-label2color"), o.shadow = e.getAttribute("data-shadow"), o.scale = e.getAttribute("data-scale"), (r = document.getElementById(o.id)) && e.removeChild(r), i[o.id] = document.createElement("iframe"), i[o.id].setAttribute("id", o.id), i[o.id].setAttribute("class", "weatherwidget-io-frame"), i[o.id].setAttribute("title", "Weather Widget"), i[o.id].setAttribute("scrolling", "no"), i[o.id].setAttribute("frameBorder", "0"), i[o.id].setAttribute("width", "100%"), i[o.id].setAttribute("src", "https://weatherwidget.io/w/"), i[o.id].style.display = "block", i[o.id].style.position = "absolute", i[o.id].style.top = "0", i[o.id].onload = function () { i[o.id].contentWindow.postMessage(o, "https://weatherwidget.io") }, e.style.display = "block", e.style.position = "relative", e.style.height = "150px", e.style.padding = "0", e.style.overflow = "hidden", e.style.textAlign = "left", e.style.textIndent = "-299rem", e.appendChild(i[o.id]) }, e = 0, o = Math.min(a.length, 10); e < o; e++) { var r; t(e) } window.addEventListener("message", function (t) { "https://weatherwidget.io" === t.origin && i[t.data.wwId] && i[t.data.wwId].parentNode && (i[t.data.wwId].style.height = t.data.wwHeight + "px", i[t.data.wwId].parentNode.style.height = t.data.wwHeight + "px") }) } else setTimeout(__weatherwidget_init, 1500) } setTimeout(__weatherwidget_init, 100);
