interface Props {
  hikeDetails: {
    name: string;
    elevation: number;
    difficulty: number;
  };
}

function HikeItem({ hikeDetails }: Props) {
  return (
    <div>
      <div>{hikeDetails.name}</div>
      <div>{hikeDetails.elevation}</div>
      <div>{hikeDetails.difficulty}</div>
    </div>
  );
}

export default HikeItem;
