import { ActionIcon, Avatar, Badge, Button, Divider, Group, Popover, Stack, Text } from "@mantine/core";
import { Image } from '@mantine/core';
import { IconBrandMantine, IconUser, IconUserBolt, IconUsers } from '@tabler/icons-react';
import Dashboard from "./dashboard";

export default function IndexPage() {
  return (
    <>
    <Group justify="space-between" m={20}>
      <Image      
      radius="md"
      src="./logo-red.svg"
      w={250}
    />
    
    <Popover width={290} position="bottom" withArrow shadow="md">
      <Popover.Target>
      <Avatar variant="filled" radius="xl" color="#FA9014"><IconUsers/></Avatar>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="md">
          <Group justify="space-between">
            <Avatar variant="filled" radius="xl" color="#FA9014">F1</Avatar>
            <Text>Raj Bharath</Text>
            <Badge color="#FA9014" variant="light">Own</Badge>
            </Group>
            <Divider mt={5} mb={5}/>
            <Group justify="space-between">
            <Avatar variant="filled" radius="xl" color="#FA9014">F2</Avatar>
            <Text>Rajesh Pandey</Text>
            <Badge color="#FA9014" variant="light">Ten</Badge>
            </Group>
            <Divider mt={5} mb={5}/>
            <Group justify="space-between">
            <Avatar variant="filled" radius="xl" color="#FA9014">F3</Avatar>
            <Text>Boopalan</Text>
            <Badge color="#FA9014" variant="light">Own</Badge>
            </Group>
            <Divider mt={5} mb={5}/>
            <Group justify="space-between">
            <Avatar variant="filled" radius="xl" color="#FA9014">S1</Avatar>
            <Text>Pramod Kumar</Text>
            <Badge color="#FA9014" variant="light">Own</Badge>
            </Group>
            <Divider mt={5} mb={5}/>
            <Group justify="space-between">
            <Avatar variant="filled" radius="xl" color="#FA9014">S2</Avatar>
            <Text>Ravi Kumar</Text>
            <Badge color="#FA9014" variant="light">Ten</Badge>
            </Group>
            <Divider mt={5} mb={5}/>
            <Group justify="space-between">
            <Avatar variant="filled" radius="xl" color="#FA9014">S3</Avatar>
            <Text>Diana</Text>
            <Badge color="#FA9014" variant="light">Own</Badge>
            </Group>

        </Text>
      </Popover.Dropdown>
    </Popover>
    
    
    </Group>

    <Dashboard />
    </>

  );
}
