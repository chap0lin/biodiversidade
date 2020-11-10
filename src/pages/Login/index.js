import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Background from '../../components/background'
import api from '../../services/api'
import './styles.css'

function Login(){
    const history = useHistory()
    const [loginForm, setLoginForm] = useState({
        login: '',
        password: '',
    })
    function handleLogin(){
        try{
            api.post('services-login', loginForm).then(response => {
                history.push('/title', {params: response.data})
            }).catch(function (error) {
                if (error.response) {
                  // Request made and server responded
                  console.log(error.response.status);
                  alert(error.response.data.message)
                }else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('2Error', error.message);
                }
            })
        }catch(error){
            console.log('3' + error)
        }
        
    }
    function handleInputChange(event){
        const {name, value} = event.target
        setLoginForm({...loginForm, [name]: value})
    }
    return(
        <div id="page-login" style={{background: 'green'}}>
            <Background>
                <div className="logo-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="268" height="76" viewBox="0 0 268 76">
                    <text id="BIO" transform="translate(0 62)" fill="#fff" fontSize="57" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">BIO</tspan></text>
                    <text id="DIVERSIDADE" transform="translate(98 41)" fill="#fff" fontSize="28" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">DIVERSIDADE</tspan></text>
                    <text id="GENES" transform="translate(98 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">GENES</tspan></text>
                    <text id="ESPÉCIES" transform="translate(140 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ESPÉCIES</tspan></text>
                    <text id="ECOSSISTEMAS" transform="translate(193 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ECOSSISTEMAS</tspan></text>
                    <circle id="Elipse_1" data-name="Elipse 1" cx="1.5" cy="1.5" r="1.5" transform="translate(134 59)" fill="#fff"/>
                    <circle id="Elipse_2" data-name="Elipse 2" cx="1.5" cy="1.5" r="1.5" transform="translate(187 59)" fill="#fff"/>
                </svg>
                </div>
                <div className="login-container">
                    <h2 className="container-title">Entrar</h2>
                    <div className="input-field">
                        <input type="text" name="login" placeholder="nome de usuário"
                        onChange={handleInputChange} />
                    </div>
                    <div className="input-field">
                        <input type="text" name="password" placeholder="senha"
                        onChange={handleInputChange} />
                    </div>
                    
                    <button onClick={handleLogin}>ENTRAR</button>
                    
                    <p>Não possui conta? Cadastre-se</p>
                </div>
                <div className="anon-container">
                    <h2 className="container-title">Não quer criar conta?</h2>
                    <Link to="/title" >
                        <button>Entrar de forma Anônima</button>
                    </Link>
                </div>
            </Background>
        </div>
    )
}

export default Login