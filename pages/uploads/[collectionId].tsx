import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { collectionFetcher } from "../api/sellers/[collectionId]";

export default function Upload() {
  const router = useRouter();
  const { collectionId } = router.query;

  const {data, error} = useSWR(`/api/sellers/${collectionId}`, collectionFetcher);

  return (
    <Layout>
      <h1 style={{ marginTop: "1rem" }}>{collectionId}</h1>
    </Layout>
  );
}
