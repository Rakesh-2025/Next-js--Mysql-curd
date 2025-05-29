"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const Users = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("/api/Posts")
    .then((res) => {
      console.log(res.data); // Check: is it an array?
      setDatas(res.data);    // Set it only if it's an array
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
  }, []);


  let deleteData = (e) => {
    axios.delete(`/api/Posts?id=${e}`);
    alert("user deleted....")

    window.location.reload(); // 🔁 Full reload
    
  };

  return (
    <div>
      <div className="box">
      {datas.map((e) => {
        return (
          <div key={e.ID}>
            <table>
              <tr>
                <th>{e.ID}</th>
                <th>Id</th>
              </tr>
              <tr>
                <td>NAME :</td>
                <td>{e.Name}</td>
              </tr>
              <tr>
                <td>COMPANY :</td>
                <td>{e.Company}</td>
              </tr>
              <tr>
                <td>SALARY :</td>
                <td>{e.Salary}</td>
              </tr>
             
              <tr>
                
                <td>
                  <Link href={`/Users/Edit_user/${e.ID}`}>
                    <button>EDIT</button>
                  </Link>
                </td>
                <td>
                  {/* <Link href="#"> */}
                    <button
                      onClick={() => {
                        deleteData(e.ID);
                      }}
                    >
                      DELETE
                    </button>
                  {/* </Link> */}
                </td>
              </tr>
            </table>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Users;
