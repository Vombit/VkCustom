var vkccContent = (function () {
    var onMessage = function (msg) {
        if (msg.type && (msg.type == "values")) {
            setCss(msg.values);
        }
    };
    var setCss = function (values) {
        var data = getNewCss(values);
        var css = document.getElementById("stl");
        if (css) {
            css.innerHTML = data;
        } else {
            css = document.createElement("style");
            css.setAttribute("type", "text/css");
            css.setAttribute("rel", "stylesheet");
            css.setAttribute("id", "stl");
            css.innerHTML = data;
            document.getElementsByTagName("head")[0].appendChild(css);
        }
    };
    var getNewCss = function (values) {
        var data;
        var background = "";
        if (values['background-image']) {
            background =
                "body{background-image: url('" + values['background-image'] + "') !important;" +
                "  background-attachment: fixed!important; background-size: cover!important; background-repeat: no-repeat!important;}";
        }
        data = background;
        return data;
    };
    return {
        init: function () {
            chrome.runtime.sendMessage({action: "get_values"});
            chrome.runtime.onMessage.addListener(onMessage);
        }
    };
})();
vkccContent.init();