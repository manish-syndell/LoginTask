import React, { useEffect, useState } from "react";
import Navbar from "../../Header/Navbar";
import Sidebar from "../../layout/Sidebar";
import styles from "./userRights.module.css";
import axios from "axios";

const CheckBoxGroup = ({ group, id }) => {
  const [permissions, setPermissions] = useState([]);

  const handleChecked = async (e) => {
    const { name, checked, value } = e.target;
    const permission = permissions.find(
      (p) => p.name === value && p.role_id === id
    );
    const newPermissions = [...permissions];
    if (checked && !permission) {
      // add permission
      newPermissions.push({ name: value, role_id: id });
      console.log("Added permission", newPermissions);
    } else if (!checked && permission) {
      // remove permission
      const index = newPermissions.indexOf(permission);
      newPermissions.splice(index, 1);
      console.log("Removed permission", newPermissions);
    }
    setPermissions(newPermissions);
    try {
      await axios.post(
        "http://localhost:5000/api/update/permissions",
        { id, permissions: newPermissions },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const getPermissions = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/permission/role",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setPermissions(data.permissions);
    } catch (error) {
      console.log("error: " + error);
    }
  };


  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <div>
      <ul>
        <li>
          <input
            type="checkbox"
            name={group}
            id={group + "_vehicleManagement"}
            checked={permissions.some(
              (p) => p.name === "vehicleManagement" && p.role_id === id
            )}
            onChange={handleChecked}
            value="vehicleManagement"
          />
          &nbsp;Vehicle Management
        </li>

        <li>
          <input
            type="checkbox"
            name={group}
            id={group + "_driverManagement"}
            checked={permissions.some(
              (p) => p.name === "driverManagement" && p.role_id === id
            )}
            onChange={handleChecked}
            value="driverManagement"
          />
          &nbsp;Driver Management
        </li>
        <li>
          <input
            type="checkbox"
            name={group}
            id={group + "_maintenance"}
            checked={permissions.some(
              (p) => p.name === "maintenance" && p.role_id === id
            )}
            onChange={handleChecked}
            value="maintenance"
          />
          &nbsp;Maintenance
        </li>
        <li>
          <input
            type="checkbox"
            name={group}
            id={group + "_reports"}
            checked={permissions.some(
              (p) => p.name === "reports" && p.role_id === id
            )}
            onChange={handleChecked}
            value="reports"
          />
          &nbsp;Reports
        </li>
      </ul>
    </div>
  );
};

const UserRights = () => {




  return (
    <>
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className={styles.container}>
          <div>
            <h3>Admin</h3>
            <CheckBoxGroup group={"admin"} id={1} />
          </div>
          <div>
            <h3>Agent</h3>
            <CheckBoxGroup group={"agent"} id={2} />
          </div>
          <div>
            <h3>Sales Agent</h3>
            <CheckBoxGroup group={"salesAgent"} id={3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRights;
