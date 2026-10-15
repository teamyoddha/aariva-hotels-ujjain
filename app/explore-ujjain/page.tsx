import { PageHero } from '@/components/PageHero';
import { destinations } from '@/data/destinations';
import { DestinationCard } from '@/components/DestinationCard';
import { buildMetadata } from '@/lib/seo';
export const metadata=buildMetadata({title:'Explore Ujjain | Aariva Hotels & Banquets',description:'Discover temples and places to visit during your stay in Ujjain.',path:'/explore-ujjain/'});
export default function ExplorePage(){return <><PageHero eyebrow="The Temple City" title="Discover Ujjain" crumbs={[{name:'Explore Ujjain',path:'/explore-ujjain/'}]} intro={<p>Make time for Ujjain’s temples, riverside ghats and cultural landmarks. Check current visiting arrangements with the relevant authorities.</p>}/><section className="section"><div className="container-wide grid gap-10 sm:grid-cols-2 md:grid-cols-3">{destinations.map(d=><div id={d.slug} key={d.slug}><DestinationCard d={d}/></div>)}</div></section></>;}
