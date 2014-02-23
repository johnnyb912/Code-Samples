// ***********************************************
// 	Music Player
//	This will load a playlist of songs
//	and play them in a random order
//	The artist and track info is displayed
//	along with play/pause and next buttons
// ***********************************************

// Setup sound object
var s:Sound = new Sound();
s.onSoundComplete = playSong;

// Array of songs
var sa:Array = new Array();

// Currently playing song
var cps:Number = -1;

// Position of music
var pos:Number;

// Load the songs XML
var xml:XML = new XML();
xml.ignoreWhite = true;
xml.onLoad = function() {
	var nodes:Array = this.firstChild.childNodes;
	for(var i=0;i<nodes.length;i++) {
		sa.push(new Song(nodes[i].attributes.url, nodes[i].attributes.artist, nodes[i].attributes.track));
	}
	playSong();
}

xml.load("songs.xml");

// Play the MP3 File
function playSong():Void {
	i = sa.length;
	k = Math.floor(Math.random()*i);
	s.loadSound(sa[k].earl, true);
	trackInfo.text = sa[k].artist + " - " + sa[k].track;
	playPause.gotoAndStop("pause");
	textPos = 0;
}

// Pauses the music
function pauseIt():Void {
	pos = s.position;
	s.stop();
}

// Unpauses the music
function unPauseIt():Void {
	s.start(pos/1000);
}

// Music Controls

// Play/Pause Toggle
playPause.onRollOver = function() {
	if(this._currentframe == 1) this.gotoAndStop("pauseOver");
	else this.gotoAndStop("playOver");
}

playPause.onRollOut = playPause.onReleaseOutside = function() {
	if(this._currentframe == 10) this.gotoAndStop("pause");
	else this.gotoAndStop("play");
}

playPause.onRelease = function() {
	if(this._currentframe == 10) {
		this.gotoAndStop("playOver");
		this._parent.pauseIt();
		nextbtn.gotoAndStop("nextNone");
	} else {
		this.gotoAndStop("pauseOver");
		this._parent.unPauseIt();
		nextbtn.gotoAndStop("next");
	}
}

// Next Button

nextbtn.onRollOver = function() {
	this.gotoAndStop("nextOver");
}

nextbtn.onRollOut = nextbtn.onReleaseOutside = function() {
	this.gotoAndStop("next");
}

nextbtn.onRelease = function() {
	this._parent.playSong();
}

/* 
	Text scroller
	The window to show the artist and track info is very short
	so we want the info to scroll back and forth within the window
*/

var size:Number = 22;
var textPos:Number = 0;
var intervalID:Number = setInterval(scrollForward, 500);

function scrollForward():Void {
	var t:String = (sa[k].artist + " - " + sa[k].track);
	if(textPos+size < t.length) {
		textPos++;
		trackInfo.text = (sa[k].artist + " - " + sa[k].track).substring(textPos, textPos+size);
	} else {
		clearInterval(intervalID);
		intervalID = setInterval(scrollBack, 500);
	}
}

function scrollBack():Void {
	var t:String = (sa[k].artist + " - " + sa[k].track);
	if(textPos > 0) {
		textPos--;
		trackInfo.text = (sa[k].artist + " - " + sa[k].track).substring(textPos, textPos+size);
	} else {
		clearInterval(intervalID);
		intervalID = setInterval(scrollForward, 500);
	}
}
