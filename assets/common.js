/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {

    const mainContents = document.getElementById('main');
    const df = await makeDocumentFragment();
    mainContents.textContent = '';
    mainContents.appendChild(df);

    Prism.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'dark' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));

}
main().catch(console.error);

/* ################################################################ */

/**
 * メインコンテンツの DocumentFragment を生成
 * @returns {Promise<DocumentFragment>}
 */
async function makeDocumentFragment() {

    const df = document.createDocumentFragment();
    const jsonArray = await fetchJson();
    const length = jsonArray.length;

    for (let i = 0; i < length; i++) {

        marked.use({ renderer: { code: appendClass } });
        marked.setOptions({ gfm: true, breaks: true });

        const id = jsonArray[i].id;
        const title = jsonArray[i].title;
        const date = jsonArray[i].created_at;
        const text = jsonArray[i].text;

        if (i === 0 && length === 1 && id.length > 0) {
            document.title = title + ' | k586.jp';
        }

        const doc = document.createElement('div');
        doc.innerHTML = '<h6>' + date + '</h6><h1><a href="/article/' + id + '">' + title + '</a></h1>' + DOMPurify.sanitize(marked.parse(text));
        df.appendChild(doc);

    }

    if (length === 0) {
        const doc = document.createElement('div');
        doc.innerHTML = '<h3>[!] 記事がありません。</h3>';
        df.appendChild(doc);
    }

    return df;

}

/**
 * イベントリスナーを Promise 化
 * @param eventTarget イベントのターゲット
 * @param eventName イベントの種類
 * @returns {Promise<unknown>} イベント
 */
function addEventListenerPromise(eventTarget, eventName) {

    return new Promise(function (resolve) {
        eventTarget.addEventListener(eventName, function (event) { resolve(event); }, false);
    });

}

/**
 * コードエリアへ Class を追加
 * @param code コードの種類
 * @returns {string} 変換後の HTML
 */
function appendClass(code) {

    if (code.lang === 'mermaid' || code.lang === 'Mermaid') {
        return '<pre class="language-mermaid">' + code.text + '</pre>';
    } else {
        return '<pre><code class="language-' + code.lang + ' line-numbers">' + code.text + '</code></pre>';
    }

}