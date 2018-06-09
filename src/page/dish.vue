<template>
    <Main exit="true" back="true" titles="送菜蛙订单打包系统">
        <el-aside width="200px" class="wx-aside">
            <p>{{dish.name}}<span>{{dish.goods_unit}}</span></p>
            <p style="line-height:60px"><span>计量单位：{{dish.unit}}</span></p>
            <div class="wx-btn">
                <router-link to="/Main">
                    <el-button  icon="el-icon-arrow-left" type="primary">回到列表页</el-button>
                </router-link>
                <el-button type="primary" @click.native="rePack">重新打包</el-button>
            </div>
            <p>
                <el-form>
                    <el-form-item label="注意事项">
                        <el-input type="textarea" 
                                    v-model="desc" 
                                    :disabled=true 
                                    rows="4"></el-input>
                    </el-form-item>
                </el-form>
            </p>
        </el-aside>
        <div class="wx-rside left">
            <div class="wx-rside__imgWrap">
                <img :src="dish.img" alt="">
            </div>
            <p style="width: 66%;margin: 0 auto;">
                <el-form label-width="150px">
                    <el-form-item label="应打包份数" style="margin-bottom:50px">
                        <el-input v-model="pack" :disabled=true></el-input>
                    </el-form-item>
                    <el-form-item label="已打包份数">
                        <el-input v-model="pack_finish" :disabled=true></el-input>
                    </el-form-item>
                    <el-form-item label="条码检验区" style="position: absolute;bottom: 0;">
                        <el-input v-model="pack_add" ref="inputautofocus"
                                @keyup.enter.native="comfimeOrder" 
                                autofocus=true></el-input>
                    </el-form-item>
                </el-form>
            </p>
        </div>
    </Main>
</template>

<script>
    import Main from '@/components/main'
    import {dish, dishAdd ,rePack} from '@/api/fetch'
    import { toDBC } from '../utils/mUtils'
    export default {
        components : {
            Main
        },
        data() {
            return {
                dish : Object,      // 商品详情
                desc : "轻拿轻放。",    //  描述
                pack : 100, //  需要打包份数
                pack_finish : 10,   //  已完成的打包数
                sn : 0,     //  商品条码
                pack_add : null     // 输入的条码
            }
        },
        created() {
            this.sn = this.$route.params.sn;
            this.pack = this.$route.params.pack;
            this.pack_finish = this.$route.params.pack_finish;
            this.initPage();
            this.$nextTick(()=> {
                this.$refs.inputautofocus.focus();
            })
        },
        methods : {
            async initPage() {
                let id = this.$route.params.id,
                    data = await dish({id:id});
                data[0].img = data[0].img + '?x-oss-process=image/resize,w_300/format,jpg/quality,Q_80';
                this.dish = data[0];
            },
            comfimeOrder() {
                setTimeout(() => {
                    this.addDish();
                }, 100);
            },
            async addDish() {
                let data = await dishAdd({
                    user : JSON.parse(window.localStorage.userInfo_system).name,
                    id : this.$route.params.id,
                    sn : this.pack_add
                })
                if (data.code === 44) {
                    this.$notify.error({
                        title : '错误',
                        message : data.message
                    })
                    if(data.message === "输入的条码已存在，重新扫码！") {
                        this.$send2("scw,play,package,recode",back=> {})
                    }else {
                        this.$send2("scw,play,package,wrongcode",back=> {})
                    }
                } else {
                    this.$notify({
                        title : '成功',
                        message : '打包成功。',
                        type : 'success'
                    })
                    this.pack_finish = data.count;
                    this.sendToCall(data.count+1);
                }
                this.pack_add = null;
            },
            sendToCall(count) {
                let sn = count+100 + this.sn,
                    user = JSON.parse(window.localStorage.userInfo_system).name;
                console.log(sn);
                name = toDBC(this.dish.name);
                this.$send(`scw,package,${localStorage.call_system},${sn},${this.dish.unit},${name},${user}`, back => {
                    if (back === "error") {
                        this.$notify.error({
                            title : '错误',
                            message : 'socket连接异常，请联系管理员！'
                        })
                    }else {
                        this.$send2("scw,play,package,ok",back=> {});
                    }
                })
            },
            // 重新打包
            async rePack() {
                await rePack({
                    user : JSON.parse(window.localStorage.userInfo_system).name,
                    goods_id : this.$route.params.id
                }).then(res=> {
                    if (res.code === 44) {
                        this.$notify.error({
                            title : '错误',
                            message : res.message
                        })   
                    }else {
                        this.$notify({
                            title : '成功',
                            message : res.message,
                            type : 'success'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
.el-aside {
    position: relative;
    float: left;
    width: 45% !important;
    height: 80vh;
    border-right: 1px solid #ccc;
}
.wx-rside {
    position: relative;
    width: 53% !important;
    height: 80vh;
}
.wx-rside__imgWrap {
    width: 50%;
    height: 2.4rem;
    margin: 0 auto 30px;
    background-color: #ccc;
    overflow: hidden;
}
.wx-rside__imgWrap img {
    display: block;
    width: 100%;
}
.wx-btn {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: left;
    padding-left: 12%;
    line-height: 60px;
}
.wx-btn .el-button {
    font-size: 18px;
}
.wx-aside p {
    font-size: 26px;
    padding: 0 12%;
    line-height: 100px
}
.wx-aside p .el-input--small {
    font-size: 16px;
}
.wx-aside p span {
    font-size: 20px
}
</style>