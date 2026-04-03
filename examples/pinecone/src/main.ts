import 'dotenv/config';
import { RAGApplicationBuilder } from '@caspian2026/embedjs';
import { OpenAiEmbeddings } from '@caspian2026/embedjs-openai';
import { WebLoader } from '@caspian2026/embedjs-loader-web';
import { PineconeDb } from '@caspian2026/embedjs-pinecone';

const llmApplication = await new RAGApplicationBuilder()
    .setEmbeddingModel(new OpenAiEmbeddings())
    .setVectorDatabase(
        new PineconeDb({
            projectName: 'test',
            namespace: 'dev',
            indexSpec: {
                serverless: {
                    cloud: 'aws',
                    region: 'us-east-1',
                },
            },
        }),
    )
    .build();

await llmApplication.addLoader(new WebLoader({ urlOrContent: 'https://en.wikipedia.org/wiki/Tesla,_Inc.' }));
console.log(await llmApplication.query('Who founded Tesla?'));
