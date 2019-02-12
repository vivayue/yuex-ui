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
  computed: {},
  methods: {
    changePage(num) {
      this.pages.page = num;
      this.$emit("update:current", num);
      this.$emit("change", this.pages);
    }
  },
  render(h) {
    return h(
      "div",
      {
        staticClass: "page-wrap"
      },
      [this.createPrevBtn(h), this.createPageList(h), this.creatNextBtn(h)]
    );
  }
};
