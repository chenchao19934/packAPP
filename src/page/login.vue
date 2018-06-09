<template>
    <Main back="true">
        <div class="wx-reset">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="name">
                <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" 
                    @keyup.enter.native="submitForm(ruleForm)"
                    auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" 
                    @click="submitForm(ruleForm)" >登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </Main>
</template>

<script>
    import Main from '@/components/main'
    import { Login } from '@/api/fetch'
    export default {
        components : {
            Main,
        },
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    if (this.ruleForm.pass !== '') {
                        this.$refs.ruleForm.validateField('pass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',
                    pass: ''
                },
                rules : {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods : {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async submitForm(formName) {
                if (formName.name === '' && formName.pass === '') {
                    return
                }else {
                    let loginState = await Login({
                        userName : formName.name,
                        passWord : formName.pass
                    })
                    if(loginState == 0) {
                        this.$notify.error({
                            title: '错误',
                            message: '用户名密码错误！'
                        });
                        setTimeout(()=> {
                            this.resetForm('ruleForm');
                        },1500)
                    }else {
                        this.$notify({
                            title: '成功',
                            message: '登录成功！',
                            type: 'success'
                        });
                        window.localStorage.setItem('userInfo_system',JSON.stringify(this.ruleForm));
                        window.localStorage.setItem('loginTime',new Date().getTime());
                        this.$router.push({name : 'ChaoosePlat'});
                    }
                }
            }
        }
    }
</script>

<style scoped>
.wx-reset {
    width: 50%;
    margin: 20% auto 0;
}
p {
    font-size: 24px;
}
</style>