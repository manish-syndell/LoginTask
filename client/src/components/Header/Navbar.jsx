import React from "react";
import styles from "./navbar.module.css";
import { FiSearch } from "react-icons/fi";
import { HiBell } from "react-icons/hi";
import {FaUserCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


const Navbar = () => {

  const {user} = useSelector((state)=>state.user)



  return (
    <>
      <header className={styles.mainContainer}>
        <nav>
          <div className={styles.leftBox}>
            <h1>Tyreoo</h1>
            <div>
              <input type="text" />
              <span>
                <FiSearch />
              </span>
            </div>
          </div>
          <div className={styles.rightBox}>
            {
              user ? 
              <>
              <div className={styles.notification}>
              <HiBell />
              <span>2</span>
            </div>
            <div className={styles.profile}>
              <FaUserCircle/>
              <span>
               {user.name} <br/> {user.role}
              </span>
            </div></> : 
            <Link to='/login'>Login</Link>
            }
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
