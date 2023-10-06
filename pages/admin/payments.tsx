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
} from "@mantine/core";
import classes from "./Login.module.css";
import Navigation from "./navigation";
import React, { useState, useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";

interface Resident {
  name: string;
  house: string;
  type: string;
  resid: number;
  rows: [];
}

function Payments() {
  const [residentsData, setResidentsData] = useState<Resident[]>([]); // Initialize as an empty array
  const API_URL = process.env.POSTGRES_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchResidents");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setResidentsData(result.residents.rows);
        // console.log(result.residents.rows);
      } catch (error) {
        // Handle the error as needed
        console.error("An error occurred while fetching the data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(residentsData);

  const rows = residentsData.map((ival) => (
    <Table.Tr key={ival.resid}>
      <Table.Td>{ival.resid}</Table.Td>
      <Table.Td>{ival.house}</Table.Td>
      <Table.Td>{ival.name}</Table.Td>
      <Table.Td>{ival.type}</Table.Td>
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
          <Grid m={25}>
            <Grid.Col>
              <Text>Residents: {residentsData.length} Found</Text>
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
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Flat Name</Table.Th>
                    <Table.Th>Resident Name</Table.Th>
                    <Table.Th>Residence Type</Table.Th>
                    <Table.Th>Actions</Table.Th>
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
export default Payments;
