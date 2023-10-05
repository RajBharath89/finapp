import React, { useState, useEffect } from 'react'
import { ActionIcon, Avatar, Badge, Button, Divider, Group, Popover, Stack, Text } from "@mantine/core";
import { Image } from '@mantine/core';
import { IconBrandMantine, IconUser, IconUserBolt, IconUsers } from '@tabler/icons-react';
import Dashboard from "./dashboard";
// import API_URL from "../"



const IndexPage: React.FC = () => {
  const [residents, setResidents] = useState(null)
  // const API_URL:any = process.env.API_URL;
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/fetchResidents')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setResidents(result.residents)

      // console.log(result.residents.rows)
    }
    console.log(residents)
 
    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])
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
      {residents?.rows?.map((ival:any) => (
        <Group justify="space-between" mb={5}>
        <Avatar variant="filled" radius="xl" color="#FA9014">{ival.house}</Avatar>
        <Text>{ival.name}</Text>
        <Badge color="#FA9014" variant="light">{ival.type}</Badge>
      </Group>
      // <div className="user">{ival.name}</div>
      ))}
          
      </Popover.Dropdown>
    </Popover>
    
    
    </Group>

    <Dashboard />
    </>

  );
}

export default IndexPage;
