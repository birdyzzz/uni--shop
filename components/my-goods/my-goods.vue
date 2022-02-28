<template>
  <view class="goods-list">
    <view class="goods-item">
      <view class="left-box">
        <radio :checked="goods.goods_state" color="#ff5a5f" v-if="showRadio" @click="radioClick" />
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <view class="right-box">
        <view class="goods-title">{{ goods.goods_name }}</view>
        <view class="goods-info">
          <view class="goods-price">￥{{ goods.goods_price | tofixed }}</view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="countChangeHandler"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-goods',
  props: {
    goods: {
      type: Object,
      default: {}
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    tofixed(n) {
      return Number(n).toFixed(2);
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    };
  },
  methods: {
    radioClick() {
      this.$emit('radioChange', {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state
      });
    },
    countChangeHandler(val) {
      console.log(val);
      this.$emit('countChange', {
        goods_id: this.goods.goods_id,
        goods_count: +val
      });
    }
  }
};
</script>

<style lang="scss">
.goods-list {
  background-color: #fff;
  .goods-item {
    display: flex;
    width: 750rpx;
    box-sizing: border-box;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    .left-box {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .right-box {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .goods-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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
