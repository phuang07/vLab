(function($) {

	$.widget("ui.tooltip", {
	
		options: {
			text: 'Default text',
			width: 'auto',
			textAlign: 'center',
			arrowDirection: 'down',
			arrowPosition: 'middle',
			clickToDismiss: false
		},
		
		_create: function() {
		
			var tooltip = this,
			    elementPosition, $textWidth, textWidth,
			    tooltipSides, calculateDistance, dimensions,
			    positions;
			
			function calculate(redraw) {
		
				elementPosition = tooltip.element.offset(),
				$textWidth = $('<div class="tooltip-text">' + tooltip.options.text + '</div>').prependTo('body'),
				textWidth = $textWidth.outerWidth();
				$textWidth.remove();
				
				tooltipSides = 6;
				
				calculateDistance = {
					left: (textWidth - tooltipSides) - 18,
					middle: Math.floor(((textWidth - tooltipSides) / 2) - (13 / 2)),
					right: (textWidth - tooltipSides) - 18
				}
				
				dimensions = {
					left: {
						left: 5,
						right: calculateDistance.left
					},
					middle: {
						left: calculateDistance.middle,
						right: calculateDistance.middle
					},
					right: {
						left: calculateDistance.right,
						right: 5
					}
				};
				
				dimensions.middle.left = ((calculateDistance.middle * 2) + 13 == (textWidth - tooltipSides)) ? dimensions.middle.left : dimensions.middle.left + 1;
				
				if(!redraw) {
				
					positions = {
						left: {
							top: elementPosition.top + Math.ceil(tooltip.element.outerHeight() / 2) - 19,
							left: elementPosition.left + tooltip.element.outerWidth() + 17
						},
						right: {
							top: elementPosition.top + Math.ceil(tooltip.element.outerHeight() / 2) - 19,
							left: elementPosition.left - textWidth - 17
						},
						down: {
							top: elementPosition.top - 60,
							left: elementPosition.left - Math.floor(textWidth / 2) + (tooltip.element.width() / 2)
						}
					};
				
				} else {
				
					positions = {
						left: {
							top: elementPosition.top + Math.ceil(tooltip.element.outerHeight() / 2) - 19,
							left: elementPosition.left + tooltip.element.outerWidth() + 5
						},
						right: {
							top: elementPosition.top + Math.ceil(tooltip.element.outerHeight() / 2) - 19,
							left: elementPosition.left - textWidth - 5
						},
						down: {
							top: elementPosition.top - 48,
							left: elementPosition.left - Math.floor(textWidth / 2) + (tooltip.element.width() / 2)
						}
					};
				
				}
				
				tooltip.postions = positions;
			
			}
			
			calculate();
			
			tooltip.markup  = '<div class="tooltip ' + tooltip.options.arrowDirection + '-arrow clearfix" style="width:' + textWidth + 'px; top:' + tooltip.postions[tooltip.options.arrowDirection].top + 'px; left:' + tooltip.postions[tooltip.options.arrowDirection].left + 'px; z-index:1000;">';
		
			tooltip.markup +=     '<div class="tooltip-body-left"></div>';
			tooltip.markup +=     '<div class="tooltip-body-right"></div>';
		
			tooltip.markup +=     '<div class="tooltip-body-middle">';
			tooltip.markup +=         '<div class="tooltip-body-content">' + tooltip.options.text + '</div>';
			
			if(tooltip.options.arrowDirection == 'down') {
			
				tooltip.markup +=     '<div class="tooltip-body-arrow">';
				tooltip.markup +=         '<div class="tooltip-body-arrow-left" style="width:' + dimensions[tooltip.options.arrowPosition].left + 'px;"></div>';
				tooltip.markup +=         '<div class="tooltip-body-arrow-middle"></div>';
				tooltip.markup +=         '<div class="tooltip-body-arrow-right" style="width:' + dimensions[tooltip.options.arrowPosition].right + 'px;"></div>';
				tooltip.markup +=     '</div>';
			
			}
			
			tooltip.markup +=     '</div>';
			
			tooltip.markup += '</div>';
			
			tooltip.parent = $(tooltip.markup).prependTo('body');
			
			$(window).resize(function() {
			
				if(tooltip.showing) {
				
					calculate(true);
				
					tooltip.parent.css({ top: tooltip.postions[tooltip.options.arrowDirection].top, left: tooltip.postions[tooltip.options.arrowDirection].left });
				
				}
			
			});
			
			if(tooltip.options.clickToDismiss) {
			
				tooltip.parent.css({ cursor: 'pointer' }).click(function() {
				
					tooltip.hide();
				
				});
			
			}
		
		},
		
		show: function() {
		
			var tooltip = this;
			
			tooltip.delay = setTimeout(function() {
				
				switch(tooltip.options.arrowDirection) {
				
					case 'down':
					
						tooltip.parent.animate({ top: tooltip.postions.down.top + 12, opacity: 'show' }, 240, 'easeOutQuad');
						
					break;
					
					case 'left':
					
						tooltip.parent.animate({ left: tooltip.postions.left.left + 12, opacity: 'show' }, 240, 'easeOutQuad');
					
					break;
					
					case 'right':
					
						tooltip.parent.animate({ left: tooltip.postions.right.left + 12, opacity: 'show' }, 240, 'easeOutQuad');
					
					break;
				
				}
				
				tooltip.showing = true;
			
			}, 100);
		
		},
		
		hide: function() {
		
			var tooltip = this;
			
			clearTimeout(tooltip.delay);
			
			if(tooltip.showing) {
			
				switch(tooltip.options.arrowDirection) {
				
					case 'down':
					
						tooltip.parent.animate({ top: tooltip.postions.down.top - 12, opacity: 'hide' }, 120, 'easeOutQuad');
						
					break;
					
					case 'left':
					
						tooltip.parent.animate({ left: tooltip.postions.left.left - 12, opacity: 'hide' }, 120, 'easeOutQuad');
					
					break;
					
					case 'right':
					
						tooltip.parent.animate({ left: tooltip.postions.right.left - 12, opacity: 'hide' }, 120, 'easeOutQuad');
					
					break;
				
				}
			
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
 		
 			var tooltip = this;
 			
 			tooltip.parent.remove();
 		
		}
	
	});
	
})(jQuery);