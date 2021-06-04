import React, { useEffect, useState } from 'react';
import { Stack, SimpleGrid, Heading, Spinner, Center } from '@chakra-ui/react';

import { CatCard } from './CatCard';
import { search } from './cats.api';
import { CatSummary } from './cats.models';

export function CatsHome() {
  const [cats, setCats] = useState<CatSummary[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 20;

  useEffect(() => {
    const makeCall = async () => {
      setLoading(true);
      const searchResult = await search('white');
      setLoading(false);
      setPage(searchResult.paginationPage);
      setCount(searchResult.paginationCount);
      setCats(searchResult.rows);
    };
    makeCall();
  }, []);

  const renderBody = () => {
    if (loading) {
      return (
        <Center height="80vh" width="100%">
          <Spinner size="lg" />
        </Center>
      );
    }

    return (
      <SimpleGrid columns={3} spacing="15px">
        {cats.map((cat) => (
          <CatCard catInfo={cat} key={cat.id} />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Stack py={12}>
      <Heading>Cats</Heading>
      {renderBody()}
    </Stack>
  );
}
