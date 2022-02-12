<template>
  <div style="height: 700px; margin-top: 60px">
    <mind-editor v-model:mind="mind"
                 @mind-click="onClick"
                 :config="mindConfig"
                 @contentChange="onContentchange"
                 @configChange="onConfigChange"
    />
    <button @click="change">切换</button>
    <button @click="changeLayout">布局切换</button>
    <button @click="changeTheme">主题切换</button>
  </div>
</template>
<script>
import {defineComponent, ref, watch} from 'vue';
import MindEditor, {THEMES, TEMPLATE} from "./components/index";

export default defineComponent({
  components: {
    MindEditor
  },
  setup() {

    const mind = ref({
      "template": 'default',
      "root": {
        "data": {
          "text": "账号"
        }
      }
    })

    const change = () => {
      mind.value = {
        "root": {
          "data": {"id": "c07d04815865", "created": 1643081257, "text": "账号"},
          "children": [{
            "data": {
              "id": "chefp56e3jk0",
              "created": 1643081266004,
              "text": "postman",
              "layout_mind_offset": {"x": -32, "y": -65},
              "layout": null
            },
            "children": [{
              "data": {"id": "chefp7g8d2w0", "created": 1643081270953, "text": "账号", "layout": null},
              "children": [{
                "data": {
                  "id": "chefpngkn2o0",
                  "created": 1643081305802,
                  "text": "apologizebao@163.com",
                  "layout": null
                }, "children": []
              }]
            }, {
              "data": {"id": "chefpc6a6mw0", "created": 1643081281235, "text": "密码", "layout": null},
              "children": [{
                "data": {
                  "id": "chefpqh3bc00",
                  "created": 1643081312364,
                  "text": "bqy123456789.",
                  "layout": null
                }, "children": []
              }]
            }]
          }, {
            "data": {
              "id": "chgy56c2egw0",
              "created": 1643336422242,
              "text": "npm",
              "layout_mind_offset": {"x": 385, "y": 54},
              "layout": null
            },
            "children": [{
              "data": {"id": "chgy59ovlzk0", "created": 1643336429547, "text": "账号", "layout": null},
              "children": [{
                "data": {"id": "chgy5ncn7t40", "created": 1643336459283, "text": "7polo", "layout": null},
                "children": []
              }]
            }, {
              "data": {"id": "chgy5ddte1s0", "created": 1643336437586, "text": "密码", "layout": null},
              "children": [{
                "data": {
                  "id": "chgy5qnsh400",
                  "created": 1643336466487,
                  "text": "bqy1411125001",
                  "layout": null
                }, "children": []
              }]
            }, {
              "data": {"id": "chgyxhg3iyo0", "created": 1643338640627, "text": "其他", "layout": null},
              "children": [{
                "data": {"id": "chgyxjsk0ew0", "created": 1643338645734, "text": "发布", "layout": null},
                "children": [{
                  "data": {
                    "id": "chgyxl5aq1s0",
                    "created": 1643338648682,
                    "text": "npm publish --access public",
                    "layout": null
                  }, "children": []
                }]
              }]
            }]
          }]
        }, "template": "filetree", "theme": "fresh-blue", "version": "1.4.43"
      }
    }

    const onClick = (e) => {
      console.log(e)
    }

    const onContentchange = (e) => {
      console.log(e)
    }

    const onConfigChange = (config, value) => {
      console.log(config + ":" + value)
    }

    const mindConfig = ref({
      template: 'default'
    })

    let themeIndex = 0
    const changeTheme = () => {
      var themes = THEMES
      mindConfig.value.theme = themes[themeIndex++ % themes.length]
    }

    let templateIndex = 0
    const changeLayout = () => {
      var template = TEMPLATE
      mindConfig.value.template = template[templateIndex++ % template.length]
    }


    return {
      mind,
      mindConfig,
      change,
      onClick,
      onContentchange,
      onConfigChange,

      changeTheme,
      changeLayout
    }
  }
});
</script>

<style lang="less" scoped>

</style>
