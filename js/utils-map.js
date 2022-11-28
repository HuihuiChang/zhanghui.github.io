/**
 * 设置区域背景
 */
 export const setAreaBackground = (mapAreaArr = [], fillColor) => {
    let polygon = new BMap.Polygon(mapAreaArr, {
        strokeColor: 'rgb(9, 229, 215)',
        strokeWeight: 1,
        strokeOpacity: 0.2,
        fillColor: fillColor || 'rgba(9, 229, 215, .08)',
        enableClicking: false
    }); //创建多边形
    return polygon;
}

/**
 * 设置车牌
 * @param {*} point 
 * @param {*} carId 
 */
export const setCarNumber = (point, carId) => {
    let imgWidth = 72,
        imgHeight = 24;
    let icon = new BMap.Icon("./images/index/opacity-bg.png", new BMap.Size(imgWidth, imgHeight), {
        anchor: new BMap.Size(36, 35)
    });

    let marker = new BMap.Marker(point, {
        icon
    });

    let label = new BMap.Label(carId);
    label.setStyle({
        textAlign: 'center',
        fontFamily: 'customFont',
        color: "#fff",
        transform: `translate(calc(-50% + 36px), 0)`,
        fontSize: "14px",
        background: "url('./images/index/marker-bg.png') no-repeat center",
        backgroundSize: `100% ${imgHeight}px`,
        width: `auto`,
        minWidth: `${imgWidth}px`,
        padding: '0 10px',
        border: 'none',
        letterSpacing: '1px',
        lineHeight: `${imgHeight - 4}px`,
        boxShadow: '0 -2px 5px rgba(0,0,0,.2)'
    });

    marker.setLabel(label);
    marker.setZIndex(11);
    return marker;
}

/**
 * 设置公厕牌子
 * @param {*} point 
 * @param {*} carId 
 */
export const setGCNumber = (point, carId) => {
    return setCarNumber(point, carId);
}
/**
 * 获取车辆信息
 * @param {*} iconname 
 * @param {*} state 
 */
export const getImgUrl = (iconname = "/static/Isimages/vehicle/1.png", state) => {
    let url = "";
    let fx = 1;
    let cartype = iconname.split('/');
    let length = cartype.length;
    let lastcartype = cartype[length - 1];
    let type = lastcartype.split('.')[0];
    let zt = "";
    if (state == '0') {
        zt = "offline";
    } else if (state == '1') {
        zt = "online";
    } else if (state == '2') {
        zt = "warning";
    } else if (state == '3') {
        zt = "stop";
    }
    for (let i = 0; i < length - 1; i++) {
        url = url + cartype[i] + "/";
    }
    url = url + zt + "/" + type + fx + ".png";

    return url;
}

/**
 * 设置车点位
 * @param {*} point 
 * @param {*} carId 
 */
export const setCarPoint = (point, options = {}) => {
    const {
        carIcon = './images/car.png', iconWidth = 38, iconHeight = 38, rotation
    } = options;

    let icon = new BMap.Icon(carIcon, new BMap.Size(iconWidth, iconHeight), {
        anchor: new BMap.Size((iconWidth / 2), (iconHeight / 2))
    });

    let marker = new BMap.Marker(point, {
        icon,
        rotation
    });

    marker.setZIndex(10);
    return marker;
}

/**
 * 车辆信息地图点
 */
let carMarker = null;
let carMks = null;
export const setUserInfoMarker = (point, options = {}) => {
    let map = options.map;
    let carId = options.carId;
    let iconname = options.iconname;
    let state = options.state || '1';
    let iconName = getImgUrl(iconname, state);

    let copyCarMks = Object.assign(carMks || {}, {});

    carMks = setCarPoint(point, {
        carIcon: iconName ? window.SERVER + iconName : '',
        iconWidth: 38,
        iconHeight: 38,
        rotation: 0
    });

    let copyCarMarker = Object.assign(carMarker || {}, {});

    carMarker = setCarNumber(point, carId, map);

    map.addOverlay(carMarker);
    map.removeOverlay(copyCarMarker);

    map.addOverlay(carMks);
    map.removeOverlay(copyCarMks);

    return [carMarker, carMks];
}
/**
 * 车辆信息地图点
 */
