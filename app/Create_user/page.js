'use client'

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create_user = () => {

  let [name, setName] = useState("");
  let [comp, setComp] = useState("");
  let [sal, setSal] = useState("");
  
  let nameData = (e) => {
    setName(e.target.value);
  };
  let compData = (e) => {
    setComp(e.target.value);
  };
  let salData = (e) => {
    setSal(e.target.value);
  };
  const router = useRouter();
  let click = (e) => {
    e.preventDefault();
    
    let datas = {
      name: name,
      company: comp,
      salary: sal
    };
    console.log("Datas", datas);

    axios.post("/api/Posts", datas);
    alert("user Created...");
    router.push("/Users");
  };

  return (
    <div>
      <article className="create">
        <form>
          <h1>Create user</h1>
          <hr />
          <label>Name :</label>
          <input type="text" value={name} onChange={nameData} />
          <label>Company :</label>
          <input type="text" value={comp} onChange={compData} />
          <label>Salary :</label>
          <input type="text" value={sal} onChange={salData} />
          <button onClick={click}> CREATE</button>
        </form>
      </article>
    </div>
  );
};

export default Create_user;
