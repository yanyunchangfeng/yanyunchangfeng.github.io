---
layout: post
title: 代码规范
categories: [cfblog]
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/code-format/code-format-cover.png
description: >
  从命名、声明、代码和angular代码规范四个方面说明
excerpt_separator: <!--more-->
---
```swift
1 .命名

     1.1 类名，对象命名通常是名词或名词短语，如Customer，UserInfo，避免使用Manager，Data等，不要使用动词；
     1.2 方法名一般使用动词或动词短语，如postPayment、save等。理论上根据方法名称就能知道方法大概是在做什么；
     1.3 所有命名都应该有意义，不要出现拼音形式命名，或者a,b,name1,name2等形式形式命名
     1.4 所有的声明理论上都应该是有用的，没有用上的都应该删除；
     1.5 常量的命名一般都是大写，switch语句的case一般都是大写；
     1.6 方法名与变量名都应该是驼峰式，如userInfo，类名首字母大写，如Customer；
     1.7 通常文件的后缀应该表明该文件的类型，如ActiveService，DataManager、UserInfoBean等;
     1.8 通常变量和方法为私有(private),在angular2中有用；
2 .声明


     2.1 每一个变量、方法、类声明都应该有意义，也就是说被消费，不然就应该删除；
     2.2 理论上变量被声明都应该被初始化,(这里的初始化不是指赋值吗，实际上每一个变量被声明的 时候默认的都有值的,这个时候的值说是空)。 一般的情况不会在变量一声明的时候就给一个默认值或者死值。在每个类里面都应该有一个初始化的方法，一般的变量都是在这里给默认值。
     2.3 变量的作用域应该尽可能的小，而不是所有的变量都声明在最外面
3 .代码

     3.1 代码单一原则，一个类应该只做一件事、一个方法应该只完成某一个功能；
     3.2 知道最少原则，一个变量，一个方法一个类在系统中应该被最少的人知道；
     3.3 接受参数最少原则，一个方法应该接受尽可能少的参数，一般的情况最好不要超过5个；
     3.4 垂直格式，两个有关联的方法放在一起，以先后顺序垂直排列；
     3.5 代码最少原则，一个类和一个方法的代码应该尽可能的少，原则上一个类的代码应该控制在200行左右，多点500行，一个方法的代码控制在20行；
     3.6 避免沉余代码，当项目中出现了多个类似功能的代码的时候，就应该考虑提炼代码，出公共方法，类
     3.7  if语句的条件应该尽可能的少，当if语句的条件多的时候就应该考虑对if取反，就是if(!false);
     3.8 个人建议不要大量的if()elseif();我推荐的方式是if(!false)return;
     3.9 对代码进行格式化
     3.10 不要出现大量的代码注释，这样会误导第二个人对代码的理解，不用的就删掉 
     3.11 对适当的代码加注释，便于别人理解，也防止自己忘记；
     3.12 方法的参数之间应该有空格，如login(name, pass, type);
4 .angular的代码规范

     4.1 代码结尾都加分号，避免出现未知的错误；
     4.2  html的标签应该为闭合状态，如<br/>;
     4.3 引号应该统一，要么都是"",要么都是‘’；
     4.4 以模块名为文件的结尾，如controller，service，module，route，directive，        filter，template等
     4.5 文件命名应该体现出功能，全部用英文小写，用"-"进行分割，如disk-creation.html ,  app-hardware.module.js
     4.6  Controller的命名以Ctrl结尾，首字母大写，以驼峰式命名，如DiskCreationCtrl
     4.7  template的html尽量不要内联模式，最好创建一个html用外联模式
     4.8  angular的规范应该遵从上面三类的规范，比如单一原则中，一个controller.js里面应该只放一个controller，这个controller只做完成某一个功能；
5 .注释规范
    export default class Claculate{ 

   /**
     *
     *
     * [computeBonus 奖金范围预测]
     * @param {number} active [当前选中的号码]
     * @param {string} play_name [当前的玩法标识]
     * @return {array}     [奖金范围]
     * @memberof Claculate
     */
    computeBonus(active,play_name){
       const play = play_name.split('');
       const self = this;
       let arr  = new Array(play[1]*1).fill(0);
       if(play[0] === 'r'){
           //min_active 最小命中
           let min_active = 5-(11-active);
       }
    }
}
以类原型方法为例 

1.首先空两行，第三行开始用中括号说明方法名称及释意
2.需要接受的参数@param 类型写在大括号里面 空格 变量名 中括号说明参数释意
3.返回值 @return 类型写在大括号里 空格 中括号说明返回值释意  【无返回值可不写】
4.@memberof 空格 类名 （意思是解释此函数隶属于那个类下） 【不是类成员可以不写
```
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