const Modal = ({handleClose}) => {
    return (
        <div className="overlay">
        <div className="modal">
          <div className="modal-content">
            <p className="modal-text">「タスクの名前」は入力必須項目です。</p>
            <button onClick={handleClose}>閉じる</button>
          </div>
        </div>
      </div>
    );
};

export default Modal;