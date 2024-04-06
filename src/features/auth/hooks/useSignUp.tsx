import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../state/useAuthStore";
import { IUseSignUp, User } from "../types/authTypes";
import { registerUser } from "../api/authApi";
import { QUERY_KEY } from "../../../config";
import useModalStore from "../../../state/useModalStore";



export function useSignUp(): IUseSignUp {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { closeModal } = useModalStore(); 
    const {setError} = useAuthStore();
    const { mutate: signUpMutation } = useMutation<User, unknown, { email: string, username: string, password: string }, unknown>(
      ({
        email,
        username,
        password
      }) => registerUser(email, username, password), {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY.user], data);
        closeModal('auth')
        navigate('/dashboard');
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof Error) {
        setError(error)
        }
      }
    });
  
    return signUpMutation
  }
  