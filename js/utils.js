// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 获取当前时间日期包含（currentTime，currentWeek，currentDay）
 */
export const getDateTime = () => {
    let currentTime = '';
    let currentWeek = '';
    let currentDay = '';
    let weekArr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

    let currentDate = new Date();
    // 1.设置星期
    currentWeek = weekArr[currentDate.getDay()];

    currentDate = formatWithSeperator(currentDate);
    let dateArr = currentDate.split(' ');
    // 2.设置日期
    currentDay = dateArr[0];
    // 3.设置时间
    currentTime = dateArr[1];

    return {
        currentTime,
        currentWeek,
        currentDay
    }
}

/**
 * 获取几分钟前的时间
 * @param {*} min 
 * @returns 
 */
 export const getLastTime = (min) => {
    let time = (new Date).getTime() - min * 60 * 1000;
    return new Date(time).Format("yyyy-MM-dd HH:mm:ss");
};

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export const formatWithSeperator = (datetime, dateSeprator = '-', timeSeprator = ':') => {
    if (datetime != null) {
        const dateMat = new Date(datetime);
        const year = dateMat.getFullYear();
        const month = ("0" + (dateMat.getMonth() + 1)).slice(-2);
        const day = ("0" + dateMat.getDate()).slice(-2);
        const hh = ("0" + dateMat.getHours()).slice(-2);
        const mm = ("0" + dateMat.getMinutes()).slice(-2);
        const ss = ("0" + dateMat.getSeconds()).slice(-2);
        const timeFormat = year + dateSeprator + month + dateSeprator + day + " " + hh + timeSeprator + mm + timeSeprator + ss;
        return timeFormat;
    }
};

/**
 * 获取天气对应的图标地址
 * @param {*} weatherName 
 */
export const getWeatherIcon = (weatherName) => {
    let weatherIconArr = [
        '暴雪', '暴雨', '大暴雨', '大雪', '大雨', '冬雨', '多云', '浮尘', '雷阵雨',
        '雷阵雨伴有冰雹', '霾', '强沙尘暴', '晴', '沙尘暴', '特大暴雨', '雾', '小雪',
        '雨', '扬沙', '阴', '雨夹雪', '阵雪', '阵雨', '中雪', '中雨'
    ];
    if (!weatherIconArr.includes(weatherName)) {
        weatherName = '晴';
        weatherIconArr.forEach((item) => {
            if (item.includes(weatherName) || weatherName.indexOf(item)) {
                weatherName = item;
            }
        });
    }
    return `./images/weather-icon/${weatherName}.png`;
};

/**
 * 切换全屏控制
 */
export const toggleFullScreen = (callback = () => {}) => {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        callback(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        callback(false);
    }
};

/**
 * 设置更新echarts
 * @param {*} id 
 * @param {*} option 
 */
export const updateChartOption = (id, option) => {
    let currentDom = this.$el.querySelector(`#${id}`);
    let myChart = echarts.getInstanceByDom(currentDom);
    if (!myChart) {
        myChart = echarts.init(currentDom);
    }
    myChart.setOption(option);
    return myChart;
};

/**
 * 判断是否为空
 * @param {*} val 
 */
export const isEmpty = (val) => {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
        // String or Array
        case '[object String]':
        case '[object Array]':
            return !val.length;

            // Map or Set or File
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size;
        }
        // Plain Object
        case '[object Object]': {
            return !Object.keys(val).length;
        }
    }

    return false;
};

/**
 * 防抖处理
 * 
 * @param {*} fn 
 * @param {*} delay 
 */
let timer = null;
export const debounce = (fn, delay) => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
}

/**
 * 节流处理
 * @param {*} fn 
 * @param {*} delay 
 */
export const throttle = (fn, delay) => {
    let finished = true;
    return function () {
        if (!finished) {
            return false;
        }
        finished = false;
        setTimeout(() => {
            fn();
            finished = true;
        }, delay);
    }
}

export const formatDate = (datetime, dateSeprator) => {
    if (datetime != null && datetime != "" && datetime != undefined) {
        dateSeprator = dateSeprator == null ? "-" : dateSeprator;
        const dateMat = new Date(datetime);
        const year = dateMat.getFullYear();
        const month = ("0" + (dateMat.getMonth() + 1)).slice(-2);
        const day = ("0" + dateMat.getDate()).slice(-2);
        const timeFormat = year + dateSeprator + month + dateSeprator + day;
        return timeFormat;
    } else {
        return null;
    }
}

export const getDates = (num, date = new Date() ) => {
    if(num == '' || num == null || num == undefined){
        num = 0
    }
    //JS获取当前周从星期一到星期天的日期
    var currentDate = new Date(date.getTime() + num*24*60*60*1000*7)
    var timesStamp = currentDate.getTime();
    var currenDay = currentDate.getDay();
    var dates = [];
    for (var i = 0; i < 7; i++) {
        dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(
            /\//g, '-'));
    }
    return dates
}

export const postService = (url, data, callback = function () {}, async = true) => {
    originalPostService(window.SERVERIP + url, data, callback, async);
}

export const originalPostService = (url, data, callback = function () {}, async = true) => {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        async,
        data: JSON.stringify(data),
        success: (res) => {
            callback(res);
        }
    });
}

export const on = function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
}();

export const off = function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
}();