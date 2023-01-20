import { useAtom } from 'jotai';
import { ArtworkCard } from '../components/ArtworkCard'
import { Card, Row, Col } from 'react-bootstrap';
import { favoritesAtom } from '../store';

export default function Favorites() {
  const [favoritesList] = useAtom(favoritesAtom);

  if (!favoritesList) return null;

  return (
    <>
      <Row className='gy-4'>
        {favoritesList.length > 0 ? favoritesList.map((item) => {
          return <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
        }) :
          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>
                Try adding some new artwork to the favorites list.
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </Row>
      {favoritesList.length > 0 && <Row>
      </Row>}
    </>
  )
}

