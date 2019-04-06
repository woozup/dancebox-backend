<template>
  <div class="main">
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
      <el-table-column label="标题" >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="标签" >
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <span> <img :src="'/api/img/' +scope.row.img" width="100" height="100"></span>
        </template>
      </el-table-column>
      <el-table-column label="位置" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="城市" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.start_time }}</span>
          <i class="el-icon-time"/>
          <span>{{ scope.row.end_time }}</span>
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
            @click.native.prevent="deleteRow(scope.row.id)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="game">
      <h1>赛事</h1>
      <el-button type="text" @click="dialogFormVisible = true">添加赛事</el-button>
      <el-dialog
        :visible.sync="dialogFormVisible"
        title="赛事详情"
      >
        <el-form :model="form">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="form.detail"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <guest/>
      <project/>
      <el-button>保存</el-button>
    </div>
  </div>
</template>

<script>
import guest from './guest'
import project from './project'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['上线', '下线', '删除']
      return statusMap[status]
    }
  },
  components: {
    guest: guest,
    project: project
  },
  data() {
    return {
      list: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      listLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        detail: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style scoped>
.main{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.game{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
}
</style>
