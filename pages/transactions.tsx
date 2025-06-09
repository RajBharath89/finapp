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
  Select,            // ⬅️  NEW
} from "@mantine/core";
import { Image } from "@mantine/core";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconArrowLeft,
} from "@tabler/icons-react";
import React, { useState, useEffect, useMemo } from "react";   // ⬅️  useMemo added
import { useRouter } from "next/router";

interface Txn {
  txnid: number;
  txntype: string;
  house: string;
  amount: number;
  payid: number | null;
  paydate: string;        // keep as ISO string
  paymenttype: string;
  notes: string;
}

export default function Transactions() {
  const router = useRouter();

  const [txnData, setTxnData] = useState<Txn[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/fetchTransactions");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();
      setTxnData(result.txn.rows);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /** ------------------------------------------------------------------
   * Build the <Select> options once txnData is in place.
   *  • value  – internal key “YYYY-M”  (e.g. 2025-0 for Jan 2025)
   *  • label  – “January 2025”
   *  • group  – “2025”  -> Mantine shows a header so months are grouped
   * ------------------------------------------------------------------ */
  const monthOptions = useMemo(() => {
    const map: Record<string, { value: string; label: string; group: string }> =
      {};
    for (const tx of txnData) {
      const d = new Date(tx.paydate);
      const key = `${d.getFullYear()}-${d.getMonth()}`; // e.g. "2025-0"
      if (!map[key]) {
        map[key] = {
          value: key,
          label: d.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          group: String(d.getFullYear()),
        };
      }
    }
    return (
      Object.values(map)
        // newest year-month first
        .sort(
          (a, b) =>
            Number(b.value.split("-")[0]) - Number(a.value.split("-")[0]) ||
            Number(b.value.split("-")[1]) - Number(a.value.split("-")[1])
        )
    );
  }, [txnData]);

  /** Return true if a transaction falls in the currently-selected month */
  const isInSelectedMonth = (tx: Txn) => {
    if (!selectedMonth) return true; // no filter yet
    const d = new Date(tx.paydate);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    return key === selectedMonth;
  };

  return (
    <>
      {/* ------------ header row ------------ */}
      <Group justify="space-between" m={20}>
        <Image radius="md" src="./logo-red.svg" w={250} />
        <Avatar
          onClick={() => router.push("./")}
          variant="filled"
          radius="xl"
          color="#FA9014"
        >
          <IconArrowLeft />
        </Avatar>
      </Group>

      {/* ------------ month filter ------------ */}
      <Group m={20}>
        <Select
          placeholder="Filter by month"
          clearable
          searchable
          data={monthOptions}
          maxDropdownHeight={260}
          value={selectedMonth}
          onChange={setSelectedMonth} // Mantine gives (value) => void
          nothingFound="No data"
          w={220}
        />
      </Group>

      {/* ------------ card with list ------------ */}
      <Card m={20} shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="left" c="#A31D14" size="lg" fw={500}>
          Transaction History
        </Text>
        <Divider mb={10} mt={10} />
        <Stack>
          {txnData.filter(isInSelectedMonth).map((tx) => (
            <Grid align="center" justify="space-around" key={tx.txnid}>
              {tx.txntype === "Income" ? (
                <>
                  <Grid.Col span={2}>
                    <Avatar variant="filled" radius="xl" color="green">
                      <IconArrowDownLeft />
                    </Avatar>
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Text>{tx.paymenttype}</Text>
                    <Text fw={300} fz="13" c="dimmed">
                      {tx.notes} {tx.house && `from ${tx.house}`}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text c="green" ta="right">
                      +{tx.amount}
                    </Text>
                  </Grid.Col>
                </>
              ) : (
                <>
                  <Grid.Col span={2}>
                    <Avatar variant="filled" radius="xl" color="red">
                      <IconArrowUpRight />
                    </Avatar>
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Text>{tx.paymenttype}</Text>
                    <Text fw={300} fz="13" c="dimmed">
                      {tx.notes}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text c="red" ta="right">
                      -{tx.amount}
                    </Text>
                  </Grid.Col>
                </>
              )}
            </Grid>
          ))}
        </Stack>
      </Card>
    </>
  );
}
