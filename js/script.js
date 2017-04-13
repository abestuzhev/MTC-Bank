// Cufon.replace(".agora", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal'});
// Cufon.replace(".windowTitle", {fontFamily:'PF Agora Slab Pro', fontWeight:'normal'});
// Cufon.replace(".titleWrapper>h1", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#009ca9, 0.3=#009ca9, 0.7=#007487, #007487)"});
// Cufon.replace("h2", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#009ca9, 0.3=#009ca9, 0.7=#007487, #007487)"});
// Cufon.replace(".titleWrapper > h2", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#009ca9, 0.3=#009ca9, 0.7=#007487, #007487)"});
// Cufon.replace(".letter span", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#009ca9, 0.3=#009ca9, 0.7=#007487, #007487)"});
// Cufon.replace(".privateSheme .titleWrapper>h1", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#4c99c6, 0.3=#4c99c6, 0.7=#20709b, #20709b)"});
// Cufon.replace(".mortgageType>.agora", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#55ae1a, 0.3=#55ae1a, 0.7=#2d8301, #2d8301)", textShadow: '0 1px 0 #fbfbfb'});
// Cufon.replace(".phonePopup span", {color: "-linear-gradient(#009ca9, 0.3=#009ca9, 0.7=#007487, #007487)"});
// Cufon.replace(".banner h3", {fontFamily:'Bliss Pro', fontWeight:'bold', color: "-linear-gradient(#535353, 0.3=#535353, 0.7=#606060, #606060)"});
// Cufon.replace("h6", {fontFamily:'Nokia Sans S60', fontWeight:'bold', color: "-linear-gradient(#007689, #00909f)"});
/*Cufon.replace(".heliosB", {fontFamily:'HeliosCond', fontWeight:'bold'});
Cufon.replace(".officeAtm", {fontFamily:'HeliosCond', fontWeight:'normal'});
Cufon.replace(".city", {fontFamily:'HeliosCond', fontWeight:'bold', hover:{color:'#515151'}});
Cufon.replace(".lang>li", {fontFamily:'HeliosCond', fontWeight:'normal'});
Cufon.replace(".questionReview>li", {fontFamily:'HeliosCond', fontWeight:'normal'});
Cufon.replace(".phoneNumbers>ul>li>a", {fontFamily:'HeliosCond', fontWeight:'normal', hover:{color:'#515151'}});
Cufon.replace(".phoneNumbers>p", {fontFamily:'HeliosCond', fontWeight:'normal'});*/

jQuery.fn.extend({
	switcherAnimation: function() {
		if (this.css("left") != '40px') 
			this.animate({left: 40}, 200, function(){
				
			});
		
		else 
			this.animate({
				left: -1
			}, 200, function(){
				
			});
	},
	switcher: function() { 
		this.find("a").live('click', function(){
			$(".greyRunner a").switcherAnimation();
			$(".greyRunner").each(function(){
				var parent = $(this).parent();
				var strong = parent.find("strong");
				var link = parent.find(".popupLink");
				if (strong) {
					strong.replaceWith('<a href="#" class="popupLink">' + strong.text() + '</a>'); 
				}
				if (link) {
					link.replaceWith('<strong>' + link.text() + '</strong>'); 
					var val = jQuery.trim(link.text());
					if (val == 'На сайт МТС Банка') {
						setTimeout(function(){
							location.href="http://www.mtsbank.ru";
						}, 200);
					}
				}
			});
			//$(document).trigger("changeregion");
			return false;
		});
	}
});

