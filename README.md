# fly

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

/*
  person __proto__      =>    Person.prototype(本身是一个对象)   __proto__  =>  Obejct.prototype

  找方法 自身没有                向上一层再找         没有                          再向上一层         直到找到顶端null 没有结束 返回undefined  
*/