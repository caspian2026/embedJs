import 'dotenv/config';
import path from 'node:path';
import { RAGApplicationBuilder, SIMPLE_MODELS } from '@caspian2026/embedjs';
import { ImageLoader } from '@caspian2026/embedjs-loader-image';
import { OpenAiEmbeddings } from '@caspian2026/embedjs-openai';
import { HNSWDb } from '@caspian2026/embedjs-hnswlib';

const ragApplication = await new RAGApplicationBuilder()
    .setModel(SIMPLE_MODELS.OPENAI_GPT4_O)
    .setEmbeddingModel(new OpenAiEmbeddings())
    .setVectorDatabase(new HNSWDb())
    .build();

const imagePath = path.resolve('./examples/image/assets/test.jpg');
await ragApplication.addLoader(new ImageLoader({ filePathOrUrl: imagePath }));

await ragApplication.query('How does deep learning relate to artifical intelligence');
