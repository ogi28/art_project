import { Card, Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { useState } from "react";
import { favoritesAtom, searchHistoryAtom } from '../store';
import { getFavorites, getHistory } from '../lib/userData';
import { useAtom } from 'jotai';

export default function Login() {
  const [warning, setWarning] = useState('');
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [_favorite, setFavorite] = useAtom(favoritesAtom);
  const [_searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push('/favorites');
    } catch (err) {
      setWarning(err.message);
    }
  }

  async function updateAtoms() {
    setFavorite(await getFavorites());
    setSearchHistory(await getHistory());
  }

  return (
    <>
      <Card bg="primary">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}
