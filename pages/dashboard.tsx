import { ActionIcon, Avatar, Button, Card, Group, Text, Title,rem } from "@mantine/core";
import { Image } from '@mantine/core';
import { IconBrandMantine, IconCash, IconCashBanknote, IconUser, IconUserBolt, IconUsers } from '@tabler/icons-react';

export default function Dashboard() {
  return (
    <>
    <Card m={20} bg="#A31D14" shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" c="white" size="lg" fw={400}> <IconCash size="60" stroke={1}/><br/>Account Balance</Text>
        <Title ta="center" c="white" order={1}>₹ 620.00</Title>
    </Card>    
    </>
  );
}
