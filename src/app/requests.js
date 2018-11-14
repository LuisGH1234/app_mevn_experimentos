const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function getProps(props) {
    let retu = {};
    retu.method = props.method || 'GET';
    if (props.method != 'GET') {
        retu.headers = headers;
        retu.body = JSON.stringify(props.body || {});
    }
    return retu;
}

const request = (url, props) => {
    return fetch(url, getProps(props))
    //.then(res => res.json());
    /*.then(data => this.getPlaylists())
    .catch(err => console.log(err));*/
}

export default { request };