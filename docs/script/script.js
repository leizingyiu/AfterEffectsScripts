/**
Last modified: "2021/10/10 12:50:53"
 */
// console.log('main script');
//console.warn = () => { };
//console.log = function () { return void 0; }

var searchJson = JSON.parse('{"' + String(decodeURIComponent(window.location.search).match(/(?<=\?).*/g)).replace(/&/g, '","').replace(/=/g, '":"').replace(/^null$/, 'lang":"cn') + '"}')

const jsonToSearch = json => JSON.stringify(json).replace(/(^\{)|(\}$)/g, '').replace(/['"]/g, '').replace(/:/g, '=').replace(/,/g, '&');

var lang = Object.keys(searchJson).indexOf('lang') != -1 ? searchJson.lang : 'cn';
var rootPath = (location.origin + location.pathname).replace(/\/[^/]*$/g, '/');

document.querySelector('#lang [data-lang=' + lang + ']').classList.add('active');
[...document.querySelectorAll('#lang [data-lang]')].map(function (dom) {
    dom.addEventListener('click', function (e) {
        searchJson.lang = this.getAttribute('data-lang');
        window.location = window.location.origin + window.location.pathname + '?' + jsonToSearch(searchJson);
    }, false);
})

var langText = {
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
    }
}




// 选择需要观察变动的节点
const targetNode = document.querySelector('body');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            //console.log('A child node has been added or removed.');

            mainSetting();

        }
        else if (mutation.type === 'attributes') {
            // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }

    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);


loadItems();

function loadItems() {

    fetch(rootPath + '\\items.json')
        .then(response => response.json())
        .then(json => getItems(json))
        .then(function () {
            //mainSetting();

            console.log('last step of loadItems');
        })
}


async function getItems(json) {

    let items = json.items.map(async (item, index) => {
        await new Promise((resolve, reject) => {
            getItem(item)
        });
    })
    // items[items.length] = await new Promise((resolve, reject) => {
    //     mainSetting();
    // })
    await Promise.all(items)
    //.then(mainSetting);

    //            json.items.map(item => getItem(item));

    return json;
}

