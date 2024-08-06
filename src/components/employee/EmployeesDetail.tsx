import React, { useEffect, useState } from "react";
import { Employee, getEmployeesOn } from "../../data/employeesData";

const EmployeesDetail: React.FC = () => {
    const [id, setId] = useState<number | null>(null);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const employeesData = await getEmployeesOn();
            setEmployees(employeesData);
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (id !== null) {
            const foundEmployee = employees.find((emp) => emp.id === id) ?? null;
            setEmployee(foundEmployee);
        }
    }, [id, employees]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : null;
        setId(value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-center">
                    <div className="col-6 border">
                        <form className="p-3 mt-2 ">
                            <div className="mb-3">
                                <label className="form-label">Mời nhập mã nhân viên</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Mời nhập mã nhân viên"
                                    onChange={handleInputChange}
                                    value={id ?? ""}
                                />
                            </div>
                        </form>

                        {employee && (
                            <div className="row mt-3">
                                <div className="col-6">
                                    <h4>Thông tin nhân viên</h4>
                                    <img src={employee.avatar} alt="Avatar" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    <p>ID: {employee.id}</p>
                                    <p>Tên: {employee.name}</p>
                                    <p>Email: {employee.email}</p>
                                    <p>Điện thoại: {employee.phone}</p>
                                    <p>Chức vụ: {employee.role}</p>
                                    <p>Phòng ban: {employee.idDepartment}</p>
                                    <p>Giới tính: {employee.gender ? 'Nữ' : 'Nam'}</p>
                                    <p>Ngày sinh: {new Date(employee.brithDay).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesDetail;
