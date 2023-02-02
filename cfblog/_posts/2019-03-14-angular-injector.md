---
layout: post
title: Angular 依赖注入
categories: [cfblog]
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/angular-injector/angular-injector-cover.png
description: >
  从依赖注入的概念、依赖注入性框架和依赖性注入进阶三个方面讲解说明
---

## 依赖注入
什么是依赖性注入？依赖性注入其实是一种设计模式。

 ## 依赖性注入框架
Angular中提供了非常完整的DI框架，有三个主要角色：
```
Injector         Provider           Object  

    |                |                |

令牌 (注入者)         构建             依赖
```
Injector就是注入者，用它的API去创建你依赖的实例，但是怎么样创建呢？是通过构造函数创建，还是工厂函数创建或者其它方式。那就是Provider，它来告诉Injector如何去创建，那最后创建好的对象，其实就是你现在所处位置，比如组件、模块，它所需要的这种依赖，那么这个依赖其实就是你在程序中需要的某种类型的对象，依赖本身就是一种类型，你需要的是这种类型的对象。

## 依赖性注入进阶
Angular提供了层次结构型的依赖，父子结构型的。

父子关系有一种特点，当它在子池子找不到它的依赖性，它会去父池子里面找，这也解释了为什么在Module中Provider的东西，你在Module当中的Component也能用，而且在父组件中Provider的东西，子组件也能用。

依赖性注入的基础概念，就是如何不去关心我依赖对象的构建细节，把责任往上推，推到上级，直到入口函数，这样管理起来就非常麻烦，所以导致了依赖性注入框架的产生。

在Angular中依赖性注入框架，是这样的一个构架，它有注入者，注入者去构建这样一个池子，那么池子里面是通过Provider数组去了解这些具体实例应该怎么去构建，它了解细节，它知道使用工厂方法还是构造函数或者其他方式提供。提供好了以后，通过Injector去get你的类型，类型就是provide的东西，可以是任意类型，Provider有useValue,useFactory,useClass,UseExisting等。

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