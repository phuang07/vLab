// place any jQuery/helper plugins in here, instead of separate, slower script files.

$('input.placeholder, textarea.placeholder').each(function() {

	var element = $(this),
	    defaultValue = element.val();
	
	element.focus(function() {
		if(element.val() == defaultValue){
			$(this).val('');
		}
	});
	
	element.blur(function() {
		if(element.val() == ''){
			$(this).val(defaultValue);
		}
	});

});

$('.mouse-events').each(function() {

	var $this = $(this);
	
	$this.bind('mouseover', function() {
	
		$this.addClass('hover');
	
	});
	
	$this.bind('mouseout', function() {
	
		$this.removeClass('hover');
	
	});
	
	$this.bind('mousedown', function() {
	
		$this.removeClass('hover');
		$this.addClass('active');
		
		$this.bind('mouseleave', function() {
		
			$this.removeClass('hover');
			$this.removeClass('active');
			
			$(this).unbind('mouseleave');
		
		});
	
	});
	
	$this.bind('mouseup', function() {
	
		$(this).removeClass('active');
		$(this).addClass('hover');
	
	});

});