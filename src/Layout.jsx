import { useEffect, useState } from 'react';
import GoogleLogin from './googleLogin';

export function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) setUser(localUser);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="header">
      <div className="logo">Khao</div>
      <nav>
        <a href="#">Join Us</a>

        {user ? (
          <>
            <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
            <button className="signin-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <GoogleLogin onLogin={handleLogin} />
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Contact</h4>
          <p>Help & Support</p>
          <p>Join Us</p>
        </div>
        <div>
          <h4>Available in</h4>
          <p>IISER TVM</p>
        </div>
        <div>
          <h4>Socials</h4>
          <p>LinkedIn</p>
          <p>Instagram</p>
        </div>
      </div>
    </footer>
  );
}
