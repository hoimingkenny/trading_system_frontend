<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"

        unique-opened
        router

        :collapse="collapse"
        :default-active="onRoutes"
    >
      <template v-for="item in items">
        <!-- 有下拉菜单-->
        <template v-if="item.subs">
          <!-- 子菜单-->
          <el-submenu :index="item.index" :key="item.index">
            <!-- 提示项-->
            <template slot="title">
              <i :class="item.icon"/>
              <span slot="title">{{item.title}}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                {{subItem.title}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 普通item-->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"/>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-pie-chart',
          index: 'dashboard',
          title: 'Position'
        },
        {
          icon: 'el-icon-s-order',
          index: 'buy',
          title: 'Buy'
        },
        {
          icon: 'el-icon-sell',
          index: 'sell',
          title: 'Sell'
        },
        {
          icon: 'el-icon-search',
          index: '3',
          title: 'Search',
          subs: [
            {
              index: 'orderquery',
              title: '当日委托'
            },
            {
              index: 'tradequery',
              title: '当日成交'
            },
            {
              index: 'hisorderquery',
              title: '历史委托'
            },
            {
              index: 'histradequery',
              title: '历史成交'
            },
          ]
        },
        {
          icon: 'el-icon-bank-card',
          index: '4',
          title: 'Bank Transcation',
          subs: [
            {
              index: 'transfer',
              title: 'Transfer'
            },
            {
              index: 'transferquery',
              title: 'Transfer Query'
            },
          ]
        },
        {
          icon: 'el-icon-setting',
          index: 'pwdsetting',
          title: 'Change Password'
        },
      ]
    }
  },
  computed: {
    // http://localhost:8080/dashboard
    // "dashboard"
    onRoutes() {
      return this.$route.path.replace('/', '');
    },
  },
  methods:{
    collapseChange(msg){
      this.collapse = msg;
      this.$bus.emit("collapse-content",msg);
    }
  },
  created(){
    // subscript collapse data
    this.$bus.on("collapse",msg =>{
      this.collapseChange(msg);
    });
  },
  beforeDestroy(){
    this.$bus.off("collapse",msg =>{
      this.collapseChange(msg);
    });
  }
}
</script>

<style lang="scss">
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;

  .el-menu-item {
    min-width: 200px;
  }

  li {
    text-align: left;
    .el-tooltip {
      width: auto ! important;
    }
  }

  /*下拉导航菜单多出1px*/
  .el-menu {
    border-right-width: 0;
  }

  .el-menu--collapse {
    width: auto ! important;
  }
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.sidebar > ul {
  height: 100%;
}
</style>