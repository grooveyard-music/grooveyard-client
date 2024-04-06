import { Badge, Button, Card, Container, Group, Text, Image } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const TracklistPage = () => {
  return (
    <Container size="xl" className="min-h-screen flex flex-col items-center justify-start mt-2">
      {/* Cards Container */}
      <Group position="center" spacing="xl" style={{ marginBottom: 20 }}>
        {/* Card 1 */}
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 300 }}>
          <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>

          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
          Create Draft
          </Button>
        </Card>

        {/* Card 2 - Duplicate of Card 1 for demonstration */}
        {/* You can customize this card as per your requirement */}
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 300 }}>
          <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text weight={500}>Explore the Arctic</Text>
            <Badge color="green">New</Badge>
          </Group>

          <Text size="sm" color="dimmed">
            Discover the untouched Arctic wilderness on our unique icebreaker tours that will take you to the most remote and pristine locations.
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
          Create for Existing Mix
          </Button>
        </Card>
      </Group>
    </Container>
  );
};
