export interface OrderHistory
{
    OrderHistoryId:number;
    OrderId:number;
    Customer:number;
    Provider:number;
    Service:number;
    SubService:number
    date:string;
    time:string;
    cost:number;
    qty:number;
}