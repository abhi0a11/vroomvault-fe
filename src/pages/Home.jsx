import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import axios from "axios";
import Card from "../components/Card";
const Home = () => {
  const { setUser, isAuthenticated, setLoading } = useContext(Context);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${server}/api/v1/cars/allProducts`, {
        withCredentials: true,
      })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log("error in fetching data", err);
      });
  }, []);
  return (
    <section className="max-w-[1320px] flex justify-center flex-wrap">
      {isAuthenticated
        ? data?.map((d, i) => <Card key={i} data={d} />)
        : "Please login"}
    </section>
  );
};

export default Home;
