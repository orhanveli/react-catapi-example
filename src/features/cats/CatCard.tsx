import { Flex, Box, Image, Badge, useColorModeValue } from '@chakra-ui/react';

import { CatSummary } from './cats.models';

interface CatCardProps {
  catInfo: CatSummary;
}

export function CatCard({ catInfo }: CatCardProps) {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={catInfo.url}
          alt={`Picture of ${catInfo.id}`}
          boxSize="full"
          objectFit="cover"
          roundedTop="lg"
        />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {catInfo.breeds.map((breed) => (
                <Badge
                  rounded="full"
                  px="2"
                  fontSize="0.8em"
                  colorScheme="red"
                  key={breed.id}
                >
                  {breed.name}
                </Badge>
              ))}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
