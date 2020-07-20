import "./toast.less";
export default {
  name: "yxToast",
  data() {
    return {
      toastShow: false,
      message: "",
      zIndex: 99999
    };
  },
  render(h) {
    const _cont = h("p", {}, this.message);
    return h(
      "transition",
      {
        attrs: {
          name: "yx-fade"
        }
      },
      [
        h(
          "div",
          {
            staticClass: "yx-toast",
            style: {
              "z-index": this.zIndex
            },
            directives: [
              {
                name: "show",
                value: this.toastShow,
                expression: "toastShow"
              }
            ]
          },
          [_cont]
        )
      ]
    );
  }
};
