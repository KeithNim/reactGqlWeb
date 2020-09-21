import React from 'react'
import { Box } from '@chakra-ui/core';

interface WrapperProps {
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant='regular'}) => {
        return (
            <Box mt="15%" mx="auto" maxW={variant==='regular'?"800px":"500px"} px='5%'>
                {children}
            </Box>
        );
}