
// inArray = Array.prototype.indexOf ?
// 	function(arr, val) {
// 		return arr.indexOf(val) != -1
// 	} :
// 	function(arr, val) {
// 		var i = arr.length;
// 		while (i--) {
// 			if (arr[i] === val) {
// 				return true
// 			}
// 		}
// 		return false
// 	};


function check_summ() {

	if ($('#c_summ').val() <= 75000) {
		$('#INCOMEVERIFY_block').css('display', 'none');
	} else {
		$('#INCOMEVERIFY_block').css('display', 'block');
	}

}

//показать ошибку
function showError(field, text) {
	var errorText = text;
	var errorId = 'error' + $(field).attr('name');
	var errorList = $(field).parents('.ccStepBlockWrapper').find('.errorList');
	$(field).attr('error', '1').addClass('error');
	$(field).parents('li:eq(0)').find('.legend').addClass('error');
	errorList.css('display', 'block');
	if (errorList.find('#' + errorId).text() != errorText) {
		if(errorList.find('#' + errorId).length>=1)
			errorList.find('#' + errorId).text(errorText);
		else
			errorList.append('<li id="' + errorId + '">' + errorText + '</li>');
	}
	errorList.find('li').removeClass('last');
	errorList.find('li:last').addClass('last');
	$(field).parents('.ccStepBlockWrapper').find('.ccStepBlock').addClass('error');
}

//скрыть ошибку
function hideError(field) {
	var errorId = 'error' + $(field).attr('name');
	var errorList = $(field).parents('.ccStepBlockWrapper').find('.errorList');
	$(field).parents('li:eq(0)').find('.legend').removeClass('error');
	$(field).attr('error', '0');
	$(field).removeClass('error');
	if (errorList.css('display') == 'block') {
		errorList.find('#' + errorId).remove();
		errorList.find('li').removeClass('last');
		errorList.find('li:last').addClass('last');
		if (errorList.find('li').length == 0) {
			errorList.css('display', 'none');
			$(field).parents('.ccStepBlockWrapper').find('.ccStepBlock').removeClass('error');
		}
	}
}

function send_sms($nomer, $app_name) {
	if ($sms_repeat_count < 6) {
		$.ajax({
			type: 'POST',
			url: '/ajax/SendSms.ajax.php',
			data: 'phone=' + $nomer + '&app_name=' + $app_name + '&send_sms=',
			success: function(result) {
				$('.app-sms-text').html(result).show();
				$sms_repeat_count++;
			}
		});
	} else {
		$('.app-sms-new-code-send').css('color', '#9D3927').html('Количество попыток превышено / Или сервис смс-подтверждения временно недоступен');
	}

}

function repeat_send_sms($nomer, $appName) {
	if ($sms_repeat_count < 6) {
		$('.app-sms-repeat-waiter').show();
		$.ajax({
			type: 'POST',
			url: '/ajax/SendSms.ajax.php',
			data: 'phone=' + $nomer + '&app_name=' + $appName + '&repeat_sms_confirm_code=',
			success: function(result) {
				$('.app-sms-repeat-waiter').hide();
				$('.app-sms-new-code-send').removeClass('app-sms-red').fadeOut().html(result).fadeIn().show();
				$sms_repeat_count++;
			}
		});
	} else {
		$('.app-sms-new-code-send').addClass('app-sms-red').html('Количество попыток превышено / Или сервис смс-подтверждения временно недоступен');
	}
}


var ress = false;
var $sms_repeat_count = 0; // количество запросов на отправку смс
var isFormSubmited = false; // отправлялась ли форма (по умолчанию нет)

function sms_confirm_code($sms_confirm_code) {
	//$('.app-sms-answer').html('Отправка кода подтверждения...').show();
	$.ajax({
		type: 'POST',
		async: false,
		url: '/ajax/SendSms.ajax.php',
		data: 'check_sms_confirm_code=&sms_confirm_code=' + $sms_confirm_code,
		success: function(result) {
			//$('.app-sms-answer').hide();
			//alert(result);
			if (result == 1) {
				//$('.app-sms-answer').addClass('app-sms-correct');
				//$('.app-sms-answer').html('Код подтверждения введен верно!');
				//$('.app-sms-answer').show();

				//$('form[name=CREDIT_CASH]').submit();
				$('.app-sms-verification-code').removeClass('error');
				ress = true;
			} else {
				//$('.app-sms-answer').removeClass('app-sms-correct');
				//$('.app-sms-answer').html('Код подтверждения введен неверно!');
				//$('.app-sms-answer').show();

				$('.app-sms-new-code-send').addClass('app-sms-red').html('Код подтверждения введен неверно!');
				$('.app-sms-verification-code').addClass('error');

				ress = false;
				return false;
			}
		}
	});
}

// Функции управления показом блоков подтверждения
function showSmsConfirmBlock() {
	//alert('Показываем блок смс');
	// Вставляем заполненный ранее номер в блок подтверждения
	var codeVal = $('input[name=form_text_648]').val();
	var phoneVal = $('input[name=form_text_649]').val();
	var $nomer = codeVal + phoneVal;
	$('#app-sms-nomer').html($nomer);

	$app_name = 'на кредит';

	//Проверяем, кликаем ли мы по кнопке 'Продолжить', или по кнопке 'Отправить'
	if ($('.button-container').is(':visible')) {
		// кликнули по кнопке 'Продолжить'

		// Скрываем блок с кнопкой 'Продолжить'
		$('.button-container').hide();

		// отправляем аякс запрос на отправку смс с кодом.
		send_sms($nomer, $app_name);

	} else {
		// кликнули по кнопке 'Отправить'

		// Отправляем аякс запрос на сверку введенного кода подтверждения с тем, что положили в куки при отправке смс
		$sms_confirm_code = $('.app-sms-verification-code').val();
		if ($.trim($sms_confirm_code) == '') {
			$('.app-sms-new-code-send').addClass('app-sms-red').html('Введите код подтверждения');
			$('.app-sms-verification-code').addClass('error');
			return false;
		} else {
			$('.app-sms-verification-code').removeClass('error');
			$('.app-sms-new-code-send').removeClass('app-sms-red');
			sms_confirm_code($sms_confirm_code);
		}
	}

	$('.app-sms-verification-code').keydown(function(e) {
		$sms_confirm_code = $('.app-sms-verification-code').val();
		if (e.keyCode == 13 && $.trim($sms_confirm_code) != '') {
			//sms_confirm_code($sms_confirm_code);
			//$('button[name="web_form_submit"]').click();
		}
	});

	// Показываем блок подтверждения
	$('#app-sms').fadeIn();
	$(document).scrollTo($('#app-sms'));
	$('.app-sms-verification-code').focus();

	//alert('resultat = true, ress = '+ress);
	$('.button-container').hide();
}

function hideSmsConfirmBlock() {
	//alert('Скрываем блок смс');
	$('#app-sms').hide();
	$('.button-container').show();
}

function showCaptchaConfirmBlock() {
	if ($('.button-container').is(':visible')) {
		// Кликнули по кнопке 'Продолжить'
		$('.app-captcha-wrap').show();
		$('.button-container').hide();

	} else {
		// Кликнули по кнопке 'Отправить'

		if (jQuery.trim($('#app-captcha-word').val()) == '') {
			$('.app-captcha-label-enterword').addClass('app-sms-red').html('Введите код подтверждения');
		} else {
			var captcha_word = $('#app-captcha-word').val();
			var captcha_sid = $('#app-captcha-hidden-input').val();
			checkCaptchaValid(captcha_word, captcha_sid); // записывает в переменную valid отвер корректности введенной капчи (bool)

			ress = valid;

			if (valid == false) {
				$('.app-captcha-label-enterword').addClass('app-sms-red').html('Неверный код подтверждения');
			} else {
				$('.app-captcha-label-enterword').removeClass('app-sms-red').html('Код введен верно');
			}
		}
	}

}

function hideCaptchaConfirmBlock() {
	//alert('Скрываем блок капча');
	$('.app-captcha-wrap').hide();
	$('.button-container').show();
}


// Функция проверки доступности МТС шины ESB MQ
var $ajaxBusy;
var $aviable_esb;
var $request;
function checkAviableEsbMq() {
	$ajaxBusy = true;
	$aviable_esb = false;
	$request = $.ajax({
		type: 'POST',
		url: '/ajax/checkAviableEsbMq.ajax.php',
		//async: false,
		data: 'CheckAviableEsbMq=Y',
		success: function(result) {

			$ajaxBusy = false;

			$aviable_esb = result.status == 'true';
		},
		dataType: 'json'

	});
	setTimeout('$request.abort();', 3000); // скрипт checkAviableEsbMq.ajax.php работает не более 2 сек., поэтому с запасом ставим 3
}

// Функция определяет, какой блок показывать: капчу, или смс и показывает его (скрывает)
var $action = 'none';
function confirmBlock($action, $aviable_esb) {
	// Проверяем, доступна ли шина
	if ($aviable_esb) {
		if ($action == 'show') {
			showSmsConfirmBlock();
		} else {
			hideSmsConfirmBlock();
		}
	} else {
		if ($action == 'hide') {
			hideCaptchaConfirmBlock();
		} else {
			showCaptchaConfirmBlock();
		}
	}
}


//функция проверки валидности даты
function validateDate(date) {
	if (date.length < 10) {
		return false;
	}

	var arDate = date.split('.');

	var d = Number(arDate[0]),
		m = Number(arDate[1]),
		y = Number(arDate[2]),
		newDate = new Date(y, m - 1, d);

	if (newDate.getFullYear() == y && (newDate.getMonth() + 1) == m && newDate.getDate() == d) {
		return true;
	}

	return false;
}

function validateName(value) {
	var pattern = /^([A-Za-zА-ЯЁа-яё\-\s]){1,85}$/g;

	return pattern.test(value);
}

