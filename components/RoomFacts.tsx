import { Users, BedDouble, Maximize } from "lucide-react";
import type { Room } from "@/data/rooms";
import { formatINR } from "@/lib/utils";
import { Pending } from "./Pending";

export function RoomFacts({ room, className }: { room: Room; className?: string }) {
  return (
    <ul className={["flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted", className].join(" ")}>
      <li className="flex items-center gap-2">
        <Users aria-hidden size={16} strokeWidth={1.5} className="text-gold-text" />
        {room.guestsLabel ?? (room.guests ? `Up to ${room.guests} guests` : <Pending>ADD MAX GUESTS</Pending>)}
      </li>
      <li className="flex items-center gap-2">
        <BedDouble aria-hidden size={16} strokeWidth={1.5} className="text-gold-text" />
        {room.beds ?? <Pending>ADD BED TYPE</Pending>}
      </li>
      {room.size && (
        <li className="flex items-center gap-2">
          <Maximize aria-hidden size={16} strokeWidth={1.5} className="text-gold-text" />
          {room.size}
        </li>
      )}
    </ul>
  );
}

export function RoomPrice({ room, inverse }: { room: Room; inverse?: boolean }) {
  return (
    <p className={inverse ? "text-cream/80" : "text-ink-muted"}>
      {room.startingPrice && <span className="text-sm">From </span>}
      {room.startingPrice ? (
        <>
          <span className={["text-2xl font-semibold", inverse ? "text-gold" : "text-gold-text"].join(" ")}>
            {formatINR(room.startingPrice)}
          </span>
          <span className="text-sm"> / night</span>
        </>
      ) : (
        <span className="font-medium">Contact us for current rates</span>
      )}
    </p>
  );
}
