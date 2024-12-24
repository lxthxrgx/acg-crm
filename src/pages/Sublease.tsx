import * as React from 'react';
import { getSublease, getGroupsFordropdown } from '../services/SubleaseApi';
import { ISublease } from '../model/Sublease/Sublease';
import { IDataToDropdown } from '../model/Sublease/DataToDropdown';
import "../css/sublease.css";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

export default function Sublease() {
  const [Subleas, setSublease] = React.useState<ISublease[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dropdownData, setDropdownData] = React.useState<IDataToDropdown[]>([]);

  // const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
  const [menuPosition, setMenuPosition] = React.useState<{ x: number; y: number } | null>(null);

  const [editTable, setEditTable] = React.useState<{ id: number; field: keyof ISublease } | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGroupsFordropdown();
        setDropdownData(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных", error);
      }
    };
    fetchData();
  }, []);

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

  const filterDatanumberGroup = Subleas
  .slice()
  .sort((a, b) => a.numberGroup - b.numberGroup)
  .map(item => ({
    text: item.numberGroup.toString(),
    value: item.numberGroup,
  }));

  const filterDatanameGroup = Object.values(
    Subleas.reduce((acc, item) => {
      if (!acc[item.nameGroup]) {
        acc[item.nameGroup] = {
          text: item.nameGroup.toString(),
          value: item.nameGroup,
        };
      }
      return acc;
    }, {} as Record<string, { text: string; value: string }>)
  );
  
  const filterDataAddress = Subleas
  .map(item => ({
    text: item.address.toString(),
    value: item.address,
  }))
  ;
  
  const columns: TableColumnsType<ISublease> = [
    { dataIndex: 'id', title: 'ID', width: 100 , hidden:true},
    { dataIndex: 'numberGroup', title: 'Номер', width: 130 ,fixed: 'left',
      filters: filterDatanumberGroup,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.numberGroup === value,      
    },
    { dataIndex: 'nameGroup', title: 'Назва', width: 130,
      filters: filterDatanameGroup,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.nameGroup === value,
    },
    { dataIndex: 'address', title: 'Адреса', width: 630, 
      filters: filterDataAddress,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.address === value,
    },
    { dataIndex: 'dogovirSuborendu', title: 'Договір суборенди', width: 130},
    { 
      dataIndex: 'dateTime',
      title: 'Дата укладання',
      width: 130,
      render: (value: string) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
    },
    { 
      dataIndex: 'endAktDate',
      title: 'Дата акту',
      width: 130,
      render: (value: string) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
   },
    { dataIndex: 'suma', title: 'Сума', width: 130 },
    { dataIndex: 'suma2', title: 'Сума 2', width: 130 },
    { dataIndex: 'aktDate',
      title: 'Термін дії договору',
      width: 130,
      render: (value: string) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
    },
  ];

  return (
    <div style={{ height: '100vh' }} onContextMenu={handleContextMenu} onClick={handleClick}>
      <Table<ISublease>
        columns={columns}
        dataSource={Subleas}
        onChange={onChange}
        scroll={{ x: 'max-content' }}
        style={{ height: '100vh', width: '100%' }}
        size="middle"
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
          <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={() => AddNewRow()}>
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
    </div>


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
