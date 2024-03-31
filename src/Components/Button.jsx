import '../ComponentsCss/Button.css'

const Button = ({onDown, onLeft, onRight, onUp})=>{
    return(
        <div className='buttons'>
            <div className='upwards'>
                <input type="button" value="UP" onClick={onUp} className='up'/>
            </div>
            <div className='sideways'>
                <input type="button" value="LEFT" className='left' onClick={onLeft}/>
                <input type="button" value="RIGHT" className='right' onClick={onRight}/>
            </div>
            <div className='downwards'>
                <input type="button" value="DOWN" onClick={onDown} className='down'/>
            </div>
        </div>
    )
}
export default Button