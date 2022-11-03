import { NextApiRequest, NextApiResponse } from "next";
import api from "../../libs/webflowApi";

const categoriesCollectionId =
  process.env.WEBFLOW_CATEGORIES_COLLECTION_ID || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await api.items({ collectionId: categoriesCollectionId });

    res.status(200).send(result)
  } catch (error) {
    res.status(500).send("Something gone wrong")
  }
}
