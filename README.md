# yuex-ui(基于vue2.0的组件库)


## Installation
```
  npm install yuex-ui --save
  yarn add yuex-ui
```
## Usage
```
import yuexUi from "yuex-ui"
import "yuex-ui/dist/yuex-ui.css"
Vue.use(yuexUi);
```
3、参数说明(options)

参数      | 默认值(type)| 描述
----------|------------|-------------------------------------
current   | 1(number)  | 当前页
total     | 0(number)  | 总记录数
pagesize  | 15(number) | 一页多少条
pageCount | 7(number)  | 页码按钮的数量，当总页数超过该值时会折叠

3、调用翻页的方法
```
methods:{
  changePage(e) {
    console.log(e);
  }
}
```
## browser support
Modern browsers and Internet Explorer 11+.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
