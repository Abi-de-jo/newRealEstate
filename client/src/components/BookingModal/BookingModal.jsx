import React, { useContext, useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
 import UserDetailContext from '../../context/UserDetailsContext.js';
 import './BookingModal.css';

const BookingModal = ({ opened, setOpened, propertyId }) => {
  const { userDetails: { token } } = useContext(UserDetailContext);
   const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) setEmail(savedEmail);
  }, [opened]);
 

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your dates"
      centered
      size="sm"
    >
      <div className="flex flex-col items-center space-y-4 p-4">
        <p className="text-gray-700">Agent Email: <strong>{email}</strong></p>
        <p className="text-gray-700 bg-teal-300 p-2 rounded-sm">Property ID: <strong>{propertyId}</strong></p>

        

        

        
      </div>
    </Modal>
  );
};

export default BookingModal;
