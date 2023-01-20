import useSWR from 'swr';
import Link from 'next/link'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {handleFalsy} from '../utils';

//This function sets defaults in a lazy way...


export function ArtworkCard(props) {
  const { data, err } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`)
  if (err) {
    return (
      <Error statusCode={404} />
    )
  }
  if (!data) return null;

  const {
    objectID,
    primaryImageSmall,
    objectDate,
    classification,
    medium,
  } = data;

  return (
    <Card>
      <Card.Img variant="top" src={handleFalsy(primaryImageSmall, 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d')} />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          <strong>Date:&nbsp;</strong>{handleFalsy(objectDate)}
          <br />
          <strong>Classification:&nbsp;</strong>{handleFalsy(classification)}
          <br />
          <strong>Medium:&nbsp;</strong>{handleFalsy(medium)}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">
            <strong>ID: </strong>{objectID}
          </Button>
        </Link>
      </Card.Body>
    </Card >
  );
}

