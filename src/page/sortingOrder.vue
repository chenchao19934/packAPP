<template>
    <Main exit="true" back="true" titles="送菜蛙订单分拣系统" v-loading="loading">
        <el-aside class="wx-aside">
            <p>
                订单号： {{userInfo.group_id}}
            </p>
            <p>
                配送时间： {{userInfo.delivery_time}}
            </p>
            <p>
                地址： {{userInfo.detail_address}}{{userInfo.house_number}}
            </p>
            <p>
                联系人： {{userInfo.name}}/{{userInfo.phone_number}}
            </p>
            <p>
                区域： {{userInfo.region}}
            </p>
            <p style="padding-right: 20px">
                <el-form>
                    <el-form-item label="备注">
                        <el-input type="textarea" 
                            v-model="remark" 
                            :disabled="true" 
                            rows="4"></el-input>
                    </el-form-item>
                </el-form>
            </p>
            <div class="wx-print">
                <el-button type="warning">重新打单</el-button>
                <el-button type="info" @click.native="close">关闭订单</el-button>
                <div>
                    <el-button type="primary" @click.native="printOrder">打印订单</el-button>
                </div>
            </div>
        </el-aside>
        <div class="wx-rside left">
            <ScrollBar ref="bar" :dishArr="userInfo.list" @changeDish="dishAdd"></ScrollBar>
            <div class="wx-packdish">
                <!-- <p>请分拣:{{chooseIndex.dishName}}</p> -->
                <el-form @submit.native.prevent label-width="250px">
                    <el-form-item label="条码检验区">
                        <el-input v-model="pack_number" ref="autofocues"
                                @keyup.enter.native="comfimeOrder" 
                                autofocus=true></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </Main>
</template>

