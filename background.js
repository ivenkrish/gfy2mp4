chrome.browserAction.onClicked.addListener(function(tab) {
	var flag = false;
	chrome.windows.getCurrent({populate:true},function(window){
		window.tabs.forEach(function(tab){
			if(tab.url.includes('gfycat.com')) {
				var flag = true;
				name = tab.url.substring(tab.url.lastIndexOf("/") + 1);
				jsonendpoint = 'https://gfycat.com/cajax/get/' + name
				request = new XMLHttpRequest();
				request.open("GET", jsonendpoint, false); // false for synchronous request
				request.send(null);
				json = JSON.parse(request.responseText);
				link = json.gfyItem.mp4Url;
				console.log(link);
				chrome.downloads.download({
					url: link
				});
			}
		});
	});
});