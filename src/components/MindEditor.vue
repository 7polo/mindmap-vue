<template>
  <div class="mind-editor-container">
    <div class="mind-editor" :id="editor.id"></div>
  </div>
</template>
<script>
import {defineComponent, nextTick, onMounted, ref, watch} from 'vue';
import MinderEditor from '@7polo/mindmap'

const deepCopy = function (data) {
  return JSON.parse(JSON.stringify(data))
}

const STATE = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  READY: 'READY',
  MODIFY: 'MODIFY'
}

export default defineComponent({
  props: {
    mind: {
      type: Object,
      required: true
    },
    config: { // 百度脑图的其他配置
      type: Object,
      default: () => {
        return {
          template: 'default',
          theme: 'classic'
        }
      }
    }
  },
  setup(props, {emit}) {

    const editor = {
      id: 'mind_editor_' + new Date().getTime(),
      ref: null,
      uuid: 0
    }

    const state = ref(STATE.INIT)

    // fix 非内容变化一些场景触发事件
    let contentChangeSwitcher = true

    const syncMind = () => {
      const mind = Object.assign({uuid: new Date().getTime()}, editor.ref.getMinder().exportJson())
      editor.uuid = mind.uuid
      emit('update:mind', mind)
      return mind
    }

    const bindEvent = () => {
      editor.ref.onEvent('selectionchange', function () {
        const node = editor.ref.getMinder().getSelectedNode();
        if (node) {
          emit('selectionchange', node)
        }
      });

      editor.ref.onEvent('contentchange', function (e) {
        if (state.value !== STATE.LOADING && contentChangeSwitcher) {
          state.value = STATE.MODIFY
          const mind = syncMind()
          emit('content-change', e, mind)
        }
      });
    }

    const renderMind = () => {
      editor.ref = new MinderEditor(`#${editor.id}`);
      bindEvent()
    }

    const importJson = (mind) => {
      state.value = STATE.LOADING
      editor.ref.import(deepCopy(mind))
      state.value = STATE.READY
    }

    onMounted(() => {
      nextTick(()=> {
        renderMind()
        importJson(props.mind)
      })
    })

    watch(() => props.mind, (data) => {
      if (data.uuid === editor.uuid) {
        return
      }
      importJson(data)
    })

    const changeConfig = (config, value) => {
      contentChangeSwitcher = false
      editor.ref.execCommand(config, value)
      contentChangeSwitcher = true
      syncMind()
      emit('config-change', config, value)
    }

    watch(() => props.config.template, (template) => {
      changeConfig('template', template)
    })

    watch(() => props.config.theme, (theme) => {
      changeConfig('theme', theme)
    })

    return {
      editor
    }
  }
});
</script>

<style lang="less" scoped>
.mind-editor-container {

  position: relative;
  width: 100%;
  height: 100%;

  .mind-editor {
    right: 0;
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
