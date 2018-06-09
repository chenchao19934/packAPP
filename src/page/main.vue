<template>
    <Main exit="true" back="true" titles="送菜蛙订单打包系统">
        <el-button type="primary" @click.native="$router.push({name : 'ChaoosePlat'})">返回</el-button>
        <div class="wx-head">
            <div class="block">
                <el-date-picker
                    v-model="value1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>

                <el-select v-model="region" placeholder="请选择分类">
                    <el-option label="全部"  value=""></el-option>
                    <el-option v-for="x in regionArr" 
                                :key="x.id"
                                :label="x.name" 
                                :value="x.id"></el-option>
                </el-select>

                <el-input v-model="goodsName" placeholder="商品名" @keyup.native.enter="search"></el-input>
            </div>
        </div>
        <div class="block wx-pagination" v-if="value1">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="15"
            layout="prev, pager, next, jumper"
            :total="totalPage">
            </el-pagination>
        </div>

        <ScrollBar @toPage="turnPage" :arr="list" v-loading="loading" v-if="value1"></ScrollBar>
    </Main>
</template>

<script>

    import Main from '@/components/main'
    import ScrollBar from '@/components/scroll'
    import {list} from '@/api/fetch'
    export default {
        components : {
            Main,
            ScrollBar
        },
        data() {
            return {
                value1: window.localStorage.date_system || '', // 日期
                currentPage : window.localStorage.pages_system/1 || 1,    //  请求页数-当前分页页数
                totalPage : 20,     // 总条数
                list : {},      //  商品数量
                region : '', // 类别
                regionArr : [], // 类别列表
                goodsName :'',
                loading : true, //  loading条
            }
        },
        watch : {
            value1(n,o) {
                this.setDate(n);
                this.getList();
            },
            region(n,o) {
                this.getList();
            }
        },
        activated() {
            this.getList();
        },
        methods : {
            // 当前页currentPage
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList();
            },
            // 页面初始化
            async getList() {
                this.loading = true;
                this.list = await list({
                    data : this.value1,
                    page : this.currentPage,
                    category : this.region,
                    goods_name : this.goodsName
                })
                if (this.list.count == 0) {
                    this.$notify.error({
                        title: '错误',
                        message: '暂无数据，请切换其他日期。'
                    })
                }else {
                    this.totalPage = this.list.count;
                    this.regionArr = this.list.category;
                }
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            search() {
                if (this.goodsName !== "") {
                    this.getList();
                }
            },
            // 监听子组件toPage
            turnPage(val) {
                this.currentPage = val;
                this.getList();
            },
            // 缓存当前日期
            setDate(date) {
                window.localStorage.setItem('date_system',date);
            }
        }
    }
</script>

<style scoped>
.el-button--medium {
    position: absolute;
    top: 5px;
    left: 100px;
}
.wx-head {
    position: relative;
    width: 100%;
    height: 80px;
    color: #fff;
    text-align: left;
}
.wx-head > div.block {
    line-height: 50px;
}
.block .el-input {
    width: auto;
}
.wx-pagination {
    position: absolute;
    right: 10px;
    top: 80px;
    height: 40px;
    text-align: right;
}
.wx-pagination .el-pagination {
    line-height: 35px;
}
.wx-flexWrap {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
    overflow-y: scroll;
}
.wx-flexWrap li {
    height: 166px;
    flex: 0 0 21%;
    box-shadow: 0 0 1px #ccc;
    margin: 2%;
}
</style>