/**
Last modified: "2021/10/15 13:00:06"
 */
//console.log('run detail script');
//console.log = function () { return void 0; }
import './polyfill.min.js';

var searchJson = JSON.parse('{"' + String(decodeURIComponent(window.location.search).match(/(?:\?).*/g)).replace(/&$/, '').replace(/&/g, '","').replace(/=/g, '":"').replace(/^null$/, 'lang":"cn') + '"}')
const jsonToSearch = json => JSON.stringify(json).replace(/(^\{)|(\}$)/g, '').replace(/['"]/g, '').replace(/:/g, '=').replace(/,/g, '&');

var lang = Object.keys(searchJson).indexOf('lang') != -1 ? searchJson.lang : 'cn';
var detail = Object.keys(searchJson).indexOf('detail') != -1 ? searchJson.detail : 'index';
var version = Object.keys(searchJson).indexOf('version') != -1 ? searchJson.version : '';
version = version.indexOf('latest') != -1 ? '' : version;

var rootPath = (location.origin + location.pathname).replace(/\/[^/]*$/g, '/');
var errorText = {
    "mdError": {
        "cn": "唔好意思，揾唔到尼个页面！\n不好意思，找不到这个页面！",
        "en": "sorry,cant find this page"
    },
    "describeError": {
        "cn": "唔好意思，简介加载唔出嚟！\n不好意思，简介加载不出来！",
        "en": "sorry,cant load describe"
    }
}
//console.log(detail, version);
var langText = {
    "download": {
        "cn": " 立 即 下 载 ",
        "en": "DOWNLOAD"
    },
    "copied": {
        "cn": "内容已复制到剪贴板",
        "en": " has been copied to the clipboard"
    },
    "goto": {
        "cn": "正在前往",
        "en": "Going to "
    },
    "altGoto": {
        "cn": "点击前往 ",
        "en": "Click to go to "
    },
    "diskName": {
        "baidu": {
            "cn": "百度网盘",
            "en": "Baidu cloud disk"
        },
        "ctfile": {
            "cn": "城通网盘",
            "en": "CTDISK"
        }
    },
    "localDownload": {
        "cn": "备用下载",
        "en": "spare download"
    }
}



document.querySelector('#lang [data-lang=' + lang + ']').classList.add('active');
[...document.querySelectorAll('#lang [data-lang]')].map(function (dom) {
    dom.addEventListener('click', function (e) {
        searchJson.lang = this.getAttribute('data-lang');
        window.location = window.location.origin + window.location.pathname + '?' + jsonToSearch(searchJson);
    }, false);
})


getDescribe(detail, version);
getMd(detail, version, lang);
getDownloadDetail(detail, version, lang);

function getDescribe(name, version = '') {
    // console.log(name);

    fetch(rootPath + '\\' + name + '\\item.json')
        .then(response => response.ok == true ? response.json() : '')
        .then(function (json) {
            if (json == '') { return json };
            var target = '';

            if (version == '' || version == json.scriptDescribe.version.h1) {
                target = json.scriptDescribe
            } else {
                var target = json.scriptVersions.map(ver => ver.h1 == version ? ver : false).filter(Boolean);
                target = target.length >= 1 ? scriptVersion[0] : '';
            }

            var downloadTargetName = Object.keys(target).indexOf('download') != -1 ? Object.keys(target.download)[0] : null;

            if (target == '') {
                document.getElementById('item').innerText = errorText.describeError[lang];
                return void 0;
            }
            document.title = target.h1 + " | After Effects Scripts by LeiZingyiu";
            var dl = document.createElement('dl');
            dl.className = 'scriptDescribe panel';
            dl.innerHTML = `<dt>
                                <h1>`+ target.h1 + `</h1>
                                <div>
                                    <p> <span>`+ target.span[lang] + `</span></p>
                                    <a class="download" `+
                (Object.keys(target).indexOf('download') != -1 ? (
                    `link="` + target.download[downloadTargetName].link + `"` +
                    ` click="copyStr(` +
                    `'` + target.download[downloadTargetName].copy + `',` +
                    `'` + langText.copied[lang] + `',` +
                    `'` + langText.goto[lang] + ` ` + downloadTargetName + `')" ` +
                    ` alt='` + langText.altGoto[lang] + langText.diskName[downloadTargetName][lang] + `'`
                ) : 'link="javascript:void 0;"') + `  href="javascript:void 0;" >download</a>
                                </div>
                            </dt>
                            <dd><img src='`+ target.img + `' /></dd>
                            <a onclick='window.history.go(-1)' style='cursor:pointer;font-size:1.5rem;font-weight:200;text-decoration:underline'> ⬅️ back</a>
                            `;
            document.getElementById('item').appendChild(dl);
            return json;
        })
        .then(mainSetting)

}

function getMd(name, version = '', lang) {
    var versionPath = version == '' ? '' : '\\versions\\' + version;
    fetch(rootPath + '\\' + name + versionPath + '\\detail_' + lang + '.md')
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                document.getElementById('content').innerHTML = `<h1>` + errorText.mdError[lang] + `</h1>
                <p>`+ rootPath + '\\' + name + versionPath + '\\detail_' + lang + '.md' + `</p>`;
                return '';
            }
        })
        .then(function (txt) {
            if (txt != '') {
                document.getElementById('content').innerHTML = marked(txt);
            } else {
                return void 0;
            }
        })
}

