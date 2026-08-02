async function fetchJson() {

    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('p')) || 0;

    const url = 'https://api.k586.jp/article/';
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    const body = {
        details: true,
        page: page
    };
    const request = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    };
    const response = await fetch(url, request);
    const json = await response.json();

    return json;

}