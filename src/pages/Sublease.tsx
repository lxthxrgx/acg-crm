import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Counterparty } from '../model/counterparty';
import { getSublease } from '../services/SubleaseApi';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 , hideable:true,},
  { field: 'numberGroup', headerName: 'Номер', width: 130 },
  { field: 'nameGroup', headerName: 'Назва', width: 130 },
  { field: 'address', headerName: 'Адреса', width: 630 },
  { field: 'dogovirSuborendu', headerName: 'Договір суборенди', width: 130 },
  { 
    field: 'dateTime',
    headerName: 'Дата укладання',
    width: 130,
    valueFormatter: (params) => {
        if (!params) return '';
        const date = new Date(params);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
  },
  { 
    field: 'endAktDate',
    headerName: 'Дата акту',
    width: 130,
    valueFormatter: (params) => {
        if (!params) return '';
        const date = new Date(params);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
 },
  { field: 'suma', headerName: 'Сума', width: 130 },
  { field: 'suma2', headerName: 'Сума 2', width: 130 },
  { field: 'aktDate',
    headerName: 'Термін дії договору',
    width: 130,
    valueFormatter: (params) => {
        if (!params) return '';
        const date = new Date(params);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
 },
];

export default function Sublease() {
  const [counterparty, setCounterparty] = React.useState<Counterparty[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getSublease();
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
        columnVisibilityModel={{
            id: false,
          }}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
