<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <h3 class="panel-title" style="float: left">下载资料管理</h3>
                    <router-link :to="{name:'upload'}" style="float: left;margin-left: 10px;"><i class="iconfont icon-upload" aria-hidden="true"></i></router-link>
                </div>
                <div class="panel-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th style="width:100px;">#</th>
                            <th>文件名</th>
                            <th style="width:100px;">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(table,index) in tablesList" v-if="tablesList&&!loading">
                            <td>{{(index+1)+(currentPage-1)*15}}</td>
                            <td>{{table.tableFile}}</td>
                            <td>
                                <a @click="Delete(table.tableId)"><i class="iconfont icon-trash" aria-hidden="true" style="margin-left:10px;" data-toggle="modal" data-target="#myModal"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="block" v-if="tablesList&& !loading" style="text-align: center;">
                        <Page :total="pageNum" size="small" show-elevator show-total @on-change="handleCurrentChange" :page-size="15" :current="currentPage"></Page>
                    </div>
                    <div v-else-if="loading" class="loading_position">
                        <Spin>
                            <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
                            <div>加载中...</div>
                        </Spin>
                    </div>
                    <div  style="text-align: center" v-else>
                        无
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
                        <h4 class="modal-title">通知</h4>
                    </div>
                    <div class="modal-body">
                        <p>确定要删除吗？</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="deleteTable">是</button>
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
                tablesList:"",
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
                this.axios.get(this.url + "tables/getTables",{params:{pageNum:1}}).then( response => {
                    _self.tablesList=response.data.tablesList.data;
                    _self.pageNum = response.data.tablesList.total;
                    _self.loading = false;
                }).catch( error =>{
                    console.log(error);
                    _self.loading = false;
                });
            },
            Delete(val){
                this.deleteId = val;
            },
            deleteTable(){
                let _self = this;
                this.axios.get(this.url + "tables/deleteTables",{params:{tableId:this.deleteId}}).then( response => {
                    if(response.data.msg == "success"){
                        _self.loading = true;
                        _self.fetchData();
                    }
                }).catch( error =>{
                    console.log(error);
                });
            },
            handleCurrentChange(val) {
                let _self = this;
                _self.loading = true;
                this.currentPage = val;
                this.tablesList = null;
                this.axios.get(this.url + "tables/getTables",{params:{pageNum:val}}).then( response => {
                    _self.loading = false;
                    _self.tablesList=response.data.tablesList.data;
                }).catch( error =>{
                    console.log(error);
                });
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