import { UseMutateFunction } from "react-query";
import { StringValidation, TypeOf, z } from "zod";

export type LoginInput = TypeOf<typeof loginSchema>;
export type RegisterInput = TypeOf<typeof registerSchema>;

  export interface GenericResponse {
    status: string;
    message: string;
  }
  
  export interface ILoginResponse {
    status: string;
    token: {
      result: string;
    };
  }

  export interface User {
    id: string;
    email: string;
    userName: string;
    roles: string[];
    avatar: string;
  }
  
  export type IUseSignIn = UseMutateFunction<User, unknown, {
    email: string;
    password: string;
  }, unknown>

  export type IUseSignUp = UseMutateFunction<User, unknown, { 
    email: string; 
    username: string;
     password: string; 
    }, unknown>;

    export interface IUseUser {
      user: User | null | undefined;
      isLoading: boolean;
      refetchUser: () => void;
  }
  
  
  /*SCHEMAS */
  export const loginSchema = z.object({
    Username: z.string()
      .min(1, 'Username is required'),
    Password: z.string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  });
  
  export const registerSchema = z.object({
    email: z.string()
      .email('Must be a valid email'),
    password: z.string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: z.string()
      .min(1, 'Confirm Password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match', 
    path: ['confirmPassword'] 
  });