function getDownloadDetail(name, version = '', lang) {


    function jsonPath() {
        var args = [...arguments];
        return function (obj) {
            let result = obj;
            for (let i = 0, ii = args.length; i < ii; i++) {
                result = result[args[i]];
            }
            return result;
        }
    }
    var jsonTarget = '';


    fetch(rootPath + '\\' + name + '\\item.json')
        .then(response => response.ok == true ? response.json() : '')
        .then(function (json) {
            if (json == '') { return json };
            var downloadBoo = Object.keys(json.scriptDescribe).indexOf('download') != -1 ? true : false;

            if (version == '' || version == json.scriptDescribe.version.h1) {
                jsonTarget = ["scriptDescribe"];
            } else {
                var ver = '';
                json.scriptVersions.map(function (verObj, idx) {
                    ver = verObj.h1 == version ? idx : ver;
                })
                jsonTarget = ['scriptVersions', ver]
            }
            console.log(jsonTarget);
            var downloadObj = jsonPath(...jsonTarget)(json).download;
            console.log(downloadObj);

            if (downloadBoo == false) {
                let downloadBlock = document.createElement('div');
                downloadBlock.className = 'panel';
                downloadBlock.innerHTML = `
            <a
            onclick='document.querySelector(".scriptDescribe .download").click();'
            style='
            font-size: 2em;
            display: block;
            text-align: center;
            cursor:pointer;
            '>💾`+ langText.download[lang] + `</a>`
                document.getElementById('content').appendChild(downloadBlock);
            } else {
                let downloadBlock = document.createElement('div');
                downloadBlock.className = 'panel downloadBlock';
                downloadBlock.innerHTML = `
            <b 
            style='
            font-size: 2em;
            display: block;
            text-align: center;
            '>💾`+ langText.download[lang] + `</b>`
                document.getElementById('content').appendChild(downloadBlock);

                let ul = document.createElement('ul');
                Object.keys(downloadObj).map(function (key) {
                    let li = document.createElement('li');
                    let a = document.createElement('a');
                    a.innerText = langText.altGoto[lang] + key;
                    a.click = function () {
                        copyStr(downloadObj[key].copy,
                            langText.copied[lang],
                            langText.goto[lang]);
                    };
                    a.link = downloadObj[key].link;
                    a.href = 'javascript:void 0;'
                    a.setAttribute('alt', langText.altGoto[lang] + langText.diskName[key][lang])
                    ul.appendChild(li);
                    li.appendChild(a);
                });
                let li = document.createElement('li');
                li.innerHTML = `<a class="download" href="javascript:void 0;">` + langText.localDownload[lang] + `</a>`;
                ul.appendChild(li);
                downloadBlock.appendChild(ul);
            }
        }).then(mainSetting);

}







function mainSetting() {
    var downloadClick = false;

    [...document.querySelectorAll('.download')].map(function (dom) {

        if (dom.getAttribute('alreadySet') == 'true') { return void 0; }


        var itemInfo = getItemInfo(dom, 'download', 'downloadList.json', true);
        var itemName = itemInfo.itemName,
            itemVersion = itemInfo.itemVersion,
            itemDownloadPath = itemInfo.itemTargetPath;

        //        console.log(this);
        //console.log(itemName, itemVersion, itemDownloadPath);

        dom.addEventListener('click', function (e) {
            downloadClick = true;
            console.log('click download');

            // console.log(e);
            // console.log(this);
            // console.log([itemName, itemVersion, itemDownloadPath]);
            // console.log('______');

            //console.log(itemDownloadPath + 'downloadList.json');


            if (this.getAttribute('click') != null) {
                eval(this.getAttribute('click'));
            }
            if (this.getAttribute('link') != null || (this.getAttribute('link').indexOf('http') != -1)) {
                window.location = this.getAttribute('link');
                return;
            }


            itemVersion = itemVersion == "" ? "latest" : itemVersion;
            fetch(itemDownloadPath + 'downloadList.json')
                .then(response => response.json())
                .then(json => json.map(j => ({ "name": j, "url": itemDownloadPath + j })))
                .then(json => download(json, itemName + '_' + itemVersion + '.zip'))
                .catch(err => { const mute = err });

            const download = (files, filename) => {
                /**https://www.jianshu.com/p/ee28642c4a26 */

                let zip = new JSZip();
                let folder = zip.folder('files');
                Promise.resolve().then(() => {
                    return files.reduce((accumulator, file) => {
                        return accumulator.then(() => fetch(file.url)
                            .then(resp => resp.blob())
                            .then(blob => folder.file(file.name, blob)))
                    }, Promise.resolve())
                }).then(() => {
                    folder.generateAsync({ type: "blob" })
                        .then(content => saveAs(content, filename));
                })
            }



        }, false);

        dom.setAttribute('alreadySet', 'true');
    });
}

function getItemInfo(dom, targetFolderName, targetFileName, hideBoo) {

    let domOrigin = dom;
    let itemVersion = version;
    //console.log(domOrigin, dom);
    var itemName = detail;
    var itemTargetPath = rootPath + '/' + itemName + (itemVersion == '' ? '' : '/versions/' + itemVersion) + '/' + targetFolderName + '/';

    dom = domOrigin;

    console.log(itemTargetPath + targetFileName);

    try {
        fetch(itemTargetPath + targetFileName)
            .then(function (response) {
                if (!response.ok && hideBoo) {
                    dom.parentElement.removeChild(dom);
                }
            })
    } catch (err) { void 0; }

    //console.log(itemName, itemVersion, itemTargetPath);

    return { "itemName": itemName, "itemVersion": itemVersion, "itemTargetPath": itemTargetPath };
}

function copyStr(copyStr, checkStr = '内容已复制到剪贴板', alertStr = "") {
    console.trace();
    var a = document.createElement("textarea");
    a.value = copyStr;
    document.body.appendChild(a);
    a.select();
    document.execCommand("Copy");
    a.className = "oInput";
    a.style.display = "none";
    alert(copyStr + ' <= ' + checkStr + " \n" + alertStr)
}