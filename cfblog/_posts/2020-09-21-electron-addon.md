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


## 系列项目

|  名称   | 描述  |
|  ----  | ----  |
| NiceFish（美人鱼）  | 这是一个系列项目，目标是示范前后端分离的开发模式:前端浏览器、移动端、Electron 环境中的各种开发模式。后端有两个版本：SpringBoot 版本和 SpringCloud 版本，http://git.oschina.net/mumu-osc/NiceFish |
| NiceFish-React  |  这是React 版本，基于React 18.0.0 ，使用 Antd、Inversify、 定制版 Bootstrap开发。  https://gitee.com/mumu-osc/NiceFish-React|
| nicefish-ionic  | 这是一个移动端的 demo，基于 ionic，此项目已支持 PWA。http://git.oschina.net/mumu-osc/nicefish-ionic |
| NiceBlogElectron  | 这是一个基于 Electron 的桌面端项目，把 NiceFish 用 Electron 打包成了一个桌面端运行的程序。这是由 ZTE 中兴通讯的前端道友提供的，我 fork 了一个，有几个 node 模块的版本号老要改，如果您正在研究如何利用 Electron 开发桌面端应用，请参考这个项目，https://github.com/damoqiongqiu/NiceBlogElectron|
| OpenWMS  | 用来示范管理后台型系统的最佳实践，https://gitee.com/mumu-osc/OpenWMS-Frontend|
| nicefish-springboot  | 用来示范前后端分离模式下，前端代码与后端服务的对接方式，已经完成了基线版本，并且在腾讯云上面做了实际的部署。代码仓库在这里： https://gitee.com/mumu-osc/nicefish-spring-boot ，腾讯云上的演示地址在这里： http://118.25.136.164 ，以此为基础，你可以继续开发出适合自己业务场景的代码。|
| nicefish-springcloud  | 用来示范前后端分离模式下，前端代码与分布式后端服务的对接方式，即将完成，代码最近放出。| 

 
## 社交主页  

1. [燕云长风知乎](https://zhihu.com/people/hbxyxuxiaodong)    
2. [燕云长风github](https://github.com/yanyunchangfeng)  
3. [燕云长风gitee](https://gitee.com/yanyunchangfeng)  
 

今天的分享就到这里，祝大家顺利，工作愉快，天天开心。

长风几万里，吹度玉门关。