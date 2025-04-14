import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useAuthForm = (schema, onSubmit) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (data) => {
        setIsLoading(true);
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error('Error during form submission:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(handleFormSubmit),
        errors,
        isLoading,
    };
}; 