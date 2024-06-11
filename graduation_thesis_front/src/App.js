import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Info from './components/Info/Info';
import Navbar from './components/NavBar/NavBar';
import History from './components/History/History';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import DiagnosisAssessment from './components/DiagnosisAssessment/DiagnosisAssessment';
import { useState } from 'react';

function App() {
    const myWidth = 200;

    let [isLogin, setIsLogin] = useState(false);
    let [role, setRole] = useState('');
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [email, setEmail] = useState('');

    const conditions = [
        'катаракта. Катаракта — это помутнение хрусталика глаза, которое приводит к снижению зрения. Это состояние может возникнуть в любом возрасте, но чаще встречается у пожилых людей. При катаракте изображение становится мутным, расплывчатым, как будто смотришь через запотевшее стекло. ',
        'диабетическая ретинопатия. Диабетическая ретинопатия — это осложнение диабета, которое поражает кровеносные сосуды сетчатки глаза. Она развивается постепенно и может привести к серьезной потере зрения, если не предпринять своевременные меры. Симптомы могут включать размытое зрение, появление темных пятен или "плавающих" объектов перед глазами. ',
        'глаукома. Глаукома — это группа заболеваний, которые повреждают зрительный нерв, часто вследствие повышенного внутриглазного давления. Это может привести к постепенной потере зрения и слепоте, если не начать лечение вовремя. Глаукома часто протекает бессимптомно на ранних стадиях, поэтому её называют "тихим вором зрения". ',
        'здоровый глаз. Но в случае, если вы испытваете дискомфорт или боль, незамедлительно обратитесь к врачу. ',
    ];

    if (isLogin) {
        (async () => {
            const response = await fetch('http://127.0.0.1:8000/users/user/', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const content = await response.json();
            if (content) {
                setIsLogin(true);
                setRole(content.role);
                setName(content.name);
                setSurname(content.surname);
                setEmail(content.email);
            }
        })();
    }

    return (
        <div className="App">
            <Navbar
                setRole={setRole}
                role={role}
                drawerWidth={myWidth}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                content={
                    <Routes>
                        <Route
                            path=""
                            element={
                                <Home
                                    isLogin={isLogin}
                                    name={name}
                                    surname={surname}
                                    email={email}
                                    conditions={conditions}
                                />
                            }
                        ></Route>
                        <Route path="/info" element={<Info />}></Route>
                        {isLogin && (
                            <Route
                                path="/history"
                                element={<History email={email} />}
                            ></Route>
                        )}
                        <Route
                            path="/registration"
                            element={<RegistrationForm />}
                        ></Route>
                        <Route
                            path="/login"
                            element={
                                <LoginForm
                                    setIsLogin={setIsLogin}
                                    setRole={setRole}
                                />
                            }
                        ></Route>
                        {role === 'doctor' && (
                            <Route
                                path="/diagnosisAssessment"
                                element={
                                    <DiagnosisAssessment
                                        role={role}
                                        email={email}
                                    />
                                }
                            ></Route>
                        )}
                    </Routes>
                }
            />
        </div>
    );
}

export default App;
