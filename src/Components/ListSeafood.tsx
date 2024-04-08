import React, { useEffect, useState } from "react";
import { api, foodType } from "../constant/urtls";
import { Button } from "flowbite-react";
import AddNewModal from "./Addnew";
import SendNotificate from "./SendNotificate";
const ListSeafood = () => {
    const [seafoodList, setSeafoodList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalNoti, setOpenModalNoti] = useState(false);
    const [action, setAction] = useState('');
    const [item, setItem] = useState({
        _id: '',
        des: '',
        image: '',
        lat: 0,
        lng: 0,
        street: '',
        name: '',
        status: '',
    } as foodType);
    const [reload, setReload] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        des: '',
        image: '',
        lat: 0,
        lng: 0,
        street: '',
        name: '',
        status: ''
    } as foodType);
    useEffect(() => {
        fetchData();
    }, [reload]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${api}/seafood/getAll`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('data: ', data);
            setSeafoodList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };
    const handleClickAddnew = () => {
        formData.lat = formData.lat * 1;
        formData.lng = formData.lng * 1;
        setLoading(true);
        const type = action === 'ADD' ? `${api}/seafood/addOne` : `${api}/seafood/update/${formData._id}`;
        fetch(type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    setLoading(false);
                    setReload(!reload);
                    setOpenModal(false);
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(data => {
                // Xử lý dữ liệu trả về từ API nếu cần
                setLoading(false);
                setOpenModal(false);
                console.log('Response from server:', data);
                setReload(!reload);
            })
            .catch(error => {
                setLoading(false);
                setOpenModal(false);
                console.error('There was a problem with your fetch operation:', error);
                // Xử lý lỗi nếu cần
            });

    };
    const handleSelectItem = (item: foodType) => {
        console.log('item: ', item);
        setItem(item);
        setOpenModalNoti(true);
    };
    const handleAddNew = () => {
        setAction('ADD');
        setFormData({
            _id: '',
            des: '',
            image: '',
            lat: 0,
            lng: 0,
            street: '',
            name: '',
            status: ''
        });
        setOpenModal(true);
    };
    const handleEdit = (item: foodType) => {
        setAction('EDIT');
        setFormData(item);
        setOpenModal(true);
    };
    const handleDelete = (item: foodType) => {
        // Xác nhận xóa dữ liệu
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
        if (!confirmDelete) return; // Không thực hiện xóa nếu người dùng không xác nhận
        setLoading(true);
        // Gửi yêu cầu xóa dữ liệu đến API
        fetch(`${api}/seafood/delete/${item._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReload(!reload);
                // Xử lý phản hồi từ API nếu cần
                console.log('Response from server:', data);
                // Thực hiện các bước cần thiết sau khi xóa thành công (nếu có)
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                // Xử lý lỗi nếu cần
            });
        setLoading(false);
    };
    return (
        <div>
            {
                loading ? <div>
                    <p>Loading ...</p>
                </div> : <div>
                    <div className="mb-2 flex justify-end w-[900px]">
                        <Button onClick={handleAddNew}>Thêm mới</Button>
                    </div>
                    <div className="flex flex-col gap-3">

                        {
                            seafoodList.map((food: foodType, index: number) => {
                                return (
                                    <div className="flex flex-row border rounded-xl w-[900px] p-2" key={index}>
                                        <div className="w-[80%] h-full flex flex-col text-left">
                                            <div>Tên: {food.name}</div>
                                            <div>Địa chỉ: {food.street}</div>
                                            <div>Mô tả: {food.des}</div>
                                            <div>Trạng thái: {food.status}</div>
                                        </div>
                                        {/* <div className="w-[20%] h-full">
                                        <img src={food.image} alt="Food Image" />
                                    </div> */}
                                        <div className="w-[20%] h-full flex flex-col gap-2 items-center justify-center">
                                            <Button className="w-32" onClick={() => handleSelectItem(food)}>Thông báo</Button>
                                            <Button className="w-32" onClick={() => handleEdit(food)}>Chỉnh sửa</Button>
                                            <Button className="w-32" onClick={() => handleDelete(food)}>Xóa</Button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            }
            {openModal && <AddNewModal openModal={openModal}
                formData={formData}
                setFormData={setFormData}
                setOpenModal={setOpenModal}
                handleAddNew={handleClickAddnew} />}
            {openModalNoti && <SendNotificate item={item} openModal={openModalNoti} setOpenModal={setOpenModalNoti} setReload={setReload} reload={reload} />}
        </div>
    );
};
export default ListSeafood;