async function getItem(name) {
    console.log('getItem: ' + name);
    console.log(rootPath + '\\' + name + '\\item.json');

    console.trace()

    fetch(rootPath + '\\' + name + '\\item.json')
        .then(response => response.ok == true ? response.json() : '')
        .then(function (json) {
            if (json == '') { return json };

            var li = document.createElement('li');
            var downloadTargetName = Object.keys(json.scriptDescribe).indexOf('download') != -1 ? Object.keys(json.scriptDescribe.download)[0] : null;
            console.log(downloadTargetName);
            console.log(langText.diskName[downloadTargetName]);
            li.className = 'item';
            li.setAttribute('item', json.scriptDescribe.h1);
            li.innerHTML = `<dl class="scriptDescribe panel">
                                <dt>
                                    <h1>`+ json.scriptDescribe.h1 + `</h1>
                                    <div>
                                        <p> <span>`+ json.scriptDescribe.span[lang] + `</span> <a  class="readmore">readmore</a></p>
                                        <a class="download" `+
                (Object.keys(json.scriptDescribe).indexOf('download') != -1 ? (
                    `href="` + json.scriptDescribe.download[downloadTargetName].link + `"` +
                    ` onclick="copyStr(` +
                    `'` + json.scriptDescribe.download[downloadTargetName].copy + `',` +
                    `'` + langText.copied[lang] + `',` +
                    `'` + langText.goto[lang] + ` ` + downloadTargetName + `')" ` +
                    ` alt='` + langText.altGoto[lang] + langText.diskName[downloadTargetName][lang] + `'`
                ) : 'href="javascript:void 0;"') + `>download</a>
                                    </div>
                                </dt>
                                <dd>`+ (Object.keys(json.scriptDescribe).indexOf('img') != -1 ? (`<img src='` + json.scriptDescribe.img + `' />`) : '') + `</dd>

                            </dl>
                            <ul class="scriptVersions">
                            </ul>`;

            document.getElementById('items').appendChild(li);

            json.scriptVersions.map(function (ver) {
                var verli = document.createElement('li');
                verli.innerHTML = ` <dl class="scriptVersion panel"` + (Object.keys(ver).indexOf('date') != -1 ? (`data-date='` + ver.date + `'`) : '') + `>
                                        <dt>
                                            <h1>`+ ver.h1 + `</h1>
                                            <div>
                                                <p><span>`+ ver.span[lang] + `</span><a class="readmore">readmore</a>

                                                </p>
                                                <a class="download" `+
                    (Object.keys(ver).indexOf('download') != -1 ? (
                        `href="` + ver.download[Object.keys(ver.download)[0]].link + `"` +
                        ` onclick="copyStr(` +
                        `'` + ver.download[Object.keys(ver.download)[0]].copy + `',` +
                        `'` + langText.copied[lang] + `',` +
                        `'` + langText.goto[lang] + Object.keys(ver.download)[0] + `')" ` +
                        ` alt='` + langText.altGoto[lang] + langText.diskName[Object.keys(ver.download)[0]][lang] + `'`
                    ) : 'href="javascript:void 0;"') + `>download</a>
                                            </div>
                                        </dt>
                                        <dd>`+ (Object.keys(ver).indexOf('img') != -1 ? (`<img src='` + ver.img + `' />`) : '') + `</dd>
                                    </dl>`;
                li.querySelector('.scriptVersions').appendChild(verli);
            })
            var latestLi = document.createElement('li');
            latestLi.innerHTML = ` <dl class="scriptVersion panel" ` + (Object.keys(json.scriptDescribe.version).indexOf('date') != -1 ? (`data-date='` + json.scriptDescribe.version.date + `'`) : '') + ` >
                                <dt>
                                    <h1>latest: `+ json.scriptDescribe.version.h1 + `</h1>
                                    <div>
                                        <p><span>`+ json.scriptDescribe.version.span[lang] + `</span><a class="readmore">readmore</a>

                                        </p>
                                        `+ li.querySelector('a.download').outerHTML + `
                                    </div>
                                </dt>
                                <dd>`+ (Object.keys(json.scriptDescribe.version).indexOf('img') != -1 ? (`<img src='` + json.scriptDescribe.version.img + `' />`) : '') + `</dd>
                            </dl>`;
            li.querySelector('.scriptVersions').insertBefore(latestLi, li.querySelector('.scriptVersions').firstChild);


            return json;
        })
    //.then(mainSetting)
}




