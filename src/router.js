import Vue from 'vue'
import VueRouter from "vue-router";
import Router from 'vue-router'
Vue.use(Router)
// 引入组件
import Home from './views/Home.vue'

Vue.use(VueRouter);
const router=new Router({
	routes:[
		// 默认首页显示
		{
		path: '/',
		redirect:'/index'
		},
		{
			path:'/',
			name:'home',
			component:Home,
			children:[
				{
					path:'/index',
					name:'index',
					component:()=>import('./views/index/Index.vue'),
					children:[
						{
							path:'/guanzhu',
							name:'guanzhu',
							component:()=>import('./components/index/VideoList.vue'),
						},
						{
							path:'/tuijian',
							name:'tuijian',
							component:()=>import('./components/index/VideoList.vue'),
						}
					]
				},
				{
					path:'/Upload',
					name:'Upload',
					component:()=>import('./views/publist/Upload.vue')
				},
				{
					path:'/follow',
					name:'follow',
					component:()=>import('./views/follow/Follow.vue')
				},
				{
					path:'/me',
					name:'me',
					component:()=>import('./views/me/Me.vue'),
				},
				{
					path:'/msg',
					name:'/msg',
					component:()=> import('./views/msg/Msg.vue')
				},
				// 用户粉丝列表
				{
					path:'/HomePage',
					name:'/HomePage',
					component:()=> import('./views/me/HomePage.vue')
				},
			]
		},
		// 验证码登录组件
		{
			path:'/sign',
			name:'/sign',
			component:()=> import('./views/Sign.vue')
		},
		// 密码登录组件
		{
			path:'/tbsign',
			name:'/tbsign',
			component:()=> import('./views/Tbsign.vue')
		},
		// 验证码验证组件
		{
			path:'/code',
			name:'/code',
			component:()=> import('./views/Code.vue')
		},
		//编辑个人资料组件
		{
			path:'/edit',
			name:'/edit',
			component:()=> import('./views/me/Edit.vue')
		},
		//编辑作品描述
		{
			path:'/Publist',
			name:'/Publist',
			component:()=> import('./views/publist/Publist.vue')
		},
		// 用户作品列表
		{
			path:'/UserPublist',
			name:'/UserPublist',
			component:()=> import('./views/me/VideoList.vue')
		},
		// 用户点赞列表
		{
			path:'/UserLikeList',
			name:'/UserLikeList',
			component:()=> import('./views/me/VideoLikeList.vue')
		},
		// 用户关注列表
		{
			path:'/UserFollowList',
			name:'/UserFollowList',
			component:()=> import('./views/me/UserFollowList.vue')
		},
		// 用户粉丝列表
		{
			path:'/UserFansList',
			name:'/UserFansList',
			component:()=> import('./views/me/UserFansList.vue')
		},
	]
});

router.beforeEach((to, from, next) => {
	if (to.path === '/sign' ||to.path === '/index' || to.path==='/tbsign') 
		return next();
	if (to.path === '/code' && from.path == '/sign'){
		return next();
	}
	if(to.path === '/Publist' && from.path == '/Upload'){
		return next();
	}
	//获取token
	const tokenStr = localStorage.getItem('authorization')
	if (!tokenStr) return next('/sign')
	next()
  })



export default router