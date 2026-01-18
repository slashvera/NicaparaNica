import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function NewComponent() {
  const [students, setStudents] = useState([]);

  return (
    <div>
      <div className="card w-full">
        <div className="w-full overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>johndoe@example.com</td>
                <td>
                  <span className="badge badge-soft badge-success text-xs">
                    Professional
                  </span>
                </td>
                <td>March 1, 2024</td>
                <td>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>janesmith@example.com</td>
                <td>
                  <span className="badge badge-soft badge-error text-xs">
                    Rejected
                  </span>
                </td>
                <td>March 2, 2024</td>
                <td>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Alice Johnson</td>
                <td>alicejohnson@example.com</td>
                <td>
                  <span className="badge badge-soft badge-info text-xs">
                    Applied
                  </span>
                </td>
                <td>March 3, 2024</td>
                <td>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button
                    className="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span className="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Bob Brown</td>
                <td>bobrown@example.com</td>
                <td>
                  <span className="badge badge-soft badge-primary text-xs">
                    Current
                  </span>
                </td>
                <td>March 4, 2024</td>
                <td>
                  <button
                    classNameName="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span classNameName="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    classNameName="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span classNameName="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button
                    classNameName="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span classNameName="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
