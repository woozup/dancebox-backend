<template>
  <div class="app-container">
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
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="置顶值" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column label="是否首页推荐" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.recommend | recommandFilter }}
        </template>
      </el-table-column>
      <el-table-column label="是否为首页置顶" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.recommend === 2 ? '是': '否' }}
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
            {{ scope.row.status === 0 ? '审核' : '' }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row.id, scope.row.status !== 2 ? 2 : 0)"
          >
            {{ scope.row.status !== 2 ? '删除' : '恢复' }}
          </el-button>

          <el-button
            type="text"
            size="small"
            @click.native.prevent="setUp(scope.row.id)"
          >
            置顶
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="setRecommand(scope.row.id, scope.row.recommend === 0 ? 1 : 0)"
          >
            {{ scope.row.recommend === 0 ? '设置推荐' : '取消推荐' }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="setRecommand(scope.row.id, scope.row.recommend < 1 ? 2 : 0)"
          >
            {{ 1> scope.row.recommend ? ' 置顶到首页' : '取消置顶到首页' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="page_hidden"
      :total="5"
      layout="prev, pager, next"/>
  </div>
</template>

<script>
import { getPost, setStatus, setUp, setRecommand } from '@/api/community'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['未审核', '已审核', '已删除']
      return statusMap[status]
    },
    genderFilter(gender) {
      const map = ['未知', '男', '女']
      return map[gender]
    },
    recommandFilter(gender) {
      const map = ['不推荐', '推荐', '推荐']
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
      imgUrl: '',
      select: 0,
      page_hidden: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPost({ select: this.select }).then(data => {
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
      setStatus({ status, id, type: 'post' }).then(() => {
        this.fetchData()
      })
    },
    showDetail(id) {
      this.$router.push({ path: '/activity/detail', query: { id }})
    },
    setUp(id) {
      const num = prompt('请输入置顶的排序值，越大越靠前')
      setUp({ id, sort: num, type: 'post' }).then(() => {
        this.fetchData()
      })
    },
    changeStatus() {
      this.fetchData()
    },
    setRecommand(id, status) {
      setRecommand({
        id, recommend: status
      }).then(() => {
        this.fetchData()
      })
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
