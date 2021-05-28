import useSWR from 'swr';

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
  .then(r => r.json())
}

function useMySWR(input: string, init?: RequestInit){
  const { data, error, ...args} = useSWR([input, init], fetcher);
  return {
    data,
    error,
    isError: error,
    isLoading: !error && !data,
    ...args
  };
}
