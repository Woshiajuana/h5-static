
export function filterMessage (v = '') {
    return typeof v === 'object' ? v.message || JSON.stringify(v) : `${v}`;
}

export function filterDate (v = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    const date = new Date(v);
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

export function filterAmount (v, divisor = 100) {
    v = parseFloat(v);
    if (v) {
        v = (v / divisor).toFixed(2);
        let l = v.split('.')[0].split('').reverse();
        let r = v.split('.')[1];
        let t = '';
        l.forEach((ll, key) => {
            t += l[key] + ((key + 1) % 3 === 0 && (key + 1) !== l.length ? ',' : '');
        });
        return t.split('').reverse().join('') + '.' + r;
    } else if (v === 0) {
        return '0.00';
    } else {
        return '---';
    }
}

export function filterCutOut (v, max = 0) {
    return v ? `${v.substring(0, max)}${v.length > max ? '...' : ''}` : '';
}

export function filterIDCard (v) {
    return v ? v.substring(0,6) + '********' + v.substring(14) : '';
}

export function filterBankCard (v) {
    if (!v || v.length < 3) return v;
    let len = v.length;
    v = `${new Array(len - 3).join('*')}${v.substring(len - 4)}`;
    return v.replace(/(.{4})/g, '$1 ');
}

export function filterPhone (v) {
    return v ? v.substring(0,3) + ' **** ' + v.substring(7) : '';
}

export function filterName (v) {
    if (!v) {
        return '';
    }
    if (v.length === 1) {
        return v;
    }
    if (v.length === 2) {
        return v.substring(0, 1) + '*'
    }
    return v.substring(0, 1) + new Array(v.length - 1).join('*') + v.substr(-1);
    // return value ? value.replace(/.(?=.)/g, '*') : '';
}
