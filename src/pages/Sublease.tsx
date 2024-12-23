import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Counterparty } from '../model/counterparty';
import { getSublease } from '../services/SubleaseApi';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 , hideable:true, editable: true},
  { field: 'numberGroup', headerName: 'Номер', width: 130 , editable: true},
  { field: 'nameGroup', headerName: 'Назва', width: 130, editable: true },
  { field: 'address', headerName: 'Адреса', width: 630, editable: true },
  { field: 'dogovirSuborendu', headerName: 'Договір суборенди', width: 130, editable: true },
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
      }, editable: true
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
      }, editable: true
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
      }, editable: true
  },
];

export default function Sublease() {
  const [counterparty, setCounterparty] = React.useState<Counterparty[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
  const [menuPosition, setMenuPosition] = React.useState<{ x: number; y: number } | null>(null);

  const [editTable, setEditTable] = React.useState<{ id: number; field: keyof Counterparty } | null>(null);

  //react context menu start 
  const handleContextMenu = (event: React.MouseEvent) => { 
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleClick = () => {
    setMenuPosition(null);
  };
  //react context menu start end

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

  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    setCounterparty((prev) =>
      prev.map((row) => (row.id   === newRow.id ? { ...row, ...newRow } : row))
    );
    return newRow;
  };

  const handleEdit = (id: number, field: keyof Counterparty) => {
    setEditTable({ id, field });
  };

  return (
    <Paper sx={{ height: '100vh', width: '100%' }} onContextMenu={handleContextMenu} onClick={handleClick}>
      <DataGrid
        rows={counterparty}
        columns={columns}
        columnVisibilityModel={{
            id: false,
          }}
          disableRowSelectionOnClick 
        checkboxSelection
        sx={{ border: 0 }}
        processRowUpdate={handleProcessRowUpdate}
      />
      {menuPosition && (
        <ul
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            listStyle: "none",
            padding: "10px",
            margin: 0,
            borderRadius: "5px",
          }}
        >
          <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
            Додати
          </li>
          <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
            Редагувати
          </li>
          <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
            Зберегти
          </li>
          <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
            Видалити
          </li>
          <hr />
          <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 2")}>
            Зберегти записи в Excel
          </li>
        </ul>
      )}
    </Paper>
    
  );
}
