<template>
  <view>
    <view class="search-box"><uni-search-bar @cancel="cancelSearch" @input="input" :radius="100" focus :value="inputVal" /></view>
    <view class="suggestions-box" v-if="searchResult.length !== 0">
      <view class="suggestions-item" v-for="(item, i) in searchResult" :key="i" @click="goToDetail(item.goods_id)">
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16" @click="clearHistory"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 搜索历史标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash"></uni-icons>
      </view>
      <!-- 搜索历史列表区域 -->
      <view class="history-list"><uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="tapHistory(item)"></uni-tag></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      keyWord: '',
      searchResult: [],
      history: ['apple', '小米', 'LG'],
      inputVal: ''
    };
  },
  methods: {
    input(e) {
      clearTimeout(this.timer);
      // console.log(e)
      this.inputVal = e
      this.timer = setTimeout(() => {
        this.keyWord = e;
        this.getSearchResult();
      }, 500);
    },
    async getSearchResult() {
      if (this.keyWord === '') return;
      const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord });
      if (res.meta.status !== 200) return uni.msg();
      this.searchResult = res.message;
      this.saveSearchResult()
    },
    goToDetail(id) {
      uni.navigateTo({
        url: '../goods_detail/goods_detail?goods_id=' + id
      });
    },
    saveSearchResult() {
      this.history.push(this.keyWord)
      const set = new Set(this.history)
      set.delete(this.keyWord)
      set.add(this.keyWord)
      this.history = Array.from(set)
      uni.setStorageSync("keyWord",JSON.stringify(this.history))
    },
    cancelSearch() {
      this.searchResult = []
    },
    clearHistory() {
      uni.setStorageSync('keyWord', '[]')
    },
    tapHistory(kw) {
      this.input(kw)
    }
  },
  computed: {
    historys() {
      return [...this.history].reverse()
    }
  },
  onLoad() {
    this.history = JSON.parse(uni.getStorageSync('keyWord' || '[]'))
  }
};
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  .uni-searchbar {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 16rpx;
    background-color: #ff5a5f;
  }
}
.suggestions-box {
  padding: 0 5px;
  .suggestions-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 5px;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #ccc;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    .uni-tag {
      margin-right: 5px;
    }
  }
}
</style>
