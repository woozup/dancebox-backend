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
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="关联舞种" align="center">
        <template slot-scope="scope">
          {{ scope.row.dance }}
        </template>
      </el-table-column>
      <el-table-column label="参赛者人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.unit_number | unitNumberFilter }}
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
    <el-dialog :visible.sync="dialogFormVisible" title="修改项目">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="项目名称">
        <el-input v-model="project.name" style="width:200px"/>
      </el-form-item>
      <el-form-item label="舞种">
        <el-select
          v-model="project.dance"
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
        <el-col :span="15">
          <el-form-item label="最小值：">
            <el-input v-model="project.unit_number.min" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="最大值：">
            <el-input v-model="project.unit_number.max" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProject, deleteProject, getProjectDetail, update } from '@/api/project'
export default {
  filters: {
    unitNumberFilter(unit_number) {
      const { min, max } = unit_number
      if (max === min) return unit_number.min;
      else return `${min} ~ ${max}`; 
    },

  },
  data() {
    return {
      list: null,
      listLoading: true,
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
      dialogFormVisible: false,
      project: {
        name: null,
        dance: [],
        unit_number: { min: 0, max: 0 }
      },
      project_id: -1
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllProject().then(data => {
        this.list = data.projects
      }).catch(e => {
        console.error(e)
      })
      this.listLoading = false
    },
    deleteRow(id) {
      deleteProject(id).then(() => {
        this.fetchData()
      })
    },
    showDetail(id) {
      getProjectDetail(id).then(data => {
        this.dialogFormVisible = true
        this.project = data.project
        this.project_id = id
      }) 
    },
    change(data) {
      this.project.dance = data
    },
    onSubmit() {
      update(this.project_id, this.project).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
      }).catch(e => {
        console.error(e)
      })
    }
  }
}
</script>
