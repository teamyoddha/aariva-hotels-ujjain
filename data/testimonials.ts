export interface Testimonial {quote:string;name:string;source:'Google'|'Booking.com'|'MakeMyTrip'|'Direct';date?:string;rating?:number;}
// Add only verified Aariva reviews. Reviews from the reference hotel are not reused.
export const testimonials:Testimonial[]=[];
export const reviewsUrl='';
