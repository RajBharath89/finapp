import React, { useState, useEffect } from 'react';
import { ActionIcon, Avatar, Badge, Button, Center, Divider, Group, Popover, Stack, Text } from "@mantine/core";
import { Image } from '@mantine/core';
import { IconBrandMantine, IconUser, IconUserBolt, IconUsers } from '@tabler/icons-react';
import Dashboard from "./dashboard";

interface Resident {
  name: string;
  house: string;
  type: string;
  rows: [];
}

const IndexPage: React.FC = () => {
  const [residentsData, setResidentsData] = useState<Resident[]>([]); // Initialize as an empty array
  const API_URL = process.env.POSTGRES_API_URL;

  // console.log(API_URL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchResidents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setResidentsData(result.residents.rows);
        console.log(result.residents.rows);
      } catch (error) {
        // Handle the error as needed
        console.error('An error occurred while fetching the data: ', error);
      }
    };

    fetchData();
  }, []);

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
            <Avatar variant="filled" radius="xl" color="#FA9014"><IconUsers /></Avatar>
          </Popover.Target>
          <Popover.Dropdown>
            {residentsData.map((ival: Resident) => (
              <Group justify="flex-start" mb={15} key={ival.name}>
                <Avatar size="28" variant="filled" radius="xl" color="#FA9014">{ival.house}</Avatar>
                <Text ta="left">{ival.name}</Text>
                <Badge ta="right" color="#A31D14" variant="light">{ival.type}</Badge>
              </Group>
            ))}
          </Popover.Dropdown>
        </Popover>
      </Group>

      <Dashboard />
    </>
  );
};

export default IndexPage;
