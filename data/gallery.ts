export type GalleryCategory='Rooms'|'Hotel'|'Reception'|'Ujjain'|'Bathrooms';
export interface GalleryImage {src:string;alt:string;category:GalleryCategory;tile:'tall'|'feature'|'single';}
export const gallery:GalleryImage[]=[
 {src:'/images/aariva-exterior.webp',alt:'Front facade of Aariva Hotel and Banquet in Ujjain',category:'Hotel',tile:'tall'},
 {src:'/images/aariva-deluxe.webp',alt:'Aariva Deluxe room',category:'Rooms',tile:'feature'},
 {src:'/images/aariva-family.webp',alt:'Aariva Family room',category:'Rooms',tile:'tall'},
 {src:'/images/aariva-deluxe-1.webp',alt:'Deluxe room interior',category:'Rooms',tile:'single'},
 {src:'/images/aariva-reception-2.webp',alt:'Reception at Aariva',category:'Reception',tile:'single'},
 {src:'/images/aariva-bathroom.webp',alt:'Bathroom at Aariva',category:'Bathrooms',tile:'single'},
 {src:'/images/aariva-family-2.webp',alt:'Family room interior',category:'Rooms',tile:'single'}
];
