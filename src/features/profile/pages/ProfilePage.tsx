
import { Container, Grid, Loader } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileCover, ProfileFeed, ProfileInfo, useGetUserProfile } from "..";
import { useEffect } from "react";


export const ProfilePage = () => {


const { userId } = useParams<{ userId: string }>();
var {data} = useGetUserProfile(userId);
const navigate = useNavigate(); 

if (!userId || !data) {
  return "loading";
}

console.log(data);
  return (
<Container size="xl">
  <ProfileCover coverUrl={data?.coverUrl} />
<Grid>
<Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
<ProfileInfo userProfile={data} />
</Grid.Col>
<Grid.Col className="mt-10" span={{ base: 12, md: 7, lg: 8 }}>
<ProfileFeed userId={userId}/>
</Grid.Col>
</Grid>
</Container >
  );
};



