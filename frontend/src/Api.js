export default function makeAPIRequest (path, method, token, query, body) {
  let url = `http://localhost:5005/${path}`;
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
  }
  // if has token
  if (token !== null) {
    options.headers.Authorization = 'Bearer ' + token;
  }
  // if has query
  if (query !== null) {
    url += '/?';
    // concat query
    for (const key in query) {
      url += `${key}=${query[key]}&`;
    }
    // get rid of the last '&'
    url = url.slice(0, -1);
  }
  // if has body
  if (body !== null) {
    options.body = body;
  }
  // return fetched result
  return fetch(url, options)
    .then((res) => {
      if (res.status === 200) return res.json();
      else return Promise.reject(res);
    }).catch((err) => {
      return Promise.reject(err);
    })
}
