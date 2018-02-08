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
	$('.sliding_images').prepend($('.homepage-text'));

	$('.emailContact').click(function() {
		var name = $('.name').val(),
			emailID = $('.emailID').val(),
			emailBody = $('.emailBody').val();
		var link = "mailto:msurabh@gmail.com"
             + "?subject=" + escape("Widecanvas Contact Form")
             + "&body=" + escape(emailBody);
		window.location.href = link;
	});

	$.get('docs/about-us.html').done(function(response) {
		$('.about-us-body').append($($.parseHTML(response)));
	});
	$.get('docs/projects.html').done(function(response) {
		var projects=$($.parseHTML(response));
		$('.projects-body').append(projects);
		var allProjects = projects.children();
		for (i=0; i<allProjects.length; i++)	{
			var projectList = $('<li><a href="#project1">Project1</a></li>');
			projectList.find('a').attr('href', '#project'+(i+1));
			projectList.find('a').text(
					allProjects.eq(i).find('.header').text()
				);
			$('.projects-dropdown-menu').append(projectList);
		}
		$('.project-data').expander({slicePoint: 400});
	});
	$.get('docs/itineraries.html').done(function(response) {
		$('.itineraries').append($($.parseHTML(response)));
	});

	$(document).delegate('[data-target="#toc"]', 'click', function() {
		$('#toc_page').attr('src', 'docs/toc.html');
	});

	$.get('docs/marquee.html').done(function(response) {
		$('.marquee_code').append($($.parseHTML(response)));
	});
	$.get('docs/testimonials.html').done(function(response) {
		$('.testimonials-container').append($($.parseHTML(response)));
	});

	$('#map').on('load', function() {
		$('[for="map"]').hide();
		$(this).show();
	});

	$(document).delegate('[data-target="#initerary_detail"]', 'click', function() {
		var itinerary_detail = $(this).attr('data-itinerary');
		$('.itinerary-header').text(itinerary_detail);
		$('#initerary_detail_page').next('img').show();
		setTimeout(function() {
			$('.download_itinerary').attr('href', 'docs/'+itinerary_detail+'.docx');
			$('#initerary_detail_page').attr('src', 'docs/'+itinerary_detail+'.html');
			$('#initerary_detail_page').next('img').hide();
		}, 500);		
	});

	var showPosts = function(tk) {
		$.get(
			'https://graph.facebook.com/v2.12/awidecanvas/feed?access_token={access_token}'.replace(
				'{access_token}',
				tk
				)
			).done(function(response) {
			var firstPost = response.data[0].id.split('_')[1];
			var postUrl = "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fawidecanvas%2Fposts%2F{postId}&width=316".replace("{postId}", firstPost);
			$('#facebookPost').attr('src', postUrl);
			$('#facebookPostLoading').hide();
		});
	};

	$.get('https://graph.facebook.com/oauth/access_token?client_id=404769543315022&client_secret=ee0dd6b38081f9be4493bd7bed07d5e2&grant_type=client_credentials').done(
		function(response) {
			var tk = response.access_token;
			showPosts(tk);
			$('#site_logo').attr(
				'src',
				'https://graph.facebook.com/v2.12/awidecanvas/picture?height=80&width=100&access_token=' + tk
				);
		}
	);	

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '791998864301598',
			xfbml      : true,
			version    : 'v2.9'
		});
		FB.AppEvents.logPageView();
	};

	(function(d, s, id)	{
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));


	var scrollEvent = function () {
		if($(window).scrollTop() > 60) {
			$('.marquee_code').css('top', '0');
		}
		else {
			$('.marquee_code').css('top', '71px');
		}
	};

	$(window).scroll(function() {
		scrollEvent();
	});

	scrollEvent();

});
