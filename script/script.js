// console.log('main script');
//console.warn = () => { };

var searchJson = JSON.parse('{"' + String(decodeURIComponent(window.location.search).match(/(?<=\?).*/g)).replace(/&/g, '","').replace(/=/g, '":"').replace(/^null$/, 'lang":"cn') + '"}')
const jsonToSearch = json => JSON.stringify(json).replace(/(^\{)|(\}$)/g, '').replace(/['"]/g, '').replace(/:/g, '=').replace(/,/g, '&');
var lang = Object.keys(searchJson).indexOf('lang') != -1 ? searchJson.lang : 'cn';


document.querySelector('#lang [data-lang=' + lang + ']').classList.add('active');
[...document.querySelectorAll('#lang [data-lang]')].map(function (dom) {
    dom.addEventListener('click', function (e) {
        searchJson.lang = this.getAttribute('data-lang');
        window.location = window.location.origin + window.location.pathname + '?' + jsonToSearch(searchJson);
    }, false);
})






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

    fetch('..\\items.json')
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

    console.trace()

    fetch('..\\' + name + '\\item.json')
        .then(response => response.ok == true ? response.json() : '')
        .then(function (json) {
            if (json == '') { return json };

            var li = document.createElement('li');
            li.className = 'item';
            li.setAttribute('item', json.scriptDescribe.h1);
            li.innerHTML = `<dl class="scriptDescribe panel">
                                <dt>
                                    <h1>`+ json.scriptDescribe.h1 + `</h1>
                                    <div>
                                        <p> <span>`+ json.scriptDescribe.span[lang] + `</span> <a  class="readmore">readmore</a></p>
                                        <a class="download" href="javascript:void 0;">download</a>
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
                                                <a class="download" href="javascript:void 0 ;">download</a>
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
                                        <a class="download" href="javascript:void 0 ;">download</a>
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
                window.location = window.location.origin + '/detail.html' + '?' + jsonToSearch(searchJson);
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

                window.location = window.location.origin + '/detail.html' + '?' + jsonToSearch(searchJson);

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
            console.log('click download');

            // console.log(e);
            // console.log(this);
            // console.log([itemName, itemVersion, itemDownloadPath]);
            // console.log('______');


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

    var itemTargetPath = '../' + (itemName + '/') + (itemVersion.indexOf('latest') != -1 ? '' : 'versions/' + itemVersion + '/') + (targetFolderName == '' ? '' : targetFolderName + '/');

    console.log(itemVersion, itemTargetPath);




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



