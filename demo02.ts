import { ChatAnthropic } from "@langchain/anthropic";
import 'dotenv/config'

const model = new ChatAnthropic({
  model: "claude-3-sonnet-20240229",
  temperature: 0,
});

const result = await model.invoke("猫についてジョークを言ってください");
console.log(result)