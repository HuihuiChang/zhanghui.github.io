import {
    getDateTime,
    getWeatherIcon
} from "./js/utils.js";

import AGGREGATION from './json/UCM/AGGREGATION.js';
import indexPage from './json/index.js';

import './js/m-resizable.js';

const globalData = {
    AGGREGATION,
    indexPage
};

export default {
    data() {
        return {
            // 用户名
            userName: 'admin',
            // 标题
            systemName: '',
            // 时间数据
            currentDate: {
                hour: '',
                minutes: '',
                seconds: '',
                time: '',
                day: '1999-1-1',
                week: '星期一'
            },
            // 天气数据
            weatherData: {
                temperature: '-℃',
                weather: '晴',
                sunrise: '05:53',
                sunset: '19:02',
                wind: '东风',
                PM10: 33,
                PM25: 23
            },
            // 刷新时间定时器
            headerDateTimer: null,
            // 全局数据
            globalData: globalData,
            // 当前页面数据
            currentData: {}
        }
    },
    created() {
        // let userName = sessionStorage.getItem('userName');
        // if (userName) {
        //     this.userName = userName;
        // } else {
        //     location.href = './login.html';
        // }
        this.initDatetime();
        this.getWeather();
    },
    methods: {
        /**
         * 设置当前页公共数据
         * @param {*} pageKey 
         */
        setCurrentPageData(pageKey) {
            if (!pageKey) return;
            const currentData = globalData[pageKey];
            const systemName = currentData.systemName;
            // 設置系統名稱
            document.querySelector('title').text = systemName;
            this.systemName = systemName;
            // 返回当前系统数据
            this.currentData = currentData;
            return currentData;
        },
        /**
         * 初始化日期时间
         */
        initDatetime() {
            this.headerDateTimer = setInterval(() => {
                let getDate = getDateTime();
                let time = getDate.currentTime;
                this.currentDate = {
                    hour: time.split(':')[0],
                    minutes: time.split(':')[1],
                    seconds: time.split(':')[2],
                    time: time,
                    day: getDate.currentDay,
                    week: getDate.currentWeek
                }
            }, 500);
        },
        /**
         * 请求服务获取天气数据
         */
        getWeather() {
            $.ajax({
                url: `http://36.152.211.194:18134/SSPS/cxf/rest/api/ssps/tianqi/map`,
                data: JSON.stringify({
                    url: "http://t.weather.itboy.net/api/weather/city/101190402"
                }),
                method: "POST",
                contentType: 'application/json',
                success: (res) => {
                    if (res.returnStr) {
                        let resData = JSON.parse(res.returnStr);
                        let currentData = resData.data.forecast[0];
                        if (currentData) {
                            this.weatherData = {
                                weather: currentData.type,
                                temperature: (resData.data.wendu || '-') + '℃',
                                sunrise: currentData.sunrise || '05:53',
                                sunset: currentData.sunset || '19:02',
                                wind: currentData.fx,
                                PM10: resData.data.pm10,
                                PM25: resData.data.pm25
                            };
                        }
                    }
                }
            });
        },
        /**
         * 获取天气图标
         */
        getWeatherIcon(weather) {
            let icon = getWeatherIcon(weather);
            return icon;
        },
        /**
         * 退出登录
         */
        handleLogout() {
            // 清除用户凭据
            // let pathName = window.location.pathname;
            // let lastIndex = pathName.lastIndexOf("pages");
            // let moduleName = null;
            // if (pathName.length > 6) {
            //     moduleName = pathName.slice(lastIndex + 6, lastIndex + 10);
            // }

            // let moduleUserName = sessionStorage.getItem(`${moduleName}_UserName`);
            // if (moduleUserName) {
            //     sessionStorage.removeItem(`${moduleName}_UserName`);
            // }
            // 返回聚合页
            window.location.href = `../../index.html`;
        },
        /**
         * 设置更新echarts
         * @param {*} id 
         * @param {*} option 
         */
        updateChartOption(id, option) {
            this.$nextTick(() => {
                let currentDom = this.$el.querySelector(`#${id}`);
                let myChart = echarts.getInstanceByDom(currentDom);
                if (!myChart) {
                    myChart = echarts.init(currentDom);
                }
                myChart.setOption(option);
            });
        }
    },
    beforeDestroy() {
        clearInterval(this.headerDateTimer);
    }
}