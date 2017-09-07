import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import notice_manage from '../page/manage/notice_manage.vue'
import notice_edit from '../page/manage/notice_edit.vue'
import messsage_manage from '../page/manage/message_manage.vue'
import message_content from '../page/manage/message_content.vue'
import download from '../page/manage/download_manage.vue'
import upload from '../page/manage/download_upload.vue'
import course from '../page/manage/course.vue'
import course_file_manage from '../page/manage/course_file_manage.vue'
import course_file_upload from '../page/manage/course_file_upload.vue'
import manage from '../page/manage/manage.vue'
import login from '../page/login/login.vue'
import course_edit from '../page/manage/course_edit.vue'
import profile_edit from '../page/manage/profile_edit.vue'
import faculty_edit from '../page/manage/faculty_edit.vue'
import management_edit from '../page/manage/management_edit.vue'
import error from '../page/404.vue'

Vue.use(Router);

const router = new Router({
    routes:[
        { path: '', redirect: '/login'},
        { path: '/login', name: 'login', component: login},
        { path:'/manage', name:"manage", component: manage, redirect:{name:'notice'},
            children:[
                { path: 'notice', name: 'notice', component: notice_manage, meta: {requireAuth: true}},
                { path: 'notice/:noticeId', name: 'edit', component: notice_edit, meta: {requireAuth: true}},
                { path: 'notice/add', name: 'add', component: notice_edit, meta: {requireAuth: true}},
                { path: 'message', name: 'message', component: messsage_manage, meta: {requireAuth: true}},
                { path: 'message/:messageId', name: 'message_content', component: message_content, meta: {requireAuth: true}},
                { path: 'download', name: 'download', component: download, meta: {requireAuth: true}},
                { path: 'download/upload', name: 'upload', component: upload, meta: {requireAuth: true}},
                { path: 'course', name: 'course', component: course, meta: {requireAuth: true}},
                { path: 'course/:courseId', name: 'course_edit', component: course_edit },
                { path: 'course/add ', name: 'course_add', component: course_edit },
                { path: 'course/:courseId/file', name: 'course_file_manage', component: course_file_manage, meta: {requireAuth: true}},
                { path: 'course/:courseId/file/:ctype', name: 'course_file_upload', component: course_file_upload, meta: {requireAuth: true}},
                { path: 'profile', name: 'profile', component: profile_edit },
                { path: 'faculty', name: 'faculty', component: faculty_edit },
                { path: 'management', name: 'management', component: management_edit }
            ]
        },
        { path: '*', component: error }
    ]
});
router.beforeEach((to, from, next) => {
    if ( to.path.indexOf('/manage') >= 0 ) {  // 判断该路由是否需要登录权限
        if(store.state.isLogin == '1') {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({path: '/login',query: { redirect: to.fullPath }});
        }
    }
    else {
        next();
    }
});

export default router;