let selectMark = null;
export const setMarkerSelectBg = (point, clear = false, type) => {
    selectMark && map.removeOverlay(selectMark);
    if (clear) return;
    if (type == "V") {
        var carIcon = './images/sanitation/carpointFlag.png';
        var anchor = new BMap.Size(20, 20);

    } else if (type == "I") {
        var anchor = new BMap.Size(22, 0);
        var carIcon = './images/sanitation/pointFlag.png';
    } else {
        var anchor = new BMap.Size(26, 40);
        var carIcon = './images/sanitation/mark-select.png';
    }
    let icon = new BMap.Icon(carIcon, new BMap.Size(52, 56), {
        anchor: anchor
    });

    if (type == "I") {
        anchor = new BMap.Size(25, 15);
        carIcon = './images/sanitation/pointFlag2.png';
        icon = new BMap.Icon(carIcon, new BMap.Size(50, 36), {
            anchor: anchor
        });
    }

    selectMark = new BMap.Marker(point, {
        icon,
    });
    selectMark.setZIndex(1);
    map.addOverlay(selectMark);
    return selectMark;
}

/**
 * 轨迹回放专用
 */
const focusZomm = 15;
const defaultSpeed = 300;
let locusTimer = null;
let locusCallbackFun = () => {};
let locusMarks = [];
export const locusObj = {
    // 控制车在中心
    centerCar: false,
    // 轨迹曲线
    polyline: null,
    markerStart: null,
    markerEnd: null,
    markerPark: null,
    markerParkList: [],
    // 地图点集合
    points: [],
    localPath: [],
    // 停止标记
    start: false,
    // 加速度 
    speed: 300,
    // 车量标记对象
    markArr: [],
    /**
     * 聚焦车辆点为中心点
     * @param {*} flag 是否聚焦标记位
     */
    focusCar: function (flag = true) {
        this.centerCar = flag;
    },
    /**
     * 播放
     */
    play: function () {
        this.start = true;
        this.resetMkPoint(this.process);
    },
    /**
     * 暂停
     */
    stop: function () {
        this.start = false;
    },
    /**
     * 重置
     */
    reset: function () {
        clearTimeout(locusTimer);
        this.start = false;
        this.process = 0;
        let point = this.points[this.process];
        if (point) {
            this.markArr[0].setPosition(point);
            this.markArr[1].setPosition(point);
            this.markArr[1].setRotation(this.localPath[this.process].HX || 0);
            if (this.centerCar) {
                map.centerAndZoom(point, focusZomm);
            }
        }
        locusCallbackFun(0);
    },
    /**
     * 跳到指定位置
     * @param {*} i 低n个点
     */
    setProcess: function (i = 0) {
        clearTimeout(locusTimer);
        this.process = i;
        let point = this.points[i];
        this.markArr[0].setPosition(point);
        this.markArr[1].setPosition(point);
        this.markArr[1].setRotation(this.localPath[i].HX || 0);
        locusCallbackFun(i);
        if (this.start) {
            this.play();
        }
    },
    /**
     * 设置加速度  以300 为1x 做基础
     * @param { Number } speed 加速度倍数
     */
    setSpeed: function (speed = 1) {
        this.speed = defaultSpeed / speed;
    },
    /**
     * 清空轨迹
     */
    clearLocus: function () {
        locusMarks.forEach(mark => map.removeOverlay(mark));
    },

    /**
     * 轨迹回放构建车辆、道路、起始点、终点、停车点
     * @param { Array } points 转化后的地图点
     * @param { Object } options 基础配置：其中必填变量 -> carId(车牌)，localPath(原始数据，对应points存有方向HX 即可)，map(百度地图)
     * @param { Function } callback 轨迹运动回调
     */
    locusPlay: function (points = [], options = {}, callback, pointFlag = true) {
        locusMarks.splice(0);
        let {
            strokeColor = '#04e5e7', strokeWeight = 2, strokeOpacity = 0.5, pkLimit = 300, carId, localPath, map
        } = options;

        carId = carId || localPath[0].VEHICLENO;
        locusCallbackFun = callback;
        this.points = points;
        this.localPath = localPath;

        // 1. 轨迹路线
        let copyPolyline = Object.assign(this.polyline || {}, {});

        this.polyline = new BMap.Polyline(points, {
            strokeColor,
            strokeWeight: 2,
            strokeOpacity
        });
        map.addOverlay(this.polyline);
        map.removeOverlay(copyPolyline);

        locusMarks.push(this.polyline);

        // 2. 设置起点
        let copyMarkerStart = Object.assign(this.markerStart || {}, {});

        let startIcon = new BMap.Icon("./images/startpoint.png", new BMap.Size(25, 37), {
            anchor: new BMap.Size(12.5, 33)
        });
        this.markerStart = new BMap.Marker(points[0], {
            icon: startIcon
        });
        map.addOverlay(this.markerStart);
        map.removeOverlay(copyMarkerStart);

        locusMarks.push(this.markerStart);
        // 3. 设置终点
        let copyMarkerEnd = Object.assign(this.markerEnd || {}, {});

        let endIcon = new BMap.Icon("./images/endpoint.png", new BMap.Size(25, 33), {
            anchor: new BMap.Size(12.5, 37)
        });
        this.markerEnd = new BMap.Marker(points[points.length - 1], {
            icon: endIcon
        });
        map.addOverlay(this.markerEnd);
        map.removeOverlay(copyMarkerEnd);

        locusMarks.push(this.markerEnd);
        // 4. 设置停车点
        if (pointFlag) {
            let copyMarkerPark = this.markerParkList.slice(0);

            let pkShow = false;
            this.markerParkList = [];

            localPath.forEach((item, parkIndex) => {
                if (item.PK >= pkLimit) {
                    if (pkShow === false) {
                        let parkIcon = new BMap.Icon("./images/park.png", new BMap.Size(26, 26), {
                            anchor: new BMap.Size(13, 26)
                        });
                        this.markerPark = new BMap.Marker(points[parkIndex], {
                            icon: parkIcon
                        });
                        map.addOverlay(this.markerPark);
                        locusMarks.push(this.markerPark);
                        this.markerParkList.push(this.markerPark);
                        pkShow = true;
                    }
                } else {
                    pkShow = false;
                }
            });

            copyMarkerPark.forEach(polyline => {
                map.removeOverlay(polyline);
            });
        }

        // 5. 小车绘制
        this.markArr = setUserInfoMarker(points[0], {
            carId,
            map,
            iconname: localPath[0].ICONNAME
        });
        let carNumberMk = this.markArr[0];
        locusMarks.push(carNumberMk);
        let carMk = this.markArr[1];
        locusMarks.push(carMk);
        this.process = 0;

        // 6. 小车运动轨迹绘制
        this.resetMkPoint = (i) => {
            // 1.保存进度索引
            this.process = i;
            // 2.判断是否暂停继续
            if (this.start) {
                let item = points[i];
                // 3.定位到对应点
                carNumberMk.setPosition(item);
                carMk.setPosition(item);
                carMk.setRotation(localPath[i].HX || 0);
                // 4. 回调并判断是否以车位中心点
                callback(i);
                if (this.centerCar) {
                    map.centerAndZoom(item, focusZomm);
                }
                // 5. 递归循环每个点
                i++;
                if (i < points.length) {
                    // 图片需要垂直向上  所以先将图片旋转175度
                    locusTimer = setTimeout(() => {
                        this.resetMkPoint(i);
                    }, this.speed);
                }
            }
        }
        this.resetMkPoint(0);
    }
}

