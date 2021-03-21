import React from "react";
import "../style.css";

export default ({ markAsDone, id, title = "Not Set", done = false }) => (
  <div className="taskItem">
    <div className={done ? "compliteTag" : "pendingTag"}>
      {done ? "Complite" : "Pending"}
    </div>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr key={id}>
          <td className="taskItemTitel">{title}</td>
          <td className="taskItemAction">
            <button onClick={() => markAsDone(id)} disabled={done}>
              Mark As Done
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
