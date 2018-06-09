import Vue from 'vue'
import { Notification } from 'element-ui'

var ws,
    ws2,
    isOnline = process.env.NODE_ENV === 'development',
    webSocketURL = process.env.WEB_SOCKET_URL;
export const initSocket = ()=> {
    try {
        if ("WebSocket" in window) {
            ws = new WebSocket(webSocketURL);
        }else if("MozWebSocket" in window) {
            ws = new MozWebSocket(webSocketURL);
        }else {
            Notification.error({
                title : '错误',
                message : '浏览器暂不支持！！'
            })
        }
    }catch(err) {
        console.log(err);
    }
    ws.onclose = function() {
        Notification.error({
            title : '错误',
            message : 'socket断开连接，请启动服务器！'
        })
    };
    ws.onerror = function() {
        Notification.error({
            title : '错误',
            message : 'socket连接异常，请联系管理员！'
        })
    };
    window.onbeforeunload = function () {
        ws.close();
    }
    return ws;
}
export const initSocket2 = ()=> {
    try {
        if ("WebSocket" in window) {
            ws2 = new WebSocket(webSocketURL);
        }else if("MozWebSocket" in window) {
            ws2 = new MozWebSocket(webSocketURL);
        }else {
            Notification.error({
                title : '错误',
                message : '浏览器暂不支持！！'
            })
        }
    }catch(err) {
        console.log(err);
    }
    return ws2;
}
Vue.prototype.$webSocket = initSocket();
Vue.prototype.$webSocket2 = initSocket2();
const send = (message,callBack) => {
    if (ws.readyState === 1) {
        ws.send(Vue.prototype.$Base64.encode(message));
        callBack("success");
    } else {
        callBack("error");
    }
}
const send2 = (message,callBack) => {
    if (ws2.readyState === 1) {
        ws2.send(Vue.prototype.$Base64.encode(message));
        callBack("success");
    } else {
        callBack("error");
    }
}
Vue.prototype.$send = send;
Vue.prototype.$send2 = send2;