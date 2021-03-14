
import './index.scss'
import 'src/utils/es6-promise.util'
import Router                       from 'src/utils/router.util'
import Http                         from 'src/utils/http.util'
import DateUtil                     from 'src/utils/date.util'
import storage                      from 'src/utils/storage'

// 控制器
const Controller = {
    init () {
        this.params = Router.getParams();
        storage.cache.set('$$USER_INFO', this.params);
        // this.reqArticleInfo();
        $('.c-button').on('click', this.doStudyTaskFinish.bind(this));
    },
    doStudyTaskFinish () {
        let { id } = this.params;
        Http(Http.API.DO_STUDY_TASK_FINISH, {
            ConfigId: id,
        }).then(res => {
            console.log(res);
            let params = encodeURIComponent(JSON.stringify({
                number: res,
                type: 'studyTask',
            }));
            wx.miniProgram.redirectTo({
                url: `/pages/reward/index?params=${params}`,
            });
        }).toast();
    },
    reqArticleInfo () {
        let { id } = this.params;
        if (!id) return null;
        Http(Http.API.REQ_ARTICLE_INFO, {
            Data: id,
        }).then((res) => {
            let { Name, Content, CreatedDate } = res;
            let strHtml = `
             <div class="header">
                <div class="title">${ Name }</div>
                <div class="prompt">
                    <span>${ DateUtil.formatTime(CreatedDate, 'yyyy-MM-dd') }</span>
                </div>
            </div>
            <div class="content">${Content}</div>`;
            $('.app').html(strHtml);
        }).toast();
    }
};

Controller.init();

