<template lang="html">
   <div class="index">
     <h3>蜂巢活动后台数据查看</h3>
     <Row>
       <Col span="24" class="update">
          <Button @click="update">下载Excel</Button>
       </Col>
        <Col span="24">
           <Table :columns="columns1" :data="data"></Table>
           <page class-name="pageName" :total="page.total" :current.sync="page.current" :page-size="page.pageSize" show-total></Page>
        </Col>
        
    </Row>
       
      
    </div>
</template> 
<script>

import {userPaging} from '../../../js/serverBa';
export default {
  name:'index',
  data:function(){
    return {
        page:{
          total:1,
          current:1,
          pageSize:20
        },
        columns1: [
            {
                title: '排名',
                key: 'uid'
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '手机号',
                key: 'phone'
            },
            {
                title: '邮箱',
                key: 'email'
            },
            {
                title: '年龄段',
                key: 'age'
            },
            {
                title: '性别',
                key: 'gender'
            },
            {
                title: '了解程度',
                key: 'chainLevel'
            },
            {
                title: '诗句',
                key: 'poems'
            },
            {
                title: 'hash值',
                key: 'hash'
            },
            {
                title: '入场场次',
                key: 'entryTime'
            },
            {
                title: '参与时间',
                key: 'createdAt'
            }
        ],
        data: [
            
        ]
        
    }
  },
  watch:{
    'page.current'(){
      this.tableAjax();
    }
  },
  mounted(){
     this.tableAjax();
  },
  computed: {
    
  },
  components:{
     
  },
  methods:{
    update(){
      let time=new Date().getTimezoneOffset()/60;
      location.href=`//power.api.blockchaincentreglobal.com/api/honeycomb/userExport?subhours=${time}`
    },
    tableAjax(){
      let obj={};
      obj.page=this.page.current;
      obj.perPage=this.page.pageSize;
      userPaging(obj,(data)=>{
        if(data.code===200){
           this.data=data.datas;
           this.page.total=data.total;
        }else{
           this.$Notice.error({
                title: '错误提示',
                desc: data.message
            });
        }
        
      },(err)=>{
         this.$Notice.error({
                title: '错误提示',
                desc: err
            });
      })
    }
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.index{
  padding:20px;
  h3{
    border-bottom:1px solid #eee;
    line-height:30px;
    margin-bottom:20px;
  }
   .update{
     margin-bottom:20px;
   }
   .pageName{
     margin-top:20px;
   }

   
   
}
</style>