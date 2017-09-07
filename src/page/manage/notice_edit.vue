<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right;">
                        <router-link to="/manage/notice"><i class="iconfont icon-back" aria-hidden="true"></i></router-link>
                    </div>
                    <h3 class="panel-title" v-if="biaoti">通知编辑</h3>
                    <h3 class="panel-title" v-else>通知添加</h3>
                </div>
                <div class="panel-body">
                    <form role="form" id="form1" method="post" enctype="multipart/form-data" action="javascript:void(0)">
                        <input type="hidden" name="noticeId" v-model="notice.noticeId">
                        <input type="hidden" name="file" v-model="notice.file">
                        <div class="form-group">
                            <label for="noticeName">通知名称:</label>
                            <input type="text" class="form-control" id="noticeName" name="noticeName"
                                   v-model="notice.noticeName">
                        </div>
                        <div class="form-group">
                            <label>通知内容:</label>
                            <vue-html5-editor :content="notice.content" :height="500" @change="updateData"></vue-html5-editor>
                            <input type="hidden" name="content" v-model="notice.content">
                        </div>
                        <div class="form-group">
                            <label>
                                通知文件:
                                <span v-if="notice.file">{{notice.file}}</span>
                                <span v-else> 无</span>
                            </label>
                        </div>
                        <div>
                            <input type="button" value="上传文件" onclick="javascript:$('#hiddenFile').click()" class="btn btn-primary"/>
                            <span id="upfile"></span>
                            <input id="hiddenFile" type="file" name="cfile" onchange="javascript:$('#upfile').html(this.value) ;" style="display: none"/>
                        </div>
                        <button class="btn btn-default" style="margin-left:45%" @click="bt_submit">提交</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                notice: {
                    noticeId: null,
                    noticeName: "",
                    content: "",
                    file: null,
                    noticeTime: null
                }
            }
        },
        created() {
            this.fetchData();
        },
        watch:{
            '$route': 'fetchData',
            biaoti:function(val){
                if(val==false){
                    this.notice="";
                }
            }
        },
        computed:{
            biaoti: function () {
                if(this.$route.params.noticeId != "add"){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods: {
            fetchData() {
                if(this.biaoti) {
                    let _self = this;
                    this.axios.get(this.url + "notice/getNoticeContent", {params: {noticeId: this.$route.params.noticeId}}).then(response => {
                        _self.notice = response.data.notice;
                        //console.log(response.data[0].notice);
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            bt_submit(){
                let _self = this;
                let formdata1 = new FormData(document.getElementById("form1"));
                this.axios.post(this.url + "notice/submitNotice", formdata1).then(response => {
                    var data = response.data;
                    console.log(data)
                    if(data.msg == "更改成功"){
                        _self.$router.push({ name: "notice"});
                    }
                    if(data.msg == "添加成功"){
                        _self.$router.push({ name: "notice"});
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            updateData(val){
                this.notice.content = val;
            }
        }
    }
</script>

<style scoped>
    a:hover {
        color: #d90a81
    }
</style>