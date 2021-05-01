
import './index.scss'

$(() => {
    $('.button').on('click', () => {
        wx.miniProgram.postMessage({ data: {
            appId: 'wxc1b469219b8df8dc',
            // path: '', // path 如果不给默认进小程序的首页
        }});
        wx.miniProgram.navigateBack()
    });

});
