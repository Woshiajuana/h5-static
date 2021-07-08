
import { filterMessage } from 'src/utils/filters'
import { Toast } from 'vant'

Promise.prototype.toast = function (callback) {
    return this.catch(err => {
        const message = filterMessage(err);
        if (callback && callback(err, message)) {
            return null;
        }
        message && Toast(message);
    });
};

Promise.prototype.null = function () {
    return this.catch(err => console.log(err));
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
