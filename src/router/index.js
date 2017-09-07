import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import manage from '@/components/manage'
import notice_manage from '@/components/notice_manage'
import notice_edit from '@/components/notice_edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/manage'
    },
    {
      path: '/manage',
      component: manage,
      redirect: {name: 'notice'},
      children: [
        {path: 'notice', name: 'notice', component: notice_manage, meta: {requireAuth: true}},
        {path: 'notice/:noticeId', name: 'edit', component: notice_edit, meta: {requireAuth: true}},
        {path: 'notice/add', name: 'add', component: notice_edit, meta: {requireAuth: true}}
      ]
    }
  ]
})
