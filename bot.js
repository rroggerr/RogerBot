//  ---------- Housekeeping Stuff -------
window.onload = function(){
	checkCookie();
	document.getElementById("ask-wrapper").innerHTML="<div id=\"ask\" class=\"btn btn-block btn-success lilspace\" onclick=\"sendQuery()\">Ask</div>";
}
var appid="2945c1dd-184c-4661-ba56-9180c3c7258d";
var _0x2fdc=['\x3f\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x2d\x6b\x65\x79\x3d\x63\x32\x61\x37\x31\x35\x62\x35\x36\x33\x33\x31\x34\x38\x36\x36\x39\x30\x35\x30\x38\x62\x35\x66\x61\x65\x30\x62\x34\x33\x64\x62\x26\x76\x65\x72\x62\x6f\x73\x65\x3d\x74\x72\x75\x65\x26\x71\x3d','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x65\x73\x74\x75\x73\x2e\x61\x70\x69\x2e\x63\x6f\x67\x6e\x69\x74\x69\x76\x65\x2e\x6d\x69\x63\x72\x6f\x73\x6f\x66\x74\x2e\x63\x6f\x6d\x2f\x6c\x75\x69\x73\x2f\x76\x32\x2e\x30\x2f\x61\x70\x70\x73\x2f','\x63\x6f\x6e\x63\x61\x74'];(function(_0x114b2d,_0x2718d8){var _0x54206e=function(_0x6aae36){while(--_0x6aae36){_0x114b2d['\x70\x75\x73\x68'](_0x114b2d['\x73\x68\x69\x66\x74']());}};_0x54206e(++_0x2718d8);}(_0x2fdc,0xcd));var _0xc2fd=function(_0x5e8a4a,_0x14cc46){_0x5e8a4a=_0x5e8a4a-0x0;var _0x3d5d7f=_0x2fdc[_0x5e8a4a];return _0x3d5d7f;};var queryurl=_0xc2fd('0x0')[_0xc2fd('0x1')](appid)['\x63\x6f\x6e\x63\x61\x74'](_0xc2fd('0x2'));
var queryStr="";
var respText;
var callresponse;
var cookieName="__rbotuname"
var TSI;

// --- function that capitalizes first letter of a string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ---- Cookies stuff all here ---------
// Write cookie with the name of the person
function setCookie(uname) {
    var exdays=14; // 2 weeks expiry should do...
    Cookies.set(cookieName, uname, { expires: exdays });
}

function getCookie() {
	var uname = "";
	uname = Cookies.get(cookieName);
	return uname;
}

function checkCookie() {
	var uname=getCookie();
	if (uname != undefined) {
		uname = capitalize(uname);
		var respText="";
        	var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			if (index == 0){
				respText= "Welcome back ".concat(uname).concat("! What can I do for you today!");
			}
			else if (index == 1){
				respText= uname.concat("! You're back!! I thought you forgot about me!");
			}
			else if (index == 2){
				respText= "Hey ".concat(uname).concat("! Didn't think you were ever gonna come back!");
			}
		document.getElementById("responsebox").innerHTML=respText;
    	}
	
}

// ---- END Cookies stuff ends here ---------

//Checks if textbox is empty and if !empty: sends out query through ajaxCall(); 
function sendQuery(){
	var query = document.getElementById("querytext").value;
	if (query==""){
		respText=" ?? ¯\_(⊙︿⊙) ";
		document.getElementById("responsebox").innerHTML=respText;
	}
	else {
		document.getElementById("responsebox").innerHTML="Do do do do dooooo (Thinking)...";
		queryStr = queryurl.concat(query);
		var extraqn = queryStr.indexOf("??");
		if (extraqn != -1){
			queryStr=queryStr.slice(1,extraqn);
		}
		ajaxCall();
	// Do not include anything here OR ELSE synchronization issues
	}
}

function displayResponse(){
	var threshold =0.29;
	// Determines if the TSI (Top scoring intent) reaches our threshold of 0.29 for now.
	if (TSI.score<threshold || TSI.intent=="None"){
		respText="I dunno :("
	}
	else {
		respText = evaluateIntent();
	}
	document.getElementById("responsebox").innerHTML=respText;
}

