<template>
  <div class="main">
    <h3>比赛奖金</h3>
    <el-button type="text" @click="dialogFormVisible = true">重新编辑</el-button>
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="赛事详情"
    >
      <el-form>
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

          <div>
            {{ project_table }}
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitTable">提 交</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="table"
      style="width: 100%">
      <el-table-column
        prop="level"
        label="级别"
        width="50"/>
      <el-table-column
        v-for="(name,index) in project.list"
        :prop="name"
        :label="name"
        :key="index"
        width="180"/>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisible: false,
      levelLine: {},
      dance: [
        'popping',
        'hiphop',
        'breaking'
      ],
      selectedDance: [],
      project_table: [],
      project_list: []
    }
  },
  computed: {
    ...mapState({
      project: state => {
        let project = state.activity.detail.game.project
        console.log('project:', project)
        if (!project) {
          project = {
            table: [],
            llist: []
          }
        }
        return project
      },
      table: state => {
        const project = state.activity.detail.game.project

        if (project && project.table && project.table.length > 0) {
          return project.table.map(val => {
            const obj = {}
            project.list.forEach((v, i) => {
              obj[v] = val.value[i]
            })
            return {
              level: val.level,
              ...obj
            }
          })
        } else {
          return []
        }
      }
    })
  },
  methods: {
    addDance(name) {
      this.table.push({
        level: name
      })
    },
    change(data) {
      // this.$store.state.activity.detail.game.project.list = data
      this.project_list = data
    },
    setTable() {
      // console.log(this.levelLine)
      const data = {
        level: this.levelLine.level,
        value: this.selectedDance.map(val => {
          return this.levelLine[val]
        })
      }
      // console.log(11112)
      // console.log(data)
      this.project_table.push(data)
      // this.$store.commit('SET_TABLE', data)
    },
    commitTable() {
      this.$store.commit('SET_TABLE', {
        table: this.project_table,
        list: this.project_list
      })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.main{

}
</style>
