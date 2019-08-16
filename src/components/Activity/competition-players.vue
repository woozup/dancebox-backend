
<style lang='scss'>
  .competition-players{
    .table-actions{
      float: right;width: auto;
    }
  }
</style>

<script>
  import {
    getPlayersList
  } from '@/api/activity'
  export default {
    data(){
      return {
        dataLoaded: false
        ,dataList: [{
          name: 'dude'
          ,project_name: 'Solo'
          ,project_id: 213
        }]
      }
    }
    ,render(){
      return (
        <section class='competition-players'>
          <header class=''>
            <el-row gutter={24}>
              <el-col span={14}>
                <p>报名信息</p>
              </el-col>
              <el-col class='table-actions' >
                <el-button-group>
                  <el-button plain type="primary" size='small' icon="el-icon-plus" onClick={
                    ()=>{
                      console.info(123)
                    }
                  }>新增</el-button>
                  <el-button plain type="primary" size='small' icon="el-icon-document" onClick={
                    ()=>{
                      console.info(233)
                    }
                  }>批量导入</el-button>
                  <el-button plain type="primary" size='small' icon="el-icon-download" onClick={
                    ()=>{
                      console.info(321)
                    }
                  }>批量导出</el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </header>

          <el-table v-loading={!this.dataLoaded} data={this.dataList}>
            <el-table-column
              prop="id"
              label="序号"
              width="180"
            />
            <el-table-column
              prop="name"
              label="选手参赛名"
              width="180"
            />
            <el-table-column
              prop="phone"
              label="联系电话"
            />
            <el-table-column label="项目" scopedSlots={{
              default(prop){
                return <div class="cell">{
                  prop.store.states.filteredData[prop.$index]['project_name']
                  + `(${prop.store.states.filteredData[prop.$index]['project_id']})`
                }</div>
              }
            }} width='100' />
            <el-table-column
              prop="number"
              label="号码牌"
            />
            <el-table-column label="操作" width='200' scopedSlots={{
              default(){
                return <el-button-group>
                  <el-button round size='mini' type='primary'>查看</el-button>
                  <el-button round size='mini' type='warning'>修改</el-button>
                  <el-button round size='mini' type='danger'>删除</el-button>
                </el-button-group>
              }
            }} />
          </el-table>
        </section>
      )
    }
    ,created(){
    }
    ,mounted(){
      getPlayersList(this.$route.query.id)
      .then(res=>{
        this.dataList= res.players
      })
      .then(()=>{
        setTimeout(()=> this.dataLoaded= true, 321)
      })
    }
  }
</script>
