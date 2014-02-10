//console.log("Hello World");

/*determine which radio button is selected and offer the correct choices from the dropdowns (all hidden by default in html?)
*when dropdown selections are made, convert based off of order of selections (boxes must had different ids? To/From?)
--make sure that there is an option if both are the same (i.e., don't convert anything)
*return the answer
--start with a console.log, move from there
--allow the user to copy the answer to clipboard?*/

$('input[name=prop]').click( function() {
	var myId = $(this).attr('id');
		selectMeasurement(myId);
});

$('#MTR').submit( function (e) {
	if ( $('#pren').is(':checked') ) {
		var answer = convertPREN(parseFloat($('#Cr').val()),parseFloat($('#Mo').val()),parseFloat($('#N').val()),parseFloat($('#W').val()));
	} else { 
		var answer = convert($('.startUnits').val(), $('.endUnits').val())
	}
	$('#answer').html(answer);
	e.preventDefault();
});

//adds units back into dropdown when radio button selected
function selectMeasurement(type) {
	$('.endUnits, .startUnits').find('option').remove();
	console.log('my type = ' + type);
	if (type == 'ysts') {
		$('.endUnits, .startUnits').append(ystsOptions);
		$('.unit_input, .value_input label, #userInput').show();
		$('.PRENs').hide();
	} else if (type =='elon') {
		$('.endUnits, .startUnits').append(elonOptions);
		$('.unit_input, .value_input label, #userInput').show();
		$('.PRENs').hide();
	} else if (type =='hard')  {
		$('.endUnits, .startUnits').append(hardOptions);
		$('.unit_input, .value_input label, #userInput').show();
		$('.PRENs').hide();
	} else if (type =='charpy')  {
		$('.endUnits, .startUnits').append(charpyOptions);
		$('.unit_input, .value_input label, #userInput').show();
		$('.PRENs').hide();
	} else if (type =='temp')  {
		$('.endUnits, .startUnits').append(tempOptions);
		$('.unit_input, .value_input label, #userInput').show();
		$('.PRENs').hide();
	} else if (type =='dia')  {
		$('.endUnits, .startUnits').append(diaOptions);
		$('.unit_input, .value_input label, #userInput').show();
		$('.PRENs').hide();
	} else if (type =='pren') {
		$('.PRENs').show();
		$('.unit_input, .value_input label, #userInput').hide();
	}
}

//variables for each set of units
var ystsOptions = $('.startUnits').find('option.ysts');
var elonOptions = $('.startUnits').find('option.elon');
var hardOptions = $('.startUnits').find('option.hard');
var charpyOptions = $('.startUnits').find('option.charpy');
var tempOptions = $('.startUnits').find('option.temp');
var diaOptions = $('.startUnits').find('option.dia');

//removes the units on page load
$('.endUnits, .startUnits').find('option').remove();

//conversions... finish adding all. This could probably be built better without 'ifs'
function convert(start, end) {
	var userInput = parseFloat($('#userInput').val());
	var unitType = $(".endUnits option:selected").text();
	if (start == 'inch' && end == 'mm') {
		return (userInput * 25.4).toFixed(2) + " " + unitType;
	} else if (start == 'mm' && end == 'inch') {
		return (userInput / 25.4).toFixed(2) + " " + unitType;
	} else if (start == 'mpa' && end == 'ksi') {
		return (userInput / 4.448222*25.4*25.4 / 1000).toFixed(2) + " " + unitType;
	} else if (start == 'ksi' && end == 'mpa') {
		return ((userInput * 4.448222) / (25.4*25.4) * 1000).toFixed(2) + " " + unitType;
	} else if (start == '4d' && end == '5.65') {
		return (userInput * 0.799).toFixed(2) + "% " + unitType;
	} else if (start == '5.65' && end == '4d') {
		return (userInput * 1.252).toFixed(2) + "% " + unitType;
	} else if (start == 'hrc' && end == 'bhn') {
		return ((userInput * 5.97 + 104.7)).toFixed(2) + " " + unitType;
	} else if (start == 'bhn' && end == 'hrc') {
		return (18.1673 + (0.120388 * userInput) - 0.0000694388 * (userInput * userInput) - (4883.27 / userInput)).toFixed(2) + " " + unitType;
	} else if (start == 'ftlbs' && end == 'joules') {
		return (userInput * 1.35581795).toFixed(2) + " " + unitType; 
	} else if (start == 'joules' && end == 'ftlbs') {
		return (userInput * 0.7375621482).toFixed(2) + " " + unitType; 
	} else if (start == 'degf' && end == 'degc') {
		return ((userInput - 32) * 5/9).toFixed(2) + " " + unitType; 
	} else if (start == 'degc' && end == 'degf') {
		return ((userInput * 9/5) + 32).toFixed(2) + " " + unitType;
	}
}

function convertPREN(Cr,Mo,N,W) {
	return (Cr + (3.3 * (Mo + (0.5 * W))) + 16 * N).toFixed(2) + " PREN";
}

$("#ysts").trigger("click");

//use keyup method to determine when data is entered... real-time conversions
//use +$(...) to convert string to number (the +)