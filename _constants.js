// TOD0:switch API_URL between development and production
let dev = process.env.NODE_ENV !== 'production';

export const make_url = (domain, protocol = 'http', secure = false) => {
  let reqProtocol = protocol;
  if (secure) reqProtocol = reqProtocol + 's'
  return `${reqProtocol}://${domain}`
}

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN

export const API_URL = make_url(API_DOMAIN, 'http', false);

export const GRAPHQL_ENDPOINT = `${API_URL}/graph_ql`;


/******************************
 * SOCIAL LOGIN CLIENT IDS
 ******************************/

export const GOOGLE_CONFIG = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  scope: 'openid ' +
    'https://www.googleapis.com/auth/userinfo.profile ' +
    'https://www.googleapis.com/auth/userinfo.email '
};


export const IPAY_VENDOR_ID = process.env.NEXT_PUBLIC_IPAY_VENDOR_ID

export const IPAY_LIVE = process.env.NEXT_PUBLIC_IPAY_LIVE === "true"