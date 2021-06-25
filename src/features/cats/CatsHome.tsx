import React, { useEffect, useState } from 'react';
import {
  Stack,
  SimpleGrid,
  Heading,
  Spinner,
  Center,
  ButtonProps
} from '@chakra-ui/react';
import {
  Container,
  Next,
  PageGroup,
  Paginator,
  Previous,
  usePaginator
} from 'chakra-paginator';

import { CatCard } from './CatCard';
import { search } from './cats.api';
import { CatSummary } from './cats.models';

export function CatsHome() {
  const [cats, setCats] = useState<CatSummary[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isDisabled, pagesQuantity, currentPage, setCurrentPage, pageSize } =
    usePaginator({
      total: count,
      initialState: {
        pageSize: 10,
        currentPage: 1,
        isDisabled: false
      }
    });

  const outerLimit = 2;
  const innerLimit = 4;

  // styles
  const baseStyles: ButtonProps = {
    // w: 7,
    flex: 1,
    px: 2,
    py: 2,
    fontSize: 'sm'
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'green.300'
    },
    bg: 'gray.300'
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    bg: 'green.300'
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'gray.200'
  };

  const getCats = async () => {
    setLoading(true);
    const searchResult = await search('white', currentPage, pageSize);
    setLoading(false);
    setCount(searchResult.paginationCount);
    setCats(searchResult.rows);
  };

  const handlePageChange = async (nextPage: number) => {
    await getCats();
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    getCats();
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
      <>
        <SimpleGrid columns={3} spacing="15px">
          {cats.map((cat) => (
            <CatCard catInfo={cat} key={cat.id} />
          ))}
        </SimpleGrid>
        <Paginator
          isDisabled={isDisabled}
          activeStyles={activeStyles}
          innerLimit={innerLimit}
          currentPage={currentPage}
          outerLimit={outerLimit}
          normalStyles={normalStyles}
          separatorStyles={separatorStyles}
          pagesQuantity={pagesQuantity}
          onPageChange={handlePageChange}
        >
          <Container align="center" justify="space-between" w="full" p={4}>
            <Previous>Previous</Previous>
            <PageGroup isInline align="center" />
            <Next>Next</Next>
          </Container>
        </Paginator>
      </>
    );
  };

  return (
    <Stack py={12}>
      <Heading>Cats</Heading>
      {renderBody()}
    </Stack>
  );
}
