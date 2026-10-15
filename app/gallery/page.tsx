import { Gallery } from '@/components/Gallery';
import { PageHero } from '@/components/PageHero';
import { gallery } from '@/data/gallery';
import { buildMetadata } from '@/lib/seo';
export const metadata=buildMetadata({title:'Photo Gallery | Aariva Hotels & Banquets',description:'Explore photographs of Aariva rooms, bathrooms and reception in Ujjain.',path:'/gallery/'});
export default function GalleryPage(){return <><PageHero eyebrow="A Look Around" title="Discover Aariva in Pictures" crumbs={[{name:'Gallery',path:'/gallery/'}]} intro={<p>Explore our rooms, reception and the details of your stay.</p>}/><section className="section"><div className="container-wide"><Gallery images={gallery}/></div></section></>;}
