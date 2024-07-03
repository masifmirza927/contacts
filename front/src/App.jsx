import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";
import DataTable from 'react-data-table-component';
import Card from './components/Card';
import Avatar from './components/Avatar';
import AddForm from './components/AddForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    id: null,
    name: "",
    city: "",
    age: ""
  });

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'City',
      selector: row => row.city,
    },
    {
      name: 'Age',
      selector: row => row.age,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className='flex w-20'>
          <button className="btn primary btn-sm btn-info" onClick={() => handleEditBtn(row)} >Edit</button>
          <button className="btn danger btn-sm btn-error" style={{ marginLeft: 8 }}>Delete</button>
        </div>
      )
    }

  ];


  // hanle edit button
  const handleEditBtn = (row) => {
    console.log(row);
    setFormdata({
      id: row._id,
      name: row.name,
      city: row.city,
      age: row.age
    });
    document.getElementById('my_modal_1').showModal();
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => {
      return ({
        ...prev,
        [name]: value
      })
    });
  }

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:3001/contacts").then((res) => {
      setContacts(res.data.contacts);
    }).catch((err) => {

    }).finally(() => { setLoading(false) })
  }

  // handle update api call
  const handleUpdateApi = () => {

    setLoading(true);

    axios.put(`http://localhost:3001/contacts/${formdata.id}`, formdata).then((res) => {
      console.log("successfully updated");
      fetchData();
      document.getElementById('my_modal_1').close();

    }).catch(err => console.log(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData();
  }, []);


  const [fruits, setFruits] = useState(['apple']);

  const addFruit = (fruit) => {
    const newF = [...fruits, fruit];
    setFruits(newF);
  }

  return (
    <>
      <div className='pt-5 h-screen max-w-[1200px] bg-gray-100 mx-auto'>

        <Card fruits={fruits} addFruit={addFruit} />

        <h1 className='text-4xl text-blue-500 text-center'>My Contacts</h1>
        <div className='my-5 p-5'>
          <DataTable
            columns={columns}
            data={contacts}
            pagination
          />
          {
            loading && <div className='text-center'><span className="loading loading-dots loading-lg text-error"></span></div>
          }

        </div>
      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Update Contact!</h3>

          <div>
            <input type="text" value={formdata.name} onChange={handleOnChange} name='name' placeholder="name" className="mb-4 input input-bordered w-full max-w-xs" />
            <input type="text" value={formdata.city} onChange={handleOnChange} name='city' placeholder="city" className="mb-4 input input-bordered w-full max-w-xs" />
            <input type="text" value={formdata.age} onChange={handleOnChange} name='age' placeholder="age" className="mb-4 input input-bordered w-full max-w-xs" />

          </div>

          <div className="modal-action">
            <button className="btn" onClick={handleUpdateApi} disabled={loading}>
              {loading && <span className="loading loading-spinner text-error loading-sm"></span>}
              Update
            </button>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>


        </div>
      </dialog>


    </>
  )
}

export default App
