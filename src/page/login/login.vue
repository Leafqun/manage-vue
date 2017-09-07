<template>
    <div class="login">
        <!-- MAIN CONTENT -->
        <div class="login_menu">
            <div class="container-fluid">
                <!-- PANEL HEADLINE -->
                <div class="panel panel-headline">
                    <div class="panel-heading">
                        <div class="logo text-center" style="margin-top:50px;"><img src="../../assets/img/logo_5.png" alt="Klorofil Logo"></div>
                        <p class="lead" style="text-align: center;font-size: 16px;">留学生网站后台管理登录</p>
                    </div>
                    <div class="panel-body">
                        <form class="form-auth-small" action="javascript:void(0)">
                            <div class="form-group">
                                <label for="signin-email" class="control-label sr-only">Email</label>
                                <input type="text" class="form-control" id="signin-email" name="userName"
                                        placeholder="账号" v-model="userName">
                            </div>
                            <div class="form-group">
                                <label for="signin-password" class="control-label sr-only">Password</label>
                                <input type="password" class="form-control" id="signin-password" name="userPwd"
                                        placeholder="密码" v-model="userPwd">
                            </div>
                            <div class="form-group clearfix">
                                <label class="fancy-checkbox element-left">
                                    <input type="checkbox">
                                    <span>Remember me</span>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block" @click="submit">登录</button>
                            <div class="bottom" style="text-align: center;margin-top:20px;margin-bottom:50px;">
                                <p style="text-align: center; margin-bottom: 10px;">{{msg}}</p>
                            </div>
                        </form>
                        <!-- END PANEL HEADLINE -->
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
                userName:null,
                userPwd:null,
                msg:null
            }
        },
        methods:{
            submit(){
                let _self = this;
                console.log(_self.$store.state.isLogin)
                if(_self.userName == null|| _self.userName =="") {
                    _self.msg = "用户名不能为空";
                    return false;
                }
                this.axios.get("http://119.23.22.99:8080/Student_Website/loginCheck.do", {params: {userName: this.userName,userPwd:this.userPwd}}).then(response => {
                    if (response.data.msg == "success") {

                        _self.$store.dispatch('login');
                        window.sessionStorage.setItem('isLogin',1);
                        console.log(_self.$store.state.isLogin)


                        let url = _self.$route.query.redirect;
                        if(url) _self.$router.push({path:url});
                        else _self.$router.push({path:"/manage/notice"});


                    }else{
                        _self.msg = response.data.msg;
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .login{
        padding-top:100px;
        padding-left: 200px;
        position: relative;
    }
.login_menu{
    width:500px;
    padding-bottom: 177px;
}
</style>