---
layout: post
title: NiceFish-React
description: >
  NiceFish-React 是React版本的实现
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react-cover.png
noindex: true
---


NiceFish-React 是React版本的实现，和[NiceFish](https://gitee.com/mumu-osc/NiceFish) Angular版本保持风格一致。前端技术栈：React Hooks v16.8.3 ，React-Router v5，Bootstrap v4.7 SCSS源码定制, Echarts v4.2.1, Ant-Design v.3.15.2 组件库以及TypeScript进行开发，没有使用任何的前端脚手架，自己从零开始搭建整个博客系统，最大程度上保证了可扩展和维护性。为了减轻代码体积和提升性能，后续利用了Suspens 和 lazy 实现了Code Splitting，优化后首屏加载只需663ms。

为了大家更加直观认识，我截了一组运行效果图：

![首屏加载页面](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react1.png)  
<p align="center" style="background-color:gray;color:#fff">首屏加载仅需663ms</p>

![这是阅读页面,不需要登录访问权限](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react2.png) 
<p align="center" style="background-color:gray;color:#fff">这是阅读页面,不需要登录访问权限</p>

![这是统计图表页面,采用UI指定颜色值使用轮询算法实现(需要登录访问权限)](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react3.png) 

<p align="center" style="background-color:gray;color:#fff">这是统计图表页面,采用UI指定颜色值使用轮询算法实现(需要登录访问权限)</p>

![这是文章评论页面,有过滤和排序功能](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react4.png) 
<p align="center" style="background-color:gray;color:#fff">这是文章评论页面,有过滤和排序功能</p>

![这是我为NIceFish系列设计的登录效果图](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react5.png) 
<p align="center" style="background-color:gray;color:#fff">这是我为NIceFish系列设计的登录效果图</p>

![这是阅读页面的详情面 ](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react6.png) 
<p align="center" style="background-color:gray;color:#fff">这是阅读页面的详情面(不需要登录访问权限)</p>

好了,这是以上的效果展示图,通过此博客系统:

我的收获如下:

1.对新版本的ReactHooks有了一定的理解和开发经验

2.熟悉了BootStrap SCSS 源码,定制了一套风格,学习了Twitter的优秀的scss源码(想学scss的同志,撸一遍BootstrapSCSS源码,你就能学的很全面)

3.使用全新的ReactRouter v5 ,学习了新路由"动态映射"的哲学思想

4.深入理解和使用Echarts绘图组件库

如果你需要更加全面的代码,请访问
[NiceFish-React](https://gitee.com/mumu-osc/NiceFish-React)

这是NiceFish-React 在gitee page 上的在线演示地址:[NiceFish-React](https://mumu-osc.gitee.io/nicefish-react)

## 我参与的系列项目

1. [NiceFish]( https://gitee.com/mumu-osc/NiceFish)：美人鱼，这是一个微型Blog系统，前端基于Angular7.0 + PrimeNG7.1.0。（GVIP 码云最有价值的开源项目 3190 ☆)
2. [NiceFish-React]( https://gitee.com/mumu-osc/NiceFish-React)：这是React版的实现，和 NiceFish Angular 版本保持风格一致。采用React Hooks 16.8.3 版本，使用TypeScript、Ant Design组件库以及Bootstrap v4.2.1 开发。  (7 ☆)
3. [OpenWMS-Frontend](https://gitee.com/mumu-osc/OpenWMS-Frontend)：OpenWMS项目前端基于 Angular 7.0 + PrimeNG 7.1.0。  (已推荐 200 ☆)
4. [nicefish-spring-cloud](https://gitee.com/mumu-osc/nicefish-spring-cloud)：这是NiceFish的服务端代码，基于SpringCloud。已经完成了一些基本的功能，如 SpringSecurity+OAuth2+JWT 实现SSO，文章、用户、评论等的分页查询等。如果你需要与这个后端代码进行对接，请检出本项目的 for-spring-cloud 分支。 (已推荐 115 ☆)

## 我的社交主页  

1. [燕云长风知乎](https://zhihu.com/people/hbxyxuxiaodong)  
2. [燕云长风知乎专栏](https://zhuanlan.zhihu.com/yanyunchangfeng)  
3. [燕云长风github](https://github.com/yanyunchangfeng)  
4. [燕云长风gitee](https://gitee.com/yanyunchangfeng)  
5. [燕云长风twitter](https://twitter.com/yanyunchangfeng)  
6. [燕云长风medium](https://medium.com/@yanyunchangfeng) 

今天的分享就到这里，祝大家顺利，工作愉快，天天开心。

长风几万里，吹度玉门关。