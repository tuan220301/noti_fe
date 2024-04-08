import React, { useState } from "react";
import { api, foodType } from "../constant/urtls";
import { Button, Modal } from "flowbite-react";
type SendNotificateProps = {
    item: foodType;
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    setReload: (reload: boolean) => void;
    reload: boolean;
};
const SendNotificate = (props: SendNotificateProps) => {
    const { item, openModal, setOpenModal, setReload, reload } = props;
    const [formData, setFormData] = useState({
        _id: item._id,
        title: '',
        body: '',
    });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSendNotification = () => {
        fetch(`${api}/device/sendNotification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    setOpenModal(false);
                    throw new Error('Network response was not ok');
                }
                setReload(!reload);
                setOpenModal(false);
                // Xử lý phản hồi từ API nếu cần
            })
            .catch(error => {
                setOpenModal(false);
                console.error('There was a problem with your fetch operation:', error);
                // Xử lý lỗi nếu cần
            });
    };

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Gửi thông báo</Modal.Header>
            <Modal.Body >
                <div className="flex flex-col gap-10">

                    <label>
                        Tiêu đề:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            className="ml-2 w-80 h-10 p-2"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Nội dung:
                        <input
                            type="text"
                            name="body"
                            className="ml-2 w-80 h-10 p-2"
                            value={formData.body}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSendNotification}>Gửi thông báo</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>Hủy</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default SendNotificate;  