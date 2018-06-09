<template>
    <Main>
        <div class="wx-home">
            <div class="load-home" 
                    v-loading="loading"
                    element-loading-text="连接中。。。"
                    element-loading-spinner="el-icon-loading">

            </div>
            <!-- <span class="wx-loading" 
                v-loading="loading"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)"></span> -->

            <el-row :gutter="10">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content"></div></el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <el-button type="danger" @click="toReste">重新设置IP地址</el-button>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <el-button type="success" @click.native="link">重新连接</el-button>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content"></div></el-col>
            </el-row>
        </div>
    </Main>
</template>

<script>
    import Main from '@/components/main'
    import {initSocket} from '../utils/websocket'
    export default {
        components : {
            Main,
        },
        data() {
            return {
                loading : true
            }
        },
        created() {
            this.$nextTick(()=> {
                this.resetLoaing();
                this.$webSocket.onmessage = event => {
                    let data = this.$Base64.decode(event.data);
                    if (data === 'ipok') {
                        if(localStorage.userInfo_system) {
                            this.$router.push({name : 'ChaoosePlat'})
                        }else {
                            this.$router.push({name : 'Login'})
                        }
                    }else {
                        this.$notify.error({
                            title : '错误',
                            message : '秤连接失败！'
                        })
                    }
                }
            })
        },
        destroyed() {
            this.$webSocket.onmessage = null;
        },
        methods : {
            resetLoaing() {
                if (localStorage.call_system) {
                    this.$send(`scw,ip,${localStorage.call_system}`,data => {});
                }else {
                    // 未设置打印成IP
                    this.$notify.error({
                        title : '错误',
                        message : '未设置称的IP地址'
                    })
                }
            },
            toReste() {
                this.$router.push({name : 'Link'})
            },
            link() {
                this.resetLoaing();
            }
        }
    }
</script>

<style scoped>
.wx-home {
    height: 80vh;
}
.load-home {
    height: 2.5rem;
    line-height: 60px;
    font-size: 26px;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>