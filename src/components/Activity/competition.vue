<template>
  <div class="competition">
    <h3>海选项目赛制</h3>
    <el-button type="primary" @click="getData">创建项目赛制</el-button>
    <el-dialog :visible.sync="dialogFormVisible" title="创建项目赛制">
      <el-form ref="com_item" :model="com_item">
        <el-form-item label="活动名称">
          <template>
            <el-input v-model="this.detail.activity.title"
            :disabled="true"/>
          </template>
        </el-form-item>
        <el-form-item label="赛制名称">
          <template>
            <el-input v-model="com_item.name"/>
          </template>
        </el-form-item>
        <el-form-item label="选择项目">
          <el-select v-model="select_pro_id" 
            filterable
            default-first-option
            placeholder="请选择"
            @change="selectPro"
        >
          <el-option
            v-for="(item, $index) in pro_list"
            :key='$index'
            :label="item.name"
            :value="item.id" /> 
        </el-select>
        </el-form-item>
        <el-form-item label="晋级人数">
          <template>
            <el-input-number v-model="com_item.win_count" :min="1" 
            :step="1" step-strictly></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="裁判人数">
          <template>
            <el-input-number v-model="com_item.referee_count" :min="1" 
            :step="1" step-strictly></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="评分模板">
          <el-select v-model="select_tem_id" 
            filterable
            default-first-option
            placeholder="请选择"
            @change="selectTem"
        >
          <el-option
            v-for="(item, $index) in tem_list"
            :key='$index'
            :label="item.name"
            :value="item.id" /> 
        </el-select>
        </el-form-item>
        <el-form-item label="分组">
          <template>
            <el-table 
            :data="com_item.groups"
            style="width: 100%">
              <el-table-column label="分组名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" type="text" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="号码牌分组区间">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.min" type="number" size="mini" ></el-input>
                -
                  <el-input v-model="scope.row.max" type="number" size="mini" rows="1"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click.native.prevent="addTemRow(scope.row.row_num)">新增</el-button>
                  <el-button
                    size="mini"
                    @click="deleteTemRow(scope.row.row_num)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="competitions"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="项目ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="晋级人数" width="95">
        <template slot-scope="scope">
          {{ scope.row.win_count }}
        </template>
      </el-table-column>
      <el-table-column label="裁判人数" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.referee_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分模板">
        <template slot-scope="scope">
          {{ scope.row.grade_template_name }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent=""
          >
            选手管理
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent=""
          >
            查看评分
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteCompetition, createCompetition, getCompetitionList } from '@/api/competition'
import { getAllProject } from '@/api/project'
import { getAllTemplate } from '@/api/template'
export default {
  name: "competition",
  filters: {
    
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      activeName: "competition",
      activity_id: null,
      com_item: {
        name: '',
        win_count: 1,
        referee_count: 1,
        groups: [{
          row_num: 0,
          name: '',
          min: '',
          max: ''
        }]
      },
      row_num: 0,
      pro_list: [],
      tem_list: [],
      select_pro_id: '',
      select_tem_id: ''
    }
  },
  computed: {
    ...mapState({
      competitions: state => state.activity.competitions
    }),
    ...mapState({
      detail: state => state.activity.detail
    })
  },
  mounted() {
  },
  methods: {
    async getData(){
      this.dialogFormVisible = true
      let [pdata, tdata] = await Promise.all([
          getAllProject(),
          getAllTemplate()
        ]);
      this.pro_list = pdata.projects;
      this.tem_list = tdata.templates;
    },
  
    deleteRow(id) {
      this.activity_id = this.$route.query.id;
      deleteCompetition(this.activity_id, id).then(() => {
        this.$store.dispatch('getCompetitions', this.$route.query.id)
      })
    },
    selectPro(data) {
      this.select_pro = data;
    },
    selectTem(data) {
      this.select_tem = data
    },
    addTemRow(id){
      this.row_num += 1;
      this.com_item.groups.push({
          row_num: this.row_num,
          name: '',
          min: '',
          max: ''
        })
    },
    deleteTemRow(id){
      if(id !== 0) {
        this.com_item.groups.forEach((v, i) => {
          if(v.row_num == id) {
            this.com_item.groups.splice(id, 1)
          }
        })
      }
    },
    onSubmit() {
      this.loading = true
      let data = this.com_item;
      data.activity_id = this.detail.activity.id;
      data.project_id = this.select_pro_id;
      data.template_id = this.select_tem_id;
      createCompetition(data).then(() => {
          this.loading = false
          this.dialogFormVisible = false;
          this.$store.dispatch('getCompetitions', data.activity_id)
        })
        .catch(() => {
          this.loading = false
        })
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
