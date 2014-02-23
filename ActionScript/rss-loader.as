// ***********************************************
// 	RSS Loader
//	This will load an rss feed and stylesheet, supplied below,
//	and parse through the feed and display it's content
// ***********************************************

// ***********************************************
// 	Load Style Sheet
// ***********************************************

var rss_css:TextField.StyleSheet = new TextField.StyleSheet();
rss_css.load("rssStyle.css");

// ************************************************
//		Load XML data
// ************************************************

var rss_xml:XML = new XML();
rss_xml.ignoreWhite = true;
rss_xml.onLoad = function(success:Boolean) {
	if (success) {
		processData(rss_xml);
	} else {
		trace("unable to load");
	}
};
rss_xml.load("http://feeds.feedburner.com/myrssfeed");

// ***********************************************
// 		Process Data
// ***********************************************

channel_title = "";
channel_desc = "";
channel_copyright = "";
channel_link = "";
channel_lang = "";

function processData(feed) {
	var rss = feed.firstChild.firstChild;
	item_txt.text = "";
	item_txt.html = true;	
	item_txt.styleSheet = rss_css;
	
	for (i = 0; i < rss.childNodes.length; i++) {
		if (rss.childNodes[i].nodeName == "title") {
			channel_title = rss.childNodes[i].firstChild.nodeValue;
		} else if (rss.childNodes[i].nodeName == "description") {
			channel_description = rss.childNodes[i].firstChild.nodeValue;
		} else if (rss.childNodes[i].nodeName == "copyright") {
			channel_copyright = rss.childNodes[i].firstChild.nodeValue;
		} else if (rss.childNodes[i].nodeName == "link") {			
			channel_link = rss.childNodes[i].firstChild.nodeValue;
		} else if (rss.childNodes[i].nodeName == "language") {
			channel_lang = rss.childNodes[i].firstChild.nodeValue;
		} else if (rss.childNodes[i].nodeName == "image") {
			var sTitle;
			var sLink;
			var sURL;
			
			txtLogo.html = true;
			txtLogo.htmlText = "";
			
			for (j = 0; j < rss.childNodes[i].childNodes.length; j++) {
				if (rss.childNodes[i].childNodes[j].nodeName == "title") {
					sTitle = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				} else if (rss.childNodes[i].childNodes[j].nodeName == "link") {
					sLink = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				} else if (rss.childNodes[i].childNodes[j].nodeName == "url") {
					sURL = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
		} else if (rss.childNodes[i].nodeName == "item") {
			var itemTitle;
			var itemDesc;
			var itemLink;
			var itemPic;
			
			for (j = 0; j < rss.childNodes[i].childNodes.length; j++) {
				if (rss.childNodes[i].childNodes[j].nodeName == "title") {
					itemTitle = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				} else if (rss.childNodes[i].childNodes[j].nodeName == "description") {
					itemDesc = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				} else if (rss.childNodes[i].childNodes[j].nodeName == "link") {
					itemLink = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
				else if (rss.childNodes[i].childNodes[j].nodeName == "content:encoded") {
					itemPic = rss.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
			item_txt.htmlText += "<a href=\"" + itemLink + "\"><span class=\"headline\">" + itemTitle + "</span></a><br>" + itemPic + "<br><span class=\"thread\">" + itemDesc + "</span><br><br>"
		}
		
	}
}