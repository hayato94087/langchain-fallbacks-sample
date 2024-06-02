import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config'

// モデル名が誤っている対話モデル
const modelWithBackModelName = new ChatOpenAI({
  model: "bad-model",
  temperature: 0,
  maxRetries: 0,
});

// モデル名が正しい対話モデル
const modelWithCorrectModelName = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

// フォールバックを追加
const modelWithFallback = modelWithBackModelName.withFallbacks({
  fallbacks: [modelWithCorrectModelName],
});

// モデルを呼び出す
const result = await modelWithFallback.invoke("あなたの名前は？");
console.log(result);