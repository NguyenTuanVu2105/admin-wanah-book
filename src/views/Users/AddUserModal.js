import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const AddUserModal = (props) => {
    const {show, setShow} = props
    return (
        <Modal isOpen={show}>
            <ModalHeader toggle={() => setShow(false)}>Add User</ModalHeader>
            <ModalBody>
            </ModalBody>
        </Modal>
    )
}

export default AddUserModal;
