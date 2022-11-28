import {
    off,
    on,
    toggleFullScreen
} from "./js/utils.js";

export default {
    data() {
        return {
            // 判断是否全屏
            isFullScreen: false
        }
    },
    created() {
        // 监听全屏事件
        if (document.exitFullscreen) {
            on(document, 'fullscreenchange', this.handleFullscreenChange);
        } else if (document.mozCancelFullScreen) {
            on(document, 'mozfullscreenchange', this.handleFullscreenChange);
        } else if (document.msExitFullscreen) {
            on(document, 'MSFullscreenChange', this.handleFullscreenChange);
        } else if (document.webkitCancelFullScreen) {
            on(document, 'webkitfullscreenchange', this.handleFullscreenChange);
        };
        // 监听键盘按下事件
        on(document, 'keydown', this.handleKeydown);
    },
    methods: {
        /**
         * 监听全屏事件，改变全屏状态变量
         */
        handleFullscreenChange() {
            this.isFullScreen = !this.isFullScreen;
        },
        /**
         * 全屏、退出全屏
         */
        handleFullScreen() {
            toggleFullScreen();
        },
        /**
         * 键盘按下F11触发事件
         */
        handleKeydown(e) {
            if (e.key === 'F11') {
                // 阻止默认的键盘事件
                e.returnValue = false;
                this.handleFullScreen();
            }
        },
    },
    beforeDestroy() {
        if (document.exitFullscreen) {
            off(document, 'fullscreenchange', this.handleFullscreenChange);
        } else if (document.mozCancelFullScreen) {
            off(document, 'mozfullscreenchange', this.handleFullscreenChange);
        } else if (document.msExitFullscreen) {
            off(document, 'MSFullscreenChange', this.handleFullscreenChange);
        } else if (document.webkitCancelFullScreen) {
            off(document, 'webkitfullscreenchange', this.handleFullscreenChange);
        }
        // 移除监听F11按键事件及全屏事件
        off(document, 'keydown', this.handleKeydown)
    }
}