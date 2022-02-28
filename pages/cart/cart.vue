<template>
  <view class="cart-box">
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" :showNum="true" @radioChange="radioChange" @countChange="countChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <view class="none-goods" v-if="!cart.length">这里空空如也, 去浏览更多商品吧!</view>
    <my-settle></my-settle>
  </view>
</template>

<script>
import cartBadge from '@/mixins/tabbar-badge.js';
import { mapState, mapMutations } from 'vuex';
export default {
  mixins: [cartBadge],
  computed: {
    ...mapState('m_cart', ['cart'])
  },
  data() {
    return {
      options: [
        {
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations('m_cart', ['updateCartGoodsState', 'updateCartGoodsCount', 'removeGoodsById']),
    radioChange(goods) {
      this.updateCartGoodsState(goods);
    },
    countChange(goods) {
      this.updateCartGoodsCount(goods);
    },
    swipeActionClickHandler(goods) {
      this.removeGoodsById(goods.goods_id);
    }
  }
};
</script>

<style lang="scss">
.cart-box {
  position: relative;
  min-height: 500px;
  padding-bottom: 50px;
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;
    .cart-title-text {
      margin-left: 10px;
    }
  }
  .none-goods {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #ccc;
    
  }
}
</style>
