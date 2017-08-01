/*
	Photon by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1140px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 320px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 250);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly();

	});

})(jQuery);

// Set the date we're counting down to
var countDownDate = new Date("Aug 20, 2017 18:00:00").getTime();

// Update the count down every 1 second
var countdownfunction = setInterval(function() {

	// Get todays date and time
	var now = new Date().getTime();
	
	// Find the distance between now an the count down date
	var distance = countDownDate - now;
	
	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	// Output the result in an element with id="demo"
	document.getElementById("demo").innerHTML = days + "d " + hours + "h "
	+ minutes + "m " + seconds + "s ";
	
	// If the count down is over, write some text 
	if (distance < 0) {
		clearInterval(countdownfunction);
		document.getElementById("demo").innerHTML = "EXPIRED";
	}
}, 1000);