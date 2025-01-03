import HikeItem from "./HikeItem";

function HikesList() {
  const hikes = [
    {
      id: 1,
      name: "Hike1",
      elevation: 1000,
      difficulty: 1,
    },
    {
      id: 2,
      name: "Hike2",
      elevation: 2000,
      difficulty: 2,
    },
    {
      id: 3,
      name: "Hike3",
      elevation: 3000,
      difficulty: 3,
    },
  ];

  const hikeOnClick = () => {};

  return (
    <>
      <h1>Hikes</h1>
      {!hikes && <p>Loading...</p>}
      {hikes.length === 0 && <p>No hikes found</p>}
      <div>
        {hikes.map((hike) => (
          <div key={hike.id} onClick={hikeOnClick}>
            <HikeItem hikeDetails={hike} />
          </div>
        ))}
      </div>
    </>
  );
}

export default HikesList;
