import { Hono, Context as c } from 'hono';
import { PageLayout } from './html';
import type { Service } from '@cloudflare/workers-types'
import type { K586Articles, Article } from '../../workers-db/src/index';

type Bindings = {
    K586_ARTICLES: Service<K586Articles>
};

function main() {

    const app = new Hono();
    const page = new Hono<{ Bindings: Bindings }>();

    page.get('/', indexHtml);
    page.get('/article/', articleListHtml);
    page.get('/article/:id', articleHtml);
    page.get('/article/:id/edit', articleEditHtml);

    app.route('/', page);

    return app;

}
export default main();

// ################################################################

async function indexHtml(context: c) {
    const json: Article[] = await context.env.K586_ARTICLES.getArticlesTitle();
    return context.html(PageLayout(json));
}

async function articleListHtml(context: c) {
    let page: number;
    if (context.req.query('p')) {
        page = Number(context.req.query('p')) || 0;
    } else {
        page = 0;
    }
    const json: Article[] = await context.env.K586_ARTICLES.getArticles(page);
    return context.html(PageLayout(json));
}

async function articleHtml(context: c) {
    const id = context.req.param('id');
    const json: Article[] = await context.env.K586_ARTICLES.getArticles(id);
    return context.html(PageLayout(json));
}

async function articleEditHtml(context: c) {
    const id = context.req.param('id');
    const json = await context.env.K586_ARTICLES.updateArticle(id);
    return context.json(json);
}

// ================================================================

async function htmlText(context: c, jsFile: string) {
    const array: Promise<string>[] = [];
    array.push(fetchURL(context, '/main.html'));
    array.push(fetchURL(context, '/bottom.html'));
    const result = await Promise.all(array);
    return result[0] + '<script src="' + jsFile + '"></script>' + result[1];
}

async function fetchURL(context: c, page: string) {
    const url = new URL(page, 'https://example.com');
    const file = await context.env.ASSETS.fetch(url);
    return await file.text();
}