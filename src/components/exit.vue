<template>
    <div class="wx-exit">
        <span>当前用户账户：{{user}}</span>
        <!-- <span>退出登录</span> -->
        <el-button @click.native="backLogin" type="primary">退出登录</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user : null
            }
        },
        created() {
            if(window.localStorage.userInfo_system == undefined || window.localStorage.userInfo_system == "") {
                this.user = null
            }else {
                this.user = JSON.parse(window.localStorage.userInfo_system).name
            }
        },
        methods : {
            backLogin() {
                this.$emit('backLogins');
            }
        }
    }
</script>

<style scoped>
    .wx-exit {
        position: absolute;
        top: 0;
        right: 15px;
        font-size: 16px;
        color: #fff;
    }
    .wx-exit span {
        padding-right: 15px;
    }
</style>