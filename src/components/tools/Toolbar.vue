<template>
  <div class="side-toolbar">
    <div class="tool-item tool-template">
      <div class="tool-item-name">主题</div>
      <div class="template-wrapper">
        <div class='template-item' v-for="template in TEMPLATE">
          <div :class="['item', template]" @click="$emit('select', {template})"></div>
        </div>
      </div>
    </div>
    <div class="tool-item tool-theme">
      <div class="tool-item-name">布局</div>
      <div class="theme-wrapper">
        <div v-for="theme in THEMES" :class='["theme-item", theme]' @click="$emit('select', {theme})">{{ theme }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
import {THEMES, TEMPLATE} from "../index";

export default defineComponent({
  locale: {
    type: Object,
    required: false,
    default: () => {
      return {}
    }
  },
  setup(props, {emit}) {
    const selectTemplate = (template) => {

    }

    return {
      selectTemplate,
      TEMPLATE,
      THEMES
    }
  }
});
</script>

<style lang="less" scoped>
.side-toolbar {
  position: absolute;
  width: 68px;
  top: 60px;
  left: 0;
  z-index: 11;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);

  .tool-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 68px;
    height: 62px;
    padding: 6px 0;
    text-align: center;
    transition: all .3s;
    cursor: pointer;
    user-select: none;

    &:hover {
      cursor: pointer;
      color: #3982fc;
      background-color: #eef4ff;
    }

    .tool-item-name {
      width: 100%;
      margin-top: 6px;
      font-size: 12px;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .tool-template {
    &:hover {
      .template-wrapper {
        display: block;
      }
    }
    .template-wrapper {
      background-color: #fff;
      -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
      box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
      position: relative;
      width: 140px;
      height: 200px;
      top: 0;
      left: 100px;
      display: none;

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
  }

  .tool-theme {
    &:hover {
      .theme-wrapper {
        display: block;
      }
    }
    .theme-wrapper {
      width: 240px;
      padding: 10px;
      display: none;
      background-color: #fff;
      -webkit-box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
      box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
      position: relative;
      left: 110px;
      display: none;

      .theme-item {
        display: inline-block;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        padding: 0 5px;
        text-decoration: none;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 8px;
        margin-right: 10px;

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

}
</style>
