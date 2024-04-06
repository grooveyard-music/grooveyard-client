import { Button, Divider, Group, Modal, TextInput } from "@mantine/core";

import { useForm } from '@mantine/form';
import { useState } from "react";
import { useSignIn } from "../hooks/useSignIn";
import { useSignUp } from "../hooks/useSignUp";

import { checkEmailExists } from "../api/authApi";
import { FaEnvelope, FaGoogle, FaSoundcloud } from "react-icons/fa";
import useModalStore from "../../../state/useModalStore";
import useAuthStore from "../../../state/useAuthStore";

export const AuthModal = () => {
    const [emailExists, setEmailExists] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>();
    const {error} = useAuthStore();
    const { modals, closeModal } = useModalStore(); 
    const isOpen = modals['auth'] || false;
    const signIn = useSignIn();
    const signUp = useSignUp();

    const handleGoogleLogin = () => {
      // Google OAuth2 login logic
    };
  
    const handleSoundCloudLogin = () => {
      // SoundCloud OAuth2 login logic
    };
  

    const buttonStyle = {
      width: '50%', 
      margin: 'auto', 
    };
  
    const renderSocialButtons = () => (
      <Group gap="sm" style={{ width: '100%', alignItems: 'center' }}>
        <Button leftSection={<FaGoogle />} onClick={handleGoogleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
          Continue with Google
        </Button>
        <Button leftSection={<FaSoundcloud />} onClick={handleSoundCloudLogin} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
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
          email: userEmail,
          username: '', // Add username field
          password: '',
        },
      
        validate: {
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
        setUserEmail(values.email);
        setEmailExists(exists ? exists : "");
        registerForm.setFieldValue('email', values.email);
    };

    const handleLogin = async (values: { password: string }) => {
        if (!userEmail) {
            console.error("Email is not set.");
            return;
        }
        signIn({ email: userEmail, password: values.password });

    };

    const handleRegistration = async (values: { email: string | undefined, username: string, password: string }) => {
      if (!values.password || !values.username) {
          console.error("Email or password is not set.");
          return;
      }

      signUp({ email: values.email!, username: values.username, password: values.password });
  };
  

      const renderForm = () => {
        if (emailExists === null) {
            return (
              <form onSubmit={checkEmailForm.onSubmit(handleEmailCheck)}>
               <Group gap="sm" style={{ width: '100%', alignItems: 'center' }}>
              <TextInput  placeholder="your@email.com" {...checkEmailForm.getInputProps('email')} style={buttonStyle} />
              <Button leftSection={<FaEnvelope />} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>
                Continue with Email
              </Button>
              </Group>
              <Divider label="or" labelPosition="center" my="md" />
              {renderSocialButtons()}
            </form>
            );
        } else if (emailExists) {
            return(
                <form onSubmit={loginForm.onSubmit(handleLogin)}>
                  <Group gap="sm" style={{ width: '100%', alignItems: 'center' }}>
                  <TextInput
                    withAsterisk
                    label="Password"
                    placeholder="your@email.com"
                    type="password"
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
                label="Username"
                placeholder="your@email.com"
                {...registerForm.getInputProps('username')} 
            />
            <TextInput
                withAsterisk
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...registerForm.getInputProps('password')} 
            />

        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error.response.data}</div>}
            <Group  mt="md" >
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={buttonStyle}>Submit</Button>
            </Group>
        </form>
            );
        }
    };

    interface ModalHeaderProps {
      title: string;
    }
    const ModalHeader: React.FC<ModalHeaderProps> = () => (
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
        <Modal  opened={isOpen}
        onClose={() => closeModal('auth')}
        centered className="modal-open" size="lg">
        <ModalHeader title="Login or Sign Up" />
        <div className="pb-8"> 
        {renderForm()}
        </div>
        </Modal>

      </>
    );
}