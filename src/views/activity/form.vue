<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="活动标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </div>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city" placeholder="请输入城市名，如：（上海） 不要输入(上海市)"/>
      </el-form-item>
      <el-form-item label="活动地址">
        <el-input v-model="form.location" />
      </el-form-item>
      <el-form-item label="活动封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="/activity_img/img"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>

      </el-form-item>
      <el-form-item label="活动Banner">
        <el-upload
          :show-file-list="false"
          :on-success="handleBannerSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="/activity_img/img"
        >
          <img v-if="BannerImageUrl" :src="BannerImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动标签">
        <el-checkbox-group v-model="form.remark">
          <el-checkbox label="赛事" name="type" value="赛事" />
          <el-checkbox label="授课" name="type" value="授课" />
          <el-checkbox label="演出" name="type" value="演出" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="舞种">
        <el-select
          v-model="form.dance"
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
      </el-form-item>
      <el-form-item label="购买的url">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dance: [
        'POPPING',
        'LOCKING',
        'HIPHOP',
        'BREAKING',
        'URBRAN',
        'WAACKING',
        'HOUSE',
        'FREESTYLE',
        '齐舞',
        '少儿齐舞',
        '少儿BATTLE'
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        remark: [],
        desc: '',
        project: [],
        img: '',
        dance: [],
        url: ''
      },
      imageUrl: '',
      BannerImageUrl: '',
      options3: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('createActivity', this.form)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/activity/list' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.img = res.file_name
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleBannerSuccess(res, file) {
      this.form.banner_img = res.file_name
      this.BannerImageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    change(data) {
      this.dance_list = data
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
