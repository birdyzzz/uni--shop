import {
  mapGetters
} from 'vuex';

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    total: {
      handler(newVal) {
        this.setBadge()
      },
      immediate: true
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}
