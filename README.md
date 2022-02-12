# block-editor-vue

基于 [editorjs](https://github.com/codex-team/editor.js) 封装的VUE3组件


### template 布局
有六种布局：
+ default 思维导图
+ structure 组织结构图
+ filetree 目录组织图
+ right 逻辑结构图
+ fish-bone 鱼骨图
+ tianpan 天盘图



### theme 主题
['classic', 'classic-compact', 'snow', 'snow-compact', 'fresh-red', 'fresh-red-compat', 'fresh-soil', 'fresh-soil-compat', 'fresh-green', 'fresh-green-compat', 'fresh-blue', 'fresh-blue-compat', 'fresh-purple', 'fresh-purple-compat', 'fresh-pink', 'fresh-pink-compat', 'fish', 'wire', 'tianpan', 'tianpan-compact']


```html
<mind-editor v-model:mind="mind"
@mind-click="onClick"
:config="mindConfig"
@contentChange="onContentchange"
@configChange="onConfigChange"
/>
```