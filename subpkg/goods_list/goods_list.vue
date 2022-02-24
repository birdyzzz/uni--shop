<template>
  <view>
    <view class="goods-list" v-for="(item, i) in goodsList" :key="i" @click="goToDetail(item.goods_id)"><my-goods :goods="item"></my-goods></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryObj: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 20
      },
      goodsList: [],
      total: 0,
      isLoading: false
    };
  },
  methods: {
    async getGoogsList(cb) {
      this.isLoading = true;
      const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
      if (res.meta.status !== 200) return uni.msg();
      cb && cb();
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.total = res.message.total;
      this.isLoading = false;
    },
    goToDetail(id) {
      uni.navigateTo({
        url: '../goods_detail/goods_detail?goods_id=' + id
      })
    }
  },
  onLoad(options) {
    // console.log(options);
    this.queryObj.query = options.query || '';
    this.queryObj.cid = options.cid || '';
    this.getGoogsList();
  },
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.msg('到底啦');
    if (this.isLoading) return;
    this.queryObj.pagenum += 1;
    this.getGoogsList();
  },
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.queryObj.total = 0;
    this.goodsList = [];
    this.isLoading = false;
    this.getGoogsList(() => {
      uni.stopPullDownRefresh();
      uni.msg('刷新完毕!');
    });
  }
};
</script>

<style lang="scss"></style>
