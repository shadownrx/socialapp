"use client";
import { useState } from "react";

const stickers = [
  "/stickers/happy.png",
  "/stickers/sad.png",
  "/stickers/love.png",
  "/stickers/thumbs-up.png",
  "/stickers/laugh.png",
];

export default function StickerPicker({ onSelect }: { onSelect: (url: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm px-2 py-1 border rounded hover:bg-muted"
      >
        😀 Stickers
      </button>
      {open && (
        <div className="absolute z-10 mt-2 p-2 bg-background border rounded grid grid-cols-3 gap-2">
          {stickers.map((sticker) => (
            <img
              key={sticker}
              src={sticker}
              alt="sticker"
              className="w-10 h-10 cursor-pointer"
              onClick={() => {
                onSelect(sticker);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
