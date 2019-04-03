<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题" >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="标签" >
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <span> <img :src="'/api/img/' +scope.row.img" width="100" height="100"></span>
        </template>
      </el-table-column>
      <el-table-column label="位置" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="城市" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.start_time }}</span>
          <i class="el-icon-time"/>
          <span>{{ scope.row.end_time }}</span>
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
            @click.native.prevent="deleteRow(scope.row.id, scope.row.status === 0 ? 1 : 0)"
          >
            {{ scope.row.status === 0 ? 1 : 0 | statusFilter }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row.id)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, putStatus } from '@/api/activity'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['上线', '下线', '删除']
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    // this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(data => {
        console.log(data)
        this.list = data.list
      }).catch(e => {
        console.error(e)
      })
      this.listLoading = false
    },
    deleteRow(id, status) {
      console.log(id)
      putStatus({ id, status}).then(() => {
        this.fetchData()
      })
    }
  }
}
</script>
