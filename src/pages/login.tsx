import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';

interface loginProps { }

export const Login: React.FC<loginProps> = () => {

    const router = useRouter();
    const [, login] = useLoginMutation();

    return (
        <Wrapper variant="regular">
            <Box fontSize='2rem' fontFamily="bold" mb='1.3rem'>Login</Box>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({options: values});
                    if(response.data?.login.errors){
                        setErrors(toErrorMap(response.data?.login.errors))
                    }
                    else{
                        router.push("/")
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="username" placeholder="username" label='Username' />
                        <Box mt={3}>
                            <InputField name="password" placeholder="password" label='Password' type='password' />
                        </Box>
                        <Button
                            mt={4}
                            variantColor="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                )


                }
            </Formik>


        </Wrapper>
    );
}

export default Login