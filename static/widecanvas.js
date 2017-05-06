$(document).ready(function() {
	$(".sectioned-social-bar > .row").on('onmouseenter', function() {
		$(this).addClass('hundred-perc-width');
	});
	
	$(".sectioned-social-bar > .row").on('onmouseleave', function() {
		$(this).removeClass('hundred-perc-width');
	});

	$(".menu-nav li").on('click', function() {
		$(".menu-nav li").not(this).removeClass('active');
		$(this).addClass('active');
	});

	$('.sliding_images').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000
	});

	$('.emailContact').click(function() {
		var name = $('.name').val(),
			emailID = $('.emailID').val(),
			emailBody = $('.emailBody').val();
		var link = "mailto:msurabh@gmail.com"
             + "?subject=" + escape("Widecanvas Contact Form")
             + "&body=" + escape(emailBody);		             
		window.location.href = link;            
	});
});
