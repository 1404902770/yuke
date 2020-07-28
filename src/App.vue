<template>
  <div id="app">
    <el-container>
      <el-header>
        <headnav :menu="menu"></headnav>
      </el-header>
      <el-container class="shell1">
        <el-aside width="220px" class="kgLeft1">
          <asideshell @updatemenu="goto"></asideshell>
        </el-aside>
        <el-main>
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headnav from "./components/headnav";
import asideshell from "./components/aside";

export default {
  name: "app",
  data() {
    return {
      menu: {}
    };
  },

  methods: {
    goto(val) {
      // console.log(val);
      this.menu = val;
    }
  },
  components: {
    headnav,
    asideshell
  }
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    .shell1 {
      height: 60%;
      ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #dddee0;
      }
      ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
    }
    .el-header {
      padding: 0 0 !important;
    }
    .el-aside {
      text-align: center;
      height: 100%;
      border-right: 1px solid #e6e6e6;
      overflow-x: hidden;
    }
    .el-container {
      height: 100%;
    }
  }
}

.slide-fade {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  // background-color: white;
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  // top: 0;
  right: 0;
  position: absolute;
  transform: translateX(-200px) translateY(0px) scale(0.5);
  opacity: 0;
}
.slide-fade-enter-active {
  // background-color: white;
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
  // background-color: white;
  transform: translateX(200px) translateY(0px) scale(1);
  z-index: 100;
}
</style>
