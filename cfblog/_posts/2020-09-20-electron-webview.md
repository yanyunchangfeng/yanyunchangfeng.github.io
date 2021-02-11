---
layout: post
title:  electron webview
categories: [cfblog]
tags: [js,rxjs]
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/english-grammer/english-grammer-cover5.png
description: >
  electron webview 打印
---

## electron webview 打印

你好，我是燕云长风。 寓意：结合李白著名的边塞诗《关山月》取【燕云长风】—— 长风几万里，吹度玉门关。 
最近在实际的项目中接到了大量打印方面的需求，起初是优先采用lodop进行web打印，后来考虑到了跨平台的可扩展性，研究了electron webview 打印。  
由于electron5版本以上默认是禁用状态，所以首先需要在构造BrowserWindow时，需要通过设置webviewTagwebPreferences选项来启用标electron 打印有两种方式  

1. 通过window的webcontent对象，使用此种方式需要单独开出一个打印的窗口，可以将该窗口隐藏，但是通信调用相对复杂
2. 使用页面的webview元素调用打印，可以将webview隐藏在调用的页面中，通信方式比较简单。以上两种方式都有实现，最后我选择了用webview来实现单页和多页打印。

## How

1. 首先在首页中嵌入webview元素 添加webview元素通信api  

```swift
<webview src="sections/prints/print.html" id="printWebview" nodeintegration style="display:none"></webview>
<script src="sections/prints/print.js"></script>

## 这是print.html文件内容
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Document</title>
 <style>
 body,
 html {
   padding: 0px;
   margin: 0px;
 }
 @page {
    margin: 0px;
 }
 .page{
   page-break-after: always;
 }
 </style>
</head>

<body id='bd'>
 <div>明月出天山</div>
 <div>苍茫云海间</div>
 <div>长风几万里</div>
 <div>吹度玉门关</div>
</body>
<script>
 const {ipcRenderer} = require('electron')
 ipcRenderer.on('webview-print-render', (event, info) => {
 ipcRenderer.sendToHost('webview-print-do',info.deviceName)
 })
</script>
</html>

##  这是print.js文件
const { ipcRenderer } = require('electron');// 这是在electron环境中所以可以用commonjs的方式导入
const { message } = require('antd');//// 这是在electron环境中所以可以用commonjs的方式导入
onload = () => {
    const webview = document.getElementById('printWebview');
    if (!webview) {
        message.error('未找到webview元素，请审查页面')
        return
    }
    webview.addEventListener('ipc-message', (event) => {
        const deviceName = event.args[0];
        console.log('deviceName' + deviceName)
        // webview.openDevTools(); 打开webview调式
        if (event.channel === 'webview-print-do') {
            if (deviceName) {
                webview.print(
                    {
                        silent: true,
                        printBackground: false,
                        deviceName,
                    }
                )
                .then(window.postMessage('cb'))
                .catch(_ => message.error(`失效的打印机名称${deviceName}，请检查重试`))
                return
            }
            webview.print()
        }
    })
}

```  
2. 封装通用的webview 单页和多页打印方法

```swift
  import { style } from './webview.style'; 
/*编写的通用打印样式 
eg: .page{
        page-break-after: always;
    }
*/
import { getPrint } from '@/api/index';
// getPrint 方法 ：ipc通信获取指定打印机的名称

import { message } from 'antd';

let webview = null;
let cssKey = '';
/**
 * [initWebview 初始化webview的方法]
 */
const initWebview = () => {
 webview = document.getElementById('printWebview');
 if (!webview) {
    message.error('未找到webview元素，请审查页面')
    return
 }
 return webview
}
/**
 * [webviewPrintPage webview单页打印API]
 * @param {string} pageHtml [打印的pageHtml]
 * @param {string} type [打印机的类型]
 */

const webviewPrintPage = async (pageHtml, type) => {
 const webview = initWebview();
 let deviceName = '';
 if (!webview) return
 if(!cssKey) {
    cssKey = await webview.insertCSS(style);
 }
 await webview.executeJavaScript('document.body.innerHTML =`' + pageHtml + '`;')
 if ( type ) {
    deviceName = await getPrint( type );// // 自己编写的从sqlite数据库获取指定打印机名称的方法
 }
 webview.send('webview-print-render', {
    deviceName
 })

}
/**
 * [webviewPrintPages webview多页打印API]
 * @param {string} type [打印机的类型]
 * @param {function} callback [打印成功后的回调]
 * 
 */
const webviewPrintPages = async (pagesHtml, type, callback) => {
  const webview = initWebview();
 let deviceName = '';
 if (!webview) return
 if(!cssKey) {
   cssKey = await webview.insertCSS(style);
 }
 await webview.executeJavaScript('document.body.innerHTML=`' + '`;');
 for (const pageHtml of pagesHtml) {
   await webview.executeJavaScript('document.body.innerHTML +=`' + '<div class="page">' + pageHtml + '</div>`;')
 }
 if( type ){
    deviceName = await getPrint(type);
 }
 webview.send('webview-print-render', {
   deviceName,
   pagesHtml
 })
  if(callback && typeof callback == 'function'){
        const messageHandle = () => {
            callback();
            window.removeEventListener('message',messageHandle);
        }
        window.addEventListener("message",messageHandle);
    } 
}

export default {
  webviewPrintPage,
  webviewPrintPages
}


注意：多页打印应用到了 css 的 page-break-after: always; 属性，很好的做个分页处理，避免了写固定高度这种不靠谱的方法
```
## 注意


本人之前的环境是在虚拟机中的win10 开发的 遇到了各种各样的奇葩问题 ：比如说electron 开发运行环境时 ，webview打印的内容为空  打包后的应用打印正常，无法打开控制台调式。（注 win10真机无以上异常情况 本人猜测是虚拟机安装的系统是阉割版，少了底层的一些windows服务）
以上就是webview的打印通信打印方法的封装和实现，与大家共分享，共进步。

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