/**
 * 显示地图点
 * @param {*} resData 
 */
export const drawPagePoints = (resData = indexMapList, showPoint = 'onlyphoto', updateMarkerObj = (markerObj || {})) => {
    for (var i = 0; i < resData.length; i++) {
        let item = resData[i];
        let type = item.TYPE; //类型
        /////////////基础信息 /////////////////
        let mlng = item.MLNG; //经度
        let mlat = item.MLAT; //纬度
        let id = item.ID; //id
        let name = item.NAME;
        let vehicleno = item.CODE; //车牌号
        let iconname = item.ICONNAME; //图标地址
        let rotation = item.COST || 0; //方向
        let state = item.COLLECTWAY; //车辆状态
        let setstate = item.FACSTATE; //设施状态
        let shortname = item.SHORTNAME; //简称
        let imgWidth = 28,
            imgHeight = 28;
        if (type == 'V') {
            iconname = getImgUrl(iconname, state);
        }
        // 画车以及其他点
        let imageurl = iconname ? window.SERVER + iconname : './images/car.png';
        if (type == "COMMUNITY") {
            imageurl = './images/sorting/juminxiaoqu.png'
        } else if (type == 'TRASHROOM') {
            imageurl = './images/sorting/toufangdian.png'
        }
        let icon = new BMap.Icon(imageurl, new BMap.Size(imgWidth, imgHeight), {
            anchor: new BMap.Size(imgWidth / 2, imgHeight / 2),
            imageSize: new BMap.Size(imgWidth, imgHeight)
        });
        let point = new BMap.Point(mlng, mlat);
        let marker = new BMap.Marker(point, {
            icon,
            rotation
        });
        marker.setZIndex(10);
        // 1. 当是类型为V时 仅显示图标时不渲染图标点 2.其他类型不做控制
        if (showPoint != 'onlytext') {
            map.addOverlay(marker);
            marker.params = item;
            updateMarkerObj[`type${type}_${id}__icon`] = marker;
        }
        if (type == 'V') {
            // 画车牌
            // 当仅显示图标时  不显示车牌
            if (showPoint != 'onlyphoto') {
                let carNumberMark = setCarNumber(point, vehicleno);
                map.addOverlay(carNumberMark);
                carNumberMark.params = item;
                updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
            }
        } else if (type == 'K') {
            // 画车牌
            // 当仅显示图标时  不显示车牌
            if (showPoint != 'onlyphoto') {
                let carNumberMark = setCarNumber(point, shortname);
                map.addOverlay(carNumberMark);
                carNumberMark.params = item;
                updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
            }
        } else {
            if (showPoint != 'onlyphoto') {
                let carNumberMark = setCarNumber(point, name);
                map.addOverlay(carNumberMark);
                carNumberMark.params = item;
                updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
            }
        }

        if (type == 'V') {

            // carNumberMark.hide();
            // 添加点击事件
        } else {
            // if (showPoint != 'onlyphoto') {
            //     let titleMark = setCarNumber(point, name);
            //     map.addOverlay(titleMark);
            //     titleMark.params = item;
            //     updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
            // }
            if (type == 'COMMUNITY' || type == 'TRASHROOM') {
                if (showPoint == 'onlytext') {
                    marker.hide();
                }
            } else {
                // 初始化只显示车 其余隐藏
                // marker.hide();
            }

        }
    }
}

