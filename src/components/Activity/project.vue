<template>
  <div class="main">
    <h3>比赛奖金</h3>
    <el-select
      v-model="selectedDance"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="请选择文章标签"
      @change="change"
    >
      <el-option
        v-for="item in dance"
        :key="item"
        :label="item"
        :value="item"/>
    </el-select>
    <div>
      <h5 class="sub-title">设置金额</h5>
      <el-form :inline="true" :model="levelLine" class="demo-form-inline">
        <div>
          <el-form-item label="级别">
            <el-input v-model="levelLine.level" placeholder="请输入级别"/>
          </el-form-item>
        </div>
        <div v-for="(val, index) in selectedDance" :key="index">
          <el-form-item :label="val">
            <el-input v-model="levelLine[val]" :placeholder="val" />
          </el-form-item>
        </div>
        <el-button type="primary" @click="setTable">确定</el-button>
      </el-form>
    </div>
    <el-table
      :data="table"
      style="width: 100%">
      <el-table-column
        prop="level"
        label=""
        width="180"/>
      <el-table-column
        v-for="(name,index) in selectedDance"
        :prop="name"
        :label="name"
        :key="index"
        width="180"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelLine: {},
      dance: [
        'Popping',
        'Hiphop',
        'Breaking'
      ],
      selectedDance: [],
      table: []
    }
  },
  methods: {
    addDance(name) {
      this.table.push({
        level: name
      })
    },
    change(data) {
      data.forEach(val => {
        this.levelLine[val] = 0
      })
    },
    setTable() {
      console.log(this.levelLine)
      this.table.push({
        ...this.levelLine
      })
      this.$store.commit('SET_TABLE', this.table)
    }
  }
}
</script>

<style scoped>
.main{

}
</style>
