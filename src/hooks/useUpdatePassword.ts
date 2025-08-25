import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface UpdatePasswordPayload {
userId: string;
password: string;
currentPassword: string;
}

interface UpdatePasswordResponse {
status: 'success' | 'error';
message: string;
data?: unknown;
}


export const useUpdatePassword = () => {
    const userAuth = useSelector((state: RootState) => state.auth);
    return useMutation<UpdatePasswordResponse, AxiosError<UpdatePasswordResponse>, UpdatePasswordPayload>({
        mutationFn: async ({ userId, password, currentPassword }) => {
        const response = await axios.put<UpdatePasswordResponse>(`${process.env.NEXT_PUBLIC_API_URL}users/updatePasswordAdmin/${userId}`,
        {
            password,
            currentPassword,
        },
        {
        headers: {
            'Authorization': `Bearer ${userAuth.token}`,
            'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
        },
    });
};