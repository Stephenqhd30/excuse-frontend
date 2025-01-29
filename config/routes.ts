export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '主页', icon: 'smile', component: './Welcome' },
  { path: '/picture/:id', name: '图片详细', component: './Picture', hideInMenu: true },
  {
    path: '/search',
    name: '搜索页',
    icon: 'search',
    component: './Search',
    hideInMenu: true,
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { name: '用户管理', icon: 'user', path: '/admin/user', component: './Admin/UserList' },
      { name: '标签管理', icon: 'tag', path: '/admin/tag', component: './Admin/TagList' },
      {
        name: '图片管理',
        icon: 'picture',
        path: '/admin/picture',
        component: './Admin/PictureList',
      },
      {
        name: '空间管理',
        icon: 'PicCenterOutlined',
        path: '/admin/space',
        component: './Admin/SpaceList',
      },
    ],
  },
  {
    path: '/review',
    name: '审核页',
    icon: 'MenuUnfoldOutlined',
    access: 'canAdmin',
    routes: [
      { path: '/review', redirect: '/review/picture' },
      { name: '图片审核', icon: 'picture', path: '/review/picture', component: './Review/Picture' },
    ],
  },
  {
    path: '/account',
    name: '个人中心',
    icon: 'user',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { name: '个人中心', icon: 'user', path: '/account/center', component: './Account/Center' },
      {
        name: '个人设置',
        icon: 'setting',
        path: '/account/settings',
        component: './Account/Settings',
      },
      {
        name: '个人空间',
        icon: 'PicCenterOutlined',
        path: '/account/space',
        component: './Account/Space',
      },
      { name: '团队空间', icon: 'team', path: '/account/team', component: './Account/TeamSpace' },
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