$(document).ready(function() {

	var cardChoise = new CardsChoise();

	// setPerviosCardChoise();

	// смена радиобаттона "Выберите продукт"
	$('input[name="form_radio_chooseProduct"]').change(function() {
		cardChoise.clearCard();

		// скрываем валидацию "Выберите продукт", т.к. при чендже полюбому уже есть выбранный вариант
		hideError("input[name=form_radio_chooseProduct]");
	});

	//блок с вопросами по кредиту
	$('[data-group="credit-question"]').each(function(index) {
		var length = $('[data-group="credit-question"]').length,
			prevIndex = index - 1,
			$prev = $('[data-group="credit-question"]').eq(index - 1),
			prevVal = $prev.find('input[type="radio"]:checked').val(),
			$input = $(this).find('input[type="radio"]'),
			access = [2278, 2280, 2282];

		if (prevIndex >= 0) {
			if (prevVal == undefined) {
				$(this).hide();
			} else {
				if ($.inArray(prevVal, access) > -1) {
					$(this).show();
				}
			}
		}

		$input.change(function() {
			var curIndex = $(this).parents('[data-group="credit-question"]').index();

			for (var i = curIndex; i <= length; i++) {
				var	$cur = $('[data-group="credit-question"]').eq(i),
					$next = $('[data-group="credit-question"]').eq(i + 1),
					curVal = parseInt($cur.find('input[type="radio"]:checked').val());

				if ($.inArray(curVal, access) > -1) {
					$next.show();
				} else {
					if ($next.find('input[type="radio"]:checked').length > 0) {
						$next.find('input[type="radio"]:checked').removeAttr('checked');
					}
					$next.hide();
				}
			}
		});
	});

	var selectedProduct = $('input[name="form_radio_chooseProduct"]:checked').val();
	if (selectedProduct == 2266) {

	}


	//кодовое слово
	$.fn.codeWord = function() {
		return this.each(function() {
			var $input = $(this),
				word = '',
				codeWordPattern = /^[А-ЯЁ]+$/,
				lat2cyr = function(str) {
					var lat2cyrChars = new Array(
						[
							'Q',
							'Й'
						], [
							'W',
							'Ц'
						], [
							'E',
							'У'
						], [
							'R',
							'К'
						], [
							'T',
							'Е'
						], [
							'Y',
							'Н'
						], [
							'U',
							'Г'
						], [
							'I',
							'Ш'
						], [
							'O',
							'Щ'
						], [
							'P',
							'З'
						], [
							'[',
							'Х'
						], [
							']',
							'Ъ'
						],
						[
							'A',
							'Ф'
						], [
							'S',
							'Ы'
						], [
							'D',
							'В'
						], [
							'F',
							'А'
						], [
							'G',
							'П'
						], [
							'H',
							'Р'
						], [
							'J',
							'О'
						], [
							'K',
							'Л'
						], [
							'L',
							'Д'
						], [
							':',
							'Ж'
						], [
							"'",
							'Э'
						], [
							"\\",
							'Ё'
						],
						[
							'Z',
							'Я'
						], [
							'X',
							'Ч'
						], [
							'C',
							'С'
						], [
							'V',
							'М'
						], [
							'B',
							'И'
						], [
							'N',
							'Т'
						], [
							'M',
							'Ь'
						], [
							',',
							'Б'
						], [
							'.',
							'Ю'
						],

						[
							'Й',
							'Й'
						], [
							'Ц',
							'Ц'
						], [
							'У',
							'У'
						], [
							'К',
							'К'
						], [
							'Е',
							'Е'
						], [
							'Н',
							'Н'
						], [
							'Г',
							'Г'
						], [
							'Ш',
							'Ш'
						], [
							'Щ',
							'Щ'
						], [
							'З',
							'З'
						], [
							'Х',
							'Х'
						], [
							'Ъ',
							'Ъ'
						],
						[
							'Ф',
							'Ф'
						], [
							'Ы',
							'Ы'
						], [
							'В',
							'В'
						], [
							'А',
							'А'
						], [
							'П',
							'П'
						], [
							'Р',
							'Р'
						], [
							'О',
							'О'
						], [
							'Л',
							'Л'
						], [
							'Д',
							'Д'
						], [
							'Ж',
							'Ж'
						], [
							"Э",
							'Э'
						], [
							"Ё",
							'Ё'
						],
						[
							'Я',
							'Я'
						], [
							'Ч',
							'Ч'
						], [
							'С',
							'С'
						], [
							'М',
							'М'
						], [
							'И',
							'И'
						], [
							'Т',
							'Т'
						], [
							'Ь',
							'Ь'
						], [
							'Б',
							'Б'
						], [
							'Ю',
							'Ю'
						]
					);

					var newStr = new String();

					for (var i = 0; i < str.length; i++) {

						var ch = str.charAt(i);
						var newCh = '';

						for (var j = 0; j < lat2cyrChars.length; j++) {
							if (ch == lat2cyrChars[j][0]) {
								newCh = lat2cyrChars[j][1];
							}
						}

						newStr += newCh;
					}
					return newStr.replace(/[-]{2,}/gim, '-').replace(/\n/gim, '');
				},
				transform = function(e) {
					word = $input.val();
					word = word.toUpperCase();
					$input.val(lat2cyr(word));
				},
				init = function() {
					$input.keyup(transform);
				};

			init();
		});
	};

	// инпут кодового слова
	var codeWordInput = $('input[name=form_text_2276]');

	// применяем к кодовому слову правила подстановки кириллических символов взамен латинским
	codeWordInput.codeWord();

	//КЛАДР блок регистрации
	var $kladrBlock = $('.kladr-registration');

	$kladrBlock.parent().find('input[name="form_radio_REGISTR"]').change(function() {
		if ($(this).attr('data-registr') == 'Y') {
			$kladrBlock.find('li[data-group-item="kladr-index"], li[data-group-item="kladr-region"]').show();
			$('[data-block="registration-exist"]').removeClass('hidden');
		} else {
			$kladrBlock.find('li[data-group="kladr"]').hide();
			$('[data-block="registration-exist"]').addClass('hidden');
		}
	});


	//проверка предвыбора статуса заявки
	var bChecked = $('input[name="form_radio_status"]').is(':checked');
	if (bChecked) {
		var val = $('input[name="form_radio_status"]:checked').val();
		if (val == 'status_old') {
			$('.form-old-block').removeClass('hidden');
			$('.ccStepBlockWrapper').not('.ccStepBlockWrapper:eq(0)').addClass('hidden');
			$('.button-container').addClass('hidden');
		}
	}

	//статус заявки
	if ($('input[name="form_radio_status"]:checked').val() == 'status_old') {
		$('form[name="CREDIT_CASH"]').attr('action', '/getproduct/full/');
	}

	//статус заявки
	$('input[name="form_radio_status"]').change(function() {
		var val = $(this).val();

		if (val == 'status_new') {
			$('form[name="CREDIT_CASH"]').attr('action', '/getproduct/short/');
			$('.ccStepBlockWrapper').each(function(i) {
				$(this).removeClass('hidden');
			});
			$('.button-container').removeClass('hidden');

			$('.form-old-block').addClass('hidden');

			hideError("input[name=shortFromId]");
			hideError("input[name=form_old_bdate]");
			hideError('a[id=cancel_app]');


			cardChoise.clearCard();
		} else {
			$('form[name="CREDIT_CASH"]').attr('action', '/getproduct/full/');
			$('.ccStepBlockWrapper').not('.ccStepBlockWrapper:eq(0)').addClass('hidden');
			$('.button-container').addClass('hidden');

			$('.form-old-block').removeClass('hidden');

			cardChoise.clearCard();
			cardChoise.hideIncomeAdmNextMethodBlock();
		}


	});

	//проверка кода и даты рождения для продолжения анкетирования
	$('button[name="form_old_continue"], a[id="cancel_app"]').live('click', function(e) {
		//e.preventDefault();

		var id = $('input[name="shortFromId"]').val(),
			bday = $('input[name="form_old_bdate"]').val(),
			formId = $('input[name="form_old_id"]').val(),
			valid = true,
			bAjax = true,
			bAjaxResult = false;

		//проверка кода
		if (id.length <= 0) {
			showError("input[name=shortFromId]", "Укажите код");
			valid = false;
		} else {
			hideError("input[name=shortFromId]");
		}

		//проверка даты рождения
		if (bday.length < 10) {
			showError("input[name=form_old_bdate]", "Укажите дату вашего рождения");
			valid = false;
		} else {
			hideError("input[name=form_old_bdate]");
		}

		//отправка ajax на наличие результата с таким id и даты в нем
		if (valid && bAjax) {
			bAjax = false;

			var ajaxData = {
				'formId': formId,
				'id': id,
				'bday': bday
			};

			// если нажата кнопка "Отменить заявку", а не "Продолжить"
			if($(this).attr('id') == 'cancel_app')
			{
				ajaxData.isCancelThisApp = true;
			}


			$.ajax({
				url: '/ajax/check-form-access.php',
				type: 'post',
				dataType: 'json',
				async: false,
				data: ajaxData,
				success: function(result) {
					// console.log('success', result);

					// скрываем сообщение об отмененной заявке
					hideError('a[id=cancel_app]');

					bAjax = true;

					if (result.status == false) {
						if (result.statusId == false) {
							showError('input[name="shortFromId"]', 'Заявка не найдена или полностью заполнена. Возможно, вы указываете неверный номер, или заявка уже была удалена нами как полностью заполненная или устаревшая. Если вы не заполняли анкету с дополнительными вопросами в течение 14 дней, то ваша заявка просрочена - рекомендуем <a href="/getproduct/short/?utm_source=appmtsbank&utm_medium=repeat&utm_content=repeatlink&utm_campaign=c-credit">оформить новую заявку</a>.');
						} else {
							if (result.oppStatus.length == 0) {
								showError('input[name="shortFromId"]', 'Заявка не найдена или полностью заполнена. Возможно, вы указываете неверный номер, или заявка уже была удалена нами как полностью заполненная или устаревшая. Если вы не заполняли анкету с дополнительными вопросами в течение 14 дней, то ваша заявка просрочена - рекомендуем <a href="/getproduct/short/?utm_source=appmtsbank&utm_medium=repeat&utm_content=repeatlink&utm_campaign=c-credit">оформить новую заявку</a>.');
							} else {
								if (result.birthDate.length != 10) {
									showError('input[name="form_old_bdate"]', 'Дата рождения указана неверно. Попробуйте еще раз.');
								}
								else {
									// оставшиеся варианты (например заявка отменена клиентом, "oppStatus":"DECLINED.REQUEST")
									showError('input[name="shortFromId"]', 'Заявка не найдена или полностью заполнена. Возможно, вы указываете неверный номер, или заявка уже была удалена нами как полностью заполненная или устаревшая. Если вы не заполняли анкету с дополнительными вопросами в течение 14 дней, то ваша заявка просрочена - рекомендуем <a href="/getproduct/short/?utm_source=appmtsbank&utm_medium=repeat&utm_content=repeatlink&utm_campaign=c-credit">оформить новую заявку</a>.');
								}
							}
						}
					} else {

						// если в результате запроса была отменена заявка
						if(result.cancelAppSuccess != undefined && result.cancelAppSuccess != 'undefined' && result.cancelAppSuccess != null)
						{
							console.log('Ваша заявка отменена, но вы в любой момент при необходимости можете отправить новую. Возвращайтесь! :)');
							showError('a[id=cancel_app]', 'Ваша заявка отменена, но вы в любой момент при необходимости можете отправить новую. Возвращайтесь! :)');
						}
						else
						{
							// переход к длинной заявке
							hideError('input[name="shortFromId"]');
							hideError('input[name="form_old_bdate"]');

							bAjaxResult = true;
							//$('#c-credit').submit();
							//console.log(result);
							//редирект на полую страницу
							//window.location.href = '/getproduct/full/?shortFromId=' + id;
						}
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$responseBeginBlock.addClass('hidden');
					$methodBlock.filter('[data-type="no-response"]').removeClass('hidden');
					console.log(jqXHR, textStatus, errorThrown);
				}
			});

			return bAjaxResult;
		} else {
			return false;
		}
	});

	//дата рождения - плэйсхолдер
	$('input[name="form_text_769"], input[name="form_text_773"], input[name="form_old_bdate"], input[name="form_text_1950"]').mask("99.99.9999");

	//пасспорт - плэйсхолдер
	$("input[name='form_text_772'], input[name='form_text_1051']").mask("9999 999999");

	//Код подразделения, выдавшего паспорт - плэйсхолдер
	$("input[name='form_text_774']").mask("999-999");

	//Дата регистрации - плэйсхолдер
	// $("input[name='form_text_1950']").mask("99.9999");

	//выбор прописки
	$("input[name=form_email_696]").css("display", "none");
	$('input[name="form_checkbox_SUBSCR[]"]').live("change", function() {
		$('input[name="form_checkbox_SUBSCR[]"]').toggleClass("on");
		var val = $("input[name=form_text_655]").val();
		if ($(this).hasClass("on")) {
			$("input[name=form_email_696]").val(val);
			$("input[name=form_email_696]").css("display", "block");
		} else {
			$("input[name=form_email_696]").val('');
			$("input[name=form_email_696]").css("display", "none");
		}
	});

	//Обработка клика по ссылке в блоке "подтверждение смс" "Получить код еще раз"
	$('.repeat-sms').live("click", function() {
		return false;
	});

	//Обработка клика по ссылке в блоке "подтверждение смс" "Изменить"
	$('.change-number-sms').live("click", function() {
		return false;
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

	//блок Старый паспорт
	$('input[name="form_radio_changePassport"]').change(function() {
		var val = $(this).val(),
			$citizen = $(this).parents('ul').find('[data-block="change-passport"]');

		if (val == '1948') {
			$citizen.removeClass('hidden');
		} else {
			$citizen.addClass('hidden');
		}
	});

	// блок выберите продукт
	// отображаем/скрываем блоки с полями кредита/полями карты
	$('input[name="form_radio_chooseProduct"]').change(function() {
		var val = $(this).val();
		var valueCredit = 2266;
		var valueCard = 2267;

		// скрываем всю валидацию блока " Информация о продукте "

		// скрытие валидации по картам
		hideError("#subProductType");
		hideError("#cardType");
		hideError("#currency");
		hideError("#plastCat");
		hideError('input[name="form_text_2268"]');
		hideError('input[name="form_text_2269"]');
		hideError("#cardCategory");
		hideError(".region-select");
		hideError(".city-select");
		hideError(".office-select");

		// скрытие валидации по кредитам
		hideError('input[name="form_radio_creditSalaryCard"]');
		hideError('input[name="form_radio_creditExist"]');
		hideError('input[name="form_radio_creditExSalaryCard"]');
		hideError("input[name=form_text_635]");
		hideError("input[name=form_text_636]");


		if (val == valueCredit) {
			$('.info-product-block-credit').show();
			$('.info-product-block-card').hide();
		}
		else if (val == valueCard) {
			$('.info-product-block-credit').hide();
			$('.info-product-block-card').show();


		}
	});


	//показ блока с телефоном
	$('input[name="form_radio_next_method"]').change(function() {
		var $this = $(this),
			val = $this.val(),
			$phoneBlock = $this.parents('.next-method').find('.phone-block');

		if (val == '1477') {
			$phoneBlock.removeClass('hidden');
		} else {
			$phoneBlock.addClass('hidden');
		}
	});

	//дублирование кода телефона
	$('input[name="form_text_648"]').each(function(i) {
		var $this = $(this),
			changeSecondField = function() {
				var value = $(this).val();
				$('input[name="form_text_648"]').not(':eq(' + i + ')').val(value);
			};

		$this.keyup(changeSecondField);
	});

	//дублирование телефона
	$('input[name="form_text_649"]').each(function(i) {
		var $this = $(this),
			changeSecondField = function() {
				var value = $(this).val();
				$('input[name="form_text_649"]').not(':eq(' + i + ')').val(value);
			};

		$this.keyup(changeSecondField);
	});

	//Согласие получать информацию
	$('input[name="allow_receive"]').change(function() {
		$('input[name="form_hidden_1963"]').val($(this).is(':checked'));
	});


	//Калькулятор Платеж по кредиту
	$.fn.paymentCalculator = function() {
		return this.each(function() {
			var $payment = $(this),
				$sum = $payment.parents('form').find('input[name="form_text_635"]'),
				$period = $payment.parents('form').find('input[name="form_text_636"]'),
				$paymentShow = $payment.parents('form').find('.creditPayment'),
				sum = 0,
				period = 0,
				payment = 0,
				formattedPayment = 0,
				rate = 0,
				monthRate = 0,
				getRate = function(sum, period) {
					rate = 20.99;

					if (sum <= 250999) {
						rate = 20.99;
					} else if (sum > 250999 && sum <= 600999) {
						if (period == 12) {
							rate = 16.99;
						} else if (period > 12) {
							rate = 18.99;
						}
					} else if (sum > 600999) {
						if (period == 12) {
							rate = 14.99;
						} else if (period > 12) {
							rate = 16.99;
						}
					}

					return rate / 100;
				},
				formatNumber = function(number) {
					return Math.round(number).toString().toString().replace(/ /g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
				},
				calculate = function(e) {
					sum = parseInt($sum.val());
					period = parseInt($period.val());

					if (!isNaN(sum) && !isNaN(period) && period != 0) {
						rate = getRate(sum, period);
						monthRate = rate / 12;
						payment = sum * (monthRate + (monthRate / (Math.pow((1 + monthRate), period) - 1)));
						formattedPayment = formatNumber(payment);

						$payment.val(formattedPayment);
						$paymentShow.text(formattedPayment == '0' ? '—' : formattedPayment);
					}
				},
				init = function() {
					$sum.keyup(calculate);
					$period.keyup(calculate);
				};
			init();
		});
	};
	$('input[name="form_hidden_1964"]').paymentCalculator();

	//убирание пробелов для цифровых полей
	var digitalFieldsObject = new digitalFields('input[name="form_text_1965"], input[name="form_text_1068"], input[name="form_text_635"], input[name="form_text_636"], input[name="form_text_2270"]');

	//переход на следующий шаг
	$("button[name=web_form_submit]").live("click", function() {
		var resultat = true;

		// выбор продукта
		var selectedProduct = $('input[name="form_radio_chooseProduct"]:checked').val();

		// если никакое значение не выбрано
		if ($.trim(selectedProduct) == '') {
			showError("input[name=form_radio_chooseProduct]", 'Выберите продукт');
		} else {
			hideError("input[name=form_radio_chooseProduct]");

			// если выбран продукт "мне нужен кредит",
			// тогда валидируем поля "Сумма кредита" и "Срок кредита"
			if (selectedProduct == 2266) {
				//Я получаю зарплату на карту МТС Банка
				// var creditSalaryCard =  parseInt($('input[name="form_radio_creditSalaryCard"]:checked').val());
				// if ($('input[name="form_radio_creditSalaryCard"]:checked').length == 0) {
				// 	showError('input[name="form_radio_creditSalaryCard"]', 'Укажите, получаете ли вы зарплату на карту МТС Банка');
				// } else {
				// 	hideError('input[name="form_radio_creditSalaryCard"]');
				//
				// 	if (creditSalaryCard == 2278) {
				// 		//У меня был / есть в настоящий момент кредит в МТС Банке
				// 		var creditExist = parseInt($('input[name="form_radio_creditExist"]:checked').val());
				// 		if ($('input[name="form_radio_creditExist"]:checked').length == 0) {
				// 			showError('input[name="form_radio_creditExist"]', 'Укажите, был / есть ли у вас в настоящий момент кредит в МТС Банке');
				// 		} else {
				// 			hideError('input[name="form_radio_creditExist"]');
				//
				// 			if (creditExist == 2280) {
				// 				//Ранее я получал зарплату на карту МТС Банка
				// 				var creditExSalaryCard = parseInt($('input[name="form_radio_creditExSalaryCard"]:checked').val());
				// 				if ($('input[name="form_radio_creditExSalaryCard"]:checked').length == 0) {
				// 					showError('input[name="form_radio_creditExSalaryCard"]', 'Укажите получали ли вы ранее зарплату на карту МТС Банка');
				// 				} else {
				// 					hideError('input[name="form_radio_creditExSalaryCard"]');
				// 				}
				// 			}
				// 		}
				// 	}
				// }

				//проверка суммы кредита
				//корректировка введенного значения
				var valRaw = $("input[name=form_text_635]").val();
				var val = valRaw.replace(/ /g, "");
				$("input[name=form_text_635]").val(val);
				var digitPattern = /^[\d]+$/;
				//если значение не введено
				if (val.length <= 0) {
					hideError("input[name=form_text_635]");
					showError("input[name=form_text_635]", "Укажите сумму кредита от 20 000 до 3 000 000 рублей"); //Укажите сумму кредита
					resultat = false;
				} else if (!digitPattern.test(val)) {
					//если значение не цифра
					hideError("input[name=form_text_635]");
					showError("input[name=form_text_635]", "Укажите сумму кредита от 20 000 до 3 000 000 рублей"); //Укажите сумму кредита
					resultat = false;
				} else {
					hideError("input[name=form_text_635]");

					if (val < 20000 || val > 3000000) {
						showError("input[name=form_text_635]", "Укажите сумму кредита от 20 000 до 3 000 000 рублей");
						resultat = false;
					} else {
						hideError("input[name=form_text_635]");
					}
				}

				//проверка срока кредита
				var val = jQuery.trim($("input[name=form_text_636]").val());
				$("input[name=form_text_636]").val(val);
				var digitPattern = /^[\d]+$/;
				if (val.length <= 0) {
					showError("input[name=form_text_636]", "Укажите срок кредита от 12 до 60 месяцев");
					resultat = false;
				} else if (!digitPattern.test(val)) {
					showError("input[name=form_text_636]", "Укажите срок кредита от 12 до 60 месяцев");
					resultat = false;
				} else {
					if (val < 12 || val > 60) {
						showError("input[name=form_text_636]", "Укажите срок кредита от 12 до 60 месяцев");
						resultat = false;
					} else {
						hideError("input[name=form_text_636]");
					}
				}
			}
			// Если выбран продукт "мне нужна карта"
			else {
				// Выберите карту
				if ($.trim($('select#subProductType').val()) == '') {
					showError("#subProductType", 'Выберите карту');
				} else {
					hideError("#subProductType");
				}

				// тип карты
				var selectCardType = $('select#cardType');
				if (selectCardType.length > 0 && $.trim(selectCardType.val()) == '') {
					showError("#cardType", 'Выберите тип карты');
				} else {
					hideError("#cardType");
				}

				// валюта
				var currency = $('select#currency');
				if (currency.length > 0 && $.trim(currency.val()) == '') {
					showError("#currency", 'Выберите валюту');
				} else {
					hideError("#currency");
				}

				// Способ выпуска
				var plastCat = $('select#plastCat');
				var checkLatName = false;
				if (plastCat.length > 0 && $.trim(plastCat.val()) == '') {
					showError("#plastCat", 'Выберите способ выпуска');
				} else {
					if (parseInt(plastCat.val()) == 12) {
						checkLatName = true;
					}
					hideError("#plastCat");
				}

				//if named card
				if (checkLatName) {
					var latLastName = $.trim($('input[name="form_text_2268"]').val());
					var latName = $.trim($('input[name="form_text_2269"]').val());

					if (latLastName.length) {
						hideError('input[name="form_text_2268"]');
					} else {
						showError('input[name="form_text_2268"]', 'Укажите фамилию (латиница)');
					}

					if (latName.length > 0) {
						hideError('input[name="form_text_2269"]');
					} else {
						showError('input[name="form_text_2269"]', 'Укажите имя (латиница)');
					}
				} else {
					hideError('input[name="form_text_2268"]');
					hideError('input[name="form_text_2269"]');
				}

				// Категория карты
				var cardCategory = $('select#cardCategory');
				if (cardCategory.length > 0 && $.trim(cardCategory.val()) == '') {
					showError("#cardCategory", 'Выберите категорию карты');
				} else {
					hideError("#cardCategory");
				}

				// валидация выбора полей офиса, если у них установлена метка обязательности
				var regionWrap = $('.shoose-office-wrap'),
					cityWrap = $('#citySelector'),
					officeWrap = $('#officeSelector'),

					regionDropdown = regionWrap.find('select'),
					cityDropdown = cityWrap.find('select'),
					officeDropdown = officeWrap.find('select');

				// регион
				if (regionDropdown.attr('data-required') == 'true' && ($.trim(regionDropdown.val()) == '' || $.trim(regionDropdown.val()) == '0')) {
					showError(".region-select", 'Выберите регион получения карты');
				}
				else {
					hideError(".region-select");
				}

				// город
				if (cityDropdown.attr('data-required') == 'true' && ($.trim(cityDropdown.val()) == '' || $.trim(cityDropdown.val()) == '0')) {
					showError(".city-select", 'Выберите город получения карты');
				}
				else {
					hideError(".city-select");
				}

				// офис
				if (officeDropdown.attr('data-required') == 'true' && ($.trim(officeDropdown.val()) == '' || $.trim(officeDropdown.val()) == '0')) {
					showError(".office-select", 'Выберите офис получения карты');
				}
				else {
					hideError(".office-select");
				}

				// валидация поля "Желаемый кредитный лимит" (по карте)
				var creditLimitWrap = $('.credit-limit-wrap');
				var creditLimitInput = creditLimitWrap.find('input');

				if (creditLimitInput.attr('data-required') == 'true') {
					if ($.trim(creditLimitInput.val()) != '') {
						hideError("input[name=form_text_2270]");

						// проверка введенного значения, входит ли в допустимый диапазон
						var creditLimitValue = $.trim(creditLimitInput.val());

						var minLimit = cardChoise.formatStringToNumber($.trim(creditLimitWrap.find('.label-currency-min').text()));
						var maxLimit = cardChoise.formatStringToNumber($.trim(creditLimitWrap.find('.label-currency-max').text()));

						if (creditLimitValue >= minLimit && creditLimitValue <= maxLimit) {
							hideError("input[name=form_text_2270]");
						} else {
							showError("input[name=form_text_2270]", 'Введите сумму желаемого кредитного лимита от ' + cardChoise.formatNumberToString(minLimit) + ' до ' + cardChoise.formatNumberToString(maxLimit) + ' ' + $('.label-currency:first').text());
						}
					} else {
						showError("input[name=form_text_2270]", 'Заполните желаемый кредитный лимит');
					}
				} else {
					hideError("input[name=form_text_2270]");
				}

			}
		}


		//проверка фамилии
		var val = jQuery.trim($("input[name=form_text_640]").val());
		if (val.length <= 0 || val.length >= 85 || !validateName(val)) {
			showError("input[name=form_text_640]", "Укажите фамилию");
			resultat = false;
		} else {
			hideError("input[name=form_text_640]");
		}

		//проверка имени
		var val = jQuery.trim($("input[name=form_text_641]").val());
		if (val.length <= 0 || val.length >= 85 || !validateName(val)) {
			showError("input[name=form_text_641]", "Укажите имя");
			resultat = false;
		} else {
			hideError("input[name=form_text_641]");
		}

		//проверка отчества
		var val = jQuery.trim($("input[name=form_text_642]").val());
		if (val.length <= 0 || val.length >= 85) {

		} else {
			if (!validateName(val)) {
				showError("input[name=form_text_642]", 'Укажите отчество');
				resultat = false;
			} else {
				hideError("input[name=form_text_642]");
			}
		}

		//проверка смены ФИО
		var val = $("input[name=form_radio_flagChangeFIO]:checked").val();
		if (!val) {
			showError("input[name=form_radio_flagChangeFIO]", "Укажите, меняли ли вы ФИО");
			resultat = false;
		} else {
			hideError("input[name=form_radio_flagChangeFIO]");
		}
		if (val == '1944') {
			//проверка прежней фамилии
			var val = jQuery.trim($("input[name=form_text_1945]").val());
			if (val.length <= 0 || val.length >= 85 || !validateName(val)) {
				showError("input[name=form_text_1945]", "Укажите прежнюю фамилию");
				resultat = false;
			} else {
				hideError("input[name=form_text_1945]");
			}
			//проверка прежнего имени
			var val = jQuery.trim($("input[name=form_text_1946]").val());
			if (val.length <= 0 || val.length >= 85 || !validateName(val)) {
				showError("input[name=form_text_1946]", "Укажите прежнее имя");
				resultat = false;
			} else {
				hideError("input[name=form_text_1946]");
			}
			//проверка прежнего отчество
			var val = jQuery.trim($("input[name=form_text_1947]").val());
			if (val.length <= 0 || val.length >= 85) {

			} else {
				if (!validateName(val)) {
					showError("input[name=form_text_1947]", 'Укажите прежнее отчество');
					resultat = false;
				} else {
					hideError("input[name=form_text_1947]");
				}
			}
		} else {
			hideError("input[name=form_text_1945]");
			hideError("input[name=form_text_1946]");
			hideError("input[name=form_text_1947]");
		}

		//проверка возраста
		var val = $("input[name='form_text_769']").val();

		if (val.length < 3) {
			showError("input[name='form_text_769']", "Укажите дату рождения");
			resultat = false;
		} else {
			hideError("input[name=form_text_769]");

			if (!validateDate(val)) {
				showError("input[name='form_text_769']", "Укажите вернуюю дату рождения");
				resultat = false;
			} else {

				function age(a) {
					if (!a) {
						return '';
					}
					// Get Current Date
					var now = new Date();
					var y = now.getFullYear();
					var m = now.getMonth() + 1;
					var d = now.getDate();
					if (!y) {
						return '';
					}

					// Split User's Birthday
					aa = a.match(/^([0-9]+).([0-9]+).([0-9]+)/);
					if (!aa[3]) {
						return '';
					}

					// Get User's Age
					var age = y - aa[3];
					if (m == aa[2] && d < aa[1]) {
						age--;
					}
					else if (m < aa[2]) {
						age--;
					}
					return age;
				}

				var yearBithInput = 0;

				yearBithInput = val.match(/^([0-9]+).([0-9]+).([0-9]+)/);
				yearBithInput = yearBithInput[3];

				var bithYear = 0;

				bithYear = age(val);

				if (bithYear < 18 || bithYear > 68) {
					showError("input[name='form_text_769']", "Ваш возраст должен быть от 18 до 68 лет");
					resultat = false;
				}
				else {
					hideError("input[name=form_text_769]");
				}
			}
		}

		//Преверка места рождения
		var val = $("input[name='form_text_1908']").val();
		if (val.length == 0) {
			showError("input[name='form_text_1908']", "Укажите место рождения");
			resultat = false;
		} else {
			hideError("input[name=form_text_1908]");
		}

		//проверка пола
		var val = $("input[name=form_radio_POL]:checked").val();
		if (!val) {
			showError("input[name=form_radio_POL]", "Укажите пол (мужской, женский)");
			resultat = false;
		}
		else {
			hideError("input[name=form_radio_POL]");
		}

		//проверка гражданства
		val = $("input[name=form_radio_NATIONALITY]:checked").val();
		if (val == 645) {
			hideError("input[name=form_radio_NATIONALITY]:eq(0)");
			showError("input[name=form_radio_NATIONALITY]:eq(0)", "МТС Банк предоставляет кредиты или карты только гражданам РФ");
			resultat = false;
		}
		else {
			if (!val) {
				showError("input[name=form_radio_NATIONALITY]", "Укажите гражданство");
				resultat = false;
			}
			else {
				hideError("input[name=form_radio_NATIONALITY]:eq(0)");
			}
		}

		//проверка пасспорта
		var val = jQuery.trim($("input[name=form_text_772]").val());
		if (val.length < 11) {
			showError("input[name=form_text_772]", "Укажите серию/номер паспорта");
			resultat = false;
		}
		else {
			hideError("input[name=form_text_772]");
		}

		//проверка даты выдачи пасспорта
		var val = $("input[name='form_text_773']").val();
		if (val.length < 10) {
			showError("input[name='form_text_773']", "Укажите дату выдачи паспорта");
			resultat = false;
		}
		else {
			hideError("input[name=form_text_773]:eq(0)");

			if (!validateDate(val)) {
				showError("input[name='form_text_773']", "Укажите вернуюю дату выдачи паспорта.");
				resultat = false;
			} else {
				var passportYearInput = 0;
				passportYearInput = val.match(/^([0-9]+).([0-9]+).([0-9]+)/);
				passportYearInput = passportYearInput[3];
				var pro = passportYearInput - yearBithInput;

				if (pro < 14) {
					showError("input[name='form_text_773']", "Проверьте дату выдачи паспорта и дату рождения.");
					resultat = false;
				} else if (bithYear >= 14 && bithYear < 20) {
					if (pro > 20) {
						showError("input[name='form_text_773']", "Проверьте дату выдачи паспорта и дату рождения. Возможно, у вас закончился срок действия паспорта");
						resultat = false;
					} else {
						hideError("input[name=form_text_773]:eq(0)");
					}
				} else if (bithYear >= 20 && bithYear < 45) {

					if (pro < 20) {
						showError("input[name='form_text_773']", "Проверьте дату выдачи паспорта и дату рождения.");
						resultat = false;
					} else if (pro > 45) {
						showError("input[name='form_text_773']", "Проверьте дату выдачи паспорта и дату рождения. Возможно, у вас закончился срок действия паспорта");
						resultat = false;
					} else {
						hideError("input[name=form_text_773]:eq(0)");
					}
				} else if (bithYear >= 45) {
					if (pro < 45) {
						showError("input[name='form_text_773']", "Проверьте дату выдачи паспорта и дату рождения. Возможно, у вас закончился срок действия паспорта");
						resultat = false;
					} else {
						hideError("input[name=form_text_773]:eq(0)");
					}
				}
			}
		}

		//проверка "Кем выдан"
		var val = jQuery.trim($("input[name=form_text_1050]").val());
		if (val.length <= 0 || val.length >= 160) {
			showError("input[name=form_text_1050]", "Укажите, каким органом выдан ваш действующий паспорт");
			resultat = false;
		}
		else {
			hideError("input[name=form_text_1050]");
		}

		//проверка Код подразделения, выдавшего паспорт
		var val = jQuery.trim($("input[name=form_text_774]").val());
		if (val.length <= 0) {
			showError("input[name=form_text_774]", "Укажите код подразделения");
			resultat = false;
		}
		else {
			hideError("input[name=form_text_774]");
		}

		//проверка "Можете указать сведения старого паспорта?"
		var val = $("input[name=form_radio_changePassport]:checked").val();
		if (!val) {
			showError("input[name=form_radio_changePassport]", "Укажите, можете ли вы указать сведения старого паспорта");
			resultat = false;
		} else {
			hideError("input[name=form_radio_changePassport]");
		}

		if (val == '1948') {
			//проверка "Старый паспорт"
			var val = jQuery.trim($("input[name=form_text_1051]").val());
			if (val.length <= 0 || val.length >= 35) {
				showError("input[name=form_text_1051]", "Укажите серию/номер старого паспорта");
				resultat = false;
			} else {
				hideError("input[name=form_text_1051]");
			}
		} else {
			hideError("input[name=form_text_1051]");
		}

		//проверка Постоянная регистрация (прописка) на территории РФ
		val = $("input[name=form_radio_REGISTR]:checked").val();
		if (!val) {
			showError("input[name=form_radio_REGISTR]", "Укажите наличие постоянной регистрации");
			resultat = false;
			hideError('input[name=form_text_1950]');
		} else {
			if (val == 790) {
				hideError("input[name=form_radio_REGISTR]:eq(0)");
				showError("input[name=form_radio_REGISTR]:eq(0)", "МТС Банк предоставляет кредиты или карты только при наличии постоянной регистрации");
				resultat = false;
				hideError('input[name=form_text_1950]');
			} else {
				hideError("input[name=form_radio_REGISTR]:eq(0)");

				//проверка Дата регистрации
				var val = jQuery.trim($('input[name=form_text_1950]').val());
				if (val.length <= 0) {
					showError('input[name=form_text_1950]', 'Укажите дату регистрации');
					resultat = false;
				} else {
					hideError('input[name=form_text_1950]');
					var day = parseInt(val.substr(0, 2));
					var month = parseInt(val.substr(3, 2));
					var year = parseInt(val.substr(6, 4));
					if (day < 0 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
						showError('input[name=form_text_1950]', 'Укажите правильную дату регистрации');
						resultat = false;
					}
				}
			}
		}
		// валидация полей КЛАДР, функция определена в файле script.js шаблона компонента кладр
		//kladrValidation();

		//проверка сотового телефона
		var codeVal = $('input[name=form_text_648]').val();
		var phoneVal = $('input[name=form_text_649]').val();
		if (codeVal.length > 0 || phoneVal.length > 0) {
			var digitPattern = /^[\d]+$/;
			if (!digitPattern.test(codeVal) || !digitPattern.test(phoneVal)) {
				showError("input[name=form_text_648]", "Укажите верно мобильный телефон – код и номер должны состоять из десяти цифр");
				$("input[name=form_text_649]").addClass("error");
				resultat = false;
			} else if (codeVal.length + phoneVal.length != 10) {
				showError("input[name=form_text_648]", "Укажите верно мобильный телефон – код и номер должны состоять из десяти цифр");
				$("input[name=form_text_649]").addClass("error");
				resultat = false;
			} else if (codeVal.length < 3 || codeVal.length > 5) {
				showError("input[name=form_text_648]", "Код телефона должен включать от 3 до 5 цифр");
				$("input[name=form_text_649]").addClass("error");
				resultat = false;
			} else if (phoneVal.length < 5 || phoneVal.length > 7) {
				showError("input[name=form_text_648]", "Номер телефона должен включать от 5 до 7 цифр");
				$("input[name=form_text_649]").addClass("error");
				resultat = false;
			} else {
				hideError("input[name=form_text_648]");
				$("input[name=form_text_649]").removeClass("error");
			}
		} else {
			showError("input[name=form_text_648]", "Укажите номер мобильного телефона");
			$("input[name=form_text_649]").addClass("error");
			resultat = false;
		}

		//проверка e-mail если заполнен
		var val = $.trim($("input[name=form_text_655]").val());
		if (val.length > 0) {
			//var emailPattern = /^[a-zA-Z0-9._@-]+$/;
			var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			if (!emailPattern.test(val)) {
				showError("input[name=form_text_655]", "Укажите правильный адрес электронной почты");
				resultat = false;
			} else {
				hideError("input[name=form_text_655]");
			}
		} else {
			showError("input[name=form_text_655]", "Укажите правильный адрес электронной почты");
			resultat = false;
			//hideError("input[name=form_text_655]");
		}

		// проверка на пустоту кодового слова
		if ($.trim(codeWordInput.val()) == '') {
			showError("input[name=form_text_2276]", "Укажите кодовое слово");
		}
		else {
			hideError("input[name=form_text_2276]");
		}


		// валидируем поля доходов и расходов только если обязательность полей не снята
		//Ваш среднемесячный доход (до вычета налогов)
		if ($('input[name=form_text_1965]').attr('data-required') != 'false') {

			var val = jQuery.trim($('input[name=form_text_1965]').val());
			var digitalPattern = /^[\d]{1,15}$/;
			if (!digitalPattern.test(val)) {
				showError('input[name=form_text_1965]', 'Укажите ваш доход в месяц');
				resultat = false;
			} else {
				hideError('input[name=form_text_1965]');
			}
		}
		else {
			hideError('input[name=form_text_1965]');
		}

		// //Ваш среднемесячный расход
		// if ($('input[name=form_text_1965]').attr('data-required') != 'false') {
		//
		// 	var val = jQuery.trim($('input[name=form_text_1966]').val());
		// 	var digitalPattern = /^[\d]{1,15}$/;
		// 	if (!digitalPattern.test(val)) {
		// 		showError('input[name=form_text_1966]', 'Укажите ваш расход в месяц');
		// 		resultat = false;
		// 	} else {
		// 		hideError('input[name=form_text_1966]');
		// 	}
		// }
		// else {
		// 	hideError('input[name=form_text_1966]');
		// }


		// проверка Выбор способа дальнейшего анкетирования
		bChecked = $('input[name="form_radio_next_method"]').is(':checked');

		if (!bChecked) {
			showError('input[name="form_radio_next_method"]', "Вы не выбрали способа дальнейшего анкетирования");

			hideError('.next-method input[name="form_text_648"]');
			hideError('.next-method input[name="form_text_649"]');
			$('.next-method input[name="form_text_648"]').removeClass('error');
			$('.next-method input[name="form_text_649"]').removeClass('error');
			resultat = false;
		} else {
			hideError('input[name="form_radio_next_method"]');
			var nextMethod = $('input[name="form_radio_next_method"]:checked').val();
			if (nextMethod == '1477') {
				//проверка сотового телефона
				var codeVal = $(".next-method input[name=form_text_648]").val();
				var phoneVal = $(".next-method input[name=form_text_649]").val();
				if (codeVal.length > 0 || phoneVal.length > 0) {
					var digitPattern = /^[\d]+$/;
					if (!digitPattern.test(codeVal) || !digitPattern.test(phoneVal)) {
						showError(
							".next-method input[name=form_text_648]",
							"Укажите верно мобильный телефон – код и номер должны состоять из десяти цифр"
						);
						$(".next-method input[name=form_text_649]").addClass("error");
						resultat = false;
					} else {
						if (codeVal.length + phoneVal.length != 10) {
							showError(
								".next-method input[name=form_text_648]",
								"Укажите верно мобильный телефон – код и номер должны состоять из десяти цифр"
							);
							$(".next-method input[name=form_text_649]").addClass("error");
							resultat = false;
						} else {
							if (codeVal.length < 3 || codeVal.length > 5) {
								showError(".next-method input[name=form_text_648]", "Код телефона должен включать от 3 до 5 цифр");
								$(".next-method input[name=form_text_649]").addClass("error");
								resultat = false;
							} else {
								if (phoneVal.length < 5 || phoneVal.length > 7) {
									showError(".next-method input[name=form_text_648]", "Номер телефона должен включать от 5 до 7 цифр");
									$(".next-method input[name=form_text_649]").addClass("error");
									resultat = false;
								} else {
									hideError('.next-method input[name=form_text_648]');
									$(".next-method input[name=form_text_649]").removeClass("error");
								}
							}
						}
					}
				} else {
					showError('.next-method input[name=form_text_648]', "Укажите номер мобильного телефона");
					$(".next-method input[name=form_text_649]").addClass("error");
					resultat = false;
				}
			} else {
				hideError('.next-method input[name="form_text_648"]');
				hideError('.next-method input[name="form_text_649"]');
				$('.next-method input[name="form_text_648"]').removeClass('error');
				$('.next-method input[name="form_text_649"]').removeClass('error');
			}
		}

		//проверка "Являетесь ли вы?"
		var val = $("select[name=form_dropdown_statusIPDL]").val();
		if (val != '1958') {
			showError("select[name=form_dropdown_statusIPDL]", "В связи с тем, что вы имеете отношение к иностранным публичным лицам, для оформления заявки на карту МТС Деньги обратитесь в любой офис МТС Банка.");
			resultat = false;
		} else {
			hideError("select[name=form_dropdown_statusIPDL]");
		}


		//проверка на правила
		if ($("input[name=rules]:checked").val() != 'Y') {
			showError("input[name=rules]", "Ознакомьтесь и согласитесь с условиями обработки и использования персональных данных");
			resultat = false;
		} else {
			hideError("input[name=rules]");
		}

		//var ress = false;

		//console.log(resultat, document.klardValidation);

		//Если все поля заполнены верно, проверяем аяксом правильно ли введена капча
		if (!resultat || !document.klardValidation) {
			$(document).scrollTo($('.ccStepBlockWrapper .error:eq(0)'));
			confirmBlock('hide', $aviable_esb);
			return false;
		} else {
			$('input[name="form_hidden_2284"]').val('Y');

			// Если в URL	был передан параметр ?utm_agent=, то не выводим водтверждения вообще
			var $arrGetParams;
			$arrGetParams = parseGetParams();

			if ($arrGetParams.utm_agent === undefined) {
				// показываем либо капчу, либо блок подтверждения смс
				confirmBlock('show', $aviable_esb);

			} else {
				ress = true; // отправляем форму
				var isFormSubmited = true; // флаг о том, что форма отправлялась, для избежания нескольких сабмитов
			}
		}

		if(!isFormSubmited)
			return ress;
		else return false;
	});

	// повторная отправка смс
	$('.repeat-sms').click(function() {
		codeVal = $("input[name=form_text_648]").val();
		phoneVal = $("input[name=form_text_649]").val();
		$nomer = codeVal + phoneVal;
		$appName = "на кредит";

		repeat_send_sms($nomer, $appName);
	});

	// замена номера смс
	$('.change-number-sms').click(function() {
		$('#app-sms-nomer').hide();
		$current_nom = $('#app-sms-nomer').text();
		$('.app-sms-change-nomer').val($current_nom).show();

		$(this).hide();
		$('.ok').show();

		return false;
	});

	// клик ок
	$('.ok').click(function() {
		// значение в инпуте
		$nom = $('.app-sms-change-nomer').val();

		// код номера в инпуте
		$code = $nom.substring(0, 3);

		// номер в инпуте
		$snom = $nom.substring(3);

		// вставляем новый код и номер в поля формы код и номер
		$("input[name=form_text_648]").val($code);
		$("input[name=form_text_649]").val($snom);

		// скрываем инпут, вставляем в блок номера новый номер, показываем этот блок
		$('.app-sms-change-nomer').hide();
		$('#app-sms-nomer').html($nom).show();

		// скрываем "Ок" и показываем "Изменить"
		$(this).hide();
		$('.change-number-sms').show();

		var $app_name = "на кредит";
		send_sms($nom, $app_name);

		return false;
	});


	//подстановка данных пользователя в соглашение о персональных данных
	//Фамилия
	$('input[name=form_text_640]').change(function() {
		$('#agree_fam').html(jQuery.trim($(this).val()));
	});

	//Имя
	$('input[name=form_text_641]').change(function() {
		$('#agree_name').html(jQuery.trim($(this).val()));
	});

	//Отчество
	$('input[name=form_text_642]').change(function() {
		$('#agree_otch').html(jQuery.trim($(this).val()));
	});

	//Дата рождения
	$('input[name=form_text_769]').change(function() {
		$('#agree_birsd').html(jQuery.trim($(this).val()));
	});

	//Пасспорт
	$('input[name=form_text_772]').change(function() {
		$('#agree_pass').html(jQuery.trim($(this).val()));
	});


	$('.liveclick').live("click", function(e) {
		alert('live работает в ie');
		e.preventDefault();
		//return false;
	});


	// Проверяем на доступность шину ESB ajax запросом. Ответ записывается в переменную bool $aviable_esb, и далее используется в скрипте.
	checkAviableEsbMq();

});
/* End */
;
; /* Start:/local/components/aic.robotics/form.choice.cards.block/CardsChoise.js*/
/**
 *  @description класс для управления блоком выбора карты
 */

if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			? Math.ceil(from)
			: Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++)
		{
			if (from in this &&
				this[from] === elt)
				return from;
		}
		return -1;
	};
}

var ie = jQuery.browser.msie,
	ieV = jQuery.browser.version,
	ie6 = ie&&(ieV == 6),
	ltie7 = ie&&(ieV <= 7),
	ltie8 = ie&&(ieV <= 8);
function setPie(selectors){jQuery(selectors).css("behavior", "url(js/pie.htc)")};
function unsetPie(selectors){jQuery(selectors).css("behavior", "none")};
function resetPie(selectors){
	unsetPie(selectors);
	setPie(selectors);
};

if (!Array.prototype.filter)
{
	Array.prototype.filter = function(fun /*, thisp */)
	{
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
			if (i in t)
			{
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t))
					res.push(val);
			}
		}

		return res;
	};
}

