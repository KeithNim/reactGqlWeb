import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps { }

export const Register: React.FC<registerProps> = () => {

    const router = useRouter();
    const [, register] = useRegisterMutation();

    return (
        <Wrapper variant="regular">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register(values);
                    if(response.data?.createUser.errors){
                        setErrors(toErrorMap(response.data?.createUser.errors))
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

export default Register