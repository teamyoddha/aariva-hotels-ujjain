export const hotel = {
 name:'Aariva',legalName:'Aariva Hotels & Banquets',tagline:'Comfortable Stays. Memorable Celebrations.',siteUrl:'https://aarivahotels.com',city:'Ujjain',state:'Madhya Pradesh',country:'IN',
 phone:'+91 84588 84599',phoneHref:'+918458884599',whatsapp:'918458884599',email:'info@aarivahotels.com',
 address:{line1:'Jyotiba Phoole Complex',line2:'Near Birla Hospital Choraha',locality:'Nanakheda, Ujjain',region:'Madhya Pradesh',postalCode:''},
 googleMapsUrl:'https://www.google.com/maps/search/?api=1&query=Aariva+Hotels+Banquets+Birla+Hospital+Nanakheda+Ujjain',
 mapEmbedUrl:'https://www.google.com/maps?q=Aariva+Hotels+Banquets+Birla+Hospital+Nanakheda+Ujjain&output=embed',
 geo:null as null|{lat:number;lng:number},checkIn:'',checkOut:'',checkInTime24:'',checkOutTime24:'',policiesUpdated:'2026-10-14',
 extrasPolicy:'Please ask our team about extra beds and any additional charges',
 owner:{name:'',bio:''},social:{facebook:'',instagram:'',youtube:''},
 rating:{show:false,value:0,count:0,source:'Google',checked:''},offers:{show:false,text:''},
} as const;
export const fullAddress=[hotel.address.line1,hotel.address.line2,hotel.address.locality,hotel.address.region].join(', ');
export function whatsappLink(message='Hello Aariva, I would like to enquire about a room.') {return `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(message)}`;}
export const telLink=`tel:${hotel.phoneHref}`;
export const mailLink=`mailto:${hotel.email}`;
export const nav=[{label:'Home',href:'/'},{label:'About',href:'/about/'},{label:'Rooms',href:'/rooms/'},{label:'Banquets',href:'/banquets/'},{label:'Gallery',href:'/gallery/'},{label:'Contact',href:'/contact/'}] as const;
export const policyLinks=[{label:'Privacy Policy',href:'/privacy-policy/'},{label:'Terms & Conditions',href:'/terms-and-conditions/'},{label:'Cancellation Policy',href:'/cancellation-policy/'}] as const;
