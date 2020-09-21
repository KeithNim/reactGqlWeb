
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ data, fetching }] = useMeQuery();
    const [{fetching: LogoutFetching},logout] = useLogoutMutation();

    let body

    if (!data?.me) {
        body = (
            <>
                <NextLink href='/login'>
                    <Link color='white' m='1.2rem'>Login</Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link color='white' m='1.2rem'>Register</Link>
                </NextLink>
            </>
        )
    }
    else {
        body = (
        <>  <Box>{data.me.username}</Box>
                <NextLink href='/account'>
                    <Link color='white' m='1.2rem'>Account</Link>
                </NextLink>
                <Button onClick={()=>{logout}} variant='link' isLoading={LogoutFetching} variantColor='white'>
                    Logout
                </Button>
            </>
        )
    }

    return (
        <Flex bg="black">
            <Box mr="auto" p={5}>
                <h1 color='white'>OTL IOB Panel</h1>
            </Box>
            <Box ml="auto" p={5}>
                {body}
            </Box>
        </Flex>
    );
}