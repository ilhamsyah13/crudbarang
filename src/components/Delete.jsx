import React, { useState } from "react";

export default function Delete(props) {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    let data = props.data.filter((note) => note.nama !== props.nama);
    props.setData(data);
  };
  return (
    <>
      <button
        className="button button-delete"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <p>Apakah anda yakin ingin menghapus {props.nama}</p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="button button-delete"
              >
                close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="button button-edit"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="back-modal"></div>
        </>
      ) : null}
    </>
  );
}
