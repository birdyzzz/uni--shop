<template>
  <view class="goods-detail-container" v-if="goods_info.goods_price">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i"><image :src="item.pics_big" @click="preview(i)"></image></swiper-item>
    </swiper>
    <view class="goods-info-box">
      <view class="price">￥{{ goods_info.goods_price }}.98</view>
      <view class="goods-info-body">
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <view class="colect">
          <uni-icons type="star"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="express">快递:免运费</view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods_nav"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods_info: [],
      // 左侧按钮组的配置对象
      options: [
        {
          icon: 'shop',
          text: '店铺'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 2
        }
      ],
      // 右侧按钮组的配置对象
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    };
  },
  methods: {
    async getGoodsInfo(id) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id: id });
      if (res.meta.status !== 200) return uni.msg();
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display: block;"').replace(/webp/g, 'jpg');
      this.goods_info = res.message;
    },
    preview(i) {
      uni.previewImage({
        current: i,
        urls: this.goods_info.pics.map(x => x.pics_big)
      });
    },
    onClick(e) {
      console.log(e);
      if (e.content.text === '购物车') {
        uni.switchTab({
          url: '../../pages/cart/cart'
        });
      }
    },
    buttonClick(e) {
      console.log(e);
    }
  },
  onLoad(options) {
    const id = options.goods_id;
    this.getGoodsInfo(id);
  }
};
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .colect {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .express {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail-container {
  padding-bottom: 50px;
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