/**
 * 绘制居民小区&投放点
 * @param {*} resData 
 * @param {*} showPoint 
 * @param {*} updateMarkerObj 
 */
export const drawTrashroomAndCommunity = (resData = indexMapList, showPoint = 'onlyphoto', updateMarkerObj = (markerObj || {})) => {
    for (var i = 0; i < resData.length; i++) {
        let item = resData[i];
        let type = item.TYPE; //类型
        /////////////基础信息 /////////////////
        let mlng = item.MLNG; //经度
        let mlat = item.MLAT; //纬度
        let id = item.ID; //id
        let name = item.NAME;
        let vehicleno = item.CODE; //车牌号
        let iconname = item.ICONNAME; //图标地址
        let rotation = item.COST || 0; //方向
        let state = item.COLLECTWAY; //车辆状态
        let setstate = item.FACSTATE; //设施状态
        let shortname = item.SHORTNAME; //简称
        let imgWidth = 28,
            imgHeight = 28;
        // 画车以及其他点
        let imageurl = '';
        if (type == "COMMUNITY") {
            imageurl = './images/sorting/juminxiaoqu.png'
        } else if (type == 'TRASHROOM') {
            imageurl = './images/sorting/toufangdian.png'
        }
        let icon = new BMap.Icon(imageurl, new BMap.Size(imgWidth, imgHeight), {
            anchor: new BMap.Size(imgWidth / 2, imgHeight / 2),
            imageSize: new BMap.Size(imgWidth, imgHeight)
        });
        let point = new BMap.Point(mlng, mlat);
        let marker = new BMap.Marker(point, {
            icon,
            rotation
        });
        marker.setZIndex(10);

        // 图片或者混合时绘制 居民小区和投放点的icon图标
        if (showPoint != 'onlytext') {
            map.addOverlay(marker);
            marker.params = item;
            updateMarkerObj[`type${type}_${id}__icon`] = marker;
        }

        // 若不是仅图片模式 绘制title
        if (showPoint != 'onlyphoto') {
            let carNumberMark = setCarNumber(point, name);
            map.addOverlay(carNumberMark);
            carNumberMark.params = item;
            updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
            carNumberMark.hide();
        }

        // 默认不显示标注点
        marker.hide();
    }
}
/**
 * 显示人员
 * @param {*} resData 
 */
