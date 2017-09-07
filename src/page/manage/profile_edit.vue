<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <h3 class="panel-title">专业简介</h3>
                </div>
                <div class="panel-body" style="overflow: hidden;">
                    <form role="form" id="form" method="post" action="javascript:void(0)">
                        <input v-model="profile.profileId" name="profileId" type="hidden">
                        <div class="form-group">
                            <label for="goals">专业建设目标：</label>
                            <vue-html5-editor :content="profile.goals" :height="300" @change="updateData" :auto-height="false"></vue-html5-editor>
                            <input v-model="profile.goals" type="hidden" name="goals" id="goals"></input>
                        </div>
                        <div class="form-group">
                            <label for="program">专业训练项目：</label>
                            <vue-html5-editor :content="profile.program" :height="300" @change="updateData2" :auto-height="false"></vue-html5-editor>
                            <input v-model="profile.program" type="hidden" name="program" id="program"></input>
                        </div>
                        <div class="form-group">
                            <label for="courses">专业主干课程：</label>
                            <vue-html5-editor :content="profile.courses" :height="300" @change="updateData3" :auto-height="false"></vue-html5-editor>
                            <input v-model="profile.courses" type="hidden" name="courses" id="courses"></input>
                        </div>
                        <div class="form-group">
                            <label for="principle">专业负责人：</label>
                            <vue-html5-editor :content="profile.principle" :height="300" @change="updateData4" :auto-height="false"></vue-html5-editor>
                            <input v-model="profile.principle" type="hidden" name="principle" id="principle"></input>
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
                profile:{
                    profileId:null,
                    goals:'',
                    program:'',
                    courses:'',
                    principle:''
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
                this.axios.get(this.url + "profile/getProfile", {params: {profileId: 1}}).then(response => {
                    _self.profile = response.data.profile;
                }).catch(error => {
                    console.log(error);
                });

            },
            updateData(val){
                this.profile.goals = val;
            },
            updateData2(val){
                this.profile.program = val;
            },
            updateData3(val){
                this.profile.courses = val;
            },
            updateData4(val){
                this.profile.principle = val;
            },
            submit(){
                this.$Message.config({
                    top: 100
                });
                let _self = this;
                let formdata = new FormData(document.getElementById("form"));
                if(this.profile.profileId == null){
                    this.$Message.error("error");
                    return false;
                }
                this.axios.post(this.url + "profile/updateProfile",formdata).then(response => {
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