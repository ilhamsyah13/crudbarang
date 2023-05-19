import React, { useState } from "react";

export default function Add(props) {
  const allowedFileTypes = ["jpg", "png"];
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [barang, setBarang] = useState({
    nama: "",
    hargaBeli: 0,
    hargaJual: 0,
    stok: 0,
  });

  const changeHandler = (event) => {
    if (
      !allowedFileTypes.includes(event.target.files[0].name.split(".").at(-1))
    ) {
      setErrorMessage(
        `File does not support. Files type must be ${allowedFileTypes.join(
          ", "
        )}`
      );
    } else {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      props.data.some(
        (item) => item.nama.toLowerCase() === barang.nama.toLowerCase()
      )
    ) {
      setErrorMessage("Nama Telah Terpakai");
    } else if (selectedFile && selectedFile.size > 100000) {
      setErrorMessage("Ukuran file maskimal 100KB");
    } else {
      const formData = new FormData();

      formData.append("image", selectedFile);

      fetch(
        "https://api.imgbb.com/1/upload?expiration=600&key=79d4234f006ec78bf10d4057bde0b495",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          let data = [
            ...props.data,
            {
              nama: barang.nama,
              hargaBeli: barang.hargaBeli,
              hargaJual: barang.hargaJual,
              stok: barang.stok,
              image: result.data.display_url,
            },
          ];
          props.setData(data);
          setSelectedFile();
          setShowModal(false);
        })
        .catch((error) => {
          setErrorMessage("File Error");
        });
    }
  };

  const handleChange = (name) => (event) => {
    setBarang({ ...barang, [name]: event.target.value });
  };

  const removeSelectedImage = () => {
    setSelectedFile();
  };

  const closeModal = () => {
    setSelectedFile();
    setShowModal(false);
  };
  return (
    <>
      <button
        className="button button-add"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      {showModal ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <p className={errorMessage.length === 0 ? "" : "warning"}>
                {errorMessage.length === 0 ? null : errorMessage}
              </p>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Nama</label>
                  <input
                    type="text"
                    placeholder="nama"
                    value={barang.nama}
                    onChange={handleChange("nama")}
                    required
                  />
                </div>
                <div>
                  <label>Harga Beli</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Harga Beli"
                    value={barang.hargaBeli}
                    onChange={handleChange("hargaBeli")}
                    required
                  />
                </div>
                <div>
                  <label>Harga Jual</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Harga Jual"
                    value={barang.hargaJual}
                    onChange={handleChange("hargaJual")}
                    required
                  />
                </div>
                <div>
                  <label>Stok</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="stok"
                    value={barang.stok}
                    onChange={handleChange("stok")}
                    required
                  />
                </div>
                <div>
                  <label>Gambar</label>
                  <input
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept=".png, .jpg,"
                    required
                  />
                </div>
                {selectedFile && (
                  <div className="preview-image">
                    <div>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Thumb"
                        width={200}
                      />
                    </div>

                    <span className="remove" onClick={removeSelectedImage}>
                      Remove This Image
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="button button-delete"
                >
                  close
                </button>
                <button type="submit" className="button button-edit">
                  submit
                </button>
              </form>
            </div>
          </div>
          <div className="back-modal"></div>
        </>
      ) : null}
    </>
  );
}
