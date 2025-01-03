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
    <div className="w-full rounded border-solid border border-black hover:scale-105 flex flex-col">
      <div>image</div>
      <div>{hikeDetails.name}</div>
      <div className="flex gap-1 text-xs">
        <div>{hikeDetails.elevation}m</div>
        <div>{hikeDetails.difficulty}/10</div>
        <div>{hikeDetails.duration} h</div>
      </div>
    </div>
  );
}

export default HikeItem;
