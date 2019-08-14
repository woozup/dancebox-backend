<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog :visible.sync="dialogFormVisible" title="添加话题">
      <el-form ref="form" :model="form">
        <el-form-item label="话题名称">
          <el-input
            v-model="form.name"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
        <el-form-item label="话题规则">
          <el-input
            v-model="form.desc"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="必须审核">
          <el-switch
            v-model="form.check"
            active-text="先发后审"
            inactive-text="先审后发"/>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="/activity_img/img"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
      <el-table-column label="话题名称" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="话题规则" >
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="审核规则" >
        <template slot-scope="scope">
          {{ scope.row.check === 1 ? '需审核后显示': '无需审核可显示' }}
        </template>
      </el-table-column>
      <el-table-column label="Bnanner" width="110" align="center">
        <template slot-scope="scope">
          <span> <img :src="scope.row.banner" width="50" height="50"></span>
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
import { addTopic, getTopics } from '@/api/community'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['正常', '下线', '删除']
      return statusMap[status]
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
  created() {
    // this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTopics().then(data => {
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
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addTopic(this.form).then(res => {
            console.log(res)
            this.dialogFormVisible = false
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.banner = res.file_name
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
