import React from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { Button, Modal } from "flowbite-react";
import { foodType } from "../constant/urtls";

type AddNewModalProps = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    handleAddNew: () => void;
    formData: foodType;
    setFormData: (fromData: foodType) => void;
};
const AddNewModal = (props: AddNewModalProps) => {
    const { openModal, setOpenModal, formData, handleAddNew, setFormData } = props;
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert hình ảnh sang base64 và cập nhật state
                setFormData({
                    ...formData,
                    image: reader.result as string // Chuyển đổi thành base64
                });
            };
            reader.readAsDataURL(file); // Đọc hình ảnh dưới dạng base64
        }
    };


    return (

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Thêm mới khu vực</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 flex flex-col">
                    <label>
                        Tên:
                        <input
                            className="ml-10 w-40 h-10 p-2"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Hình ảnh:
                        <input
                            className="ml-10 w-40 h-10 p-2"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    <label className="flex flex-row items-center">
                        Mô tả:
                        <textarea
                            className="ml-10 w-80 h-20 p-2"
                            name="des"
                            value={formData.des}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Trạng thái:
                        <input
                            className="ml-10 w-40 h-10 p-2"
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Vĩ độ (Lat):
                        <input
                            className="ml-10 w-40 h-10 p-2"
                            type="number"
                            name="lat"
                            value={formData.lat}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Kinh độ (Lng):
                        <input
                            className="ml-10 w-40 h-10 p-2"
                            type="number"
                            name="lng"
                            value={formData.lng}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Địa chỉ (Street):
                        <input
                            className="ml-10 w-80 h-10 p-2"
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleAddNew}>Lưu</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewModal;