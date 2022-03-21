import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AddCustomer from '../AddCustomer/AddCustomer';
import './ViewCustomer.css'

function ViewCustomer() {
    const [cus, setcus] = useState([])
    const [modal, setmodal] = useState(false)
    function abc(Cid) {
        localStorage.setItem('id', JSON.stringify(Cid))
    }
    useEffect(() => {
        axios.get("https://localhost:7077/api/webapi").then(response => {
            setcus(response.data);
        })
    }, [])

    function del(id) {
        var proceed = window.confirm("This will delete all products belong to the customer.")
        if (proceed) {
            axios.delete(`https://localhost:7077/api/webapi/deletecustomer?id=${id}`)
            window.location.reload();
        }
    }
    return (
        <div className='container'>
            <h1 className='headingvc'>Customer List</h1>
            <button onClick={() => setmodal(true)} className="btn btn-success buttonac">Add Customer</button>
            {modal && <AddCustomer closemodal={setmodal} />}
            <div className="row vt">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th className='th1' scope='col' style={{ paddingLeft: "15px" }}>No</th>
                            <th className='th2' scope="col">Customer Id</th>
                            <th className='th3' scope="col">Customer Name</th>
                            <th className='th4' scope="col">Customer Address</th>
                            <th className='th5' scope="col" style={{ paddingLeft: "120px" }}>More</th>
                        </tr>
                    </thead>
                </table>
                {
                    cus.map((obj, index) => {
                        return (
                            <div>
                                <table className="table table-hover table-dark">
                                    <tbody>
                                        <tr>
                                            <th className='tb1' scope="row">{index + 1}</th>
                                            <td className="tb2" style={{ paddingLeft: "38px" }}>{obj.Cid}</td>
                                            <td className='tb3' style={{ paddingLeft: "48px" }}>{obj.Cname}</td>
                                            <td className='tb4' style={{ paddingLeft: "50px" }}>{obj.Caddress}</td>
                                            <td className='tb5' style={{ paddingLeft: "40px" }}>
                                                <a className='btn btn-primary' href='/viewproduct' onClick={() => abc(obj.Cid)}>View/Add Products</a>
                                                <button className='btn btn-danger delvc' onClick={() => { del(obj.Cid) }}>Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default ViewCustomer