function doElementImage(source){
	
	return '<img src="' + source + '" width="200" height="200" alt="small image" onmouseover="raiseImageSlow(this)" onmouseleave="originalSize(this)"/>';
}

function showImages(artistIems){
	
	var contents = "";
	
	var imgCount = 1;
	
	for(i = 0; i < artistIems.length; i++){
		for(j = 0; j < artistIems[i].images.length; j++){
			
			if(imgCount <= 20){
				
				var source = artistIems[i].images[j].url;
				
				contents += doElementImage(source);
				
				imgCount++;
			}
		}
	}
	
	$("#divResult").replaceWith('<div id="divResult">' + contents + '</div>');
}

function raiseImageSlow(img){
	
		$(img).animate(
			{
				width: "400px",
				height: "400px"
			},
			"slow"
		);
		
}

function originalSize(img){
	
		$(img).animate(
			{
				width: "200px",
				height: "200px"
			},
			"slow"
		);
	
}

function callArtistInfo(options){
	
	$.ajax(options)
	.done(function(response){
		showImages(response.artists.items);
		raiseImageSlow();
	})
	.fail(function(){
		alert("error");
	});
}

function getArtistInfo(){
	
	var name = $("#inputArtistName").val();
	
	var token = "your_token";
	
	var options = {
		url:"https://api.spotify.com/v1/search?q=" + name + "&type=artist",
		type: "GET",
		dataType: "JSON",
		headers: { "Authorization": 'Bearer ' + token }
	};
	
	callArtistInfo(options);
}