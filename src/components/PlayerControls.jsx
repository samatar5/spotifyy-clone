import { useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "react-feather";
import { formatTime } from "@/utils/FormatTime";
export default function PlayerControls({ player, isPaused, position, track }) {
  const [currentProgress, setCurrentProgress] = useState(null);
  const duration = track.duration_ms;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && player) {
        setCurrentProgress(parseFloat(currentProgress) + 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, player]);

  useEffect(() => {
    setCurrentProgress(position);
  }, [position]);

  return (
    <div>
      <div className="flex justify-center gap-3">
        <SkipBack
          className="h-5 w-5 fill-white"
          onClick={() => {
            player.previousTrack();
          }}
        />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-text ">
          {isPaused ? (
            <Play
              className="ml-1 h-5 w-5 fill-black text-black"
              onClick={() => {
                player.togglePlay();
              }}
            />
          ) : (
            <Pause
              className=" h-5 w-5 fill-black text-black"
              onClick={() => {
                player.togglePlay();
              }}
            />
          )}
        </div>
        <SkipForward
          className="h-5 w-5 fill-white "
          onClick={() => {
            player.nextTrack();
          }}
        />
      </div>
      <div className="items-centerflex mt-4 justify-center gap-2 text-sm text-text-dimmed ">
        <p className="">{formatTime(currentProgress)}</p>
        <div className="group relative w-60">
          <label
            htmlFor=""
            className="relative block h-1 rounded-sm text-text-dimmed/30"
          >
            <div className=" h-full overflow-hidden rounded-sm">
              <div
                className="h-full w-full rounded-sm bg-text group-hover:bg-primary "
                style={{
                  transform: `transleteX(${
                    -100 + (100 * currentProgress) / duration
                  }%)`,
                }}
              ></div>
            </div>
            <div
              className="absolute hidden h-3 w-3 rounded-full bg-text group-hover:block "
              style={{
                left: `${(100 * currentProgress) / duration}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </label>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentProgress}
            onClick={(e) => setCurrentProgress(e.target.value)}
            onMouseUp={() => {
              console.log("mouse up");
              player.seek(currentProgress);
            }}
            className="absolute inset-0 opacity-0 "
          />
        </div>
        <p>{formatTime(duration)}</p>
      </div>
    </div>
  );
}
