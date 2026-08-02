async function fetchJson() {

    const list_url = 'https://api.k586.jp/article/';
    const list_request = {
        method: 'POST'
    };
    const list_response = await fetch(list_url, list_request);
    const list_json = await list_response.json();

    const list_length = list_json.length;
    const list_array = [];
    for (let i = 0; i < list_length; i++) {

        const article = list_json[i];
        list_array.push('- <a href="/article/' + article.id + '">[' + article.created_at + '] ' + article.title + '</a>');

    }
    const list = list_array.join('\n');

    return [ { created_at: '1970-01-01 00:00:00', title: '新着日記', text: list, id: '' } ];

}