<script>

    import Main from '@/components/main'
    import ScrollBar from '@/components/scrollBar'
    import {orderDetails,print} from '@/api/fetch'
    export default {
        components : {
            Main,
            ScrollBar
        },
        data() {
            return {
                listArr : [],   //  商品列表
                listlength : 0,     //  商品长度
                userInfo : Object,
                remark : 'xxxxxx',  // 备注
                pack_number : null,     // 输入的条码
                loading : true,
                isPrint : false,
                // inputIndex : -1,
                chooseIndex : {
                    dishName : '',
                    goods_id : '',
                    sn : ''
                },
                target : []
            }
        },
        created() {
            this.initPage();
            this.$nextTick(()=> {
                this.$refs.autofocues.focus();
                this.$webSocket.onmessage = (event) => {
                    let data = this.$Base64.decode(event.data);
                    if(data == 'over') {
                        this.loading = false;
                        window.history.back(-1);
                    }else {
                        // 打印失败。
                        this.loading = false;
                        this.$notify.error({
                            title : '错误',
                            message : '打印失败，请重新打印！'
                        })
                    }
                }
            })
        },
        destroyed() {
            this.$webSocket.onmessage = null;
        },
        watch : {
            listArr(n,o) {
                let count = 0;
                n.forEach(element => {
                    if(element.number === element.pack_number){
                        count ++;
                    }
                });
                if (count === this.listlength) {
                    this.isPrint = true;
                    this.$confirm('该订单分拣成功，是否打印该订单！','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.printOrder();
                    }).catch(() => {})
                }
            }
        },
        methods : {
            // 初始化页面
            async initPage() {
                let data = await orderDetails({
                    orderId : this.$route.params.orderId
                })
                this.loading = false;
                this.userInfo = data[0];
                this.listArr = data[0].list;
                this.listlength = this.listArr.length;
                this.restArr(this.listArr,0);
            },
            // 监听ScrollBar子组件事件
            dishAdd(id,sn,dishName) {
                this.chooseIndex.goods_id = id;
                this.chooseIndex.sn = sn;
                this.chooseIndex.dishName = dishName;
            },
            // 输入框回车提交
            comfimeOrder() {
                let strAll = this.pack_number.substring(0,7),
                    strRepeat = strAll.toString().substring(0,3),
                    str = strAll.toString().substring(3,7),
                    weight = this.pack_number.substring(7,13),
                    success = {
                        "sn" : str,
                        "repeat" : strRepeat,
                        "weight" : weight
                    },
                    inputIndex = this.listArr.findIndex(v => {
                        return v.sn === str;
                    });
                if (inputIndex < 0) {
                    this.$notify.error({
                        title : '错误',
                        message : '错误的条码，请重新输入！'
                    })
                    this.pack_number = null;
                    this.$send2("scw,play,order,wrongcode",back=> {});
                } else {
                    let index = this.target.findIndex(v => {
                        return success.sn === v.sn;
                    })
                    if(index === -1) {
                        this.target.push(success);
                        this.successPrint(inputIndex);
                    }else {
                        this.target.forEach(ele => {
                            if (success.sn === ele.sn) {
                                if (ele.repeat.indexOf(success.repeat) >= 0) {
                                    this.$notify.error({
                                        title : '错误',
                                        message : '条码已存在，请重新扫码！'
                                    })
                                    this.$send2("scw,play,order,recode",back=> {})
                                    this.pack_number = null;
                                    return;
                                } else {
                                    let repeats = ele.repeat + ',' + success.repeat,
                                        weight = ele.weight + ',' + success.weight;
                                    ele.repeat = repeats;
                                    ele.weight = weight;
                                    this.successPrint(inputIndex);
                                }
                            }
                        })
                        console.log(this.target);
                    }
                }
            },
            // 成功打印
            successPrint(inputIndex) {
                this.$notify.success({
                    title : '成功',
                    message : `${this.listArr[inputIndex].goods_name}分拣成功！`
                })
                this.$send2("scw,play,order,ok",back=> {});
                this.pack_number = null;
                this.checkSuccess(inputIndex);
            },
            // 分拣成功
            checkSuccess(index) {
                this.listArr[index].pack_number ++;
                if (this.listArr[index].number === this.listArr[index].pack_number) {
                    // 移除的数组
                    let deleArr = this.listArr[index];
                    this.$refs.bar.$emit('remove',index,deleArr);
                    this.restArr(this.listArr,0);
                }
            },
            // chooseIndex重置初始化
            restArr(arr,index) {
                this.chooseIndex.sn = arr[index].sn;
                this.chooseIndex.dishName = arr[index].goods_name;
                this.chooseIndex.goods_id = arr[index].goods_id;
            },
            // 打印订单
            printOrder() {
                if (this.isPrint) {
                    this.upPrint();
                } else {
                    this.$confirm('订单分拣还未完成，无法打印订单！','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                }
            },
            async upPrint() {
                this.loading = true;
                let order = this.userInfo.group_id,
                    user = JSON.parse(window.localStorage.userInfo_system).name;
                this.$send(`scw,order,${order},${user}`, back => {})
                await print({data : {
                    group_id : order,
                    user : user,
                    weight : JSON.stringify(this.target)
                }})
            },
            // 关闭该订单
            close() {
                window.history.go(-1);
            }
        }
    }
</script>

<style scoped>
.el-aside {
    position: relative;
    float: left;
    width: 32% !important;
    height: 80vh;
    border-right: 1px solid #ccc;
}
.el-aside p {
    line-height: 30px;
    font-size: 16px;
    text-align: left;
}
.wx-aside > p .el-input--small {
    font-size: 26px;
}
.wx-print {
    position: absolute;
    bottom: 0;
    left: -20px;
    width: 100%;
    line-height: 150px;
}
.wx-print .el-button {
    padding: 15px 30px;
    font-size: 16px;
    width: 40%;
}
.wx-print .el-button--primary {
    display: block;
    width: 90%;
    margin: 0 auto;
}
.wx-rside {
    width: 65%;
    height: 80vh;
}
.wx-packdish {
    width: 100%;
    padding: 10px;
}
.wx-packdish p {
    line-height: 42px;
    font-size: 20px
}
</style>