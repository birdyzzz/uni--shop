<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
import cartBadge from '@/mixins/tabbar-badge.js';
import { mapState } from 'vuex';
export default {
  mixins: [cartBadge],
  data() {
    return {};
  },
  computed: {
    ...mapState('m_user', ['token'])
  }
};
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
