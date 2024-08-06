import React, { useState } from "react";
import '../../assets/css/sideBar.css';
import '../../assets/css/style.css';
import Logo from '../../assets/images/icon/structure_16160483.png'
import LogoManager from '../../assets/images/icon/management.png'
import LogoDeparment from '../../assets/images/icon/department-svgrepo-com.svg'

interface SidebarProps {
    onEmployeesListClick: () => void;
    onDepartmentListClick: () => void;
    onEmployeeDetailClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onEmployeesListClick, onDepartmentListClick, onEmployeeDetailClick }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="bg-color sidebar p-2">
            <div className="m-2">
                <img src={Logo} alt="Logo" className="logo" />
                <span className='text-title'>QUẢN LÝ NHÂN SỰ</span>
            </div>
            <hr className="text-dark my-2" />
            <div className="list-group list-group-flush">
                <a className="bg-color list-group-item py-2 margin-custom" 
                onClick={onEmployeesListClick}>
                    <img src={LogoManager} alt="Logo" className="logo-item" />
                    <span className="fs-5 ">Danh sách nhân sự</span>
                </a>
                <a className="bg-color list-group-item py-2 margin-custom" 
                onClick={onEmployeeDetailClick}>
                    <i className="bi bi-people logo-item"></i>
                    <span className="fs-5 ">Chi tiết nhân sự</span>
                </a>
                <a className="bg-color list-group-item py-2 mt-1 margin-custom" 
                onClick={onDepartmentListClick}>
                    <img src={LogoDeparment} alt="Logo" className="logo-item" />
                    <span className="fs-5">Danh sách phòng ban</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
