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


    $("#banner").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        smartSpeed: 500,
        nav: true,
        dots: true,
        navText: ['<div class="arrow arrow_left"><img src="img/arr_left.png"></div>', '<div class="arrow arrow_right"><img src="img/arr_right.png"></div>']
    });

    $("#recall-slider").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        smartSpeed: 500,
        nav: true,
        dots: false,
        navText: ['<div class="arrow arrow_left"><img src="img/arr_left-white.png"></div>', '<div class="arrow arrow_right"><img src="img/arr_right-white.png"></div>']
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
//end
});

//

$(document).ready(function(){

    // инициализация блока выбора карт
    var cardChoise = new CardsChoise();

    // устанавливаем предвыбранные значения карт на основе get параметров (если они конечно есть)
    cardChoise.setPerviosCardChoise();

});
/* End */

//

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