// Ajax call
function ajaxCall(){
	var jsresp;
	$.ajax({
            dataType: "json",
            url: queryStr,
            success: function (json) {
            	callresponse=json;
            	TSI=json.topScoringIntent;
            	displayResponse();
            },
	    error: function(){
	    	document.getElementById("responsebox").innerHTML="Dieded... (x⸑x)";
	    }
        });
}

var _0x0ff7=['\x52\x6e\x4a\x70\x5a\x57\x35\x6b\x63\x32\x68\x70\x63\x43\x77\x67\x61\x48\x56\x6e\x5a\x32\x6c\x6c\x49\x53\x45\x67\x55\x45\x46\x55\x49\x46\x42\x42\x56\x43\x42\x51\x51\x56\x51\x3d','\x5a\x6d\x78\x76\x62\x33\x49\x3d','\x63\x6d\x46\x75\x5a\x47\x39\x74','\x53\x6b\x46\x4f\x53\x55\x5a\x42\x4c\x43\x42\x49\x64\x57\x64\x6e\x61\x57\x55\x68\x49\x53\x45\x3d','\x52\x32\x6c\x68\x62\x6e\x51\x67\x61\x48\x56\x6e\x5a\x32\x6c\x6c\x49\x53\x45\x3d'];(function(_0x57a10b,_0x35d7fa){var _0x69fd45=function(_0x564ccf){while(--_0x564ccf){_0x57a10b['\x70\x75\x73\x68'](_0x57a10b['\x73\x68\x69\x66\x74']());}};_0x69fd45(++_0x35d7fa);}(_0x0ff7,0x128));var _0x70ff=function(_0x3f6453,_0x5189bf){_0x3f6453=_0x3f6453-0x0;var _0x50e993=_0x0ff7[_0x3f6453];if(_0x70ff['\x69\x6e\x69\x74\x69\x61\x6c\x69\x7a\x65\x64']===undefined){(function(){var _0x399e36=Function('\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x20\x28\x29\x20'+'\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28\x29'+'\x29\x3b');var _0x51c3c0=_0x399e36();var _0xebc881='\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';_0x51c3c0['\x61\x74\x6f\x62']||(_0x51c3c0['\x61\x74\x6f\x62']=function(_0x5a1167){var _0x787873=String(_0x5a1167)['\x72\x65\x70\x6c\x61\x63\x65'](/=+$/,'');for(var _0x24684c=0x0,_0x35c078,_0x1bbec1,_0x216c12=0x0,_0x347e99='';_0x1bbec1=_0x787873['\x63\x68\x61\x72\x41\x74'](_0x216c12++);~_0x1bbec1&&(_0x35c078=_0x24684c%0x4?_0x35c078*0x40+_0x1bbec1:_0x1bbec1,_0x24684c++%0x4)?_0x347e99+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](0xff&_0x35c078>>(-0x2*_0x24684c&0x6)):0x0){_0x1bbec1=_0xebc881['\x69\x6e\x64\x65\x78\x4f\x66'](_0x1bbec1);}return _0x347e99;});}());_0x70ff['\x62\x61\x73\x65\x36\x34\x44\x65\x63\x6f\x64\x65\x55\x6e\x69\x63\x6f\x64\x65']=function(_0x29e8a9){var _0x877d38=atob(_0x29e8a9);var _0x165f76=[];for(var _0x56f026=0x0,_0x1841bf=_0x877d38['\x6c\x65\x6e\x67\x74\x68'];_0x56f026<_0x1841bf;_0x56f026++){_0x165f76+='\x25'+('\x30\x30'+_0x877d38['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x56f026)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x10))['\x73\x6c\x69\x63\x65'](-0x2);}return decodeURIComponent(_0x165f76);};_0x70ff['\x64\x61\x74\x61']={};_0x70ff['\x69\x6e\x69\x74\x69\x61\x6c\x69\x7a\x65\x64']=!![];}if(_0x70ff['\x64\x61\x74\x61'][_0x3f6453]===undefined){_0x50e993=_0x70ff['\x62\x61\x73\x65\x36\x34\x44\x65\x63\x6f\x64\x65\x55\x6e\x69\x63\x6f\x64\x65'](_0x50e993);_0x70ff['\x64\x61\x74\x61'][_0x3f6453]=_0x50e993;}else{_0x50e993=_0x70ff['\x64\x61\x74\x61'][_0x3f6453];}return _0x50e993;};function callSpecial(){var _0xb15c50=0x3;var _0x28f049=Math[_0x70ff('0x0')](Math[_0x70ff('0x1')]()*_0xb15c50);if(_0x28f049==0x0){return _0x70ff('0x2');}else if(_0x28f049==0x1){return _0x70ff('0x3');}else{return _0x70ff('0x4');}};

// Evaluate and generate response 
function evaluateIntent(){
	// Switches according to the first integers of an intent
	switch(parseInt(TSI.intent)){
		case 1: //complaint
			var numResponses =4;
			var index = Math.floor(Math.random()*numResponses);
			if(index ==0){
				return "Woah woah woah, I'm just the messenger here ok? I do what my code tells me to do!"
			}
			else if (index ==1) {
				return "You gotta problem with me? Email my boss! Click the email link above!"
			}
			else if (index ==2) {
				return "Hey! That's not a very nice thing to say!"
			}
			else if (index ==3){
				return "We have a strict no insult policy here! You have been banned from my website!"
			}
		case 2: //greeting
			var retval="";
			// Ughhh this is bad 
			if(Math.random()>=0.5){
				retval= "Hi, I'm the omniscient and omnipotent RogerBot! I act and talk just like Roger, in fact, people can't even tell the difference!";
			}
			else {
				retval= "Hello there sentient human being! I am RogerBot!";
			}
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="Names::Roger"){
					retval="Hello! I am not Roger, I am the upgraded replacement of Roger. You shall refer to me as Rogerbot!"
				}
			}
			return retval;
		case 3: //about rogerbot
			var retval="I am RogerBot, created by Roger. I try to understand your speech through machine learning algorithms provided by Microsoft LUIS. If you want to know more about me, click the link below!";
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="question::Age"){
					// calculate current age
					var age = Math.round(((new Date()).getTime()-1489467600000)/1000);
					retval= "I am currently ".concat(age).concat(" seconds old! You convert that into human time!");
				}
				else if (callresponse.entities[i].type=="question::Name") {
					retval= "The name's Bot, RogerBot!";
				}
				else if (callresponse.entities[i].type=="question::Birthday") {
					retval= "I was born around 1489467600 Epoch Units...";
				}
				else if (callresponse.entities[i].type=="question::Where") {
					retval= "I live in a server where all my neighbours are boring semiconductors!";
				}
				else if (callresponse.entities[i].type=="question::Alive") {
					retval= "I am deaded! Well, technically I was never alive to begin with!";
				}
				else if (callresponse.entities[i].type=="question::Purpose") {
					retval= 'My purpose? Thats easy! Let me show you a snippet of my core code:<br>replytoQuery(query);<br>eliminateHumanRace(; <br>SyntaxError: Unexpected token ( <br>';
				}
				else if (callresponse.entities[i].type=="question::Creator") {
					retval= 'I was created by Roger of course!';
				}
				// Entities override basic responses
				if (callresponse.entities[i].type=="question::School"){
					retval = "School? That's nonsense! I already know everything there is to know!";
				}
				else if (callresponse.entities[i].type=="question::Job"){
					retval="This is my job! Getting paid minimum wage to answer your stupid questions!";
				}
			}
			return retval;
		case 4: // About Roger
			var retval = "Roger's the guy who created me! Duh! Check out his details above!";
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="question::Age"){
					// calculate current age
					var age = Math.round(((new Date()).getTime()-751158000000)/1000/3600/24/365);
					retval= "Roger is currently ".concat(age).concat(" years old! I think that's in human time!");
				}
				else if (callresponse.entities[i].type=="question::Name") {
					retval= "You just said his name! Genius!";
				}
				else if (callresponse.entities[i].type=="question::Birthday") {
					retval= "Roger was born on October 21, 1993!";
				}
				else if (callresponse.entities[i].type=="question::Where") {
					retval= "Roger currently lives in the city of Beijing in China!";
				}
				else if (callresponse.entities[i].type=="question::Alive") {
					retval= "I think Roger is still alive! At least for the past 30 days. Because he needs to maintain me every 30 days!";
				}
				else if (callresponse.entities[i].type=="question::Creator") {
					retval= "He's not a host! He's not like one of us!";
				}
				// Entities override basic responses
				if (callresponse.entities[i].type=="question::School"){
					retval = "Roger finished his undergraduate degree at the University of Waterloo. Click on the 'W' Link above!";
				}
				else if (callresponse.entities[i].type=="question::Job"){
					retval="Roger is currently job searching at the moment! If you are hiring, please let me know (before Roger does), so I can quit my job of being this stupid robot...";
				}
			}
			return retval;
		case 5: //weather
			var retval = "It is 68 C with a chance of thermal paste right here in the server! We'll be expecting cooler temperatures at night when the usage is lower!";
			for (var i = 0; i < callresponse.entities.length; i++) {
				var capitalized = capitalize(callresponse.entities[i].entity);
				if (callresponse.entities[i].type!="builtin.geography.city"||callresponse.entities[i].type!="builtin.geography.country"){
					retval = capitalized.concat(" isn't a city you ignorant person!");
				}
				if (callresponse.entities[i].type=="builtin.geography.city"){
					var weatherlink = "https://www.wunderground.com/cgi-bin/findweather/getForecast?query=".concat(capitalized);
					var numResponses =2;
					var index = Math.floor(Math.random()*numResponses);
					if (index == 0){
						retval = "I'm too poor to afford these APIs so why don't I give u a nice weather ".concat(' <a href="').concat(weatherlink).concat('">link</a>!');
					}
					else if (index == 1){
						retval = 'Now do I look like Siri to you? Go find the weather for '.concat(capitalized).concat(' <a href="').concat(weatherlink).concat('">here</a>!');
					}
					
				}
				if (callresponse.entities[i].type=="builtin.datetime.date" && callresponse.entities[i].entity!='today'){
					retval = "Do I look like I have a time machine? Even if I did, I wouldn't be using it to check the weather!";
				}										       
			}
			return retval;
		case 6: // jokes
			var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			if (index == 0){
				return "Where is the worst place to play hide and seek in a hospital? In the I.C.U.!!! Geddit??? ICU!!! HAHAHAHA sorry...";
			}
			else if (index == 1){
				return "What kind of bagel can fly? A plane bagel!! AHAHAHAHA";
			}
			else if (index == 2){
				return "Why do trees seem suspicious on sunny days? Because they're shady! AHAHAHAHA!!!! I'll stop...."
			}
		case 7: //helpdoc
			var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			if (index == 0){
				return "Try asking anything! I'm still in my testing stage!";
			}
			else if (index == 1){
				return "Maybe you could try some Siri commands! Although I'm like TOTALLY better than her!";
			}
			else if (index == 2){
				return "Ask and you shall receive*! <br>    *May or may not receive";
			}
		case 8: //references
			var retval;
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="References::Westworld"){
					retval = "Doesn't look like anything to me...";
				}
				else if (callresponse.entities[i].type=="References::MeaningofLife"){
					retval = "The answer to that is 42 of course!";
				}
				else if (callresponse.entities[i].type=="References::Geese"){
					retval = "HONK HONK!! HISSSSS!!!!!!"	
				}
			}
			return retval;
		case 9: // nonsense
			var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			var retval="";
			if (index ==0) {
				retval= "I get that you like to talk in gibberish, but I can't understand you.";
			}
			else if (index ==1){
				retval= "Sure, that's great! Let me just translate that from nonsense to binary!";
			}
			else if (index ==2){
				retval= "Me no understand!"
			}
			return retval;	
		case 10: // about inquirer
			var uname=getCookie();
			uname = capitalize(uname);
			if (uname != undefined){
				var retval = "Well I know your name is ".concat(uname).concat(", but I don't know that much about you.");
			}
			else {
				var retval = "I don't know that much about you... Why don't you start by telling me what your name is?";	
			}
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="question::Name"){
					if (uname != undefined){
						retval = "Well, if I remember correctly, your name is ".concat(uname);
					}
					else {
						retval = "Why don't you start by telling me what your name is?";	
					}
				}
			}
			return retval;
		case 12: // Cookiewrite write user's name into cookies
			retval="I'm sorry, I didn't quite catch your name! Once again please?";
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="writeName"){
					setCookie(callresponse.entities[i].entity);
					var numResponses =3;
					var index = Math.floor(Math.random()*numResponses);
					if (index ==0) {
						retval= "Kay, but I'm bad at remembering names... ";
					}
					else if (index ==1){
						retval ="Your name? Of course! I'll try to remember it!";
					}
					else if(index==2){
						retval ="Okay! From now on I'll call you ".concat(capitalize(callresponse.entities[i].entity));
					}
				}
			}
			return retval;
		case 13:
			return callSpecial();
		default:
			return TSI.intent;
	}
}
