<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="模版名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="分制">
        <div>
          <el-select
            v-model="form.scale_type"
            filterable
            allow-create
            default-first-option
            placeholder="请选择"
            @change="scaleChange"
          >
            <el-option v-for="(item, key) in scale"
              :key="key"
              :label="item"
              :value="key">
            </el-option> 
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="排名依据">
        <div>
          <el-select
            v-model="form.rank_type"
            filterable
            allow-create
            default-first-option
            placeholder="请选择"
            @change="rankChange"
          >
            <el-option v-for="(item, key) in rank"
              :key="key"
              :label="item"
              :value="key">
            </el-option> 
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-table
        :data="form.criterias"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%">
          <el-table-column label="评分项名称" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="权重" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.weight" type="number" min="0" max="100"
              :change="check_num(scope.row.row_num)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button
              type="text"
              size="small"
              @click.native.prevent="addRow(scope.row.row_num)"
            >
              新增
              </el-button>
              <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.row.row_num)"
            >
              删除
            </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      loading: false,
      scale: ['百分制', '十分制'],
      rank: ['平均分', '总分'],
      form: {
        name: '',
        scale_type: 0,
        rank_type: 0,
        criterias: [{
          row_num: 0,
          name: '',
          weight: ''
        }]
      },
      row_num: 0
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.scale_type += 1
          this.form.rank_type += 1
          this.$store.dispatch('createTemplate', this.form)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/template/list' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    scaleChange(picker) {
      this.form.scale_type = picker
    },
    rankChange(picker) {
      this.form.rank_type = picker
    },
    deleteRow(id) {
      if(id !== 0) {
        this.form.criterias.forEach((v, i) => {
          if(v.row_num == id) {
            this.form.criterias.splice(id, 1)
          }
        })
      }
    },
    addRow(id){
      this.row_num += 1;
      this.form.criterias.push({
          row_num: this.row_num,
          name: '',
          weight: ''
        })
    },
    check_num(row_num) {
      let weight = this.form.criterias[row_num].weight;
      if (weight > 100) weight = 100;
      else if (weight < 0) weight = 0;
      if ((weight + '').indexOf('.') > 0) {
           // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          weight = parseInt(weight);
      }
      this.form.criterias[row_num].weight = weight;
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
