<template>
  <el-container>
    <el-aside width="240px" v-if="leftSiderDir">
      <div class="aside-tit">
        <i class="logo-small-icon"></i>电梯物联监控中心</div>
      <el-col>
        <el-menu :defaultActive="index"
                 class="el-menu-vertical-demo"
                 @close="handleClose"
                 background-color="#0a6fc1"
                 text-color="#fff"
                 active-text-color="#fff">
          <el-menu-item index="1">
            <template slot="title">
              <router-link tag="a"
                           :to="{name:'index'}">
                <i class="u-slide-icon s-home-icon"></i>
                <span>
                  首页
                </span>
              </router-link>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link tag="a"
                         :to="{name:'shebei'}">
              <i class="u-slide-icon s-facility-icon"></i>
              <span>
                设备管理
              </span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="u-slide-icon s-urgency-icon"></i>
            <span slot="title">紧急情况处理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="u-slide-icon s-loop-icon"></i>
            <span slot="title">微信用户管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="u-slide-icon s-function-icon"></i>
            <span slot="title">功能管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-tit"><i class="el-icon-share" @click="showLeft"></i>&nbsp;首页</div>
        <div class="m-head-handle">
          <div class="handle-col">
            <el-badge :value="5"
                      class="item">
              <i class="el-icon-message-solid"></i>
            </el-badge>
          </div>
          <div class="handle-col">
            <i class="el-icon-switch-button"></i>
          </div>
          <div class="user-face">
            <img src="../../assets/images/face.png"
                 alt="">
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import cookies from '../../common/utils/cookies.js';
export default {
    data() {
        return {
            index: '0',
            leftSiderDir:true,
        }
    },
    methods: {
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        showLeft(){
            this.leftSiderDir = !this.leftSiderDir;
        }
    },
    watch: {
        $route(to, from) {
            if (to.path.indexOf('/shebei/') > -1) {
                this.index = '2';
            } else if (to.path.indexOf('/houtai/index') > -1) {
                this.index = '1';
            }

        }
    },
    created() {

        if (!cookies.get('userInfo')) {
            this.$router.push({ name: 'login' });
        }
        if (location.href.indexOf('/shebei/') > -1) {
            this.index = '2';
        } else if (location.href.indexOf('/houtai/index') > -1) {
            this.index = '1';
        }
    }
}
</script>

<style lang="scss">
.el-header {
    padding-left:30px !important;
}
</style>
