import clickOutSide from "@/assets/js/clickoutside";
export default {
  name: "y-pagination",
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
  directives: {
    "click-outside": clickOutSide
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
    },
    createTotalBox(h) {
      return h(
        "div",
        {
          staticClass: "total"
        },
        ["共" + this.total + "条"]
      );
    },
    createPageSize(h) {
      return h(
        "div",
        {
          staticClass: "page-size",
          on: {
            click: this.showPageBox
          },
          directives: [
            {
              name: "click-outside",
              value: "clickOutSide"
            }
          ]
        },
        [h("span", {}, [this.pgsize + "条/页"])]
      );
    },
    createPgSizeBox(h) {
      return h(
        "div",
        {
          staticClass: "pgsize-box",
          style: {
            left: this.pgLeft + "px",
            top: this.pgTop + "px"
          },
          show: this.showPgSize
        },
        [15, 50, 100, 150].map(item => {
          return h(
            "div",
            {
              staticClass: "pgsize-item",
              on: {
                click: this.selectPgSize(item)
              }
            },
            [item + "条/页"]
          );
        })
      );
    },
    createPrevBtn(h) {
      return h(
        "button",
        {
          staticClass: "prev",
          class: {
            disable: this.current <= 1
          },
          attrs: {
            type: "button"
          },
          props: {
            disabled: this.current <= 1
          },
          on: {
            click: this.changePage(this.current - 1)
          }
        },
        [
          h("i", {
            staticClass: "left-arrow"
          })
        ]
      );
    },
    creatNextBtn(h) {
      return h(
        "button",
        {
          staticClass: "next",
          class: {
            disable: this.current >= this.totalPage
          },
          attrs: {
            type: "button"
          },
          props: {
            disabled: this.current >= this.totalPage
          },
          on: {
            click: this.changePage(this.current + 1)
          }
        },
        [
          h("i", {
            staticClass: "right-arrow"
          })
        ]
      );
    },
    createPageList(h) {
      return h(
        "ul",
        {},
        this.items.map(item => {
          return h(
            "li",
            {
              class: {
                "is-current": this.current === item.value,
                poit: item.text === "···"
              },
              on: {
                click: this.changePage(item.value)
              }
            },
            [item.text]
          );
        })
      );
    },
    paginationBox(h) {
      return h(
        "div",
        {
          staticClass: "pagination-box"
        },
        [this.createPrevBtn(h), this.createPageList(h), this.creatNextBtn(h)]
      );
    }
  },
  render(h) {
    return h(
      "div",
      {
        staticClass: "page-wrap"
      },
      [
        this.createTotalBox(h),
        this.createPageSize(h),
        this.createPgSizeBox(h),
        this.paginationBox(h)
      ]
    );
  }
};
