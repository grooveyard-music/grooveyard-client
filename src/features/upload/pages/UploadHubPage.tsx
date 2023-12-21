
import {  Container, Group, Text, Image, Card, Grid, Title} from '@mantine/core';
import { Link } from 'react-router-dom';


export const UploadHubPage = () => {

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
        <Text weight={500}>Upload your own mix or track</Text>
      </Group>
   
      <Text size="sm" color="dimmed">
       Add a song or mix to your music box by pasting in a url from soundcloud or youtube
      </Text>
      <Link to="/upload/track">   
      <div className="relative px-6 py-3 font-bold text-black group mt-10 w-1/3 mx-auto">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative">Add to musicbox</span>
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
