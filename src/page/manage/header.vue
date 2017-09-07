<template>
    <div>
        <!-- NAVBAR -->
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="navbar-brand" style="margin-top:15px;">
                <strong style="font-size: 20px;">留学生网站后台管理</strong>
            </div>
            <div class="container-fluid">
                <div class="navbar-btn">
                    <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
                </div>
                <div class="navbar-btn navbar-btn-right">
                    <a class="btn btn-success update-pro"
                       data-toggle="modal"
                       data-target="#myModal2" title="注销" target="_blank"><i class="fa fa-rocket" ></i> <span>注销</span></a>
                </div>
            </div>
        </nav>
        <!-- Modal -->
        <div id="myModal2" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">登录</h4>
                    </div>
                    <div class="modal-body">
                        <p>确定要注销吗？</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="logout">是
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
                a: 'a'
            }
        },
        methods:{
            logout(){
                this.$store.dispatch('logout');
                window.sessionStorage.isLogin = 0;
                this.$router.push({name:'login'});
            }
        }
    }
</script>

<style scoped>

</style>