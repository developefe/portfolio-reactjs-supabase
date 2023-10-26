import './Entrance.css';

export default function Entrance({...props}) {

    return(
        <div className="entrance">
            <h4>      
                {props?.title?.split('*').map((part, index) => (
                    index % 2 !== 0 ? (
                    <><br /><span key={index}>{part}</span></>
                    ) : (
                    part
                    )
                ))}
            </h4>
            <p>
                {props?.subTitle?.split('*').map((part, index) => (
                    index % 2 !== 0 ? (
                    <><b key={index}>{part}</b></>
                    ) : (
                    part
                    )
                ))}
            </p>
        </div>
    )
}