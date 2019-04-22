<template>
  <div class="main">
    <h3>授课老师</h3>
    <el-row class="row">
      <el-col :span="10">
        <div class="guest">
          <h3 class="guest-title">已选择</h3>
          <draggable :list="teacher" class="list-group" group="people" @change="log">
            <div
              v-for="(element) in teacher"
              :key="element.name"
              class="list-group-item"
            ><img :src="element.img " class="list-avatar" width="50" height="50" alt="">
              <div> {{ element.name }} </div>
            </div>
          </draggable>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="g-data">
          <h3>老师数据库</h3>
          <draggable :list="list2" class="list-group" group="people" @change="log">
            <div
              v-for="(element) in list2"
              :key="element.name"
              class="list-group-item"
            ><img :src="element.img " class="list-avatar" width="50" height="50" alt="">
              <div> {{ element.name }} </div>
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
      teacher: []
    }
  },
  computed: {
    getDetail() {
      return this.$store.state.activity.detail
    }
  },
  watch: {
    getDetail(detail) {
      this.sponsor = detail.teach_info.teacher ? detail.teach_info.teacher : []
    }
  },
  created() {
    getPersonal(0).then(data => {
      this.list2 = data.personal
    })
  },
  mounted() {
    console.log(this.$store.state.activity.detail)
  },
  methods: {
    log: function(evt) {
      // window.console.log(evt)
      this.$store.commit('SET_TEACHER', this.teacher)
    }
  }
}
</script>

<style scoped>
  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1200px;
    height: 600px;
  }
  .w{
    display: flex;
    flex-direction: column;
  }
  .list-group{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 300px;
  }
  .list-group-item{
    margin: 0px 2px 0px 2px;
  }
  .list-avatar{
    border-radius: 30px;
  }
  .row{
    width: 100%;
  }
  .g-data{
    height:500px;
    border: 2px solid red;
  }
  .guest{
    display: flex;
    flex-direction: column;
    height: 500px;
  }
  .guest-title{text-align: center}
</style>
