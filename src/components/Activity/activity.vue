<template>
  <div class="activity_info">
    <el-table
      v-loading="listLoading"
      :data="[detail.activity]"
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
          <span> <img :src="scope.row.img" width="100" height="100"></span>
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
          <el-tag :type="scope.row.status | statusFilter">  {{ scope.row.status === 0 ? 1 : 0 | statusFilter }}</el-tag>

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
            @click.native.prevent="deleteRow(scope.row.id, 2)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-tabs type="card" class="detail">
      <el-tab-pane label="赛事" name="first">
        <div class="game">
          <h1>赛事</h1>
          <el-button type="text" @click="dialogFormVisible = true">编辑详情</el-button>
          <el-dialog
            :visible.sync="dialogFormVisible"
            title="赛事详情"
          >
            <el-form>
              <Tiny id="desc"/>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <p v-html='detail.game.desc'></p>
          <project/>
          <guest/>
          <organizer/>
          <sponsor/>
          <el-button @click="saveGame">保存</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="授课" name="second">
        <div class="teach">
          <h1>授课</h1>
          <el-button type="text" @click="dialogFormVisible2= true">编辑授课信息</el-button>
          <el-dialog
            :visible.sync="dialogFormVisible2"
            title="赛事详情"
          >
            <el-form>
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="detail.teach_info.desc"
                type="textarea"
                placeholder="请输入内容"
              />
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="detail.teach_info.time"
                type="textarea"
                placeholder="请输入授课时间"
              />
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="detail.teach_info.location"
                type="textarea"
                placeholder="请输入授课地址"
              />
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
            </div>
          </el-dialog>
          <p>{{ detail.teach_info.desc }}</p>
          <p>{{ detail.teach_info.time }}</p>
          <p>{{ detail.teach_info.location }}</p>
          <div>
            <teacher/>
          </div>
          <el-button @click="saveTeach">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import guest from './guest'
import project from './project'
import organizer from './organizer'
import sponsor from './sponsor'
import teacher from './teacher'
import { mapState } from 'vuex'
import { putStatus } from '@/api/activity'
import Tiny from '../Tinymce'
export default {
  name: "activity_info",
  filters: {
    statusFilter(status) {
      const statusMap = ['上线', '下线', '删除']
      return statusMap[status]
    }
  },
  components: {
    guest
    ,project
    ,sponsor
    ,organizer
    ,teacher
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      activeName: "detail"
    }
  },
  computed: {
    ...mapState({
      detail: state => state.activity.detail
    })
  },
  watch: {
    detail(val) {
    }
  },
  // created() {
  //   this.$store.dispatch('getDetail', this.$route.query.id)
  // },
  mounted() {
  },
  methods: {
    saveGame() {
      this.$store.dispatch('createGame', { activity_id: this.$route.query.id })
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success'
      })
    },
    saveTeach() {
      this.$store.dispatch('createTeach', { activity_id: this.$route.query.id })
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success'
      })
    },
    deleteRow(id, status) {
      console.log(id)
      putStatus({ id, status }).then(() => {
        // this.fetchData()
        this.$router.push('/activity/list')
      })
    },
    submitText(text) {
      console.log(1111,text)
      this.detail.game.desc = text
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
  max-width: 1200px;
}
.teach{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
}
  .detail{
    width: 1200px;
    margin-top: 20px;
  }
</style>
