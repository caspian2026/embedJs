import 'dotenv/config';
import { LocalPathLoader, RAGApplicationBuilder } from '@caspian2026/embedjs';
import { OpenAi, OpenAiEmbeddings } from '@caspian2026/embedjs-openai';
import { HNSWDb } from '@caspian2026/embedjs-hnswlib';

const llmApplication = await new RAGApplicationBuilder()
    .setModel(new OpenAi({ modelName: 'gpt-4o' }))
    .setEmbeddingModel(new OpenAiEmbeddings())
    .setVectorDatabase(new HNSWDb())
    .build();

await llmApplication.addLoader(new LocalPathLoader({ path: './docs' }));
console.log(await llmApplication.query('How do you create an embedJs application?'));
