"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditUser = () => {
  const { id } = useParams(); // ✅ Correct

  let [Id, setID] = useState("");
  let [name, setName] = useState("");
  let [comp, setComp] = useState("");
  let [sal, setSal] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!id) return; // safety check
  
    axios.get(`/api/Posts/${id}`).then((res) => {
      setID(res.data.ID);
      setName(res.data.Name);
      setComp(res.data.Company);
      setSal(res.data.Salary);
      console.log("Edit_Res", res.data);
    });
  }, [id]);

  let nameData = (e) => {
    setName(e.target.value);
  };
  let compData = (e) => {
    setComp(e.target.value);
  };
  let salData = (e) => {
    setSal(e.target.value);
  };

  let click = (e) => {
    e.preventDefault();

    let datas = {
      id: Id,
      name: name,
      company: comp,
      salary: sal,
    };

    axios.put(`/api/Posts`, datas);
    alert("user Updated...");
    router.push("/Users");
  };

  return (
    <div className="mt-1">
      <article className="create">
        <form>
          <h1>Update User</h1>
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

export default EditUser;
