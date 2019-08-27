
<style lang='scss'>
  .competition-referee{
    .table-actions {
      float: right;
      width: auto;
    }

    .el-dialog{
      margin-top: 10vh!important;
      max-height: 80vh;
      overflow: auto;
    }
    .el-checkbox{
      width: 45%;
      &:nth-child(odd){
        margin-left: 0;
      }
    }
  }
</style>

<script>
  import {
    getActivityReferees
  } from '@/api/activity'
  import {
    getAllReferee
    ,create
  } from '@/api/referee'
  import {
    getAllProject
  } from '@/api/project'
  import {
    getCompetitionList
  } from '@/api/competition'

  export default {
    props: {
      dataConf: {
        default: ()=> {}
      }
    }
    ,data(){
      return {
        dataLoaded: false
        ,dataList: []
        ,formData: {
          username: ''
          ,password: ''
          ,referee_id: ''
          ,activity_id: ''
          ,project_id: ''
          ,competition_id: ''
          ,group_ids: []
        }
        ,showModal: !!0
      }
    }
    ,computed: {
      selectedCompitions(){
        return this.formData.group_ids
      }
    }
    ,render(){
      return (
        <section class='competition-referee'>
          <header class=''>
            <el-row gutter={24}>
              <el-col span={14}>
                <p>裁判列表</p>
              </el-col>
              <el-col class='table-actions' >
                  <el-button plain type="primary" size='small' icon="el-icon-plus" onClick={
                    ()=>{
                      // console.info(this.$route.query.id)
                      return Promise.all([
                        getAllProject()
                        ,getAllReferee()
                        ,getCompetitionList(this.$route.query.id)
                      ])
                      .then(([
                        {projects}
                        ,{referees}
                        ,{competitions}
                      ])=>{
                        this.projectList= projects
                        this.refereeList= referees
                        this.competitionList= competitions
                        //event: 拉起modal对话框
                        return new Promise((resolve, reject)=>{
                          this.toggleModal(true)
                          this.$refs.$form.onClose= res=>{
                            if(!res) reject()
                            else resolve(res)
                          }
                        })
                      })
                      //callback: modal对话框收起
                      .then(res=>{
                        console.info(res)
                      })
                      .catch(err=>{
                      })
                    }
                  }>添加裁判</el-button>
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
              prop="referee_name"
              label="裁判昵称"
              width="180"
            />
            <el-table-column
              prop="username"
              label="用户名"
            />
            <el-table-column
              prop="number"
              label="所属赛制"
            />
            <el-table-column
              prop="number"
              label="项目圈"
            />
            <el-table-column label="操作" width='200' scopedSlots={{
              default(){
                return <el-button-group>
                  <el-button round size='mini' type='warning'>修改</el-button>
                  <el-button round size='mini' type='danger'>删除</el-button>
                </el-button-group>
              }
            }} />
          </el-table>

          <el-dialog class=''
            ref='$form'
            visible={this.showModal}
            title={`创建裁判账号`}
            value={this.formData}
            show-close={false}
            scopedSlots={{
              default: ()=>{
                return <el-form label-position='right' label-width='90px'>
                  <el-form-item label='活动ID' prop='activity_id'>
                    <el-input type='text' disabled value={this.formData.activity_id} />
                  </el-form-item>
                  <el-form-item label='比赛ID' prop='competition_id'>
                    <el-input type='text' disabled value={this.formData.competition_id} />
                  </el-form-item>

                  <el-form-item label='用户名' prop='username'>
                    <el-input type='text' value={this.formData.username} onChange={
                      ()=>{
                        this.formData.username= event.target.value.trim()
                      }
                    } />
                  </el-form-item>
                  <el-form-item label='密码' prop='password'>
                    <el-input type='password' value={this.formData.password} onChange={
                      ()=>{
                        this.formData.password= event.target.value.trim()
                      }
                    } />
                  </el-form-item>

                  <el-form-item label='裁判库' prop='referee_id'>
                    <el-select value={this.formData.referee_id} placeholder="从公共库中选择" onChange={
                      ()=>{
                        let dataId= event.target.getAttribute('data-id')|| event.target.parentNode.getAttribute('data-id')
                        if(dataId) this.formData.referee_id= dataId- 0
                        else this.formData.referee_id= this.projectList[0].id
                      }
                    }>{
                      this.refereeList.map(item=>{
                        return <el-option label={item.name} value={item.id} data-id={item.id} />
                      })
                    }</el-select>
                  </el-form-item>

                  <el-form-item label='选择赛制'>
                    <el-select value={this.formData.project_id} placeholder="从公共库中选择" onChange={
                      ()=>{
                      }
                    }>{
                      this.projectList.map(item=>{
                        return <el-option label={item.name} value={item.id} data-id={item.id} />
                      })
                    }</el-select>
                  </el-form-item>

                  <el-form-item label='项目圈' _prop='group_ids'>
                    <el-checkbox-group value={this.selectedCompitions}>{
                      this.competitionList.map((el, il)=>{
                        return <el-checkbox label={el.name} name="groupIDs" data-value={el.id} onChange={
                          ()=>{
                            console.info(event.target.checked, this.formData)
                            this.$nextTick(()=>{
                              if(event.target.checked== true) this.formData.group_ids.push(el.id)
                              else this.formData.group_ids= this.formData.group_ids.filter(ej=> ej.id!= el.id)
                            })
                          }
                        } checked={
                          this.selectedCompitions.filter(ej=> el.id== ej.id).length== 1? true: false
                        }></el-checkbox>
                      })
                    }</el-checkbox-group>
                  </el-form-item>

                  {/*modal footer*/}
                  <el-form-item>
                    <el-button type="primary" onClick={
                      ()=>{
                        console.info(this.formData)
                        return create({
                          ...this.formData
                        })
                        .then(res=>{
                          this.$refs.$form.visible= false
                        })
                        .catch(err=>{
                        })
                      }
                    } disabled={
                      !this.formData.username
                      || !this.formData.password
                      || !this.formData.referee_id
                      || !this.formData.project_id
                      || !this.formData.activity_id
                      || !this.formData.competition_id
                      || !this.formData.group_ids.length
                    }>创建</el-button>
                    <el-button onClick={
                      ()=>{
                        this.toggleModal(false)
                      }
                    }>退出</el-button>
                  </el-form-item>
                  {/*endof modal footer*/}

                </el-form>
              }
            }}
          />
        </section>
      )
    }
    ,methods: {
      getDataList(){
        return getActivityReferees(this.$route.query.id)
        .then(({referee_accounts})=>{
          console.info(this.dataList= referee_accounts)
        })
        .then(()=>{
          this.dataLoaded= true
        })
      }
      ,toggleModal(flag){
        this.showModal= !!flag
        this.formData= {
          username: ''
          ,password: ''
          ,referee_id: ''
          ,group_ids: []
          ,project_id: this.dataConf.project_id
          ,activity_id: this.$route.query.id
          ,competition_id: this.$route.query.competition_id- 0
        }
      }
    }
    ,created(){
      console.clear()
    }
    ,mounted(){
      this.getDataList()
    }
  }
</script>
  