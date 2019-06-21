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