"use strict";

/**
 * @constructor
 */
function CardsChoise() {
	this.setDefaults();
	this.setHandlers();
}

CardsChoise.prototype = {

	/**
	 * Установка дефолтных значений
	 */
	setDefaults: function(){

		/**
		 * расширение для массива, удаление повторяющихся значений
		 */
		Array.prototype.unique = function() {
			var n = [];
			for(var i = 0; i < this.length; i++)
				if (n.indexOf(this[i]) == -1) n.push(this[i]);

			return n;
		};

		/**
		 * Состояние фильтра
		 */
		this.condition = {};

		//noinspection JSUnresolvedVariable
		/**
		 * Объект свойств, присущих каждому шагу (полю)
		 */
		this.fieldsProperty = {
			subProductType: {
				firstOption: 'noneFirstOption',
				nextStep: 'cardType',
				fieldName: arParamsChoiseCardBlock.subProductTypeFieldName,
				stepNumber: 1
			},
			cardType: {
				firstOption: '<option value="">Выберите тип карты</option>',
				nextStep: 'currency',
				fieldName: arParamsChoiseCardBlock.cardTypeFieldName,
				stepNumber: 2
			},
			currency: {
				firstOption: '<option value="">Выберите валюту</option>',
				nextStep: 'plastCat',
				fieldName: arParamsChoiseCardBlock.currencyFieldName,
				stepNumber: 3
			},
			plastCat: {
				firstOption: '<option value="">Выберите cпособ выпуска</option>',
				nextStep: 'cardCategory',
				fieldName: arParamsChoiseCardBlock.plastCatFieldName,
				stepNumber: 4
			},
			cardCategory: {
				firstOption: '<option value="">Выберите категорию карты</option>',
				nextStep: 'last',
				fieldName: arParamsChoiseCardBlock.cardCategoryFieldName,
				stepNumber: 5
			}
		};

		/**
		 * массив очереди вида:
		 * ключ - номер очереди, значение - имя свойства
		 */
		this.arDinamicQueue = this.getArDinamicQueue();

		/**
		 * хранит id значений свойства cardType
		 *
		 * объект, играющий роль констант
		 * используется далее по коду в сравнениях
		 */
		this.cardTypeValues = {
			debet: 6,
			credit: 7
		};

		/**
		 * хранит id значений свойства plastCat
		 *
		 * объект, играющий роль констант
		 * используется далее по коду в сравнениях
		 */
		this.plastCatValues = {
			noname: 11, // неименная карта моментального выпуска
			name: 12 // именная карта, срок выпуска до 10 дней
		};
		/**
		 * блок Доходы и расходы
		 */
		this.incomeAndOutlayBlock = $('.income-and-outlay-block');

		/**
		 * Выбор способа дальнейшего анкетирования
		 */
		this.nextMethodBlock = $('.next-method-block');

		/**
		 *
		 * объект класса Translit
		 */
		this.translit = new Translit();

	},

	/**
	 * установка обработчиков событий
	 */
	setHandlers: function(){

		var self = this;

		// TODO: рефакторинг условий, внести его в метод self.filterData();

		/**
		 * чендж селекта "Выберите карту"
		 */
		$('#subProductType').change(function(){
			var currentVal = $(this).val();

			// если выбрано значение - запускаем фильтр,
			// иначе выбран пункт "Не выбрано", тогда просто скрываем грядущие шаги
			if($.trim(currentVal) != '')
			{
				self.filterData({subProductType: currentVal});

				// вставляем значение в hidden поле для передачи на бэкенд
				self.printValueInHiddenInput('subProductType', currentVal);
			}
			else self.hideNextSteps('subProductType');

			/*
			 * Если выбран тип "Кредитная карта "МТС Деньги"
			 */
			if(currentVal == 21) {
				// скрываем блок "Выбор дальнейшего способа анкетирования"
				self.nextMethodBlock.addClass('hidden');

				// ставим выбор на радиобаттоне "Анкетирование по телефону"
				self.nextMethodBlock.find('input.next-method-cc').attr('checked', true);

				// ставим блоку "Согласия и подтверждения" номер шага 4
				$('.confirm-block div.stepHolder').text('4');
			} else {
				// показываем обратно блок "Выбор дальнейшего способа анкетирования"
				self.nextMethodBlock.removeClass('hidden');

				// убираем выбор с радиобаттона "Анкетирование по телефону"
				self.nextMethodBlock.find('input.next-method-cc').attr('checked', false);

				// ставим блоку "Согласия и подтверждения" номер шага обратно 6
				$('.confirm-block div.stepHolder').text('5');
			}

		});

		/**
		 * чендж селекта "Выберите карту"
		 */
		$('#cardType').live('change', function(){
			var currentVal = $(this).val();

			// если выбрано значение - запускаем фильтр,
			// иначе выбран пункт "Не выбрано", тогда просто скрываем
			if($.trim(currentVal) != '')
			{
				self.filterData({cardType: currentVal});

				// вставляем значение в hidden поле для передачи на бэкенд
				self.printValueInHiddenInput('cardType', currentVal);
			}
			else self.hideNextSteps('cardType');
		});
		/**
		 * чендж селекта "Валюта карты"
		 */
		$('#currency').live('change', function(){
			var currentVal = $(this).val();

			// если выбрано значение - запускаем фильтр,
			// иначе выбран пункт "Не выбрано", тогда просто скрываем грядущие шаги
			if($.trim(currentVal) != '')
			{
				self.filterData({currency: currentVal});

				self.printCurrencyInCurrencyLabel(currentVal);

				// вставляем значение в hidden поле для передачи на бэкенд
				self.printValueInHiddenInput('currency', currentVal);
			}
			else self.hideNextSteps('currency');
		});
		/**
		 * чендж селекта "Способ выпуска"
		 */
		$('#cardCategory').live('change', function(){
			var currentVal = $(this).val();

			// если выбрано значение - запускаем фильтр,
			// иначе выбран пункт "Не выбрано", тогда просто скрываем грядущие шаги
			if($.trim(currentVal) != '')
			{
				self.filterData({cardCategory: currentVal});

				// вставляем значение в hidden поле для передачи на бэкенд
				self.printValueInHiddenInput('cardCategory', currentVal);
			}
			else self.hideNextSteps('cardCategory');
		});

		/**
		 * чендж селекта "Категория карты"
		 */
		$('#plastCat').live('change', function(){
			var currentVal = $(this).val();

			// если выбрано значение - запускаем фильтр,
			// иначе выбран пункт "Не выбрано", тогда просто скрываем грядущие шаги
			if($.trim(currentVal) != '')
			{
				self.filterData({plastCat: currentVal});

				// вставляем значение в hidden поле для передачи на бэкенд
				self.printValueInHiddenInput('plastCat', currentVal);
			}
			else self.hideNextSteps('plastCat');
		});



		/**
		 * чендж селекта "Выбор офиса"
		 */
		$('.office-select').live('change', function(){

			var c_code = $(this).find('option:selected').attr('data-c_code');

			// вставляем код оффиса в хидден поле #office-id-hidden
			$('#office-id-hidden').val(c_code);
		});

		/**
		 * Чендж радиобаттона "Выберите продукт"
		 * Ставим/снимаем обработчик события транслитерации полей фамилии и имени
		 */
		$('input[name="form_radio_chooseProduct"]').change(function() {
			var val = $(this).val();
			var valueCredit = 2266;
			var valueCard = 2267;

			// если выбран кредит -
			// снимаем обработчик события транслитерации полей фамилии и имени
			if(val == valueCredit)
			{
				self.unbindNameTranslitBlock();
			}
			// если выбрана карта -
			// ставим обработчик события транслитерации полей фамилии и имени
			else if(val == valueCard)
			{
				self.bindNameTranslitBlock();
			}
		});
	},



	/**
	 * фильтр
	 */
	filterData: function(obParams){

		var self = this;

		// шаг 1 "Выберите карту"
		if(obParams.subProductType != undefined)
		{
			// скрываем грядущие шаги
			self.hideNextSteps('subProductType');

			// начинаем фильтровать с внешнего объекта ВСЕХ карт cardsReference
			// фильтруем и запоминаем состояние шага
			self.condition.subProductType = cardsReference.filter(filterBySubProductType);

			// печатаем следующий шаг
			self.printEnabledValues('cardType');
		}

		// шаг 2 "Тип карты"
		if(obParams.cardType != undefined)
		{
			// скрываем грядущие шаги
			self.hideNextSteps('cardType');

			// фильтруем и запоминаем состояние шага
			self.condition.cardType = self.condition.subProductType.filter(filterByCardType);

			// печатаем следующий шаг
			self.printEnabledValues('currency');
		}

		// шаг 3 "Валюта карты"
		if(obParams.currency != undefined)
		{
			// скрываем грядущие шаги
			self.hideNextSteps('currency');

			// фильтруем и запоминаем состояние шага
			self.condition.currency = self.condition.cardType.filter(filterByCurrency);

			// вывод выбранной валюты в лейблы далее в шагах
			self.printCurrencyInCurrencyLabel(obParams.currency);

			// печатаем следующий шаг
			self.printEnabledValues('plastCat');
		}

		// шаг 4 "Способ выпуска"
		if(obParams.plastCat != undefined)
		{
			// скрываем грядущие шаги
			self.hideNextSteps('plastCat');

			// фильтруем и запоминаем состояние шага
			self.condition.plastCat = self.condition.currency.filter(filterByPlastCat);

			// печатаем следующий шаг
			self.printEnabledValues('cardCategory');
		}

		// шаг 5 "Категория карты"
		if(obParams.cardCategory != undefined)
		{
			// скрываем грядущие шаги
			self.hideNextSteps('cardCategory');

			// фильтруем и запоминаем состояние шага
			self.condition.cardCategory = self.condition.plastCat.filter(filterByCardCategory);

			// последний шаг. Показываем доп. свойства текущей выбранной карты
			self.showOtherCardProperty();
		}


		/**
		 * Вспомогательные локальные функции фильтра
		 */

		// функции фильтрации для obj.filter()
		function filterBySubProductType(curObj){
			return curObj.subProductType == obParams.subProductType;
		}

		function filterByCardType(curObj){
			return curObj.cardType == obParams.cardType;
		}

		function filterByCurrency(curObj){
			return curObj.currency == obParams.currency;
		}

		function filterByPlastCat(curObj){
			return curObj.plastCat == obParams.plastCat;
		}

		function filterByCardCategory(curObj){
			return curObj.cardCategory == obParams.cardCategory;
		}
	},

	/**
	 * Получить массив доступных в следующем шаге значений
	 * Имя следующего шага передаем в параметре "propertyName"
	 */
	getNextEnabledValues: function(propertyName){

		var enabledValues = [];

		// получаем состояние отфильтрованного объекта на момент предыдущего шага
		var perviusStepPropertyName = this.arDinamicQueue[this.fieldsProperty[propertyName].stepNumber - 1];
		var actualFilteredData = this.condition[perviusStepPropertyName];

		for (var key in actualFilteredData)
		{
			// проверка на унаследованные св - ва / функции
			if(actualFilteredData.hasOwnProperty(key))
			{
				enabledValues.push(actualFilteredData[key][propertyName]);
			}
		}

		// отсекаем повторяющиеся значения
		enabledValues = enabledValues.unique();

		// сортируем по сортировки в propertyEnums
		var enabledValuesTempSortingArray = [];
		for (var i in propertyEnums[propertyName]) {
			if ($.inArray(propertyEnums[propertyName][i].id, enabledValues) > -1) {
				enabledValuesTempSortingArray.push(propertyEnums[propertyName][i].id);
			}
		}

		return enabledValuesTempSortingArray;
	},

	/**
	 * Печать доступных в следующем шаге значений
	 * @param propertyName - имя свойства следующего шага
	 */
	printEnabledValues: function(propertyName) {
		var self = this;

		// получаем доступные значения следующего шага
		var enabledValues = this.getNextEnabledValues(propertyName);

		// console.log(propertyName, enabledValues);

		// логика в зависимости от количества доступных значений следующего шага
		switch (enabledValues.length)
		{
			case 0: {
				alert('Error, object is empty'); // TODO: убрать alert
				break;
			}

			// если предвыбранное значение следующего шага всего одно
			// печать единичного значения
			case 1: {
				printSingle();
				break;
			}

			// если предвыбранных значений следующего шага множество
			// печать множества значений
			default:
			{
				printMany();
				break;
			}
		}

		/**
		 * Печать единичного значения
		 */
		function printSingle() {

			// находим родительскую лишку
			var parentLi = $('#' + propertyName).parents('li');

			// удаляем текущий итем
			$('#' + propertyName).detach();


			// вставляем абзац с нашим единственным значением, даем ему id = имяНашегоСвойства
			var innerHtml;

			// проверяем, есть ли такой инпут на странице
			var hiddenInput = $('input[name="'+self.fieldsProperty[propertyName].fieldName+'"]');
			if(hiddenInput.length > 0)
			{
				innerHtml = '';
			}
			else
			{
				// если такого скрытого инпута на странице еще нет, то добавляем его
				innerHtml = '<input type="hidden" name="'+self.fieldsProperty[propertyName].fieldName+'" value="">';
			}

			// формируем абзац с текстом значения
			for (var i in propertyEnums[propertyName]) {
				if (enabledValues[0] == propertyEnums[propertyName][i].id) {
					innerHtml += '<p id="'+propertyName+'">'+ propertyEnums[propertyName][i].value + '</p>';
				}
			}

			// печатаем
			parentLi.append(innerHtml).show();

			// немного с виду нелепый костыль, но на самом деле при первом заходе скрытый инпут не существует,
			// и данное условие выполняется. Переменная инициализирована несуществующим инпутом до того,
			// как в нее нижестоящий .val() пытается засунуть значение
			if(hiddenInput.length == 0)
				var hiddenInput = $('input[name="'+self.fieldsProperty[propertyName].fieldName+'"]');

			// вставляем единственное предвыбранное значение в хидден инпут

			// console.log(propertyEnums[propertyName][enabledValues[0]].xmlId);

			for (var i in propertyEnums[propertyName]) {
				if (enabledValues[0] == propertyEnums[propertyName][i].id) {
					hiddenInput.val(propertyEnums[propertyName][i].xmlId);
				}
			}


			// запускаем следующий шаг фильтра

			// формируем объект для фильтрации
			var filterObj = {};
			for (var i in propertyEnums[propertyName]) {
				if (enabledValues[0] == propertyEnums[propertyName][i].id) {
					filterObj[propertyName] = propertyEnums[propertyName][i].id;
				}
			}

			// фильтруем
			self.filterData(filterObj);
		}

		/**
		 * Печать множества значений
		 */
		function printMany() {

			// находим родительскую лишку
			var parentLi = $('#' + propertyName).parents('li');

			// удаляем текущий итем
			$('#' + propertyName).detach();


			// перед селектом вставляем хидден инпут с именем и пустым значением
			// (значение вставим тогда, когда оно будет выбрано, а именно в обработчике ченджа)
			var innerHtml;
			// проверяем, есть ли такой инпут на странице
			var hiddenInput = $('input[name="'+self.fieldsProperty[propertyName].fieldName+'"]');
			if(hiddenInput.length > 0)
			{
				innerHtml = '';
			}
			else
			{
				// если такого скрытого инпута на странице еще нет, то добавляем его
				innerHtml = '<input type="hidden" name="'+self.fieldsProperty[propertyName].fieldName+'" value="">';
			}

			// вставляем обертку select, даем ему id = имяНашегоСвойства
			innerHtml += '<select id="'+propertyName+'" name="'+propertyName+'"></select>';

			parentLi.append(innerHtml).show();

			// обнуляем значение хидден инпута, т.к. вставлено оно будет при событии ченджа селекта
			hiddenInput.val('');


			// формируем тело селекта, его <option> - ы

			// первый <option> с текстом вида "выберите имяНашегоТекущегоСвойства"
			var html = self.fieldsProperty[propertyName].firstOption;

			// перебор доступных значений, добавление их в внутренности select - а
			for (var key in enabledValues)
			{
				if(enabledValues.hasOwnProperty(key))
				{
					for (var i in propertyEnums[propertyName]) {
						if (enabledValues[key] == propertyEnums[propertyName][i].id) {
							html += '<option value="'+ propertyEnums[propertyName][i].id +'" >' + propertyEnums[propertyName][i].value+'</option>';
						}
					}
				}
			}

			// добавляем сформированное тело в обертку select
			$('#' + propertyName).html(html);
		}
	},

	/**
	 * Скрыть поля, следующие за текущим полем propertyName
	 * @param propertyName
	 */
	hideNextSteps: function(propertyName) {
		var self = this;

		// получаем номер текущего шага
		var currentStep = self.fieldsProperty[propertyName].stepNumber;

		// перебираем свойства всех шагов, скрывая грядущие шаги
		for(var key in self.fieldsProperty)
		{
			if(self.fieldsProperty.hasOwnProperty(key))
			{
				if(self.fieldsProperty[key].stepNumber > currentStep)
				{
					// скрываем все, что после текущего шага
					var parentLi = $('#' + key).parents('li');
					parentLi.hide();
					self.hideOtherCardProperty();
				}
				// а если этот шаг последний - то скрываем дополнительные блоки
				else if(self.fieldsProperty[key].nextStep == 'last')
				{
					self.hideOtherCardProperty();
				}
			}
		}

		/*if(ltie7)
		 resetPie(
		 ".ccStepBlock," +
		 ".rounded," +
		 ".rounded14," +
		 ".advBlock," +
		 ".sliderContent," +
		 ".sliderBlock a:hover .sliderContent," +
		 ".popUpWrapper .btn-wrapper .rounded," +
		 ".depositCompare");*/

	},

	/**
	 * Показать доп. поля карты (изображение, описание, и т.д.)
	 * Вызывается после последнего шага (выбора категории карты)
	 */
	showOtherCardProperty: function () {
		var self = this;

		// текущая отфильтрованная карта
		var selectedCard = self.condition.cardCategory[0];

		// показываем описание
		var descriptionBlock = $('#description');
		descriptionBlock.find('p').html(selectedCard.description);
		descriptionBlock.show();

		// показываем изображение
		var cardImgBlock = $('#card-img');
		cardImgBlock.find('img').attr('src', selectedCard.img);
		cardImgBlock.show();

		// показываем поля "Кредитный лимит" только если:
		// 1) карта кредитная
		// 2) ее кредитный лимит не равен 0
		//noinspection JSUnresolvedVariable
		if( selectedCard.cardType == self.cardTypeValues.credit && (selectedCard.maxLim != 0) )
		{
			//noinspection JSUnresolvedVariable
			self.showCreditLimitBlock(selectedCard.minLim, selectedCard.maxLim);
		}


		// показываем только если карта именная
		if(selectedCard.plastCat == self.plastCatValues.name)
		{
			// показываем блок выбора "Предпочтительный офис оформления карты и обслуживания"
			self.showOfficeBlock();

			self.showNameTranslitBlock();
		}

		// если кредитный лимит карты равен 0
		// отключаем блок "Доходы", иначе обратно включаем
		// "Способ анкетирования" ставим на call центр, иначе снимаем выбор
		if(selectedCard.maxLim == 0)
		{
			self.hideIncomeAdmNextMethodBlock();
		}
		else
		{
			self.showIncomeAdmNextMethodBlock();
		}
	},

	/**
	 * Скрыть вспомогательные доп. поля, не влияющие на выбор карты
	 * Изображение карты, описание карты...
	 */
	hideOtherCardProperty: function() {
		var self = this;

		// скрываем описание
		$('#description').hide();

		// скрываем изображение
		$('#card-img').hide();

		self.hideCreditLimitBlock();

		// скрываем все поля группы "Предпочтительный офис оформления карты и обслуживания"
		self.hideOfficeBlock();

		self.hideNameTranslitBlock();

	},

	/**
	 * получение массива очереди шагов
	 * ключ - номер очереди, значение - имя свойства
	 */
	getArDinamicQueue: function() {

		var arDinamicQueue = [];

		for(var key in this.fieldsProperty)
		{
			if(this.fieldsProperty.hasOwnProperty(key))
			{
				arDinamicQueue[this.fieldsProperty[key].stepNumber] = key;
			}
		}

		return arDinamicQueue;
	},

	/**
	 * Печатаем текстовое представление валюты в местах, где это требуется
	 *  - подпись к полю "Желаемый кредитный лимит"
	 */
	printCurrencyInCurrencyLabel: function(currencyValue) {

		// достаем текстовое представление валюты по ее id
		var currencylabelText;
		for (var i in propertyEnums.currency) {
			if (currencyValue == propertyEnums.currency[i].id) {
				currencylabelText = propertyEnums.currency[i].value;
			}
		}

		// печатаем в необходимых местах
		// блок "Желаемый кредитный лимит"
		$('.credit-limit-wrap .label-currency').text(currencylabelText);
	},

	/**
	 * Печтаем значение измененного селекта в соответствующее для него хидден поле
	 * @param fieldName
	 * @param value
	 */
	printValueInHiddenInput: function(fieldName, value) {
		var self = this;

		var inputFieldName = self.fieldsProperty[fieldName].fieldName;
		var xmlIdValue;
		for (var i in propertyEnums[fieldName]) {
			if (value == propertyEnums[fieldName][i].id) {
				xmlIdValue = propertyEnums[fieldName][i].xmlId;
			}
		}
		$('input[name="' + inputFieldName + '"]').val(xmlIdValue);
	},

	/**
	 * Скрытие блоков "Доходы и расходы" и "Выбор способа дальнейшего анкетирования"
	 * + сопутствующая этому блоку логика при скрытии
	 */
	hideIncomeAdmNextMethodBlock: function() {
		var self = this;

		// скрываем блок "Доходы"
		self.incomeAndOutlayBlock.addClass('hidden');

		// отключаем валидацию блока "Доходы"
		self.incomeAndOutlayBlock.find('input').attr('data-required', 'false');

		// очищаем поля блока доходы
		self.incomeAndOutlayBlock.find('input').val('');

		// скрываем блок "Выбор дальнейшего способа анкетирования"
		self.nextMethodBlock.addClass('hidden');

		// ставим выбор на радиобаттоне "Анкетирование по телефону"
		self.nextMethodBlock.find('input.next-method-cc').attr('checked', true);

		// ставим блоку "Согласия и подтверждения" номер шага 4
		$('.confirm-block div.stepHolder').text('4');
	},

	/**
	 * показ блоков "Доходы и расходы" и "Выбор способа дальнейшего анкетирования"
	 * + сопутствующая этому блоку логика при показе
	 */
	showIncomeAdmNextMethodBlock: function() {
		var self = this;

		// показываем обратно блок "Доходы"
		self.incomeAndOutlayBlock.removeClass('hidden');

		// включаем обратно валидацию блока "Доходы"
		self.incomeAndOutlayBlock.find('input').attr('data-required', 'true');

		// показываем обратно блок "Выбор дальнейшего способа анкетирования"
		self.nextMethodBlock.removeClass('hidden');

		// убираем выбор с радиобаттона "Анкетирование по телефону"
		self.nextMethodBlock.find('input.next-method-cc').attr('checked', false);

		// ставим блоку "Согласия и подтверждения" номер шага обратно 6
		$('.confirm-block div.stepHolder').text('5');
	},

	/**
	 * очищаем поля выбора офиса
	 */
	clearOffice: function() {
		$('select.region-select').val('');
		$('select.city-select').val('');
		$('select.office-select').val('');
		$('#office-id-hidden').val('');
	},

	/**
	 * очистка выбранной карты (всех выбранных полей)
	 */
	clearCard: function() {
		var self = this;

		// перебираем все поля
		for(var fieldName in this.fieldsProperty)
		{
			if(this.fieldsProperty.hasOwnProperty(fieldName))
			{
				// очищаем скрытый инпут
				$('input[name="'+ this.fieldsProperty[fieldName].fieldName +'"]').val('');

				// очищаем предвыбранные единичные значения
				$('p#' + fieldName).html('');

				//
				$('select#' + fieldName).val('');
			}
		}

		// очистка блока выбора офиса
		self.clearOffice();

		// показ влоков "Доходы и расходы" и "Выбор способа дальнейшего анкетирования"
		self.showIncomeAdmNextMethodBlock();

		// скрываем все шаги
		self.hideNextSteps('subProductType');

		$('input#1477').attr('disabled', false);
		$('input#1476').attr('disabled', false);
	},

	/**
	 * Показываем блок с выбором офиса
	 * ставим метку об обязательности заполнения
	 */
	showOfficeBlock: function() {

		// init
		var regionWrap = $('.shoose-office-wrap'),
			cityWrap = $('#citySelector'),
			officeWrap = $('#officeSelector'),

			regionDropdown = regionWrap.find('select'),
			cityDropdown = cityWrap.find('select'),
			officeDropdown = officeWrap.find('select');

		// показываем блок выбора региона
		regionWrap.show();

		// ставим метку обязательности заполнения всем трем полям: регион, город, офис
		regionDropdown.attr('data-required', 'true');
		cityDropdown.attr('data-required', 'true');
		officeDropdown.attr('data-required', 'true');
	},

	/**
	 * Скрываем блок с выбором офиса
	 * снимаем метку об обязательности заполнения
	 */
	hideOfficeBlock: function() {
		var self = this;

		// init
		var regionWrap = $('.shoose-office-wrap'),
			cityWrap = $('#citySelector'),
			officeWrap = $('#officeSelector'),

			regionDropdown = regionWrap.find('select'),
			cityDropdown = cityWrap.find('select'),
			officeDropdown = officeWrap.find('select');

		// скрываем блок выбора региона
		regionWrap.hide();
		cityWrap.hide();
		officeWrap.hide();

		// снимаем метку обязательности заполнения всем трем полям: регион, город, офис
		regionDropdown.attr('data-required', 'false');
		cityDropdown.attr('data-required', 'false');
		officeDropdown.attr('data-required', 'false');

		// очистка блока выбора офиса
		self.clearOffice();
	},

	/**
	 * вспомогательный метод преобразования числа с разделителем тысяч
	 * @param number
	 * @returns {string}
	 */
	formatNumberToString: function (number) {
		return Math.round(number).toString().toString().replace(/ /g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	},

	/**
	 * вспомогательный метод преобразования из числа с разделителем тысяч в integer
	 * @param stringNumber
	 * @returns {int}
	 */
	formatStringToNumber: function(stringNumber) {
		return parseInt(stringNumber.replace(/ /g, ''));
	},

	/**
	 * скрываем поле "Кредитный лимит"
	 */
	hideCreditLimitBlock: function()
	{
		var creditLimitWrap = $('.credit-limit-wrap');

		creditLimitWrap.find('input').val(0).attr('data-required', 'false');
		creditLimitWrap.hide();
	},

	/**
	 * показываем поле "Кредитный лимит"
	 */
	showCreditLimitBlock: function(minLimit, maxLimit) {
		var self = this;

		var creditLimitWrap = $('.credit-limit-wrap');

		// вставляем подстрочники
		//noinspection JSUnresolvedVariable
		creditLimitWrap.find('.label-currency-min').text(self.formatNumberToString(minLimit));
		//noinspection JSUnresolvedVariable
		creditLimitWrap.find('.label-currency-max').text(self.formatNumberToString(maxLimit));

		// максимальный лимит как предвыбранное значение инпута, а также ставим флаг обязательного поля
		//noinspection JSUnresolvedVariable
		creditLimitWrap.find('input').val(maxLimit).attr('data-required', 'true');
		creditLimitWrap.show();
	},

	showNameTranslitBlock: function() {
		var self = this;

		// показываем поля фамилия и имя на латинице
		var lastNameTranslitBlock = $('.lastname-translit-block');
		var nameTranslitBlock = $('.name-translit-block');

		// показываем фамилию и имя на латинице
		lastNameTranslitBlock.show();
		nameTranslitBlock.show();
	},

	hideNameTranslitBlock: function() {

		// скрываем фамилию и имя на латинице
		var lastNameTranslitBlock = $('.lastname-translit-block');
		var nameTranslitBlock = $('.name-translit-block');
		lastNameTranslitBlock.hide();
		nameTranslitBlock.hide();
	},

	/**
	 * Устанавливаем обработчики событий транслитерации полей Имя и Фамилия
	 */
	bindNameTranslitBlock: function() {
		var self = this;

		var lastNameTranslitBlock = $('.lastname-translit-block');
		var nameTranslitBlock = $('.name-translit-block');
		var lastNameInput = $('.lastname-block').find('input');
		var nameInput = $('.name-block').find('input');
		var lastNameTranslit = lastNameTranslitBlock.find('input');
		var nameTranslit = nameTranslitBlock.find('input');


		// устанавливаем обработчик события для транслитерации на лету
		lastNameInput.bind("keyup", function() {
			var value = $.trim($(this).val());
			lastNameTranslit.val(self.translit.getTranslit(value).toUpperCase());
		});

		// транслитирование имени
		nameInput.bind("keyup", function() {
			var value = $.trim($(this).val());
			nameTranslit.val(self.translit.getTranslit(value).toUpperCase());
		});

		// при активации разово вставляем транслит уже набранного
		lastNameTranslit.val(self.translit.getTranslit($.trim(lastNameInput.val())).toUpperCase());
		nameTranslit.val(self.translit.getTranslit($.trim(nameInput.val())).toUpperCase());
	},

	/**
	 * Снимаем обработчики событий транслитерации полей Имя и Фамилия
	 */
	unbindNameTranslitBlock: function() {

		var lastNameTranslitBlock = $('.lastname-translit-block');
		var nameTranslitBlock = $('.name-translit-block');

		// снимаем обработчики нажатия клавиш
		$('.lastname-block').find('input').unbind('keyup');
		$('.name-block').find('input').unbind('keyup');

		// очищаем
		lastNameTranslitBlock.find('input').val('');
		nameTranslitBlock.find('input').val('');
	},

	/**
	 * устанавливаем предвыбранные значения карт на основе get параметров (если они конечно есть)
	 */
	setPerviosCardChoise: function() {

		var self  = this;

		var type = self.getParameterByName('type');
		var product = self.getParameterByName('product');
		var to = self.getParameterByName('to');

		// console.log(type);
		// console.log(product);
		// console.log(to);

		// если type = 'code', это значит, что выводится блок "открыть черновик", и предвибирать ничего не нужно.
		// предвибирать нужно только, если product = card, и to (xml id карты) != пустоте
		if(type != 'code' && product == 'card' && to != '')
		{
			var cardId = getCardId(to);

			// console.log(cardId);

			if(cardId != null )
			{
				// если выбрано значение - запускаем фильтр,
				// иначе выбран пункт "Не выбрано", тогда просто скрываем грядущие шаги
				if($.trim(cardId) != '')
				{
					$('#subProductType').val(cardId);

					self.filterData({subProductType: cardId});

					// вставляем значение в hidden поле для передачи на бэкенд
					self.printValueInHiddenInput('subProductType', cardId);
				}
				else self.hideNextSteps('subProductType');
			}
		}

		/**
		 * получаем id карты по ее xmlId
		 * @param xmlId
		 * @returns {*}
		 */
		function getCardId(xmlId) {
			var cardId = null;

			var key;
			for(key in propertyEnums.subProductType)
			{
				if(propertyEnums.subProductType.hasOwnProperty(key))
				{
					if(propertyEnums.subProductType[key].xmlId == xmlId)
					{
						cardId = propertyEnums.subProductType[key].id;
					}
				}
			}

			return cardId;
		}
	},

	/**
	 * получаем значение get параметра url по его имени
	 * @param name
	 * @param url
	 * @returns {*}
	 */
	getParameterByName: function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
};
/* End */
;
; /* Start:/local/components/aic.robotics/form.choice.cards.block/templates/.default/script.js*/
$(document).ready(function(){

	// инициализация блока выбора карт
	var cardChoise = new CardsChoise();

	// устанавливаем предвыбранные значения карт на основе get параметров (если они конечно есть)
	cardChoise.setPerviosCardChoise();

});
/* End */
;
; /* Start:/local/components/aic.robotics/form.choice.region.city.office/templates/.default/script.js*/
/**
 * Created by adequote on 23.03.16.
 */

$(document).ready(function(){

	//выбор региона
	$(".region-select").live($.browser.msie ? 'click' : 'change', function(){
		var value = $(this).val();
		if (value == 0) {
			$("#citySelector").css("display", "none");
			$("#officeSelector").css("display", "none");
		}
		else {
			var loadingIndicator = $(this).parents("li:eq(0)").find(".ajaxloading");
			loadingIndicator.css("display", "block");
			$.ajax({
				type: "POST",
				url: "/ajax/select-city-service-xml.php",
				data: "region=" + value + "&FIELD_NAME=" + choiceOfficeObject.cityFieldName + "&class=city-select",
				success: function(result){
					$(".city-select").replaceWith(result);
					loadingIndicator.css("display", "none");
					$("#citySelector").css("display", "block");
					$("#officeSelector").css("display", "none");
				}
			});
		}
	});

	//выбор города
	$(".city-select").live($.browser.msie ? 'click' : 'change', function(){
		var value = $(this).val();
		if (value == 0) {
			$("#officeSelector").css("display", "none");
		}
		else {
			var loadingIndicator = $(this).parents("li:eq(0)").find(".ajaxloading");
			loadingIndicator.css("display", "block");
			$.ajax({
				type: "POST",
				url: "/ajax/select-office-service-xml.php",
				data: "city=" + value + "&FIELD_NAME=" + choiceOfficeObject.officeFieldName + "&class=office-select",
				success: function(result){
					$(".office-select").replaceWith(result);
					loadingIndicator.css("display", "none");
					$("#officeSelector").css("display", "block");
				}
			});
		}
	});

});


/* End */
;
; /* Start:/bitrix/components/aic.robotics/kladr.form/templates/universal/script.js*/
$(function() {
	var focusOutTimer,
		ajax = $.ajax(),
		ajaxAbort = false;

	$.fn.Kladr = function() {
		return this.each(function() {
			var $kladrBlock = $(this),
				openKladr = false,
				$fields = $kladrBlock.find('input[data-name="index"], input[data-name="region"], input[data-name="raion"], input[data-name="city"], input[data-name="np"], input[data-name="street"], input[data-name="house"]'),
				$submitButton = $kladrBlock.parents('form').find('button[name="web_form_submit"]'),
				obCode = {
					region: '',
					raion: '',
					city: '',
					np: ''
				},
				data = '',
				index = '',
				init = function() {
					document.klardValidation = false;
				},

				getCodes = function() {
					obCode = {
						region: $kladrBlock.find('input[data-name="region_code"]').val(),
						raion: $kladrBlock.find('input[data-name="raion_code"]').val(),
						city: $kladrBlock.find('input[data-name="city_code"]').val(),
						np: $kladrBlock.find('input[data-name="np_code"]').val()
					};

					return obCode;
				},

				setDataAjax = function(type, value, obCode) {
					data = 'TYPE=' + type + '&QUERY=' + encodeURIComponent(value);

					if (type == 1 || type == 2) {
						//show np field
						//if (openKladr) {
						//	$kladrBlock.find('li[data-group-item="kladr-np"]').show();
						//}
					}
					if (type == 2 || type == 3 || type == 4) {
						if (obCode.region) {
							data += "&REGION=" + obCode.region;
						}
						if (type == 3 || type == 4) {
							if (obCode.raion) {
								data += "&RAION=" + obCode.raion;
							}
							if (obCode.city) {
								data += "&CITY=" + obCode.city;
							}

							if (type == 4) {
								if (obCode.np) {
									data += "&NP=" + obCode.np;
								}
							}
						}
					}

					return data;
				},

				emptyFieldsByDataName = function(name, deleteValue) {
					if (!deleteValue) {
						$kladrBlock.find('input[data-name="' + name + '"]').val('');
					}

					$kladrBlock.find('input[data-name="' + name + '_code"]').val('');
					$kladrBlock.find('input[data-name="' + name + '_name"]').val('');
					$kladrBlock.find('input[data-name="' + name + '_socr"]').val('');
					$kladrBlock.find('input[data-name="' + name + '_okato"]').val('');
				},

				showKladrBlock = function() {
					if ($(this).is(':checked')) {
						$kladrBlock.find('input[data-name="index"]').attr('disabled', 'disabled');
						$kladrBlock.find('li[data-group="kladr"]').show();

						if (!openKladr) {
							openKladr = true
						}
					} else {
						$kladrBlock.find('input[data-name="index"]').removeAttr('disabled');
					}
				};

			$fields.each(function() {
				var $this = $(this),
					name = $this.attr('data-name'),
					type = parseInt($this.attr('data-type')),
					$fieldBlock = $this.parents('li:eq(0)'),
					$searchResult = $fieldBlock.find('.fieldSearchResult'),
					$loadingIndicator = $fieldBlock.find('.ajaxloading'),
					url = '/ajax/kladr_city.php',

					validation = function() {
						document.isAnyKladrBlockVisible = false;

						if($kladrBlock.is(':visible')){

							document.isAnyKladrBlockVisible = true;

							//устанавливаем klardValidation = true на первом поле
							if (type === 0) {
								document.klardValidation = true;
							}

							//проверка поля
							var value = $.trim($this.val()),
								blockClass = $kladrBlock.attr('class'),
								fieldSelector = '.' + blockClass + ' input[data-name="' + name + '"]',
								arErrorText = {'index': 'индекс', 'region': 'регион', 'city': 'район или город', 'np': 'населенный пункт', 'street': 'улицу', 'house': 'дом'},
								charPattern = /^[А-Яа-я\s\-\/]+$/,
								digitalPattern = /^[\d]{6}$/,
								isValid = true;

							if ($fieldBlock.is(':visible')) {
								if (value.length <= 0) {
									showError(fieldSelector, 'Укажите ' + arErrorText[name]);
									resultat = false;
									document.klardValidation = false;
								} else {
									if (name == 'index') {
										if (!digitalPattern.test(value)) {
											isValid = false;
										}
									} else if (name == 'region') {
										if (!charPattern.test(value)) {
											isValid = false;
										}
									}

									if (isValid) {
										hideError(fieldSelector);
										if (document.klardValidation) {
											document.klardValidation = true;
										}
									} else {
										showError(fieldSelector, 'Укажите ' + arErrorText[name]);
										resultat = false;
										document.klardValidation = false;
									}
								}
							} else {
								hideError(fieldSelector);
							}
						}
					},

					chooseResult = function(e) {
						e.preventDefault();

						var $thisResult = $(this),
							obResult = {
								text: $thisResult.text(),
								code: $thisResult.attr('data-code'),
								name: $thisResult.attr('data-name'),
								socr: $thisResult.attr('data-socr'),
								index: $thisResult.attr('data-index'),
								okato: $thisResult.attr('data-okato')
							};

						//show fileds
						if (!openKladr) {
							openKladr = true;
							$kladrBlock.find('li[data-group="kladr"]').show();
						}

						//empty values
						if (type == 1) {
							emptyFieldsByDataName('raion');
							emptyFieldsByDataName('city');
							emptyFieldsByDataName('np');
							emptyFieldsByDataName('street');
						} else {
							if (type == 2) {
								emptyFieldsByDataName('np');
								emptyFieldsByDataName('street');
							} else {
								if (type == 3) {
									emptyFieldsByDataName('street');
								}
							}
						}

						//fill hidden fileds
						$this.val(obResult.text);

						if (type == 2) {
							if (obResult.code.substr(5, 3) == '000') {
								$fieldBlock.find('input[data-name="raion_code"]').val(obResult.code);
								$fieldBlock.find('input[data-name="raion_name"]').val(obResult.name);
								$fieldBlock.find('input[data-name="raion_socr"]').val(obResult.socr);
								emptyFieldsByDataName('city', true);
							} else {
								emptyFieldsByDataName('raion', true);
								$fieldBlock.find('input[data-name="city_code"]').val(obResult.code);
								$fieldBlock.find('input[data-name="city_name"]').val(obResult.name);
								$fieldBlock.find('input[data-name="city_socr"]').val(obResult.socr);
							}
						} else {
							$fieldBlock.find('input[data-name="' + name + '_code"]').val(obResult.code);
							$fieldBlock.find('input[data-name="' + name + '_name"]').val(obResult.name);
							$fieldBlock.find('input[data-name="' + name + '_socr"]').val(obResult.socr);

							if (type == 4) {
								$fieldBlock.find('input[data-name="' + name + '_okato"]').val(obResult.okato);
							}
						}

						$searchResult.hide();

						//set index
						if (parseInt(obResult.index) > 0) {
							$kladrBlock.find('input[data-name="index"]').val(obResult.index);
						}

						//remove other values
						$searchResult.find('ul li a').each(function() {
							if ($(this).attr('data-code') != obResult.code) {
								$(this).parent().remove();
							}
						});

						$fieldBlock.next().show().find('input[type="text"]:eq(0)').focus();
					},

					focusIn = function() {
						//пропускаем если фокус на поле индекса или дома
						if (type === 0 || type == 5) {
							ajaxAbort = false;
							return false;
						}

						var value = $.trim($this.val());

						obCode = getCodes();

						//если регион не выбран, то не продолжать отправлять ajax запросы
						if (obCode.region.length <= 0) {
							if (type != 1) {
								ajaxAbort = false;
								return false;
							}
						}

						$this.data('focus', true);

						//if field is empty, make request and load all items
						if (value.length === 0) {

							data = setDataAjax(type, value, obCode);

							$loadingIndicator.show();

							// if (ajaxAbort && ajax.hasOwnProperty('abort')) {
							if (ajaxAbort) {
								ajax.abort();
							}

							ajaxAbort = true;

							ajax = $.ajax({
								url: url,
								data: data,
								success: function(result) {
									result = $.trim(result);
									ajaxAbort = false;
									$searchResult.empty();

									//console.log(result);
									if (result.length > 0) {
										$searchResult.append(result);

										//hide np field if no data
										//var $result = $(result);
										//if (type == 3) {
										//	if ($result.find('a').length == 1) {
										//		$kladrBlock.find('li[data-group-item="kladr-np"]').hide();
										//
										//		$kladrBlock.find('li[data-group-item="kladr-street"]').find('input[type="text"]').focus();
										//	}
										//}

										//show only in focused
										if ($this.data('focus')) {
											$searchResult.show();
										}

										//get params from list to fileds
										$searchResult.find('a').click(chooseResult);
									} else {
										$searchResult.hide();
									}

									$loadingIndicator.hide();
								}
							});
						} else {
							//if field is not empty, show results
							$searchResult.show();
						}
					},
					keyUp = function() {
						if (type == 5) {
							ajaxAbort = false;
							return false;
						}

						var value = $.trim($this.val());

						obCode = getCodes();

						//если регион не выбран, то не продолжать отправлять ajax запросы
						if (obCode.region.length <= 0) {
							if (type == 2 || type == 3 || type == 4) {
								ajaxAbort = false;
								return false;
							}
						}

						if (value.length >= 3) {
							if (type === 0) {
								if (value.length != 6) {
									return false;
								}

								emptyFieldsByDataName('region');
								emptyFieldsByDataName('raion');
								emptyFieldsByDataName('city');
								emptyFieldsByDataName('np');
								emptyFieldsByDataName('street');

								url = '/ajax/kladr_index.php';

								//show np field
								//if (openKladr) {
								//	$kladrBlock.find('li[data-group-item="kladr-np"]').show();
								//}
							}

							data = setDataAjax(type, value, obCode);

							$loadingIndicator.show();

							if (ajaxAbort) {
								ajax.abort();
							}

							ajaxAbort = true;
							ajax = $.ajax({
								url: url,
								data: data,
								success: function(result) {
									ajaxAbort = false;

									if (type === 0) {
										//zip code search
										var $result = $.parseJSON(result);

										//console.log($result);
										if ($result === null) {
											ajax.abort();
											return;
										}

										if (!openKladr) {
											openKladr = true;
											$kladrBlock.find('li[data-group="kladr"]').show();
										}

										if ($result.REGION !== undefined) {
											$kladrBlock.find('input[data-name="region"]').val($result.REGION.FULL_NAME);
											$kladrBlock.find('input[data-name="region_code"]').val($result.REGION.CODE);
											$kladrBlock.find('input[data-name="region_name"]').val($result.REGION.NAME);
											$kladrBlock.find('input[data-name="region_socr"]').val($result.REGION.SOCR);
											if ($result.RAION !== undefined) {
												$kladrBlock.find('input[data-name="raion"]').val($result.RAION.FULL_NAME);
												$kladrBlock.find('input[data-name="raion_code"]').val($result.RAION.CODE);
												$kladrBlock.find('input[data-name="raion_name"]').val($result.RAION.NAME);
												$kladrBlock.find('input[data-name="raion_socr"]').val($result.RAION.SOCR);
											} else {
												emptyFieldsByDataName('raion');
											}
											if ($result.CITY !== undefined) {
												$kladrBlock.find('input[data-name="city"]').val($result.CITY.FULL_NAME);
												$kladrBlock.find('input[data-name="city_code"]').val($result.CITY.CODE);
												$kladrBlock.find('input[data-name="city_name"]').val($result.CITY.NAME);
												$kladrBlock.find('input[data-name="city_socr"]').val($result.CITY.SOCR);

												//если найден район, а город не найден, то ставим название района
												if ($result.RAION !== undefined && $result.RAION.FULL_NAME != 'Не указывать' && $result.CITY.FULL_NAME == 'Не указывать') {
													$kladrBlock.find('input[data-name="city"]').val($result.RAION.FULL_NAME);
												}
											} else {
												emptyFieldsByDataName('city');
											}
											if ($result.NP !== undefined) {
												$kladrBlock.find('input[data-name="np"]').val($result.NP.FULL_NAME);
												$kladrBlock.find('input[data-name="np_code"]').val($result.NP.CODE);
												$kladrBlock.find('input[data-name="np_name"]').val($result.NP.NAME);
												$kladrBlock.find('input[data-name="np_socr"]').val($result.NP.SOCR);
											} else {
												//$kladrBlock.find('input[data-name="np_code"]').parents('li').hide();
												emptyFieldsByDataName('np');
											}
											//if ($result.STREET !== undefined) {
											$kladrBlock.find('input[data-name="street"]').focus();
											//}
										} else {
											emptyFieldsByDataName('region');
											$kladrBlock.find('input[data-name="region"]').focus();
										}
									} else {
										//other search
										$searchResult.empty();
										result = $.trim(result);
										//console.log(result);

										if (result.length > 0) {
											$searchResult.append(result);
											$searchResult.show();

											//get params from list to fileds
											$searchResult.find('a').click(chooseResult);
										} else {
											$searchResult.hide();
										}
									}
									$loadingIndicator.hide();
								}
							});
						} else {
							emptyFieldsByDataName(name, true);

							$searchResult.empty();
							$searchResult.hide();
							$loadingIndicator.hide();
						}
					},
					focusOut = function() {
						ajaxAbort = true;
						$this.data('focus', false);

						if ($this.val().length === 0) {
							emptyFieldsByDataName(name);
						}

						focusOutTimer = setTimeout(
							function() {
								clearTimeout(focusOutTimer);
								$loadingIndicator.hide();
								$searchResult.hide();
							},
							200
						);
					};
				$this.focus(focusIn);
				$this.blur(focusOut);
				$this.keyup(keyUp);

				$searchResult.click(function() {
					clearTimeout(focusOutTimer);
				});

				$searchResult.scroll(function() {
					clearTimeout(focusOutTimer);
				});

				$(document).click(function(e){
					if ($(e.target).closest('.fieldSearchResult,' +
							'.ajaxloading,' +
							'[data-name="region"]' +
							',[data-name="city"]' +
							',[data-name="np"]' +
							',[data-name="street"]' +
							'').length) return;
					$loadingIndicator.hide();
					$searchResult.hide();
					e.stopPropagation();
				});

				//validation on submit
				$submitButton.click(validation);
			});

			//don't know zip code
			//$kladrBlock.find('input[data-name="no_index"]').change(showKladrBlock);
			init();
		});
	};
});
/* End */
;
; /* Start:/bitrix/components/aic.robotics/app.captcha/templates/.default/script.js*/
var valid = false;
/**
 * Функция вставки пришедшего аяксом кода в html шаблон компонента
 * Вызывается из reloadCaptcha()
 * @param code
 */
function insertCaptchaCode(code)
{
	$('#app-captcha-img').attr('src', '/bitrix/tools/captcha.php?captcha_code='+code); // обновляем изображение
	$('#app-captcha-hidden-input').val(code); // обновляем hidden input c кодом
}

/**
 * Функция обновления изображения капчи на странице
 */
function reloadCaptcha()
{
	$.ajax({
		type: "POST",
		url: "/bitrix/components/aic.robotics/app.captcha/reloadCaptcha.ajax.php",
		data: "reloadCaptcha=Y",
		success: function (result)
		{
			insertCaptchaCode(result);
		}
	});
}

/**
 * Функция проверки капчи на валидность
 * @param captcha_word
 * @param captcha_sid
 */
function checkCaptchaValid(captcha_word, captcha_sid)
{
	$.ajax({
		type: "POST",
		async: false,
		url: "/bitrix/components/aic.robotics/app.captcha/checkCaptchaValid.ajax.php",
		data: "captcha_word="+captcha_word+"&captcha_sid="+captcha_sid+"&app_captcha_check_valid=Y",
		success: function (result)
		{
			if(result == 'Y')
				valid = true;
			else if(result == 'N')
				valid = false;
		}
	});
}

/**
 * Если DOM дерево сформировано
 */
$(document).ready(function ()
{
	// нажатие на ссылку "Показать другой код"
	$('.reload-captcha').live("click", function (){
		reloadCaptcha();
		return false;
	});

	//
	/* $('#ch').live("click", function (){
	 //captcha_word = $('#app-captcha-word').val();
	 //captcha_sid = $('#app-captcha-hidden-input').val();

	 //checkCaptchaValid(captcha_word, captcha_sid);
	 //alert(valid);

	 checkAviableEsbMq();

	 return false;
	 });*/
});


/* End */
;
; /* Start:/js/Translit.js*/
/**
 * Класс транслитерации с русских символов на латинские
 * Created by adequote on 23.03.16.
 */

"use strict";

/**
 * @constructor
 */
function Translit() {

	/**
	 * Объект транслитерации
	 */
	this.arTranslate = {
		"й": "y",
		"ц": "c",
		"у": "u",
		"к": "k",
		"е": "e",
		"н": "n",
		"г": "g",
		"ш": "sh",
		"щ": "sh",
		"з": "z",
		"х": "h",
		"ъ": "",
		"ф": "f",
		"ы": "i",
		"в": "v",
		"а": "a",
		"п": "p",
		"р": "r",
		"о": "o",
		"л": "l",
		"д": "d",
		"ж": "zh",
		"э": "e",
		"ё": "e",
		"я": "ya",
		"ч": "ch",
		"с": "s",
		"м": "m",
		"и": "i",
		"т": "t",
		"ь": "",
		"б": "b",
		"ю": "u",
		" ": " "
	};
}

Translit.prototype = {

	/**
	 *
	 * @param cyrillicWord
	 * @returns {string}
	 */
	getTranslit: function(cyrillicWord) {

		var translitWord = '';

		if(cyrillicWord.length > 0)
		{
			cyrillicWord = cyrillicWord.toLowerCase();

			for (var i = 0; i < cyrillicWord.length; i++) {

				if (typeof(this.arTranslate[cyrillicWord.charAt(i)])!='undefined') {
					translitWord += this.arTranslate[cyrillicWord.charAt(i)];
				}
				else {
					translitWord += cyrillicWord.charAt(i);
				}
			}
		}

		return translitWord;
	}
};
/* End */

