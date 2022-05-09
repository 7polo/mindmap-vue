<template>
  <div class="mind-editor-container">
    <div class="mind-editor" ref="mindRef"></div>
    <SideToolbar :execCmd='execCmd' :locale="locale"/>
    <Toolbar :execCmd='execCmd'/>
  </div>
</template>
<script>
import {defineComponent, nextTick, onMounted, ref, watch} from 'vue';
// import MinderEditor from '@7polo/mindmap'
import MinderEditor from '../../../mindmap/dist/index'
import SideToolbar from "./tools/SideToolbar";
import Toolbar from "./tools/Toolbar";
import {zh_CN} from "./i18n/zh_CN";
const deepCopy = function (data) {
  return JSON.parse(JSON.stringify(data))
}

const STATE = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  READY: 'READY',
  MODIFY: 'MODIFY'
}

const DEFAULT_MIND = {
  "template": 'default',
  "root": {
    "data": {
      "text": "新建主题"
    }
  }
}

export default defineComponent({
  components: {Toolbar, SideToolbar},
  props: {
    mind: {
      type: [Object, null],
      required: true,
      default: () => {
        return DEFAULT_MIND
      }
    },
    locale: {
      type: Function,
      required: false,
      default: (text) => {
        const array = text.split('.')
        let v = zh_CN;
        for (let i = 0; i < array.length; i++) {
          v = v[array[i]]
        }
        return v
      }
    }
  },
  setup(props, {emit}) {

    const mindRef = ref()

    const editor = {
      ref: null,
      uuid: 0
    }

    const state = ref(STATE.INIT)

    const importJson = (mind) => {
      if (!editor.ref && mind) {
        return;
      }
      console.log('valid import')
      state.value = STATE.LOADING
      editor.ref.import(deepCopy(Object.assign({}, DEFAULT_MIND, mind)))
      state.value = STATE.READY
      emit('import-finish')
    }

    const renderMindEditor = () => {
      editor.ref = new MinderEditor(mindRef.value);

      // event
      editor.ref.onEvent('selectionchange', function () {
        const node = editor.ref.getMinder().getSelectedNode();
        if (node) {
          emit('select-change', node)
        }
      });
      editor.ref.onEvent('contentchange', function (e) {
        if (state.value === STATE.LOADING) {
          return;
        }
        console.log("contentchange")
        const mind = Object.assign({uuid: new Date().getTime()}, editor.ref.getMinder().exportJson())
        editor.uuid = mind.uuid
        state.value = STATE.MODIFY
        emit('update:mind', mind)
        emit('content-change', e, mind)
      });
    }

    // 渲染
    onMounted(() => {
      nextTick(()=> {
        renderMindEditor()
        importJson(props.mind)
      })
    })

    // 监听变化
    watch(() => props.mind, (data) => {
      if (data.uuid === editor.uuid) {
        return
      }
      importJson(data)
    })

    const execCmd = (cmd, params) => {
      if (!editor.ref) {
        return;
      }
      editor.ref.execCommand(cmd, params)
    }

    return {
      editor,
      mindRef,
      locale: props.locale,
      execCmd
    }
  }
});
</script>

<style lang="less" scoped>
.mind-editor-container {
  box-sizing: content-box;
  position: relative;
  width: 100%;
  height: 100%;

  .mind-editor {
    height: 100%;
  }
}
</style>
