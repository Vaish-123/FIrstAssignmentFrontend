import axios from 'axios';
import './AddCustomer.css';

function AddCustomer({ closemodal }) {
    function sbt() {
        var Cname = document.getElementById('Cname').value;
        var Caddress = document.getElementById('Caddress').value;
        axios.post("https://localhost:7077/api/webapi/postcustomer",
            {
                Cname: Cname,
                Caddress: Caddress
            })
        window.location.reload();
    }

    return (
        <div className='container ac'>
            <div className="row at">
                <h5 className='headingac'>Add new customer</h5>
                <span>Enter name</span>
                <input type="text" id='Cname' className='form-control fcac' />
                <span>Enter address</span>
                <input type="text" id='Caddress' className='form-control fcac' />
                <button onClick={sbt} className="submitac btn btn-success mt-3">Add</button><br />
            </div>
            <button onClick={() => closemodal(false)} className="closeac btn btn-warning">Close</button>
        </div>
    )
}

export default AddCustomer