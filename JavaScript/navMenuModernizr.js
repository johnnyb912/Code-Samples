if (Modernizr.touch) {
	var clicked = false;

	$(".navigation-menu li.nav-with-sub a").click(function (e) {

		// hide all sub nav ul elements
		$(".navigation-menu li.nav-with-sub > ul").css({ display: "none" });
		
		// if the clicked link has a sub nav ul and has not been clicked yet
		// show the sub nav menu
		if ($(this).siblings('ul').length  > 0 && !clicked) {
			e.preventDefault();
			$('ul:first', $(this).parent()).css({ display: "block" });
			clicked = true;
		}
	});
}
