<template>
  <div class="home">
    <paging
      :page-size="pagesize"
      :page-count="pageCount"
      :total.sync="total"
      :current.sync="current"
      @change="changePage"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import paging from "@/components/pager";

export default {
  name: "home",
  components: {
    paging
  },
  data() {
    return {
      current: 1, // 当前页
      total: 150, // 总记录数
      pagesize: 15, // 一页多少条
      pageCount: 7 // 页码按钮的数量，当总页数超过该值时会折叠
    };
  },
  methods: {
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
