export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateCartGoodsState(state, goods) {
      const findRes = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findRes) {
        findRes.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateCartGoodsCount(state, goods) {
      const findRes = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findRes) {
        findRes.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    removeGoodsById(state, id) {
      console.log(id)
      console.log(state.cart)
      state.cart = state.cart.filter(x => x.goods_id !== id)
      this.commit('m_cart/saveToStorage')
    },
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }

  },
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(x => c += x.goods_count)
      return c
    },

    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      // 先使用 filter 方法，从购物车中过滤器已勾选的商品
      // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
      // reduce() 的返回值就是已勾选的商品的总价
      // 最后调用 toFixed(2) 方法，保留两位小数
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price,
        0).toFixed(2)
    }
  }
}
