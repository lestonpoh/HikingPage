import HikeItem from "./HikeItem"

function List(props){
    if (!props.hikes){
        return <div>Loading...</div>
    }

    if (props.hikes.length === 0){
        return <div>There are no hikes available</div>
    }

    return(
        <div className="hikes-list">
            {props.hikes.map((hike) => {
                return <HikeItem key={hike.name} hikeDetails = {hike} />
            })}
        </div>
    )
}



function HikesList(){
    const hikes = [
        {
            name: "Hike 1",
            elevation: "100",
            duration: "6",
            difficulty: 1
        },
        {
            name: "Hike 2",
            elevation: "200",
            duration: "6",
            difficulty: 2
        },
        {
            name: "Hike 3",
            elevation: "300",
            duration: "9",
            difficulty: 3
        }
    ]


    return(
        <>
           <List hikes={hikes} />
        </>
    );
}

export default HikesList;