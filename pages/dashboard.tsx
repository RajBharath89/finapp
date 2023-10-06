import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { Image } from "@mantine/core";
import {
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowUpRight,
  IconBrandMantine,
  IconCash,
  IconCashBanknote,
  IconEye,
  IconUser,
  IconUserBolt,
  IconUsers,
} from "@tabler/icons-react";

import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()

  return (
    <>
      <Card m={20} bg="#A31D14" shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" c="white" size="lg" fw={400}>
          {" "}
          <IconCash size="60" stroke={1} />
          <br />
          Account Balance
        </Text>
        <Title ta="center" c="white" order={1}>
          ₹ 620.00
        </Title>
        <Group justify="center">
          <Button
            mt={15}
            variant="outline"
            color="yellow"
            size="xs"
            radius="xl"
            onClick={() => router.push('./transactions')}
          >
            View Transactions
          </Button>
        </Group>
      </Card>

      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Grid align="center" justify="space-around">
          <Grid.Col span={6}>
            <Group justify="flex-start">
              {/* <Badge color="green" variant="filled" size="lg">Inwards</Badge> */}
              <ActionIcon
                variant="filled"
                color="#A31D14"
                size="lg"
                radius="xl"
                aria-label="Settings"
              >
                <IconArrowDownLeft
                  style={{ width: "60%", height: "60%" }}
                  stroke={2}
                />
              </ActionIcon>
              <Text ta="left" c="#A31D14" size="lg" fw={500}>
                Total Income
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            {/* <Text ta="right"> */}
              <Title order={5} ta="right">₹ 2400.00</Title>
            {/* </Text> */}
          </Grid.Col>
        </Grid>
      </Card>

      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Grid align="center" justify="space-around">
          <Grid.Col span={6}>
            <Group justify="flex-start">
              {/* <Badge color="green" variant="filled" size="lg">Inwards</Badge> */}
              <ActionIcon
                variant="filled"
                color="#A31D14"
                size="lg"
                radius="xl"
                aria-label="Settings"
              >
                <IconArrowUpRight
                  style={{ width: "60%", height: "60%" }}
                  stroke={2}
                />
              </ActionIcon>
              <Text ta="left" c="#A31D14" size="lg" fw={500}>
                Total Expenses
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            {/* <Text ta="right"> */}
              <Title order={5} ta="right">₹ 2230.00</Title>
            {/* </Text> */}
          </Grid.Col>
        </Grid>
      </Card>

      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="left" c="#A31D14" size="lg" fw={500}>
          Individual Contribution
        </Text>
        <Divider mb={10} mt={10} />
        <Stack>
        <Grid align="center" justify="space-around">
          <Grid.Col span={8}>
            <Group justify="flex-start">
              <Avatar variant="filled" radius="xl" color="green">
                F1
              </Avatar>
              <Text>Raj Bharath</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group>
              <Badge color="green" variant="filled">
                paid
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid align="center" justify="space-around">
          <Grid.Col span={8}>
            <Group justify="flex-start">
              <Avatar variant="filled" radius="xl" color="red">
                F2
              </Avatar>
              <Text>Rajesh Pandey</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4} >
            <Group justify="flex-end">
              <Badge color="red" variant="filled">
                pending
              </Badge>
              <ActionIcon variant="light" color="red" size="sm" radius="xl" >
                <IconEye />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid align="center" justify="space-around">
          <Grid.Col span={8}>
            <Group justify="flex-start">
              <Avatar variant="filled" radius="xl" color="green">
                F1
              </Avatar>
              <Text>Boopalan</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group>
              <Badge color="green" variant="filled">
                paid
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid align="center" justify="space-around">
          <Grid.Col span={8}>
            <Group justify="flex-start">
              <Avatar variant="filled" radius="xl" color="green">
                S1
              </Avatar>
              <Text>Pramod Kumar</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group>
              <Badge color="green" variant="filled">
                paid
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid align="center" justify="space-around">
          <Grid.Col span={8}>
            <Group justify="flex-start">
              <Avatar variant="filled" radius="xl" color="red">
                S2
              </Avatar>
              <Text>Ravikumar</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4} >
            <Group justify="flex-end">
              <Badge color="red" variant="filled">
                pending
              </Badge>
              <ActionIcon variant="light" color="red" size="sm" radius="xl" >
                <IconEye />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid align="center" justify="space-around">
          <Grid.Col span={8}>
            <Group justify="flex-start">
              <Avatar variant="filled" radius="xl" color="green">
                S3
              </Avatar>
              <Text>Diana</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group>
              <Badge color="green" variant="filled">
                paid
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        </Stack>
      </Card>
    </>
  );
}