export const drawRYPoints = (resData = indexMapList, showPoint = 'onlyphoto', updateMarkerObj = (markerObj || {})) => {
    for (var i = 0; i < resData.length; i++) {
        let item = resData[i];
        let type = item.TYPE; //类型
        /////////////基础信息 /////////////////
        let mlng = item.MLNG; //经度
        let mlat = item.MLAT; //纬度
        let id = item.ID; //id
        let name = item.NAME;
        let iconname = item.ICONNAME; //图标地址
        let rotation = item.COST; //方向
        let setstate = item.FACSTATE; //设施状态
        let shortname = item.SHORTNAME; //简称

        let imgWidth = 28,
            imgHeight = 28;
        // 画车以及其他点
        let imageurl = iconname ? window.SERVER + iconname : '';
        let icon = new BMap.Icon(imageurl, new BMap.Size(imgWidth, imgHeight), {
            anchor: new BMap.Size(imgWidth / 2, imgHeight / 2),
            imageSize: new BMap.Size(imgWidth, imgHeight)
        });
        let point = new BMap.Point(mlng, mlat);
        let marker = new BMap.Marker(point, {
            icon
        });
        marker.setZIndex(10);
        // 1. 当是类型为V时 仅显示图标时不渲染图标点 2.其他类型不做控制
        if (showPoint != 'onlytext') {
            map.addOverlay(marker);
            marker.params = item;
            updateMarkerObj[`type${type}_${id}__icon`] = marker;
        }
        // if (type == '1') {
        // 画车牌
        // 当仅显示图标时  不显示车牌
        if (showPoint != 'onlyphoto') {
            let carNumberMark = setGCNumber(point, name);
            map.addOverlay(carNumberMark);
            carNumberMark.params = item;
            updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
        }
    }
}

/**
 * 显示垃圾收运点地图点
 * @param {*} resData 
 */
