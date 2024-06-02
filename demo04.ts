import { ChatOpenAI } from "@langchain/openai";

// Context Window が短いモデル
const shorterLlm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  maxRetries: 0,
});

// Context Window が長いモデル
const longerLlm = new ChatOpenAI({
  model: "gpt-3.5-turbo-16k",
});

// フォールバックを追加
const modelWithFallback = shorterLlm.withFallbacks({
  fallbacks: [longerLlm],
});

// Context Window が短いモデルでエラーが出るように長い文章を生成
const input = `What is the next number: ${"one, two, ".repeat(3000)}`;

// Context Window が短いモデルでエラーが出るか確認
try {
  await shorterLlm.invoke(input);
} catch (e) {
  // Length error
  console.log(e);
}

// 実際に投げてみる
const result = await modelWithFallback.invoke(input);

console.log(result);
