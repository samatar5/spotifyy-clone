import { useEffect, useState } from "react";
import { spotifyApi } from "@/pages/_app";
import PlayerControls from "./PlayerControls";
import PlayerVolume from "./PlayerVolume";

export default function Player() {
  const [device, setDecvice] = useState(null);
  const [localPlayer, setLocalPlayer] = useState(null);
  const [track, setTrack] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("spotify-key");
    const script = document.createElement("script");
    script.src = "https://sdk.srdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlayerbackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Techover player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });
      console.log("player: ", player);
      player.addListener("ready", ({ device_id }) => {
        console.log("ready with device_id: ", device_id);
        setDecvice(device_id);
        setLocalPlayer(player);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state || !state.track_window?.current_track) {
          return;
        }
        console.log("state changed: ", state);
        setTrack(state.track_window.current_tack);
        setIsPaused(state.paused);
        setPosition(state.position);
      });
      player.connect();
    };
  }, []);

  useEffect(() => {
    async function getPlayBack() {
      if (device) {
        await spotifyApi.transferMyPlayback([device], true);
      }
      await spotifyApi.getMyDevices();
    }
    getPlayBack();
  }, [device]);

  useEffect(() => {
    if (!localPlayer) return;
    localPlayer.connect();

    return () => {
      localPlayer.disconnect();
    };
  }, [localPlayer]);
  if (!localPlayer || !track) return <div>no player, please connect</div>;

  return (
    <div className="flex items-center p-4">
      <div className="flex items-center">
        <img
          src={track.album.images[0].url}
          alt=""
          className="mr-4 h-14 w-14 flex-shrink-0"
        />
        <div>
          <h4 className="text-ms">{track.name}</h4>
          <p className="text-ms text-text-dimmed">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex flex-1 text-center max-md:hidden">
        <PlayerControls
          player={localPlayer}
          isPaused={isPaused}
          position={position}
          track={track}
        />
      </div>
      <div className="flex flex-1 justify-center  ">
        <PlayerVolume player={localPlayer} />
      </div>
    </div>
  );
}