export const drawGarbagePoints = (resData = indexMapList, showPoint = 'onlyphoto', syZhMarkerObj = (symarkerObj || {})) => {
    for (var i = 0; i < resData.length; i++) {
        if (resData[i].MLNG && resData[i].MLAT && resData[i].ICONNAME) {
            let item = resData[i];
            let type = item.TYPE; //类型
            /////////////基础信息 /////////////////
            let mlng = item.MLNG; //经度
            let mlat = item.MLAT; //纬度
            let id = item.ID; //id
            let name = item.NAME;
            let vehicleno = item.CODE; //车牌号
            let iconname = item.ICONNAME; //图标地址
            let rotation = item.COST; //方向
            let state = item.COLLECTWAY; //车辆状态
            let setstate = item.FACSTATE; //设施状态
            let shortname = item.SHORTNAME; //简称

            let imgWidth = 28,
                imgHeight = 28;
            if (type == 'V') {
                iconname = getImgUrl(iconname, state);
            }
            // 画车以及其他点
            let imageurl = iconname ? window.SERVER + iconname : '';
            let icon = new BMap.Icon(imageurl, new BMap.Size(imgWidth, imgHeight), {
                anchor: new BMap.Size(imgWidth / 2, imgHeight / 2),
                imageSize: new BMap.Size(imgWidth, imgHeight)
            });
            let point = new BMap.Point(mlng, mlat);
            let marker = new BMap.Marker(point, {
                icon,
                rotation
            });
            marker.setZIndex(10);
            // // 1. 当是类型为V时 仅显示图标时不渲染图标点 2.其他类型不做控制
            // if (type == 'V' && showPoint != 'onlytext' || type != 'V') {
            //     map.addOverlay(marker);
            //     marker.params = item;
            //     markerObj[`type${type}_${id}__icon`] = marker;
            // }

            //  // 画车牌
            // // 当仅显示图标时  不显示车牌
            // if (showPoint != 'onlyphoto') {
            //     let carNumberMark = setCarNumber(point, vehicleno);
            //     map.addOverlay(carNumberMark);
            //     carNumberMark.params = item;
            //     markerObj[`type${type}_${id}__title`] = carNumberMark;
            // }


            if (showPoint != 'onlytext') {
                map.addOverlay(marker);
                marker.params = item;
                syZhMarkerObj[`type${type}_${id}__icon`] = marker;
            }
            if (type == 'V') {
                // 画车牌
                // 当仅显示图标时  不显示车牌
                if (showPoint != 'onlyphoto') {
                    let carNumberMark = setCarNumber(point, vehicleno);
                    map.addOverlay(carNumberMark);
                    carNumberMark.params = item;
                    syZhMarkerObj[`type${type}_${id}__title`] = carNumberMark;
                }
            } else if (type == 'B') {
                // 画车牌
                // 当仅显示图标时  不显示车牌
                if (showPoint != 'onlyphoto') {
                    let carNumberMark = setCarNumber(point, shortname);
                    map.addOverlay(carNumberMark);
                    carNumberMark.params = item;
                    syZhMarkerObj[`type${type}_${id}__title`] = carNumberMark;
                }
            } else {
                if (showPoint != 'onlyphoto') {
                    let carNumberMark = setCarNumber(point, name);
                    map.addOverlay(carNumberMark);
                    carNumberMark.params = item;
                    syZhMarkerObj[`type${type}_${id}__title`] = carNumberMark;
                }
            }

            if (type == 'V') {

                // carNumberMark.hide();
                // 添加点击事件
            } else {
                // if (showPoint != 'onlyphoto') {
                //     let titleMark = setCarNumber(point, name);
                //     map.addOverlay(titleMark);
                //     titleMark.params = item;
                //     updateMarkerObj[`type${type}_${id}__title`] = carNumberMark;
                // }

                // 初始化只显示车 其余隐藏
                // marker.hide();
            }
        }
    }
}

/**
 * 显示公厕
 * @param {*} resData 
 */
