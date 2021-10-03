---
Created: "2021/09/12 11:26:01"
Last modified: "2021/10/03 14:20:55"
---

# yiu_bouncer.jsx

## Contents

| file                 | content         |
| -------------------- | --------------- |
| yiu_bouncer.jsx      | Script          |
| yiu_bouncer_guide.md | Script manual   |
| yiu_bouncer.mp4      | Script Tutorial |

<br/><br/><hr><br/>

## Install procedure

Pls copy the jsx file into the ScriptUI Panels folder.

- Windows  
  ...Program Files¥Adobe After Effects <version>¥Support Files¥Scripts¥ScriptUI Panels
- Mac  
  ...Applications/Adobe After Effects <version>/Scripts/ScriptUI Panels
  If AfterEffects is already running, please restart it.

<br/><br/><hr><br/>

## Uninstall procedure

Please delete the jsx file from ScriptUI panels

<br/><br/><hr><br/>

## Usage instructions

### for path

1. Select path properties
   ![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912143831.png)

2. Click the elastic tool button for path properties
   ![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912144322.png)

3. When modifying the path, first turn off the expression switch of the path property
   ![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912144457.png)

### for other properties

1. Select properties with numbers, such as position, transparency, zoom, etc.
   ![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912144657.png)

2. Click the elastic tool button for non-path
   ![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912144808.png)

<br/><br/><hr><br/>

## parameter description —— overshoot

### freq : frequency（ overshoot for path / overshoot

By adjusting the frequency, the number of rebounds per second can be modified
![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912145040.png)

### decay : Attenuation coefficient（ overshoot for path / overshoot

By adjusting the decay, you can modify the magnitude of the decrease in each rebound compared to the last time
![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912145329.png)

### deltaT : Sampling time（ overshoot for path / bounce for path

Since there is no volocity in the path property expression, when calculating for each path point, it is necessary to obtain the position of the point a short time before the key frame, and this short time is the sampling time.
By adjusting the sampling time, a slightly different initial velocity value and initial direction can be obtained;
The shorter the sampling time, the closer to the instantaneous speed of the key frame moment.

<video mute autoplay control loop src='http://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/d_k_change_en.mp4'></video>

### k : Exaggeration coefficient（ overshoot for path

This property defaults to the inverse of the sampling time,
For example, the sampling time is 1/1000, and the exaggeration coefficient is 1000;
In some occasions, more exaggerated elasticity is required, and this coefficient can be modified to directly enlarge the elastic effect.

<video mute autoplay control loop src='http://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/d001_k_change_en.mp4'></video>

### easeK : Smoothing factor （ overshoot for path / bounce for path

Since the elastic formula is to add an additional value of elasticity to the property value at the current time,
It is possible that when approaching the next key frame, the position of the path point deviates far, which may cause a freeze before the next key frame.
This property is used to smooth the current elasticity to the next key frame;
The property itself has been enlarged by 100 times, that is, when 100 is filled in, the property is automatically calculated as 1;
The larger the value, the later the transition to the next key frame, the longer the elastic effect will be.

<video mute loop autoplay control src='http://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/easeK_change.mp4'></video>

### easeBoo（ overshoot for path / bounce for path

Smoothing coefficient switch, convenient to directly observe the comparison before and after smoothing

<br/><br/><hr><br/>

## parameter description —— bounce back

### e : Base index

When an object collides, the attenuation amplitude of each rebound conforms to the exponential function curve,
The default is about the base of natural logarithm 0.7,
Adjust this property to adjust the attenuation speed;
![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912145611.png)

### g : Gravity

Gravity controls the height of each bounce. The smaller the gravity, the higher the bounce height, and the longer it takes for each bounce.

![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912145754.png)

### nMax : Maximum number of collisions

The maximum number of collisions each time the elasticity is generated.

![](https://leizingyiu.github.io/AfterEffectsScripts/yiu_bouncer/mdFile/20210912145925.png)

### deltaTime : Sampling time

Similar to the sampling time in overshoot, the speed value and speed direction at the time of collision can be adjusted

### easeK / easeBoo (overshoot for path / bounce for path

Similar to the same attribute in "overshoot for path". Please refer to the above .

<br/><br/><hr><br/>

## Version historey

| version | date       | directions                                                                                                                                               |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.0    | 2021-09-12 | Release scripts to support the rebound and rebound of paths and digital attributes; when the path rebounds, it supports smoothing to the next key frame. |
| v1.1    | 2021-09-22 | “bounceback for path” also supports smoothing to the next key frame!                                                                                     |

yiu_bouncer  
Version: 1.1  
for Win & Mac AfterEffects 15.0 (CC) or later.  
Copyright (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.  
https://leizingyiu.net  
Coding by leizingyiu
