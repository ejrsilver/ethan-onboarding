import Layout from "../../components/layout";
import { getBuildingData, getAllIds } from "../../lib/getbuildings";

export default function Building({ buildingData }) {
    return (
      <Layout>
        {buildingData.name}
        <br />
        {buildingData.addr}
      </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = getAllIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const buildingData = getBuildingData(params.id)
    return {
        props: {
            buildingData
        }
    }
}