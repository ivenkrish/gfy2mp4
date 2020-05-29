function download(urls) {
	if(urls.length > 0) {
		for(i in urls) {
			console.log(urls[i]);
			chrome.downloads.download({
				url: urls[i]
			});
		}
		window.document.getElementById("status").innerHTML='Download complete';
	}
	else {
		console.log("Nothing to download");
		window.document.getElementById("status").innerHTML='Nothing to download';
	}
}

chrome.windows.getAll({populate:true},function(windows){
	urls = []
	windows.forEach(function(window){
		window.tabs.forEach(function(tab){
			if(tab.url.includes('gfycat.com')) {
				name = tab.url.substring(tab.url.lastIndexOf("/") + 1);
				name = name.split('.')[0];
				name = name.split('-')[0];
				jsonendpoint = 'https://api.gfycat.com/v1/gfycats/' + name
				console.log(jsonendpoint);
				request = new XMLHttpRequest();
				request.open("GET", jsonendpoint, false);
				request.send(null);
				json = JSON.parse(request.responseText);
				link = json.gfyItem.mp4Url;
				urls.push(link);
			}
			else if (tab.url.includes('redgifs.com')) {
				name = tab.url.substring(tab.url.lastIndexOf("/") + 1);
				name = name.split('.')[0];
				name = name.split('-')[0];
				jsonendpoint = 'https://api.redgifs.com/v1/gfycats/' + name
				console.log(jsonendpoint);
				request = new XMLHttpRequest();
				request.open("GET", jsonendpoint, false);
				request.send(null);
				json = JSON.parse(request.responseText);
				link = json.gfyItem.mp4Url;
				urls.push(link);
			}
			else if(tab.url.includes('imgur.com') && tab.url.includes('gifv')) {
				link = tab.url.replace('gifv', 'mp4');
				urls.push(link);
			}
		});
	});
	console.log("calling download");
	download(urls);
});
