import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import React from 'react';
import { Button } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../styles/History.module.css';
import { removeFromHistory } from '../lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const parsedHistory = [];
  const router = useRouter();

  if (!searchHistory) return null;

  const historyClicked = (e, i) => {
    e.preventDefault();

    router.push(`/artwork?${searchHistory[i]}`);
  }
  const removeHistoryClicked = async (e, i) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[i]));
    router.push(`/history`);
  }
  searchHistory.forEach(h => {
    const params = new URLSearchParams(h);
    const entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  return (
    <>
      {!parsedHistory.length ? <><h4>Nothing Here</h4> Try adding some new artwork to the favorites list.</>
        :
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item className={styles.historyListItem} key={index} onClick={(e) => historyClicked(e, index)}>
              {Object.keys(historyItem).map((key) => (
                <React.Fragment key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </React.Fragment>
              ))}
              <Button className="float-end" variant="danger" size="sm"
                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      }
    </>
  )
}

