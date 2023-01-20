import { Container, Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { removeToken, readToken } from '../lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setExpanded] = useState(false);
  const [_, setSearchHistory] = useAtom(searchHistoryAtom);
  const navBarRef = useRef(null);
  const searchField = useRef(null);
  const search = async (e) => {
    e.preventDefault();
    setExpanded(false);
    const queryString = `title=true&q=${searchField.current.value}`;
    router.push(`/artwork?${queryString}`);
    //TODO: check if what is being added is correct...
    setSearchHistory(await addToHistory(queryString));
  };

  let token = readToken();
  const isAuthenticated = !!token
  // const isAuthenticated = true

  const logout = () => {
    setExpanded(false);
    removeToken();
    router.push(`/login`);
  };

  useOnClickOutside(navBarRef, () => setExpanded(false));

  const unauthenticatedNav = (
    <Nav className="d-flex">
      <Link href="/register" passHref>
        <Nav.Link
          active={router.pathname === "/register"}
          onClick={() => setExpanded(false)}
        >
          Register
        </Nav.Link>
      </Link>
      <Link href="/login" passHref>
        <Nav.Link
          active={router.pathname === "/login"}
          onClick={() => setExpanded(false)}
        >
          Login
        </Nav.Link>
      </Link>
    </Nav>
  );

  const authenticatedNav = (
    <div className="d-flex">
      <Form className="d-flex" onSubmit={search}>
        <input
          type="text"
          placeholder="Search"
          className="form-control mr-sm-2"
          ref={searchField}
        />
        <button className="btn btn-primary my-2 my-sm-0" type="submit">
          Search
        </button>
      </Form>
      &nbsp;
      <Nav className="me-auto">
        <NavDropdown title={token && token.userName} id="basic-nav-dropdown">
          <Link href="/favorites" passHref>
            <NavDropdown.Item onClick={() => setExpanded(false)}>
              Favorites
            </NavDropdown.Item>
          </Link>
          <Link href="/history" passHref>
            <NavDropdown.Item onClick={() => setExpanded(false)}>
              Search History
            </NavDropdown.Item>
          </Link>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
  return (
    <Navbar
      expand="lg"
      ref={navBarRef}
      expanded={isExpanded}
      className="fixed-top navbar navbar-expand-lg navbar-dark bg-primary"
    >
      <Container>
        <Navbar.Brand>Ogulcan Tayhan</Navbar.Brand>
        {/* onclick takes a callback fn, setExpanded holds the previous value of isExpanded */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((prev) => !prev)}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link
                active={router.pathname === "/"}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
            </Link>
            {isAuthenticated && (
              <Link href="/search" passHref>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={() => setExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            )}
          </Nav>
          {isAuthenticated ? authenticatedNav : unauthenticatedNav}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

