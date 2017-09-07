<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <h3 class="panel-title">师资队伍</h3>
                </div>
                <div class="panel-body" style="overflow: hidden;">
                    <form role="form" id="form" method="post" action="javascript:void(0)">
                        <input v-model="faculty.facultyId" name="facultyId" type="hidden">
                        <div class="form-group">
                            <label for="teachers">专业教师名单：</label>
                            <vue-html5-editor :content="faculty.teachers?faculty.teachers:''" :height="300" @change="updateData" :auto-height="false"></vue-html5-editor>
                            <input v-model="faculty.teachers" type="hidden" name="teachers" id="teachers"></input>
                        </div>
                        <div class="form-group">
                            <label for="projects">教师科研项目：</label>
                            <vue-html5-editor :content="faculty.projects?faculty.projects:''" :height="300" @change="updateData2" :auto-height="false"></vue-html5-editor>
                            <input v-model="faculty.projects" type="hidden" name="projects" id="projects"></input>
                        </div>
                        <div class="form-group">
                            <label for="papers">教师研究论文：</label>
                            <vue-html5-editor :content="faculty.papers?faculty.papers:''" :height="300" @change="updateData3" :auto-height="false"></vue-html5-editor>
                            <input v-model="faculty.papers" type="hidden" name="papers" id="papers"></input>
                        </div>
                        <button class="btn btn-primary" style="margin-left:500px;" @click="submit">提交</button>
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
                faculty:{
                    facultyId:1,
                    teachers:'',
                    projects:'',
                    papers:''
                }
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods:{
            fetchData() {
                let _self = this;
                this.axios.get(this.url + "faculty/getFaculty", {params: {facultyId: 1}}).then(response => {
                    _self.faculty = response.data.faculty;
                }).catch(error => {
                    console.log(error);
                });

            },
            updateData(val){
                this.faculty.teachers = val;
            },
            updateData2(val){
                this.faculty.projects = val;
            },
            updateData3(val){
                this.faculty.papers = val;
            },
            submit(){
                this.$Message.config({
                    top: 100
                });
                let _self = this;
                let formdata = new FormData(document.getElementById("form"));
                if(this.faculty.facultyId == null){
                    this.$Message.error("error");
                    return false;
                }
                this.axios.post(this.url + "faculty/updateFaculty",formdata).then(response => {
                    if(response.data.msg == 'success'){
                        _self.$Message.success("更改成功");
                    }

                }).catch(error => {
                    this.$Message.error("error");
                });
            }
        }
    }
</script>

<style scoped>

</style>