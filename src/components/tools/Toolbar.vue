<template>
  <div :class="['mind-tool', handing?'handing':'']">
    <div v-for="tool in tools" :class="['tool-icon', tool.type]" @click="onClick(tool)">
<!--      <span v-if="tool.type==='zoom-value'" class="zoom-value">{{ tool.value }}%</span>-->
      <svg-icon :name="`bar/${(tool.icon ||tool.type).toLowerCase()}`"/>
    </div>
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue';
import SvgIcon from "../svgicon/Index";

export default defineComponent({
  components: {SvgIcon},
  props: {
    execCmd: {
      type: Function,
      required: false,
      default: () => {
      }
    }
  },
  setup(props) {

    const tools = ref([
      {
        type: 'ZoomOut'
      },
      // {
      //   type: 'zoom-value',
      //   value: '90'
      // },
      {
        type: 'ZoomIn'
      },
      {
        type: 'hand'
      },
      {
        type: 'Camera'
      }/*,
      {
        type: 'eye'
      }*/
    ])

    const handing = ref(false)

    const onClick = (tool) => {
      if (tool.type === 'hand') {
        handing.value = !handing.value
      }
      props.execCmd(tool.type, tool.data)
    }
    return {
      handing,
      tools,
      onClick
    }
  }
});
</script>

<style lang="less" scoped>
.mind-tool {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 4px;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  width: auto;

  &.handing {
    .hand {
      background-color: #F5F5F5;
    }
  }

  .zoom-value {
    font-size: 12px; margin-left: -2px;
    color: #707070;
  }

  .tool-icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    padding: 4px;
    text-align: center;
    box-sizing: content-box;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
