export default function Food(props){
    const style = {
        left : `${props.dots[0]}%`,
        top : `${props.dots[1]}%`
    }
    return <div className="food" style={style} />;
}