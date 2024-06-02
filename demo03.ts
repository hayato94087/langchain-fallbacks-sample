import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config'
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// テキスト出力のパーサー
const outputParser = new StringOutputParser();



// ジョークを生成するプロンプトテンプレート
const promptTemplateWithBadModelName = PromptTemplate.fromTemplate("{topic}についてジョークを言ってください");

// モデル名が誤っている対話モデル
const modelWithBadModelName = new ChatOpenAI({
  model: "bad-model",
  temperature: 0,
  maxRetries: 0,
});

// Chain を作成
const badChain = promptTemplateWithBadModelName.pipe(modelWithBadModelName).pipe(outputParser);



// ポエムを生成するプロンプトテンプレート
const promptTemplateWithCorrectModelName = PromptTemplate.fromTemplate("{topic}についてポエムを言ってください");

// モデル名が正しい対話モデル
const modelWithCorrectModelName = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

// Chain を作成
const goodChain = promptTemplateWithCorrectModelName.pipe(modelWithCorrectModelName).pipe(outputParser);



// フォールバックを追加
const chain = badChain.withFallbacks({
  fallbacks: [goodChain],
});



// モデルを呼び出す
const result = await chain.invoke({
  topic: "龍",
});
console.log(result);