$(function(){

	var calc = $('.calc');
	var keys = calc.find('.calc_key');
	var disp = calc.find('.calc_disp');
	var button = calc.find('.calc_button');
	var specbutton = calc.find('.calc_spec_button');
	var CE = calc.find('.CE');
	var equal = calc.find('.equal');
	var backspace = calc.find('.backspace');
	var fact = calc.find('.factorial');
	var fraction = calc.find('.fraction');
	var pow = calc.find('.pow');
	var pm = calc.find('.plus_minus');
	var a;
	var char;
	var str;

	/*---------Идентиицируем кнопки на странице---------*/
	keys.each(function(){
		$(this).text($(this).attr('value'));
	});

	/*---------Обнуляем поле ввода---------*/
	disp.val('0');

	/*---------Ввод---------*/
	button.on('click', function(){
		if (disp.val() == '0') {
			disp.val($(this).attr('value'));
		} else
		disp.val(disp.val() + $(this).attr('value'));
	});

	/*---------Ввод-операций(+,-,*,/)---------*/
	specbutton.on('click', function(){
		char = (disp.val()).charAt(disp.val().length-1);
		if (char !== '+' && char !== '-' && char !== '*' && char !== '/' && char !=='.') {
		disp.val(disp.val() + $(this).attr('value'));
		} else disp.val(disp.val().substring(0, disp.val().length-1) + $(this).attr('value'));
	});

	/*---------Сброс---------*/
	CE.on('click', function(){
		disp.val('0');
	});

	/*---------Результат(=)---------*/
	equal.on('click', function(){
		if (pow.hasClass('active')) {
			disp.val(Math.pow(a, disp.val()));
			pow.removeClass('active');
		} else
		disp.val(eval(disp.val()));
	});

	/*---------Стереть---------*/
	backspace.on('click', function(){
		if (disp.val().length == 1) {
			disp.val('0');
		}
		if (disp.val() !== '0') {
			disp.val(disp.val().substring(0, disp.val().length-1));
		}

	});

	/*---------Факториал---------*/
	fact.on('click', function(){
		var a = disp.val();
		var res = 1;
		while (a > 1){
			res = res*a;
			a = a-1;
		}
		disp.val(res);
	});

	/*---------Дробь (1/х)---------*/
	fraction.on('click', function(){
		var a = disp.val();
		a = 1/a;
		disp.val(a);
	})

	/*---------(x^n)---------*/
	pow.on('click', function(){
		pow.addClass('active');
		a = disp.val();
		disp.val('');
		return a;
	});

	/*---------Плюс на минус---------*/
	pm.on('click', function(){
		disp.val(eval(disp.val()+'*-1'));
	});

});