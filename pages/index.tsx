import { Button, Group } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../components/Layout";
import { collectionsFetcher, CollectionsResponse } from "./api/collections";

export default function IndexPage() {
  const { data, error } = useSWR('/api/collections', collectionsFetcher);

  return (
    <Layout>
      <div style={{ margin: "auto" }}>
        {data && <h1 style={{ marginBottom: "1rem" }}>Mau Input Apa?</h1>}
        <Group position="center">
          {!data && <p>loading...</p>}
          {data && data.map((collection: CollectionsResponse) => {
            return (
              <Link
                href={`/uploads/${collection.id}`}
                passHref
                key={collection.id}
              >
                <Button component="a" variant="outline">
                  {collection.name}
                </Button>
              </Link>
            );
          })}
          {error && <p>Some error happened :(</p>}

        </Group>
      </div>
    </Layout>
  );
}
