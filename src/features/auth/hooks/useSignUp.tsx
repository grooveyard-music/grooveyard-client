import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../state/useAuthStore";
import { IUseSignUp, User } from "../types/authTypes";
import { registerUser } from "../api/authApi";
import { QUERY_KEY } from "../../../config";



export function useSignUp(): IUseSignUp {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { closeAuthModal } = useAuthStore();
  
    const { mutate: signUpMutation } = useMutation<User, unknown, { email: string, username: string, password: string }, unknown>(
      ({
        email,
        username,
        password
      }) => registerUser(email, username, password), {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY.user], data);
        closeAuthModal();
        navigate('/');
      },
      onError: (error) => {

      }
    });
  
    return signUpMutation
  }
  