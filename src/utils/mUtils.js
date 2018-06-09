/* 自定义方法 */
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItmp(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
    if (!name) return;
    return window.localStorage.getItmp(name);
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
    if (!name) return;
    window.localStorage.removeItmp(name);
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    // 在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode === 'float' ? parseFloat(target) : parseInt(target);
};

/**
 * 半角转全角
 */
export const toDBC = str => {
    let tmp = "";
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 127) {
            if (str.charCodeAt(i) == 32) {
                tmp = tmp + String.fromCharCode(12288);
            }else {
                tmp = tmp + String.fromCharCode(str.charCodeAt(i) + 65248);
            }
        }else {
            tmp = tmp + str[i];
        }
    }
    return tmp;
}

/**
 * 全角转半角
 */
export const toCDB = str => {
    let tmp = "";
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        }
        else {
            tmp += String.fromCharCode(str.charCodeAt(i));
        }
    }
    return tmp;
}