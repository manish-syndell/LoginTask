import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLayoutDashboard, LuUserCog } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { GiRingingBell } from "react-icons/gi";
import { BsPeople, BsChat } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdComputer } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../action";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const path = location.pathname;
    console.log(path);
    setActiveLink(path);
    if (!user) {
      navigate("/login");
    }
  }, [user, location, activeLink,navigate]);

  return (
    <>
      <div className={styles.sidebar}>
        {
            user?.role === 'admin' && <ul>
            <li>
              <span
                className={activeLink === "/dashboard" ? styles.indicator : styles.indicatorrest}
              ></span>
              <LuLayoutDashboard />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span
                className={
                  activeLink === "/vehiclemanagement" ? styles.indicator : styles.indicatorrest
                }
              ></span>
              <TbTruckDelivery />
              <Link to="/vehiclemanagement">Vehicle Management</Link>
            </li>
            <li>
              <span
                className={
                  activeLink === "/drivermanagement" ? styles.indicator : styles.indicatorrest
                }
              ></span>
              <LuUserCog />
              <Link to="/drivermanagement">Driver Management</Link>
            </li>
            <li>
              <span
                className={
                  activeLink === "/usermanagement" ? styles.indicator : styles.indicatorrest
                }
              ></span>
              <BsPeople />
              <Link to="/usermanagement">User management</Link>
            </li>
            <li>
              <span
                className={activeLink === "/maintenance" ? styles.indicator : styles.indicatorrest}
              ></span>
              <MdComputer />
              <Link to="/maintenance">Maintenance</Link>
            </li>
            <li>
              <span
                className={activeLink === "/support" ? styles.indicator :styles.indicatorrest}
              ></span>
              <BsChat />
              <Link to="/support">Support/Help</Link>
            </li>
            <li>
              <span
                className={activeLink === "/reports" ? styles.indicator : styles.indicatorrest}
              ></span>
              <HiOutlineDocumentReport />
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <span
                className={activeLink === "/alerts" ? styles.indicator : styles.indicatorrest}
              ></span>
              <GiRingingBell />
              <Link to="/alerts">Alert/Notifications</Link>
            </li>
            <li>
              <span></span>
              <IoMdLogOut />
              <Link onClick={logoutHandler}>Logout</Link>
            </li>
          </ul>
        }
        {
            user?.role === 'agent' && 
            <ul>
                 <li>
              <span
                className={activeLink === "/maintenance" ? styles.indicator : styles.indicatorrest}
              ></span>
              <MdComputer />
              <Link to="/maintenance">Maintenance</Link>
            </li>
            <li>
              <span
                className={activeLink === "/reports" ? styles.indicator : styles.indicatorrest}
              ></span>
              <HiOutlineDocumentReport />
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <span></span>
              <IoMdLogOut />
              <Link onClick={logoutHandler}>Logout</Link>
            </li>
            </ul>
        }
      </div>
    </>
  );
};

export default Sidebar;
