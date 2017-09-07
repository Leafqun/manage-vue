<template>
    <div id="sidebar-nav" class="sidebar" style="margin-top:10px;">
        <div class="sidebar-wrapper">
            <nav>
                <ul class="nav">
                    <li><router-link to="/manage/notice"><i class="lnr lnr-home"></i> <span>通知管理</span></router-link></li>
                    <li><router-link to="/manage/notice/add" class=""><i class="lnr lnr-code"></i> <span>通知添加</span></router-link></li>
                    <li><router-link to="/manage/message" class=""><i class="lnr lnr-chart-bars"></i> <span>留言管理</span></router-link></li>
                    <li><router-link to="/manage/download" class=""><i class="lnr lnr-cog"></i> <span>下载资料管理</span></router-link></li>
                    <li><router-link to="/manage/course" class=""><i class="lnr lnr-file-empty"></i> <span>课程管理</span></router-link></li>
                    <li><router-link to="/manage/profile" class=""><i class="lnr lnr-dice"></i> <span>专业简介</span></router-link></li>
                    <li><router-link to="/manage/faculty" class=""><i class="lnr lnr-text-format"></i> <span>师资队伍</span></router-link></li>
                    <li><router-link to="/manage/management" class=""><i class="lnr lnr-linearicons"></i> <span>管理制度</span></router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                a: 'a'
            }
        }
    }
</script>

<style scoped>

</style>