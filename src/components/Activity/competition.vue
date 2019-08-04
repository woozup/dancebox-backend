<template>
  <div class="competition">
    <el-table
      v-loading="listLoading"
      :data="[competitions]"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="项目ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="晋级人数" >
        <template slot-scope="scope">
          {{ scope.row.win_count }}
        </template>
      </el-table-column>
      <el-table-column label="裁判人数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.referee_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分模板" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.grade_template_name }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { putStatus } from '@/api/activity'
export default {
  name: "competition",
  filters: {
    statusFilter(status) {
      const statusMap = ['上线', '下线', '删除']
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      formLabelWidth: '120px',
      activeName: "competition"
    }
  },
  computed: {
    ...mapState({
      competitions: state => state.activity.competitions
    })
  },
  mounted() {
  },
  methods: {
    deleteRow(id, status) {
      console.log(id)
      putStatus({ id, status }).then(() => {
        // this.fetchData()
        this.$router.push('/activity/list')
      })
    },
    submitText(text) {
      console.log(1111,text)
    }
  }
}
</script>

<style scoped>
.main{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.game{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
}
.teach{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
}
  .detail{
    width: 1200px;
    margin-top: 20px;
  }
</style>
