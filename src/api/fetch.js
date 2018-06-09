import fetch from '@/utils/axios'

const apiURL = '/index.php/admin/sorting/';

export const Login = ({
    url = 'login',
    method = 'get',
    userName,
    passWord
}) => fetch({
    url : `${apiURL}${url}/name/${userName}/password/${passWord}`,
    method
})
// 打包列表
export const list = ({
    url = 'pack_goods',
    method = 'get',
    data,
    page = 1,
    category,
    goods_name
}) => fetch({
    url : `${apiURL}${url}?date=${data}&page=${page}&category=${category}&goods_name=${goods_name}`,
    method
})

export const dish = ({
    url = 'goods_info',
    method = 'get',
    id
}) => fetch({
    url : `${apiURL}${url}/goods_id/${id}`,
    method
})

export const dishAdd = ({
    url = 'add_pack_goods',
    method = 'get',
    user,
    id,
    sn
}) => fetch({
    url : `${apiURL}${url}/user/${user}/goods_id/${id}/sn/${sn}`,
    method
})

export const chackOrder = ({
    url = 'check_order',
    method = 'get',
    orderId
}) => fetch({
    url : `${apiURL}${url}/group_id/${orderId}`,
    method
})

export const orderDetails = ({
    url = 'order_details',
    method = 'get',
    orderId
}) => fetch({
    url : `${apiURL}${url}/group_id/${orderId}`,
    method
})

// 重新打包
export const rePack = ({
    url = 'again_pack_goods',
    method = 'get',
    user,
    goods_id
}) => fetch({
    url : `${apiURL}${url}/user/${user}/goods_id/${goods_id}`,
    method
})

// 打印订单
export const print = ({
    url = 'print_order',
    method = 'post',
    data = {
        group_id,
        user,
        weight
    }
}) => fetch({
    url : `${apiURL}${url}`,
    method,
    data : data
})

// 打印区域订单
export const area = ({
    url = 'print_order_list',
    date,
    region,
    orderID
})=> fetch({
    url : `${apiURL}${url}/date/${date}/region/${region}/group_id/${orderID}`
})

// 区域分类
export const areaList = ({
    url = 'order_region_list',
    date
}) => fetch({
    url : `${apiURL}${url}?date=${date}`
})