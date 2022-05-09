<template>
  <div class="mind-side-toolbar">
    <div v-for="tool in tools" :class="['tool-item', `tool-${tool.type}`, selected===tool.type?'selected':'']"
         @click="onToolClick(tool)">
      <div class="tool-item-icon">
        <svg-icon :name="`tool/${(tool.icon ||tool.type).toLowerCase()}`"/>
      </div>
      <div class="tool-item-name">{{ tool.name }}</div>
    </div>

    <div class="template-wrapper" v-if="selected === 'template'">
      <div class='template-item' v-for="template in TEMPLATE">
        <div :class="['item', template]" @click="execCmd('template', template);selected = null;"
             :title="locale('template.'+template)"></div>
      </div>
    </div>

    <div class="theme-wrapper " v-if="selected === 'theme'">
      <div v-for="theme in THEMES" :class='["theme-item", theme]' @click="execCmd('theme', theme);selected = null;">
        {{ locale('theme.' + theme) }}
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, onUnmounted, onDeactivated, onActivated, ref, onMounted} from 'vue';
import {THEMES, TEMPLATE} from "../index";
import SvgIcon from "../svgicon/Index";

export default defineComponent({
  components: {
    SvgIcon
  },
  props: {
    locale: {
      type: Function,
      required: false,
      default: (text) => {
        return text.split(".")[1]
      }
    },
    execCmd: {
      type: Function,
      required: false,
      default: () => {
      }
    }
  },
  setup(props, {emit}) {

    const selected = ref()

    const tools = ref([
      {
        type: 'template',
        name: '布局',
        group: true
      },
      {
        type: 'theme',
        name: '主题',
        group: true
      },
      {
        type: 'resetlayout',
        name: '整理'
      },
      {
        type: 'ExpandToLevel',
        name: '展开',
        icon: 'expand',
        data: 99999
      },
      {
        type: 'Collapse',
        name: '收缩'
      }
    ])

    const onClickEvent = (event) => {
      const el = event.composedPath().some(el => el && el.classList && el.classList.contains('side-toolbar'));
      if (!el) {
        selected.value = null
      }
    }

    onActivated(() => {
      document.addEventListener('click', onClickEvent, true)
    })
    onDeactivated(() => {
      document.removeEventListener('click', onClickEvent, true)
    })
    onMounted(() => {
      document.addEventListener('click', onClickEvent, true)
    })
    onUnmounted(() => {
      document.removeEventListener('click', onClickEvent, true)
    })

    const onToolClick = (tool) => {
      if (tool.group) {
        selected.value = tool.type
        return
      }
      props.execCmd(tool.type, tool.data || {})
      selected.value = null
    }

    return {
      TEMPLATE,
      THEMES,
      locale: props.locale,

      tools,
      selected,

      onToolClick
    }
  }
});
</script>

<style lang="less" scoped>
.mind-side-toolbar {
  position: absolute;
  width: 56px;
  top: 60px;
  left: 0;
  z-index: 11;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  color: #707070;

  .tool-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 6px 0;
    text-align: center;
    transition: all .3s;
    cursor: pointer;
    user-select: none;
    box-sizing: content-box;

    &.selected,
    &:hover {
      color: #3982fc;
      background-color: #eef4ff;
    }

    &:hover {
      cursor: pointer;
    }

    .tool-item-name {
      width: 100%;
      font-size: 12px;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .template-wrapper {
    position: absolute;
    top: 0;
    left: 70px;

    background-color: #fff;
    -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    width: 140px;
    height: 200px;
    display: block;

    .template-item {
      padding: 10px;
      display: inline-block;

      &:hover {
        cursor: pointer;
        background-color: #eef4ff;
      }

      .item {

        width: 50px;
        height: 40px;
        background-image: url('../images/template.png');
        background-repeat: no-repeat;

        &.default {
          background-position: 0 0;
        }

        &.structure {
          background-position: -50px 0;
        }

        &.filetree {
          background-position: -100px 0;
        }

        &.right {
          background-position: -150px 0;
        }

        &.fish-bone {
          background-position: -200px 0;
        }

        &.tianpan {
          background-position: -250px 0;
        }
      }
    }
  }

  .theme-wrapper {
    position: absolute;
    top: 0;
    left: 70px;

    width: 180px;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .theme-item {
      display: inline-block;
      width: 76px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      font-size: 13px;
      padding: 0 5px;
      text-decoration: none;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 4px;
      margin-bottom: 4px;

      &:hover {
        cursor: pointer;
      }
    }

    .classic {
      color: rgb(68, 51, 0);
      border-radius: 15px;
      background: rgb(233, 223, 152);
    }

    .classic-compact {
      color: rgb(68, 51, 0);
      border-radius: 15px;
      background: rgb(233, 223, 152);
    }

    .fresh-blue {
      color: white;
      border-radius: 2.5px;
      background: rgb(115, 161, 191);
    }

    .fresh-blue-compat {
      color: white;
      border-radius: 2.5px;
      background: rgb(115, 161, 191);
    }

    .fresh-green {
      color: white;
      border-radius: 2.5px;
      background: rgb(115, 191, 118);
    }

    .fresh-green-compat {
      color: white;
      border-radius: 2.5px;
      background: rgb(115, 191, 118);
    }

    .fresh-red {
      color: white;
      border-radius: 2.5px;
      background: rgb(191, 115, 115);
    }

    .fresh-red-compat {
      color: white;
      border-radius: 2.5px;
      background: rgb(191, 115, 115);
    }

    .fresh-pink {
      color: white;
      border-radius: 2.5px;
      background: rgb(191, 115, 148);
    }

    .fresh-pink-compat {
      color: white;
      border-radius: 2.5px;
      background: rgb(191, 115, 148);
    }

    .fresh-purple {
      color: white;
      border-radius: 2.5px;
      background: rgb(123, 115, 191);
    }

    .fresh-purple-compat {
      color: white;
      border-radius: 2.5px;
      background: rgb(123, 115, 191);
    }

    .fresh-soil {
      color: white;
      border-radius: 2.5px;
      background: rgb(191, 147, 115);
    }

    .fresh-soil-compat {
      color: white;
      border-radius: 2.5px;
      background: rgb(191, 147, 115);
    }

    .snow {
      color: rgb(68, 51, 0);
      border-radius: 2.5px;
      background: rgb(233, 223, 152);
    }

    .snow-compact {
      color: rgb(68, 51, 0);
      border-radius: 2.5px;
      background: rgb(233, 223, 152);
    }

    .tianpan {
      color: rgb(68, 51, 0);
      border-radius: 15px;
      background: rgb(233, 223, 152);
    }

    .tianpan-compact {
      color: rgb(68, 51, 0);
      border-radius: 15px;
      background: rgb(233, 223, 152);
    }

    .fish {
      color: rgb(68, 51, 0);
      border-radius: 50px;
      background: rgb(233, 223, 152);
    }

    .wire {

    }
  }

}
</style>
