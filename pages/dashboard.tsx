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
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconCash,
} from "@tabler/icons-react";

interface PaymentProps {
  name: string;
  house: string;
  amount: number;
  duedate: string;
  notes: string;
  paymentid: number;
  paymenttype: string;
  status: string;
  resid:number;
  rows: [];
}

interface Resident {
  name: string;
  house: string;
  type: string;
  resid: number;
  every: any;
  rows: [];
}

// interface Balance {
//   total_balance: string;
//   maint_balance:string;
//   misc_balance:string;
// }

interface balanceData {
    tot_income: number;
    tot_expense: number;
    mt_income: number;
    mt_expense: number;
    ms_income: number;
    ms_expense: number;
}

export default function Dashboard() {
  const router = useRouter();

  const [paymentData, setPaymentData] = useState<PaymentProps[]>([]);
  const [residentsData, setResidentsData] = useState<Resident[]>([]);
  const [mtbalance, setmtbalance] = useState<number>();
  const [msbalance, setmsbalance] = useState<number>();
  const [totbalance, settotbalance] = useState<number>();
  const [balanceData, setBalanceData] = useState<balanceData | undefined>();
  const [overallStatus, setOverallStatus] = useState<'paid' | 'pending'>('paid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchPaymentsDashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPaymentData(result.payments.rows);

        const isAllPaid = result.payments.rows.every((row:any) => row.status === 'Paid');
        setOverallStatus(isAllPaid ? 'paid' : 'pending');

      } catch (error) {
        console.error("An error occurred while fetching the data: ", error);
      }
    };

    const fetchResidents = async () => {
      try {
        const response = await fetch("/api/fetchResidents");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setResidentsData(result.residents.rows);
      } catch (error) {
        console.error("An error occurred while fetching the data: ", error);
      }
    };

    

    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/fetchBalance");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
    
        console.log("Fetched data:", result.data.rows[0].data); // Log the fetched data
    
        setBalanceData(result.data.rows[0].data);
    
        // Call handleBalance after updating the state
        
        if (balanceData) {
          const mt_balance = (balanceData && balanceData.mt_income) - (balanceData && balanceData.mt_expense);
          setmtbalance(mt_balance);
          console.log("MT Balance:",mt_balance)
          {balanceData.ms_expense === null ? <>0</> : <>{balanceData.ms_expense}</>}
          const ms_balance = (balanceData && balanceData.ms_income) - (balanceData && balanceData.ms_expense);
          setmsbalance(ms_balance);
          console.log("MS Balance:",ms_balance)
          const tot_balance = (balanceData && balanceData.tot_income) - (balanceData && balanceData.tot_expense);
          settotbalance(tot_balance);
          console.log("Tot Balance:",tot_balance)
        } else {
          // console.log("Total Balance:",tot_balance)
    
          // Handle the case where balanceData is undefined
        }
        console.log("Fetched data:", result); // Log the fetched data


      } catch (error) {
        console.error("An error occurred while fetching the data: ", error);
      }
    };
    fetchData();
    fetchResidents();
    fetchBalance();
  }, []);

  

  // console.log(mtbalance)
  // console.log(msbalance)
  // console.log(totbalance)
  
  return (
    <>
      <Card m={20} bg="#A31D14" shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" c="white" size="lg" fw={400}>
          <IconCash size="60" stroke={1} />
          <br />
          Total Account Balance
        </Text>
        <Title ta="center" c="white" order={1}>
          ₹ {totbalance}
        </Title>
        <Group justify="center">
          <Button
            mt={15}
            variant="outline"
            color="yellow"
            size="xs"
            radius="xl"
            onClick={() => router.push("./transactions")}
          >
            View Transactions
          </Button>
        </Group>
      </Card>

      <Card m={20} bg="#A31D14" shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" c="white" size="lg" fw={400}>
          
          <IconCash size="26" stroke={1} />
          <br />
          Maintenance Balance
        </Text>
        <Title ta="center" c="white" order={5}>
          ₹ {mtbalance}
        </Title>
      </Card>

      <Card m={20} bg="#A31D14" shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" c="white" size="lg" fw={400}>
          
          <IconCash size="26" stroke={1} />
          <br />
          Miscellaneous Balance
        </Text>
        <Title ta="center" c="white" order={5}>
          ₹ {msbalance}
        </Title>
      </Card>


      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="left" c="#A31D14" size="lg" fw={500}>
          Pending Contributions
        </Text>
        <Divider mb={10} mt={10} />
        
        {paymentData.map((jval: PaymentProps) => (
          <>
            
            {jval.status === "Pending" ?
            <>
            <Grid align="center" justify="space-around" key={jval.paymentid} >
              <Grid.Col span={7}>
                <Group justify="flex-start">
                  <Avatar size="28" variant="filled" radius="xl" color="#FA9014">
                    {jval.house}
                  </Avatar>
                  <Text>{jval.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={5}>
                <Group justify="flex-end">
                <Text>₹ {jval.amount}</Text>
                <Badge color="red" variant="filled">
                      {jval.notes}
                    </Badge>
                </Group>
              </Grid.Col>
            </Grid>
            
            </>
            :
            <></>
            }
          </>
        ))}
      </Card>
    </>
  );
}
