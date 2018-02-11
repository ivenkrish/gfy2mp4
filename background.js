function download(urls) {
	if(urls.length > 0) {
		window.document.getElementById("status").innerHTML='Downloading...';
		for(i in urls) {
			console.log(urls[i]);
			chrome.downloads.download({
				url: urls[i]
			});
		}
		window.document.getElementById("status").innerHTML='Download complete';
	}
	else {
		console.log("No gfycat links open");
	}
}

chrome.windows.getAll({populate:true},function(windows){
	urls = []
	windows.forEach(function(window){
		window.tabs.forEach(function(tab){
			if(tab.url.includes('gfycat.com')) {
				name = tab.url.substring(tab.url.lastIndexOf("/") + 1);
				jsonendpoint = 'https://gfycat.com/cajax/get/' + name
				request = new XMLHttpRequest();
				request.open("GET", jsonendpoint, false);
				request.send(null);
				json = JSON.parse(request.responseText);
				link = json.gfyItem.mp4Url;
				urls.push(link);
			}
		});
	});
	download(urls);
});