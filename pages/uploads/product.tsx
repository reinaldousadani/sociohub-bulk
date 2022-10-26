import Layout from "../../components/Layout";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Product() {
  const { data, error } = useSWR("/api/hello", fetcher);

  return (
    <Layout>
      <h1 style={{ marginTop: "1rem", marginBottom: "1rem" }}>Product</h1>
      {!data && <p>Loading...</p>}
      {data && <p>{JSON.stringify(data)}</p>}
      {error && <p>Failed to load</p>}
    </Layout>
  );
}
