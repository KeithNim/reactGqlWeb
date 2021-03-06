import React from 'react'
import { useField } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/core';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string, label: string
}

export const InputField: React.FC<InputFieldProps> = ({label,size, ...props}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}