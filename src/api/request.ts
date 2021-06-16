interface Request extends Omit<RequestInit, 'body' | 'headers'>{
  body?: BodyInit | any;
  headers?: {
    [name:string]: string
  }
}

export function fetcher<Res>(input: string, init: Request = {}):Promise<Res> {
  const requestInit = {
    ...init,
    body: init.headers?.['content-type'] ? init.body : JSON.stringify(init.body),
    headers: {
      'content-type': 'application/json',
      ...(init.headers || {}),
    },
  };

  return fetch(input, requestInit as RequestInit)
    .then((r) => {
      const isJSON = r.headers.get('content-type')?.includes('json');
      if (isJSON) return r.json();
      return r;
    });
}
