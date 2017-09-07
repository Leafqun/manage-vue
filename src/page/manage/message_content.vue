<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right;">
                        <router-link to="/manage/message"><i class="iconfont icon-back" aria-hidden="true"></i></router-link>
                    </div>
                    <h3 class="panel-title">留言</h3>
                    <div class="panel-subtitle" style="float: right;">{{message.mTime|time}}</div>
                    <div class="panel-subtitle" style="float: right;margin-right:20px;">{{message.email}}</div>
                    <div class="panel-subtitle" style="float: right;margin-right:20px;">{{message.stuName}}</div>
                </div>
                <div class="panel-body">
                    <div v-html="message.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ""
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData',
        },
        methods: {
            fetchData() {
                let _self = this;
                this.axios.get(this.url + "message/getMessage", {params:{messageId: this.$route.params.messageId}}).then(function (response) {
                    _self.message = response.data.message;
                }).catch(function (error) {
                    console.log(error);
                });
               /*this.$http.post(url + "message/getMessage.do", {messageId: this.$route.params.messageId},{emulateJSON:true}).then(function (response) {
                    var data = response.body;
                    this.message = data.message;
                }).catch(function (error) {
                    console.log(error);
                });*/
            },
        },
        filters: {
            time: function (value) {
                var date = new Date(value);
                var Y = date.getFullYear(),
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
                var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
                return t;
            }
        }
    }
</script>

<style scoped>
    a:hover {
        color: #d90a81
    }
</style>