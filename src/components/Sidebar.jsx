import React, { useEffect } from "react";
import { Home } from "react-feather";
import Link from "next/link";
import { spotifyApi } from "@/pages/_app";

export default function Sidebar() {
  useEffect(() => {
    async function getPlaylists() {
      const data = await spotifyApi.getUserPlaylists();
      console.log(data);
    }
    getPlaylists();
  }, []);
  return (
    <aside className="w-full max-w-xs overflow-y-scroll bg-bg p-6">
      <Link
        href="/"
        className="flex w-max items-center gap-4 text-text-dimmed transition-colors hover:text-text"
      >
        <Home className="h-6 w-6" />
        <p className="font-semibold">Home</p>
      </Link>
      <hr className="my-5 border-text-dimmed/60" />
      <div className="">
        {Array(100)
          .fill(null)
          .map(() => (
            <Link
              href="/playlist/abc"
              className=" block py-1 text-text-dimmed transition-colors hover:text-text"
            >
              hej
            </Link>
          ))}
      </div>
    </aside>
  );
}
