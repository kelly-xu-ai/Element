## 目录结构
```
Element
├── build/
│ ├── bin/
│ │ ├── build-entry.js                  # 生成打包入口文件 src/index.js文件 （代码中有修改：同时会生成扩展组件的入口文件src/extend.js）
│ │ ├── gen-cssfile.js                  # 生成样式入口文件 packages/theme-chalk/src/index.scss
│ │ └── gen-cssfile-extend.js           # 生成扩展组件样式入口文件 packages-my/theme-chalk/src/index.scss
│ ├── webpack.common.js                 # 打包全部element组件
│ ├── webpack.extend.js                 # 打包全部扩展组件
│ └── webpack.component                 # 批量打包element每一个组件 （代码中有修改：同时会把扩展组件也批量打包）
├── examples/
│ ├── docs                              # element文档
│ ├── docs-my                           # 扩展组件文档
│ ├── entry.js                          # demo项目入口文件 （代码中有修改：同时会引入扩展组件）
│ ├── nav.config.json                   # 侧边栏配置
│ └── nav.my.config.json                # 扩展组件侧边栏配置
├── lib/
│ ├── theme-chalk/                      # 打包后样式
│ ├── theme-chalk-extend/               # 打包后扩展组件样式
│ ├── element-ui.common.js              # element全部引用的入口文件
│ ├── element-ui.extend.js              # 扩展组件全部引用的入口文件
│ ├── index.js                          # element按需引用的入口文件
│ └── extend.js                         # 扩展组件按需引用的入口文件
├── packages/                           # element组件库
├── packages-my/                        # 扩展组件库
├── src/
│ ├── index.js                          # 入口文件
│ └── extend.js                         # 扩展组件入口文件
├── components.json                     # element组件列表
└── components-extend.json              # 扩展组件列表 （如果添加组件需要按照命名规范把组件添加到列表中才能生效）
```

## 扩展组件目录
```
packages-my
├── area-picker/                        # 地区选择器
└── theme-chalk/                        # 样式相关
```
