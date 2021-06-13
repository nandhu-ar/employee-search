import React, { useEffect, useState } from 'react';
import { registerEmployee, updateEmployee, deleteEmployee } from '../../api'
import './employees.scss'

const EmployeeDetails = (props) => {
    const { isEdit, employee, setIsDetailsScreen } = props;
    const [name, setName] = useState(employee?.Name || '');
    const [email, setEmail] = useState(employee?.EmailId || '')
    const [age, setAge] = useState(employee?.Age || null);
    const [address, setAddress] = useState(employee?.Address || '');
    const [phone, setPhone] = useState(employee?.MobileNumber || null);
    const [isValidForm, setValidForm] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deleteComplete, setIsDeleteComplete] = useState(false);

    const callRegisterApi = async (employeeDetails) => {
        setIsLoading(true)
        const { data } = isEdit ? await updateEmployee(employeeDetails) : await registerEmployee(employeeDetails);
        setErrorMessage(data.message);
        setIsLoading(false);
    }

    const callDeleteApi = async () => {
        try{
            setIsLoading(true);
            const { data } = await deleteEmployee(employee.EmployeeId);
            setIsLoading(false);
            setErrorMessage("Deleted Successfully");
        }
        catch(error){
            setErrorMessage(`Unable to delete`);
        }

    }

    const handleRegisterClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callRegisterApi({
            EmployeeId: employee?.EmployeeId,
            Name: name,
            EmailId: email,
            Age: age,
            Address: address,
            MobileNumber: phone
        })
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callDeleteApi();
    }

    const goBack = (e) => {
        setIsDetailsScreen(false)
    }

    useEffect(() => {
        if (name && email && age && address && phone) {
            setValidForm(true);
            setErrorMessage('');
        }
    }, [name, email, age, address, phone])

    useEffect(() => {
        console.log("values", employee)
    }, [])

    return (
        <div className="container mt-5">
            {isLoading ? <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div> :
                <form className="col-md-9 col-sm-12" noValidate>
                    <p className="fs-2 mb-3"> Register A New Employee</p>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" id="EmailId" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" id="Age" value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" id="Address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="number" className="form-control" id="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="btn btn-secondary mb-3" onClick={handleRegisterClick} disabled={!isValidForm}>{isEdit ? "Update Employee" : "Add Employee"}</button>
                        {isEdit ? <button type="submit" className="btn btn-secondary mb-3" onClick={handleDeleteClick}>Delete Employee</button> : null}
                        <button className="btn btn-secondary mb-3" onClick={goBack}> Go Back</button>
                    </div>

                    {errMessage ? <div className={`alert alert-${errMessage.includes("successfully saved") ? 'success' : 'danger'}`} role="alert">{errMessage}</div> : null}
                </form>
            }
        </div>
    )
}

export default EmployeeDetails;