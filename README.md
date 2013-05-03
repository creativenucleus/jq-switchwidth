# jquery-switchwidth

## Purpose

To allow an HTML DOM object to switch between different content depending on its width- essentially, the popular use of media queries, but for individual objects.

### More detail

I've been developing responsive designs.

[Media Queries](http://www.w3.org/TR/css3-mediaqueries/) allow you to alter the content depending on the device width, which means you can develop a site that displays well on desktop, tablet and phone formats with one HTML template.

Sometimes this isn't flexible enough - sometimes you need to alter the content of a particular section of your site depending on the width of the containing object- this isn't possible with media queries. They're only concerned with the width of the browser window.

As a use case, perhaps you have a search widget with tabs at the top. On desktop this looks fine, but on mobile this scrunches up too far, or (worse) spreads over two lines [this happens with jQuery-ui], and you'd prefer that to be replaced with something more usable or attractive.

## Release Log

1.0RC1 - First version; looks like it works, but untested. Feedback please!

## Dependencies

[jQuery](http://jquery.com/) (should work with most versions)

## Implementation

You should include:
- ~lib/jquery-switchwidth.css in the style section of your page.
- [jQuery](http://jquery.com/) (from your server, or CDN)
- ~lib/jquery-switchwidth.js (must be included *after* jQuery)

The HTML to switch should take the form:

	<div id="switchwidth-example">
		<div>
			Largest
		</div>
		<div data-jqsw-hidden data-jqsw-max-width="799px">
			Less than 800px
		</div>
		<div data-jqsw-hidden data-jqsw-max-width="399px">
			Less than 400px
		</div>
	</div>

The object will switch between its immediate children.
These can be set up in any order, but there should be one default (i.e. without data-jqsw-max-width)

Switchwidth should be applied in a code block, within a jQuery $( document ).ready() declaration. This code should also be added *after* the jQuery include.

	<script>
		$( document ).ready( function() {
			
			$( '#switchwidth-example' ).switchwidth();
		});
	</script>

...and that should be it!

If you use it, please consider improving it. Also drop me a [Tweet](http://twitter.com/creativenucleus)!

## License

[The MIT License (MIT)](http://opensource.org/licenses/mit-license.php)

Copyright (c) 2013 James Rutherford / creativenucleus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Contact

http://twitter.com/creativenucleus