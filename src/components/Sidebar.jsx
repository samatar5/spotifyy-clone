import { Home } from "react-feather";
import Link from "next/link";
import { spotifyApi } from "@/pages/_app";
import { useQuery } from "@tanstack/react-query";

export default function Sidebar() {
  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => (await spotifyApi.getUserPlaylists()).body.items,
  });

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
        {isLoading
          ? "loading..."
          : playlists.map((playlist) => (
              <Link
                href="/playlist/abc"
                className=" block py-1 text-text-dimmed transition-colors hover:text-text"
              >
                {playlist.name}
              </Link>
            ))}
      </div>
    </aside>
  );
}
