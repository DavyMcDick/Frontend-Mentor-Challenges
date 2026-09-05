
function VehicleCard(props) {
    return (
       <article className={`${props.backgroundClass} p-12`}>
               <img src={props.icon} alt="" />
               <h2 className='font-heading text-surface text-4xl font-bold uppercase mt-8'>{props.title}</h2>
               <p className='text-copy text-body mt-6'>{props.description}</p>
               <a href="" className={`inline-block mt-6 bg-surface ${props.linkColorClass} px-8 py-3 border-2 border-transparent rounded-full hover:border-surface hover:bg-transparent hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface`}>A learn More</a>
        </article>
    );
}

export default VehicleCard;
