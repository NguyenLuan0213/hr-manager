import React, { useEffect, useState } from 'react';
import { Employee, getEmployeesOn, addEmployee } from '../../data/employeesData';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../assets/styles/employees.css';

const Employees: React.FC = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [employeesPerPage, setEmployeesPerPage] = useState<number>(5);
    const [showAddEmployeeBox, setShowAddEmployeeBox] = useState<boolean>(false);

    const [isFemale, setIsFemale] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [idDepartment, setIdDepartment] = useState<number>(0);
    const [brithDay, setBrithday] = useState<Date | undefined>(undefined);
    const [avatar, setAvatar] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = 'Họ và tên không hợp lệ';
        if (!email) newErrors.email = 'Email không hợp lệ';
        if (!phone || !/^\+?\d+$/.test(phone)) newErrors.phone = 'Số điện không hợp lệ';
        if (!username) newErrors.username = 'Username không hợp lệ';
        if (!password) newErrors.password = 'Password không hợp lệ';
        if (!role) newErrors.role = 'Chức vụ ko hợp lệ';
        if (!brithDay) newErrors.brithDay = 'Ngày sinh không hợp lệ';
        if (idDepartment < 1) newErrors.idDepartment = 'Mã phòng ban không hợp lệ';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleGender = () => {
        setIsFemale(!isFemale);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const auth = Cookies.get('auth');
        if (!auth) {
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        } else {
            setEmployees(getEmployeesOn());
        }
    }, [navigate]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        const employees = getEmployeesOn();
        const filteredEmployees = employees.filter((employee) => {
            return (
                employee.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                employee.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                employee.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
                employee.role.toLowerCase().includes(e.target.value.toLowerCase())
            );
        });
        setEmployees(filteredEmployees);
        setCurrentPage(1);
    };

    const handleAddEmployeeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const employee: Omit<Employee, 'id'> = {
                name,
                username,
                email,
                phone,
                password,
                role,
                idDepartment,
                brithDay: brithDay || new Date(),
                gender: isFemale,
                status: true,
                avatar
            };
            addEmployee(employee as Employee);
            alert('Thêm nhân viên thành công');
            setEmployees(getEmployeesOn());
            setShowAddEmployeeBox(false);
        }
    };

    const totalEmployees = employees.length;
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handleReset = () => {
        setName('');
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRole('');
        setIdDepartment(0);
        setBrithday(undefined);
        setAvatar('');
        setErrors({});
    };

    const handelEmployeeDetail = (id: number) => {
        navigate(`/employee/${id}`);
    }

    return (
        <div className='p-3'>
            <div className="table-responsive mt-3">
                <h1 className='title-custum'>Danh sách nhân viên</h1>
                <div className='row mb-2'>
                    <div className='col-4 border'>
                        <input
                            type="text"
                            className='form-control search-input'
                            placeholder='Tìm kiếm theo Tên, Số điện thoại, Email'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className='col-4'>
                        <input
                            type='number'
                            className='form-control paging-custom'
                            min={1}
                            value={employeesPerPage}
                            onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
                        />
                    </div>
                    <div className='col-4'>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary' onClick={() => setShowAddEmployeeBox(!showAddEmployeeBox)}>
                                Thêm nhân viên
                            </button>
                        </div>
                    </div>
                </div>

                {showAddEmployeeBox && (
                    <div className='container col-5 mt-3 mb-3 d-flex justify-content-center add-custum'>
                        <div className="add-employee-box">
                            <h3>Thêm nhân viên</h3>
                            <form onSubmit={handleAddEmployeeSubmit}>
                                <div className="mb-2">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handleAvatarChange}
                                            />
                                            {avatar && (
                                                <div className="mt-2">
                                                    <img src={avatar} alt="Avatar preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <label className="form-label">Họ và tên</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder="Nhập tên"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {errors.name && <p className="text-danger">{errors.name}</p>}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className='form-control'
                                        placeholder="Nhập email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="mb-2">
                                    <div>
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder="Nhập username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        {errors.username && <p className="text-danger">{errors.username}</p>}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div>
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className='form-control'
                                            placeholder="Nhập password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {errors.password && <p className="text-danger">{errors.password}</p>}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder="Nhập số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Chức vụ</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder="Nhập chức vụ"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    {errors.role && <p className="text-danger">{errors.role}</p>}
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Giới tính</label>
                                    <button
                                        type="button"
                                        className="btn form-control btn-gender"
                                        onClick={toggleGender}>
                                        {isFemale ? 'Female' : 'Male'}
                                    </button>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Mã phòng ban</label>
                                    <input
                                        type="number"
                                        className='form-control'
                                        placeholder="Nhập mã phòng ban"
                                        value={idDepartment}
                                        onChange={(e) => setIdDepartment(Number(e.target.value))}
                                    />
                                    {errors.idDepartment && <p className="text-danger">{errors.idDepartment}</p>}
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Chọn ngày sinh</label>
                                    <input
                                        type="date"
                                        id="brithDay"
                                        className="form-control"
                                        value={brithDay ? brithDay.toISOString().split('T')[0] : ''}
                                        onChange={(e) => setBrithday(e.target.value ? new Date(e.target.value) : undefined)}
                                    />
                                </div>

                                <div className="container">
                                    <div className='row justify-content-center'>
                                        <div className='col-auto'>
                                            <button type="button" className="btn btn-light border me-1 mb-1 mt-1" onClick={handleReset}>
                                                Đặt lại
                                            </button>
                                        </div>
                                        <div className='col-auto'>
                                            <button type="submit" className="btn btn-primary me-1 mb-1">
                                                Thêm nhân viên
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

                <table className="table table-striped table-hover table-borderless table-primary align-middle">
                    <thead className="table-light">
                        <tr>
                            <th className='th-custom'>Họ và tên</th>
                            <th className='th-custom'>Email</th>
                            <th className='th-custom'>Số điện thoại</th>
                            <th className='th-custom'>Chức vụ</th>
                            <th className='th-custom'>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentEmployees.map((employee) => (
                            <tr className="table-primary"
                             key={employee.id}
                             onClick={()=>handelEmployeeDetail(employee.id)}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <span className={employee.status ? 'status-active' : 'status-inactive'}>
                                        {employee.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}> Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}> Next </button>
                </div>
            </div>
        </div>
    );
};

export default Employees;
