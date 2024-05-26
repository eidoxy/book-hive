const Modal = ({open, onClose}) => {
    return(
        <div className={"${open ? 'visible bg-black' : 'invisible}"}>
            <h1>Hello World</h1>
        </div>
    );
}

export default Modal;