<template>
  <div class="home">
    <y-pagination
      :page-size="pagesize"
      :page-count="pageCount"
      :total.sync="total"
      :current.sync="current"
      @change="changePage"
    />
  </div>
</template>

<script>
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
