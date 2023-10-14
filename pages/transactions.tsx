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
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'

interface Txn {
  txnid: number;
  txntype: string;
  house: string;
  amount: number;
  payid: number;
  paydate: any;
  paymenttype: any;
  notes: string;
  rows: [];
}

export default function Transactions() {
  const router = useRouter()
  const [txnData, setTxnData] = useState<Txn[]>([]); // Initialize as an empty array


  const fetchData = async () => {
    try {
      const response = await fetch("/api/fetchTransactions");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setTxnData(result.txn.rows);
      // console.log(result.residents.rows);
    } catch (error) {
      // Handle the error as needed
      console.error("An error occurred while fetching the data: ", error);
    }
  };

  useEffect(() => {   
    fetchData();
  }, []);

  console.log(txnData);

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
        {txnData.map((ival) => (
        
        
        
        <Grid align="center" justify="space-around"  key={ival.txnid}>
          {ival.txntype === "Income" ? 
          <><Grid.Col span={2}>
              <Avatar variant="filled" radius="xl" color="green">
                <IconArrowDownLeft/>
              </Avatar>
          </Grid.Col> 
          <Grid.Col span={7}>
              <Text>{ival.paymenttype}</Text>
              <Text fw={300} fz="13" c="dimmed" >{ival.notes} from {ival.house}</Text>
          </Grid.Col> 
          <Grid.Col span={3}>
            <Text c="green" ta="right">+{ival.amount}</Text>
          </Grid.Col>
          </>
          : 
          <><Grid.Col span={2}>
              <Avatar variant="filled" radius="xl" color="red">
                <IconArrowUpRight/>
              </Avatar>
          </Grid.Col>
          <Grid.Col span={7}>
              <Text>{ival.paymenttype}</Text>
              <Text fw={300} fz="13" c="dimmed" >{ival.notes}</Text>
          </Grid.Col> 
          <Grid.Col span={3}>
            <Text c="red" ta="right">-{ival.amount}</Text>
          </Grid.Col>
          </>
          }
          
        </Grid>



        ))}
        {/* <Grid align="center" justify="space-around">
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
        </Grid> */}
        
        </Stack>
      </Card>
    </>
  );
}
