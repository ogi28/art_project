import { useEffect, useState } from "react";
import { ArtworkCard } from '../../components/ArtworkCard'
import { useRouter } from 'next/router';
import { Pagination, Card, Row, Col } from 'react-bootstrap';
import Error from 'next/error';
import useSWR from 'swr';
import validObjectIDList from '../../public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [page, setPage] = useState(1);
  const [artworkList, setArtworkList] = useState();
  const router = useRouter();
  const finalQuery = router.asPath.split('?')[1];
  const { data, err } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

  const previousPage = page => page > 1 && --page;
  const nextPage = (page) => page < artworkList.length && ++page;

  useEffect(() => {
    if (data) {
      const filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      const results = []

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data])

  if (err) {
    return (
      <Error statusCode={404} />
    )
  }
  if (!artworkList) return null;

  return (
    <>
      <Row className='gy-4'>
        {artworkList.length > 0 ? artworkList[page - 1].map((item) => {
          return <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
        }) :
          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </Row>
      {artworkList.length > 0 && <Row>
        <Col>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </Col>
      </Row>}
    </>
  )
}


