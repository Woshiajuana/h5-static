
import './index.scss'
import 'src/utils/es6-promise.util'
import Router                       from 'src/utils/router.util'
import Http                         from 'src/utils/http.util'
import storage                      from 'src/utils/storage'

// 控制器
const Controller = {
    init () {
        this.params = Router.getParams();
        storage.cache.set('$$USER_INFO', this.params);
        this.reqStudyTaskInfo();
        $('.app').on('click', '.button-sure', this.doStudyTaskFinish.bind(this))
            .on('click', '.button-collect', this.doCollectAdded.bind(this))
            .on('click', '.button-return', this.handleReturn.bind(this))
        ;
    },
    handleReturn () {
        wx.miniProgram.navigateBack();
    },
    doStudyTaskFinish () {
        let { id } = this.params;
        Http(Http.API.DO_STUDY_TASK_FINISH, {
            ConfigId: id,
        }).then(res => {
            console.log(res);
            let params = encodeURIComponent(JSON.stringify({
                ...res,
                type: 'studyTask',
            }));
            wx.miniProgram.redirectTo({
                url: `/pages/reward/index?params=${params}`,
            });
        }).toast();
    },
    doCollectAdded () {
        let { id } = this.params;
        Http(Http.API.DO_COLLECT_ADDED, {
            ConfigId: id,
        }).then(res => {
            throw '收藏成功';
        }).toast();
    },
    reqStudyTaskInfo () {
        let { id, type } = this.params;
        if (!id) return null;
        Http(Http.API.REQ_STUDY_TASK_INFO, {
            ConfigId: id,
        }).then((res) => {
            let { Title, Content, CreatedDate } = res;
            let strHtml = `
             <div class="header">
                <div class="title">${ Title || '' }</div>
            </div>
            <div class="content">${Content || ''}</div>
            `;
            if (type === 'task') {
                strHtml += `
                <div class="c-button-group">
                    <button class="c-button button-collect">收藏文章</button>
                    <button class="c-button button-sure">阅读完成</button>
                </div>
                `
            } else {
                strHtml += `
                <div class="c-button-group">
                    <button class="c-button button-return">返回</button>
                </div>
                `
            }
            $('.app').html(strHtml);
        }).toast();
    }
};

Controller.init();


// <div class="prompt">
//     <span>${ DateUtil.formatTime(CreatedDate, 'yyyy-MM-dd') }</span>
//     </div>
