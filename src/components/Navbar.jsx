import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar-inner">
        <Link className="brand-link" to="/" aria-label="Sanjay.dev home">
          <img className="brand-logo" src="/sanjay.png" alt="Sanjay.dev logo" />
          <span className="brand-name">
            <span className="brand-name-main">Sanjay</span>
            <span className="brand-name-accent">.dev</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
