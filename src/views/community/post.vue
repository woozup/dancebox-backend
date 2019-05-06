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
      <el-table-column label="帖子名称" >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="帖子内容" >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="评论数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.comment }}
        </template>
      </el-table-column>
      <el-table-column label="赞数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.up }}
        </template>
      </el-table-column>'
      <el-table-column label="话题" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.topic_name }}
        </template>
      </el-table-column>
      <el-table-column label="发帖时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
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
            @click.native.prevent="showDetail(scope.row.id)"
          >
            置顶
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPost } from '@/api/community'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['正常', '下线', '删除']
      return statusMap[status]
    },
    genderFilter(gender) {
      const map = ['未知', '男', '女']
      return map[gender]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        name: '',
        banner: '',
        desc: ''
      },
      imgUrl: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPost().then(data => {
        console.log(data)
        this.list = data.list
      }).catch(e => {
        console.error(e)
      })
      this.listLoading = false
    },
    deleteRow(id, status) {
      console.log(id)
      // putStatus({ id, status }).then(() => {
      //   this.fetchData()
      // })
    },
    showDetail(id) {
      this.$router.push({ path: '/activity/detail', query: { id }})
    }
  }
}
</script>
<style scoped>
  .line {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
