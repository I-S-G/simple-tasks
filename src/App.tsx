import '@mantine/core/styles.css';
import './App.scss'

import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import NavigationBar from './routes/Navigation Bar/navigation-bar';
import Home from './routes/Home/home';
import Authentication from './routes/Authentication/authentication';

import { useUserStore } from './store/user-store';
import { authListener } from './utils/firebase/firebase.utils';

function App() {

  const loadUser = useUserStore((store) => store.loadUser);
  const signOutUser = useUserStore((store) => store.signOutUser); 

  useEffect(() => {
    const unsubscribe = authListener((user) => {
      console.log(user);
      if (user) {
        const load = async () => {
          await loadUser(user.uid);
        } 
        load();
      } else {
        signOutUser();
      }
    });

    return unsubscribe;
  }, [])

  return (
    <Routes>
      <Route element= {<NavigationBar />} path='/'>
        <Route element= {<Home />} index />
        <Route element= {<Authentication />} path='/auth' />
      </Route>
    </Routes>
  )
}

export default App
