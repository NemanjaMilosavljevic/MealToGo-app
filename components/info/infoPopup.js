import "./infoPopup.css";

const InfoPopup = ({ togglePopupInfo }) => {
  const hidePopupHandler = () => {
    togglePopupInfo("popup");
  };

  return (
    <div className="popInfo">
      <div className="toast-body">
        You need to be logged in first if you want to do this action!
        <div className="mt-2 pt-2 border-top">
          <button
            type="button"
            className="btn btn-success btn-sm my-2"
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
