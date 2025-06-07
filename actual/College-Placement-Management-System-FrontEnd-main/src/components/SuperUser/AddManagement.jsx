import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../Toast';
import ModalBox from '../Modal';
import AddUserTable from '../AddUserTable';
import { BASE_URL } from '../../config/config';

function Management() {
  document.title = 'SPIS | Management Users';

  // Management users store here
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/management-users`);
      if (response.data) {
        setUsers(response.data.managementUsers);
      } else {
        console.warn('Response does not contain managementUsers:', response.data);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: ""
  });

  const handleDataChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleDeleteUser = (email) => {
    setUserToDelete(email);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/management-delete-user`,
        { email: userToDelete }
      );
      setShowModal(false);
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.log("Management => confirmDelete ==> ", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/management-add-user`,
        data
      );
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.log("handleSubmit => Management.jsx ==> ", error);
    }
  };

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <AddUserTable
        users={users}
        loading={loading}
        handleDeleteUser={handleDeleteUser}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        data={data}
        handleDataChange={handleDataChange}
        handleSubmit={handleSubmit}
        showModal={showModal}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
        userToDelete={userToDelete}
        userToAdd="Management Admin"
        handleApproveStudent={null}
      />

      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={`Do you want to delete ${userToDelete}?`}
        btn={"Delete"}
        confirmAction={confirmDelete}
      />
    </>
  );
}

export default Management;
