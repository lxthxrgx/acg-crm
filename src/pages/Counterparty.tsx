import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Counterparty } from '../model/counterparty';
import { getCounterparty } from '../services/CounterpartyApi';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 , hideable:true},
  { field: 'numberGroup', headerName: 'Номер', width: 130 },
  { field: 'nameGroup', headerName: 'Назва', width: 130 },
  { field: 'pibs', headerName: 'ПІБ', width: 130 },
  { field: 'address', headerName: 'Адреса', width: 630 },
  { field: 'area', headerName: 'Площа', width: 130 },
  { field: 'rent', headerName: 'Оренда', width: 130 },
  { field: 'isAlert', headerName: 'Checkbox', width: 130 },
];

export default function DataTable() {
  const [counterparty, setCounterparty] = React.useState<Counterparty[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getCounterparty();
      console.log('Fetched Counterparty Data:', response);

      if (Array.isArray(response)) {
        setCounterparty(response);
      } else {
        setCounterparty([]);
      }
    } catch (error) {
      console.error("Error fetching Counterparty Data:", error);
      setCounterparty([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Paper sx={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={counterparty}
        columns={columns}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
