# yiu_bouncer.jsx

# Contents

| file                 | content         |
| -------------------- | --------------- |
| yiu_bouncer.jsx      | Script          |
| yiu_bouncer_guide.md | Script manual   |
| yiu_bouncer.mp4      | Script Tutorial |

<br/><br/><hr><br/>

# Installation

Copy the **jsx** file into the **ScriptUI Panels** folder.

- Windows  
  ...Program Files / Adobe After Effects <version> / Support Files / Scripts / ScriptUI Panels
- Mac  
  ...Applications / Adobe After Effects <version> / Scripts / ScriptUI Panels
  If After Effects is running, please restart AE after copying the file.

<br/><br/><hr><br/>

# Uninstallation

Please delete the **jsx** file from **ScriptUI panels** folder

<br/><br/><hr><br/>

# Instructions

## for path

1. Select path properties
   ![](https://pic.leizingyiu.net/20210912143831.png)

2. Click the elastic tool button for path properties
   ![](https://pic.leizingyiu.net/20210912144322.png)

3. When modifying the path, toggle off the expression of the path property at first  
   ![](https://pic.leizingyiu.net/20210912144457.png)

## for other properties

1. Select properties with numbers, such as position, opacity, scale, etc.
   ![](https://pic.leizingyiu.net/20210912144657.png)

2. Click the elastic tool button for other properties
   ![](https://pic.leizingyiu.net/20210912144808.png)

<br/><br/><hr><br/>

# parameter description —— overshoot

## freq : frequency（ overshoot for path / overshoot

By adjusting the frequency, you can modify the number of rebounds per second;
![](https://pic.leizingyiu.net/20210912145040.png)

## decay : Attenuation coefficient（ overshoot for path / overshoot

By adjusting the decay, you can modify the decrease magnitude each rebound comparing with the last time
![](https://pic.leizingyiu.net/20210912145329.png)

## deltaT : Sampling time（ overshoot for path

Since there is no velocity in the path property expression, when calculating each path point, it is necessary to obtain the position of the point of a short time before the key frame, and this short time is the sampling time.
By adjusting the sampling time,you can obtain a slightly different initial velocity value and initial direction ;
The shorter the sampling time, the closer to the instantaneous speed of the key frame moment.
![](http://pic.leizingyiu.net/d_k_change_en.gif)

## k : Exaggeration coefficient（ overshoot for path

This property defaults to the inverse of the sampling time,
For example, the sampling time is 1/1000, and the exaggeration coefficient is 1000;
In some cases, more exaggerated elasticity is required, you can modify this coefficient to enlarge the elastic effect direct.
![](http://pic.leizingyiu.net/d001_k_change_en.gif)

## easeK : Smoothing factor （ overshoot for path

Since the elastic expression is adding an additional elastic value to the current property value,
It is possible that when approaching the next key frame, the position of the path point deviates relatively far, which may cause a freeze before the next key frame.
This property is used for smooth the current elasticity to the next key frame;

The smoothing method is easeK powers of time between 2 keyframes;
The property itself has been enlarged by 100 times, when 100 is filled in, the property is automatically calculated as 1;
The larger value, the later transition to the next keyframe, the longer elastic effect will be.
![](https://pic.leizingyiu.net/easeK_change.gif)

## easeBoo（ overshoot for path

The switch of smoothing coefficient is convenient to directly observe the comparison of before and after smoothing

<br/><br/><hr><br/>

# parameter description —— bounce back

## e : Base index

When an object collides, the attenuation amplitude of each rebound conforms to the exponential function curve,
The default is about the base of natural logarithm 0.7,
Adjust this property to adjust the attenuation speed;
![](https://pic.leizingyiu.net/20210912145611.png)

## g : Gravity

Gravity controls the height of each bounce. The smaller gravity, the higher bounce height, and the longer time for each bounce.

![](https://pic.leizingyiu.net/20210912145754.png)

## nMax : Maximum number of collisions

The maximum number of collisions is for each time the elasticity generated.

![](https://pic.leizingyiu.net/20210912145925.png)

## deltaTime : Sampling time

Similar to the sampling time in overshoot,you can adjust the speed value and speed direction at the time of collision .
<br/><br/><hr><br/>

# Version historey

| version | date       | directions                                                                                                                                               |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.0    | 2021-09-12 | Release scripts to support the rebound and rebound of paths and digital attributes; when the path rebounds, it supports smoothing to the next key frame. |

<hr>

yiu_bouncer  
Version: 1.0  
for Win & Mac AfterEffects 15.0 (CC) or later.  
Copyright (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.  
https://leizingyiu.net  
Coding by leizingyiu
