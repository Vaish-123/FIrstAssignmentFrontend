import axios from 'axios';
import React from 'react';
import './AddProduct.css'

function AddProduct({ CloseModal }) {
    function submit() {
        var Pid = JSON.parse(localStorage.getItem('id'));
        var Pname = document.getElementById('Pname').value;
        var Pquantity = document.getElementById('Pquantity').value;
        var Pprice = document.getElementById('Pprice').value;
        var Pamount = Pquantity * Pprice;
        axios.post('https://localhost:7077/api/webapi/postproduct', {
            Pid: Pid,
            Pname: Pname,
            Pquantity: Pquantity,
            Pprice: Pprice,
            Pamount: Pamount
        })
        window.location.replace('/viewproduct');
    }

    return (
        <div>
            <div className='container cap'>
                <i className='headingap'>Adding Product ...</i>
                <div className="row ap">
                    <form>
                        <span>Enter product name</span>
                        <input type="text" id="Pname" className='fcap' required />
                        <span>Enter product quantity</span>
                        <input type="number" id='Pquantity' className='fcap' required />
                        <span>Enter product price</span>
                        <input type="number" id='Pprice' className='fcap' required />
                    </form>
                </div>
                <div className='tempdiv'></div>
                <button className='btn btn-success buttonap' onClick={submit}>Add</button>
                <button className='btn btn-secondary closeap' onClick={() => CloseModal(false)}>Close</button>
            </div>
        </div>
    )
}

export default AddProduct