function mainSetting() {

    //console.trace()


    var downloadClick = false;
    // console.log('mainSetting start');

    // console.log(document.querySelectorAll('.scriptDescribe'));
    // console.log(document.querySelectorAll('.readmore'));
    // console.log(document.querySelectorAll('.download'));


    [...document.querySelectorAll('.scriptDescribe')].map(function (dom) {
        // console.log('map scriptDescribe');

        if (dom.getAttribute('alreadySet') == 'true') { return void 0; }

        var itemInfo = getItemInfo(dom, '', 'detail_' + lang + '.md', false);
        var itemName = itemInfo.itemName,
            itemVersion = itemInfo.itemVersion,
            itemDetailPath = itemInfo.itemTargetPath;
        //console.log(itemName, itemVersion, itemDetailPath);

        dom.addEventListener('click', function (e) {

            if (downloadClick == false) {

                console.log('click panel');
                searchJson.detail = itemName;
                window.location = rootPath + '/detail.html' + '?' + jsonToSearch(searchJson);
            } else {
                downloadClick = false;
            }
        }, false);

        dom.setAttribute('alreadySet', 'true');
    });

    [...document.querySelectorAll('.readmore')].map(function (dom) {
        // console.log('map readmore');

        if (dom.getAttribute('alreadySet') == 'true') { return void 0; }

        var itemInfo = getItemInfo(dom, '', 'detail_' + lang + '.md', true);
        var itemName = itemInfo.itemName,
            itemVersion = itemInfo.itemVersion,
            itemDetailPath = itemInfo.itemTargetPath;

        dom.addEventListener('click', function (e) {

            if (downloadClick == false) {

                console.log('click readmore');

                console.log('click panel');
                searchJson.detail = itemName;
                searchJson.version = itemVersion;
                console.log(JSON.stringify(searchJson));

                window.location = rootPath + '/detail.html' + '?' + jsonToSearch(searchJson);

            } else {
                downloadClick = false;
            }
        }, false);

        dom.setAttribute('alreadySet', 'true');
    });

    [...document.querySelectorAll('.download')].map(function (dom) {

        if (dom.getAttribute('alreadySet') == 'true') { return void 0; }

        var itemInfo = getItemInfo(dom, 'download', 'downloadList.json', true);
        var itemName = itemInfo.itemName,
            itemVersion = itemInfo.itemVersion,
            itemDownloadPath = itemInfo.itemTargetPath;

        //console.log(itemName, itemVersion, itemDownloadPath);

        dom.addEventListener('click', function (e) {
            downloadClick = true;
            //console.log('click download');

            // console.log(e);
            // console.log(this);
            // console.log([itemName, itemVersion, itemDownloadPath]);
            // console.log('______');

            if (eval(this.getAttribute('href')) != undefined) {
                window.location = this.getAttribute('href');
                return;
            }
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

    const imgHostUrl = 'pic.leizingyiu.net';
    [...document.querySelectorAll('img')].map(function (dom) {
        if (dom.getAttribute('alreadySet') == 'true') { return void 0; }

        if (rootPath.indexOf('github.io') != -1 || rootPath.indexOf('gitee.io') != -1) {
            dom.src = dom.src.replace(imgHostUrl, (location.origin + location.pathname).replace(/\/[^/]*$/g, '/') + 'pic');
        }

        dom.setAttribute('alreadySet', 'true');
    })
}

function getItemInfo(dom, targetFolderName, targetFileName, hideBoo) {

    //console.trace()

    let parDom = dom;
    let itemVersion = 'latest';

    while (parDom.classList.value.indexOf('item') == -1) {
        parDom = parDom.parentElement;
        if (parDom.classList.value.indexOf('scriptVersion') != -1 && itemVersion == 'latest') {
            itemVersion = parDom.querySelector('h1').innerText;
        }
        if (parDom.localName == 'body') {
            break;
        }
    }


    //console.log(domOrigin, dom);
    var itemName = parDom.querySelector('.scriptDescribe h1').innerText;

    itemVersion = itemVersion.indexOf('latest') != -1 ? 'latest' : itemVersion;

    var itemTargetPath = rootPath + '/' + (itemName + '/') + (itemVersion.indexOf('latest') != -1 ? '' : 'versions/' + itemVersion + '/') + (targetFolderName == '' ? '' : targetFolderName + '/');

    console.log(itemVersion, itemTargetPath);

    var result = { "itemName": itemName, "itemVersion": itemVersion, "itemTargetPath": itemTargetPath };


    try {
        if (targetFolderName == 'download' && eval(parDom.querySelector('.download').innerText) != undefined) {
            return result;
        } else {
            fetch(itemTargetPath + targetFileName)
                .then(function (response) {
                    if (!response.ok && hideBoo) {
                        dom.parentElement.removeChild(dom);
                    }
                });
        }
    } catch (err) { void 0; }

    //console.log(itemName, itemVersion, itemTargetPath);

    return result;
}




function copyStr(copyStr, checkStr = '内容已复制到剪贴板', alertStr = "") {
    var a = document.createElement("textarea");
    a.value = copyStr;
    document.body.appendChild(a);
    a.select();
    document.execCommand("Copy");
    a.className = "oInput";
    a.style.display = "none";
    alert(copyStr + ' <= ' + checkStr + " \n" + alertStr)
}