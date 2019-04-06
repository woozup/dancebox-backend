<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="16">    <div class="">
        <h3>已选择1111</h3>
        <draggable :list="list1" class="list-group" group="people" @change="log">
          <div
            v-for="(element, index) in list1"
            :key="element.name"
            class="list-group-item"
          >
            {{ element.name }} {{ index }}
          </div>
        </draggable>
      </div>
      </el-col>
      <el-col :span="8">
        <div class="">
          <h3>嘉宾数据库</h3>
          <draggable :list="list2" class="list-group" group="people" @change="log">
            <div
              v-for="(element, index) in list2"
              :key="element.name"
              class="list-group-item"
            >
              {{ element.name }} {{ index }}
            </div>
          </draggable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list1: [
        { name: 'name', id: 1 }

      ],
      list2: [
        { name: 'zzzz', id: 5 }
      ]
    }
  },
  methods: {
    add: function() {
      this.list.push({ name: 'kkkk' })
    },
    replace: function() {
      this.list = [{ name: 'eeeee' }]
    },
    clone: function(el) {
      return {
        name: el.name + 'aaaaaaaa'
      }
    },
    log: function(evt) {
      window.console.log(evt)
    }
  }
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;
}
.w{
  display: flex;
  flex-direction: column;
}
</style>
