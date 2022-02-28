export interface OrderHistory
{
    orderHistoryId:number | null;
    orderId:number | null;
    customer:number | null;
    provider:number | null;
    service:number | null;
    subService:number | null;
    date:string | null;
    time:string | null;
    cost:number | null;
    qty:number | null;
    deliveryAddress:String
}