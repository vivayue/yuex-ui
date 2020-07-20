import pager from "./pager/index.js";
import calendar from "./calendar/index.js";

const version = "__VERSION__";
const components = {
  pager,
  calendar
};

function install(Vue) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key]);
  });
}

if (typeof window !== "undefined" && window.Vue) install(window.Vue);

export { version, pager, calendar, install };

export default { version, install, ...components };
