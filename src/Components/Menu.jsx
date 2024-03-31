import '../ComponentsCss/Menu.css'

const Menu = ({onRouteChange})=>{
    return(
        <div className="wrapper">
            <div>
                <input type="button" onClick={onRouteChange} className="start" value="start game"/>
            </div>
        </div>
    )
}
export default Menu