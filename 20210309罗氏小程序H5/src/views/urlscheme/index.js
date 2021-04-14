
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
        this.reqUrlSchemeInfo();
    },
    reqUrlSchemeInfo () {
        let { id } = this.params;
        Http(Http.API.REQ_URL_SCHEME_INFO, {
            Id: +id,
        }).then(res => {

        }).toast();
    },
};

Controller.init();
