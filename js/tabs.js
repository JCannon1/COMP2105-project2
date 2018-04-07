// Tab Panels
$(document).ready(function(){
	// grab all container panel DIVs
	var tabContainers = $('div.tabs > div');
	// hide them all, then show the first one
	tabContainers.hide().filter(':first').show();
	// set the first tab to class="selected"
	$('div.tabs ul.tabNavigation a:first').addClass('selected');
	// add onclick handlers to all tabs
	$('div.tabs ul.tabNavigation a').click(function(){
		// hide all tabContainers
		tabContainers.hide();
		// show only the tabContainer with the ID that matches the href for the A that was clicked
		//alert(this.hash);
		tabContainers.filter(this.hash).show();
		// remove class="selected" from all tabs
		$('div.tabs ul.tabNavigation a').removeClass('selected');
		// set class="selected" on the tab that was just clicked
		$(this).addClass('selected');
		// stop following links
		return false;
	});
});

// My custom JS
// jQuery effect when button is clicked to move the content down
$("button").click(function(){
    $("h1").animate({
        left: '250px',
        opacity: '0.5',
        height: '150px',
        width: '150px'
    });
}); 
// Button click changes the background colour from grey to white
function backgroundColor(color) {
    document.body.style.background = color;
 }



//  Greensock JS from https://greensock.com/timelinelite
var head = $("h1"),
      content = $("#content"),
    subhead = $("h2"),
    feature = $("#feature"),
    description = $("#description"),
    icons = $("#nav img");
 
TweenLite.set(content, {visibility:"visible"})

//instantiate a TimelineLite    
var tl = new TimelineLite();

//add a from() tween at the beginning of the timline
tl.from(head, 0.5, {left:100, opacity:0});

//add another tween immediately after
tl.from(subhead, 0.5, {left:-100, opacity:0});

//use position parameter "+=0.5" to schedule next tween 0.5 seconds after previous tweens end
tl.from(feature, 0.5, {scale:.5, autoAlpha:0}, "+=0.5");

//use position parameter "-=0.5" to schedule next tween 0.25 seconds before previous tweens end.
//great for overlapping
tl.from(description, 0.5, {left:100, autoAlpha:0}, "-=0.25");

//add a label 0.5 seconds later to mark the placement of the next tween
tl.add("stagger", "+=0.5")
//to jump to this label use: tl.play("stagger");

//stagger the animation of all icons with 0.1s between each tween's start time
//this tween is added
tl.staggerFrom(icons, 0.2, {scale:0, autoAlpha:0}, 0.1, "stagger");

/* --- Control playback methods --- */



$("#play").click(function() {
        tl.play();
});
        
$("#pause").click(function() {
        tl.pause();
});
        
$("#reverse").click(function() {
        tl.reverse();
});
        
$("#resume").click(function() {
        tl.resume();    
});

$("#stagger").click(function() {
        tl.play("stagger"); 
});
        
$("#restart").click(function() {
        tl.restart();
});

//when the timeline updates, call the updateSlider function
tl.eventCallback("onUpdate", updateSlider);
    
$("#slider").slider({
  range: false,
  min: 0,
  max: 100,
  step:.1,
  slide: function ( event, ui ) {
    tl.pause();
    //adjust the timeline's progress() based on slider value
    tl.progress( ui.value/100 );
    }
}); 
        
function updateSlider() {
  $("#slider").slider("value", tl.progress() *100);
}   

tl.progress(1)
