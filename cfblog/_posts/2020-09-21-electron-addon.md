---
layout: post
title:  electron 编译原生addon 踩坑记
categories: [cfblog]
tags: [js,rxjs]
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/english-grammer/english-grammer-cover5.png
description: >
  electron 编译原生addon 踩坑记
---


## electron 编译原生addon 踩坑记

你好，我是燕云长风。 寓意：结合李白著名的边塞诗《关山月》取【燕云长风】—— 长风几万里，吹度玉门关。  
最近一段时间投入了医疗行业 ，开发了一个药店管理平台。 其中涉及到销售医保对接 ，前端使用electron打包应用。其中遇到了一些electron编译问题 ，想把出现的问题和解决方案分享一下。  医保对接涉及到读卡操作，其中需要c++ 文件支持。然而node 不支持c++ 文件 ，所以需要编译c++文件为.node文件以供node调用。然后通过electron 渲染进程和通信 ，以便于前端可以调用原生的nodeAPI。正当以为流程快要打通的时候，一个意外发生了：
Uncaught Error: The module 'medicare_hz.node' was compiled against a different Node.js version using NODE_MODULE_VERSION 69. This version of Node.js requires NODE_MODULE_VERSION 70. Please try re-compiling or re-installing the module (for instance, using `npm rebuild` or `npm install`). 

谷歌了一番，最后查明了原因 ，官网所述：Electron 支持原生的 Node 模块，但由于 Electron 非常有可能使用一个与您的系统上所安装的 Node 不同的 V8 引擎，您所使用的模块被重新编译。 说人话：(我理解的是nodejs NODE_MODULE_VERSION  和electron内置的nodejs的NODE_MODULE_VERSION  不一致，导致了原生模块无法使用 )。详细原因可以参大叔的博客 electron程序，如何理解NODE_MODULE_VERSION？   紧接着找到了electron的官网，按照官网的方法去尝试，用electron-rebuild包重建这些模块以适配 Electron而事情并没有那么一帆风顺 ，一遍又遍的尝试 ，一遍又遍的失败 。程序员的一生bug一生，debug一生。
后来我开始苦苦寻找别的解决方案 ，“有志者事竟成，破釜沉舟，百二秦关终属楚；苦心人天不负，卧薪尝胆，三千越甲可吞吴“。 经过了不断尝试，终于找到了解决方案。

## How

1. 首先用nodejs 编译出原生c++文件确保本地编译环境正常 
2. 使用electron环境编译c++原生模块。 

编译前置环境依赖 ：
npm install node-gyp -g
npm install windows-build-tools -g  
node为32位   
安装了以上环境后 开始执行编译

```swift
node-gyp rebuild --target=9.1.0 --dist-url=https://atom.io/download/electron

根目录下的 binding.gyp 配置文件信息
{
    "targets":[
        {
            "target_name":"medicare_hz",
            "sources":["medicare_hz.cpp"],
            'win_delay_load_hook': 'true'
        }
    ]
}
// 目标版本尽量保持在8以上 和本地electron依赖版本一致 低版本会导致各种编译失败问题

```  
## 思考 
这是我第一次接触编译方面的问题 ，nodejs 编译以及electron编译 ，虽然有一定的开发经验 ，所涉及到的知识还是超出了自己的知识范围之外 ，解决问题的思路就显得格外重要了。在此同大家共分享，共进步。


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