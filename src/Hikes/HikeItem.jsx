
function HikeItem(props){
    return(
        <>
            <div>
                <div>{props.hikeDetails.name}</div>
                <div>{props.hikeDetails.elevation}</div>
                <div>{props.hikeDetails.duration}</div>
                <div>{props.hikeDetails.difficulty}</div>
            </div>
        </>
    )
}

export default HikeItem