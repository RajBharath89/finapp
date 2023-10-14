import React, { useState, useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Group, Select } from "@mantine/core";
import {
  Paper,
  Title,
  Text,
  Grid,
  Table,
  ActionIcon,
  Stack,
} from "@mantine/core";
import classes from "./Login.module.css";
import Navigation from "./navigation";

interface Resident {
  name: string;
  house: string;
  type: string;
  resid: number;
  rows: [];
}

function Residents() {
  const [residentsData, setResidentsData] = useState<Resident[]>([]);
  const API_URL = process.env.POSTGRES_API_URL;
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedResidentKey, setSelectedResidentKey] = useState<number | null>(
    null
  );

  const [editedName, setEditedName] = useState("");
  const [editedType, setEditedType] = useState("Owner"); 

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (resid: number) => {
    const selectedResident = residentsData.find(
      (resident) => resident.resid === resid
    );
    if (selectedResident) {
      setEditedName(selectedResident.name);
      setEditedType(selectedResident.type);
    }
    setSelectedResidentKey(resid);
    open();
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`/api/updateResident`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedName,
          type: editedType,
          id: selectedResidentKey,
        }),
      });

      if (response.ok) {
        fetchData();
        close();
      } else {
        console.error("Failed to update resident information");
      }
    } catch (error) {
      console.error("An error occurred while updating the resident: ", error);
    }
  };

  console.log(editedName);
  console.log(editedType);

  const rows = residentsData.map((ival) => (
    <Table.Tr key={ival.resid}>
      <Table.Td>{ival.resid}</Table.Td>
      <Table.Td>{ival.house}</Table.Td>
      <Table.Td>{ival.name}</Table.Td>
      <Table.Td>{ival.type}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="light"
          color="orange"
          onClick={() => handleEditClick(ival.resid)}
        >
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
              Residents
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

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => close()}
        title={`Edit Resident ${selectedResidentKey} Details`}
        centered
      >
        <Stack>
          <TextInput
            label="Edit Resident Name"
            value={editedName}
            onChange={(event) => setEditedName(event.currentTarget.value)}
          />
          <Select
            label="Edit Resident type"
            value={editedType}
            onChange={(value) => setEditedType(value || "")}
            data={["Owner", "Tenant"]}
          />
          <Button onClick={handleUpdateClick} variant="filled" color="orange">
            Update
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
export default Residents;
