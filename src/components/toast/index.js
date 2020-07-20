import toastComponent from "./toast.js";

const yxToast = {
  timer: null,
  isExit: false
};

yxToast.install = function(Vue) {
  const toastFn = function(Options) {
    let _options = {
      duration: 2000
    };
    if (typeof Options === "string") {
      _options.message = Options;
    } else {
      _options = Options;
    }
    const yx_Toast = Vue.extend(toastComponent);
    if (!this.isExit) {
      let toastInstance = (this.isExit = new yx_Toast({
        el: document.createElement("div"),
        data: _options
      }));
      document.body.appendChild(toastInstance.$el);
      toastInstance.toastShow = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        toastInstance.toastShow = false;
        document.body.removeChild(toastInstance.$el);
        toastInstance.$destroy();
        this.isExit = null;
        this.timer = null;
      }, _options.duration);
    }
  };

  Vue.prototype.$yxtoast = toastFn;
};

export default yxToast;
