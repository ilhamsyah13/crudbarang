import { useState } from "react";
import "./App.css";
import barang from "./utils/data";
import Add from "./components/Add";
import Delete from "./components/Delete";
import Edit from "./components/Edit";
import Pagination from "./components/Pagination";
import JWTButton from "./components/JWTButton";

function App() {
  const [data, setData] = useState(barang);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);
  const [jwtToken, setJwtToken] = useState("");
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data
    .filter((item) => item.nama.toLowerCase().includes(search))
    .slice(indexOfFirstRecord, indexOfLastRecord);
  const pages = Math.ceil(data.length / recordsPerPage);

  return (
    <div className="App">
      <div className="container">
        <p>* Data akan kembali ke keadaan awal saat di refresh</p>
        <p>
          ** Penggunaan token terdapat pada enkripsi payload pada salah satu
          data dengan tombol token
        </p>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Nama"
          />
          <Add data={data} setData={setData} />
        </div>
        <table className="table-data">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Stok</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.nama}</td>
                <td>{item.hargaBeli}</td>
                <td>{item.hargaJual}</td>
                <td>{item.stok}</td>
                <td>
                  <img src={item.image} alt="" width={125} />
                </td>
                <td>
                  <Edit
                    data={data}
                    setData={setData}
                    store={item}
                    hargaBeli={item.hargaBeli}
                    hargaJual={item.hargaJual}
                    stok={item.stok}
                    nama={item.nama}
                  />
                  <Delete data={data} setData={setData} nama={item.nama} />
                  <JWTButton store={item} setJwtToken={setJwtToken} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {jwtToken.length === 0 ? null : (
          <div className="token">
            <h2>
              Token{" "}
              <a
                href="https://jwt.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                jwt.io
              </a>
            </h2>
            <p>{jwtToken}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
