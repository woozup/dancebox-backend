<template>
  <div class="main">
    <h3>艺术家阵容</h3>
    <el-row :gutter="20">
      <el-col :span="16">    <div class="">
        <h3>已选择</h3>
        <draggable :list="guest" class="list-group" group="people" @change="log">
          <div
            v-for="(element) in guest"
            :key="element.name"
            class="list-group-item"
          >
            {{ element.name }} <img :src="element.img " width="50" height="50" alt="">
          </div>
        </draggable>
      </div>
      </el-col>
      <el-col :span="8">
        <div class="">
          <h3>嘉宾数据库</h3>
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
      list2: [],
      guest: []
    }
  },
  computed: {
    getDetail() {
      return this.$store.state.activity.detail
    }
  },
  watch: {
    getDetail(detail) {
      this.guest = detail.game.guest ? detail.game.guest : []
    }
  },
  created() {
    getPersonal().then(data => {
      this.list2 = data.personal
    })
  },
  mounted() {
    console.log(this.$store.state.activity.detail)
  },
  methods: {
    log: function(evt) {
      // window.console.log(evt)
      this.$store.commit('SET_GUEST', this.guest)
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
