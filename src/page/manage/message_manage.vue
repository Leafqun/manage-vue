<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading">
                    <h3 class="panel-title">留言管理</h3>
                </div>
                <div class="panel-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>学生</th>
                            <th>email</th>
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(message,index) in messageList" v-if="messageList&& !loading">
                            <td>{{(index+1)+(currentPage-1)*10}}</td>
                            <td>{{message.stuName}}</td>
                            <td>{{message.email}}</td>
                            <td>{{message.mTime|time}}</td>
                            <td>
                                <router-link :to="{name:'message_content',params:{messageId:message.messageId}}"><i class="iconfont icon-pen2" aria-hidden="true"></i></router-link>
                                <a @click="Delete(message.messageId)"><i class="iconfont icon-trash" aria-hidden="true" style="margin-left:10px;" data-toggle="modal" data-target="#myModal"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-if="loading" class="loading_position">
                        <Spin>
                            <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
                            <div>加载中...</div>
                        </Spin>
                    </div>
                    <div class="block" v-if="messageList&& !loading" style="text-align: center">
                        <Page :total="pageNum" size="small" show-elevator show-total @on-change="handleCurrentChange" :page-size="15" :current="currentPage"></Page>
                    </div>
                    <div v-if="!loading&&messageList ==null" style="text-align: center">
                        无留言
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">留言</h4>
                    </div>
                    <div class="modal-body">
                        <p>确定要删除吗？</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="deleteMessage">是</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">否</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                messageList:null,
                pageNum:1,
                deleteId:null,
                currentPage:1,
                loading:true
            }
        },
        created(){
            this.fetchData();
        },
        watch:{
            '$route': 'fetchData'
        },
        methods:{
            fetchData(){
                let _self = this;
                this.axios.get(this.url + "message/getMessageList",{params:{pageNum:1}}).then(function (response) {
                    _self.messageList = response.data.messageList.data;
                    _self.pageNum = response.data.messageList.pageNum;
                    _self.loading = false;
                }).catch(function (error) {
                    console.log(error);
                    _self.loading = false;
                });
            },
            Delete(val){
                this.deleteId = val;
            },
            deleteMessage(){
                let _self = this;
                this.axios.get(this.url + "message/deleteMessage.do",{params:{messageId:this.deleteId}}).then(function (response) {
                    if(response.data.msg == "success"){
                        _self.loading = true;
                        _self.fetchData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            },
            handleCurrentChange(val) {
                let _self = this;
                _self.currentPage = val;
                _self.loading = true;
                _self.messageList = null;
                this.axios.post(this.url + "message/getMessageList.do",{params:{pageNum:val}}).then(function (response) {
                    _self.messageList=response.data.messageList.data;
                    _self.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        filters:{
            time:function(value) {
                var date = new Date(value);
               var  Y = date.getFullYear(),
                    m = date.getMonth() + 1,
                    d = date.getDate(),
                    H = date.getHours(),
                    i = date.getMinutes(),
                    s = date.getSeconds();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                if (H < 10) {
                    H = '0' + H;
                }
                if (i < 10) {
                    i = '0' + i;
                }
                if (s < 10) {
                    s = '0' + s;
                }
                var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
                return t;
            }
        }
    }
</script>

<style scoped>
    a:hover {color: #d90a81}
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .loading_position{
        position:relative;
        margin:auto auto;
    }
</style>