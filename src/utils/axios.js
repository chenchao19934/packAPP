import axios from 'axios'
import Qs from 'qs'
import { MessageBox } from 'element-ui';

const isOnline = process.env.NODE_ENV === "development",
    //   baseURL = 'http://scw.new.songcaiwa.cn:8080/public';
    baseURL = isOnline ? 'http://scw.new.songcaiwa.cn:8080/public' : 'https://scw.new.songcaiwa.cn/public';

// 创建axios实例
const service = axios.create({
    baseURL, // api的base_url
    timeout: 10000, // 请求超时时间
    transformRequest: [(data) => {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        data = Qs.stringify(data);
        return data;
    }],
});
service.interceptors.response.use(
    (response) => {
        const dataText = response.data;
        let data = null;
        if (typeof dataText === 'object') {
            data = dataText;
        } else if (typeof dataText === 'string') {
            const startIndex = dataText.indexOf('(') + 1;
            const endIndex = dataText.lastIndexOf(')');
            const responseText = dataText.slice(startIndex, endIndex);
            data = JSON.parse(responseText);
        }else if(typeof dataText === 'number') {
            data = dataText;
        }
        return Promise.resolve(data);
    },
    (error) => {
        MessageBox(`请求数据失败 ${error.response.status}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        return Promise.reject(error);
    },
);

export default service;