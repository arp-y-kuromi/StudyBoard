import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getMembers() {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATABASE_ID!,
    sorts: [{ property: "progress", direction: "descending" }],
  });

  return res.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map((page: PageObjectResponse) => {
      const props = page.properties;

      const name =
        props.Name.type === "title"
          ? (props.Name.title[0]?.plain_text ?? "")
          : "";

      const position =
        props.position.type === "select"
          ? (props.position.select?.name ?? "")
          : "";

      const progress =
        props.progress.type === "number" ? (props.progress.number ?? 0) : 0;

      const commits =
        props.commits.type === "number" ? (props.commits.number ?? 0) : 0;

      return {
        id: page.id,
        name,
        position,
        progress,
        commits,
      };
    });
}
