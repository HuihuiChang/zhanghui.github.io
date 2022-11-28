// vueHelper.prototype = {
//     url : "/demo-vue",
// 	getHtmlTemplate : function(childUrl){
//         var html = $.ajax({
//             url: url + childUrl,
//             async: false
//         }).responseText;

//         return html;
// 	}
// }

//帮助类
(function () {
    // 自定义的私有对象
    var _vuehelper = function () { };
    var url = "/components/";
    _vuehelper.prototype = {
        handlers: {},
        getHtmlTemplate: function (childUrl, baseUrl) {
            var myurl = baseUrl || url;
            var html = $.ajax({
                url: myurl + childUrl,
                async: false
            }).responseText;
            return html;
        },
        addCssByLink: function (url) {
            var doc = document;
            var link = doc.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", url);

            var heads = doc.getElementsByTagName("head");
            if (heads.length)
                heads[0].appendChild(link);
            else
                doc.documentElement.appendChild(link);
        },
        addCssByStyle: function (cssString) {
            var doc = document;
            var style = doc.createElement("style");
            style.setAttribute("type", "text/css");

            if (style.styleSheet) { // IE 
                style.styleSheet.cssText = cssString;
            } else { // w3c 
                var cssText = doc.createTextNode(cssString);
                style.appendChild(cssText);
            }

            var heads = doc.getElementsByTagName("head");
            if (heads.length)
                heads[0].appendChild(style);
            else
                doc.documentElement.appendChild(style);
        },
        dynamicLoadJsASync: function (url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            if (typeof (callback) == 'function') {
                script.onload = script.onreadystatechange = function () {
                    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                        callback();
                        script.onload = script.onreadystatechange = null;
                    }
                };
            }
            head.appendChild(script);
        },
        dynamicLoadJs: function (url) {
            $.ajax({
                url: url,
                async: false,
                dataType: "script",
                success: function () {
                    //ok
                }
            });
        },
        //以下是发布和订阅
        // 订阅事件
        on: function (eventType, handler) {
            var self = this;
            if (!(eventType in self.handlers)) {
                self.handlers[eventType] = [];
            }
            self.handlers[eventType].push(handler);
            return this;
        },
        // 触发事件(发布事件)
        emit: function (eventType) {
            var self = this;
            if (!self.handlers[eventType]) return self;
            var handlerArgs = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < self.handlers[eventType].length; i++) {
                self.handlers[eventType][i].apply(self, handlerArgs);
            }
            return self;
        },
        // 删除订阅事件
        off: function (eventType, handler) {
            var currentEvent = this.handlers[eventType];
            var len = 0;
            if (currentEvent) {
                len = currentEvent.length;
                for (var i = len - 1; i >= 0; i--) {
                    if (currentEvent[i] === handler) {
                        currentEvent.splice(i, 1);
                    }
                }
            }
            return this;
        },
    }
    window.vuehelper = new _vuehelper();
})();