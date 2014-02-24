/*
    A function for displaying a tooltip on hover.
*/

var Tooltip = function () {
    var xOffset = 20,
        yOffset = 30;

    // the tooltip will be shown when an element with the 'jsTooltip' class is moused over
    $('body').on('mouseover', '.jsTooltip', function (e) {

        // check if the element has a title attr
        // save the title so it can be added back later
        if (this.title) {
            this.t = this.title;
            this.title = "";
        }

        $('#tooltipHover').html(this.t).fadeIn('fast');

        // if the element is on the right side of the screen
        // the tooltip will be displayed to the left of the element
        // otherwise, it will display to the right of the element
        if ((e.pageX + xOffset + $('#tooltipHover').width()) + 40 > $(window).width()) {
            $('#tooltipHover').css({ 'top': (e.pageY - yOffset) + "px", 'left': (e.pageX - $('#tooltipHover').width() - xOffset - 250) + 'px' });
        } else {
            $('#tooltipHover').css({ 'top': (e.pageY - yOffset) + "px", 'left': (e.pageX + xOffset) + 'px' });
        }
    });

    $('body').on('mouseout', '.jsTooltip', function () {

        // On mouseout, the tooltip will be hiddden
        // and the elements title will be added back
        this.title = this.t;
        $('#tooltipHover').html("");
        $('#tooltipHover').stop().hide();
    });

    $('body').on('mousemove', '.jsTooltip', function (e) {

        // a little eye candy
        // when the user moves their mouse, the tooltip will move with them
        if ((e.pageX + xOffset + $('#tooltipHover').width()) + 40 > $(window).width()) {
            $('#tooltipHover').css({ 'top': (e.pageY - yOffset) + 'px', 'left': (e.pageX - $('#tooltipHover').width() - xOffset - 20) + 'px' });
        } else {
            $('#tooltipHover').css({ 'top': (e.pageY - yOffset) + 'px', 'left': (e.pageX + xOffset) + 'px' });
        }
    });
};
