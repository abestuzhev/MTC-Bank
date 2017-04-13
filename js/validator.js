(function($){
	
	var code = "";
	var phone = "";
	var required = false;
	var $form;
	
	/*
	 * валидатор текстареа
	 */
	$.fn.jqNeedVaildateTextarea = function() {
		var $input = $(this);
		if ($input.attr("validate") == "1") {
			$input.attr("error", "1");
			$input.bind("keyup", function(){
				$(this).jqValidateText();
			});
			$input.bind("focusin", function(){
				//$parentItem = $(this).parent().parent().parent().parent().parent().parent();
				//$parentItem.removeClass("required errorInput");
			});
			$input.bind("focusout", function(){
				$parentItem = $(this).parent().parent().parent().parent().parent().parent();
				if ($(this).attr("error") == "1") {
					$parentItem.addClass("errorInput");
				}
				$(this).trigger("checkerror");
			});
		}
	}
	
	/* 
	 * валидатор текстовых полей 
	 * в зависимости от класса поля вызовит необходимый валидатор: русский текст, маил, число
	 */
	$.fn.jqNeedVaildateText = function() {
		var $input = $(this);
		if ($input.attr("validate") == "1") {
			if ($input.hasClass("validateRuText")) {
				$input.attr("error", "1");
				$input.bind("keyup", function(){
					$(this).jqValidateRuText();
				});
			}
			else if ($input.hasClass("validateAllText")) {
				var val = $input.val();
				if (val.length <= 0)
					$input.attr("error", "1");
				$input.bind("keyup", function(){
					$(this).jqValidateAllText();
				});
			}
			else if ($input.hasClass("validateEmail")) {
				$input.attr("error", "1");
				$input.bind("keyup", function(){
					$(this).jqValidateEmail();
				});
			}
			else if ($input.hasClass("validateDigit")) {
				$input.attr("error", "1");
				$input.bind("keyup", function(){
					$(this).jqValidateDigit();
				});
			}
			else {
				$input.attr("error", "1");
				$input.bind("keyup", function(){
					$(this).jqValidateText();
				});
			}
			$input.bind("focusin", function(){
				$(this).removeClass("error");
				$(this).parent().find(".legend").removeClass("error");
				var errorId = $(this).attr("type") + "_" + $(this).attr("name");
				errorId = errorId.replace("[", "");
				errorId = errorId.replace("]", "");
				$(this).parents(".rounded").find(".errorList #" + errorId).remove();
				if ($(this).parents(".rounded").find(".errorList li").length <= 0) {
					$(this).parents(".rounded").find(".errorList").css("display", "none");
					$(this).parents(".rounded").removeClass("error");
				}
			});
			$input.bind("focusout", function(){
				if ($(this).hasClass("validateAllText")) {
					$(this).jqValidateAllText();
				}
				if ($(this).attr("error") == "1") { 
					$(this).addClass("error");
					$(this).parent().find(".legend").addClass("error");
					$(this).parents(".rounded").addClass("error");
					$(this).parents(".rounded").find(".errorList").css("display", "block");
					var errorId = $(this).attr("type") + "_" + $(this).attr("name");
					errorId = errorId.replace("[", "");
					errorId = errorId.replace("]", "");
					$(this).parents(".rounded").find(".errorList li").removeClass("last");
					if (!$(this).parents(".rounded").find(".errorList #" + errorId).text()) {
						$(this).parents(".rounded").find(".errorList").append('<li id="' + errorId + '"></li>');
					}
					$(this).parents(".rounded").find(".errorList #" + errorId).html($(this).attr("errortext"));
					$(this).parents(".rounded").find(".errorList li:last").addClass("last");
				}
				$(this).trigger("checkerror");
			});
		}
		else
			return;
	}
	
	$.fn.jqNeedVaildateCheckbox = function() {
		var $input = $(this);
		if ($input.attr("validate") == "1" && $input.attr("disabled") != "false") {
			$input.bind("change", function(){
				var checked = false;
				$(this).parent().find("input[type=checkbox]").each(function(){
					if ($(this).is(":checked")) {
						checked = true;
					}
				});
				if (!checked) {
					$(this).parent().find("input[type=checkbox]").attr("error", "1");
					$(this).parent().find(".legend").addClass("error");
					$(this).parents(".rounded").addClass("error");
					$(this).parents(".rounded").find(".errorList").css("display", "block");
					var errorId = $(this).attr("type") + "_" + $(this).attr("name");
					errorId = errorId.replace("[", "");
					errorId = errorId.replace("]", "");
					$(this).parents(".rounded").find(".errorList li").removeClass("last");
					if (!$(this).parents(".rounded").find(".errorList #" + errorId).text()) {
						$(this).parents(".rounded").find(".errorList").append('<li id="' + errorId + '"></li>');
					}
					$(this).parents(".rounded").find(".errorList #" + errorId).html($(this).attr("errortext"));
					$(this).parents(".rounded").find(".errorList li:last").addClass("last");
				}
				else {
					$(this).parent().find("input[type=checkbox]").attr("error", "0");
					$(this).parent().find(".legend").removeClass("error");
					var errorId = $(this).attr("type") + "_" + $(this).attr("name");
					errorId = errorId.replace("[", "");
					errorId = errorId.replace("]", "");
					$(this).parents(".rounded").find(".errorList #" + errorId).remove();
					if ($(this).parents(".rounded").find(".errorList li").length <= 0) {
						$(this).parents(".rounded").find(".errorList").css("display", "none");
						$(this).parents(".rounded").removeClass("error");
					}
				}
			});
		}
	}
	
	/*
	 * валидатор заполненности поля
	 */
	$.fn.jqValidateText = function() {
		this.attr("error", "1");
		this.attr("errortext", "");
		var value = this.val();
		if (value.length > 0) {
			this.attr("errortext", "");
			this.attr("error", "0");
		}
		else {
			this.attr("errortext", "Поле обязательно для заполнения");
		}
	}
	
	/*
	 * валидатор русского текста
	 * не разрешает писать латинские символы, цифры, может осуществлять проверку на минимальную
	 * и максимальную длинну строки
	 */
	$.fn.jqValidateRuText = function() {
		this.attr("error", "1");
		this.attr("errortext", "");
		var value = this.val();
		var ruTextPattern = /^[а-яА-Я\s-]+$/;
		if (ruTextPattern.test(this.val())) {
			var min = parseInt(this.attr("minLen"));
			min = (isNaN(min) ? 0 : min);
			var max = parseInt(this.attr("maxLen"));
			max = (isNaN(max) ? 0 : max);
			if (value.length >= min) {
				if (max > min) {
					if (value.length > max) {
						this.val(value.substr(0, max));
					}
				}
				this.attr("errortext", "");
				this.attr("error", "0");
				return;
			}
			else {
				if (min == max)
					this.attr("errortext", "Поле должно содержать " + max + " символов");
				else
					this.attr("errortext", "Поле должно содержать от " + min + " до " + max + " символов");
			}
		}
		else {
			if (value.length > 1) {
				this.val(value.substr(0, value.length - 1));
				this.jqValidateRuText();
			}
			else 
				this.val("");
			return;
		}
	}
	
	/*
	 * валидатор только текста
	 * не разрешает писать спец. символы, цифры, может осуществлять проверку на минимальную
	 * и максимальную длинну строки
	 */
	$.fn.jqValidateAllText = function() {
		this.attr("error", "1");
		this.attr("errortext", "");
		var value = this.val();
		var ruTextPattern = /^[а-яА-Яa-zA-Z\s-]+$/;
		if (ruTextPattern.test(this.val())) {
			var min = parseInt(this.attr("minLen"));
			min = (isNaN(min) ? 0 : min);
			var max = parseInt(this.attr("maxLen"));
			max = (isNaN(max) ? 0 : max);
			if (value.length >= min) {
				if (max > min) {
					if (value.length > max) {
						this.val(value.substr(0, max));
					}
				}
				this.attr("errortext", "");
				this.attr("error", "0");
				return;
			}
			else {
				if (min == max)
					this.attr("errortext", "Поле должно содержать " + max + " символов");
				else
					this.attr("errortext", "Поле должно содержать от " + min + " до " + max + " символов");
			}
		}
		else {
			if (value.length > 1) {
				this.val(value.substr(0, value.length - 1));
				this.jqValidateAllText();
			}
			else 
				this.val("");
			return;
		}
	}
	
	/*
	 * валидатор email
	 * разрешает вводить только допустимые символы, русские буквы и спец символы не пропустит
	 */
	$.fn.jqValidateEmail = function() {
		this.attr("error", "1");
		var value = this.val();
		var emailPattern = /^[a-zA-Z0-9._@-]+$/;
		if (!emailPattern.test(this.val())) {
			this.val(value.substr(0, value.length - 1));
		}
		emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (emailPattern.test(this.val())) {
			this.attr("error", "0");
			return;
		}
	}
	/*
	 * валидатор числа
	 * к вводу разрешены только цифры, может быть осуществлена проверка на минимальное и максимальное
	 * значение, а так же на мнимальную и максимальную длину поля
	 */
	$.fn.jqValidateDigit = function(){
		this.attr("error", "1");
		this.attr("errortext", "");
		var value = this.val();
		var digitPattern = /^[\d]+$/;
		if (!digitPattern.test(this.val())) {
			this.val(value.substr(0, value.length - 1));
		}

		if (digitPattern.test(this.val())) {
			this.attr("error", "0");
			
			/* проверка на длину поля */
			var min = parseInt(this.attr("minLen"));
			min = (isNaN(min) ? 0 : min);
			var max = parseInt(this.attr("maxLen"));
			max = (isNaN(max) ? 0 : max);
			if (value.length >= min) {
				if (max >= min && max != 0) {
					if (value.length > max) {
						this.val(value.substr(0, max));
					}
				}
				this.attr("error", "0");
			}
			else {
				if (min == max)
					this.attr("errortext", "Поле должно содержать " + max + " символов");
				else
					this.attr("errortext", "Поле должно содержать от " + min + " до " + max + " символов");
				this.attr("error", "1");
			}
			//return;
			/* проверка на минимальное и максимальное значение */
			var minVal = parseInt(this.attr("minVal"));
			minVal = (isNaN(minVal) ? 0 : minVal);
			var maxVal = parseInt(this.attr("maxVal"));
			maxVal = (isNaN(maxVal) ? 0 : maxVal);
			value = parseInt(this.val());
			value = (isNaN(value) ? 0 : value);
			if (!(minVal > 0 || maxVal > 0))
				return;
			//alert(minVal + " " + maxVal + " " + value);
			if (value >= minVal) {
				//alert("value >= minVal");
				this.attr("error", "0");
				if (value <= maxVal) {
					this.attr("error", "0");
				}
				else {
					this.attr("errortext", "Число должно быть от " + minVal + " до " + maxVal);
					this.attr("error", "1");
				}
			}
			else {
				this.attr("errortext", "Число должно быть от " + minVal + " до " + maxVal);
				this.attr("error", "1");
			}
		}
	}
	
	
	/*
	 * определяем поля телефона
	 */
	$.fn.jqValidatePhoneFields = function(options) {
		
		code = options["code"];
		phone = options["phone"];
		required = options['required'];
		$form = $(this);
		
		var $code = this.find("input[name=" + options["code"] + "]");
		$code.bind("keyup", function(){
			$(this).jqValidatePhone();
		});
		$code.bind("focusin", function(){
			if (required) 
				$(this).attr("error", "1");
			$parentItem = $(this).parent().parent().parent().parent();
			$parentItem.removeClass("required errorInput");
		});
		$code.bind("focusout", function(){
			$(this).jqValidatePhone();
			$parentItem = $(this).parent().parent().parent().parent();
			if ($(this).attr("error") == "1") {
				$parentItem.addClass("errorInput");
			}
			$(this).trigger("checkerror");
		});
		
	 	var $phone = this.find("input[name=" + options["phone"] + "]");
		$phone.bind("keyup", function(){
			$(this).jqValidatePhone();
		});
		$phone.bind("focusin", function(){
			if (required)
				$code.attr("error", "1");
			$code.trigger("focusin");
		});
		$phone.bind("focusout", function(){
			$code.trigger("focusout");
		});
	}
	
	$.fn.jqValidatePhone = function() {
		if (required) {
			$form.find("input[name=" + code + "]").attr("error", "1");
			$form.find("input[name=" + code + "]").attr("errortext", "");
		}
			
		/* убираем лишние символы */
		var value = this.val();
		var digitPattern = /^[\d]+$/;
		if (!digitPattern.test(this.val())) {
			this.val(value.substr(0, value.length - 1));
		}
		
		var codeVal = $form.find("input[name=" + code + "]").val();
		var phoneVal = $form.find("input[name=" + phone + "]").val();
		
		/* если поля не заполняли, то уходим */
		if (codeVal.length + phoneVal.length == 0) {
			if (!required)
				$form.find("input[name=" + code + "]").attr("error", "0");
			return;
		}
		
		/* если заполняли и длина меньше 10, то ошибка */	
		if (codeVal.length + phoneVal.length < 10) {
			$form.find("input[name=" + code + "]").attr("errortext", "Код и номер телефона должны состоять из 10 цифр. ");
			$form.find("input[name=" + code + "]").attr("error", "1");
		}
		
		/* 
		 * если заполняем код телефона, то он должен быть от 3 до 5 символов и вместе
		 * с телефоном составлять 10 символов
		 */ 
		if ($(this).attr("name") == code) {
			if (codeVal.length < 3) {
				var erText = $form.find("input[name=" + code + "]").attr("errortext");
				erText += "Код номера должен состоять минимум из 3 цифр. ";
				$form.find("input[name=" + code + "]").attr("errortext", erText);
				$form.find("input[name=" + code + "]").attr("error", "1");
				return;
			}
			if (codeVal.length > 5) {
				codeVal = codeVal.substr(0, 5);
				$form.find("input[name=" + code + "]").val(codeVal);
			}
			if (codeVal.length + phoneVal.length > 10) {
				var def = codeVal.length + phoneVal.length - 10;
				codeVal = codeVal.substr(0, codeVal.length - def);
				$form.find("input[name=" + code + "]").val(codeVal);
				$form.find("input[name=" + code + "]").attr("error", "0");
			}
			else if (codeVal.length + phoneVal.length == 10) {
				$form.find("input[name=" + code + "]").attr("error", "0");
			}
			return;
		}
		
		/* 
		 * если заполняем телефон, то он должен быть от 5 до 7 символов и вместе
		 * с кодом составлять 10 символов
		 */
		if ($(this).attr("name") == phone) {
			if (phoneVal.length < 5) {
				var erText = $form.find("input[name=" + code + "]").attr("errortext");
				erText += "Номер телефона должен состоять минимум из 5 цифр. ";
				$form.find("input[name=" + code + "]").attr("errortext", erText);
				$form.find("input[name=" + code + "]").attr("error", "1");
				return;
			}
			if (phoneVal.length > 7) {
				phoneVal = codeVal.substr(0, 7);
				$form.find("input[name=" + phone + "]").val(phoneVal);
			}
			if (codeVal.length + phoneVal.length > 10){
				var def = codeVal.length + phoneVal.length - 10;
				phoneVal = phoneVal.substr(0, phoneVal.length - def);
				$form.find("input[name=" + phone + "]").val(phoneVal);
				$form.find("input[name=" + code + "]").attr("error", "0");
			}
			else if (codeVal.length + phoneVal.length == 10) {
				$form.find("input[name=" + code + "]").attr("error", "0");
			}
			return;
		}
	}
	
	/*
	 * проверяем можно ли сабмитить форму
	 */
	$.fn.jqCheckFields = function() {
		var error = 0;
		this.find('input, textarea, select').each(function(){
			if ($(this).attr("error") == 1) {
				error++;
			}
		});
		if (error > 0) {
			//alert("необходимо заполнить все обязательные поля");
			return false;
		}
		else
			return true;
	}
	
	/* валидатор формы */
	$.fn.jqVaildate = function() {
		this.find('input:text').each(function(){
			$(this).jqNeedVaildateText();
		});
		this.find('textarea').each(function(){
			$(this).jqNeedVaildateTextarea();
		});
		this.find('input:checkbox').each(function(){
			$(this).jqNeedVaildateCheckbox();
		});
		this.bind("submit", function(){
			var error = 0;
			$(this).find('input:text').each(function(){
				if ($(this).attr("error") == 1) {
					error++;
				}
			});
			$(this).find('input:checkbox').each(function(){
				if ($(this).attr("error") == 1) {
					error++;
				}
			});
			$(this).find('textarea').each(function(){
				if ($(this).attr("error") == 1) {
					error++;
				}
			});
			if (error > 0) {
				$(this).find('input:text').each(function(){
					$(this).trigger("focusout");
				});
				$(this).find('input[type=checkbox]').each(function(){
					$(this).trigger("change");
				});
				console.log("error > 0");
				return false;
			}
			else
				return true;
		});
	}
})(jQuery);