/** ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 *  ███░██░▄▄██▄██▄▄░██▄██░▄▄▀█░▄▄▄█░██░██▄██░██░██
 *  ███░██░▄▄██░▄█▀▄███░▄█░██░█░█▄▀█░▀▀░██░▄█░██░██
 *  ███▄▄█▄▄▄█▄▄▄█▄▄▄█▄▄▄█▄██▄█▄▄▄▄█▀▀▀▄█▄▄▄██▄▄▄██
 *  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
 *  yiu_bouncer.jsx
 * Copyright (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.
 * check it : https://www.leizingyiu.net
 * 
 * Name: yiu_bouncer
 * Version: 1.1
 * 
 * Description:
 * This script creates elastic for selected properties, 
 * including ordinary numeric properties, or path properties.
 * 
 * The elastic mathematics principle comes from Dan Ebberts' http://www.motionscript.com/articles/bounce-and-overshoot.html. For more information, please visit the above website.
 * 
 * Among them, the interface part (buildUI) and this instruction copy part refer to redefinery a lot, please visit https://www.redefinery.com to learn more.
 * 
 * I transplant ordinary elastic expressions to path propertiess, please visit https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 to learn more.
 * 
 * Note: If you use it in the path properties,and if you need to adjust the path after using the elastic, 
 * please deactivate the expression of the path properties first, that is, expand the properties, and click the equal icon in the expression line under the properties.
 * 
 * Note: This version of the script requires After Effects CS5 
 * or later. It can be used as a dockable panel by placing the 
 * script in a ScriptUI Panels subfolder of the Scripts folder, 
 * and then choosing this script from the Window menu.
 * And starting from this version to provide path properties expressions.
 * 
 * Legal stuff:
 * This script is provided "as is," without warranty of any kind, expressed
 * or implied. In no event shall the author be held liable for any damages
 * arising in any way from the use of this script.
 * 
 * In other words, I'm just trying to share knowledge with and help out my
 * fellow AE script heads, so don't blame me if my code doesn't rate. 
 * (same as redefinery. 囧
 */

/** yiu_bouncer.jsx
 * 版权所有 (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.
 * 阅读更多：https://www.leizingyiu.net
 * 
 * 名称：yiu_bouncer.jsx
 * 版本：1.1
 * 
 * 描述：
 * 此脚本为选定的属性产生弹性，包括普通的数字属性，或者路径属性。
 * 其中弹性数学原理来自 Dan Ebberts 的 http://www.motionscript.com/articles/bounce-and-overshoot.html ，需要了解请访问以上网址。
 * 其中 界面部分（buildUI）以及此说明文案部分 大量参考 redefinery ，请访问 https://www.redefinery.com 了解更多。
 * 由我把普通弹性表达式移植到路径属性上，请访问 https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 了解更多。
 * 
 * 注意：如果在路径属性中使用，在使用弹性后需要调整路径的话，
 * 请先关闭路径属性的表达式，即展开属性，点击属性下方表达式行的等于图标。
 * 
 * 注意：此版本的脚本需要 After Effects 15.0 (CC) (Oct 18 2017)
 * 或以后。它可以用作可停靠面板，通过放置 Scripts 文件夹的 ScriptUI Panels 子文件夹中的脚本，然后从窗口菜单中选择这个脚本。
 * 并从此版本开始提供路径属性表达式。
 * 
 * 隐私条款：
 * 此脚本按“原样”提供，不提供任何形式的保证，明示或暗示。
 * 在任何情况下，作者均不对因使用此脚本而以任何方式产生损害承担责任。
 * 换句话说，我只是想分享知识并帮助我的伙伴，所以如果我的代码没能帮上忙，请不要怪我🙏。
 */

