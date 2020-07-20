<template>
  <div class="home">
    <!-- <y-pagination
      :page-size="pagesize"
      :page-count="pageCount"
      :total.sync="total"
      :current.sync="current"
      @change="changePage"
    /> -->
    <pager
      :page-size="pagesize"
      :page-count="pageCount"
      :total.sync="total"
      :current.sync="current"
      @change="changePage"
    />
    <div>
      <calendar></calendar>
    </div>
    <div>
      <button type="button" @click="testFn">点击</button>
    </div>
  </div>
</template>

<script>
import { pager, calendar } from "../components/index.js";
export default {
  name: "home",
  data() {
    return {
      current: 1, // 当前页
      total: 150, // 总记录数
      pagesize: 15, // 一页多少条
      pageCount: 7 // 页码按钮的数量，当总页数超过该值时会折叠
    };
  },
  components: {
    pager,
    calendar
  },
  methods: {
    testFn() {
      this.$yxtoast("哈哈");
    },
    changePage(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 40px;
}
</style>
