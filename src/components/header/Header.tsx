import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../assets/css/header.css';
import "bootstrap/js/dist/dropdown";
import Logout from '../../modules/authentication/Logout';

interface HeaderProps {
    onToggle: () => void; // Nhận hàm Toggle từ Layout
}

const Header: React.FC<HeaderProps> = ({ onToggle }) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-white bg-white px-4 border-bottom">
            <a className="navbar-brand bi bi-justify-left fs-4 custum_hover" onClick={onToggle}></a>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="dropdownId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="bi bi-person-circle fs-3"></i>
                        </a>
                        <div className="dropdown-menu custom-dropdown" aria-labelledby="dropdownId">
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" >{<Logout />}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