(function myFirstScript(thisObj) {
    /** my localize */
    var lang = localize("$$$/MediaCore/Exporters/ExporterQuickTime/AlternateLanguage20=繁体中文").indexOf('中文') != -1 ? 'cn' : 'en';



    function buildUI(thisObj) {

        var script_setup = {
            winTitle: {
                cn: 'yiu_bouncer',
                en: 'yiu_bouncer'
            },
            version: '1.1',
            header: {},
            pal1: {
                title: {
                    cn: '路径用',
                    en: 'for Path'
                },
                overshootForPath: {
                    cn: '路径回弹',
                    en: 'Overshoot For Path'
                },
                bouncebackForPath: {
                    cn: '路径反弹',
                    en: 'Bounceback For Path'
                }
            },
            pal2: {
                title: {
                    cn: '非路径用',
                    en: 'for Other Properties'
                },
                overshoot: {
                    cn: '万能回弹',
                    en: 'Overshoot'
                },
                bounceback: {
                    cn: '万能反弹',
                    en: 'Bounceback'
                }
            },
            footer: {
                signText: {
                    cn: 'by Leizingyiu',
                    en: 'by Leizingyiu'
                },
                helpbtn: {
                    cn: '?',
                    en: '?'
                }
            },
            about: {
                cn: "yiu_bouncer.jsx\n" +
                    "版权所有 (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.\n" +
                    "阅读更多：https://www.leizingyiu.net\n" +
                    "\n" +
                    "名称：yiu_bouncer.jsx\n" +
                    "版本：1.1\n" +
                    "\n" +
                    "描述：\n" +
                    "此脚本为选定的属性产生弹性，包括普通的数字属性，或者路径属性。\n" +
                    "其中弹性数学原理来自 Dan Ebberts 的 http://www.motionscript.com/articles/bounce-and-overshoot.html ，需要了解请访问以上网址。\n" +
                    "其中 界面部分（buildUI）以及此说明文案部分 大量参考 redefinery ，请访问 https://www.redefinery.com 了解更多。\n" +
                    "由我把普通弹性表达式移植到路径属性上，请访问 https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 了解更多。\n" +
                    "\n" +
                    "注意：如果在路径属性中使用，在使用弹性后需要调整路径的话，\n" +
                    "请先关闭路径属性的表达式，即展开属性，点击属性下方表达式行的等于图标。\n" +
                    "\n" +
                    "注意：此版本的脚本需要 After Effects 15.0 (CC) (Oct 18 2017)\n" +
                    "或以后。它可以用作可停靠面板，通过放置 Scripts 文件夹的 ScriptUI Panels 子文件夹中的脚本，然后从窗口菜单中选择这个脚本。\n" +
                    "并从此版本开始提供路径属性表达式。\n" +
                    "\n" +
                    "隐私条款：\n" +
                    "此脚本按“原样”提供，不提供任何形式的保证，明示或暗示。\n" +
                    "在任何情况下，作者均不对因使用此脚本而以任何方式产生损害承担责任。\n" +
                    "换句话说，我只是想分享知识并帮助我的伙伴，所以如果我的代码没能帮上忙，请不要怪我🙏。\n",
                en: "yiu_bouncer.jsx\n" +
                    "copyright (c) 2021 leizingyiu (Zhengyao Li). All rights reserved.\n" +
                    "check it : https://www.leizingyiu.net\n" +
                    "\n" +
                    "Name: yiu_bouncer\n" +
                    "Version: 1.1\n" +
                    "\n" +
                    "Description:\n" +
                    "This script creates elastic for selected properties, \n" +
                    "including ordinary numeric properties, or path properties.\n" +
                    "\n" +
                    "The elastic mathematics principle comes from Dan Ebberts' http://www.motionscript.com/articles/bounce-and-overshoot.html. For more information, please visit the above website.\n" +
                    "\n" +
                    "Among them, the interface part (buildUI) and this instruction copy part refer to redefinery a lot, please visit https://www.redefinery.com to learn more.\n" +
                    "\n" +
                    "I transplant ordinary elastic expressions to path propertiess, please visit https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 to learn more.\n" +
                    "\n" +
                    "Note: If you use it in the path properties,and if you need to adjust the path after using the elastic, \n" +
                    "please deactivate the expression of the path properties first, that is, expand the properties, and click the equal icon in the expression line under the properties.\n" +
                    "\n" +
                    "Note: This version of the script requires After Effects CS5 \n" +
                    "or later. It can be used as a dockable panel by placing the \n" +
                    "script in a ScriptUI Panels subfolder of the Scripts folder, \n" +
                    "and then choosing this script from the Window menu.\n" +
                    "And starting from this version to provide path properties expressions.\n" +
                    "\n" +
                    "Legal stuff:\n" +
                    "This script is provided \"as is,\" without warranty of any kind, expressed\n" +
                    "or implied. In no event shall the author be held liable for any damages\n" +
                    "arising in any way from the use of this script.\n" +
                    "\n" +
                    "In other words, I'm just trying to share knowledge with and help out my\n" +
                    "fellow AE script heads, so don't blame me if my code doesn't rate. \n" +
                    "(same as redefinery. 囧\n"
            }
        };

        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", script_setup.winTitle[lang] + script_setup.version, undefined, {
            resizeable: true
        });

        if (win !== null) {
            var res =
                "group{\
                    orientation:'column', alignment:['fill','top'], \
                    pnl1:Panel{\
                        orientation:'row',text:'" + script_setup.pal1.title[lang] + "',alignment:['fill','center'],\
                        g:Group{\
                            alignment:['fill','top'],\
                            overshootForPath: Button{text:'" + script_setup.pal1.overshootForPath[lang] + "', alignment:['fill','top'], preferredSize:[-1,20] }\
                            bouncebackForPath: Button{text:'" + script_setup.pal1.bouncebackForPath[lang] + "', alignment:['fill','top'], preferredSize:[-1,20] }\
                        }\
                    },\
                    pnl2:Panel{\
                        orientation:'row',text:'" + script_setup.pal2.title[lang] + "',alignment:['fill','center'],\
                        g:Group{\
                            alignment:['fill','top'],\
                            overshoot: Button{text:'" + script_setup.pal2.overshoot[lang] + "', alignment:['fill','top'], preferredSize:[-1,20] }\
                            bounceback: Button{text:'" + script_setup.pal2.bounceback[lang] + "', alignment:['fill','top'], preferredSize:[-1,20] }\
                        }\
                    }\
                    footer: Group{\
                        orientation:'row',alignment:['fill','top'],\
                        signText:StaticText {text:'" + script_setup.footer.signText[lang] + "',alignment:['fill','center']},\
                        helpbtn:Button{text:'" + script_setup.footer.helpbtn[lang] + "',maximumSize:[30,20],alignment:['right','center'] }\
                    }\
            }";
            win.grp = win.add(res);

            win.layout.layout(true);
            win.grp.minimumSize = win.grp.size;
            win.onResizing = win.onResize = function() {
                this.layout.resize();
            }

            win.grp.pnl1.g.overshootForPath.onClick = function() {
                overShootForPath();
            };
            win.grp.pnl1.g.bouncebackForPath.onClick = function() {
                bounceBackForPath();
            };
            win.grp.pnl2.g.overshoot.onClick = function() {
                overShoot();
            };
            win.grp.pnl2.g.bounceback.onClick = function() {
                bounceBack();
            };
            win.grp.footer.helpbtn.onClick = function() {
                alert(script_setup.about[lang]);
            }
        }
        return win;
    };
    var win = buildUI(thisObj);
    if (win !== null) {
        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.resize();
            win.layout.layout(true);
        }
    }

    /* General functions from createNullsfrompath.jsx*/
    function getActiveComp() {
        var theComp = app.project.activeItem;
        if (theComp == undefined) {
            var errorMsg = localize("$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.");
            alert(errorMsg);
            return null
        }
        return theComp
    }

    function getSelectedLayers(targetComp) {
        var targetLayers = targetComp.selectedLayers;
        return targetLayers
    }

    function createNull(targetComp) {
        return targetComp.layers.addNull();
    }

    function getSelectedProperties(targetLayer) {
        var props = targetLayer.selectedProperties;
        if (props.length < 1) {
            return null
        }
        return props
    }

    function forEachLayer(targetLayerArray, doSomething) {
        for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
        }
    }

    function forEachProperty(targetProps, doSomething) {
        for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
        }
    }

    function forEachEffect(targetLayer, doSomething) {
        for (var i = 1, ii = targetLayer.property("ADBE Effect Parade").numProperties; i <= ii; i++) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
        }
    }

    function matchMatchName(targetEffect, matchNameString) {
        if (targetEffect != null && targetEffect.matchName === matchNameString) {
            return targetEffect
        } else {
            return null
        }
    }

    function getPropPath(currentProp, pathHierarchy) {
        var pathPath = "";
        while (currentProp.parentProperty !== null) {

            if ((currentProp.parentProperty.propertyType === PropertyType.INDEXED_GROUP)) {
                pathHierarchy.unshift(currentProp.propertyIndex);
                pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
                pathPath = "(\"" + currentProp.matchName.toString() + "\")" + pathPath;
            }

            // Traverse up the property tree
            currentProp = currentProp.parentProperty;
        }
        return pathPath
    }

    function getPathPoints(path) {
        return path.value.vertices;
    }


    function forEachPath(doSomething) {

        var comp = getActiveComp();

        if (comp == null) {
            return
        };

        var selectedLayers = getSelectedLayers(comp);
        if (selectedLayers == null) {
            return
        }

        // First store the set of selected paths
        var selectedPaths = [];
        var parentLayers = [];
        forEachLayer(selectedLayers, function(selectedLayer) {

            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
                return
            }

            forEachProperty(paths, function(path) {
                var isShapePath = matchMatchName(path, "ADBE Vector Shape");
                var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
                // var isPaintPath = matchMatchName(path,"ADBE Paint Shape"); //Paint and roto strokes not yet supported in scripting
                if (isShapePath != null || isMaskPath != null) {
                    selectedPaths.push(path);
                    parentLayers.push(selectedLayer);
                }
            });
        });

        // Then operate on the selection
        if (selectedPaths.length == 0) {
            var pathError = localize("$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.");

            alert(pathError);
            return
        }

        for (var p = 0, pl = selectedPaths.length; p < pl; p++) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
        }

    }
    /* end General functions */

    function forPropertiesWithoutPath(doSomething) {
        var selectError = {
            'cn': '请不要选择非数字/非坐标类型属性。',
            'en': ' Pls select property with number.'
        };

        var comp = getActiveComp();

        if (comp == null) {
            return
        };

        var selectedLayers = getSelectedLayers(comp);
        if (selectedLayers.length == 0) {
            var layerError = {
                'cn': "没有选中任何属性",
                'en': "Pls select any property"
            }
            alert(layerError[lang]);
            return
        }

        // First store the set of selected paths
        var selectedProperties = [];
        var parentLayers = [];
        forEachLayer(selectedLayers, function(selectedLayer) {

            var properties = getSelectedProperties(selectedLayer);
            if (properties == null) {
                return
            }

            forEachProperty(properties, function(prop) {
                try {
                    var isNumbers = prop.value.toString().match(/\d/g) != null;
                    // var isPaintPath = matchMatchName(path,"ADBE Paint Shape"); //Paint and roto strokes not yet supported in scripting
                    if (isNumbers == true) {
                        selectedProperties.push(prop);
                        parentLayers.push(selectedLayer);
                    }
                } catch (err) {
                    alert(selectError[lang]);
                    return;
                }
            });
        });

        // Then operate on the selection
        if (selectedProperties.length == 0) {

            alert(selectError[lang]);
            return
        }

        for (var p = 0, pl = selectedProperties.length; p < pl; p++) {
            doSomething(comp, parentLayers[p], selectedProperties[p]);
        }

    }

    function mainFn(doSomething, undoGroupName, ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionAfter, expressionComments) {

        var undoGroup = undoGroupName;

        app.beginUndoGroup(undoGroup);

        doSomething(main(ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionAfter, expressionComments))
        app.endUndoGroup();
    }

    function main(ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionAfter, expressionComments) {
        return function(comp, selectedLayer, prop) {
            var propHierarchy = [];
            var propPath = getPropPath(prop, propHierarchy);
            // alert(propPath);
            // var pathPoints = getPathPoints(prop);
            // var propRecordName = selectedLayer.name + ": " + path.parentProperty.name + " [" + pathHierarchy.join(".") + "]";
            var propRecordName = propHierarchy.join("_") + "_" + prop.parentProperty.name + "_" + prop.name;

            var ctrlerSet = {},
                ctrlerSetArr = [];
            var setname = '';
            for (var i = 0; i < ctrlerSetupKeys.length; i++) {
                setname = String(propRecordName + '_[ ' + ctrlerSetup[ctrlerSetupKeys[i]][lang] + ' ]');
                ctrlerSetArr.push(setname + '');
                ctrlerSet[setname] = ctrlerSetupKeys[i];
            }
            // Get any existing Layer Control effects


            var existingEffects = [];
            forEachEffect(selectedLayer, function(targetEffect) {
                var ctrlEffectNamesArr = ["ADBE Point3D Control", "ADBE Angle Control", "ADBE Checkbox Control", "ADBE Color Control", "ADBE Dropdown Control", "ADBE Layer Control", "ADBE Point Control", "ADBE Slider Control"]
                for (var i = 0, ii = ctrlEffectNamesArr.length; i < ii; i++) {
                    if (matchMatchName(targetEffect, ctrlEffectNamesArr[i]) != null) {
                        existingEffects.push(targetEffect.name);
                    }
                }
            });
            // Add new layer control effects 
            for (var n = 0, nl = ctrlerSetArr.length; n < nl; n++) {
                if (existingEffects.join("|").indexOf(ctrlerSetArr[n]) != -1) {
                    selectedLayer.property("ADBE Effect Parade")(ctrlerSetArr[n]).property(ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['type'] + "-0001").setValue(ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['value']);
                } else {
                    var newControl = selectedLayer.property("ADBE Effect Parade").addProperty(ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['type']);
                    newControl.name = ctrlerSetArr[n];
                    newControl.property(ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['type'] + "-0001").setValue(ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['value']);
                    newControl.property(ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['type'] + "-0001").expression = '/*' +
                        ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['expressionComments'] + '*/\n' +
                        ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['expression'];
                }
            }
            // add property expression 
            var expVarText = expressionBefore;
            for (var n = 0, nl = ctrlerSetArr.length; n < nl; n++) {
                expVarText = expVarText + 'var ' + ctrlerSet[ctrlerSetArr[n]] + ' = ' +
                    "effect(\"" + ctrlerSetArr[n] + "\")(\"" + ctrlerSetup[ctrlerSet[ctrlerSetArr[n]]]['type'] + "-0001\"); \n";
            }
            prop.expression = expVarText + '\n' + expressionAfter + expressionComments;
        }
    }

    function overShootForPath() {

        var undoGroupName = 'overShootForPath';
        var ctrlerSetup = {
            'freq': {
                'en': 'freq',
                'cn': '频率',
                'value': 3,
                'expressionComments': '默认为 3 ，可自行调节',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'decay': {
                'en': 'decay',
                'cn': '衰减',
                'value': 5,
                'expressionComments': '默认为 5 ，可自行调节',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'deltaT': {
                'en': 'deltaTime',
                'cn': '取样时间',
                'value': 0.001,
                'expressionComments': '默认为 0.001 ，如需调整，请使用一个很小的数，并相应调整夸张系数',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'k': {
                'en': 'k',
                'cn': '夸张系数',
                'value': 1000,
                'expressionComments': '默认为 取样时间 的倒数 ，如需调整，请使用数量级接近的数',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'easeK': {
                'en': 'easeK',
                'cn': '平滑系数',
                'value': 100,
                'expressionComments': '默认为 100 ，表达式计算后为 1 ，数字越小越不平滑，数字越大越平滑',
                'expression': 'value/100;',
                'type': 'ADBE Slider Control'
            },
            'easeBoo': {
                'en': 'easeBoo',
                'cn': '平滑开关',
                'value': true,
                'expressionComments': '默认为 true ，请根据需要调整',
                'expression': 'value;',
                'type': 'ADBE Checkbox Control'
            }
        };
        var ctrlerSetupKeys = ['freq', 'decay', 'deltaT', 'k', 'easeK', 'easeBoo'];
        var expressionBefore = '/* overShootForPath.jsx by leizingyiu. Mathematical principles from Dan Ebberts.  */';
        var expressionMain = 'var path = thisProperty;\nfunction processPathAttrForOvershoot(path, time, freq, decay, deltaT, k, easeK, easeBoo, targetFunc) {\n var n = 0;\n if (path.numKeys > 0) {\n n = path.nearestKey(time).index;\n n = path.key(n).time > time ? n - 1 : n;\n } else {\n return path[targetFunc];\n }\n if (n > 0) {\n var t = time - path.key(n).time;\n var w = freq * Math.PI * 2;\n var delta = (Math.sin(t * w) / Math.exp(decay * t) / w) * k;\n var target = [], targetK, targetk, targetNow, targetAmp;\n targetK = path[targetFunc](path.key(n).time);\n targetk = path[targetFunc](path.key(n).time - deltaT)\n targetNow = path[targetFunc](time);\n for (let j = 0; j < targetNow.length; j++) {\n targetAmp = targetK[j] - targetk[j];\n target[j] = targetNow[j] + targetAmp * delta;\n if (path.numKeys > 2 && n < path.numKeys && n > 1 && easeBoo) {\n T = typeof T == \"undefined\" ? path.key(n + 1).time - path.key(n).time : T;\n t2 = typeof t2 == \"undefined\" ? Math.pow(t / T, easeK) : t2;\n target[j] = ease(t2, 0, 1, target[j], targetNow[j]);\n }\n }\n } else {\n return path[targetFunc];\n };\n return target;\n};\nvar p = processPathAttrForOvershoot(path, time, freq, decay, deltaT, k, easeK, easeBoo, \"points\");\nvar i = processPathAttrForOvershoot(path, time, freq, decay, deltaT, k, easeK, easeBoo, \"inTangents\");\nvar o = processPathAttrForOvershoot(path, time, freq, decay, deltaT, k, easeK, easeBoo, \"outTangents\");\ncreatePath(p, i, o, path.isClosed());';
        var expressionComments = '\n/* by leizingyiu https://leizingyiu.github.io/AfterEffectsExpressions/expressions/overShootForPath.js*/\n/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */\n/*转载须署名，请保留此页面原始链接*/\n/*"Created": "2021/05/10 13:03:26",\n"Last modified": "2021/06/07 21:41:11",\n* freq是反弹频率\n* decay是衰减\n* 这两个值的详细解释，请查看base on 链接\n* \n* 由于路径属性无法获取velocity，\n* 所以使用deltaT作为关键帧前速度的速度取样时间\n* \n* 默认情况下，k是deltaT的倒数\n * 如果需要突出反弹效果，可以将k调大\n ** 来源：https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 */';

        mainFn(forEachPath, undoGroupName, ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionMain, expressionComments);
    }

    function bounceBackForPath() {
        var undoGroupName = 'bounceBackForPath';
        var ctrlerSetup = {
            'e': {
                'en': 'e',
                'cn': '指数底数',
                'value': 0.7,
                'expressionComments': '默认为 0.7 ，是衰减的程度，可自行调节，请尽量小于1',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'g': {
                'en': 'g',
                'cn': '重力',
                'value': 5000,
                'expressionComments': '默认为 5000 ，是重力值，可自行调节，观察变化',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'nMax': {
                'en': 'nMax',
                'cn': '最大碰撞次数',
                'value': 9,
                'expressionComments': '默认为 9 ，大量碰撞可能导致AE运行缓慢，长合成请慎用',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'deltaTime': {
                'en': 'deltaTime',
                'cn': '取样时间',
                'value': 0.001,
                'expressionComments': '默认为 0.001 ，如需调整，请使用一个很小的数',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'easeK': {
                'en': 'easeK',
                'cn': '平滑系数',
                'value': 100,
                'expressionComments': '默认为 100 ，表达式计算后为 1 ，数字越小越不平滑，数字越大越平滑',
                'expression': 'value/100;',
                'type': 'ADBE Slider Control'
            },
            'easeBoo': {
                'en': 'easeBoo',
                'cn': '平滑开关',
                'value': true,
                'expressionComments': '默认为 true ，请根据需要调整',
                'expression': 'value;',
                'type': 'ADBE Checkbox Control'
            }
        };
        var ctrlerSetupKeys = ['e', 'g', 'nMax', 'deltaTime', 'easeK', 'easeBoo'];
        var expressionBefore = '/* bounceBackForPath.jsx by leizingyiu. Mathematical principles from Dan Ebberts.  */\n\n';
        var expressionMain = 'var path = thisProperty;\nfunction operatingArr(fn) { return function () { let l = arguments[0].length; let arr = []; for (let i = 0; i < l; i++) { arr[i] = fn(...[...arguments].map(j => j[i])); } return arr; } }\nvar addArr = operatingArr((a, b) => a + b); var subArr = operatingArr((a, b) => a - b);\nconst range = (min = 0, max = 10, step = 1) => [...new Array(Math.floor((max + step - min) / step))].map((n, idx) => idx * step + min);\nfunction processPathAttrForBounceBack(path, time, e, g, nMax, deltaTime,easeK,easeBoo, targetFunc) {\n var n = 0;\n if (path.numKeys > 0) {\n n = path.nearestKey(time).index;\n n = path.key(n).time > time ? n - 1 : n;\n }\n if (n > 1) {\n var t = time - path.key(n).time;\n var nTime = path.key(n).time;\n var dTime = nTime - deltaTime;\n var targetArr = path[targetFunc](time);\n var vMapFn = (i => i.map(j => j * (0 - e) / deltaTime));\n var targetVArr = [...subArr(path[targetFunc](nTime), path[targetFunc](dTime))].map(vMapFn);\n var fn = ((arr, vArr) => (function () {\n var result;\n var vlFn = (vArr => vArr.map(v => length(v)));\n var vlArr = vlFn(vArr);\n var L = arr.length;\n var vuFn = ((vlArr, vArr) => [...range(0, L - 1, 1)].map(i => vlArr[i] > 0 ? normalize(vArr[i]) : [0, 0]));\n var vuArr = vuFn(vlArr, vArr);\n var segdurFn = (vlArr => vlArr.map(vl => 2 * vl / g));\n var segdurArr = segdurFn(vlArr);\n var vFn = (arr, vlArr, vuArr, segdurArr) => [...range(0, L - 1, 1)].map(i => (function () {\n let val = arr[i]; let vu = vuArr[i]; let vl = vlArr[i];\n let segDur = segdurArr[i]; let tNext = 0 + segDur;\n let tCur = 0; let nb = 1;\n while (tNext < t && nb <= nMax) {\n vl *= e;\n segDur *= e;\n tCur = tNext;\n tNext += segDur;\n nb++\n }\n let result;\n if (nb <= nMax) {\n delta = t - tCur;\n result = val + (vu * delta * (vl - g * delta / 2));\n } else {\n result = val;\n }\n if (path.numKeys > 2 && n < path.numKeys && n > 1 && easeBoo) {\n var T = path.key(n + 1).time - path.key(n).time;\n var t2 = Math.pow(t / T, easeK);\n result = ease(t2, 0, 1, result, val);\n }\n return result;\n })());\n result = vFn(arr, vlArr, vuArr, segdurArr);\n return result;\n })())\n var result = fn(targetArr, targetVArr);\n return result;\n } else { return path[targetFunc](time); }\n}\nvar p = processPathAttrForBounceBack(path, time, e, g, nMax, deltaTime, "points");\nvar i = processPathAttrForBounceBack(path, time, e, g, nMax, deltaTime, "inTangents");\nvar o = processPathAttrForBounceBack(path, time, e, g, nMax, deltaTime, "outTangents");\ncreatePath(p, i, o, isClosed());';
        var expressionComments = '\n/* by leizingyiu https://leizingyiu.github.io/AfterEffectsExpressions/expressions/overShootForPath.js*/ \n/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */ \n/*转载须署名，请保留此页面原始链接*/ \n \n/* \n"Created": "2021/05/10 20:23:52", \n"Last modified": "2021/06/07 21:41:53", \n*/ \n \n/**  \n * e是衰减速度，e越小，衰减越快；e越大，衰减越慢；可以理解为阻力； \n * g是每次衰减的数量，可以理解成重力； \n * nMax是反弹的最大次数； \n * deltaTime是检测碰撞前的速度取样值，假如碰撞时物体不是匀速运动，对取样范围进行调整，可能会获得不同的碰撞初速； \n * obj用来指定对某个属性进行弹性运算，默认为当前属性，可以获取其他属性使用  \n * */ \n/* 来源：https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 */';

        mainFn(forEachPath, undoGroupName, ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionMain, expressionComments);
    }

    function overShoot() {
        var undoGroupName = 'bounceBackForPath';
        var ctrlerSetup = {
            'freq': {
                'en': 'freq',
                'cn': '频率',
                'value': 3,
                'expressionComments': '默认为 3 ，可自行调节',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'decay': {
                'en': 'decay',
                'cn': '衰减',
                'value': 5,
                'expressionComments': '默认为 5 ，可自行调节',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            }
        };
        var ctrlerSetupKeys = ['freq', 'decay'];
        var expressionBefore = '/* overShoot().jsx by leizingyiu. Mathematical principles from Dan Ebberts.  */\n\n';
        var expressionMain = 'function overShoot(obj,freq,decay){obj=obj==undefined?thisProperty:obj;freq=freq==undefined?3:freq;decay=decay==undefined?5:decay;var n=0;if(obj.numKeys>0){n=obj.nearestKey(time).index;if(obj.key(n).time>time){n--}}if(n>0){t=time-obj.key(n).time;amp=obj.velocityAtTime(key(n).time-0.001);w=freq*Math.PI*2;result=obj.value+amp*(Math.sin(t*w)/Math.exp(decay*t)/w)}else{result=value};return result}\n        overShoot(thisProperty,freq,decay);';
        var expressionComments = '\n/* by leizingyiu https://leizingyiu.github.io/AfterEffectsExpressions/expressions/overShoot().js */ \n/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */ \n/*转载须署名，请保留此页面原始链接*/ \n \n/* \n"Created": "2021/05/10 20:23:52", \n"Last modified": "2021/06/07 21:41:53", \n*/ \n \n/**  \n * e是衰减速度，e越小，衰减越快；e越大，衰减越慢；可以理解为阻力； \n * g是每次衰减的数量，可以理解成重力； \n * nMax是反弹的最大次数； \n * deltaTime是检测碰撞前的速度取样值，假如碰撞时物体不是匀速运动，对取样范围进行调整，可能会获得不同的碰撞初速； \n * obj用来指定对某个属性进行弹性运算，默认为当前属性，可以获取其他属性使用  \n * */ \n/* 来源：https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 */';

        mainFn(forPropertiesWithoutPath, undoGroupName, ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionMain, expressionComments);
    }

    function bounceBack() {
        var undoGroupName = 'bounceBack';
        var ctrlerSetup = {
            'e': {
                'en': 'e',
                'cn': '指数底数',
                'value': 0.7,
                'expressionComments': '默认为 0.7 ，是衰减的程度，可自行调节，请尽量小于1',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'g': {
                'en': 'g',
                'cn': '重力',
                'value': 5000,
                'expressionComments': '默认为 5000 ，是重力值，可自行调节，观察变化',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            },
            'nMax': {
                'en': 'nMax',
                'cn': '最大碰撞次数',
                'value': 9,
                'expressionComments': '默认为 9 ，大量碰撞可能导致AE运行缓慢，长合成请慎用',
                'expression': 'value;',
                'type': 'ADBE Slider Control'
            }
        };
        var ctrlerSetupKeys = ['e', 'g', 'nMax'];
        var expressionBefore = '/* bounceBack().jsx by leizingyiu. Mathematical principles from Dan Ebberts.  */\n\n';
        var expressionMain = 'function bounceBack(obj, e, g, nMax) {\n    obj = obj == undefined ? thisProperty : obj;\n    e = e == undefined ? 0.7 : e;\n    g = g == undefined ? 5000 : g;\n    nMax = nMax == undefined ? 9 : nMax;\n    n = 0;\n    if (obj.numKeys > 0) {\n        n = obj.nearestKey(time).index;\n        if (obj.key(n).time > time) {\n            n--\n        }\n    }\n    if (n > 0) {\n        t = time - obj.key(n).time;\n        v = -obj.velocityAtTime(obj.key(n).time - 0.001) * e;\n        vl = length(v);\n        if (obj.value instanceof Array) {\n            vu = (vl > 0) ? normalize(v) : [0, 0, 0]\n        } else {\n            vu = (v < 0) ? -1 : 1\n        }\n        tCur = 0;\n        segDur = 2 * vl / g;\n        tNext = segDur;\n        nb = 1;\n        while (tNext < t && nb <= nMax) {\n            vl *= e;\n            segDur *= e;\n            tCur = tNext;\n            tNext += segDur;\n            nb++\n        }\n        if (nb <= nMax) {\n            delta = t - tCur;\n            result = value + vu * delta * (vl - g * delta / 2)\n        } else {\n            result = obj.value\n        }\n    } else {\n        result = obj.value\n    }\n    return result;\n} \n bounceBack(thisProperty, e, g, nMax);';
        var expressionComments = '\n/* by leizingyiu https://leizingyiu.github.io/AfterEffectsExpressions/expressions/bounceBack().js*/ \n/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */ \n/*转载须署名，请保留此页面原始链接*/ \n \n/* \n"Created": "2021/05/10 20:23:52", \n"Last modified": "2021/06/07 21:41:53", \n*/ \n \n/**  \n * e是衰减速度，e越小，衰减越快；e越大，衰减越慢；可以理解为阻力； \n * g是每次衰减的数量，可以理解成重力； \n * nMax是反弹的最大次数； \n  **/ \n/* 来源：https://www.leizingyiu.net/AfterEffectsExpressions/?orginalExpressions=AE路径弹性表达式 */';

        mainFn(forPropertiesWithoutPath, undoGroupName, ctrlerSetup, ctrlerSetupKeys, expressionBefore, expressionMain, expressionComments);
    }

})(this)