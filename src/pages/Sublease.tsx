import * as React from 'react';
import { getSublease } from '../services/SubleaseApi';
import { ISublease } from '../model/Sublease';
import "../css/sublease.css";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const columns: TableColumnsType<ISublease> = [
  { dataIndex: 'id', title: 'ID', width: 100 , hidden:true},
  { dataIndex: 'numberGroup',
    title: 'Номер',
      width: 130 ,
       },
  { dataIndex: 'nameGroup', title: 'Назва', width: 130},
  { dataIndex: 'address', title: 'Адреса', width: 630},
  { dataIndex: 'dogovirSuborendu', title: 'Договір суборенди', width: 130},
  { 
    dataIndex: 'dateTime',
    title: 'Дата укладання',
    width: 130,
    
  },
  { 
    dataIndex: 'endAktDate',
    title: 'Дата акту',
    width: 130,
   
 },
  { dataIndex: 'suma', title: 'Сума', width: 130 },
  { dataIndex: 'suma2', title: 'Сума 2', width: 130 },
  { dataIndex: 'aktDate',
    title: 'Термін дії договору',
    width: 130,
   
  },
];


export default function Sublease() {
  const [Subleas, setSublease] = React.useState<ISublease[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
  const [menuPosition, setMenuPosition] = React.useState<{ x: number; y: number } | null>(null);

  const [editTable, setEditTable] = React.useState<{ id: number; field: keyof ISublease } | null>(null);


  function AddNewRow() {
    let newRow: ISublease = {
      id: 0,
      numberGroup: 0,
      nameGroup: "",
      address: "",
      dogovirSuborenda: "",
      dateTime: new Date(),
      endAktDate: new Date(),
      suma: "",
      suma2: "",
      aktDate: new Date(),
    };
  
    setSublease((prev) => [newRow, ...prev]);
  }
  

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
        setSublease(response);
      } else {
        setSublease([]);
      }
    } catch (error) {
      console.error("Error fetching Counterparty Data:", error);
      setSublease([]);
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    setSublease((prev) =>
      prev.map((row) => (row.id   === newRow.id ? { ...row, ...newRow } : row))
    );
    return newRow;
  };

  const handleEdit = (id: number, field: keyof ISublease) => {
    setEditTable({ id, field });
  };

  const onChange: TableProps<ISublease>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (

  <Table<ISublease> columns={columns} dataSource={Subleas} onChange={onChange} scroll={{ x: 'max-content' }} style={{ height: '100vh' }}  />

    // <Paper sx={{ height: '100vh', width: '100%' }} onContextMenu={handleContextMenu} onClick={handleClick}>
    //   <DataGrid
    //     rows={counterparty}
    //     columns={columns}
    //     columnVisibilityModel={{
    //         id: false,
    //       }}
    //       disableRowSelectionOnClick 
    //     checkboxSelection
    //     sx={{ border: 0 }}
    //     processRowUpdate={handleProcessRowUpdate}
    //   />
    //   {menuPosition && (
    //     <ul
    //       style={{
    //         position: "absolute",
    //         top: menuPosition.y,
    //         left: menuPosition.x,
    //         backgroundColor: "white",
    //         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    //         listStyle: "none",
    //         padding: "10px",
    //         margin: 0,
    //         borderRadius: "5px",
    //       }}
    //     >
    //       <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => AddNewRow()}>
    //         Додати
    //       </li>
    //       <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
    //         Редагувати
    //       </li>
    //       <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
    //         Зберегти
    //       </li>
    //       <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 1")}>
    //         Видалити
    //       </li>
    //       <hr />
    //       <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => alert("Action 2")}>
    //         Зберегти записи в Excel
    //       </li>
    //     </ul>
    //   )}
    // </Paper>
    
  );
}
