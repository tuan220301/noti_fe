export const api = "http://localhost:8080/noti_api/v1";
// export const api = "http://103.129.127.42:5001/noti_api/v1";


export type foodType = {
    _id?: string;
    name: string;
    lat: number;
    lng: number;
    street: string;
    image: string;
    des: string;
    status: string;
};