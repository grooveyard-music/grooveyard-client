import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../state/useAuthStore";
import { IUseSignIn, User, loginUser } from "..";
import { QUERY_KEY } from "../../../config";



export function useSignIn(): IUseSignIn {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { closeAuthModal } = useAuthStore();
  
    const { mutate: signInMutation } = useMutation<User, unknown, { email: string, password: string }, unknown>(
      ({
        email,
        password
      }) => loginUser(email, password), {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY.user], data);
        closeAuthModal();
        navigate('/');
      },
      onError: (error) => {
        console.error("Login error:", error);
      }
    });
  
    return signInMutation
  }