var vkccBackground = (function () {
	var oParams = {};
	var regex = {
		url:/^https?:\/\/(?:[^\.]+\.)?vk\.com/,
		user:/^https?:\/\/(?:[^\.]+\.)?vk\.com\/(.*)/,
		complex: /[A-Za-z]+(-?\d+)(_\d+)?/
	};
	 var onMessage = function(request, sender, sendResponse){
         getValues(sender.tab);
	 };
	var sendMessage = function(tabId, params){
        chrome.tabs.sendMessage(tabId, params);
	};
	var getLocalValues = function (tabId, key) {
		chrome.storage.local.get(key, function(result){
			oParams.values = {};
			if(key in result)
				oParams.values = JSON.parse(result[key]);
			oParams.type = 'values';

			sendMessage(tabId, oParams);
		});
	};
	var getValues = function (tab) {
		if (regex.url.test(tab.url)) {
			var uid = regex.user.exec(tab.url)[1];
			if (regex.complex.test(uid)) {
				uid = regex.complex.exec(uid)[1];
			}
			oParams.userId = uid;
			getLocalValues(tab.id, "stl");
		}
	};
	return {
		init: function (){
			chrome.runtime.onMessage.addListener(onMessage); //auto change
		}
	};
})();
vkccBackground.init();