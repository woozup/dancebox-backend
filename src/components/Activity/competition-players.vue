
<style lang='scss'>
  .competition-players{
    .el-dialog{
      margin-top: 10vh!important;
      max-height: 80vh;
    }

    .table-actions{
      float: right;width: auto;
    }
  }
</style>

<script>
  import {
    getPlayersList
    ,checkPlayerNumber
    ,createPlayer
  } from '@/api/activity'
  import {
    getAllProject
  } from '@/api/project'

  import {
    Message
  } from 'element-ui'

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
          name: ''
          ,phone: ''
          ,number: ''
          ,project_id: this.dataConf.project_id
          ,activity_id: this.$route.query.id
          ,competition_id: this.$route.query.competition_id- 0
        }
        ,projectList: []
        ,showModal: !!0
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
                      // console.info(this.$route.query.id)
                      return getAllProject()
                      .then(({projects})=>{
                        this.projectList= projects
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

          <el-dialog class=''
            ref='$form'
            visible={this.showModal}
            title={`新增${this.dataConf.name}选手`}
            value={this.formData}
            show-close={false}
            scopedSlots={{
              default: ()=>{
                // this.formData.activity_id= this.$route.query.id- 0
                // this.formData.competition_id= this.$route.query.competition_id- 0
                let checkPending= false

                return <el-form label-position='right' label-width='90px'>
                  <el-form-item label='活动ID' prop='activity_id'>
                    <el-input type='text' disabled value={this.formData.activity_id} />
                  </el-form-item>
                  <el-form-item label='比赛ID' prop='competition_id'>
                    <el-input type='text' disabled value={this.formData.competition_id} />
                  </el-form-item>

                  <el-form-item label='参赛名' prop='name'>
                    <el-input type='text' value={this.formData.name} onChange={
                      ()=> this.formData.name= event.target.value.trim()
                    } />
                  </el-form-item>

                  <el-form-item label='手机' prop='phone'>
                    <el-input type='tel' value={this.formData.phone} onChange={
                      ()=> this.formData.phone= event.target.value.trim()
                    } maxlength='11' />
                  </el-form-item>

                  <el-form-item>
                    <el-select value={this.formData.project_id} placeholder="请选择项目" onChange={
                      ()=>{
                        let dataId= event.target.getAttribute('data-id')|| event.target.parentNode.getAttribute('data-id')
                        if(dataId) this.formData.project_id= dataId- 0
                        else this.formData.project_id= this.projectList[0].id
                      }
                    }>{
                      this.projectList.map(item=>{
                        return <el-option label={item.name} value={item.id} data-id={item.id} />
                      })
                    }</el-select>
                  </el-form-item>

                  <el-form-item label='号码牌' prop='number'>
                    <el-row gutter={0}>
                      <el-col span={16}>
                        <el-input type='text' value={this.formData.number} onChange={
                          ()=> this.formData.number= event.target.value.trim()- 0
                        } disabled={checkPending} />
                      </el-col>
                      <el-col span={8}>
                        <el-button onClick={
                          ()=>{
                            event.preventDefault()
                            checkPending= true
                            console.info(this.store)
                            return checkPlayerNumber({
                              number: this.formData.number
                              ,project_id: this.formData['project_id']
                              ,activity_id: this.formData['activity_id']
                              ,competition_id: this.$route.query['competition_id']
                            })
                            .then(res=>{
                              Message({
                                message: '验证通过!'
                                ,type: 'success'
                                ,duration: 1234
                              })
                            })
                          }
                        } disabled={checkPending} style='float: right;'>验证号码牌</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  {/*modal footer*/}
                  <el-form-item>
                    <el-button type="primary" onClick={
                      ()=>{
                        console.info(this.formData)
                        return createPlayer({
                          ...this.formData
                        })
                        .then(res=>{
                          this.$refs.$form.visible= false
                        })
                        .catch(err=>{
                        })
                      }
                    } disabled={
                      !this.formData.name
                      || !this.formData.phone
                      || !this.formData.number
                      || !this.formData.project_id
                      || !this.formData.activity_id
                      || !this.formData.competition_id
                    }>确认</el-button>
                    <el-button onClick={
                      ()=>{
                        this.toggleModal(false)
                      }
                    }>取消</el-button>
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
        return getPlayersList(this.$route.query.id)
        .then(({players})=>{
          this.dataList= players
        })
        .then(()=>{
          setTimeout(()=> this.dataLoaded= true, 321)
        })
      }
      ,toggleModal(flag){
        this.showModal= !!flag
        this.formData= {
          name: ''
          ,phone: ''
          ,number: ''
          ,project_id: this.dataConf.project_id
          ,activity_id: this.$route.query.id
          ,competition_id: this.$route.query.competition_id- 0
        }
      }
    }
    ,created(){
    }
    ,mounted(){
      this.getDataList()
    }
  }
</script>
