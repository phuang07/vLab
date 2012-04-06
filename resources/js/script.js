$(window).load(function() {

	var navigation = $('nav').find('ul'),
	    navigationWidth = ($.browser.mozilla || $.browser.msie) ? navigation.width() + 1 : navigation.width();

	navigation.css({ width: navigationWidth, float: 'none', margin: '0 auto', visibility: 'visible' });
	
	$('#background-radial').css({ visibility: 'visible' });

});

$(document).ready(function() {
	
	$('#work-gallery-frame').gallery();
	
	$("#work-gallery").find('a').fancybox({
		'transitionIn': 'elastic',
		'transitionOut': 'elastic',
		'speedIn': 300,
		'speedOut': 200,
		'overlayOpacity': 0.58,
		'overlayColor': '#000'
	});
	
	$('#social-networks').social({
		listStyle: 'text'
	});
	
	$("#twitter").tweet({
		username: "leoman730",
		count: 5,
		loadingText: "loading tweets..."
	});

	var containerHeight = $('#container').height(),
	    header = $('header');
	
	$(window).resize(function() {
	
		var windowHeight = $(this).height(),
		    calculate = (274 + (windowHeight - containerHeight) + 12) / 2;
		
		if(calculate > 274) { calculate = 274 } else if(calculate < 42) { calculate = 42 }
		
		header.css({ height: calculate });
	
	}).trigger('resize');
	
	$.address.change(function(event) {
	
		$('nav').find('a[href="' + event.value + '"]').trigger('click');
		
		if(contactFormSubmitted) {
		
			if(event.pathNames[0] == 'contact') {
			
				setTimeout(function() {
				
					if(defaults.name.element.hasClass('error')) defaults.name.element.tooltip('show');
					if(defaults.email.element.hasClass('error')) defaults.email.element.tooltip('show');
					if(defaults.message.element.hasClass('error')) defaults.message.element.tooltip('show');
				
				}, 250);
			
			} else {
			
				if(defaults.name.element.hasClass('error')) defaults.name.element.tooltip('hide');
				if(defaults.email.element.hasClass('error')) defaults.email.element.tooltip('hide');
				if(defaults.message.element.hasClass('error')) defaults.message.element.tooltip('hide');
			
			}
		
		}
		
		initialLoad = false;
	
	});
	
	var contentAnimating = false,
	    initialLoad = true;

	$('nav').delegate('a', 'click', function() {
	
		if(!contentAnimating) {
		
			contentAnimating = true;
			
			$(this).parent('li').siblings().removeClass('active').end().addClass('active');
			
			$.address.value($(this).attr('href'));
			
			if(initialLoad) {
				$('#card-content-wrap').css({ marginLeft: ($(this).parent('li').index() * 590) * -1 });
				contentAnimating = false;
				initialLoad = false;
			} else {
				$('#card-content-wrap').animate({ marginLeft: ($(this).parent('li').index() * 590) * -1 }, 500, 'easeOutExpo', function() { contentAnimating = false; });
			}
		
		}
	
		return false;
	
	});
	
	$('.scrollable').jScrollPane();
	
	var contactForm = $('#contact-form').find('form'),
	    contactFormSubmitted = false,
	    validationInitialized = false,
	    defaults = {
	        name: { element: contactForm.find('[name=name]') },
	        email: { element: contactForm.find('[name=email]') },
	        message: { element: contactForm.find('[name=message]') }
	    };
	
	defaults.name.value = defaults.name.element.val();
	defaults.email.value = defaults.email.element.val();
	defaults.message.value = defaults.message.element.val();
	
	contactForm.find('.button').click(function() {
	
		contactFormSubmitted = true;
		
		defaults.name.element.tooltip({ text: 'This field is required', width: 'auto', textAlign: 'center', arrowDirection: 'right', clickToDismiss: true });
		defaults.email.element.tooltip({ text: 'Please enter a valid email address', width: 'auto', textAlign: 'center', arrowDirection: 'right', clickToDismiss: true });
		defaults.message.element.tooltip({ text: 'This field is required', width: 'auto', textAlign: 'center', arrowDirection: 'right', clickToDismiss: true });
	
		if(!validationInitialized) {
	
			$.validator.addMethod("notEqual", function(value, element, param) {
				return this.optional(element) || value != param;
			}, "This field is required");
			
			contactForm.validate({
				rules: {
					name: {
						required: true,
						notEqual: defaults.name.value
					},
					email: {
						required: true,
						email: true,
						notEqual: defaults.email.value
					},
					message: {
						required: true,
						notEqual: defaults.message.value
					}
				},
				errorPlacement: function(error, element) {
					element.tooltip('show');
				},
				highlight: function(element, errorClass, validClass) {
					if(element.type === 'radio') {
						this.findByName(element.name).addClass(errorClass).removeClass(validClass);
					} else {
						$(element).addClass(errorClass).removeClass(validClass);
					}
					$(element).tooltip('show');
				},
				unhighlight: function(element, errorClass, validClass) {
					if(element.type === 'radio') {
						this.findByName(element.name).removeClass(errorClass).addClass(validClass);
					} else {
						$(element).removeClass(errorClass).addClass(validClass);
					}
					$(element).tooltip('hide');
				}
			});
			
			validationInitialized = true;
		
		}
		
		if(contactForm.valid()) {
		
			$.post('resources/php/mail.php', contactForm.serialize(), function(response) {
			
				if(response == '1') {
			
					defaults.name.element.removeClass('valid').val(defaults.name.value);
					defaults.email.element.removeClass('valid').val(defaults.email.value);
					defaults.message.element.removeClass('valid').val(defaults.message.value);
				
					contactForm.find('.status').fadeIn(400);
					
					contactForm.find('input').bind('keydown', function() {
					
						contactForm.find('.status').fadeOut(400);
						
						contactForm.find('input').unbind('keydown');
					
					});
				
				}
			
			});
		
		}
	
	});
	
	$('#card-header-button').click(function() {
	
		if($(this).data('download') !== undefined) {
		
			window.location.assign($(this).data('download'));
		
		}
		
		if($(this).data('page') !== undefined) {
		
			$.address.value('/' + $(this).data('page'));
		
		}
		
		if($(this).data('url') !== undefined) {
		
			window.open($(this).data('url'), '_newtab');
		
		}
	
	});

});