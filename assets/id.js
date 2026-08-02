async function fetchJson() {

    const path = location.pathname.split('/');

    const url = 'https://api.k586.jp/article/id.php';
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    const body = {
        id: path[2]
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