<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <h3 class="panel-title">管理制度</h3>
                </div>
                <div class="panel-body" style="overflow: hidden;">
                    <form role="form" id="form" method="post" action="javascript:void(0)">
                        <input v-model="management.mId" name="mId" type="hidden">
                        <div class="form-group">
                            <label for="handbooks">学生手册：</label>
                            <vue-html5-editor :content="management.handbooks?management.handbooks:''" :height="300" @change="updateData" :auto-height="false"></vue-html5-editor>
                            <input v-model="management.handbooks" type="hidden" name="handbooks" id="handbooks"></input>
                        </div>
                        <div class="form-group">
                            <label for="processes">办事流程：</label>
                            <vue-html5-editor :content="management.processes?management.processes:''" :height="300" @change="updateData2" :auto-height="false"></vue-html5-editor>
                            <input v-model="management.processes" type="hidden" name="processes" id="processes"></input>
                        </div>
                        <div class="form-group">
                            <label for="requirements">毕业要求：</label>
                            <vue-html5-editor :content="management.requirements?management.requirements:''" :height="300" @change="updateData3" :auto-height="false"></vue-html5-editor>
                            <input v-model="management.requirements" type="hidden" name="requirements" id="requirements"></input>
                        </div>
                        <div class="form-group">
                            <label for="gpc">绩点计算：</label>
                            <vue-html5-editor :content="management.gpc?management.gpc:''" :height="300" @change="updateData4" :auto-height="false"></vue-html5-editor>
                            <input v-model="management.gpc" type="hidden" name="gpc" id="gpc"></input>
                        </div>
                        <div class="form-group">
                            <label for="tips">学籍类申请温馨提醒：</label>
                            <vue-html5-editor :content="management.tips?management.tips:''" :height="300" @change="updateData5" :auto-height="false"></vue-html5-editor>
                            <input v-model="management.tips" type="hidden" name="tips" id="tips"></input>
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
                management:{
                    mId:null,
                    handbooks:'',
                    processes:'',
                    requirements:'',
                    gpc:'',
                    tips:''
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
                this.axios.get(this.url + "management/getManagement", {params: {mId: 1}}).then(response => {
                    _self.management = response.data.management;
                }).catch(error => {
                    console.log(error);
                });

            },
            updateData(val){
                this.management.handbooks = val;
            },
            updateData2(val){
                this.management.processes = val;
            },
            updateData3(val){
                this.management.requirements = val;
            },
            updateData4(val){
                this.management.gpc = val;
            },
            updateData5(val){
                this.management.tips = val;
            },
            submit(){
                this.$Message.config({
                    top: 100
                });
                let _self = this;
                let formdata = new FormData(document.getElementById("form"));
                if(this.management.mId == null){
                    this.$Message.error("error");
                    return false;
                }
                this.axios.post(this.url + "management/updateManagement",formdata).then(response => {
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