import { Button, Divider, Group, Modal, TextInput } from "@mantine/core";

import { useForm } from '@mantine/form';
import { useState } from "react";
import { useSignIn } from "../hooks/useSignIn";
import { useSignUp } from "../hooks/useSignUp";
import useAuthStore from "../../../state/useAuthStore";
import { checkEmailExists } from "../api/authApi";
import { FaEnvelope, FaGoogle, FaSoundcloud } from "react-icons/fa";




export const AuthModal = () => {
    const [emailExists, setEmailExists] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>();
    const { isAuthModalOpen, closeAuthModal } = useAuthStore();
    const signIn = useSignIn();
    const signUp = useSignUp();

    const handleGoogleLogin = () => {
      // Google OAuth2 login logic
    };
  
    const handleSoundCloudLogin = () => {
      // SoundCloud OAuth2 login logic
    };
  

    const buttonStyle = {
      width: '70%', 

      margin: 'auto', 
    };
  
    const renderSocialButtons = () => (
      <Group spacing="sm" style={{ width: '100%', alignItems: 'center' }}>
        <Button leftIcon={<FaGoogle />} onClick={handleGoogleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
          Continue with Google
        </Button>
        <Button leftIcon={<FaSoundcloud />} onClick={handleSoundCloudLogin} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
          Continue with SoundCloud
        </Button>
      </Group>
    );

    const checkEmailForm = useForm({
        initialValues: {
          email: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

      const loginForm = useForm({
        initialValues: {
          password: '',
        },
    
        validate: {
          password: (value) => {
            if (value.length < 8) {
                return 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
            }
            if (!/\d/.test(value)) {
                return 'Password must contain at least one number';
            }
            return null;
        },
      },
      });

      const registerForm = useForm({
        initialValues: {
          email: userEmail || '',
          username: '', // Add username field
          password: '',
        },
      
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          username: (value) => value ? null : 'Username is required', 
          password: (value) => {
            if (value.length < 8) {
                return 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
            }
            if (!/\d/.test(value)) {
                return 'Password must contain at least one number';
            }
            return null;
        },
        },
      });

      const handleEmailCheck = async (values: { email: string }) => {
        const exists = await checkEmailExists(values.email);
        console.log(exists);
        setUserEmail(values.email);
        setEmailExists(exists);
    };

    const handleLogin = async (values: { password: string }) => {
        if (!userEmail) {
            console.error("Email is not set.");
            return;
        }
        signIn({ email: userEmail, password: values.password });

    };

    const handleRegistration = async (values: { email: string, username: string, password: string }) => {
      if (!values.email || !values.password || !values.username) {
          console.error("Email or password is not set.");
          return;
      }
      console.log('Registration form values:', values);
      signUp({ email: values.email, username: values.username, password: values.password });
  };
  

      const renderForm = () => {
        if (emailExists === null) {
            return (
              <form onSubmit={checkEmailForm.onSubmit(handleEmailCheck)}>
               <Group spacing="sm" style={{ width: '100%', alignItems: 'center' }}>
              <TextInput  placeholder="your@email.com" {...checkEmailForm.getInputProps('email')} style={buttonStyle} />
              <Button leftIcon={<FaEnvelope />} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
                Continue with Email
              </Button>
              </Group>
              <Divider label="or" labelPosition="center" my="md" />
              {renderSocialButtons()}
            </form>
            );
        } else if (emailExists != null) {
            return(
                <form onSubmit={loginForm.onSubmit(handleLogin)}>
                  <Group spacing="sm" style={{ width: '100%', alignItems: 'center' }}>
                  <TextInput
                    withAsterisk
                    label="Password"
                    placeholder="your@email.com"
                    style={buttonStyle}
                    {...loginForm.getInputProps('password')}
                    />

                  
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
                      Log in
                      </Button>
                    </Group>
            </form>
            );
        } else {
            return (
              <form onSubmit={registerForm.onSubmit(handleRegistration)}>
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...registerForm.getInputProps('email')} 
            />
             <TextInput
                withAsterisk
                label="Username"
                placeholder="your@email.com"
                {...registerForm.getInputProps('username')} 
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder="Enter your password"
                {...registerForm.getInputProps('password')} 
            />
            <Group  mt="md" >
                <Button type="submit">Submit</Button>
            </Group>
        </form>
            );
        }
    };

    interface ModalHeaderProps {
      title: string;
    }
    const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => (
      <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
        {getModalTitle()}
      </div>
    );

    const getModalTitle = () =>{
      if (emailExists === null) {
          return "Login or Register";
      }
      else if (emailExists){
        return `Welcome back, ${emailExists}`;
      }  else {
        return "Register an Account";
      }
      }
      

    return (
      <>
        <Modal opened={isAuthModalOpen} onClose={closeAuthModal} 
        centered className="modal-open" size="md">
        <ModalHeader title="Login or Sign Up" />
        {renderForm()}
        </Modal>

      </>
    );
}