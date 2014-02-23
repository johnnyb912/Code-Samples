$('.ccm-layout-row').each(function(index, el){

	// get the number of children in the row that are not of the ccm-spacer class
	var numChildren = $(el).children().not('.ccm-spacer').length,
		maxHeight = 0, myHeight = 0;

	// if there is more than one child
	// loop through the contentWrapper elements
	if (numChildren > 1) {

		// cache the element to use throughout the function
		var $content = $(el).find('.contentWrapper')

		$content.each(function(index, elem){

			// get each elements height
			myHeight = $(elem).height();

			// if the element height is greater than maxHeight
			// set maxHeight equal to the elements height
			if ( myHeight > maxHeight ) maxHeight = myHeight;
		});

		// loop through the content again and set each to the maxHeight
		$content.each(function(){
			$(this).height(maxHeight);
		});
	}
});
