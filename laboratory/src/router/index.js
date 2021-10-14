import VueRouter from "vue-router";

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('../views'),
			redirect: {
					path: '/home'
			},
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('../views/Home/index.vue'),
					redirect: {
						path: '/home/dvFlylines'
					},
					children: [
						// 飞线图
						{
							path: 'dvFlylines',
							name: 'dvFlylines',
							component: () => import('../views/FlyLines/dvFlylines.vue')
						},
						{
							path: 'etFlyLines',
							name: 'etFlyLines',
							component: () => import('../views/FlyLines/etFlyLines.vue')
						},
						// 自定义表单
						{
							path: 'customForm',
							name: 'customForm',
							component: () => import('../views/CustomForm')
						},
						// 自定义表格
						{
							path: 'customTable',
							name: 'customTable',
							component: () => import('../views/CustomTable')
						},
						// 组织架构
						{
							path: 'orgStructure',
							name: 'orgStructure',
							component: () => import('../views/OrgStructure')
						},
						// 流程图
						{
							path: 'flowChart',
							name: 'flowChart',
							component: () => import('../views/FlowChart')
						},
					]
				}
			]
		}
	]
})

// 防止重复点击错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router