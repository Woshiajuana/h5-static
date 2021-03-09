
import Toast                            from 'src/utils/toast.util'
import Api                              from 'src/utils/api.config'

function Http (url, data, options) {
    this.fn = options.fn || 'fetch';
    this.url = `https://rochecrm.g2digi.com/${url}`;
    this.options = Object.assign({
        type: 'POST',
        timeout: 60 * 1000,
        dataType: 'json',
    }, options);
    this.data = Object.assign({
    }, data);
    return this[this.fn]();
}

Http.prototype.fetch = function () {
    console.log(this.url, '请求参数 => ', this.data);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: this.url,
            data: this.options.type === 'GET' ? this.data : JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            ...this.options,
            success: (response) => {
                console.log(this.url, '请求返回 => ', response);
                let { Status, Message, Data } = response;
                if (Status !== 0)
                    return reject(Message || '网络繁忙，请稍后再试');
                console.log(this.url, '请求返回格式化 => ', Data);
                resolve(Data || response);
            },
            error: (err = '') => {
                console.log(this.url, '请求错误 => ', err);
                let { response, status } = err;
                let msg;
                try {
                    response = JSON.parse(response);
                    msg = response.msg || response.message || '网络繁忙，请稍后再试';
                } catch (e) {
                    msg = '网络繁忙，请稍后再试';
                } finally {
                    reject(msg);
                }
            }
        })
    });
};

const fn = (url, data = {}, options = {}) => {
    let { loading } = options;
    if (loading !== false) Toast.show(loading);
    return new Http(url, data, options).finally(() => {
        loading !== false && Toast.hide();
    });
};

fn.API = Api;

export default fn;


