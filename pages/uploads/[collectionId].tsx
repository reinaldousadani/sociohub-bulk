import { useRouter } from "next/router";
import useSWR from "swr";
import Forms from "../../components/Forms";
import Layout from "../../components/Layout";
import { collectionFetcher } from "../api/collections/[collectionId]";

export default function Upload() {
  const router = useRouter();
  const { collectionId } = router.query;

  const { data, error } = useSWR(
    `/api/collections/${collectionId}`,
    collectionFetcher
  );

  console.log("DATA: ", data);

  if (!data && !error)
    return (
      <Layout>
        <p style={{ marginTop: "1rem" }}>Loading...</p>
      </Layout>
    );

  if (error) {
    return (
      <Layout>
        <p style={{ marginTop: "1rem" }}>Some error happened</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 style={{ marginTop: "1rem", marginBottom: "1rem" }}>{data?.name}</h1>
      <Forms collection={data} />
    </Layout>
  );
}
