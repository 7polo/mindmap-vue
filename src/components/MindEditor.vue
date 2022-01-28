<template>
  <div class="mind-editor" :id="editor.id"></div>
</template>
<script>
import {defineComponent, reactive} from 'vue';
import * as MinderEditor from '../../../mindmap/dist/minder-editor.js'
export default defineComponent({
  setup() {

    const editor = reactive({
      id: 'mind_editor_' + new Date().getTime(),
      minder: null
    })

    editor.minder = new MinderEditor("#minder");
    editor.minder.importJson({
      "root": {
        "data": {
          "text": "账号"
        },
        "children": [
          {"data": {"text": "网页"}},
          {"data": {"text": "贴吧"}},
          {"data": {"text": "知道"}},
          {"data": {"text": "音乐"}},
          {"data": {"text": "图片"}},
          {"data": {"text": "视频"}},
          {"data": {"text": "地图"}},
          {"data": {"text": "百科", "expandState": "collapse"}}
        ]
      },
      "template": "default"
    })

    return {
      editor
    }
  }
});
</script>

<style lang="less" scoped>

</style>
