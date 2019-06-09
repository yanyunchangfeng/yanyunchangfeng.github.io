---
layout: post
title: 代码规范
image: /assets/img/blog/code-format/sjzc.jpg
description: >
  从命名、声明、代码和angular代码规范四个方面说明
excerpt_separator: <!--more-->
---

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