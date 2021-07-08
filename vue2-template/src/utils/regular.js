
export function isPhone (value) {
    return /^1\d{10}$/.test(value);
}

export function isIDCard (value) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value);
}

export function isBankCard (value) {
    return /^(\d{16}|\d{18}|\d{19})$/.test(value);
}

export function isEmail (value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
}

export function isMoney (value) {
    return /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value);
}

export function isText (value) {
    return /^[\d\w\u4e00-\u9fa5]{1,12}$/.test(value);
}

