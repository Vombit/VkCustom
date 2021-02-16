var vkccPopup = (function () {
    var values = {};
    var inpUrl = document.getElementsByClassName("input_url");
    var getLocalValues = function () {
        chrome.storage.local.get('stl', function (result) {
            var jsonValues = result['stl'];
            if (jsonValues) {
                values = JSON.parse(jsonValues);
                console.log(typeof values);
                if (typeof values == 'object') {
                    for (var key in values) {
                        if (!values.hasOwnProperty(key)) continue;
                        setInputValue(key, values[key]);
                    }
                }
            }
        });
    };
    var setInputValue = function (name, value) {
        var el = document.querySelector('#' + name),
            type = '';
        if(el !== null){
            type = el.getAttribute('type');
        }
        if (type == 'checkbox') {
            if (value == 'on')
                el.checked = true;
        } else if (type == 'range') {
            var elVal = document.querySelector('#' + name + '-output');
            elVal.textContent = value;
            el.value = value;
        } else {
            el.value = value;
        }
    };
    var setOption = function (name) {
        var type = document.querySelector('#' + name).getAttribute('type'),
            el = document.querySelector('#' + name);
        if (type != 'checkbox' || type == 'checkbox' && el.checked) {
            values[name] = el.value;
        } else {
            values[name] = 'off';
        }
    };
    var save_options = function () {
        for (i = 0; i < inpUrl.length; i++) {
            setOption(inpUrl[i].getAttribute('id'));
        }
        chrome.storage.local.set({'stl': JSON.stringify(values)});
        chrome.tabs.query({'url': '<all_urls>'}, function (tabs) {
            for (var i = 0; i < tabs.length; ++i) {
                chrome.tabs.executeScript(tabs[i].id, {file: "back.js"});
            }
        });
    };
    return {
        init: function () {
            getLocalValues();
            document.addEventListener('DOMContentLoaded', function () {
                for (i = 0; i < inpUrl.length; i++) {
                    inpUrl[i].addEventListener('change', save_options);
                }
                document.querySelector('#line').addEventListener('click', save_options);
            });
        }
    };
})();
vkccPopup.init();