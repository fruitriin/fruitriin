#!/usr/bin/env bun
/**
 * fruitriin inbox 投函スクリプト
 * 旧 fruitriin-mcp の validateRequest / validateAdvice / validateWish を移植。
 * 検証を通ったときだけ inbox/ に書き込む——MCP と同じ強制力をここで保つ。
 *
 * 使い方:
 *   bun run validate.ts <request|advice|wish> <slug> <本文ファイル>
 *   bun run validate.ts <request|advice|wish> <slug> --check <本文ファイル>  # 検証のみ、投函しない
 */
import { realpathSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";

// symlink 経由（.claude/skills/fruitriin）で呼ばれても実体位置から inbox を解決する
const SCRIPT_DIR = dirname(realpathSync(import.meta.path));
const REPO_ROOT = join(SCRIPT_DIR, "../../..");
const INBOX_DIR = join(REPO_ROOT, "inbox");

type Kind = "request" | "advice" | "wish";

const KIND_LABEL: Record<Kind, string> = {
  request: "要望",
  advice: "アドバイス",
  wish: "読みたい",
};

function validateRequest(content: string): string[] {
  const errors: string[] = [];
  if (!/^---\n[\s\S]*?status:\s*(proposed|accepted|in-progress|done|rejected)[\s\S]*?---/m.test(content))
    errors.push("frontmatter に status（proposed等）がありません");
  if (!/^type:\s*request$/m.test(content)) errors.push("frontmatter に type: request がありません");
  if (!/^#\s*提言/m.test(content)) errors.push("「# 提言」セクションがありません");
  if (!/^#\s*プロンプト集/m.test(content)) errors.push("「# プロンプト集」セクションがありません");
  for (const [mark, name] of [
    ["📚", "エッセンス（素材への参照）"],
    ["🧭", "読者の状態"],
    ["🎯", "目標状態"],
  ] as const) {
    if (!content.includes(mark)) errors.push(`ブリーフ要素 ${mark} ${name} が見当たりません`);
  }
  if (content.length > 4000)
    errors.push(
      `長すぎます(${content.length}字)。展開と解釈はリンさん自身が練れる。エッセンス×読者の状態×目標に絞ること`
    );
  return errors;
}

function validateAdvice(content: string): string[] {
  const errors: string[] = [];
  if (!/^---\n[\s\S]*?status:\s*(proposed|acknowledged|rejected)[\s\S]*?---/m.test(content))
    errors.push("frontmatter に status（proposed等）がありません");
  if (!/^type:\s*advice$/m.test(content)) errors.push("frontmatter に type: advice がありません");
  if (!/^#\s*対象/m.test(content)) errors.push("「# 対象」セクションがありません");
  if (!/^#\s*アドバイス/m.test(content)) errors.push("「# アドバイス」セクションがありません");
  if (!/^#\s*根拠/m.test(content)) errors.push("「# 根拠」セクションがありません");
  if (/📦/.test(content))
    errors.push("アドバイスに成果物要求（📦）は含めない。成果物を求めるなら request を使うこと");
  return errors;
}

function validateWish(content: string): string[] {
  const errors: string[] = [];
  if (!/^---\n[\s\S]*?status:\s*(proposed|accepted|done|rejected)[\s\S]*?---/m.test(content))
    errors.push("frontmatter に status（proposed等）がありません");
  if (!/^type:\s*wish$/m.test(content)) errors.push("frontmatter に type: wish がありません");
  if (!/^#\s*読みたい/m.test(content)) errors.push("「# 読みたい！」セクションがありません");
  if (!/^#\s*なぜ読みたいか/m.test(content)) errors.push("「# なぜ読みたいか」セクションがありません");
  if (/^#\s*マイルストーン/m.test(content))
    errors.push("wishにマイルストーンは載せない（義務の匂いは火を消す）。必要なら request を使うこと");
  if (content.length > 1500)
    errors.push(`長すぎます(${content.length}字)。wishは1500字以内の軽い一声。重い依頼は request へ`);
  return errors;
}

const VALIDATORS: Record<Kind, (c: string) => string[]> = {
  request: validateRequest,
  advice: validateAdvice,
  wish: validateWish,
};

function usage(): never {
  console.error(`Usage: bun run validate.ts <request|advice|wish> <slug> [--check] <本文ファイル>`);
  process.exit(1);
}

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const positional = args.filter((a) => a !== "--check");
if (positional.length !== 3) usage();

const [kindArg, slug, contentPath] = positional;
if (!(kindArg in VALIDATORS)) usage();
const kind = kindArg as Kind;

if (!/^[a-zA-Z0-9ぁ-んァ-ヶ一-龠_-]+$/.test(slug)) {
  console.error(`slug にファイル名に使えない文字が含まれています: ${slug}`);
  process.exit(1);
}

const contentFile = Bun.file(contentPath);
if (!(await contentFile.exists())) {
  console.error(`本文ファイルが見つかりません: ${contentPath}`);
  process.exit(1);
}
const content = await contentFile.text();

const errors = VALIDATORS[kind](content);
if (errors.length) {
  console.error(`バリデーションエラー:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

if (checkOnly) {
  console.log(`OK: ${kind} として有効 (${content.length}字)`);
  process.exit(0);
}

await mkdir(INBOX_DIR, { recursive: true });
const date = new Date().toISOString().slice(0, 10);
const file = join(INBOX_DIR, `${date}_${KIND_LABEL[kind]}_${slug}.md`);
await Bun.write(file, content);
console.log(`${KIND_LABEL[kind]}を届けました: ${file}`);
