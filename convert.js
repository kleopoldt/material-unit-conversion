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
	convert($('.startUnits').val(), $('.endUnits').val());
	e.preventDefault();
});

//adds units back into dropdown when radio button selected
function selectMeasurement(type) {
	$('.endUnits, .startUnits').find('option').remove();
	console.log('my type = ' + type);
	if (type == 'ysts') {
		$('.endUnits, .startUnits').append(ystsOptions);
	} else if (type =='elon') {
		$('.endUnits, .startUnits').append(elonOptions);
	} else if (type =='hard')  {
		$('.endUnits, .startUnits').append(hardOptions);
	} else if (type =='charpy')  {
		$('.endUnits, .startUnits').append(charpyOptions);
	} else if (type =='temp')  {
		$('.endUnits, .startUnits').append(tempOptions);
	} else if (type =='dia')  {
		$('.endUnits, .startUnits').append(diaOptions);
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
	if (start == 'inch' && end == 'mm') {
		var answer = userInput * 25.4;
	} else if (start == 'mm' && end == 'inch') {
		var answer = userInput / 25.4;
	}
	$('#answer').html(answer);
	console.log('start = ' + start + ', end = ' + end + ', input = ' + userInput);
}