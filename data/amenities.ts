export type AmenityId='ac'|'wifi'|'hotwater'|'parking'|'lift'|'tv'|'roomservice'|'cctv'|'balcony'|'power'|'housekeeping'|'reception';
export interface Amenity {id:AmenityId;label:string;description:string;}
export const amenities:Amenity[]=[
 {id:'ac',label:'Air-Conditioned Rooms',description:'Climate-controlled rooms for year-round comfort.'},
 {id:'wifi',label:'Free Wi-Fi',description:'Complimentary internet access during your stay.'},
 {id:'housekeeping',label:'Clean Bathrooms',description:'Private bathrooms in our Family and Deluxe rooms.'},
 {id:'roomservice',label:'Room Service',description:'Ask our team about available service and operating hours.'},
 {id:'reception',label:'24/7 Guest Support',description:'Assistance with your stay, day and night.'},
 {id:'parking',label:'Parking Enquiries',description:'Please confirm parking availability before arrival.'}
];
export const amenityById=Object.fromEntries(amenities.map(a=>[a.id,a])) as Record<AmenityId,Amenity>;
