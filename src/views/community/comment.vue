<template>
  <div>
    <el-select v-model="select" placeholder="请选择" @change="changeStatus">
      <el-option
        key="0"
        label="全部"
        value="3"/>
      <el-option
        key="1"
        label="未审核"
        value="0"/>
      <el-option
        key="2"
        label="已审核"
        value="1"/>
      <el-option
        key="3"
        label="已删除"
        value="2"/>
    </el-select>
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
      <el-table-column label="内容" >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="110">
        <template slot-scope="scope">
          {{ scope.row.user_name }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.user_avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column label="帖子ID" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.post_id }}
        </template>
      </el-table-column>'
      <el-table-column label="评论时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.status | showStatusFilter }}
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
            @click.native.prevent="deleteRow(scope.row.id, 1)"
          >
            <!--{{ scope.row.status === 0 ? 1 : 0 | statusFilter }}-->
            {{ scope.row.status < 1 ? "审核通过" : "" }}

          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row.id, 2)"
          >
            <!--{{ scope.row.status === 0 ? 0 : 1 | statusFilter }}-->
            {{ scope.row.status === 2 ? "" : "删除" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCommentList, setStatus } from '@/api/community'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['审核通过', '删除']
      return statusMap[status]
    },
    showStatusFilter(status) {
      const statusMap = ['未审核', '已审核', '已删除']
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      select: 3
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      getCommentList({ select: this.select }).then((data) => {
        this.listLoading = false
        this.list = data.list
      })
    },
    deleteRow(id, status) {
      setStatus({ status, type: 'comment', id }).then(() => {
        this.fetch()
      })
    },
    changeStatus() {
      this.fetch()
    }
  }
}
</script>

<style scoped>

</style>
