import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UpdateProduct.css'

function UpdateProduct({ closeupdate }) {
    const [dat, setdat] = useState([])
    var id = JSON.parse(localStorage.getItem('id'))
    var ProdKey = JSON.parse(localStorage.getItem('prodkey'));
    useEffect(() => {
        axios.get(`https://localhost:7077/api/webapi/getproductbyid?id=${ProdKey}`).then(response => {
            setdat(response.data);
            initialise(response.data);
        })
    }, [])
    function initialise(dat) {
        document.getElementById('Pname').value = dat.Pname;
        document.getElementById('Pquantity').value = dat.Pquantity;
        document.getElementById('Pprice').value = dat.Pprice;
    }
    function submit() {
        var Pname = document.getElementById('Pname').value;
        var Pquantity = document.getElementById('Pquantity').value;
        var Pprice = document.getElementById('Pprice').value;
        if (Pname === '')
            Pname = dat.Pname;
        if (Pquantity === '')
            Pquantity = dat.Pquantity;
        if (Pprice === '')
            Pprice = dat.Pprice;
        var Pamount = Pquantity * Pprice;
        axios.put('https://localhost:7077/api/webapi/updateproduct', {
            ProdKey: ProdKey,
            Pid: id,
            Pname: Pname,
            Pquantity: Pquantity,
            Pprice: Pprice,
            Pamount: Pamount
        })
        window.location.replace('/viewproduct');
    }
    return (
        <div>
            <div className='container cup'>
                <i className='headingup'>Updating Product : {ProdKey} ...</i>
                <div className="row up">
                    <form>
                        <span>Enter product name</span>
                        <input type="text" id="Pname" className='fcup' required />
                        <span>Enter product quantity</span>
                        <input type="number" id='Pquantity' className='fcup' required />
                        <span>Enter product price</span>
                        <input type="number" id='Pprice' className='fcup' required />
                    </form>
                </div>
                <div className='tempdiv'></div>
                <button className='btn btn-success buttonup' onClick={submit}>Update</button>
                <button className='btn btn-secondary closeup' onClick={() => closeupdate(false)}>Close</button>
            </div>
        </div>
    )
}

export default UpdateProduct