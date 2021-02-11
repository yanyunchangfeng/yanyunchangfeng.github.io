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

## 我参与的系列项目

1. [NiceFish]( https://gitee.com/mumu-osc/NiceFish)：美人鱼，这是一个微型Blog系统，前端基于Angular7.0 + PrimeNG7.1.0。（GVIP 码云最有价值的开源项目 5000 ☆)
2. [NiceFish-React]( https://github.com/damoqiongqiu/NiceFish-React)：这是React版的实现，和 NiceFish Angular 版本保持风格一致。采用React Hooks 16.8.3 版本，使用TypeScript、Ant Design组件库以及Bootstrap v4.2.1 开发。  (7 ☆)
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