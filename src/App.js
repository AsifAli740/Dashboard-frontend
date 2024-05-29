import logo from './logo.svg';
import './App.css';
import {Routes,BrowserRouter, Route} from "react-router-dom"
import SignIn from './mainFolder/SignIn';
import Dashboard from './mainFolder/Dashboard';
import SignUp from './mainFolder/SignUp';
import { contextVal } from './mainFolder/context';
import { useEffect, useState } from 'react';
import { SuccessSnackbar } from './mainFolder/SnackBar';
import BasicCard from './mainFolder/UserProfile';
import OutlinedCard from './mainFolder/UserProfile';
import ProfileCard from './mainFolder/UserProfile';
import UserDataTable from './mainFolder/Table';
import PrivateRouting from './PrivateRouting';
import ActiveUser from './mainFolder/ActiveUser';
import CsvFile from './mainFolder/Csv';
import Trash from './mainFolder/Trash';

function App() {
  const [snackbar, setSnackbar] = useState({state:false, message: null, severity: null})
  const [user, setUser] = useState({})
  useEffect(()=>{
    let userData = localStorage.getItem("user")
    if(userData){
      setUser(userData)
    }
  },[user])
  return (
    <div className="App">
      <BrowserRouter>
      <contextVal.Provider value={{snackbar,setSnackbar, user, setUser}}>

      <Routes>
        <Route path='/' element={<SignIn  />}/>
        <Route path='signup' element={<SignUp />}/>
        <Route element={<PrivateRouting />}>

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<UserDataTable />}/>
          <Route path='profile' element={<ProfileCard />}/>
          <Route path='activeuser' element={<ActiveUser />}/>
          <Route path='csv' element={<CsvFile />}/>
          <Route path='trash' element={<Trash />}/>
        </Route>
        </Route>
      </Routes>
        <SuccessSnackbar snackbar={snackbar} setSnackbar={setSnackbar} /> 
      </contextVal.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
