<template>
  <view>
    <my-search @click="goToSearch"></my-search>
    <view class="scroll-view-container">
      <scroll-view scroll-y :style="{ height: wh + 'px' }" class="left-scroll">
        <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-item', i === active ? 'active' : '']" @click="cat_name_handler(i)">{{ item.cat_name }}</view>
        </block>
      </scroll-view>

      <scroll-view scroll-y :style="{ height: wh + 'px' }" class="right-scroll" :scroll-top="scrollTop">
        <block v-for="(item2, i2) in cateLevel2" :key="i2">
          <view class="cat-level2-title">{{ item2.cat_name }}</view>

          <!-- 三级分类列表 -->
          <view class="cat-level3-list">
            <view class="cat-level3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="goToGoodsList(item3)">
              <image :src="item3.cat_icon" mode=""></image>
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import cartBadge from '@/mixins/tabbar-badge.js';
export default {
  mixins: [cartBadge],
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel2: [],
      scrollTop: 0
    };
  },
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories');
      if (res.meta.status !== 200) return uni.msg();
      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
    },

    cat_name_handler(i) {
      this.active = i;
      this.cateLevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop ? 0 : 0.01;
    },
    goToGoodsList(i) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?cid=' + i.cat_id
      });
    },
    goToSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      });
    }
  },
  onLoad() {
    this.wh = uni.getSystemInfoSync().windowHeight - 50;
    this.getCateList();
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll {
    width: 120px;
    .left-scroll-item {
      line-height: 60px;
      font-size: 12px;
      text-align: center;
      background-color: #eeeeee;
      &.active {
        background-color: #ffffff;
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 3px;
          height: 80%;
          background-color: #ff5a5f;
        }
      }
    }
  }
  .right-scroll {
    background-color: #ffffff;
    .cat-level2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cat-level3-list {
      display: flex;
      flex-wrap: wrap;
      .cat-level3-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33.333%;
        margin-bottom: 10px;
        image {
          width: 60px;
          height: 60px;
        }
        text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
