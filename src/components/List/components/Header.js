import React from "react";
import "../style.css";

export default ({ onAdd }) => (
  <tr key={Date.now()} className="headerRow">
    <th className="headerCol">
      <div className="nameCol">
        Name
        <button
          style={{ marginLeft: 10 }}
          className="onAddButton"
          onClick={onAdd}
        >
          +
        </button>
      </div>
    </th>
    <th className="headerCol">Completion Rate (%)</th>
  </tr>
);
