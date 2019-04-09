<template>
  <div class="main">
    <h3>赞助方</h3>
    <el-row :gutter="20">
      <el-col :span="16">    <div class="">
        <h3>已选择</h3>
        <draggable :list="list1" class="list-group" group="people" @change="log">
          <div
            v-for="(element) in list1"
            :key="element.name"
            class="list-group-item"
          >
            {{ element.name }} <img :src="'/api/img/' + element.img " width="50" height="50" alt="">
          </div>
        </draggable>
      </div>
      </el-col>
      <el-col :span="8">
        <div class="">
          <h3>赞助方数据库</h3>
          <draggable :list="list2" class="list-group" group="people" @change="log">
            <div
              v-for="(element) in list2"
              :key="element.name"
              class="list-group-item"
            >
              {{ element.name }} <img :src="'/api/img/' + element.img " width="50" height="50" alt="">
            </div>
          </draggable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getPersonal } from '@/api/activity'
export default {
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    getPersonal().then(data => {
      this.list2 = data.personal
    })
  },
  methods: {
    log: function(evt) {
      // window.console.log(evt)
      this.$store.commit('SET_SPONSOR', this.list1)
    }
  }
}
</script>

<style scoped>
  .main{
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 600px;
  }
  .w{
    display: flex;
    flex-direction: column;
  }
</style>
