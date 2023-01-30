import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import './App.css';
import { getToken, handleAuth0Auth } from './utils/utilities';
import parse from 'html-react-parser';
import { Navbar } from './components/Navbar'
import { AuthContext } from "./components/context/Context";
import {JSONTable} from "./components/Table";

interface Inputs {
  email: string;
  password: string
};

interface TokenData  {
  access_token: string,
  expires_in: number,
  "not-before-policy": number, 
  refresh_expires_in: number,
  refresh_token: string,
  scope: string,
  session_state: string,
  token_type: string
}

export default function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [html, setHTML] = useState({__html: ""});
  const [users, setUsers ] = useState({data: []});
  const [isAuth, setIsAuth] = useState<boolean>(false)
  

  const onSubmit: SubmitHandler<Inputs> = data => {
    const response = getToken(data.email, data.password).then((r) => onAuthorization(r)).then(() => setIsAuth(true))
  };

  const onAuthorization = async (data: TokenData) => {
    const response = handleAuth0Auth(data.access_token, data.token_type, data.expires_in, data.refresh_token, data.scope, data.session_state)
    .then((v) => {
      if (typeof(v) !== "object") {
        console.log(v)
        setHTML({__html: v})
      } else {
        setUsers({data: v})
      }
    });
    console.log(response)
  }

  var page;
  if ((html.__html) && (typeof(html.__html) !== "object")) page = parse(html.__html)

  return (
    <AuthContext.Provider value = {{isAuth, setIsAuth}}>
    <div className="App">
      {isAuth ? 
        <div>
          <Navbar/>
          <div className="wrapper">
              <JSONTable data={users.data}/>
            {page ? 
              <div>{page}</div>
            :
              null}
          </div> 
        </div>
        : 
        <div className='wrapper'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input 
              className="my-input" 
              type='text' 
              placeholder='Email'
              value=""
              {...register("email", {required: true})}
            />
            {errors.email && <span>Email is required!</span>}
            <input
              className="my-input" 
              type="password"
              placeholder="Password"
              value=""
              {...register("password", {required: true})}
            />
            {errors.password && <span>Password is required!</span>}
            <button className="btn-submit" type='submit'>Submit</button>
        </form>
      </div>
    }
    </div>
    </AuthContext.Provider>
  );
}
