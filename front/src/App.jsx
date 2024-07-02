import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";
import DataTable from 'react-data-table-component';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = (row) => {
    console.log(row);

  }

  
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      // cell: row => <div><h3 className='text-2xl text-red-400'>{row.name}</h3></div>
    },
    {
      name: 'City',
      selector: row => row.city,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex w-20'>
          <button className="btn primary btn-sm" onClick={() => handleEdit(row)}>Edit</button>
          <button className="btn danger btn-sm" onClick={() => handleDelete(row)} style={{ marginLeft: 8 }}>Delete</button>
        </div>
      ),
      // ignoreRowClick: true,
      // allowOverflow: true,
      // button: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/contacts").then((res) => {
      setContacts(res.data.contacts);
    }).catch((err) => {

    }).finally(() => { setLoading(false) })
  }, []);


  return (
    <>
      <div className='pt-5 h-screen max-w-[1200px] bg-gray-100 mx-auto'>
        <h1 className='text-4xl text-blue-500 text-center'>My Contacts</h1>
        <div className='my-5 p-5'>
          <DataTable
            columns={columns}
            data={contacts}
            noRowsPerPage={5}
            pagination={true}
          />
          {
            loading && <div className='text-center'><span className="loading loading-dots loading-lg text-error"></span></div>
          }
          {/* <table class="table-auto w-full border">
            <thead>
              <tr className='bg-blue-400'>
                <th className='text-center p-3'>Name</th>
                <th className='text-center p-3'>City</th>
                <th className='text-center p-3'>Age</th>
              </tr>
            </thead>
            <tbody>

              {
                contacts.map((contact, index) => {
                  return (<>
                    <tr className='odd:bg-white even:bg-slate-100'>
                      <td className='text-center p-3'>{contact.name}</td>
                      <td className='text-center p-3'>{contact.city}</td>
                      <td className='text-center p-3'>{contact.age}</td>
                    </tr>
                  </>)
                })
              }
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  )
}

export default App
