"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";
import { Lightbox } from "./Lightbox";

const tile = {
  tall: "row-span-2",
  feature: "col-span-2 row-span-2",
  single: "",
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(images.map(image => image.category))];
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3" aria-label="Filter gallery">{categories.map(item => <button key={item} type="button" aria-pressed={category===item} onClick={()=>setCategory(item)} className={category===item?'btn-primary btn-sm':'btn-secondary btn-sm'}>{item}</button>)}</div>
      <ul className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:auto-rows-[230px] md:grid-cols-4">
        {images.map((img, i) => (
          <li key={img.src} className={tile[img.tile]} hidden={category!=='All' && category!==img.category}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block h-full w-full overflow-hidden rounded-xs bg-sand text-left"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={img.tile === "feature" ? "(min-width: 900px) 600px, 100vw" : "(min-width: 900px) 300px, 50vw"}
                className="img-zoom object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-8 text-xs font-semibold uppercase tracking-[1.5px] text-cream">
                {img.category}
                <Expand aria-hidden size={15} className="opacity-80" />
              </span>
              <span className="sr-only">Open larger photo</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={index} onChange={setIndex} label="Aariva photo gallery" />
    </>
  );
}
