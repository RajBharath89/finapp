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
  Group, Modal, Stack
} from "@mantine/core";
import classes from "./Login.module.css";
import Navigation from "./navigation";
import React, { useState, useEffect } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { emit } from "process";
import { useDisclosure } from "@mantine/hooks";

// import { DateInput } from '@mantine/dates';

interface PaymentProps {
  name: string;
  house: string;
  amount: number;
  duedate: any;
  notes: string;
  paymentid: number;
  paymenttype: string;
  txnType:string;
  status: string;
  rows: [];
}

function Payments() {
  const [paymentData, setPaymentData] = useState<PaymentProps[]>([]); 
  const [paymentType, setPaymentType] = useState("");
  const [txnType, settxnType] = useState("Income");
  const [notes, setNotes] = useState("");
  const [house, setHouse] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [assignedHouses, setAssignedHouses] = useState<string[]>([]);
  const API_URL = process.env.POSTGRES_API_URL;

  const [editedStatus, setEditedStatus] = useState("Pending"); 
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedPaymentKey, setSelectedPaymentKey] = useState<number | null>(
    null
  );

  const fetchData = async () => {
    try {
      const response = await fetch("/api/fetchUnattended");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setPaymentData(result.residents.rows);
      // console.log(result.residents.rows);
    } catch (error) {
      console.error("An error occurred while fetching the data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleHouseAssign = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const houseName = event.target.value;
  //   if (event.target.checked) {
  //     // Add the house to the list of assigned houses
  //     setAssignedHouses([...assignedHouses, houseName]);
  //   } else {
  //     // Remove the house from the list of assigned houses
  //     setAssignedHouses(assignedHouses.filter((house) => house !== houseName));
  //   }
  // };

  const handleCreatePayment = async () => {
    try {
      const response = await fetch("/api/createPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentType,
          notes,
          amount,
          assignedHouses,
        }),
      });

      // console.log("paymentType", paymentType);
      // console.log("notes", notes);
      // console.log("amount", amount);
      // console.log("assignedHouses", assignedHouses);

      if (response.ok) {
        console.log("Payments created successfully");
      } else {
        console.error("Failed to create payments");
      }
    } catch (error) {
      console.error("An error occurred while creating payments: ", error);
    }
  };

  const handleEditClick = (paymentid: number) => {
    const selectedPay = paymentData.find(
      (payments) => payments.paymentid === paymentid
    );
    if (selectedPay) {
      setEditedStatus(selectedPay.status);
      settxnType("Income");
      setNotes(selectedPay.notes);
      setHouse(selectedPay.house);
      setAmount(selectedPay.amount);
      setPaymentType(selectedPay.paymenttype);
    }
    setSelectedPaymentKey(paymentid);
    open();
  };

  const handleDeleteClick = async (paymentid: number) => {

    setSelectedPaymentKey(paymentid);

    try {
      const response = await fetch(`/api/deletePayment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedPaymentKey,
        }),
      });

      if (response.ok) {
        fetchData();
        // close();
      } else {
        console.error("Failed to update resident information");
      }
    } catch (error) {
      console.error("An error occurred while updating the resident: ", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`/api/updatePayment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: editedStatus,
          id: selectedPaymentKey,
        }),
      });

      if (response.ok) {
        fetchData();
        close();
        handleCreateTransaction();
      } else {
        console.error("Failed to update resident information");
      }
    } catch (error) {
      console.error("An error occurred while updating the resident: ", error);
    }
  };

  const handleCreateTransaction = async () => {

    console.log("paymentType", txnType);
      console.log("notes", notes);
      console.log("amount", amount);
    try {
      const response = await fetch("/api/createTransactionPayments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          txnType,
          notes,
          amount,
          paymentType,
          house
        }),
      });

      

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


  console.log(paymentData);
  console.log('selectedPaymentKey',selectedPaymentKey);

  const rows = paymentData.map((ival) => (
    <Table.Tr key={ival.paymentid}>
      <Table.Td>{ival.paymentid}</Table.Td>
      <Table.Td>{ival.house}</Table.Td>
      <Table.Td>{ival.paymenttype}</Table.Td>
      <Table.Td>{ival.notes}</Table.Td>
      <Table.Td>₹{ival.amount}</Table.Td>
      <Table.Td>{ival.duedate}</Table.Td>
      <Table.Td>
        {ival.status === "Paid" ? (
          <Badge variant="filled" color={"green"}>
            {ival.status}
          </Badge>
        ) : (
          <Badge variant="filled" color={"red"}>
            {ival.status}
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="light" color="orange" onClick={() => handleEditClick(ival.paymentid)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="light" color="red" onClick={() => handleDeleteClick(ival.paymentid)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  

  return (
    <>
      <Grid gutter={0}>
        {/* <Grid.Col span={2}>
          <Navigation />
        </Grid.Col> */}

        <Grid.Col span={12}>
          <div style={{ backgroundColor: "#FA9014", padding: "25px" }}>
            <Title order={3} c="white">
              Unattended Test Data
            </Title>
          </div>
          <ScrollArea h="85vh" offsetScrollbars>
            <Grid m={25}>
              <Grid.Col span={12}>
                {/* <Card withBorder pb={25}>
                  <Title order={5} mb={15}>
                    Create New Payment
                  </Title>
                  <Divider mb={15} />
                  <Grid gutter="lg">
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
                    <Grid.Col span={3}>
                      <MultiSelect
                        label="Assign to Houses"
                        placeholder="Select Assigned Houses"
                        data={["F1", "F2", "F3", "S1", "S2", "S3"]}
                        value={assignedHouses}
                        onChange={(value) => setAssignedHouses(value)}
                        hidePickedOptions
                        searchable
                        clearable
                      />
                    </Grid.Col>
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
                        onClick={handleCreatePayment}
                      >
                        Create Payment
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card> */}

                <Card withBorder mt={20} pb={25}>
                  <Title order={5} mb={15}>
                    Unattended Test
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

      <Modal
        opened={opened}
        onClose={() => close()}
        title={`Edit Payment ${selectedPaymentKey} Details`}
        centered
      >
        <Stack>
          
          <Select
            label="Edit Payment Status"
            value={editedStatus}
            onChange={(value) => setEditedStatus(value || "")}
            data={["Paid", "Pending"]}
          />
          <Button onClick={handleUpdateClick} variant="filled" color="orange">
            Update
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
export default Payments;
