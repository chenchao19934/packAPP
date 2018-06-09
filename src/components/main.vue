<template>
  <el-container>
    <el-header style="height:45px">
	  <Exit @backLogins="exitLogin" v-if="exit"></Exit>
      <span @click="backTop" v-if="back"><i class="el-icon-arrow-left"></i></span>
      {{titles}}
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer style="height:45px">深圳市警蛙科技有限公司</el-footer>
  </el-container>
</template>

<script>
import Exit from "./exit";
export default {
  components: {
    Exit
  },
  props: {
    back: String,
	exit: String,
	titles : {
		type : String,
		default : '送菜蛙订单打包分拣系统'
	}
  },
  methods: {
    backTop() {
      window.history.go(-1);
	},
	exitLogin() {
		this.$confirm('确定要退出登录？','提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			window.localStorage.userInfo_system = "";
			this.$router.push({name : 'Login'});
		}).catch(() => {

		})
	}
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-header > span {
  position: absolute;
  left: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 30px;
}
.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
