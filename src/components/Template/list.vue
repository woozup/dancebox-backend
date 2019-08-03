<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="模板ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="模板名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="分值" align="center">
        <template slot-scope="scope">
          {{ scope.row.scale_type | scaleFilter }}
        </template>
      </el-table-column>
      <el-table-column label="总排名依据" align="center">
        <template slot-scope="scope">
          {{ scope.row.rank_type | rankFilter }}
        </template>
      </el-table-column>
      <el-table-column label="子份项目" align="center">
        <template slot-scope="scope">
          {{ scope.row.criterias | criteriasFilter }}
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
            @click.native.prevent="deleteRow(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllTemplate, deleteTemplate, getTemplateDetail } from '@/api/template'
export default {
  filters: {
    scaleFilter(scale) {
      const map = ['未知', '百分制', '十分制']
      return map[scale]
    },
    rankFilter(rank) {
      const map = ['未知', '平均分', '总分']
      return map[rank]
    },
    criteriasFilter(criterias) {
      if (criterias && criterias.length) {
        let c = criterias.reduce((result, c) => {
          if(c.name) result += c.name + '/';
          return result
        }, '')
        return c.slice(0, -1)
      } else return '';
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      gender: ['未知', '男', '女'],
      referee: {
        name: '',
        gender: null,
        country: '',
        avatar: '',
        profile: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllTemplate().then(data => {
        this.list = data.templates
      }).catch(e => {
        console.error(e)
      })
      this.listLoading = false
    },
    deleteRow(id) {
      deleteTemplate(id).then(() => {
        this.fetchData()
      })
    }
  }
}
</script>

