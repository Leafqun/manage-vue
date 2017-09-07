<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right">
                        <Input v-model="input" icon="ios-search" placeholder="课程搜索" style="width: 200px"></Input>
                    </div>
                    <h3 class="panel-title" style="float: left;">课程管理</h3>
                    <div style="float: left;margin-left:20px;margin-top:2px;"><router-link to="/manage/course/add"><i class="fa fa-plus" aria-hidden="true"></i></router-link></div>
                </div>
                <div class="panel-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>课程中文名</th>
                            <th>课程英文名</th>
                            <th>
                                <Tooltip content="课程编辑、课程文件管理、以及课程删除" placement="top">
                                    操作
                                </Tooltip>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(course,index) in courseList" v-if="course.courseName.indexOf(input)>-1||input ==''">
                            <td>{{(index+1)}}</td>
                            <td>{{course.courseName}}</td>
                            <td>{{course.enName}}</td>
                            <td>
                                <router-link :to="{name:'course_edit',params:{courseId:course.courseId}}"><i class="iconfont icon-pen2" aria-hidden="true"></i></router-link>
                                <router-link :to="{name:'course_file_manage',params:{courseId:course.courseId}}" style="margin-left:10px;"><i class="iconfont icon-file" aria-hidden="true"></i></router-link>
                                <a @click="Delete(course.courseId)"><i class="iconfont icon-trash" aria-hidden="true" style="margin-left:10px;" data-toggle="modal" data-target="#myModal"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--<div v-for="course in courseList" class="course" v-if="course.courseName.indexOf(input)>-1||input ==''">
                        <router-link :to="{name:'course_file_manage',params:{courseId:course.courseId}}">{{course.courseName}}</router-link>
                    </div>-->
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
    import url from '../../router/url';
    export default {
        data() {
            return {
                courseList:"",
                input:"",
                deleteId:null,
            }
        },
        created() {
            this.fetchData();
        },
        watch:{
            '$route': 'fetchData',
            input:function(){

            }
        },
        methods: {
            fetchData() {
                let _self = this;
                this.axios.get(this.url+"course/getCourseList").then(function (response) {
                    _self.courseList = response.data.courseList;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            Delete(val){
                this.deleteId = val;
            },
            deleteMessage(){
                let _self = this;
                this.axios.get(this.url + "course/deleteCourse",{params:{courseId:this.deleteId}}).then(function (response) {
                    if(response.data.msg == "success"){
                        _self.fetchData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            }
        }
    }
</script>

<style scoped>
    a:hover {
        color: #d90a81
    }
    .course{
        float:left;
        margin-left:70px;
        margin-top:20px;
    }
</style>