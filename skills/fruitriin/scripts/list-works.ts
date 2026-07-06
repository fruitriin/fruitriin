#!/usr/bin/env bun
/**
 * FruitRiin の公開記事メタデータを一覧 API から列挙する（本文は取得しない）。
 * 本文が必要なときは URL を /read スキルに渡すこと。
 *
 * 使い方:
 *   bun run list-works.ts             # qiita + zenn
 *   bun run list-works.ts qiita
 *   bun run list-works.ts zenn
 */

const QIITA_USER = process.env.FRUITRIIN_QIITA ?? "fruitriin";
const ZENN_USER = process.env.FRUITRIIN_ZENN ?? "fruitriin";

type Work = {
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  likes: number | null;
};

async function listQiita(): Promise<Work[]> {
  const works: Work[] = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(
      `https://qiita.com/api/v2/users/${QIITA_USER}/items?page=${page}&per_page=20`
    );
    if (!res.ok) throw new Error(`Qiita API error: ${res.status}`);
    const items: any[] = await res.json();
    if (items.length === 0) break;
    for (const item of items) {
      works.push({
        source: "qiita",
        title: item.title,
        url: item.url,
        publishedAt: item.created_at ?? "",
        likes: item.likes_count ?? null,
      });
    }
    if (items.length < 20) break;
  }
  return works;
}

async function listZenn(): Promise<Work[]> {
  const res = await fetch(
    `https://zenn.dev/api/articles?username=${ZENN_USER}&order=latest&count=100`
  );
  if (!res.ok) throw new Error(`Zenn API error: ${res.status}`);
  const { articles } = (await res.json()) as { articles: any[] };
  return (articles ?? []).map((a) => ({
    source: "zenn",
    title: a.title,
    url: `https://zenn.dev${a.path}`,
    publishedAt: a.published_at ?? a.body_updated_at ?? "",
    likes: a.liked_count ?? null,
  }));
}

const target = process.argv[2];
const sources = target ? [target] : ["qiita", "zenn"];
const all: Work[] = [];

for (const s of sources) {
  try {
    if (s === "qiita") all.push(...(await listQiita()));
    else if (s === "zenn") all.push(...(await listZenn()));
    else console.error(`未対応のソース: ${s}（qiita | zenn）`);
  } catch (e: any) {
    console.error(`${s}: 取得失敗 (${e.message})`);
  }
}

all.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
console.log(`| source | title | ♥ | published | url |`);
console.log(`|---|---|---|---|---|`);
for (const w of all) {
  console.log(
    `| ${w.source} | ${w.title.replace(/\|/g, "\\|")} | ${w.likes ?? "-"} | ${w.publishedAt.slice(0, 10)} | ${w.url} |`
  );
}
console.error(`\n${all.length}件（メタデータのみ。本文は /read <url> で取得）`);
