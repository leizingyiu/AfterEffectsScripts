# yiu_bouncer.jsx

# 内容说明

| 文件                 | 内容         |
| -------------------- | ------------ |
| yiu_bouncer.jsx      | 脚本         |
| yiu_bouncer_guide.md | 脚本说明     |
| yiu_bouncer.mp4      | 脚本使用教程 |

# 安装步骤

复制 jsx 文件到 ScriptUI Panels 文件夹.

- Windows  
  ...Program Files / Adobe After Effects <version> / Support Files / Scripts / ScriptUI Panels
- Mac  
  ...Applications / Adobe After Effects <version> / Scripts / ScriptUI Panels
  如果 AE 正在运行，请复制文件后重启 AE 。

# 卸载步骤

从 ScriptUI Panels 文件夹 删除该 jsx 文件即可。

# 使用说明

## 路径弹性

1. 选中路径属性
   ![](https://pic.leizingyiu.net/20210912121528.png)

2. 点击路径属性用的弹性工具按钮
   ![](https://pic.leizingyiu.net/20210912122801.png)

3. 修改路径时，先关闭路径属性的表达式开关
   ![](https://pic.leizingyiu.net/20210912123014.png)

## 非路径弹性

1. 选中带数字的属性，如 位置 、 透明度 、 缩放 等
   ![](https://pic.leizingyiu.net/20210912123212.png)

2. 点击非路径用的弹性工具按钮
   ![](https://pic.leizingyiu.net/20210912123301.png)

# 调整参数说明 —— 回弹

## 频率 （路径回弹 / 万能回弹

通过调节频率，可以修改每秒回弹次数
![](https://pic.leizingyiu.net/20210912130202.png)

## 衰减 （路径回弹 / 万能回弹

通过调节衰减，可以修改每次回弹比上次减少的幅度
![](https://pic.leizingyiu.net/20210912130439.png)
![](https://pic.leizingyiu.net/20210912130529.png)

## 取样时间 （路径回弹

由于路径属性表达式中没有 volocity ，所以在针对每个路径点进行计算时，需要获取关键帧前很短一段时间之前的点的位置，而这个很短的时间就是取样时间。
通过调节取样时间，可以获得稍微不同的初始速度值，以及初始方向；  
而取样时间越短，越接近关键帧时刻的瞬时速度。
（关于瞬时速度概念，请查阅中学课本）
![](https://pic.leizingyiu.net/d_k_change.gif)

## 夸张系数 （路径回弹

此属性默认为取样时间的倒数，  
譬如取样时间为 1/1000 ，夸张系数则为 1000 ；
在某些场合需要更夸张的弹性，可修改此系数，直接放大弹性效果。
![](https://pic.leizingyiu.net/d001_k_change.gif)

## 平滑系数（路径回弹

由于弹性公式是在当前时间的属性值上，添加弹性的附加值，
有可能出现接近下一个关键帧时，路径点的位置偏离较远，从而在下一个关键帧前出现卡顿。
此属性用于平滑当前弹性到下一个关键帧；
平滑方式为指数函数；
属性本身已经放大 100 倍，即填入 100 时，属性自动计算为 1 ；
平滑方式即为 当前时间 除以 间补时长 的 1 次方；
数值越大，越晚过度到下一关键帧，弹性效果越持久。
![](https://pic.leizingyiu.net/easeK_change.gif)

## 平滑开关（路径回弹

平滑系数的开关，方便直接观察平滑前后的对比

# 调整参数说明 —— 反弹

## 指数底数

物体碰撞时，每次反弹的衰减幅度符合指数函数曲线，  
默认约为自然对数的底数 0.7 ，
调整此属性可调整衰减速度；
![](https://pic.leizingyiu.net/20210912132904.png)
![](https://pic.leizingyiu.net/20210912132945.png)

## 重力

重力控制每次弹起的高度，重力越小，弹起高度越高，每次弹起需要的时间越长。
![](https://pic.leizingyiu.net/20210912133107.png)
![](https://pic.leizingyiu.net/20210912133153.png)

## 最大碰撞次数

每次产生弹性时的最大碰撞次数。
![](https://pic.leizingyiu.net/20210912134531.png)
![](https://pic.leizingyiu.net/20210912134557.png)

## 取样时间

与回弹中的取样时间相似，可调节碰撞时的速度值和速度方向

# 版本历史

| 版本 | 日期       | 说明                                                                             |
| ---- | ---------- | -------------------------------------------------------------------------------- |
| v1.0 | 2021-09-12 | 发布脚本，支持路径以及数字属性的回弹以及反弹；路径回弹时，支持平滑到下一关键帧。 |

yiu_bouncer  
Version: 1.0  
for Win & Mac AfterEffects 15.0 (CC) or later.  
Copyright (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.  
https://leizingyiu.net  
Coding by leizingyiu
