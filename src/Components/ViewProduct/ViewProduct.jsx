import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import UpdateProduct from '../UpdateProduct/UpdateProduct';
import './ViewProduct.css'

function ViewProduct() {
  const [prod, setprod] = useState([]);
  const [Modal, setModal] = useState(false);
  const [update, setupdate] = useState(false);
  var data = JSON.parse(localStorage.getItem('id'))
  function updateprod(ProdKey) {
    localStorage.setItem('prodkey', JSON.stringify(ProdKey));
    if(!update)
    {
      setupdate(true)
      setModal(false)
    }
    else
    setupdate(false)
  }
  function del(id) {
    axios.delete(`https://localhost:7077/api/webapi/deleteproduct?id=${id}`)
    window.location.replace('/viewproduct')
  }
  useEffect(() => {
    axios.get(`https://localhost:7077/api/webapi/getproduct?id=${data}`).then(response => {
      setprod(response.data)
    })
  }, [])

  return (
    <div className='container'>
      <div>
      <a href='/' className='btn btn-primary homevp'>View Customers</a>
      <h1 className='headingvp'>Product Details</h1>
      </div>
      {update && <UpdateProduct closeupdate={setupdate} />}
      <button className="btn btn-success buttonvp" onClick={() => {
        if (Modal)
        setModal(false)
        else
        {
          setupdate(false)
          setModal(true)
        }
      }}>Add Product</button>
      {Modal && <AddProduct CloseModal={setModal} />}
      <div className='row vp'>
        <table className='table table-hover table-dark'>
          <thead>
            <tr>
              <th className='thvp1' scope='col'>Product id/Key</th>
              <th className='thvp2' scope='col'>Product name</th>
              <th className='thvp3' scope='col'>Product Price</th>
              <th className='thvp4' scope='col'>Product Quantity</th>
              <th className='thvp5' scope='col'>Product Amount</th>
              <th className='thvp6' scope='col' style={{ paddingLeft: "50px" }}>More</th>
            </tr>
          </thead>
        </table>
        {
          prod.map((obj) => {
            return (
              <div>
                <table className="table table-hover table-dark">
                  <tbody>
                    <tr>
                      <th className='tbvp1' scope='row' style={{ paddingLeft: "25px" }}>{obj.Pid} / {obj.ProdKey}</th>
                      <td className='tbvp2' style={{ paddingLeft: "30px" }}>{obj.Pname}</td>
                      <td className='tbvp3' style={{ paddingLeft: "40px" }}>{obj.Pprice}</td>
                      <td className='tbvp4' style={{ paddingLeft: "65px" }}>{obj.Pquantity}</td>
                      <td className='tbvp5' style={{ paddingLeft: "60px" }}>{obj.Pamount}</td>
                      <td className='tbvp6'>
                        <button className='btn btn-info' onClick={() => updateprod(obj.ProdKey)}>Update</button>
                        <button className=' btn btn-danger deletevp' onClick={() => del(obj.ProdKey)}>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ViewProduct