$(document).ready(function(){
 
	$("a[rel]").overlay({
		mask: '#6b6b6b',
		effect: 'apple',
		fixed: false,
		fadeInSpeed: 10,
		onBeforeLoad: function() {
			var wrap = this.getOverlay().find(".contentWrap");
			wrap.load(this.getTrigger().attr("href"));
		},
		onLoad: function() {
			Cufon.replace(".titleWrapper > h2", {fontFamily:'PF Agora Slab Pro Medium', fontWeight:'normal', color: "-linear-gradient(#009ca9, 0.3=#009ca9, 0.7=#007487, #007487)"});
			Cufon.refresh('.titleWrapper > h2');
		}
	});
	
	$(".slide-link > a").live("click", function(){
		var item = $(this).attr("id");
		item = item.replace("open", "block");
		$("#" + item).slideToggle();
		return false;
	});
	
	$(".cityChange").switcher();
	
	
	
	//banners on main
	$(".bannerWrapper .js-bannerSelectWrapper").eq(1).css("display", "none");
	
	$(".bannerWrapper .corporate_lising .redButton").live("click", function(){
    	$(".js-bannerSelectWrapper").each(function(){
        	if ($(this).css("display") == "block") {
            	var indexSelect = $(this).index();
            	var test = $(this).find("select").val();
            	location.href = $(this).find("select").val();
        	}
    	});
		return false;
	});
	
	$(".bannerWrapper .bannerChange a").live("click", function(){
    	if ($(this).hasClass("js-bannerCount") || ( $(this).hasClass("png") && ($(this).css("left")=='0px' || $(this).css("left")=='-1px' ) ) ) {
        	$(".bannerGreyRunner a").animate({left: 40});
        	$(".bannerChange strong").remove();
        	$(".bannerGreyRunner").before("<a class=\"popupLink js-bannerForm\" href=\"#\">Оформить заявку</a>");
        	$(".bannerChange .popupLink.js-bannerCount").remove();


        	$(".bannerGreyRunner").after("<strong>Рассчитать</strong>");
        	
        	
        	$(".bannerWrapper .redButton span").empty().text("Рассчитать");
        	
        	$(".bannerWrapper .js-bannerSelectWrapper").eq(0).css("display", "none");
        	$(".bannerWrapper .js-bannerSelectWrapper").eq(1).css("display", "block");
    	}
    	else {


        	$(".bannerGreyRunner a").animate({left: 0});
        	$(".bannerChange strong").remove();
        	$(".bannerChange .popupLink.js-bannerForm").remove();

        	$(".bannerGreyRunner").after("<a class=\"popupLink js-bannerCount\" href=\"#\">Рассчитать</a>");

        	$(".bannerGreyRunner").before("<strong>Оформить заявку</strong>");
        	
        	$(".bannerWrapper .redButton span").empty().text("Оформить");
        	
        	$(".bannerWrapper .js-bannerSelectWrapper").eq(0).css("display", "block");
        	$(".bannerWrapper .js-bannerSelectWrapper").eq(1).css("display", "none");
    	}
    	return false;
	});
});

//for sms sevice on
function parseGetParams() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for(var i=0; i<__GET.length; i++) {
        var getVar = __GET[i].split("=");
        $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
    }
    return $_GET;
}

var resultat = true;
document.klardValidation = true;


var digitalFields = function(selector) {
	this.init(selector);
};

$(document).ready(function() {
	digitalFields.prototype = {
		selector: null,
		$selector: null,
		v: null,
		unFormatFunction: function(value) {
			return value.toString().replace(/ /g, '');
		},
		unFormat: function(input) {
            var t=$(input.selector).val();
			this.v = t;
			this.v = this.unFormatFunction(this.v);
			$(input.selector).val(this.v);
            /*
            var value=$(input).val();
            value = this.unFormatFunction(value);
            $(input).val(value);
            */
		},
		unFormatAllInputs: function() {
			var _this = this;
			$(this).each(function(i) {
				_this.unFormat(this);
			});
		},
		keyUpHandler: function(e) {
			var _this = e.data;
			_this.unFormat(this);
		},
		init: function(selector) {
			this.selector = selector;
			this.$selector = $(this.selector);
			this.$selector.live('keyup', this, this.keyUpHandler);
			this.unFormatAllInputs();
		}
	};
});