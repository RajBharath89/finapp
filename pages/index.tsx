import { ActionIcon, Avatar, Button, Group } from "@mantine/core";
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
    <Avatar variant="filled" radius="xl" color="#FA9014"><IconUsers/></Avatar>
    </Group>

    <Dashboard />
    </>

  );
}
