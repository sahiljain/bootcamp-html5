var currentNewsItems = null;
var lastRealEvent = null;
var spinnerVisible = false;

function onReady() {
	createSpinner();
	updateNewsItems();
	setInterval(updateNewsItems, 5000);
}

function updateNewsItems(){
	console.log("News Data being fetched...");
		getNewsData(function(data) {

		if(currentNewsItems === null){
			console.log("First Time being called after page load.");
			currentNewsItems = data;
			lastRealEvent = data[0];
			$(".btn-primary").show("slow");
			for(var index in data){
				$(".panel-container").append('<div class="panel panel-default"><div class="panel-heading">' + data[index].title + '</div><div class="panel-body"><a href="'+ data[index].link +'">Click here for details</a></div></div>');
			}
		}else if(lastRealEvent.id !== data[0].id){
			console.log("There's a new news item.");
			currentNewsItems.unshift(data[0]);
			lastRealEvent = data[0];
			drawNewNewsItem();
		}else{
			console.log("No new news items.");
			return;
		}
	});
}

function drawNewNewsItem(){
	$(".panel-container").prepend('<div class="panel panel-default" style="display:none"><div class="panel-heading">' + currentNewsItems[0].title + '</div><div class="panel-body"><a href="'+ currentNewsItems[0].link +'">Click here for details</a></div></div>');
	$(".panel-container div").first().show("slow");	
}

function getNewsData(done){
	$.get("https://api.uwaterloo.ca/v2/news.json?key=f37a2830b2b3e202ce41630ba994ba0d", function(data){
		destroySpinner();

		done(data.data);
	});
}

function simulateEvent() {
	currentNewsItems.unshift(currentNewsItems[Math.floor(Math.random()*100)]);
	drawNewNewsItem();
}

var createSpinner = function() {
	$("#spinner-container").html('<div id="circular3dG"><div id="circular3d_1G" class="circular3dG"></div><div id="circular3d_2G" class="circular3dG"></div><div id="circular3d_3G" class="circular3dG"></div><div id="circular3d_4G" class="circular3dG"></div><div id="circular3d_5G" class="circular3dG"></div><div id="circular3d_6G" class="circular3dG"></div><div id="circular3d_7G" class="circular3dG"></div><div id="circular3d_8G" class="circular3dG"></div></div>');
	spinnerVisible = true;
}

var destroySpinner = function(){
	$("#spinner-container").html('');
	spinnerVisible = false;
}
