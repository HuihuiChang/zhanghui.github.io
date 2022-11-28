import fullScreenMixin from './full-screen-mixin.js';
import commonMixin from './common-mixin.js';

// 显示菜单定时器
let showTimer = null;
// 移动菜单定时器
let translateTimer = null;
// 高亮菜单定时器
let highlightTimer = null;

// let VIDEOIP = 'http://172.16.254.15:80/';
let VIDEOIP = 'https://172.16.254.15:443/';

window.app = new Vue({
    mixins: [commonMixin, fullScreenMixin],
    el: '#cgApp',
    data() {
        return {
            // 列表数组
            menuList: [],
            // 列表显示
            isShow: false,
            // 触发高亮索引
            activeIndex: -1,
            // 标签是否移动
            isTrans: false
        }
    },
    created() {
        this.setCurrentPageData('AGGREGATION');
        this.menuList = this.currentData.menuList;
        this.turnHighLight();
        this.showList();
    },
    mounted() {
        document.body.style.visibility = '';
    },
    methods: {
        /**
         *  轮流高亮
         */
        turnHighLight() {
            highlightTimer = setInterval(() => {
                this.activeIndex = ++this.activeIndex;
                if (this.activeIndex >= 8) {
                    this.activeIndex = 0;
                };
            }, 3000);
        },

        /**
         * 鼠标移上取消高亮循环
         */
        cancelHighLight(e) {
            clearInterval(highlightTimer);
            this.activeIndex = -1;
        },
        /**
         * 开屏动画结束显示标签
         */
        showList() {
            showTimer = setTimeout(() => {
                this.isShow = true;
            }, 900);
            translateTimer = setTimeout(() => {
                this.isTrans = true;
            }, 1500);
        },
        /**
         * 页面跳转到对应的系统
         * @param {*} item 
         */
        handleJumpPage(item) {
            if (item.url) {
                window.open(item.url);
            }
            if (item.chinese == '视频管理') {
                this.getToken(path => {
                    if (path) {
                        // window.open(path);
                        window.location.href = path;
                    }
                });
            }
            // window.location.href = `${item.url}`;
        },
        /**
         * 获取视频pingtaitoken
         */
        getToken(callback) {
            let url = `${VIDEOIP}artemis/api/cas/v1/tgt/login?userCode=admin&service=${VIDEOIP}&language=zh_CN`;
            let appKey = '20108161';
            let appSecret = 'UwUN9r3lkLhmcojIGjDx';

            let str = `GET\n*/*\napplication/json\nx-ca-key:20108161\n/artemis/api/cas/v1/tgt/login?language=zh_CN&service=${VIDEOIP}&userCode=admin`

            let hash = CryptoJS.HmacSHA256(str, appSecret);
            let secret = CryptoJS.enc.Base64.stringify(hash);

            $.ajax({
                type: "GET",
                url: url,
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    'X-Ca-Key': appKey,
                    'X-Ca-Signature': secret,
                    'X-Ca-Signature-Headers': 'x-ca-key'
                },
                success: (res) => {
                    if (res.code == '0') {
                        let token = res.data.token;
                        console.log('token', token);
                        let path = `${VIDEOIP}bic/ssoService/v1/tokenLogin?token=${token}&service=${VIDEOIP}`;
                        callback(path);
                    } else {
                        callback('');
                    }
                }
            });
        }
    },
    beforeDestroy() {
        clearTimeout(showTimer);
        clearTimeout(translateTimer);
        clearInterval(highlightTimer);
    }
});