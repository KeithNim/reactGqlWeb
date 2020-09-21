import React from 'react'
import { Wrapper } from '../components/Wrapper';
import { useRouter } from 'next/router';
import { Box, Link } from '@chakra-ui/core';
import { useMeQuery } from '../generated/graphql';
import NextLink from 'next/link'

interface accountProps { }

export const Login: React.FC<accountProps> = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  let body

  if (data?.me) {
    body = (
      <>
        <p>{data.me.username}</p>
        <NextLink href='/changePassword'>
          <Link m='1.2rem'>change password</Link>
        </NextLink>
      </>
    )
  }

  return (
    <Wrapper variant="regular">
      <Box fontSize='2rem' fontFamily="bold" mb='1.3rem'>Account</Box>
      {body}
    </Wrapper>
  );
}

export default Login