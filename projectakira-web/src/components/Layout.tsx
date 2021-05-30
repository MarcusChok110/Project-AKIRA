import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export interface LayoutProps {
  links: { name: string; path: string }[];
}

const Layout: React.FC<LayoutProps> = ({ children, links }) => {
  const repoLink = 'https://github.com/MarcusChok110/Project-AKIRA';
  const [search, setSearch] = useState<string>('');
  const history = useHistory();

  const onSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    history.push(`/?search=${search}`);
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Project AKIRA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex me-auto" onSubmit={onSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {links.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={link.path}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-2">{children}</div>
      <div className="my-5"></div>
      <div className="bg-secondary text-white navbar fixed-bottom">
        <footer className="container">
          Made by Marcus Chok for Dreamschools. GitHub Repo found here {'->'}
          <a href={repoLink} className="link-light">
            <i className="bi bi-github"></i>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
