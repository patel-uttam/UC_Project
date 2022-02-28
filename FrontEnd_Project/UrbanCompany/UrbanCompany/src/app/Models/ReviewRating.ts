export interface ReviewRating
{
    reviewId:number|null;
    review:string;
    rating:number;
    subServiceId:number;
    orderHistoryId:number;
    serviceId:number;
    providerId:number;
    customerId:number;
}