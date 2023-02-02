---
layout: post
title: NiceFish-React
categories: [cfblog]
description: >
  NiceFish-React 是React版本的实现
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/nicefish-react/nicefish-react-cover.png
noindex: true
---


NiceFish（美人鱼） 是一个系列项目，目标是示范前后端分离的开发模式:前端浏览器、移动端、Electron 环境中的各种开发模式；后端有两个版本：SpringBoot 版本和 SpringCloud 版本。
NiceFish-React 是React版本的实现。前端技术栈：React  v18.0.0 ，React-Router v6，Bootstrap v4.7 SCSS源码定制,  Echarts v4.2.1, Ant-Design v4.19.5、Inversify依赖注入进行开发，没有使用任何的前端脚手架，从零开始搭建整个博客系统，最大程度上保证了可扩展和维护性。   
为了实现应用的极致性能优化，深度使用Webpack5进行细粒度优化，优化前后的性能分析报告如下
优化前性能分析报告：

![优化前加载页面](/assets/img/blog/nicefish-react/1.png)  
<p align="center" style="background-color:gray;color:#fff">首屏加载1.3s 性能分78</p>  

![优化后加载页面](/assets/img/blog/nicefish-react/2.png)  
<p align="center" style="background-color:gray;color:#fff">首屏加载0.6s 性能分99</p>

为了大家更加直观认识，我截了一组运行效果图：

![首屏加载页面](/assets/img/blog/nicefish-react/3.png)  
<p align="center" style="background-color:gray;color:#fff">首屏加载仅需504ms</p>

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

1.对新版本的React 、React-Router-Dom有了更加深刻的理解和实践经验
2.熟悉了BootStrap SCSS 源码,定制了一套风格,学习了Twitter的优秀的scss源码(想学scss的同志,撸一遍BootstrapSCSS源码,你就能学的很全面)
3.引入了依赖注入设计模式，加深了对IOC的理解应用。
4.深入理解和使用Echarts绘图组件库

如果你需要更加全面的代码,请访问
[NiceFish-React](https://github.com/damoqiongqiu/NiceFish-React)

这是NiceFish-React 在gitee page 上的在线演示地址:[NiceFish-React](https://yanyunchangfeng.gitee.io/nicefish-react)

## 系列项目

|  名称   | 描述  |
|  ----  | ----  |
| NiceFish（美人鱼）  | 这是一个系列项目，目标是示范前后端分离的开发模式:前端浏览器、移动端、Electron 环境中的各种开发模式。后端有两个版本：SpringBoot 版本和 SpringCloud 版本，http://git.oschina.net/mumu-osc/NiceFish/ |
| NiceFish-React  |  这是React 版本，基于React 18.0.0 ，使用 Antd、Inversify、 定制版 Bootstrap开发。  https://gitee.com/mumu-osc/NiceFish-React|
| nicefish-ionic  | 这是一个移动端的 demo，基于 ionic，此项目已支持 PWA。http://git.oschina.net/mumu-osc/nicefish-ionic |
| NiceBlogElectron  | 这是一个基于 Electron 的桌面端项目，把 NiceFish 用 Electron 打包成了一个桌面端运行的程序。这是由 ZTE 中兴通讯的前端道友提供的，我 fork 了一个，有几个 node 模块的版本号老要改，如果您正在研究如何利用 Electron 开发桌面端应用，请参考这个项目，https://github.com/damoqiongqiu/NiceBlogElectron|
| OpenWMS  | 用来示范管理后台型系统的最佳实践，https://gitee.com/mumu-osc/OpenWMS-Frontend|
| nicefish-springboot  | 用来示范前后端分离模式下，前端代码与后端服务的对接方式，已经完成了基线版本，并且在腾讯云上面做了实际的部署。代码仓库在这里： https://gitee.com/mumu-osc/nicefish-spring-boot ，腾讯云上的演示地址在这里： http://118.25.136.164 ，以此为基础，你可以继续开发出适合自己业务场景的代码。|
| nicefish-springcloud  | 用来示范前后端分离模式下，前端代码与分布式后端服务的对接方式，即将完成，代码最近放出。|       

## 社交主页  

* [燕云长风知乎](https://zhihu.com/people/hbxyxuxiaodong)    
* [燕云长风github](https://github.com/yanyunchangfeng)  
* [燕云长风gitee](https://gitee.com/yanyunchangfeng) 

今天的分享就到这里，祝大家顺利，生活愉快，天天开心。

长风几万里，吹度玉门关。