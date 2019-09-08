<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="裁判名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="裁判头像" align="center">
        <template slot-scope="scope">
          <span> <img :src="scope.row.avatar" width="50" height="50"></span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender | genderFilter }}
        </template>
      </el-table-column>
      <el-table-column label="国家和地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.country }}
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
            @click.native.prevent="showDetail(scope.row.id)"
          >
            修改
          </el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" title="修改裁判">
      <el-form ref="form" :model="referee" label-width="120px">
        <el-form-item label="裁判名称">
          <el-input v-model="referee.name" style="width:200px"/>
        </el-form-item>

        <el-form-item label="裁判头像">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="/activity_img/img"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" width="100" height="100">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="性别">
          <div>
            <el-select
              v-model="referee.gender"
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
              @change="genderChange"
            >
              <el-option v-for="(item, key) in gender"
                :key="key"
                :label="item"
                :value="key">
              </el-option> 
          </el-select>
          </div>
        </el-form-item>

        <el-form-item label="国家地区">
          <el-input v-model="referee.country" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input v-model="referee.profile" placeholder="请输入简介，限制150字" type="textarea" rows="5"></el-input>
        </el-form-item>

        <el-button type="primary" @click="onSubmit()">提交</el-button>
      <!-- </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllReferee, deleteReferee, getRefereeDetail, update } from '@/api/referee'
export default {
  filters: {
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
      gender: ['未知', '男', '女'],
      referee: {
        name: '',
        gender: null,
        country: '',
        avatar: '',
        profile: ''
      },
      imgUrl: '',
      referee_id: -1
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllReferee().then(data => {
        this.list = data.referees
      }).catch(e => {
        console.error(e)
      })
      this.listLoading = false
    },
    deleteRow(id) {
      deleteReferee(id).then(() => {
        this.fetchData()
      })
    },
    showDetail(id) {
      getRefereeDetail(id).then(data => {
        this.dialogFormVisible = true
        this.referee = data.referee
        this.imgUrl = this.referee.avatar
        this.referee_id = id
      }) 
    },
    onSubmit() {
      update(this.referee_id, this.referee).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
      }).catch(e => {
        console.error(e)
      })
    },
    handleAvatarSuccess(res, file) {
      this.referee.avatar = res.file_name
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    genderChange(data) {
      this.referee.gender = data
    }
  }
}
</script>
