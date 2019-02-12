<template>
  <div class="page-wrap">
    <div class="total">共{{ total }}条</div>
    <div
      class="page-size"
      @click="showPageBox($event)"
      v-click-outside="clickOutSide"
    >
      <span>{{ pgsize }}条/页</span>
    </div>
    <div
      class="pgsize-box"
      :style="{ left: pgLeft + 'px', top: pgTop + 'px' }"
      v-show="showPgSize"
    >
      <div class="pgsize-item" @click="selectPgSize(15)">15条/页</div>
      <div class="pgsize-item" @click="selectPgSize(50)">50条/页</div>
      <div class="pgsize-item" @click="selectPgSize(100)">100条/页</div>
      <div class="pgsize-item" @click="selectPgSize(150)">150条/页</div>
    </div>
    <div class="pagination-box">
      <button
        class="prev"
        :class="{ disable: current <= 1 }"
        type="button"
        :disabled="current <= 1"
        @click="changePage(current - 1)"
      >
        <i class="left-arrow"></i>
      </button>
      <ul>
        <li
          v-for="(item, index) in items"
          :class="{
            'is-current': current === item.value,
            poit: item.text === '···'
          }"
          :key="index"
          @click="changePage(item.value)"
        >
          {{ item.text }}
        </li>
      </ul>
      <button
        class="next"
        type="button"
        :class="{ disable: current >= totalPage }"
        :disabled="current >= totalPage"
        @click="changePage(current + 1)"
      >
        <i class="right-arrow"></i>
      </button>
    </div>
  </div>
</template>

<script>
import clickOutSide from "../assets/js/clickoutside";
export default {
  name: "paging",
  props: {
    total: {
      type: Number,
      default: 0,
      validator: val => val >= 0
    },
    current: {
      type: Number,
      default: 1,
      validator: val => val >= 1
    },
    pageCount: {
      type: Number,
      default: 7,
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 !== 0;
      }
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      showPgSize: false,
      pgLeft: 0,
      pgTop: 0,
      pgsize: this.pageSize,
      pages: {
        page: 1,
        limit: 15
      }
    };
  },
  computed: {
    showPageCount() {
      return this.pageCount - 2;
    },
    totalPage() {
      return Math.ceil(this.total / this.pgsize);
    },
    items() {
      if (this.total === 0) return [];
      const showPageCount = this.showPageCount;
      const arr = [];
      const start = 1;
      const end = this.totalPage;
      // 小于等于7页
      if (end <= showPageCount + 2) {
        for (let i = start; i <= end; i++) {
          arr.push({ text: i, value: i });
        }
        return arr;
      }
      arr.push({ text: start, value: start });
      if (this.current - start >= showPageCount - 1) {
        const go = this.current - showPageCount;
        arr.push({
          text: "···",
          value: go < 1 ? 1 : go
        });
      }

      let listStart = this.current - Math.floor(showPageCount / 2);
      if (listStart <= 1) listStart = 2;
      let listEnd = listStart + showPageCount - 1;
      if (listEnd >= end) listEnd = end - 1;
      listStart = listEnd - showPageCount + 1;

      for (let i = listStart; i <= listEnd; i++) {
        arr.push({ text: i, value: i });
      }

      if (end - this.current >= showPageCount - 1) {
        const go = this.current + showPageCount;
        arr.push({
          text: "···",
          value: go > end ? end : go
        });
      }
      arr.push({ text: end, value: end });
      return arr;
    }
  },
  directives: {
    "click-outside": clickOutSide
  },
  methods: {
    changePage(num) {
      this.pages.page = num;
      this.$emit("update:current", num);
      this.$emit("change", this.pages);
    },
    showPageBox(e) {
      let hasParent = e.target.offsetParent;
      let topVal = e.target.offsetTop;
      while (hasParent) {
        topVal = topVal + hasParent.offsetTop;
        hasParent = hasParent.offsetParent;
      }
      this.pgLeft = e.target.offsetLeft - 8;
      this.pgTop = topVal + 28;
      this.showPgSize = !this.showPgSize;
    },
    selectPgSize(n) {
      this.showPgSize = false;
      this.pgsize = n;
      this.pages.limit = n;
      this.pages.page = 1;
      this.$emit("update:current", 1);
      this.$emit("change", this.pages);
    },
    clickOutSide() {
      this.showPgSize = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.page-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #333;
  padding: 0 20px;
  .total {
    padding-right: 10px;
  }
  .page-size {
    padding: 4px 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  .pagination-box {
    display: flex;
    button {
      padding: 4px 10px;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      border-radius: 5px;
      -webkit-appearance: none;
      outline: none;
      background-color: #fff;
      border: none;
      color: #787878;
      cursor: pointer;
      &.prev {
        margin-right: 4px;
      }
      &.next {
        margin-left: 4px;
      }
      &.disable {
        color: rgba(0, 0, 0, 0.38);
        cursor: not-allowed;
        background: none;
      }
      i {
        width: 7px;
        height: 7px;
        display: inline-block;
        transform: rotate(45deg);
        &.left-arrow {
          border-bottom: 2px solid currentColor;
          border-left: 2px solid currentColor;
        }
        &.right-arrow {
          border-top: 2px solid currentColor;
          border-right: 2px solid currentColor;
        }
      }
    }
    ul {
      display: flex;
      li {
        padding: 4px 10px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        margin: 0 4px;
        cursor: pointer;
        &.poit {
          font-weight: bold;
        }
        &.is-current {
          background-color: #2196f3;
          color: #fff;
        }
      }
    }
  }
  .pgsize-box {
    position: absolute;
    width: 100px;
    top: 30px;
    left: 0;
    font-size: 14px;
    z-index: 4;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    .pgsize-item {
      line-height: 30px;
      &:hover {
        cursor: pointer;
        background-color: #e8e9e9;
      }
    }
  }
}
</style>
