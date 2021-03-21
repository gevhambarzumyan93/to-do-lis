import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { create } from "../../../service/users";
import "../style.css";

export default forwardRef(({ handleRefresh }, ref) => {
  const [display, setDisplay] = useState("none");
  const [key, setKey] = useState(Date.now());
  const [showMessage, setShowMessage] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setDisplay("block");
      setKey(Date.now());
    },
  }));

  const handleClose = useCallback(() => {
    setDisplay("none");
    setShowMessage(false);
    handleRefresh();
  }, [handleRefresh]);

  const handleSubmit = () => {
    const formData = document.getElementById("form");
    const res = {};
    for (let i = 0; i < formData.elements.length; i++) {
      const e = formData.elements[i];
      res[encodeURIComponent(e.name)] = encodeURIComponent(e.value);
    }

    if (!res.firstName) {
      setShowMessage(true);
      return;
    }

    create({
      id: Date.now().toString(),
      ...res,
      name: `${res.firstName || ""} ${res.lastName || ""}`,
      completion: 0,
    });
    handleClose();
  };

  return (
    <div key={key} style={{ display }} id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={handleClose} className="close">
          &times;
        </span>
        <form id="form">
          <label for="firstName">First name:</label>
          <br />
          <input
            style={{ width: "95%" }}
            type="text"
            id="firstName"
            name="firstName"
          />
          <br />
          {showMessage && (
            <span className="validateMessage">first name is requir</span>
          )}
          <br />
          <label for="lastName">Last name:</label>
          <br />
          <input
            style={{ width: "95%" }}
            type="text"
            id="lastName"
            name="lastName"
          />
        </form>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleSubmit}>Ok</button>
        </div>
      </div>
    </div>
  );
});
