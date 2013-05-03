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
	
	// Look through the children and match the most suitable width
	//	Display this one and hide all others
	//	(Find the smallest applicable width)
		var default_index = null;
		var most_suitable_index = null;
		var smallest_suitable_width = null;
		$sw_obj.children().each( function( index ) {
		
			var is_best_so_far = false;

		// Get the max width...
			var this_max_width = $( this ).attr( 'data-jqsw-max-width' );
			this_max_width = ( typeof this_max_width == 'undefined' )
				? null
				: this_max_width = Number( this_max_width.replace( /px$/, '' ) );	// remove 'px'
			
			if( this_max_width === null ) {
			
				default_index = index;
			} else if( sw_obj_width <= this_max_width ) {	// we have a width, is it suitable
				
				if( smallest_suitable_width === null || this_max_width < smallest_suitable_width ) {	// is it best so far?
				
					most_suitable_index = index;
					smallest_suitable_width = this_max_width;
				}
			}
		});

		var most_suitable_index = ( most_suitable_index !== null ) ? most_suitable_index : default_index;
		
		$sw_obj.children().each( function( index ) {
		
		// Show matching, hide others...
			if( index == most_suitable_index ) {
			
				$( this ).removeAttr( 'data-jqsw-hidden' );
			} else {	// find out if this one matches...
			
				$( this ).attr( 'data-jqsw-hidden', true );
			}
		});
	}
})( jQuery );