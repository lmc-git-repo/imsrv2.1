import { Modal, Button } from 'flowbite-react';

export default function Show({ show, onClose, tv }) {
    if (!tv) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>Television Details</Modal.Header>

            <Modal.Body>
                <div className="space-y-3 text-gray-300">

                    <p><strong>ID:</strong> {tv.TID}</p>
                    <p><strong>Brand:</strong> {tv.brand}</p>
                    <p><strong>Model:</strong> {tv.model}</p>
                    <p><strong>Asset Tag:</strong> {tv.asset_tag}</p>
                    <p><strong>Location:</strong> {tv.location}</p>
                    <p><strong>Serial Number:</strong> {tv.serial_number}</p>
                    <p><strong>Status:</strong> {tv.status}</p>

                    <p><strong>Created By:</strong> {tv.createdBy?.name}</p>
                    <p><strong>Updated By:</strong> {tv.updatedBy?.name}</p>
                    <p><strong>Created At:</strong> {tv.created_at}</p>

                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}