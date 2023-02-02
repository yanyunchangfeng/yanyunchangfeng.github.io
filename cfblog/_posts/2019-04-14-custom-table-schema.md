---
layout: post
title: 自定义表格架构实现多维数据动态渲染
categories: [cfblog]
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table-cover.png
description: >
  这是自己设计实现的一个表格小架构
---
那是一年春天，正当北京春暖花开的时候，我踏上了北上的列车，雪花飘飘、北风萧萧，前往XXX市公安交通智能指挥中心参加一个合同金额为3亿的项目~XXX市公安交通智能化管控系统的研发。

在此，我做了三大模块：

1.大队排班管理模块

2.勤务考核统计模块

3.人员甘特图模块

其中大队排班管理是所有模块中最复杂的，排班分为四个层次结构，星期、时间、岗位、警员/警车，前台数据结构和后台数据结构分离，用适配器处理。因为数据结构很复杂，业务需要透明化来操作数据，分离数据结构，简化业务逻辑。

为了方便大家更加直观了解，我截取了一组在线效果运行图：


![这是排班管理主页面，根据人员权限显示不同的操作选项，此处列出所有功能项](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table1.png) 

<p style="background-color:gray;color:#fff" align="center">这是排班管理主页面，根据人员权限显示不同的操作选项，此处列出所有功能项</p>


![这是点击修改选项后进入大队下属中队添加排班页面](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table2.png) 

<p style="background-color:gray;color:#fff" align="center">这是点击修改选项后进入大队下属中队添加排班页面</p>


![这是中队排班修改页面](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table3.png) 

<p style="background-color:gray;color:#fff" align="center">这是中队排班修改页面</p>


![点击某天某个时段弹出人员、警车列表修改页面](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table4.png) 

<p style="background-color:gray;color:#fff" align="center">点击某天某个时段弹出人员、警车列表修改页面</p>


![这是人员甘特图页面](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table5.png) 

<p style="background-color:gray;color:#fff" align="center">这是人员甘特图页面 </p>

![这是勤务考核统计页面](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/custom-table-schema/custom-table6.png) 

<p style="background-color:gray;color:#fff" align="center">这是勤务考核统计页面 </p>


