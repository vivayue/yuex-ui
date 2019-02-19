import pager from "./pager/index.js";

const version = "__VERSION__";
const components = {
  pager
};

function install(Vue) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key]);
  });
}

if (typeof window !== "undefined" && window.Vue) install(window.Vue);

export { version, pager, install };

export default { version, install, ...components };
