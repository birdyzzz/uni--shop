<template>
  <view>
    <view class="search-container">
      <my-search @click="goToSearch"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" :indicator-active-color="white">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"><image :src="item.image_src"></image></navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)"><image :src="item.image_src"></image></view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层的item项 -->
      <view class="floor-title" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="title-img"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧 -->
          <navigator class="left-img-box" :url="item.product_list[0].url"><image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"></image></navigator>
          <!-- 右侧 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{ width: item2.image_width + 'rpx' }" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  methods: {
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
      if (res.meta.status !== 200) return uni.msg();
      this.swiperList = res.message;
    },
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
      if (res.meta.status !== 200) return uni.msg();
      this.navList = res.message;
    },
    navClickHandler(item) {
      if (item.open_type) {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    },
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
      if (res.meta.status !== 200) return uni.msg();
      res.message.forEach(floor => {
        floor.product_list.forEach(product => {
          product.url = '/subpkg/goods_list/goods_list?' + product.navigator_url.split('?')[1];
        });
      });
      this.floorList = res.message;
    },
    goToSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    }
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  }
};
</script>
<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  image {
    width: 128rpx;
    height: 140rpx;
  }
}
.title-img {
  display: block;
  height: 60rpx;
  width: 100%;
}
.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.left-img-box image {
  height: 97%;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.search-container {
  position: sticky;
  top: 0;
  // z-index: 999;
}
</style>
