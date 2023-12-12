
import { Container, Grid } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileCover, ProfileFeed, ProfileInfo } from "..";


export const ProfilePage = () => {


const { userId } = useParams<{ userId: string }>();

const navigate = useNavigate(); 
if (userId == null) {
  navigate('/');
  return null;  
}
  return (
<Container size="xl">
  <ProfileCover/>
<Grid>
<Grid.Col md={3} sm={1}>
<ProfileInfo userId={userId} />
</Grid.Col>
<Grid.Col className="mt-10" md={7} sm={1}>
<ProfileFeed userId={userId}/>
</Grid.Col>
</Grid>
</Container >
  );
};



