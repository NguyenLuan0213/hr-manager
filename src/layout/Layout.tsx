import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import "../assets/css/layout.css";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import EmployeesList from "../components/employee/Employees";
import DepartmentList from "../components/department/Department";
import EmployeesDetail from "../components/employee/EmployeesDetail";

const Layout: React.FC = () => {
    const [toggle, setToggle] = useState<boolean>(true);
    const [activeList, setActiveList] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleEmployeesListClick = () => {
        setActiveList(activeList === "employees" ? null : "employees");
    };

    const handleDepartmentListClick = () => {
        setActiveList(activeList === "departments" ? null : "departments");
    };

    const handleEmployeeDetailClick = () => {
        setActiveList(activeList === "employee:id" ? null : "employee:id");
    }

    useEffect(() => {
        const auth = Cookies.get('auth');
        if (!auth) {
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        }
    }, []);

    return (
        <div className="container-fluid min-vh-100">
            <div className="row">
                {toggle && (
                    <div className="col-custom bg-color vh-100 position-fixed">
                        <Sidebar
                            onEmployeesListClick={handleEmployeesListClick}
                            onDepartmentListClick={handleDepartmentListClick}
                            onEmployeeDetailClick={handleEmployeeDetailClick}
                        />
                    </div>
                )}
                {toggle && <div className="col-custom"></div>}
                <div className={`col ${toggle ? 'offset-custom' : ''}`}>
                    <Header onToggle={handleToggle} />
                    <div className="main">
                        {activeList === "employees" && <EmployeesList />}
                        {activeList === "employee:id" && <EmployeesDetail />}
                        {activeList === "departments" && <DepartmentList />}
                        {activeList === null && <Outlet />}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;
