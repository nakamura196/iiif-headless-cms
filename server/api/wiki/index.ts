import wtf from "wtf_wikipedia";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const monthAndQueryData = String(query.date).split("-");
  const monthAndDay = `${Number(monthAndQueryData[0])}月${Number(
    monthAndQueryData[1]
  )}日`;
  const url = `https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles=${monthAndDay}&rvprop=content&rvslots=*`;
  const res = await fetch(url);
  const json = await res.json();
  const page =
    json.query.pages[Object.keys(json.query.pages)[0]].revisions[0].slots.main[
      "*"
    ];
  const text = wtf(page).text();
  //分割
  const texts = text.split("\n\n");

  let part: string = "";

  for (const block of texts.slice(1)) {
    if (block.trim() != "") {
      part = block.trim();
      break;
    }
  }
  const spl = part.split("\n");

  const results = [];

  for (const item of spl) {
    const values = item.replace("*", "").split("-");
    const value = values[1].trim();

    const result = {
        "text": value,
        "year": Number(values[0].trim().split("年")[0]),
        "month": Number(monthAndQueryData[0]),
        "day": Number(monthAndQueryData[1]),
    }
    results.push(result);
  }
  return results;
});
