import Webflow from "webflow-api";

const webflowToken = process.env.WEBFLOW_TOKEN || "<token>"

//@ts-ignore
export default new Webflow({token: webflowToken})