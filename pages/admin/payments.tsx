import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Image,
  Title,
  Text,
  Anchor,
  Grid,
  Card,
  GridCol,
  Table,
  ActionIcon,
  Divider,
  Input,
  ScrollArea,
  Select,
  NumberInput,
  MultiSelect,
  Badge,
} from "@mantine/core";
import classes from "./Login.module.css";
import Navigation from "./navigation";
import React, { useState, useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";
import { DateInput } from '@mantine/dates';

interface PaymentProps {
  name: string;
  house: string;
  amount: number;
  duedate: string;
  notes: string;
  paymentid: number;
  paymenttype: string;
  status: string;
  rows: [];
}

function Payments() {
  const [paymentData, setPaymentData] = useState<PaymentProps[]>([]); // Initialize as an empty array
  const [paymentType, setPaymentType] = useState("");
  const API_URL = process.env.POSTGRES_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchPayments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPaymentData(result.residents.rows);
        // console.log(result.residents.rows);
      } catch (error) {
        // Handle the error as needed
        console.error("An error occurred while fetching the data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(paymentData);

  const rows = paymentData.map((ival) => (
    <Table.Tr key={ival.paymentid}>
      <Table.Td>{ival.paymentid}</Table.Td>
      <Table.Td>{ival.house}</Table.Td>
      <Table.Td>{ival.paymenttype}</Table.Td>
      <Table.Td>{ival.notes}</Table.Td>
      <Table.Td>₹{ival.amount}</Table.Td>
      <Table.Td>{ival.duedate}</Table.Td>
      <Table.Td>
        {ival.status ==="Paid" ? <Badge variant="filled" color={"green"}>{ival.status}</Badge> : <Badge variant="filled" color={"red"}>{ival.status}</Badge>}
        </Table.Td>
      <Table.Td>
        <ActionIcon variant="light" color="orange">
          <IconEdit size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Grid gutter={0}>
        <Grid.Col span={2}>
          <Navigation />
        </Grid.Col>

        <Grid.Col span={10}>
          <div style={{ backgroundColor: "#FA9014", padding: "25px" }}>
            <Title order={3} c="white">
              Payments
            </Title>
          </div>
          <ScrollArea h="85vh" offsetScrollbars>
            <Grid m={25}>
              <Grid.Col span={12}>
                <Card withBorder pb={25}>
                  <Title order={5} mb={15}>
                    Create New Payment
                  </Title>
                  <Divider mb={15} />
                  <Grid gutter="lg">
                    <Grid.Col span={3}>
                      <Select
                        label="Payment Type"
                        placeholder="Choose Payment Type"
                        data={["Maintenance", "Miscellaneous"]}
                        // value={paymentType} onChange={setPaymentType}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <NumberInput
                        hideControls
                        label="Amount"
                        placeholder="Enter Amount"
                        prefix="₹ "
                        defaultValue={100}
                        // mb="md"
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <MultiSelect
                        label="Assign To"
                        placeholder="Choose Residents"
                        data={["F1", "F2", "F3", "S1", "S2", "S3"]}
                        defaultValue={["F1"]}
                        hidePickedOptions
                        searchable
                        clearable
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                    <DateInput clearable defaultValue={new Date()} label="Due Date" placeholder="Date input" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Input.Wrapper label="Notes" description="" error="">
                        <Input placeholder="Type notes here..." />
                      </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Button variant="filled" color="#FA9014" radius="xs">
                        Create Payment
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card>

                <Card withBorder mt={20} pb={25}>
                  <Title order={5} mb={15}>
                    Payments
                  </Title>
                  <Table
                  horizontalSpacing="xl"
                  verticalSpacing="md"
                  striped
                  highlightOnHover
                  withTableBorder
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>PayID</Table.Th>
                      <Table.Th>Flat</Table.Th>
                      <Table.Th>Payment Type</Table.Th>
                      <Table.Th>Notes</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Date Due</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                </Card>

                
              </Grid.Col>
            </Grid>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </>
  );
}
export default Payments;
