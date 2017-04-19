
; /* Start:/local/templates/mts-bank/components/bitrix/form.result.new/form/script.js*/
/* global BX */

$(document).ready(function () {

    var $creditLimit,
        $cardRegion,
        $cardCity,
        $cardOffice;


    // именованная > категория карты
    $('#cardCategory').on('change', function(){
      $creditLimit = $(this).closest(".bid__form-caption").siblings('.js-form_text_2270');
      $cardRegion = $(this).closest(".bid__form-caption").siblings('.js-form_text_637');
      $creditLimit.addClass('is-show');
      $cardRegion.addClass('is-show');
		});

    // Регион получения карты
    $('#form_text_637').on('change', function(){
      $cardCity = $(this).closest('.select_layout').parents(".bid__form-caption").siblings('.js-form_text_638');
      $cardCity.addClass('is-show');
		});

    // Город получения карты
    $('#form_text_638').on('change', function(){
      $cardOffice = $(this).closest(".bid__form-caption").siblings('.js-form_text_639');
      $cardOffice.addClass('is-show');
		});

    // выбор пластиковой карты
        $('#plastCat').on('change', function(){
          var val = $(this).val(),
      		 $namedMap = $(this).closest(".bid__form-caption").siblings(".js-cardCategory"),//12
             $nonamedMap = $(this).closest(".bid__form-caption").siblings('.js-form_text_2270'),//11
             $textPremiumCard = $(this).closest(".bid__form-caption").siblings('.js-form_text_2270').find('.js-form_text_2270-card');



      		if (val == '12') {
            $nonamedMap.removeClass('is-show');
            $textPremiumCard.removeClass('is-show');
      		$namedMap.addClass('is-show');

            } else if (val == '11') {

                $nonamedMap.addClass('is-show');
                $textPremiumCard.addClass('is-show');
                $namedMap.removeClass('is-show');
                $cardRegion.removeClass('is-show');
                $cardCity.removeClass('is-show');
                $cardOffice.removeClass('is-show');
      		};
        });

    //прописка > регион
    $('#form_text_2380').on('change', function(){
        $(this).closest(".bid__input-wrapper").next().addClass('is-show');;
    });

    $('#form_text_2408').on('change', function(){
        $(this).closest(".bid__input-wrapper").next().addClass('is-show');;
    });

    $('#form_text_2415').on('change', function(){
        $(this).closest(".bid__input-wrapper").next().addClass('is-show');;
    });

    $('#form_text_2419').on('change', function(){
        $(this).closest(".bid__input-wrapper").next().addClass('is-show');;
    });

    $('#ANKETA_SPOSOB-2398').on('click', function(){
        $(this).closest(".bid__input-wrapper").next().addClass('is-show');;
    });

    $('#ANKETA_SPOSOB-2397').on('click', function(){
        $(this).closest(".bid__input-wrapper").siblings('.js-ANKETA_SPOSOB-2398').removeClass('is-show');;
    });
    // end

    $(".txtPASPORT_OLD_NUMBER").hide();

    $("#PASPORT_OLD-2375").click(function () {
        $(".txtPASPORT_OLD_NUMBER").show();
    });
    $("#PASPORT_OLD-2376").click(function () {
        $(".txtPASPORT_OLD_NUMBER").hide();
    });

    //выбор смены имени
    $("#PERSON_RENAME-2364").click(function () {
        $(".txtPERSON_REPLACE_LASTNAME").show();
        $(".txtPERSON_REPLACE_FIRSTNAME").show();
        $(".txtPERSON_REPLACE_MIDLENAME").show();
    });
    $("#PERSON_RENAME-2365").click(function () {
        $(".txtPERSON_REPLACE_LASTNAME").hide();
        $(".txtPERSON_REPLACE_FIRSTNAME").hide();
        $(".txtPERSON_REPLACE_MIDLENAME").hide();
    });

    $("#PERSON_RENAME-2365").trigger('click');
    //кодовое слово
    $.fn.codeWord = function () {
        return this.each(function () {
            var $input = $(this),
                    word = '',
                    codeWordPattern = /^[А-ЯЁ]+$/,
                    lat2cyr = function (str) {
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
                    transform = function (e) {
                        word = $input.val();
                        word = word.toUpperCase();
                        $input.val(lat2cyr(word));
                    },
                    init = function () {
                        $input.keyup(transform);
                    };

            init();
        });
    };

    // инпут кодового слова
    var codeWordInput = $('input[name=form_text_2396]');

    // применяем к кодовому слову правила подстановки кириллических символов взамен латинским
    codeWordInput.codeWord();

    $('#form_text_2359').attr('maxlength', '7');
    $('#form_text_2360').attr('maxlength', '2');
});
$(document).ready(function () {

    $('a.sendFullFormButton').click(function (e) {
        e.preventDefault();
        sendFullForm();
    });
//    // статус
    $('input[name="form_radio_STATUS"]').parent().parent().removeClass('short');
    $('#STATUS-2358').click(function () {
        $('.bid__form-chapter.full').show();
        $('.bid__form-chapter.short').hide();
        $('form[name="BANK_KREDIT_FULL"]').show();
    })
    $('#STATUS-2357').click(function () {
        $('.bid__form-chapter.full').hide();
        $('.bid__form-chapter.short').show();
        $('form[name="BANK_KREDIT_FULL"]').hide();
    })

    $('#PASPORT_ALLTIME_REGISTER-2378').click(function () {
        $('.kladr-registration, .txtPASPORT_POST_DATE_REGISTER').hide();
        $('#form_dropdown_PASPORT_POST_PLASE_STATUS').parent().hide();
    })
    $('#PASPORT_ALLTIME_REGISTER-2377').click(function () {
        $('.kladr-registration, .txtPASPORT_POST_DATE_REGISTER').show();
        $('#form_dropdown_PASPORT_POST_PLASE_STATUS').parent().show();
    })
    // статус конец
    $('input[name="form_text_2368"], input[name="form_text_2372"],input[name="form_text_2383"], input[name="form_old_bdate"]').mask("99.99.9999");
    $("input[name='form_text_2371'], input[name='form_text_2438']").mask("9999 999999");
    $("input[name='form_text_2374']").mask("999-999");
    $("input[name='form_text_2379']").mask("999999");
    $('input[name="form_text_2553"]').mask("+79999999999");
    $('input[name="form_text_2553"]').change(function () {
        var code = $(this).val().substr(2, 3);
        var phone = $(this).val().substr(5, 7);
        $('input[name="form_text_2399"]').val(code);
        $('input[name="form_text_2400"]').val(phone);
        $('.bid__number').text($(this).val());
    });
    $('a#scroll-to-phone').click(function (e) {
        e.preventDefault();
        var $page = $('html, body');
        $page.animate({
            scrollTop: $('input[name="form_text_2553"]').offset().top - 100
        }, 400);
        return false;
    });
});
BX.ready(function () {
//    $('input[name="form_text_2368"],input[name="form_text_2372"],input[name="form_text_2383"], input[name="form_old_bdate"]').click(function (e) {
//        BX.calendar({node: e.target, field: e.target, bTime: false});
//    })
})
var ress = false;
var $sms_repeat_count = 0; // количество запросов на отправку смс
var isFormSubmited = false; // отправлялась ли форма (по умолчанию нет)
var resultat = true;

function checkPhone(type) {

    resultat = checkErrors();
    console.log(resultat);
    if (!resultat) {
        if ($('form.bid__form .error:visible:eq(0)').length > 0) {
            var $page = $('html, body');
            $page.animate({
                scrollTop: $('form.bid__form .error:visible:eq(0)').offset().top - 150
            }, 400);
        }
        return false;
    }
    var ph = $('input[name="form_text_2553"]').val().replace('+7', '');
    var code = $('input.bid__form-input_call').val();
    var smsCheck = $('input[name="form_hidden_2555"]').val();
    if (smsCheck == 'Y') {
        $("form.bid__form:eq(0)").submit();
        return false;
    }
    if ($sms_repeat_count > 3) {
        $('#hint').show();
        $('#hint').css('color', '#9D3927').html('Количество попыток превышено / Или сервис смс-подтверждения временно недоступен');
        $('#sms-form').fadeIn();
        var $page = $('html, body');
        $page.animate({
            scrollTop: $('#sms-form').offset().top - 100
        }, 400);
        $('.replace-form').html('');
        return false;
    }
    console.log(type);
    switch (type) {
        case 'send':
            var data = {
                phone: ph,
                app_name: 'kredit-form',
                send_sms: 'Y'
            };
            break;
        case 'check':
            var data = {
                sms_confirm_code: code,
                check_sms_confirm_code: 'Y'
            };
            break;
        case 'resend':
            var data = {
                phone: ph,
                app_name: 'kredit-form',
                repeat_sms_confirm_code: 'Y'
            };
            break;
    }
    $('#hint').hide();
    $.ajax({
        url: '/ajax/SendSms.ajax.php',
        method: 'POST',
        data: data,
        success: function (e) {
            switch (type) {
                case 'send':
                    $('#sms-form').fadeIn();
                    var $page = $('html, body');
                    $page.animate({
                        scrollTop: $('#sms-form').offset().top - 100
                    }, 400);

                    $('#submit-content').html(' ');
                    $('.bid__form-input_call').focus();
                    //$('.replace-form').html('');
                    //$('.replace-form').append(cont);
                    $('#hint').html('Код отправлен на указанный номер');
                    $('#hint').show();
                    $sms_repeat_count++;
                    break;
                case 'resend':
                    $sms_repeat_count++;
                    $('#hint').html('Код отправлен на указанный номер');
                    $('#hint').show();
                    break;
                case 'check':
                    if (e.trim() == '1') {
                        var submit = BX.create('a', {
                            props: {
                                className: 'btn btn_red bid__form-btn sendFormButton',
                                id: 'send-code',
                                href: 'javascript:void(0)',
                            },
                            events: {
                                click: function () {
                                    $("form.bid__form:eq(0)").submit();
                                }
                            },
                            html: 'Отправить'
                        });
                        ress = true;
                        $('#hint').html('Код подтвержден');
                        $('#hint').show();
                        $('#submit-content').append(submit);
                        $('#submit-content').show();
                        $('#repeate-code').remove();
                        $('#send-code').remove();
                        $('#sms-form').fadeOut();
                        $('input[name="form_hidden_2555"]').val('Y');

                    } else {
                        $('#hint').html('Код указан не верно');
                        $('#hint').show();
                        ress = false;
                        return false;
                    }
                    break;
            }
        }
    })
}

function checkErrors() {
    resultat = true;
    var arr = [];

    resultat = checkDates(resultat);
    resultat = checkNames(resultat);
    resultat = checkDigit(resultat);
    // Проверяем Все текстовые инпуты
    $('form.bid__form:eq(0) input[type="text"]:visible').each(function () {
        if ($(this).data('skip') == '1')
            return true;
        var val = $.trim($(this).val());
        var attr = $(this).attr('id');
        var name = $(this).attr('name');
        if (name == 'form_text_2424' || name == "form_text_2425" || attr == 'send-code')
            return true;
        if (val == '') {
            $(this).parent().parent().find('.bid__form-hint').hide();
            $('#' + attr + '_error').show();
            arr.push($(this).attr('name'))
            resultat = false;
        } else {
            $(this).parent().parent().find('.bid__form-hint').show();
            $('#' + attr + '_error').hide();
        }
    });
    // Проверяем Все селекты
    $('form.bid__form:eq(0) select:visible').each(function () {
        var val = $(this).val().trim();

        if (val == '') {
            $(this).parent().find('.bid__form-hint').hide();
            $(this).parent().find('.error').show();
            arr.push($(this).attr('name'))
            resultat = false;
        } else {
            $(this).parent().find('.bid__form-hint').show();
            $(this).parent().find('.error').hide();
            //$(this).parent().parent().find('.error').hide();
        }
    });
    // Проверяем Регион
    if ($('input[name="form_text_2380"]').is(':visible')) {
        if ($('input[name="form_text_2380"]').val().length <= 0) {
            $('input[name="form_text_2380"]').parent().parent().find('.bid__form-hint.error').remove();
            $('input[name="form_text_2380"]').parent().parent().append('<div class="bid__form-hint error" style="display: block;">Не заполнены следующие обязательные поля: Регион</div>');
            resultat = false;
        } else {
            $('input[name="form_text_2380"]').parent().parent().find('.bid__form-hint.error').remove();
        }
    }
    // Проверяем Индекс
    if ($('input[name="form_text_2379"]').is(':visible')) {
        if ($('input[name="form_text_2379"]').val().length <= 0) {
            $('input[name="form_text_2379"]').parent().parent().find('.bid__form-hint.error').remove();
            $('input[name="form_text_2379"]').parent().parent().append('<div class="bid__form-hint error" style="display: block;">Не заполнены следующие обязательные поля: Индекс</div>');
            resultat = false;
        } else {
            $('input[name="form_text_2379"]').parent().parent().find('.bid__form-hint.error').remove();
        }
    }


    return resultat;
}

function sendFullForm() {
    var id = $('input[name="shortFromId"]').val(),
            bday = $('input[name="form_old_bdate"]').val(),
            formId = $('input[name="form_old_id"]').val(),
            valid = true,
            bAjax = true,
            bAjaxResult = false;

    //проверка кода
    if (id.length <= 0) {
        $('#shortFromId_error').show();
        valid = false;
    } else {
        $('#shortFromId_error').hide();
    }
    //проверка даты рождения
    if (bday.length < 10) {
        $('#form_old_bdate_error').show();
        valid = false;
    } else {
        $('#form_old_bdate_error').hide();
    }

    if (valid && bAjax) {
        var ajaxData = {
            'formId': formId,
            'id': id,
            'bday': bday
        };

        // если нажата кнопка "Отменить заявку", а не "Продолжить"
        if ($(this).attr('id') == 'cancel_app')
        {
            ajaxData.isCancelThisApp = true;
        }

        $.ajax({
            url: '/ajax/check-form-access.php',
            type: 'post',
            dataType: 'json',
            async: false,
            data: ajaxData,
            success: function (result) {
                // console.log('success', result);

                // скрываем сообщение об отмененной заявке
                $('div[id=hint_full]').hide();

                bAjax = true;
                result.status = true;
                if (result.status == false) {
                    if (result.statusId == false) {
                        $('div[id=hint_full]').html('Заявка не найдена или полностью заполнена. Возможно, вы указываете неверный номер, или заявка уже была удалена нами как полностью заполненная или устаревшая. Если вы не заполняли анкету с дополнительными вопросами в течение 14 дней, то ваша заявка просрочена - рекомендуем <a href="/bank-kredit/">оформить новую заявку</a>.').show();
                    } else {
                        if (result.oppStatus.length == 0) {
                            $('div[id=hint_full]').html('Заявка не найдена или полностью заполнена. Возможно, вы указываете неверный номер, или заявка уже была удалена нами как полностью заполненная или устаревшая. Если вы не заполняли анкету с дополнительными вопросами в течение 14 дней, то ваша заявка просрочена - рекомендуем <a href="/bank-kredit/">оформить новую заявку</a>.').show();
                        } else {
                            if (result.birthDate.length != 10) {
                                $('div[id=hint_full]').html('Дата рождения указана неверно. Попробуйте еще раз.').show();
                            } else {
                                $('div[id=hint_full]').html('Заявка не найдена или полностью заполнена. Возможно, вы указываете неверный номер, или заявка уже была удалена нами как полностью заполненная или устаревшая. Если вы не заполняли анкету с дополнительными вопросами в течение 14 дней, то ваша заявка просрочена - рекомендуем <a href="/bank-kredit/">оформить новую заявку</a>.').show();
                            }
                        }
                    }
                } else {

                    // если в результате запроса была отменена заявка
                    if (result.cancelAppSuccess != undefined && result.cancelAppSuccess != 'undefined' && result.cancelAppSuccess != null)
                    {
                        console.log('Ваша заявка отменена, но вы в любой момент при необходимости можете отправить новую. Возвращайтесь! :)');
                        $('div[id=hint_full]').html('Ваша заявка отменена, но вы в любой момент при необходимости можете отправить новую. Возвращайтесь! :)').show();
                    } else
                    {
                        // переход к длинной заявке
                        $('#form_old_bdate_error').hide();
                        $('#shortFromId_error').hide();

                        bAjaxResult = true;

                        $('form[name="BANK_KREDIT_FULL"]').submit();
                        //$('#c-credit').submit();
                        //console.log(result);
                        //редирект на полую страницу
                        //window.location.href = '/getproduct/full/?shortFromId=' + id;
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //$responseBeginBlock.addClass('hidden');
                //$methodBlock.filter('[data-type="no-response"]').removeClass('hidden');
                console.log(jqXHR, textStatus, errorThrown);
            }
        });

        return bAjaxResult;

    } else {
        return false;
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
    } else if (m < aa[2]) {
        age--;
    }
    return age;
}

function checkDates(resultat) {
    // проверка возраста
    $("input[name=form_text_2368]").data('skip', '1');
    $("input[name=form_text_2372]").data('skip', '1');
    var valbirthdate = $('#form_text_2368').val();
    if (!validateDate(valbirthdate)) {
        $('#form_text_2368_error').text("Укажите вернуюю дату рождения").show();
        resultat = false;
    } else {
        if (valbirthdate.length < 3) {
            $('#form_text_2368_error').show();
            resultat = false;
        } else {
            var yearBithInput = 0;
            yearBithInput = $('#form_text_2368').val().match(/^([0-9]+).([0-9]+).([0-9]+)/);
            yearBithInput = yearBithInput[3];
            var bithYear = 0;
            bithYear = age($('#form_text_2368').val());

            if (bithYear < 18 || bithYear > 68) {
                $('#form_text_2368_error').text("Ваш возраст должен быть от 18 до 68 лет").show();
                resultat = false;
            }
        }
    }
    //проверка даты выдачи пасспорта
    var valpassdate = $('#form_text_2372').val();
    if (!validateDate(valbirthdate)) {
        $('#form_text_2372_error').show();
        resultat = false;
    } else {
        if (valpassdate.length < 10) {
            $('#form_text_2372_error').text('Укажите вернуюю дату выдачи паспорта.').show();
            resultat = false;
        } else {
            var passportYearInput = 0;
            passportYearInput = $('#form_text_2372').val().match(/^([0-9]+).([0-9]+).([0-9]+)/);
            passportYearInput = passportYearInput[3];
            var pro = passportYearInput - yearBithInput;
            if (pro < 14) {
                $('#form_text_2372_error').text('Проверьте дату выдачи паспорта и дату рождения.').show();
                resultat = false;
            } else if (bithYear >= 14 && bithYear < 20) {
                if (pro > 20) {
                    $('#form_text_2372_error').text('Проверьте дату выдачи паспорта и дату рождения. Возможно, у вас закончился срок действия паспорта').show();
                    resultat = false;
                } else {
                    $('#form_text_2372_error').hide();
                }
            } else if (bithYear >= 20 && bithYear < 45) {
                if (pro < 20) {
                    $('#form_text_2372_error').text('Проверьте дату выдачи паспорта и дату рождения.').show();
                    resultat = false;
                } else if (pro > 45) {
                    $('#form_text_2372_error').text('Проверьте дату выдачи паспорта и дату рождения. Возможно, у вас закончился срок действия паспорта').show();
                    resultat = false;
                } else {
                    $('#form_text_2372_error').hide();
                }
            } else if (bithYear >= 45) {
                if (pro < 45) {
                    $('#form_text_2372_error').text('Проверьте дату выдачи паспорта и дату рождения. Возможно, у вас закончился срок действия паспорта').show();
                    resultat = false;
                } else {
                    $('#form_text_2372_error').hide();
                }
            }
        }
    }
    return resultat;
}

function checkNames(resultat) {
    //проверка фамилии
    $("input[name=form_text_2361]").data('skip', '1');
    $("input[name=form_text_2362]").data('skip', '1');
    $("input[name=form_text_2373]").data('skip', '1');
    $("input[name=form_email_2394]").data('skip', '1');
    $("input[name=form_text_2395]").data('skip', '1');
    var val = jQuery.trim($("input[name=form_text_2361]").val());
    if (val.length <= 0 || val.length >= 85 || !validateName(val)) {
        $('#form_text_2361_error').text("Укажите фамилию").show();
        resultat = false;
    } else {
        $('#form_text_2361_error').hide();
    }

    //проверка имени
    var val = jQuery.trim($("input[name=form_text_2362]").val());
    if (val.length <= 0 || val.length >= 85 || !validateName(val)) {
        $('#form_text_2362_error').text("Укажите имя").show();
        resultat = false;
    } else {
        $('#form_text_2362_error').hide();
    }

    //проверка лимита кредита у карты
    var val = jQuery.trim($("input[name=form_text_2270]").val());
    if (val.length <= 0 || val.length >= 7 || !validateName(val)) {
        $('.form_text_2270_error').text("Укажите сумму кредита от 20 000 до 400 000 руб").show();
        resultat = false;
    } else {
        $('.form_text_2270_error').hide();
    }

    // проверка кем выдан
    var val = jQuery.trim($("input[name=form_text_2373]").val());
    if (val.length <= 0 || val.length >= 160) {
        $('#form_text_2373_error').text("Укажите, каким органом выдан ваш действующий паспорт").show();
        resultat = false;
    } else {
        $('#form_text_2373_error').hide();
    }
    // email
    var val = $.trim($("input[name=form_email_2394]").val());
    if (val.length > 0) {
        //var emailPattern = /^[a-zA-Z0-9._@-]+$/;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(val)) {
            $('#form_text_2394_error').text("Укажите правильный адрес электронной почты").show();
            resultat = false;
        } else {
            $('#form_text_2394_error').hide();
        }
    } else {
        $('#form_text_2394_error').text("Укажите правильный адрес электронной почты").show();
        resultat = false;
        //hideError("input[name=form_text_655]");
    }

    // валидируем поля доходов и расходов только если обязательность полей не снята
    //Ваш среднемесячный доход (до вычета налогов)
    //if ($('input[name=form_text_1965]').attr('data-required') != 'false') {
    var val = jQuery.trim($('input[name=form_text_2395]').val());
    var digitalPattern = /^[\d]{1,15}$/;
    if (!digitalPattern.test(val)) {
        $('#form_text_2395_error').text("Укажите ваш доход в месяц").show();
        resultat = false;
    } else {
        $('#form_text_2395_error').hide();
    }
    //} else {
    //    hideError('input[name=form_text_1965]');
    // }

    return resultat;
}

function checkDigit(resultat) {
    //проверка суммы кредита
    //корректировка введенного значения
    $("input[name=form_text_2359]").data('skip', '1');
    $("input[name=form_text_2360]").data('skip', '1');
    var valRaw = $("input[name=form_text_2359]").val();
    var val = valRaw.replace(/ /g, "");
    $("input[name=form_text_2359]").val(val);
    var digitPattern = /^[\d]+$/;
    //если значение не введено
    if (val.length <= 0) {
        $('#form_text_2359_error').text('Укажите сумму кредита от 20 000 до 3 000 000 рублей').show();
        resultat = false;
    } else if (!digitPattern.test(val)) {
        //если значение не цифра
        $('#form_text_2359_error').text('Укажите сумму кредита от 20 000 до 3 000 000 рублей').show();
        resultat = false;
    } else {
        $('#form_text_2359_error').hide();
        if (val < 20000 || val > 3000000) {
            $('#form_text_2359_error').text('Укажите сумму кредита от 20 000 до 3 000 000 рублей').show();
            resultat = false;
        } else {
            $('#form_text_2359_error').hide();
        }
    }
    //проверка срока кредита
    var val = jQuery.trim($("input[name=form_text_2360]").val());
    $("input[name=form_text_2360]").val(val);
    var digitPattern = /^[\d]+$/;
    if (val.length <= 0) {
        $('#form_text_2360_error').text('Укажите срок кредита от 12 до 60 месяцев').show();
        resultat = false;
    } else if (!digitPattern.test(val)) {
        $('#form_text_2360_error').text('Укажите срок кредита от 12 до 60 месяцев').show();
        resultat = false;
    } else {
        if (val < 12 || val > 60) {
            $('#form_text_2360_error').text('Укажите срок кредита от 12 до 60 месяцев').show();
            resultat = false;
        } else {
            $('#form_text_2360_error').hide();
        }
    }

    return resultat;
}
/* End */
;
; /* Start:/local/templates/mts-bank/components/aic.robotics/kladr.form/landing/script.js*/
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
;; /* /local/templates/mts-bank/components/bitrix/form.result.new/form/script.js*/
; /* /local/templates/mts-bank/components/aic.robotics/kladr.form/landing/script.js*/
