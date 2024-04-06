import { Group, TextInput,  Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import  useAuthStore  from '../../../state/useAuthStore';
import { DateInput } from '@mantine/dates';
import { useMutation,   useQueryClient} from 'react-query';
import { editUserProfileFn} from '../api/profileApi';
import { notifications } from '@mantine/notifications';
import { EditProfileInput, editProfileSchema } from '..';
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
      userId: store.userProfile?.userId

    },
    validate: zodResolver(editProfileSchema),
  });

  const { mutate: updateProfile, isLoading } = useMutation(
    (editProfileInput: EditProfileInput) => editUserProfileFn(editProfileInput),
    {
      onSuccess() {
        notifications.show({
          title: 'Success!',
          message: 'Profile updated successfully',
        });
        queryClient.invalidateQueries(["getUserProfile", store.user?.id]);
        queryClient.refetchQueries(["getUserProfile", store.user?.id]);

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
          const editProfileData: EditProfileInput = {
            fullname: values.fullName,
            birthdate: values.birthdate,
            location: values.location,
            biography: values.biography,
            userId: store.user?.id || ""
          };
          updateProfile(editProfileData);
        })(event);
      }}>
      <TextInput label="Full Name" {...form.getInputProps('fullName')} />
      <DateInput label="Birthdate" {...form.getInputProps('birthdate')} />
      <TextInput label="Location" {...form.getInputProps('location')} />
      <Textarea label="Biography" {...form.getInputProps('biography')} />
      <Group mt="xl">
        <LoadingButton loading={isLoading}>Update Profile</LoadingButton>
      </Group>
    </form>
  );
};
