export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '主页', icon: 'smile', component: './Welcome' },
  { path: '/picture/:id', name: '图片详细', component: './Picture', hideInMenu: true },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { name: '用户管理', path: '/admin/user', component: './Admin/UserList' },
      { name: '标签管理', path: '/admin/tag', component: './Admin/TagList' },
      { name: '图片管理', path: '/admin/picture', component: './Admin/PictureList' },
      { name: '空间管理', path: '/admin/space', component: './Admin/SpaceList' },
    ],
  },
  {
    path: '/review',
    name: '审核页',
    icon: 'MenuUnfoldOutlined',
    access: 'canAdmin',
    routes: [
      { path: '/review', redirect: '/review/picture' },
      { name: '图片审核', path: '/review/picture', component: './Review/Picture' },
    ],
  },
  {
    path: '/account',
    name: '个人中心',
    icon: 'user',
    routes: [
      { name: '个人中心', path: '/account/center', component: './Account/Center' },
      { name: '个人设置', path: '/account/settings', component: './Account/Settings' },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '用户登录', path: '/user/login', component: './User/Login' },
      { name: '用户注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    layout: false,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
