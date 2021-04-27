
import './index.scss'

$(() => {
    $('.button').on('click', () => {
        wx.miniProgram.postMessage({ data: { appId: 'wxc1b469219b8df8dc' } });
        wx.miniProgram.navigateBack()
    });

});
