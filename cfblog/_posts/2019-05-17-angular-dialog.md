---
layout: post
title: Angular Dialog 组件的设计与实现
image: https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/angular-dialog/angular-dialog-cover.png
description: >
  Angular Dialog 组件已于2019-06-07 升级到angular 8.0
# hide_image: true
---

yycf-dialog 是一个基于Angular开发的通用业务组件库，包含Loading， Message 和 Confirm。前端技术栈：Angular，TypeScript，RxJS 高级实现了此dialog组件，组件发布到 npm 市场两天后，下载量达到451，以此为契机，希望让更多的人来了解和使用。
为了让大家更加直观了解，我截取了一组在线运行图：



![这是loading正在加载的效果](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/angular-dialog/angular-dialog1.png) 

<p style="background:gray;color:#fff;text-align:center">这是loading正在加载的效果</p>

![这是confirm的效果](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/angular-dialog/angular-dialog2.png) 

<p style="background:gray;color:#fff;text-align:center">这是confirm的效果</p>

![这是message的效果](https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0.0/assets/img/blog/angular-dialog/angular-dialog3.png) 

<p style="background:gray;color:#fff;text-align:center">这是message的效果</p>

## 安装
```
 npm install yycf-dialog
```
## 使用

```
import { DialogModule, DialogService} from 'yycf-dialog/components';

<yycf-dialog [key]="'1'"></yycf-dialog>
<yycf-dialog [key]="'2'"></yycf-dialog>
<yycf-dialog [key]="'3'"></yycf-dialog>

//自定义的footer button 需要自定义button样式，或者直接使用其他组件库的button
<yycf-dialog [key]="'4'" #ct>
  <yycf-footer>
    <button class="customButtonClass" (click)="ct.accept()">确定<button>
    <button class="customButtonclass" (click)="ct.reject()">取消<button>
  <yycf-footer>
<yycf-dialog>

export class DialogDemo  implements OnInit{ 
           
    constructor(private dialog: DialogService) {}
 
    ngOnInit(){

    this.dialog.confirm(
      {
        message:'确定要删除吗?',
        header:'warning',
        okVisible:true,
        offVisible:true,
        okButton:'blue',
        offButton:'green',
        okLabel:``,
        key:"1",
        offLabel: ``,
        accept:()=>{
              this.dialog.confirm({
                message:'已删除',
                header:'ok',
                okVisible:true,
                offVisible:false,
                okButton:'blue',
                offButton:'red',
                okLabel:``,
                key:"2",
                // delay:3000,
                offLabel: ``,
                accept:()=>{
                  this.dialog.confirm({
                    message:'正在拼命加载……',
                    header:'waiting',
                    okVisible:false,
                    offVisible:false,
                    okButton:'blue',
                    offButton:'green',
                    okLabel:``,
                    key:"3",
                    // delay:3000,
                    offLabel: ``,
                    accept:()=>{
    
                    },
                    reject:()=>{
    
                    }
                  })

                },
                reject:()=>{

                }
              })
        },
        reject:()=>{

        }
      });
   }
}
 
```

## 文档参数说明

| 参数       | 说明                   |类型                       | 默认值 
|----------  |----------             |   -----------            |-------
| key        | 标识当前对话框的唯一性    | string                    | null  
| width      | 设置对话框宽度          |  string                   | auto  
| height     | 设置对话框高度          | string                    | auto  
| opacity    | 设置对话框透明度        |  number                   | .5    
| message    | 设置对话框标题          | string                    | yycf-dialog component
| header     | 对话框的类型           | 'waiting' 'ok' 'warning'   | 'waiting'
| okVisible  | 确定按钮的可见性       | boolean                     | true  
| offVisible | 取消按钮的可见性       | boolean                     | true  
| okButton   | 确定按钮的颜色        | 'blue'  'green'  'red'       | 'blue'  
| offButton  | 取消按钮的颜色        | 'blue'  'green'  'red'       | 'green' 
| okLabel    | 确定按钮的内容        |  string                      | 确定 
| offLabel   | 取消按钮的内容        | string                       | 取消  
| delay      | 指定对话框的生命周期   | number (ms)                  |  null  
| accept     | 确定按钮的回调函数     | Function                     |  null  
| reject     | 取消按钮的回调函数     | Function                     |  null  

## PS：若回调函数的返回值为false，则执行完回调函数后不关闭对话框。

