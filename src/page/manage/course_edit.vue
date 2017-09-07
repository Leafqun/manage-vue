<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right;">
                        <router-link to="/manage/course"><i class="iconfont icon-back" aria-hidden="true"></i></router-link>
                    </div>
                    <h3 class="panel-title" v-if="isEdit">课程编辑</h3>
                    <h3 class="panel-title" v-else>课程添加</h3>
                </div>
                <div class="panel-body" style="overflow: hidden;">
                    <form role="form" id="form" method="post" action="javascript:void(0)">
                        <input v-model="course.courseId" name="courseId" type="hidden">
                        <div class="form-group">
                            <label for="courseName">课程中文名称:</label>
                            <input type="text" class="form-control" id="courseName" name="courseName"
                                   v-model="course.courseName">
                        </div>
                        <div class="form-group">
                            <label for="enName">课程英文名称:</label>
                            <input type="text" class="form-control" id="enName" name="enName"
                                   v-model="course.enName">
                        </div>
                        <div class="form-group">
                            <label for="courseSchedule">课程大纲:</label>
                            <vue-html5-editor :content="course.courseSchedule" :height="500" @change="updateData" :auto-height="false"></vue-html5-editor>
                            <input v-model="course.courseSchedule" type="hidden" name="courseSchedule" id="courseSchedule"></input>
                        </div>
                        <div class="form-group">
                            <label for="courseArr">课程安排:</label>
                            <vue-html5-editor :content="course.courseArr" :height="500" @change="updateData2" :auto-height="false"></vue-html5-editor>
                            <input v-model="course.courseArr" type="hidden" name="courseArr" id="courseArr"></input>
                        </div>
                        <button class="btn btn-primary" style="margin-left:550px;" @click="submit">提交</button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                course:{
                    courseId:null,
                    courseName:'',
                    enName:'',
                    courseSchedule:'',
                    courseArr:''
                }
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData',
            isEdit(val){
                if(val == false){
                    this.course = '';
                }
            }
        },
        computed:{
            isEdit(){
                if(this.$route.params.courseId != 'add') return true;
                else return false;
            }
        },
        methods:{
            fetchData() {
                if (this.isEdit) {
                    let _self = this;
                    this.axios.get(this.url + "course/getCourse", {params: {courseId: this.$route.params.courseId}}).then(response => {
                        _self.course = response.data.course;
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            updateData(val){
                this.course.courseSchedule = val;
            },
            updateData2(val){
                this.course.courseArr = val;
            },
            submit(){
                let _self = this;
                let formdata = new FormData(document.getElementById("form"));
                if(this.course.courseName == ''){
                    this.$Message.error("课程名不能为空");
                    return false;
                }
                this.axios.post(this.url + "course/submitCourse",formdata).then(response => {
                    _self.$router.push({name:'course'});
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>