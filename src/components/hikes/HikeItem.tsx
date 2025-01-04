interface Props {
  hikeDetails: {
    name: string;
    elevation: number;
    difficulty: number;
    duration: number;
  };
}

function HikeItem({ hikeDetails }: Props) {
  return (
    <div className="hike-item m-2 cursor-pointer rounded border-solid border border-black hover:shadow-md">
      <div className="">image</div>
      <div className="px-2 py-1 font-bold text-s bg-sky-200">
        {hikeDetails.name}
      </div>
      <div className="flex gap-1 text-xs px-2 py-1 bg-sky-400">
        <div className="flex-1">{hikeDetails.elevation}m</div>
        <div className="flex-1">{hikeDetails.difficulty}/10</div>
        <div className="flex-1">{hikeDetails.duration} h</div>
      </div>
    </div>
  );
}

export default HikeItem;
