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


function loadItems() {

    fetch('..\\items.json')
        .then(response => response.json())
        .then(json => getItems(json))
        .then(function () {
            mainSetting();

            console.log('last step of loadItems');
        })
}
loadItems();

async function getItems(json) {

    let items = json.items.map(async (item, index) => {
        await new Promise((resolve, reject) => {
            getItem(item)
        });
    })
    items[items.length] = await new Promise((resolve, reject) => {
        mainSetting();
    })
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
                                <dd><img src='`+ json.scriptDescribe.img + `' /></dd>

                            </dl>
                            <ul class="scriptVersions">
                            </ul>`;

            document.getElementById('items').appendChild(li);

            json.scriptVersions.map(function (ver) {
                var verli = document.createElement('li');
                verli.innerHTML = ` <dl class="scriptVersion panel">
                                        <dt>
                                            <h1>`+ ver.h1 + `</h1>
                                            <div>
                                                <p><span>`+ ver.span[lang] + `</span><a class="readmore">readmore</a>

                                                </p>
                                                <a class="download" href="javascript:void 0 ;">download</a>
                                            </div>
                                        </dt>
                                        <dd>
                                            <img src="`+ ver.img + `" alt="">
                                        </dd>
                                    </dl>`;
                li.querySelector('.scriptVersions').appendChild(verli);
            })
            var latestLi = document.createElement('li');
            latestLi.innerHTML = ` <dl class="scriptVersion panel">
                                <dt>
                                    <h1>latest: `+ json.scriptDescribe.version.h1 + `</h1>
                                    <div>
                                        <p><span>`+ json.scriptDescribe.version.span[lang] + `</span><a class="readmore">readmore</a>

                                        </p>
                                        <a class="download" href="javascript:void 0 ;">download</a>
                                    </div>
                                </dt>
                                <dd>
                                    <img src="`+ json.scriptDescribe.version.img + `" alt="">
                                </dd>
                            </dl>`;
            li.querySelector('.scriptVersions').insertBefore(latestLi, li.querySelector('.scriptVersions').firstChild);

            return json;
        })
    //.then(mainSetting)
}

// async function getItem(name) {
//     let response = await fetch('..\\' + name + '\\item.json');
//     if (response.status >= 200 && response.status < 300) {
//         return await response.text();
//     } else {
//         throw new Error(response.status);
//     }
// }

function mainSetting() {

    console.trace()


    var downloadClick = false;
    // console.log('mainSetting start');

    // console.log(document.querySelectorAll('.scriptDescribe'));
    // console.log(document.querySelectorAll('.readmore'));
    // console.log(document.querySelectorAll('.download'));


    [...document.querySelectorAll('.scriptDescribe')].map(function (dom) {
        // console.log('map scriptDescribe');

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
    });

    [...document.querySelectorAll('.readmore')].map(function (dom) {
        // console.log('map readmore');

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
    });

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

    console.trace()

    let domOrigin = dom;
    let itemVersion = 'latest';
    while (dom.classList.value.indexOf('item') == -1) {
        dom = dom.parentElement;
        if (dom.classList.value.indexOf('scriptVersion') != -1) {
            itemVersion = dom.querySelector('h1').innerText;
        }
        if (dom.localName == 'body') {
            break;
        }
    }


    //console.log(domOrigin, dom);
    var itemName = dom.querySelector('.scriptDescribe h1').innerText;

    var itemTargetPath = '../' + itemName + (itemVersion == 'latest' ? '' : '/versions/' + itemVersion) + '/' + targetFolderName + '/';

    dom = domOrigin;

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



