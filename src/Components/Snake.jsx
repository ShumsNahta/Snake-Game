export default function Snake(props) {
    return (
        <div>
            {
                props.snakeDots.map((cValue, index) => {
                    console.log("cValue",cValue);
                    const style = {
                        left: `${cValue[0]}%`,
                        top: `${cValue[1]}%`
                    }
                    return <div className="snake" key={index} style = {style}/>
                })
            }
        </div>
    )
}