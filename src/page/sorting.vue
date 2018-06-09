<template>
    <Main exit="true" back="true" titles="送菜蛙订单分拣系统">
        <p>
            <el-form @submit.native.prevent>
                <el-form-item label="订单号">
                    <el-input v-model="pack_add" ref="focusOrder"
                            @keyup.enter.native="comfimeOrder" 
                            autofocus=true
                            :placeholder="sn"></el-input>
                </el-form-item>
            </el-form>
        </p>
    </Main>
</template>

<script>

    import Main from '@/components/main'
    import {chackOrder} from '@/api/fetch'
    export default {
        components : {
            Main,
        },
        data() {
            return {
                pack_add : null,
                sn : '请输入订单哈！'
            }
        },
        created() {
            this.$nextTick(()=> {
                this.$refs.focusOrder.focus();
            })
        },
        methods : {
            // 回车提交
            comfimeOrder() {
                this.checkOrder();
            },
            // 查验订单是否合法
            async checkOrder() {
                let data = await chackOrder({
                    orderId : this.pack_add
                })
                if (data.code == 44) {
                    this.$notify.error({
                        title : '错误',
                        message : data.message
                    })
                    this.pack_add = null;
                }else if(data.code == 100){
                    this.$confirm(data.message,'提示',{
                        type : 'warning'
                    }).then(action => {
                        this.$router.push({name : 'Order', params : {orderId : this.pack_add}})
                    }).catch(()=> { this.pack_add = null;})
                }else {   
                    this.$router.push({name : 'Order', params : {orderId : this.pack_add}})
                }
            }
        }
    }
</script>

<style scoped>
    p {
        padding: 2rem 26% 0;
    }
</style>