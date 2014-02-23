var getScreenDimensions = function (d) {
    var iH, iW, screenDimensions = {};

    if (window.innerHeight) {
        // for most modern browsers
        iH = window.innerHeight;
        iW = window.innerWidth;
    } else {
        // for IE 8
        iH = document.documentElement.clientHeight;
        iW = document.documentElement.clientWidth;
    }

    // add the width and height to the object
    screenDimensions.width = iW;
    screenDimensions.height = iH;

    // if a param is specified, return just the dimension requested
    if (d) {
        if (d.toLowerCase() === "width" || d.toLowerCase() === "w") {
            return iW;
        } else if (d.toLowerCase() === "height" || d.toLowerCase() === "h") {
            return iH;
        } else {
            // if the requested param doesn't match the pattern, return the complete object
            screenDimensions = { "width": iW, "height": iH };
            return screenDimensions;
        }
    } else {
        // no param, return the object
        return screenDimensions;
    }
};
