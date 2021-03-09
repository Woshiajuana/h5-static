
import './index.scss'

import Router                       from 'src/utils/router.util'
import Http                         from 'src/utils/http.util'
import DateUtil                     from 'src/utils/date.util'

// 控制器
const Controller = {
    init () {
        this.params = Router.getParams();
        this.reqArticleInfo();
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

