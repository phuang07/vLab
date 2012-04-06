(function($) {

	$.widget("ui.social", {
	
		options: {
			listStyle: 'tooltip'
		},
		
		_create: function() {
		
			var social = this,
			    socialNetworks = social.element.find('li'),
			    socialNetworksCount = socialNetworks.size();
		
			switch(this.options.listStyle) {
			
				case 'tooltip':
				
					var socialNetworkRows = 2,
					    socialNetworksPerRow = Math.ceil(socialNetworksCount / socialNetworkRows);
					
					socialNetworks.css({ marginRight: Math.floor(516 / (socialNetworksPerRow - 1)) - 32, marginBottom: 28 });
					social.element.find('li:nth-child(' + socialNetworksPerRow + 'n)').css({ marginRight: 0 });
					
					social.element.delegate('a', 'mouseover', function() {
					
						var img = $(this).find('img'),
						    text = img.data('text').replace('{network}', img.data('network')),
						    instantiated = $(this).data('instantiated');
						
						$(this).data('instantiated', true);
						
						if(!instantiated) $(this).tooltip({ text: text });
						
						$(this).tooltip('show');
					
					});
					
					social.element.delegate('a', 'mouseout', function() {
					
						$(this).tooltip('hide');
					
					});
					
					social.element.css({ paddingTop: '18px' });
				
				break;
				
				case 'text':
				
					$.each(socialNetworks.slice(0, 4), function(index, item) {
						
						var elem = $(this);
						    img = $(this).find('img'),
						    text = img.data('text').replace('{network}', img.data('network'));
						
						elem.css({ width: 274, cursor: 'pointer', marginBottom: 19 }).addClass('clearfix');
						elem.html('<div class="icon"><img src="' + img.attr('src') + '" /></div><div class="label">' + text + '</div>');
						elem.click(function() { window.open(elem.find('a').attr('href')); });
						
					});
					
					social.element.css({ height: 102 });
					
					var additionalSocialNetworks = $('<div id="social-networks-additional"></div>');
					
					social.element.after(additionalSocialNetworks);
					
					var text = 'I am also to be found on: ';
					
					socialNetworksCount = socialNetworksCount - 4;
					
					$.each(socialNetworks.slice(4), function(index, item) {
					
						text += '<a href="' + $(this).find('a').attr('href') + '" target="_blank">' + $(this).find('img').data('network') + '</a>';
						
						if((index + 1) == (socialNetworksCount - 1)) {
							text += ' & '
						} else if((index + 1) < socialNetworksCount) {
							text += ', '
						}
						
						$(this).remove();
					
					});
					
					additionalSocialNetworks.html(text);
				
				break;
			
			}
		
		},
		
		_setOption: function(key, value) {
		
			switch(key) {
	
				case "clear":
				
					console.log(value);
				
				break;
			
			}
			
			this._super("_setOption", key, value);
		
		},
		
		destroy: function() {
 			
 			console.log('Destroy');
 		
		}
	
	});
	
})(jQuery);