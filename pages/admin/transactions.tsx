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
  ActionIcon,Divider, Select,NumberInput, MultiSelect
} from "@mantine/core";
import classes from "./Login.module.css";
import Navigation from "./navigation";
import React, { useState, useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";

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

function Transactions() {
  const [txnData, setTxnData] = useState<Txn[]>([]); // Initialize as an empty array
  const API_URL = process.env.POSTGRES_API_URL;
  const [amount, setAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [txnType, setTxnType] = useState("");

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

  const handleCreateTransaction = async () => {
    try {
      const response = await fetch("/api/createTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          txnType,
          notes,
          amount,
          paymentType,
        }),
      });

      console.log("paymentType", txnType);
      console.log("notes", notes);
      console.log("amount", amount);

      if (response.ok) {
        console.log("Payments created successfully");
        fetchData();
      } else {
        console.error("Failed to create payments");
      }
    } catch (error) {
      console.error("An error occurred while creating payments: ", error);
    }
  };

  const rows = txnData.map((ival) => (
    <Table.Tr key={ival.txnid}>
      <Table.Td>{ival.txnid}</Table.Td>
      <Table.Td>{ival.txntype}</Table.Td>
      <Table.Td>{ival.paydate}</Table.Td>
      <Table.Td>{ival.payid === null ? <>NA</>:<>{ival.payid}</>}</Table.Td>
      <Table.Td>{ival.paymenttype === null ? <>NA</>:<>{ival.paymenttype}</>}</Table.Td>
      <Table.Td>{ival.house === null ? <>NA</>:<>{ival.house}</>}</Table.Td>
      <Table.Td>{ival.notes}</Table.Td>
      <Table.Td>{ival.amount}</Table.Td>
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
              Transactions
            </Title>
          </div>
          <Grid m={25}>

            <Grid.Col span={12}>
            <Card withBorder pb={25}>
                  <Title order={5} mb={15}>
                    Create New Transaction
                  </Title>
                  <Divider mb={15} />
                  <Grid gutter="lg">
                    <Grid.Col span={3}>
                      <Select
                        label="Transaction Type"
                        placeholder="Select Transaction Type"
                        value={txnType}
                        onChange={(value) => setTxnType(value || "")}
                        data={["Income", "Expense"]}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Select
                        label="Payment Type"
                        placeholder="Select Payment Type"
                        value={paymentType}
                        onChange={(value) => setPaymentType(value || "")}
                        data={["Maintenance", "Miscellaneous"]}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <NumberInput
                        label="Amount"
                        placeholder="Enter Amount"
                        value={amount}
                        prefix="₹ "
                        defaultValue={100}
                        onChange={(value) => {
                          if (typeof value === 'number') {
                            setAmount(value);
                          }
                        }}
                      />
                    </Grid.Col>
                    {/* <Grid.Col span={3}>
                      <MultiSelect
                        label="Assign to Houses"
                        placeholder="Select Assigned Houses"
                        data={["F1", "F2", "F3", "S1", "S2", "S3"]}
                        // value={assignedHouses}
                        // onChange={(value) => setAssignedHouses(value)}
                        hidePickedOptions
                        searchable
                        clearable
                      />
                    </Grid.Col> */}
                    <Grid.Col span={12}>
                      <TextInput
                        label="Notes"
                        placeholder="Enter Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.currentTarget.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Button
                        variant="filled"
                        color="#FA9014"
                        radius="xs"
                        onClick={handleCreateTransaction}
                      >
                        Create Transaction
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card>
            </Grid.Col>
            <Grid.Col>
              <Text>Transactions: {txnData.length} Found</Text>
              <Table
              mt={20}
                horizontalSpacing="xl"
                verticalSpacing="md"
                striped
                highlightOnHover
                withTableBorder
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Tnx ID</Table.Th>
                    <Table.Th>Tnx Type</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Payment ID</Table.Th>
                    <Table.Th>Payment Type</Table.Th>
                    <Table.Th>House</Table.Th>
                    <Table.Th>Notes</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    {/* <Table.Th>Resident Name</Table.Th> */}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
}
export default Transactions;
