import "./infoPopup.css";

const InfoPopup = ({ togglePopupInfo }) => {
  const hidePopupHandler = () => {
    togglePopupInfo("popup");
  };

  return (
    <div className="popInfo">
      <div className="toast-body">
        This action is not allowed for unauthorized users! Please login first!
        <div className="mt-2 pt-2 border-top">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={hidePopupHandler}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
