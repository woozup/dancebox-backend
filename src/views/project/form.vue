<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="舞种">
        <el-select
          v-model="form.dance"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择"
          @change="change"
        >
          <el-option
            v-for="item in dance"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="单位参赛人数">
        <div>
          <el-select
            v-model="form.unit_number"
            filterable
            allow-create
            default-first-option
            placeholder="请选择"
            @change="numberChange"
          >
            <el-option v-for="(item, key) in unit_number"
              :key="key"
              :label="item"
              :value="key">
            </el-option> 
        </el-select>
        </div>
      </el-form-item>
      <el-dialog :visible.sync="dialogFormVisible" title="自定义区间值">
        <el-col :span="12">
        <el-form-item label="最小值：">
            <el-input  v-model="form.min" type="number"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="最大值：">
            <el-input v-model="form.max" type="number"></el-input>
        </el-form-item>
        </el-col>
        <div slot="footer" class="dialog-footer">
          <el-button @click="numberCancel">取 消</el-button>
          <el-button type="primary" @click="numberSubmit">确 定</el-button>
        </div>
      </el-dialog>
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
      unit_number: [
        '1人',
        '2人',
        '3人',
        '自定义区间值'
      ],
      form: {
        name: '',
        dance: [],
        min: 0,
        max: 0,
      },
      dialogFormVisible: false
    }
  },
  methods: {
    numberChange(picker) {
      if (picker === 3) this.dialogFormVisible = true
      else {
        this.form.min = picker + 1
        this.form.max = picker + 1
      }
    },
    numberCancel() {
      this.form.min = 0 
      this.form.max = 0
      this.dialogFormVisible = false
    },
    numberSubmit() {
      this.dialogFormVisible = false
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let { name, dance, min, max } = this.form;
          let postData = {
            name, dance,
            unit_number: { min, max }
          }
          this.$store.dispatch('createProject', postData)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/project/list' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
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
