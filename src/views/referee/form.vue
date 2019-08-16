<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="裁判名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="裁判头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="/activity_img/img"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别">
        <div>
          <el-select
            v-model="form.gender"
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
        <el-input v-model="form.country" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="form.profile" placeholder="请输入简介，限制150字" type="textarea" rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: ['未知', '男', '女'],
      country: [
        '中国',
        '日本'
      ],
      form: {
        name: '',
        gender: null,
        avatar: '',
        country: null,
        profile: ''
      },
      imgUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.file_name
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          console.log(this.form)
          this.$store.dispatch('createReferee', this.form)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/referee/list' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    genderChange(data) {
      this.form.gender = data
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
