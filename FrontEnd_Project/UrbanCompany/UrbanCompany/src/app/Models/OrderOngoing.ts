export interface OrderOngoing
{
    OrderOngoingId:number;
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