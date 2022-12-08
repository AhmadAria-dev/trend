const { Translate } = require("@google-cloud/translate").v2;
export default async function translate(text) {
  try {
    const credentials = JSON.parse(process.env.NEXT_PUBLIC_GT_CREDENTIALS);
    const projectId = credentials.project_id;
    const trans = new Translate({ credentials, projectId });
    const response = await trans.translate(text, "fa");
    return response[0];
  } catch (error) {
    console.log(error.message);
  }
}
