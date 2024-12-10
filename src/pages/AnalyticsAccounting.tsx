import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { IAnalytics } from "../model/Accounting/analytics";
import { getAnalytics } from "../services/Accounting/Analytics";

const columns: TableColumnsType<IAnalytics> = [
  { title: "id", dataIndex: "id", key: "id", hidden:true },
  { title: "Номер", dataIndex: "numberGroup", key: "numberGroup" },
  { title: "Назва", dataIndex: "nameGroup", key: "nameGroup" },
  { title: "Адреса", dataIndex: "address", key: "address" },
  { title: "Договір суборенди", dataIndex: "dogovirSuborendu", key: "dogovirSuborendu" },
  { title: "Дата укладання", dataIndex: "dateTime", key: "dateTime" },
  { title: "Дата акту", dataIndex: "endAktDate", key: "endAktDate" },
  { title: "Сума", dataIndex: "suma", key: "suma" },
  { title: "Сума 2", dataIndex: "suma2", key: "suma2" },
  { title: "Термін дії договору", dataIndex: "aktDate", key: "aktDate" },
];

const AnalyticsPage: React.FC = () => {
  const [counterparty, setCounterparty] = useState<IAnalytics[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getAnalytics();
      console.log('Fetched Counterparty Data:', response);

      if (Array.isArray(response)) {
        setCounterparty(response);
      } else {
        setCounterparty([]);
      }
    } catch (error) {
      console.error("Error fetching Analytics Data:", error);
      setCounterparty([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <Table<IAnalytics>
      columns={columns}
      dataSource={counterparty}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 50 }}
    />
  );
};

export default AnalyticsPage;
