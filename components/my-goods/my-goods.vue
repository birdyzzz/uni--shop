<template>
  <view class="goods-list">
    <view class="goods-item" >
      <view class="left-box"><image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image></view>
      <view class="right-box">
        <view class="goods-title">{{ goods.goods_name }}</view>
        <view class="goods-info">
          <view class="goods-price">￥{{ goods.goods_price | tofixed}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-goods',
  props:{
    goods: {
      type: Object,
      default:{}
    }
  },
  filters:{
    tofixed(n) {
      return (Number(n) + 0.99)
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    };
  }
};
</script>

<style lang="scss">
.goods-list {
  background-color: #fff;
  .goods-item {
    display: flex;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    .left-box {
      margin-right: 5px;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .right-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-title {
        font-size: 13px;
      }
      .goods-price {
        font-size: 15px;
        color: #ff5a5f;
      }
    }
  }
}
</style>
