<template>
    <Main exit="true">
        <p>&nbsp</p>
        <div class="wx-btn">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                    <router-link to="/Main">
                        <el-button type="primary">送菜蛙打包系统</el-button>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/Sorting">
                        <el-button type="primary">送菜蛙分拣系统</el-button>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/Area">
                        <el-button type="primary">区域订单打印</el-button>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </Main>
</template>

<script>

    import Main from '@/components/main'
    import ScrollBar from '@/components/scroll'
    import {list} from '@/api/fetch'
    export default {
        components : {
            Main,
        }
    }
</script>

<style scoped>
    .wx-btn .el-button{
        font-size: 20px;
    }
</style>