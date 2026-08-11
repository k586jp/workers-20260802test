import { html, raw } from 'hono/html';
import type { Article } from '../../workers-db/src/index';

export function PageLayout(props: Article[]) {
    const count = props.length;

    let articlesHtml = '';
    if (count === 0) {
        articlesHtml = '<div><h3>[!] 記事がありません。</h3></div>';
    } else if (!props[0].content_md) {
        articlesHtml = '<div><h6>1970-01-01 00:00:00</h6><h1><a href="/article/">新着記事一覧</a></h1><ul>';
        for (let i = 0; i < count; i++) {
            articlesHtml += `<li><a href="/article/${props[i].id}">[${props[i].created_at}] ${props[i].title}</a></li>`;
        }
        articlesHtml += '</ul></div>';
    } else {
        for (let i = 0; i < count; i++) {
            articlesHtml += `<div><h6>${props[i].created_at}</h6><h1><a href="/article/${props[i].id}">${props[i].title}</a></h1>${props[i].content_html}</div>`;
        }
    }

    let title = '';
    if (count === 0) {
        title = '[!] 記事がありません。 | k586.jp';
    } else if (count === 1 && props[0].content_md) {
        title = props[0].title + ' | k586.jp';
    } else {
        title = 'k586.jp';
    }

    return html
`<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="author" content="k586">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta name="format-detection" content="telephone=no,email=no,address=no">
        <meta name="description" content="趣味のサイト。ウェブ、音楽、漫画の話など。">
        <meta property="og:title" content="k586.jp">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://k586.jp/">
        <meta property="og:locale" content="ja_JP">
        <meta http-equiv="content-security-policy" content="script-src 'self' *.cloudflare.com *.cloudflareinsights.com *.jsdelivr.net">
        <title>${title}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.9.0/github-markdown.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-okaidia.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/plugins/line-numbers/prism-line-numbers.min.css">
        <link rel="stylesheet" href="/common.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/prism.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-typescript.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mermaid-js/tiny@11.12.0/dist/mermaid.tiny.min.js"></script>
    </head>
    <body class="markdown-body">
        <div>
            <header>
                <a href="https://k586.jp">k586.jp</a>
            </header>
            <main id="main">${raw(articlesHtml)}</main>
            <footer>
                <div>
                    <h2>プロフィール</h2>
                    <h3>外部記事</h3>
                    <ul>
                        <li>Zenn<br><a href="https://zenn.dev/k586">https://zenn.dev/k586</a></li>
                    </ul>
                    <h3>SNS</h3>
                    <ul>
                        <li>Twitter (X)<br><a href="https://twitter.com/k586">https://twitter.com/k586</a></li>
                        <li>Bluesky<br><a href="https://bsky.app/profile/k586.jp">https://bsky.app/profile/k586.jp</a></li>
                        <li>くるっぷ (未使用)<br><a href="https://crepu.net/user/k586">https://crepu.net/user/k586</a></li>
                        <li>マストドンJP (未使用)<br><a href="https://mstdn.jp/@586">https://mstdn.jp/@586</a></li>
                        <li>Pawoo (未使用)<br><a href="https://pawoo.net/@586">https://pawoo.net/@586</a></li>
                    </ul>
                    <h3>連絡先</h3>
                    <ul>
                        <li>mail(a)k586.jp</li>
                    </ul>
                </div>
                <hr>
                <p><a href="https://k586.jp">© 2004-2026 k586.jp</a></p>
            </footer>
        </div>
        <script src="/common.js"></script>
    </body>
</html>`;
}

export function EditPageLayout(props: Article) {
    return html
`<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="author" content="k586">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta name="format-detection" content="telephone=no,email=no,address=no">
        <meta name="description" content="趣味のサイト。ウェブ、音楽、漫画の話など。">
        <meta property="og:title" content="k586.jp">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://k586.jp/">
        <meta property="og:locale" content="ja_JP">
        <meta http-equiv="content-security-policy" content="script-src 'self' *.cloudflare.com *.cloudflareinsights.com *.jsdelivr.net">
        <title>記事の編集</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.9.0/github-markdown.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-okaidia.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/plugins/line-numbers/prism-line-numbers.min.css">
        <link rel="stylesheet" href="/common.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/prism.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-typescript.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mermaid-js/tiny@11.12.0/dist/mermaid.tiny.min.js"></script>
    </head>
    <body class="markdown-body">
        <div>
            <header>
                <a href="https://k586.jp">k586.jp</a>
            </header>
            <main id="main">
                <div>
                    <form action="/article/${props.id}/edit" method="POST">
                        <p>
                            <label for="id">記事 ID: </label>
                            <input type="text" name="id" id="id" size="100" value="${props.id}">
                        </p>
                        <p>
                            <label for="title">記事タイトル: </label>
                            <input type="text" name="title" id="title" size="100" value="${props.title}">
                        </p>
                        <p>
                            <label for="content_md">本文 (Markdown が使えます) : </label><br>
                            <textarea name="content_md" id="content_md" rows="40" cols="120">${props.content_md}</textarea>
                        </p>
                        <p>
                            <button type="submit">投稿</button>
                        </p>
                    </form>
                </div>
            </main>
            <footer>
                <hr>
                <p><a href="https://k586.jp">© 2004-2026 k586.jp</a></p>
            </footer>
        </div>
        <script src="/common.js"></script>
    </body>
</html>`;
}
