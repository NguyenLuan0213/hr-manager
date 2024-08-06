import React, { useEffect, useState } from 'react';
import '../../assets/css/login.css';
import { Employee, getEmployeesOn } from '../../data/employeesData';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = Cookie.get('auth');
        if(auth === 'you-are-authenticated') {
            navigate('/');
        }
    },[navigate]);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        if(username === '' || password === '') {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        else {
            const employees: Employee[] = getEmployeesOn();
            const employee = employees.find(e => e.username === username && e.password === password);
            console.log(employee);
            if(employee) {
                alert('Đã Login thành công');
                navigate('/');
                Cookie.set('auth', 'you-are-authenticated');
                Cookie.set('userId', JSON.stringify(employee.id));
            }
            else {
                alert('Login thất bại');
            }
        }
    }

    return (
        <div className="row h-100">
            <div className="col-lg-5 col-12">
                <div className='auth-left'>
                    <div className="login-title">
                        <h3>Login</h3>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="form-group position-relative mb-4">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>
                                </div>
                                <input 
                                    type="text"
                                    className="form-control form-control-xl"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="form-group position-relative mb-4">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-shield-lock"></i>
                                    </span>
                                </div>
                                <input 
                                    type="password"
                                    className="form-control form-control-xl"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="form-check form-check-lg d-flex justify-content-center">
                            <button className="btn btn-primary btn-block">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-7 col-12">
                <div>
                    <img 
                        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" 
                        alt="Login" 
                        className="img-fluid min-vh-100" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
