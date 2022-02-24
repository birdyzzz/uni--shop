<template>
  <view>
    <view class="search-container" :style="{'background-color': bgc}">
      <view class="search-box" :style="{'border-radius': radius + 'px'}" @click="serchBoxHandler">
        <uni-icons type="search" class="icon-search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-search',
  data() {
    return {};
  },
  props: {
    bgc: {
      type: String,
      default: '#ff5a5f'
    },

    radius: {
      type: Number,
      default: 15
    }
  },
  methods:{
    serchBoxHandler() {
      this.$emit('click')
    }
  }
};
</script>

<style lang="scss">
.search-container {
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;

  .search-box {
    background-color: #fff;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      padding-left: 5px;
    }
  }
}
</style>
