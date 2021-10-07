import classes from './ModalWinResult.module.css'
import ReactDOM from 'react-dom'

type modalProps = {
    onClose: () => void
}

const Backdrop: React.FC<modalProps> = props => {
    return <div className={classes.backdrop} onClick={props.onClose} />

}

const ModalOverlay: React.FC = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const ModalWinResult: React.FC<modalProps> = (props) => {
    const portalElement = document.getElementById('overlays')
    return (
        <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement!)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement!)}
        </>
    )

}

export default ModalWinResult