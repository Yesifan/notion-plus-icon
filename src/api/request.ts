interface Request extends Omit<RequestInit, 'body'>{
  body?: BodyInit | any;
}

export function fetcher<Res>(input: string, init?: Request):Promise<Res>{
  if(init){
  let { body, headers, ...options } = init;
    const _headers = {
      'content-type': 'application/json',
      ...(headers ? headers : {})
    }
    const _body = _headers['content-type'] === 'application/json' ? JSON.stringify(body) : body
    init = {
      body: _body,
      headers: _headers,
      ...options
    }
  }

  return fetch(input, init as RequestInit)
  .then(r => {
    const isJSON = r.headers.get('content-type')?.includes('json');
    if(isJSON) return r.json();
    else return r;
  })
}
