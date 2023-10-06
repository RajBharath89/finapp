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
  IconArrowLeftBar,
  IconArrowUpRight,
  IconBrandMantine,
  IconCash,
  IconCashBanknote,
  IconUser,
  IconUserBolt,
  IconUsers,IconArrowLeft,
} from "@tabler/icons-react";
import { useRouter } from 'next/router'


export default function Transactions() {
  const router = useRouter()


  return (
    <>
      <Group justify="space-between" m={20}>
        <Image
          radius="md"
          src="./logo-red.svg"
          w={250}
        />
            
        <Avatar onClick={() => router.push('./')} variant="filled" radius="xl" color="#FA9014"><IconArrowLeft/></Avatar>
        </Group>
      
      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="left" c="#A31D14" size="lg" fw={500}>
          Transaction History
        </Text>
        <Divider mb={10} mt={10} />
        <Stack>
        <Grid align="center" justify="space-around">
          <Grid.Col span={2}>
              <Avatar variant="filled" radius="xl" color="green">
                <IconArrowDownLeft/>
              </Avatar>
          </Grid.Col>
          <Grid.Col span={7}>
              <Text>Maintenance</Text>
              <Text fw={300} fz="13" c="dimmed" >Maintenance from F1 on 04/10/2023</Text>
          </Grid.Col>            
          <Grid.Col span={3}>
            <Text c="green" ta="right">+ ₹400</Text>
          </Grid.Col>
        </Grid>
        <Grid align="center" justify="space-around">
          <Grid.Col span={2}>
              <Avatar variant="filled" radius="xl" color="red">
                <IconArrowUpRight/>
              </Avatar>
          </Grid.Col>
          <Grid.Col span={7}>
              <Text>Expense</Text>
              <Text fw={300} fz="13" c="dimmed" >Servant Maid on 04/10/2023</Text>
          </Grid.Col>            
          <Grid.Col span={3}>
            <Text c="red" ta="right">- ₹2200</Text>
          </Grid.Col>
        </Grid>
        
        </Stack>
      </Card>
    </>
  );
}
