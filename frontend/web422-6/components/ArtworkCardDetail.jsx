import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Error from 'next/error'
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../store';
import { addToFavorites, removeFromFavorites } from '../lib/userData';
import { handleFalsy } from '../utils';

export function ArtworkCardDetail(props) {
  // showAdded as in Is it in favorites
  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const favoritesClicked = async () => {
    if (showAdded) {
      setFavoritesList(await removeFromFavorites(props.objectID));
      setShowAdded(false);
    } else {
      setFavoritesList(await addToFavorites(props.objectID));
      setShowAdded(true);
    }
  }

  const { data, err } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null)

  useEffect(() => {
    setShowAdded(favoritesList?.includes(props.objectID))
  }, [favoritesList, props.objectID],)

  if (err) {
    return (
      <Error statusCode={404} />
    )
  }

  if (!data) return null;

  const {
    primaryImage,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL
  } = data;



  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          <strong>Date:&nbsp;</strong>{handleFalsy(objectDate)}
          <br />
          <strong>Classification:&nbsp;</strong>{handleFalsy(classification)}
          <br />
          <strong>Medium:&nbsp;</strong>{handleFalsy(medium)}
          <br />
          <br />
          <strong>Artist:&nbsp;</strong>{handleFalsy(artistDisplayName)} {handleFalsy(artistDisplayName) !== 'N/A'
            && (<a href={handleFalsy(artistWikidata_URL, '')} target="_blank" rel="noreferrer" >wiki</a>)}
          <br />
          <strong>Credit Line:&nbsp;</strong>{handleFalsy(creditLine)}
          <br />
          <strong>Dimensions:&nbsp;</strong>{handleFalsy(dimensions)}
          <br />
          <br />
          <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favoritesClicked}>{showAdded ? "+ Favorite (added)" : "+ Favorite"}</Button>
        </Card.Text>
      </Card.Body>
    </Card >
  );
}
