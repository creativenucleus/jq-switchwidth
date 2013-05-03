(function( $ ){

	var methods = {};

	
	methods.init = function( options ) {

		return this.each( function() {

			var $sw_obj = $( this );

			var data = $sw_obj.data( 'switchwidth' );
			if ( ! data ) {		// Plugin Initialisation

				$sw_obj.data( 'switchwidth', {
				
					last_update_width: null
				});
			}
			
		// Call for initial screensize...
			resize_cb( $sw_obj );
			
		// This event can fire multiple times even though the browser hasn't changed width - use a timeout trick...
			$( window ).on( 'resize', function() {
			
				resize_cb( $sw_obj );
			});
		});
	};

	
	methods.destroy = function() {

	// Unbind data...
		return this.each( function() {

			var $sw_obj = $( this ),
			data = $sw_obj.data( 'switchwidth' );

			$( window ).unbind( '.switchwidth' );
			data.switchwidth.remove();
			$sw_obj.removeData( 'switchwidth' );
		})
	};
		
	
// Bootstrap local objects
	$.fn.switchwidth = function( method ) {

		if( methods[ method ] ) {

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {

			return methods.init.apply( this, arguments );
		} else {

			$.error( 'Method ' +  method + ' does not exist on jQuery.switchwidth' );
		}    
	};
	
	
	var resize_cb = function( $sw_obj ) {
	
		var data = $sw_obj.data( 'switchwidth' );

		var sw_obj_width = $sw_obj.innerWidth();

	// Some browsers trigger the window.resize event multiple times for the same width, so we store the last width we updated to
	// and ignore the callback if we've already handled it
		if( data.last_update_width == sw_obj_width ) {

			return;
		}

		data.last_update_width = sw_obj_width;
	
	// Look through the children and match the first suitable width
	//	Display this one and hide all others...
		var found_suitable = false;
		$sw_obj.children().each( function( index ) {
		
			if( found_suitable ) {	// we've matched one, so hide this
			
				$( this ).attr( 'data-jqsw-hidden', true );
			} else {	// find out if this one matches...
			
				var max_width = $( this ).attr( 'data-jqsw-max-width' );
				if( typeof max_width == 'undefined' ) {		// no max-width, so we'll take it
				
					found_suitable = true;
				} else {
				
					max_width = max_width.replace( /px$/, '' );	// remove 'px'
					if( sw_obj_width <= Number( max_width ) ) {
					
						found_suitable = true;
					}
				}
				
				if( found_suitable ) {
				
					$( this ).removeAttr( 'data-jqsw-hidden' );
				} else {
				
					$( this ).attr( 'data-jqsw-hidden', true );
				}
			}
		});
	}
})( jQuery );