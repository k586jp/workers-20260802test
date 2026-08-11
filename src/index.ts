import { Hono, Context as c } from 'hono';
import { PageLayout, EditPageLayout } from './html';
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
    page.post('/article/:id/edit', articleUpdPost);

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
    const json: Article = await context.env.K586_ARTICLES.getArticleEditMode(id);
    return context.html(EditPageLayout(json));
}

async function articleUpdPost(context: c) {
    const id = context.req.param('id');
    const body = await context.req.parseBody();
    let article: Article = {
        id: id,
        is_public: true,
        title: String(body.title || ''),
        content_md: String(body.content_md || ''),
        user_id: 'k586'
    };
    await context.env.K586_ARTICLES.updateArticle(article);
    return context.redirect('/article/' + id);
}

// ================================================================