```swift
接下来给大家展示一下数据部分：这是其中的一条数据，有些长
var duty = {
  "grouyId":"0293",
  "startDate":"2019-03-07",
  "endDate":"2019-03-14",
  "audit":{},
  "list":[
    {
      "dutyItem":
      {
        "dutyItemId":"1",
        "org":{"val":"一中队","key":"1","dataType":"simple"},
        "leader":{"val":"张三","key":"12","dataType":"simple"},
        "postType":{"val":"固定岗","key":"122","dataType":"simple"},
        "post":{"val":"省政府岗","key":"132","dataType":"simple"},
        "interval":{"val":"固五","key":"152","dataType":"simple"},
        "monday":[
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215"],
            "operatorNames":["张三"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马七","牛八"]
          },
          {
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          },
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["王五","六六"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          }
        ],
        "tuesday":[
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          }

        ],
        "wednesday":[
          {
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          },
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          },
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          }
        ],
        "thursday":[
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          },
          {
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          }
        ],
        "friday":[
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          }
        ],
        "saturday":[
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          },
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },{
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          }
        ],
        "sunday":[
          {
            "index":"1",
            "timeName":"固早",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"3",
            "timeName":"固晌",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },{
            "index":"4",
            "timeName":"固晚",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["马1","牛2"]
          },
          {
            "index":"2",
            "timeName":"固午",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["张三","李四"]
          },
          {
            "index":"5",
            "timeName":"固夜",
            "timeId":"1203",
            "timeValue":"07:00-09:00",
            "operatorIds":["013215","013268"],
            "operatorNames":["横七","树八"]
          }
        ],
        "operateList":[{"name":"查看","url":"dutyAdd.html","editAble":false},{"name":"修改","url":"classadd.html","editAble":true}]
      }
    }
  ]
}
好了，数据有点复杂，不过我们以不变应万变，自定义表格架构该出场了：
var tableDefinition4DutyAdd = [
  {"key":"org","value":"所属班组","dataTYpe":"simple"},
  {"key":"leader","value":"带队领导","dataTYpe":"simple"},
  {"key":"postType","value":"岗位类别","dataTYpe":"simple"},
  {"key":"post","value":"岗位名称","dataTYpe":"simple"},
  {"key":"interval","value":"时段类别","dataTYpe":"simple"},
  {'key':"monday",'value':'周一',"dataTYpe":"complex"},
  {'key':"tuesday",'value':'周二',"dataTYpe":"complex"},
  {'key':"wednesday",'value':'周三',"dataTYpe":"complex"},
  {'key':"thursday",'value':'周四',"dataTYpe":"complex"},
  {'key':"friday",'value':'周五',"dataTYpe":"complex"},
  {'key':"saturday",'value':'周六',"dataTYpe":"complex"},
  {'key':"sunday",'value':'周日',"dataTYpe":"complex"},
  {"key":"operateList","value":"操作","dataTYpe":"opt"}
];
请看，这样的表格结构是不是和后台的数据结构一一对应了
    分两步走：
    1：渲染表头
    var $thead =$("<thead></thead>");
    var $tr = $("<tr></tr>");
    for(var i =0;i<tableDefinition4DutyAdd.length;i++){
      var $th=$("<th></th>")
      $th.append(tableDefinition4DutyAdd[i].value);
      $tr.append($th);
    }
    $thead.append($tr);
    $table.append($thead);
    2.结合自定义表格架构和后台真实数据全动态渲染
    for(var i =0;i < duty.list.length;i++){
      var  DutyItem4Temp = duty.list[i].dutyItem;
      var $tr=$('<tr></tr>');
      for(var j=0;j < tableDefinition4DutyAdd.length;j++){
        //定义数组中的一个对象用def保存;
        var $td=$('<td></td>')
        var def=tableDefinition4DutyAdd[j];
        switch(def.dataTYpe){
          case "simple":{
            if(DutyItem4Temp[def.key]!==null){
              $td.append(DutyItem4Temp[def.key].val);
            }
            break;
          };
          case "complex":{
            $td.addClass('week')
            var weekobj = DutyItem4Temp[def.key];
            (function(){
              var $ul=$('<ul></ul>');
              for(var i = 0;i < weekobj.length;i++){
                  for(var j =0;j<weekobj.length;j++) {
                    var def = weekobj[j];
                    if(def.index==i+1){
                    $ul.append('<li>'+def.timeName+':'+def.username+'</li>');
                      break;
                    }
                  }
              }
              $td.append($ul)
            })();
            break;
          };
          case "opt":{
            $td.addClass('operate')
            var optobj=DutyItem4Temp[def.key];
            (function(){
              for(var i=0;i<optobj.length;i++){
                var def=optobj[i];
                switch(def.name){
                  case '查看':{
                    var $a=$('<a>'+def.name+'</a>');
                    $td.append($a).append('&nbsp;&nbsp;');
                    $a.on('click',showOpt);
                    break;
                  }
                  case '修改':{
                    if(sessionStorage['option']=='查看'||sessionStorage['option']=='提交'||sessionStorage['option']=='审批'||sessionStorage['option']=='复制'||sessionStorage['showAdd']=='false'){
                      break;
                    }
                    var $a=$('<a>'+def.name+'</a>');
                    $td.append($a).append('&nbsp;&nbsp;');
                    $a.on('click',updateOpt);
                    break;
                  }
                  case '删除':{
                    if(sessionStorage['option']=='查看'||sessionStorage['option']=='提交'||sessionStorage['option']=='审批'||sessionStorage['option']=='复制'||sessionStorage['showAdd']=='false'){
                      break;
                    }
                    var $a=$('<a>'+def.name+'</a>');
                    $td.append($a);
                    $a.on('click',deleteOpt);
                  }
                }
              }
            })();
          }
        }
        $tr.append($td)
      }
      $tbody.append($tr);
    }
    $(table).append($tbody);
好了，我们接着用这种方式再来处理刚刚渲染的这个表格的修改页面
    分步走：
    1.定义表格架构
var tableDefinition4ItemEdit=[
  {'key':"monday",'value':'周一'},
  {'key':"tuesday",'value':'周二'},
  {'key':"wednesday",'value':'周三'},
  {'key':"thursday",'value':'周四'},
  {'key':"friday",'value':'周五'},
  {'key':"saturday",'value':'周六'},
  {'key':"sunday",'value':'周日'},
];
   2.渲染头部
  (function(){
    var $thead = $('<thead></thead>');
    var $tr = $('<tr></tr>');
    $tr.append($('<th></th>'))
    for(var i = 0;i < tableDefinition4ItemEdit.length;i++){
      var $th = $('<th></th>')
      var def = tableDefinition4ItemEdit[i]
      $th.append(def.value)
      $tr.append($th)
    }
    $thead.append($tr)
      $(table).append($thead)
  })();
  2.渲染主体
  (function(){
        var currentDutyItem = duty.list[0].dutyItem;
        //定义一周任意一天的时段类型;
        var timeSlotType = currentDutyItem[tableDefinition4ItemEdit[0].key];
        //创建tbody
        (function(){
          var $tbody = $('<tbody></tbody>');
          for(var i = 0;i < timeSlotType.length; i++){
            var $tr=$('<tr></tr>');
            for(var j = 0;j <= tableDefinition4ItemEdit.length;j++){
              $tr.append($('<td></td>'))
            }
            $tbody.append($tr)
          }
            $(table).append($tbody)
        })();
        //为tbody列头赋值;
        (function(){
          for(var i = 0;i<timeSlotType.length;i++){
            var def = timeSlotType[i];
            for(var j=0;j<timeSlotType.length;j++){
              if(def.index == j+1){
                  $(table).find('tbody tr:nth-child('+(j+1)+') td:first-child').append(def.timeName);
                break;
              }
            }
          }
        })();
        //添加内容
       这是表格定位的坐标方法，通过坐标定位，匹配对应某天的某个时段人员信息，依次插入
       var Util = {
         getTdIndex:function($td){
           var $tr = $td.parent();
           var $tdArr = $tr.children();
           for(var i = 0;i < $tdArr.length;i++){
             if($td.get(0) === $tdArr[i]){
               return i;
             }
           }
        },
        getTrIndex:function($tr){
          var $tbody = $tr.parent();
          var $trArr = $tbody.children();
          for(var j=0;j<$trArr.length;j++){
            if($tr.get(0)===$trArr[j])
            return j+1;
          }
        }
       }

        (function(){
          //1.拿到所有需要填写的td
          var $tds = $('#tabpb tbody td:not(:first-child)');
          //2.遍历所有的td,保存对应的td坐标
          for(var i = 0;i < $tds.length; i++){
            var $td = $($tds[i]);
            var currentTdIndex = Util.getTdIndex($($tds[i]));
            var currentTrIndex = Util.getTrIndex($($tds[i]).parent());
            (function(){
              var currentTdKey = tableDefinition4ItemEdit[currentTdIndex-1].key;
              var currentDayArr = currentDutyItem[currentTdKey];
              for(var i = 0;i < currentDayArr.length;i++){
                var currentDay = currentDayArr[i];
                if(currentDay.index == currentTrIndex){
                  $td.append(currentDay.username.join(','))
                }
              }
            })();
          }
        })();
  })();
     
```
以上就是核心的设计思想和代码实现 如果你需要更加全面的代码，请访问:[HEB_STCS_REST](https://gitee.com/yanyunchangfeng/HEB_STCS_REST)

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