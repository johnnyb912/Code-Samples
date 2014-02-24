/*
    This is a function used to set the height on an element 
    or elements in a jQuery UI dialog.
    It takes 3 parameters:
    container: the parent element to base the height on (required)
    extra: an additional amount to remove from the containers height (optional)
    cssHeight: the CSS property to set the height to (optional)
*/

var fixHeightOverflow = function (container, extra, cssHeight) {

    // if either optional param are not passed in, set them to a default value
    extra = extra === undefined ? 0 : extra;
    cssHeight = cssHeight === undefined ? 'height' : cssHeight;

    var h = $(container).height() - $(container).find('.wizardTabs').height() - extra;

    // create a styles object to hold the css to apply
    var styles = {};
    styles[cssHeight] = h + 'px';
    styles['overflow'] = 'auto';
    
    // find the elements that need the fix and apply the styles to them
    $(container).find('.fixHeightOverflow').css( styles );
};
