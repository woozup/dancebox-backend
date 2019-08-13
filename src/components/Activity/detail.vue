<template>
  <div class="main">
    <el-tabs style="width: 100%; height:50%" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="detail" :key="'detail'"
      before-leave="true">
        <activity_info v-if="isDetail"></activity_info>
      </el-tab-pane>
      <el-tab-pane label="项目赛制" name="competition" :key="'competition'" before-leave="true">
        <competition v-if="isCompetition"></competition>    
      </el-tab-pane>
      <el-tab-pane label="选手管理" name="player" :key="'player'">
        <competition v-if="isPlayer"></competition>    
      </el-tab-pane>
      <el-tab-pane label="裁判设置" name="referee" :key="'referee'">
        <competition v-if="isReferee"></competition>    
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
import activity from './activity'
import competition from './competition'
import { mapState } from 'vuex'
import { putStatus, getDetail } from '@/api/activity'
import Tiny from '../Tinymce'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['上线', '下线', '删除']
      return statusMap[status]
    }
  },
  components: {
    guest: guest,
    project: project,
    sponsor: sponsor,
    organizer: organizer,
    teacher: teacher,
    Tiny,
    activity_info: activity,
    competition
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      activeName: "detail",
      isDetail:true,
      isCompetition:false,
      isPlayer:false,
      isReferee:false,
      activityName: null
    }
  },
  computed: {
    ...mapState({
      detail: state => state.activity.detail
    })
  },
  created() {
    this.$store.dispatch('getDetail', this.$route.query.id)
  },
  mounted() {
  },
  methods: {
    handleClick(tab) {
      switch(tab.name) {
        case 'detail':
          this.isDetail = true;
          this.isCompetition = false;
          this.isPlayer = false;
          this.isReferee = false;
          this.$store.dispatch('getDetail', this.$route.query.id)
          break;
        case 'competition':
          this.isDetail = false;
          this.isCompetition = true;
          this.isPlayer = false;
          this.isReferee = false;
          this.$store.dispatch('getCompetitions', this.$route.query.id)
          break;
        case 'player':
          this.isDetail = false;
          this.isCompetition = false;
          this.isPlayer = true;
          this.isReferee = false;
          break;
        case 'referee':
          this.isDetail = false;
          this.isCompetition = false;
          this.isPlayer = false;
          this.isReferee = true;
          break; 
      }
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
</style>
