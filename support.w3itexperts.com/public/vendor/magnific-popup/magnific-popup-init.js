$(document).ready(function() {
	if($('.ticket-image-popup').length > 0)
	{
		$('.ticket-image-popup').magnificPopup({
			type: 'image',
			mainClass: 'mfp-with-zoom', 
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: false, 
				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	}
	
	if($('.ticket-video-popup').length > 0) 
	{
		$('.ticket-video-popup').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-with-zoom', 
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: false, 
				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}

		});
	}

});