export const drawGCPoints = (resData = indexMapList, showPoint = 'onlyphoto') => {
    for (var i = 0; i < resData.length; i++) {
        let item = resData[i];
        let type = item.TCLASS; //类型
        /////////////基础信息 /////////////////
        let mlng = item.MLNG; //经度
        let mlat = item.MLAT; //纬度
        let id = item.ID; //id
        let name = item.NAME;
        let iconname = item.ICONNAME; //图标地址
        let rotation = item.COST; //方向
        let setstate = item.FACSTATE; //设施状态
        let shortname = item.SHORTNAME; //简称

        let imgWidth = 28,
            imgHeight = 28;
        // 画车以及其他点
        let imageurl = iconname ? window.SERVER + iconname : '';
        let icon = new BMap.Icon(imageurl, new BMap.Size(imgWidth, imgHeight), {
            anchor: new BMap.Size(imgWidth / 2, imgHeight / 2),
            imageSize: new BMap.Size(imgWidth, imgHeight)
        });
        let point = new BMap.Point(mlng, mlat);
        let marker = new BMap.Marker(point, {
            icon
        });
        marker.setZIndex(10);
        // 1. 当是类型为V时 仅显示图标时不渲染图标点 2.其他类型不做控制
        if (showPoint != 'onlytext') {
            map.addOverlay(marker);
            marker.params = item;
            basicMarkerObj[`type${type}_${id}__icon`] = marker;
        }
        // if (type == '1') {
        // 画车牌
        // 当仅显示图标时  不显示车牌
        if (showPoint != 'onlyphoto') {
            let carNumberMark = setGCNumber(point, name);
            map.addOverlay(carNumberMark);
            carNumberMark.params = item;
            basicMarkerObj[`type${type}_${id}__title`] = carNumberMark;
        }
    }
}

/**
 * 显示环卫案件
 * @param {*} resData 
 */
export const drawCasePoints = (resData = indexMapList, caseObj = (hwCaseMarkerObj || {})) => {
    for (var i = 0; i < resData.length; i++) {
        let item = resData[i];
        /////////////基础信息 /////////////////
        let mlng = item.mlng || item.MLNG; //经度
        let mlat = item.mlat || item.MLAT; //纬度
        let id = item.id || item.ID; //id
        let state = item.state || item.STATE;

        let imgWidth = 39,
            imgHeight = 41;
        // 画车以及其他点
        let imageurl = "";
        if (state == 'notregister') {
            imageurl = "./images/sanitation/未立案.png";
        } else if (state == 'onend') {
            imageurl = "./images/sanitation/已结案.png";
        } else if (state == 'notdeal' || state == 'approve3') {
            imageurl = "./images/sanitation/未处理.png";
        } else if (state == 'notend') {
            imageurl = "./images/sanitation/未结案.png";
        }
        let icon = new BMap.Icon(imageurl, new BMap.Size(imgWidth, imgHeight), {
            anchor: new BMap.Size(imgWidth / 2, 35)
        });
        let point = new BMap.Point(mlng, mlat);
        let marker = new BMap.Marker(point, {
            icon
        });
        marker.setZIndex(10);
        map.addOverlay(marker);
        marker.params = item;
        caseObj[`type${state}_${id}__icon`] = marker;

    }
}
/**
 * 初始化热力图
 */
export const initHeatMap = function (options) {
    let {
        max = 100, //最大值
            radius = 20, //半径
            points = [], //绘制点
            gradient = { //渐变区间对应的颜色
                "0": "rgb(102, 255, 0)",
                "0.5": "rgb(255, 170, 0)",
                "1": "rgb(255, 0, 0)"
            }
    } = options;
    // 1. 初始化设置热力图
    heatmapOverlay = new BMapLib.HeatmapOverlay({
        radius
    });
    map.addOverlay(heatmapOverlay);
    // 2. 设置点位值和最大值
    heatmapOverlay.setDataSet({
        data: points,
        max: max
    });
    // 3. 设置区间颜色
    heatmapOverlay.setOptions({
        gradient: gradient
    });

}
