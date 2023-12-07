"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CreateToast from "@/lib/createToast";
import GETDOC from "@/lib/getDoc";
import decrypt from "@/lib/decrypt";
import GETCOLLECTION from "@/lib/getCollection";
import SETDOC from "@/lib/setDoc";
import MyModal from "@/app/components/PopUps/Confirm/Confirm";
const Users = () => {
  const [ActiveUser, setActiveUser] = useState(
    decrypt(JSON.parse(sessionStorage.getItem("activeUser")).id)
  );
  const [userList, setUserList] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = (id, username) => {
    DeleteUser(id, username);
    handleCloseModal();
  };
  useEffect(() => {
    const fetchData = async () => {
      setActiveUser(await GETDOC("users", ActiveUser));
      const UserList = await GETCOLLECTION("users");
      setUserList(UserList.filter((user) => user.deleteUser === false));
    };
    fetchData();
  }, []);
  const DeleteUser = async (id) => {
    const targetUser = await GETDOC("users", id);
    await SETDOC("users", id, { ...targetUser, deleteUser: true });
    const UserList = await GETCOLLECTION("users");
    setUserList(UserList.filter((user) => user.deleteUser === false));
    CreateToast("user has been deleted", "success");
  };

  const ChangeRole = async (id, newValue) => {
    CreateToast("Changing role..", "info");
    const targetUser = userList.find((user) => {
      return user.id == id;
    });

    await SETDOC("users", id, { ...targetUser, Role: newValue });
    const UserList = await GETCOLLECTION("users");
    setUserList(UserList.filter((user) => user.deleteUser === false));
    CreateToast(
      `Changed ${targetUser.Fname} ${targetUser.Lname} to ${newValue}!`,
      "success"
    );
  };
  const columns = [
    {
      name: "UserName",
      selector: (row) => row.UserName,
      sortable: true,
      center: true,
    },
    {
      name: "First Name",
      selector: (row) => row.FirstName,
      sortable: true,
      center: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.LastName,
      sortable: true,
      center: true,
    },
    {
      name: "Joined At",
      selector: (row) => row.joinedAt,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      center: true,
      width: "220px",
    },

    {
      name: "Role",
      selector: (row) => row.selectedRole,
      sortable: true,
      center: true,
      cell: (row) =>
        ActiveUser.Role === "Owner" ? (
          row.selectedRole === "Owner" ? (
            "Owner"
          ) : (
            <div className="select-container">
              <select
                className="styled-select"
                value={row.selectedRole}
                onChange={(e) => {
                  ChangeRole(row.id, e.target.value);
                  row.selectedRole = e.target.value;
                }}
              >
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>
          )
        ) : (
          row.selectedRole
        ),
    },
    {
      name: "Active",
      selector: (row) => row.loggedIn,
      sortable: true,
      center: true,
    },
    {
      name: "Options",
      selector: (row) => row.options,
      center: true,
      width: "250px",
    },
  ];
  const data = userList.map((User) => {
    return {
      id: User.id,
      UserName: User.Username,
      FirstName: User.Fname,
      LastName: User.Lname,
      joinedAt: User.joinedAt,
      Email: User.email,
      loggedIn: User.Active ? "Yes" : "No",
      selectedRole: User.Role,

      options: (
        <div className="Button-Wrapper">
          <button
            className="Button Details"
            onClick={() => {
              window.location.href = `/Dashboard/Users/${User.id}`;
            }}
          >
            Details
          </button>
          {User.id === ActiveUser.id ||
          User.Role === "Owner" ||
          (User.Role === "Admin" && ActiveUser.Role == "Admin") ? (
            ""
          ) : (
            <button
              className="Button Danger"
              onClick={() => {
                setTargetUser(User);
                handleShowModal();
              }}
            >
              Delete
            </button>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="Users">
      {showModal && (
        <MyModal
          className="Confirm"
          show={showModal}
          handleClose={handleCloseModal}
          title="Delete Account"
          primaryButtonText={`Delete ${targetUser.Username}`}
          handlePrimaryAction={() => {
            handlePrimaryAction(targetUser.id, targetUser.Username);
          }}
        >
          <>
            <p style={{ textAlign: "center" }}>
              are you sure you want to delete {targetUser.Username}? this action
              can not be undone
            </p>
          </>
        </MyModal>
      )}
      <h1 className="animate__animated animate__fast animate__backInDown ql-align-center">
        Users
      </h1>
      <DataTable
        className="animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Users;
