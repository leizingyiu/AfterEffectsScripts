/**
Last modified: "2021/10/04 16:09:04"
 */
//console.log('run detail script');
console.log = function () { return void 0; }

var searchJson = JSON.parse('{"' + String(decodeURIComponent(window.location.search).match(/(?<=\?).*/g)).replace(/&/g, '","').replace(/=/g, '":"').replace(/^null$/, 'lang":"cn') + '"}')
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
    }
}
console.log(detail, version);




document.querySelector('#lang [data-lang=' + lang + ']').classList.add('active');
[...document.querySelectorAll('#lang [data-lang]')].map(function (dom) {
    dom.addEventListener('click', function (e) {
        searchJson.lang = this.getAttribute('data-lang');
        window.location = window.location.origin + window.location.pathname + '?' + jsonToSearch(searchJson);
    }, false);
})



getDescribe(detail, version);
getMd(detail, version, lang);

function getDescribe(name, version = '') {
    // console.log(name);
    if (version == '') {
        fetch(rootPath + '\\' + name + '\\item.json')
            .then(response => response.ok == true ? response.json() : '')
            .then(function (json) {
                if (json == '') { return json };

                document.title = json.scriptDescribe.h1 + " | After Effects Scripts by LeiZingyiu";
                var dl = document.createElement('dl');
                dl.className = 'scriptDescribe panel';
                dl.innerHTML = `<dt>
                                <h1>`+ json.scriptDescribe.h1 + `</h1>
                                <div>
                                    <p> <span>`+ json.scriptDescribe.span[lang] + `</span></p>
                                    <a class="download" href="javascript:void 0;">download</a>
                                </div>
                            </dt>
                            <dd><img src='`+ json.scriptDescribe.img + `' /></dd>
                            <a onclick='window.history.go(-1)' style='cursor:pointer;font-size:1.5rem;font-weight:200;text-decoration:underline'> ⬅️ back</a>
                            `;
                document.getElementById('item').appendChild(dl);
                return json;
            })
            .then(mainSetting)
    } else {
        fetch(rootPath + '\\' + name + '\\item.json')
            .then(response => response.ok == true ? response.json() : '')
            .then(function (json) {
                if (json == '') { return json };

                var scriptVersion = json.scriptVersions.map(ver => ver.h1 == version ? ver : false).filter(Boolean);
                scriptVersion = scriptVersion.length >= 1 ? scriptVersion[0] : '';
                //                if (scriptVersion == '') { window.location = rootPath + ''; }

                console.log(scriptVersion);

                var dl = document.createElement('dl');
                dl.className = 'scriptDescribe panel';
                dl.innerHTML = `<dt>
                                <h1>`+ scriptVersion.h1 + `</h1>
                                <div>
                                    <p> <span>`+ scriptVersion.span[lang] + `</span></p>
                                    <a class="download" href="javascript:void 0;">download</a>
                                </div>
                            </dt>
                            <dd><img src='`+ scriptVersion.img + `' /></dd>
                            <a onclick='window.history.go(-1)' style='cursor:pointer;font-size:2rem;font-weight:200;text-decoration:underline'> ⬅️ back</a>
                            `;
                document.getElementById('item').appendChild(dl);
                return json;
            })
            .then(mainSetting)
    }
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
            }
        })
        .then(function (txt) {
            document.getElementById('content').innerHTML = marked(txt);
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
            padding: 1em;'>💾`+ (lang == 'cn' ? ' 立 即 下 载 ' : 'download') + `</a>`
            document.getElementById('content').appendChild(downloadBlock);
        })
}









function mainSetting() {
    var downloadClick = false;

    [...document.querySelectorAll('.download')].map(function (dom) {

        var itemInfo = getItemInfo(dom, 'download', 'downloadList.json', true);
        var itemName = itemInfo.itemName,
            itemVersion = itemInfo.itemVersion,
            itemDownloadPath = itemInfo.itemTargetPath;

        //console.log(itemName, itemVersion, itemDownloadPath);

        dom.addEventListener('click', function (e) {
            downloadClick = true;
            console.log('click download');

            // console.log(e);
            // console.log(this);
            // console.log([itemName, itemVersion, itemDownloadPath]);
            // console.log('______');

            console.log(itemDownloadPath + 'downloadList.json');

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