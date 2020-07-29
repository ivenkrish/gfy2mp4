tabs = []
urls = []

var button;

function close(tabs) {
	if(tabs.length > 0) {
		console.log("Close tabs called");
		for(i in tabs) {
			chrome.tabs.remove(tabs[i]);
		}
		button.style.display = "none";
	}
	else {
		console.log("Nothing to close");
	}
}

function download(urls) {
	if(urls.length > 0) {
		for(i in urls) {
			console.log(urls[i]);
			chrome.downloads.download({
				url: urls[i]
			});
		}
		window.document.getElementById("status").innerHTML='Download complete';
		button.style.display = "";
	}
	else {
		console.log("Nothing to download");
		window.document.getElementById("status").innerHTML='Nothing to download';
	}
}

chrome.windows.getAll({populate:true},function(windows){
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
				tabs.push(tab.id);
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
				tabs.push(tab.id);
			}
			else if(tab.url.includes('imgur.com') && tab.url.includes('gifv')) {
				link = tab.url.replace('gifv', 'mp4');
				urls.push(link);
				tabs.push(tab.id);
			}
		});
	});
	console.log("Calling Download");
	button = window.document.getElementById("btn");

	button.addEventListener("click", function(){
		console.log("Clicked Close Tabs");
		close(tabs);
	});

	download(urls);
});
