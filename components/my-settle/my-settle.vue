<template>
  <view>
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
      <!-- 全选区域 -->
      <label class="radio" @click="changeAllCheckedState">
        <radio color="#C00000" :checked="isAllChecked" />
        <text>全选</text>
      </label>

      <!-- 合计区域 -->
      <view class="amount-box">
        合计:
        <text class="amount">￥{{ checkedGoodsAmount }}</text>
      </view>

      <!-- 结算按钮 -->
      <view class="btn-settle" @click="settlement">结算 {{ checkedCount }} 件商品</view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
  name: 'my-settle',
  data() {
    return {
      seconds: 3,
      timer: null
    };
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodsState']),
    ...mapMutations('m_user', ['updateRedirectInfo']),
    changeAllCheckedState() {
      this.updateAllGoodsState(!this.isAllChecked);
    },
    settlement() {
      if (!this.token) return this.delayNavigate();
      if (!this.addStr) return uni.msg('请先选择收货地址!');
      if (!this.checkedCount) return uni.msg('请选择需要结算的商品!');
      this.payOrder();
    },
    showTips(n) {
      uni.showToast({
        icon: 'none',
        title: '登录后方可结算, ' + n + '秒后为您跳转到登录界面',
        mask: true,
        duration: 1500
      });
    },
    delayNavigate() {
      this.seconds = 3;
      this.showTips(this.seconds);
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          uni.switchTab({
            url: '../../pages/my/my',
            success: () => {
              this.updateRedirectInfo({
                openType: 'switchTab',
                from: '/pages/cart/cart'
              });
            }
          });
        }
        this.showTips(this.seconds);
      }, 1000);
    },
    async payOrder() {
      // const orderInfo = {
      //   order_price: 0.01,
      //   consignee_addr: this.addStr,
      //   goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
      // };
      // const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
      // console.log(res);
      // if (res.meta.status !== 200) return uni.msg('创建订单失败！');
      // fake token
      // const orderNumber = res.message.order_number;
      // const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber });
      // if (res2.meta.status !== 200) return uni.msg('预付订单生成失败！');
      // const payInfo = res2.message.pay;
      // const [err, succ] = await uni.requestPayment(payInfo);
      // if (err) return uni.msg('未支付!');
      // const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber });
      // if (res3.meta.status !== 200) return uni.msg('订单未支付！');
      // 3.5 检测到订单支付完成
      uni.showToast({
        title: '支付完成！',
        icon: 'success'
      });
    }
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_user', ['addStr']),
    ...mapState('m_user', ['token']),
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    isAllChecked() {
      return this.checkedCount === this.total;
    }
  }
};
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
