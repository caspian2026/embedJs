import 'dotenv/config';
import { RAGApplicationBuilder, UrlLoader } from '@caspian2026/embedjs';
import { OpenAi, OpenAiEmbeddings } from '@caspian2026/embedjs-openai';
import { HNSWDb } from '@caspian2026/embedjs-hnswlib';

const llmApplication = await new RAGApplicationBuilder()
    .setModel(new OpenAi({ modelName: 'gpt-4o' }))
    .setEmbeddingModel(new OpenAiEmbeddings())
    .setVectorDatabase(new HNSWDb())
    .build();

await llmApplication.addLoader(new UrlLoader({ url: 'https://en.wikipedia.org/wiki/Tesla,_Inc.' }));

console.log(await llmApplication.query('Who founded Tesla?'));
