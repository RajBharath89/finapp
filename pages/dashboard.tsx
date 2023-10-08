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
  resid:any;
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

export default function Dashboard() {
  const router = useRouter();

  const [paymentData, setPaymentData] = useState<PaymentProps[]>([]);
  const [residentsData, setResidentsData] = useState<Resident[]>([]);
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

    fetchData();
    fetchResidents();
  }, []);

  console.log(paymentData)

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
            onClick={() => router.push("./transactions")}
          >
            View Transactions
          </Button>
        </Group>
      </Card>

      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Grid align="center" justify="space-around">
          <Grid.Col span={6}>
            <Group justify="flex-start">
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
                Income
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={4} ta="right">
              ₹ 2400.00
            </Title>
          </Grid.Col>
        </Grid>
      </Card>

      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Grid align="center" justify="space-around">
          <Grid.Col span={6}>
            <Group justify="flex-start">
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
                Expenses
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={4} ta="right">
              ₹ 2230.00
            </Title>
          </Grid.Col>
        </Grid>
      </Card>

      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="left" c="#A31D14" size="lg" fw={500}>
          Pending Contributions
        </Text>
        <Divider mb={10} mt={10} />
        <Stack>
        {paymentData.map((jval: PaymentProps) => (
          <>
            {jval.status === "Pending"?
            <>
            <Grid align="center" justify="space-around" key={jval.resid}>
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
        </Stack>

        {/* <Stack>
          {residentsData.map((ival: Resident) => (
            <Grid align="center" justify="space-around" key={ival.resid}>
              <Grid.Col span={7}>
                <Group justify="flex-start">
                  <Avatar size="28" variant="filled" radius="xl" color="#FA9014">
                    {ival.house}
                  </Avatar>
                  <Text>{ival.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={5}>
                <Group justify="flex-end">
                  {paymentData.map((jval: PaymentProps) => (
                    // Check if the house matches and set the status accordingly
                    (jval.house === ival.house && (
                      <Badge
                        color={jval.status === 'Paid' ? 'green' : 'red'}
                        variant="filled"
                        key={jval.paymentid}
                      >
                        {jval.status === 'Paid' ? <></> : <>{jval.status}</>}
                      </Badge>
                    ))
                  ))}
                </Group>
              </Grid.Col>
            </Grid>
          ))}
        </Stack> */}
      </Card>
    </>
  );
}
