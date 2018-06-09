<template>
    <div class="wx-scrollBar">
        <transition-group name="list">
            <li v-for="(item,index) in dishArr"
                :class="{'activeIndex' : activeIndex ==index,'success' : item.number == item.pack_number}"
                @click="changeIndex(index,item.goods_id,item.sn,item.goods_name)"
                :key="item.goods_id">
                <p class="ellipsis">{{item.goods_name}}</p>
                <p class="ellipsis">规格：{{item.goods_unit}}</p>
                <span>{{item.pack_number}}/{{item.number}}</span>
            </li>
        </transition-group>
    </div>
</template>

<script>
    export default {
        props : {
            dishArr : {
                type : Array
            }
        },
        data() {
            return {
                activeIndex : 0
            }
        },
        created() {
            this.$on('remove', this.removeArr)
        },
        beforeDestroy() {
            this.$off('remove',this.removeArr)
        },
        methods :{
            changeIndex(index,goods_id,sn,name) {
                this.activeIndex = index;
                this.$emit('changeDish',goods_id,sn,name)
            },
            removeArr(index,arr) {
                this.dishArr.splice(index,1);
                setTimeout(()=> {
                    this.dishArr.push(arr);
                },1000)
            }
        }
    }
</script>

<style scoped>
.wx-scrollBar {
    width: 100%;
    padding: 10px;
    height: 90%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.wx-scrollBar ul {
    display: flex;
    flex-wrap: wrap;
}
.wx-scrollBar span {
    display: flex;
    flex-wrap: wrap;
}
.wx-scrollBar span li {
    position: relative;
    flex: 0 0 18%;
    margin: 1%;
    padding: 1%;
    height: 0.9rem;
    box-shadow: 0 0 1px #ccc;
    cursor: pointer;
    line-height: normal;
    overflow: hidden;
}
.wx-scrollBar li p {
    font-size: 14px;
    line-height: 36px;
    text-align: left;
}
.wx-scrollBar li span {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 30px;
    font-size: 20px;
}
.wx-scrollBar li.success {
    background-color: #409EFF;
}
.wx-scrollBar li.activeIndex {
    background-color: aquamarine;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(180px);    
}
</style>