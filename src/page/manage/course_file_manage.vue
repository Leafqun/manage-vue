<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right;">
                        <router-link to="/manage/course"><i class="iconfont icon-back" aria-hidden="true"></i>
                        </router-link>
                    </div>
                    <h3 class="panel-title">{{course.courseName}}</h3>
                    <div style="overflow: hidden;">
                        <Radio-group v-model="radio" type="button">
                            <Radio label="课程资源"></Radio>
                            <Radio label="课程视频"></Radio>
                        </Radio-group>
                        <router-link :to="{name:'course_file_upload',params:{ctype:type}}" style="margin-left: 10px"><i
                                class="iconfont icon-upload" aria-hidden="true"></i></router-link>
                        <div style="float:right">
                            <button class="button" @click="batchDelete">批量删除<i class="fa fa-trash" aria-hidden="true"
                                                                               style="margin-left:10px;"></i></button>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <form id="form3" action="javascript:void(0)" method="post">
                        <table class="table">
                            <thead>
                            <tr>
                                <th><input type="checkbox" :value="true" v-model="checkAll"></th>
                                <th style="width:700px;">文件名</th>
                                <th style="width:100px;">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(courseFile,index) in courseFileList"
                                v-if="!loading&&courseFileList&&courseFile.ctype == type">
                                <td>
                                    <input type="checkbox" name="cfileId[]" :value="courseFile.cfileId">
                                </td>
                                <td>{{courseFile.cfileName}}</td>
                                <td>
                                    <a @click="Delete(courseFile.cfileId)"><i class="iconfont icon-trash" aria-hidden="true"
                                                                              style="margin-left:10px;"
                                                                              data-toggle="modal"
                                                                              data-target="#myModal"></i></a>
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
                        <div v-if="!loading&&courseFileList==null" style="text-align: center">
                            无留言
                        </div>
                    </form>
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
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="deleteTable">是
                        </button>
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
                course: "",
                courseFileList: "",
                radio: "课程资源",
                deleteId: null,
                checkAll: "",
                loading: true
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData',
            checkAll: function (val) {
                if (val === true) {
                    $("input[type='checkbox']").attr("checked", "true");
                } else {
                    $("input[type='checkbox']").removeAttr("checked");
                }
            }
        },
        computed: {
            type: function () {
                if (this.radio == '课程资源') {
                    return 1;
                } else {
                    return 2;
                }
            }
        },
        methods: {
            fetchData() {
                let _self = this;
                this.axios.get(this.url + "course/getCourse", {params: {courseId: this.$route.params.courseId}}).then(response => {
                    _self.course = response.data.course;
                }).catch(error => {
                    console.log(error);
                });
                this.axios.get(this.url + "course/getAllCourseFile", {params: {courseId: this.$route.params.courseId}}).then(response => {
                    _self.courseFileList = response.data.courseFileList;
                    _self.loading = false;
                }).catch(error => {
                    console.log(error);
                    _self.loading = false;
                });
            },
            Delete(val) {
                this.deleteId = val;
            },
            deleteTable() {
                let _self = this;
                this.axios.get(this.url + "course/deleteCourseFile", {params: {cfileId: this.deleteId}}).then(response => {
                    if (response.data.msg == "success") {
                        _self.loading = true;
                        _self.fetchData();
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            batchDelete() {
                var formdata = new FormData(document.getElementById("form3"));
                let _self = this;
                this.axios.post(this.url + "course/deleteCourseFile", formdata).then(response => {
                    if (response.data.msg == "success") {
                        _self.loading = true;
                        _self.fetchData();
                    }
                }).catch(error => {
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

    button:hover {
        color: #d90a81
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .loading_position {
        position: relative;
        margin: auto auto;
    }
</style>