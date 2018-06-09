<template>
  <div id="app">
    <!-- <router-view style="height:100vh"></router-view> -->
    <keep-alive>
			<router-view style="height:100%" v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view style="height:100%" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
  line-height: 38px;
}
.el-form-item__label {
  font-size: 20px;
}
.el-input__suffix {
  font-size: 20px;
}
.el-pager li {
  font-size: 20px;
}
.el-input--small .el-input__icon {
  font-size: 20px;
}
.el-carousel__container {
    height: 66vh;
}
.load-home .el-loading-spinner {
    font-size: 46px;
}
.load-home .el-loading-spinner .el-loading-text {
    font-size: 24px;
}
.el-carousel__arrow {
    height: 50px;
    width: 50px;
    background: #000;
}
.el-textarea.is-disabled .el-textarea__inner, .el-input.is-disabled .el-input__inner {
  color: crimson;
  font-size: 20px;
}
.el-input.is-disabled .el-input__inner {
  font-size: 26px;
}
.el-checkbox+.el-checkbox {
  margin-left: 38px;
}
.el-checkbox__label {
  font-size: 18px
}
.el-input__inner {
  border-color: #000
}
.el-select-dropdown__wrap {
    max-height: 345px;
}
</style>
