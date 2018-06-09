<template>
    <Main exit="true" back="true" titles="区域订单打印" v-loading="loading">
        <div class="wx-head">
            <el-date-picker
            v-model="chooseDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
            </el-date-picker>
        </div>

        <div class="wx-select">
            <el-checkbox-group
                size="medium"
                :max="1"
                v-model="checkboxGroup1">
                <el-checkbox  @click.native.prevent="changeTag(city.name)" 
                                v-for="city in area" 
                                :label="city.name" 
                                :key="city.name">区域：{{city.name}}|单数：{{city.number}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="wx-input" style="line-height: 60px;">
            <div>
                <el-input
                    placeholder="请输入内容"
                    v-model="groupId"
                    clearable>
                </el-input>
            </div>
            <div>
                <el-button type="danger" @click="print">打印</el-button>
            </div>
        </div>
    </Main>
</template>

<script>

    import Main from '@/components/main'
    import ScrollBar from '@/components/scroll'
    import {area,areaList} from '@/api/fetch'
    export default {
        components : {
            Main,
        },
        data() {
            return {
                chooseDate : "",        //  选中日期
                checkboxGroup1 : [],    //  选中区域
                orderArr : [],          //  当前订单类表
                isFinish :0,            //  打印完成情况
                loading : false,        //  加载进度
                groupId : "",           //  输入的订单
                area : {},
                socketLink : null
            }
        },
        // created() {
        //     this.$webSocket.onmessage = event => {
        //         let data = this.$Base64.decode(event.data);
        //         if(data == 'over') {
        //             this.isFinish ++;
        //             this.successPrint(this.isFinish);
        //         }else{
        //             this.loading = false;
        //             this.$notify.error({
        //                 title : '错误',
        //                 message : '订单打印失败，请重新打印！'
        //             })
        //         }
        //     }
        // },
        // destroyed() {
        //     this.$webSocket.onmessage = null
        // },
        watch: {
            chooseDate() {
                this.getArea();
            }
        },
        methods : {
            // 选中区域
            changeTag(city) {
                this.checkboxGroup1 = [];
                this.checkboxGroup1.push(city);
            },
            // 打印区域总订单
            async print() {
                if (this.checkboxGroup1.length != 0 && this.chooseDate != "") {
                    this.orderArr = await area({
                        date : this.chooseDate,
                        region : this.checkboxGroup1[0],
                        orderID : this.groupId
                    })
                    if (this.orderArr.length === 0) {
                        this.$notify.error({
                            title : '错误',
                            message : '改区域暂无订单！'
                        })
                    }else {
                        this.successPrint(this.isFinish);
                    }
                }else {
                    this.$notify.error({
                        title : '错误',
                        message : '必须选中日期和区域！'
                    })
                }
            },
            // // 打印订单调用
            // successPrint(index) {
            //     this.loading = true;
            //     let user = JSON.parse(window.localStorage.userInfo_system).name,
            //         orders = this.orderArr[index];
            //     if (index === this.orderArr.length) {
            //         this.loading = false;
            //         this.isFinish = 0;
            //         return
            //     }else {
            //         this.$send(`scw,orderLite,${orders},${user}`, back => {
            //             if (back === "error") {
            //                 this.$notify.error({
            //                     title : '错误',
            //                     message : 'socket连接异常，请联系管理员！'
            //                 })
            //             }
            //         })
            //     }
            // },

            successPrint(index) {
                this.loading = true;
                let user = JSON.parse(window.localStorage.userInfo_system).name,
                    orders = this.orderArr[index];
                if (index === this.orderArr.length) {
                    this.loading = false;
                    this.isFinish = 0;
                    return;
                }else{
                    var ws = new WebSocket("ws://127.0.0.1:60000/");
                    ws.onopen = evt => { 
                        ws.send(this.$Base64.encode(`scw,orderLite,${orders},${user}`));
                    };
                    ws.onmessage = evt => {
                        let data = this.$Base64.decode(evt.data);
                        if (data === 'over') {
                            ws.close();
                            this.isFinish ++;
                            this.successPrint(this.isFinish);
                        }
                    }; 
                }
            },

            // 获取打印区域
            async getArea() {
                this.area = await areaList({
                    date : this.chooseDate
                })
                if (this.area.length === 0) {
                    this.$notify.error({
                        title : '错误',
                        message : '选中日期暂无打印订单，请切换日期！'
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .wx-head {
        line-height: 50px;
        margin: 50px 0 100px;
    }
    .wx-input {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .wx-input > div {
        flex: 0 0 30%;
    }
    .wx-select .el-checkbox-group {
        line-height: 60px;
    }
    .wx-select .el-checkbox-group .el-checkbox span.el-checkbox__label {
        font-size: 20px;
    }
    .el-button--medium {
        font-size: 18px;
    }
</style>