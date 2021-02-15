(function($) {

	// -------------- ANIMOVANIE HEADERA ---------------
		var cover = $('#cover'),
			covers = $('.fadecovers');

	
		covers.children(':not(:last)').hide();


		var Slider = {
			intervalID: null,
			running: false,
			config: {
				fadeSpeed: 1500,
				delayTime: 5000
			},

			set: function (id) {
				this.intervalID = id;
			},

			get: function () {
				return 'IDcko intervalu je: ' + this.intervalID 
			},

			start: function() {
				var slider = this;
				this.intervalID = setInterval(function() {
					covers.children(':last')
						.fadeOut(slider.config.fadeSpeed, function() { $(this).prependTo( covers ); })
						.prev().fadeIn(slider.config.fadeSpeed);
				}, slider.config.delayTime);

				this.running = true;
				},

			pause: function() {
				clearInterval( this.intervalID);
				this.intervalID = null;

				this.running = false;

			},

			resume: function () {

				if( !this.intervalID ) this.start();

			},

			toggle: function(){
				if( this.running ) this.pause();
				else this.resume();

			}
				}

			Slider.start();	

			cover.on('click', function() {
				Slider.toggle();
			});


	//------------ ANIMOVANE NADPISU-------

		$('.headline').addClass('fadeInLeft');


	//------------ ANIMOVANE ODKAZY V HEADERI-------

		var headline_link1 = $('.headline_link_1'),
			headline_link2 = $('.headline_link_2'),
			headline_link3 = $('.headline_link_3');

		headline_link1.delay(1000).animate({opacity: '1'}, 1000, 'swing');
		headline_link2.delay(2500).animate({opacity: '1'}, 1000, 'swing');
		headline_link3.delay(4000).animate({opacity: '1'}, 1000, 'swing');
			

	//------------------------ SKROLOVANIE -----------------------------

		var menu = $('.links'),
			button  = $('.navbar-collapse'),
			menuLinks = menu.find('a');
	
		
		menuLinks.on('click', function(event) {

			event.preventDefault();

			// po kliknuti na link v menu sa menu skryje
			button.removeClass('show');
			
			var id = this.hash;
	
			// po kliknuti na link v menu sa zoskroluje na vybranú sekciu
	
			$('html,body').animate({ scrollTop: $(id).offset().top }, 800,'swing', function() {
	
				// pridaj hash do adresy
				window.location.hash = id;
					});
			});
	
	//------------------------ SKROLOVACIE BUTTONY -----------------------------

		// vytvorime link button, cez ktorý sa vieme scrollovat na prvú sekciu a na vrch stranky
		var backToTop = $('<a>', { 
			href: '#home', 
			class: 'back-to-top',
			html: '<i class="fa fa-angle-double-up fa-4x"></i>'
			}).attr("aria-label","arrow to top "),

			scrollDown = $('<a>', { 
			href: '#home', 
			class: 'back-to-top',
			html: '<i class="fa fa-angle-double-down fa-4x"></i>'
			}).attr("aria-label","arrow down");

			

		// link pridame na stranku a naviazeme nan scrollovaciu funkciu
		backToTop
			.hide()
			.appendTo('body')
			.on('click', function() {
				$('html,body').animate({ scrollTop: 0 }, 800,'swing');
			});

		scrollDown
			.appendTo('body')
			.on('click', function() {
				$('html,body').animate({ scrollTop: $('#udaje_znalca').offset().top }, 800,'swing');
			});	
	

		// button down skryjeme ak prideme hlbsie do stranky stranke
		var win = $(window);
	
		win.scroll(function() {
			if ( win.scrollTop() <= 350 ) scrollDown.fadeIn();
				else scrollDown.hide();
				});

		// button up zobrazime iba ak sme dostatocne hlboko v stranke
		win.scroll(function() {
			if ( win.scrollTop() >= 500 ) backToTop.fadeIn();
				else backToTop.hide();
				});

})(jQuery);