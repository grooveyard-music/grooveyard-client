
import {  Container, Group, Text, Image, Card, Grid, Title} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export const UploadHubPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);


  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (

    <Container size="xl" className='mt-32'>
      <Title className="text-center" order={1}>Upload</Title>
      <Grid className='mt-5'>
      <Grid.Col span={4}>
       <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://i.ytimg.com/vi/FdOfhuYW_OI/maxresdefault.jpg"
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Upload a mix</Text>
      </Group>
   
      <Text size="sm" color="dimmed">
       Upload your own mix or link one of your favorite mixes from Soundcloud or Mixcloud
      </Text>
      <Link to="/upload/mix">   
      <div className="relative px-6 py-3 font-bold text-black group mt-10 w-1/3 mx-auto">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative">Upload mix</span>
      </div>
    </Link>
    </Card>
    </Grid.Col>
    <Grid.Col span={4}>
       <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          fit="inherit"
          src="https://i.ytimg.com/vi/XV5eIo3-wAU/maxresdefault.jpg"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Upload a song</Text>
      </Group>
   
      <Text size="sm" color="dimmed">
       Upload your own original track or link one of your favorite tracks from Soundcloud or Youtube to add to your songbox.
      </Text>
      <Link to="/upload/song">   
      <div className="relative px-6 py-3 font-bold text-black group mt-10 w-1/3 mx-auto">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative">Upload song</span>
      </div>
    </Link>
    </Card>
    </Grid.Col>
    <Grid.Col span={4}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://i.dailymail.co.uk/i/newpix/2018/08/29/00/4F7A86F300000578-6108167-image-a-27_1535497381609.jpg"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Create a tracklist</Text>
      </Group>
   
      <Text size="sm" color="dimmed">
       Create a tracklist for your mix or start a draft for your future ones.
      </Text>
      <Link to="/upload/tracklist">   
      <div className="relative px-6 py-3 font-bold text-black group mt-10 w-2/5 mx-auto">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative">Create tracklist</span>
      </div>
    </Link>
    </Card>
    </Grid.Col>
    </Grid>
    </Container>
  );
};
