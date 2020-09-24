import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useChangePasswordMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';

interface changePasswordProps {}

export const ChangePassword: React.FC<changePasswordProps> = () => {

        const router = useRouter();
        const [, changePassword] = useChangePasswordMutation();
    
        return (
            <Wrapper variant="regular">
                <Box fontSize='2rem' fontFamily="bold" mb='1.3rem'>Change Password</Box>
                <Formik
                    initialValues={{ id: "5c1e70f2-4a81-44fd-8f36-e8d456c26bc8", password: "", newPassword:"", newPassword2:"" }}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await changePassword({options: values});
                        if(response.data?.changePassword.errors){
                            setErrors(toErrorMap(response.data?.changePassword.errors))
                        }
                        else{
                            router.push("/login")
                        }
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField name="password" placeholder="password" label='Password' type='password' />
                            <Box mt={3}>
                                <InputField name="newPassword" placeholder="new password" label='New Password' type='password' />
                            </Box>
                            <Box mt={3}>
                                <InputField name="newPassword2" placeholder="new password" label='Confirm New Password' type='password' />
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
    
    export default ChangePassword