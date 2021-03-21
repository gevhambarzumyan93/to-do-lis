import React from "react";
import "../style.css";

export default ({
  handleOpent,
  active = false,
  data = { name: "Not Set", completion: 0 },
}) => (
  <tr key={data.id} onClick={() => handleOpent(data)}>
    {["name", "completion"].map((key, index) => (
      <td
        key={index}
        style={active ? { background: "#0063f8ad" } : {}}
        className="listItem"
      >
        {data[key]}
      </td>
    ))}
  </tr>
);
