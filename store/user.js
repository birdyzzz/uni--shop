export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    redirectInfo: JSON.parse(uni.getStorageSync('redirectInfo') || '{}'),
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserInfo(state, info) {
      state.userInfo = info
      this.commit('m_user/saveInfoToStorage')
    },
    saveInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    updateToken(state, newToken) {
      state.token = newToken
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },
  getters: {
    addStr(state) {
      if (!state.address.provinceName) return;
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
    }
  }
}
