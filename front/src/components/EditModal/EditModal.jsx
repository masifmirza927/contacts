import React, { useEffect, useState } from 'react'

const EditModal = (props) => {
console.log("row", props.row);
    const [formData, setFormData] = useState({
        name: '',
        city: ''
      });  

      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    useEffect(() => {
        
        if (props.contactEdit) {
          setFormData({
            name: props.contactEdit.name || '',
            city: props.contactEdit.city || ''
          });
        }
      }, [props.contactEdit]);

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">

                <h3 className="font-bold text-lg mb-4">Update Contact</h3>


                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" value={formData.name} onChange={handleChange} placeholder="Name" className="mb-3 input input-bordered w-full max-w-xs" />
                    <input type="text" value={formData.city} onChange={handleChange} placeholder="City" className="mb-3 input input-bordered w-full max-w-xs" />
                </form>


                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default EditModal