##  DialogService API


  |名称     | 参数  |         描述 |
  |--------|-------|-------------|
  |confirm | object|   创建一个对话|
  |close   |  无   |     关闭对话框|
  
  ```
    let dia = this.dialog.confirm({
        message:'正在拼命加载',
        header:'warning',
        okVisible:true,
        offVisible:true,
        okButton:'blue',
        offButton:'green',
        okLabel:``,
        offLabel: ``,
      });
   setTimeout(() => dia.close(),3000)
  ```
## Service类的实现

```
import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";
import {Dialog} from "./dialog";
@Injectable()
export class DialogService{
  zIndex: number = 10000;
  private requireDialogSource = new ReplaySubject<Dialog>(1);
  requireDialogSource$ = this.requireDialogSource.asObservable();
  confirm(dialog: Dialog) {
    this.zIndex++;
    this.requireDialogSource.next(dialog);
    return this;
  }
  close() {
    this.requireDialogSource.next(null);
  }
}
利用了RXJS ReplaySubject 的重播特性，等价于BehaviorSubject
```

## 组件类的实现

```
export class DialogComponent implements OnDestroy,OnInit{
  @Input() header = 'waiting';
  @Input() key:string;
  @Input() width = "auto";
  @Input() height = "auto";
  @Input() opacity = .5;
  @Input() message = 'yycf-dialog component';
  @Input() okLabel = '确定';
  @Input() offLabel = '取消';
  @Input() zIndex:number;
  @Input() okVisible = true;
  @Input() offVisible = true;
  @Input() okButton = 'primary';
  @Input() offButton = 'secondary';
  @Input() visible:boolean;
  @Input() delay:number;
  dialog:Dialog;
  @ContentChild(Footer) footer;
  subscription:Subscription;
  constructor(
    private dialogService:DialogService
  ) {
    
  }
  accept() {
    if(this.dialog.acceptEvent) {
      this.dialog.acceptEvent.emit();
    }else{
      this.hide();
      this.dialog = null;
    }
  }
  reject() {
    if(this.dialog.rejectEvent) {
      this.dialog.rejectEvent.emit();
    }else{
      this.hide();
      this.dialog = null;
    }
  }
  hide() {
    this.visible = false;
  }
  ngOnInit() {
    this.subscription = this.dialogService.requireDialogSource$.subscribe(dialog=>{
      if (dialog == null) {
        this.hide();
        return;
      }
      if(dialog.key === this.key){
        this.dialog = dialog;
        this.message = this.dialog.message||this.message;
        this.okLabel = this.dialog.okLabel||this.okLabel;
        this.offLabel = this.dialog.offLabel||this.offLabel;
        this.okVisible = this.dialog.okVisible ==null?this.okVisible:this.dialog.okVisible;
        this.offVisible = this.dialog.offVisible ==null?this.offVisible:this.dialog.offVisible;
        this.zIndex = this.dialogService.zIndex ||this.zIndex;
        this.header = this.dialog.header || this.header;
        this.opacity = this.dialog.opacity || this.opacity;
        this.delay = this.dialog.delay||this.delay;
        this.okButton = this.dialog.okButton||this.okButton;
        this.offButton = this.dialog.offButton||this.offButton;
        if(this.dialog.accept) {
          this.dialog.acceptEvent = new EventEmitter();
          this.dialog.acceptEvent.subscribe(()=>{
            let isClose = this.dialog.accept();
            if(isClose !== false){
              this.hide();
              this.dialog = null;
            }   
          })
        }
        if(this.dialog.reject) {
          this.dialog.rejectEvent = new EventEmitter();
          this.dialog.rejectEvent.subscribe(
            ()=>{
              let isClose = this.dialog.reject();
              if(isClose !== false){
                this.hide();
                this.dialog = null;
              }
            }
          );
        }
        if(this.delay&&this.delay!=0){
          timer(this.delay).subscribe(val => this.visible = false);
        }
        this.visible = true;
      }
    });
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
@NgModule({
  imports:[CommonModule],
  declarations:[DialogComponent,Footer],
  exports:[DialogComponent,Footer]
})
export class DialogModule{
    
}
```

以上就是核心代码的设计和实现，如果你需要更加全面的代码，请访问：[tyht](https://github.com/yanyunchangfeng/tyht)  
这是npm 包地址，请访问：[yycf-dialog](https://www.npmjs.com/package/yycf-dialog)

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