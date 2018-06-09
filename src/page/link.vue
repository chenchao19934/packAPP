<template>
    <Main back="true">
        <div class="wx-reset">
            <el-form ref="form" @submit.native.prevent :model="form" label-width="250px">
                <el-form-item label="输入此台秤的IP地址">
                    <el-input type="text" v-model="form.IP" :placeholder="form.demoIp" @keyup.enter.native="saveIP"></el-input>
                </el-form-item>
                
                <el-button type="primary" size="medium" @click.native="saveIP">确定</el-button>

                <el-form-item label="IP地址查看说明">
                    <p>{{form.desc}}</p>
                </el-form-item>
            </el-form>
        </div>
    </Main>
</template>

<script>
    import Main from '@/components/main'
    export default {
        components : {
            Main,
        },
        data() {
            return {
                form : {
                    IP: '',
                    demoIp : '192.168.2.65:60000',
                    desc : '一次按下：功能->9002->确认->去皮'
                }
            }
        },
        methods : {
            saveIP() {
                window.localStorage.call_system = this.form.IP;
                window.history.back(-1);
            }
        }
    }
</script>

<style scoped>
.wx-reset {
    width: 50%;
    margin: 20% auto 0;
}
</style>