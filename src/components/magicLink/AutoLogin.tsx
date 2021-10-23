import axios from 'core/axios'
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";

interface Params {
  hash: string;
}

function redeemAccessToken(hash: string) {
  return axios.post('/magic-link/generate-access-token', {hash})
}

export default function AutoLogin() {
  let { hash } = useParams<Params>()
  const history = useHistory()
  const [, setCookie] = useCookies(['accessToken'])

  useEffect(() => {
    redeemAccessToken(hash).then((data: any) => {
      setCookie('accessToken', data.accessToken, { secure: true, path: '/' })
      history.push('/')
    }).catch(() => {
      history.push('/login')
    })
  });
  
  return (
    <div>
      <h3>{hash}</h3>
    </div>
  );
}