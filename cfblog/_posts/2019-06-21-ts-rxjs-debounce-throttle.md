---
layout: post
title:  TS vs RXJS 中的防抖和节流
categories: [cfblog]
tags: [js,rxjs]
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/english-grammer/english-grammer-cover5.png
description: >
   TS vs RXJS 中的防抖和节流
---

## TS vs RXJS 中的防抖和节流

## What  
什么是防抖，防抖就是当一个事件持续触发时，指定间隔时间内没有再触发该事件，事件处理函数才会执行。如果在间隔时间之内重新触发了该事件，则重新开始计时。
## Why
为什么需要防抖，当用户在自动完成输入框，每次会有自动建议，根据用户输入的搜索内容搜索网上建议词，如果都去发ajax请求，这样对性能是一个严重制约，而且用户可能还会输错。所以这种情况下，我们就用到了debounce，这样对于小于间隔时间内的请求，我们可以做到完全不理会。

## How

 * TS 实现  

```swift
    <input id="search" placeholder="请输入搜索关键词"> 
{
    const debounce = (fn:Function, debTime:number):Fun => {
        let timer:any = null;
        return (debTime,...args:any[]) => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,args);
            timer = null;
          },debTime)
        }
    }
    const fn =()=>{
      console.log('我触发后每间隔一秒时间才会执行哦')
    }
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('keyup',debounce(fn,1000));
}
```  
 *  RXJS 实现(debounceTime)  

```swift
    <input id="search" placeholder="请输入搜索关键词"> 

    import {fromEvent} from 'rxjs';
    import {pluck, debounceTime} from 'rxjs/operators';
{

   
    const searchInput = document.getElementById('search');
    const searchInput$ = fromEvent(searchInput,'keyup').pipe(
        pluck('target','value'),
        debounceTime(1000)
    )
    searchInput$.subscribe(
        value => console.log(`我触发后每间隔一秒时间才会执行哦,当前输入的值为${value}`)
    )
}
    是不是感受到RXJS的强大之处，纯函数，无副作用哦。
```
## What 

什么是节流，节流就是当一个事件持续触发时，保证一定时间内只执行一次。
## Why

为什么需要节流，当用户在进行窗口滚动或reszie页面时，处理函数会无限触发，会加剧浏览器性能消耗，导致用户体验性差。所以这种情况下，我们需要限制函数的执行次数，控制一定时间内只执行一次。

## How

 * TS 实现(时间戳版)  

```swift
{
    const throttle = (fn:Function, rateTime:number) => {
        let prev = Date.now() - rateTime;
        return (...args:any[])=>{
            if(Date.now() - prev >= rateTime){
                fn.apply(this,args);
                prev = Date.now();
            }
        }
    }
    const fn =()=>{
      console.log('我一开始就触发，持续触发时一秒内只执行一次')
    }
    window.addEventListener('scroll',throttle(fn,1000));
}
```

* TS 实现(定时器版)

```swift
{
    const throttle = (fn:Function, rateTime:number) => {
        let timer:any = null
        return (...args:any[]) => {
            if(!timer){
                timer = setTimeout(()=>{
                   fn.apply(this,args)
                   timer = null;
                },rateTime)
            }
        }
    }
    const fn =()=>{
      console.log('我一秒中后触发，持续触发时一秒内只执行一次')
    }
    window.addEventListener('scroll',throttle(fn,1000));

}
```

* TS 实现(时间戳+定时器版)

```swift
{
    const throttle = (fn:Function, rateTime:number) => {
        let timer:any = null;
        let prev = Date.now() - rateTime;
        return (...args:any[]) => {
           let remaining = rateTime - (Date.now() - prev);
           clearTimeout(timer);
           if(remaining <= 0){
               fn.apply(this,args);
               prev = Date.now();
           }else{
               timer = setTimeout(()=>{
                   fn.apply(this,args)
               },remaining)
           }
        }
    }
    const fn = () => {
      console.log('我开始的时候执行一次，最后一次触发事件后也会执行一次')
    }
    window.addEventListener('scroll',throttle(fn,1000));
}
```  

* RXJS 实现(throllteTime)

```swift
{
    const scroll$ = fromEvent(window,'scroll').pipe(
        throttleTime(1000)
    )
    scroll$.subscribe(
        _ => console.log('我一开始就触发，持续触发时一秒内只执行一次')
    )
}
  使得 RxJS 强大的正是它使用纯函数来产生值的能力。这意味着你的代码更不容易出错。
  RXJS 你值得拥有
```
如果你想了解更多rxjs的内容，我有一个比较完整的学习rxjs的项目，请访问：
[learning-rxjs](https://gitee.com/yanyunchangfeng/learning-rxjs)

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