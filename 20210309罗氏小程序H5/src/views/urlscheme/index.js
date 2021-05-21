
import './index.scss'
import 'src/utils/es6-promise.util'
import Toast                            from 'src/utils/toast.util'
import Router                       from 'src/utils/router.util'
import Http                         from 'src/utils/http.util'
import copy                         from 'copy-to-clipboard'

// 控制器
const Controller = {
    init () {
        $('#public-web-jump-button').on('click', () => {
            this.openWeapp();
        });
        $('#copy-btn').on('click', () => {
            if (copy(window.location.href)) {
                window.alert('复制成功，请到浏览器粘贴打开');
            } else {
                window.alert('复制失败，请点击右上角按钮打开菜单，选择复制');
            }
        });

        const ua = navigator.userAgent.toLowerCase();
        // 企业微信
        const isWXWork = ua.match(/wxwork/i) == 'wxwork'
        // 微信浏览器
        const isWeixin = !isWXWork && ua.match(/MicroMessenger/i) == 'micromessenger'
        let isMobile = false
        let isDesktop = false
        if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i)) {
            isMobile = true
        } else {
            isDesktop = true
        }

        if (isDesktop) {
            // 在 pc 上则给提示引导到手机端打开
            const containerEl = document.getElementById('desktop-web-container')
            containerEl.classList.remove('hidden')
            containerEl.classList.add('full', 'desktop-web-container')
            // 生成当前页面二维码
            new QRCode('qrcode', {
                text: document.URL,
                width: 200,
                height: 200,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } else if (isWeixin) {
            let { id } = Router.getParams();
            if (!id) return Toast.msg('错误链接');
            let scheme = '';
            Http(Http.API.REQ_URL_SCHEME_INFO, {
                Id: id,
            }).then((res) => {
                scheme = res;
                return Http(Http.API.REQ_WX_CONFIG_INFO, {
                    current_url: window.location.href,
                });
            }).then(res => {
                wx.config({
                    debug: false,
                    ...res,
                    jsApiList: ['chooseImage'],
                    openTagList:['wx-open-launch-weapp'],
                });
                $('#wechat-web-container').removeClass('hidden');
                //如果微信浏览器，通过开放标签打开小程序
                const containerEl = document.getElementById('wechat-web-container');
                containerEl.classList.remove('hidden');
                containerEl.classList.add('full', 'wechat-web-container');
                const launchBtn = document.getElementById('launch-btn');
                launchBtn.setAttribute('username', 'gh_5db2f91668e2');
                launchBtn.setAttribute('path', `/pages/home/index?${scheme.Query}`);
                launchBtn.addEventListener('error', function (e) {
                    console.log('用户拒绝跳转或跳转异常', e.detail);
                });
            }).toast();
        } else {
            // 在非微信的外部手机浏览器使用URLScheme打开小程序
            const containerEl = document.getElementById('public-web-container')
            containerEl.classList.remove('hidden')
            containerEl.classList.add('full', 'public-web-container')

            const buttonEl = document.getElementById('public-web-jump-button')
            const buttonLoadingIcon = document.getElementById('public-web-jump-button-loading-icon')
            const buttonLoadingText = document.getElementById('public-web-jump-button-loading-text')
            try {
                // 自动执行，打开URLScheme
                this.openWeapp(() => {
                    buttonEl.classList.remove('weui-btn_loading')
                    buttonLoadingIcon.classList.add('hidden')
                    buttonLoadingText.classList.add('hidden')
                })
            } catch (e) {}
        }
    },
    openWeapp (onBeforeJump) {
        let { id } = Router.getParams();
        if (!id) return Toast.msg('错误链接');
        Http(Http.API.REQ_URL_SCHEME_INFO, {
            Id: id,
        }).then(res => {
            if (onBeforeJump) {
                onBeforeJump()
            }
            window.location.href = res.OpenLink;
        }).toast();
    },
};

Controller.init();
