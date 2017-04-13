$(document).ready(function() {

  // scroll
  // var $page = $('html, body');
  // $('a[href*="#"]').click(function() {
  //   $page.animate({
  //     scrollTop: $($.attr(this, 'href')).offset().top
  //   }, 400);
  //   return false;
  // });
  

  $(".top-header__nav-link").click(function() {
  	$(".top-header__nav-link").removeClass("top-header__nav-link_active");
  	$(this).addClass("top-header__nav-link_active");
  });


  $(".top-header__mobile-menu").click(function() {
  	$(this).toggleClass("change");
  	$(".top-header__nav").animate({ width: "toggle"}, 350);
  	$(".overley-page").fadeToggle();
  });


  $("#banner, #recall-slider").owlCarousel({
  	items:1,
  	loop:true,
  	margin:10,
  	smartSpeed: 500,
  	nav:true,
  	navText:['<div class="arrow arrow_left">&larr;</div>','<div class="arrow arrow_right">&rarr;</div>']
  });


// earn
$(".earn__tab-content").not(":first").hide();
$(".earn__tab-caption").click(function() {
	$(".earn__tab-caption").removeClass("earn__tab-caption_active").eq($(this).index()).addClass("earn__tab-caption_active");
	$(".earn__tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("earn__tab-caption_active");


//credit page
//conditions 
$(".conditions__tab-content").not(":first").hide();
$(".conditions__tab-caption").click(function() {
	$(".conditions__tab-caption").removeClass("conditions__tab-caption_active").eq($(this).index()).addClass("conditions__tab-caption_active");
	$(".conditions__tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("conditions__tab-caption_active");


$(".slider").slider({
	min: 0,
	max: 1000,
	values: [0, 500],
	range: true,
	animate: 500,
	stop: function(event, ui) {
		$("input#total").val($(".slider").slider("values",1));
	},
	slide: function(event, ui){
		$("input#total").val($(".slider").slider("values",1));
	}

});

$("input#total").change(function(){
	var value=$("input#total").val();
	$(".slider").slider("values",1,value);	
});

$(".slider1").slider({
	min: 0,
	max: 1000,
	values: [0, 500],
	range: true,
	animate: 500,
	stop: function(event, ui) {
		$("input#time").val($(".slider1").slider("values",1));
	},
	slide: function(event, ui){
		$("input#time").val($(".slider1").slider("values",1));
	}

});

$("input#time").change(function(){
	var value=$("input#time").val();
	$(".slider1").slider("values",1,value);	
});



$(".slider2").slider({
	min: 0,
	max: 1000,
	values: [0, 500],
	range: true,
	animate: 500,
	stop: function(event, ui) {
		$("input#income").val($(".slider2").slider("values",1));
	},
	slide: function(event, ui){
		$("input#income").val($(".slider2").slider("values",1));
	}

});

$("input#income").change(function(){
	var value=$("input#income").val();
	$(".slider2").slider("values",1,value);	
});


$(".ui-slider-handle").mousedown(function() {
	$(".ui-widget-header").addClass("ui-widget-header_active");
	$(this).addClass("ui-slider-handle_active");
});

	//блок смены фамилии
	$('input[name="form_radio_flagChangeFIO"]').change(function() {
		var val = $(this).val(),
			$citizen = $(this).parents('ul').find('[data-block="change-fio"]');

		if (val == '1944') {
			$citizen.removeClass('hidden');
		} else {
			$citizen.addClass('hidden');
		}
	});

});


