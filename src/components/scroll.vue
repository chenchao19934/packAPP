<template>
    <!-- v-swiperight="sRight"  v-swipeleft="sLeft" -->
    <el-carousel ref="carousel" 
            arrow="always" 
            :autoplay="false" 
            indicator-position="none"
            @change="changePage">
        <el-carousel-item v-for="item in arr.zong" 
                        :key="item" 
                        name="item">
            <li class="ellipsis" v-for="(item,index) in arr.list" 
                                :key="index" 
                                @click="toDetial(item.id,item.sn,item.number,item.pack_number,item.unit,item.name)"
                                :class="{'out' : item.number < item.pack_number, 'success' : item.number == item.pack_number}">
                <p class="ellipsis">
                    {{item.name}}
                </p>
                <p>{{item.goods_unit}}/{{item.stock_unit}}</p>
                <span>{{item.pack_number}}/{{item.number}}</span>
            </li>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    import { toDBC } from '../utils/mUtils'
    export default {
        props : {
            arr : {
                type : Object
            }
        },
        data() {
            return {
                nowPage : 0
            }
        },
        created() {
            this.$nextTick(()=> {
                document.addEventListener('keydown', (e) => {
                    if (e.keyCode == 37) {
                        this.nowPage --;
                        if (this.nowPage < 0) {
                            this.nowPage = this.arr.zong-1
                        }
                        setTimeout(() => {
                            this.$refs.carousel.setActiveItem(this.nowPage);
                        }, 300);
                    }else if(e.keyCode == 39) {
                        this.nowPage ++;
                        if (this.nowPage > this.arr.zong) {
                            this.nowPage = 0
                        }
                        setTimeout(() => {
                            this.$refs.carousel.setActiveItem(this.nowPage);
                        }, 300);
                    }
                })
            })
        },
        methods : {
            changePage(n,o) {
                this.nowPage = n;
                if (o !== -1) {
                    this.$emit('toPage',n+1);
                }
            },
            toDetial(id,sn,pack,pack_finish,unit,name) {
                let user = JSON.parse(window.localStorage.userInfo_system).name,
                    changeSn = pack_finish*1+101 + sn;
                name = toDBC(name);
                console.log(changeSn);
                this.$send(`scw,package,${localStorage.call_system},${changeSn},${unit},${name},${user}`, back => {
                    if (back === "error") {
                        this.$notify.error({
                            title : '错误',
                            message : 'socket连接异常，请联系管理员！'
                        })
                    }
                })
                this.$router.push({name : 'Dish', params : {id : id,sn : sn,pack : pack,pack_finish:pack_finish}})
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item {
        display: flex;
        flex-wrap: wrap;
        padding: 6px;
    }
    .el-carousel__item li {
        position: relative;
        flex: 0 0 18%;
        margin: 1%;
        box-shadow: 0 0 1px #ccc;
        height: 0.9rem;
        cursor: pointer;
    }
    .el-carousel__item li p {
        font-size: 16px;
        line-height: 38px;
    }
    .el-carousel__item li span {
        position: absolute;
        right: 5px;
        bottom: 5px;
        line-height: 30px;
        font-size: 18px;
    }
    .el-carousel__item li.out {
        background-color: crimson;
        color: #fff;
    }
    .el-carousel__item li.success {
        background-color: aquamarine;
    }
</style>