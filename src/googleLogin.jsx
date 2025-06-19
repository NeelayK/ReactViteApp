import { useEffect } from 'react';

const CLIENT_ID = '793451311688-13nm189hgp588gq89shc0o1gu8e2ki3f.apps.googleusercontent.com';

export default function GoogleLogin({ onLogin }) {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin'),
        { theme: 'outline', size: 'large' }
      );
    }
  });

  function handleCredentialResponse(response) {
    const decoded = parseJwt(response.credential);
    const user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      isGoogle: true,
      role: null
    };

    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  }

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  return <a id="google-signin"></a>;
}
