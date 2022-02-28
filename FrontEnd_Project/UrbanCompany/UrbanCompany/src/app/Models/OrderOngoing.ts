export interface OrderOngoing
{
    orderOngoingId:number | null;
    orderId:number | null;
    customer:number | null;
    provider:number | null;
    service:number | null;
    subService:number
    date:string | null;
    time:string | null;
    cost:number | null;
    qty:number | null;
    deliveryAddress:string
}