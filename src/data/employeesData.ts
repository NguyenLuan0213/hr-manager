import IMGNam from '../assets/images/nv/img_nam_avatar.png';
import IMGNu from '../assets/images/nv/img_nu_avatar.png';


export interface Employee {
    id: number;
    name: string;
    username: string;
    password: string;
    gender: boolean;
    brithDay: Date;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    idDepartment: number;
    status: boolean;
}

let Employees: Employee[] = [
    {
        id: 1,
        name: "Nguyen Ngoc Luan",
        username: "test1",
        password: "123456",
        email: "nguyenluan@gmail.com",
        phone: "155765495971474",
        gender: true,
        brithDay: new Date("Thu Jun 29 1972"),
        status: true,
        role: "Quản lý",
        idDepartment: 1,
        avatar: IMGNu,
    },
    {
        id: 2,
        name: "Hazel Kessler-Beier I",
        username: "Destiny54",
        password: "password2",
        email: "Taya.Hartmann@gmail.com",
        phone: "(205)29894384115",
        gender: true,
        brithDay: new Date("Sun Feb 26 1995"),
        status: true,
        role: "Nhân viên",
        idDepartment: 1,
        avatar: IMGNu,
    },
    {
        id: 3,
        name: "Katherine Lesch",
        username: "Diana14",
        password: "password3",
        email: "Olaf.West66@yahoo.com",
        phone: "17184691459473",
        gender: true,
        brithDay: new Date("Thu May 20 1982"),
        status: true,
        role: "Nhân viên",
        idDepartment: 1,
        avatar: IMGNu,
    },
    {
        id: 4,
        name: "Jerome Mann",
        username: "Mittie56",
        password: "password4",
        email: "Rex36@gmail.com",
        phone: "1212760479053722",
        gender: true,
        brithDay: new Date("Wed Aug 26 1987"),
        status: true,
        role: "Nhân viên",
        idDepartment: 1,
        avatar: IMGNu,

    },
    {
        id: 5,
        name: "Ervin Bechtelar",
        username: "shanelOrtiz47",
        password: "password5",
        email: "Keaton.Hoeger80@hotmail.com",
        phone: "16463079331",
        gender: true,
        brithDay: new Date("Tue Sep 24 1991"),
        status: true,
        role: "Nhân viên",
        idDepartment: 2,
        avatar: IMGNu,
    },
    {
        id: 6,
        name: "Florence Reilly",
        username: "Barry20",
        password: "password6",
        email: "Brett_OHara66@hotmail.com",
        phone: "12178004872",
        gender: false,
        brithDay: new Date("Wed Feb 08 1989"),
        status: true,
        role: "Nhân viên",
        idDepartment: 2,
        avatar: IMGNam,
    },
    {
        id: 7,
        name: "Patricia Predovic Jr.",
        username: "Beverly92",
        password: "password7",
        email: "Leonel.Rowe51@yahoo.com",
        phone: "165569989972069",
        gender: false,
        brithDay: new Date("Thu Feb 13 1997"),
        status: false,
        role: "Nhân viên",
        idDepartment: 2,
        avatar: IMGNam,
    },
    {
        id: 8,
        name: "Jesus Sawayn",
        username: "Bradford.Bradtke78",
        password: "password8",
        email: "Martine.Witting26@yahoo.com",
        phone: "(581)97530974635",
        gender: false,
        brithDay: new Date("Tue Jun 14 1988"),
        status: true,
        role: "Nhân viên",
        idDepartment: 2,
        avatar: IMGNam,
    },
    {
        id: 9,
        name: "Lester Sawayn Jr.",
        username: "Foster.Mohr68",
        password: "password9",
        email: "Kaelyn_Robel86@gmail.com",
        phone: "(899)40336229754",
        gender: false,
        brithDay: new Date("Tue Apr 03 1973"),
        status: true,
        role: "Nhân viên",
        idDepartment: 2,
        avatar: IMGNam,
    },
    {
        id: 10,
        name: "Philip Grady",
        username: "Mayra86",
        password: "password10",
        email: "Adrianna69@yahoo.com",
        phone: "(691)45214606612",
        gender: true,
        brithDay: new Date("Fri Jan 28 1977"),
        status: true,
        role: "Nhân viên",
        idDepartment: 2,
        avatar: IMGNam,
    }
];

export const getEmployeesOn = (): Employee[] => {
    return Employees.filter((employee) => employee.status === true);
};


export const getEmployeeByIdOn = (id: number): Employee | undefined => {
    return Employees
    .find((employee) => employee.id === id) &&
    Employees.find((employee) => employee.status === true);
}

let nextId = Employees.length + 1;

export const addEmployee = (newEmployee: Omit<Employee, 'id' | 'status'>) => {
    const employeeWithIdAndStatus = {
        ...newEmployee,
        id: nextId++,
        status: true
    };
    Employees.push(employeeWithIdAndStatus);
};
