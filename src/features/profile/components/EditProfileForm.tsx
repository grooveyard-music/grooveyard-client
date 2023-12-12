import { Group, TextInput,  Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import  useAuthStore  from '../../../state/useAuthStore';
import { DatePickerInput } from '@mantine/dates';
import { useMutation,   useQueryClient} from 'react-query';
import { editUserProfileFn} from '../api/profileApi';
import { notifications } from '@mantine/notifications';
import { editProfileSchema } from '..';
import { LoadingButton } from '../../common';


type EditProfileFormProps = {
setOpened:  () => void;
};
export const EditProfileForm: React.FC<EditProfileFormProps> = ({setOpened }) => {
  const store = useAuthStore();
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
      fullName: store.userProfile?.fullName || '',
      birthdate: store.userProfile?.birthdate ? new Date(store.userProfile?.birthdate) : new Date(),
      location: store.userProfile?.location || '',
      biography: store.userProfile?.biography || '',
      avatarFile: undefined,
    },
    validate: zodResolver(editProfileSchema),
  });

  
  const { mutate: updateProfile, isLoading } = useMutation(
    (formData: FormData) => editUserProfileFn(formData),
    {
      onSuccess() {
        notifications.show({
          title: 'Success!',
          message: 'Profile updated successfully',
        });
        queryClient.invalidateQueries(["fetchProfileOverview", store.user?.id]);
        queryClient.refetchQueries(["fetchProfileOverview", store.user?.id]);

        setOpened();
      },
      onError(error: any) {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            notifications.show({
              title: 'Error',
              message: el.message,
            })
          );
        } else {
          notifications.show({
            title: 'Error!',
            message: (error as any).response.data.error,
          });
        }
      },
    }
);

  return (
    <form 
    onSubmit={(event) => {
      event.preventDefault();
      form.onSubmit((values) => {
        let formData = new FormData();
        if (values.avatarFile) {
          formData.append('avatarFile', values.avatarFile);
        }
        formData.append('displayName', values.fullName); // Map fullName to displayName
        formData.append('birthdate', values.birthdate.toISOString());
        formData.append('location', values.location);
        formData.append('biography', values.biography);
        formData.append('userId', store.user?.id || '');
        // append any other required fields similarly
        updateProfile(formData);
      })(event);
    }}>
      <TextInput label="Full Name" {...form.getInputProps('fullName')} />
      <DatePickerInput label="Birthdate" {...form.getInputProps('birthdate')} />
      <TextInput label="Location" {...form.getInputProps('location')} />
      <Textarea label="Biography" {...form.getInputProps('biography')} />
      <input 
          type="file" 
          accept="image/*" 
          onChange={(event) => {
            const file = event.currentTarget.files ? event.currentTarget.files[0] : undefined;
            form.setFieldValue('avatarFile', file as any);
        }}
        />
      <Group position="right" mt="xl">
        <LoadingButton loading={isLoading}>Update Profile</LoadingButton>
      </Group>
    </form>
  );
};
