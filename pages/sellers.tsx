import Forms from "../components/Forms";
import Layout from "../components/Layout";

export default function Products(){
    return(
        <Layout>
            <h1 style={{ marginTop: "1rem", marginBottom: "1rem" }}>Sellers Form</h1>
            <Forms collectionName="sellers" />
        </Layout>
    )
}