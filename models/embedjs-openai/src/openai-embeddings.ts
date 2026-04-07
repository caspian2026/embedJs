import { OpenAIEmbeddings } from '@langchain/openai';
import { BaseEmbeddings } from '@caspian2026/embedjs-interfaces';

export class OpenAiEmbeddings extends BaseEmbeddings {
    private model: OpenAIEmbeddings;

    constructor(private readonly configuration?: ConstructorParameters<typeof OpenAIEmbeddings>[0]) {
        super();
        if (!this.configuration) this.configuration = {};
        if (!this.configuration.model) this.configuration.model = 'text-embedding-3-small';

        this.model = new OpenAIEmbeddings(this.configuration);
    }

    override async getDimensions(): Promise<number> {
        if (this.configuration.dimensions) return this.configuration.dimensions;

        const model = this.configuration.model;
        if (model === 'text-embedding-3-small') return 1536;
        if (model === 'text-embedding-3-large') return 3072;
        if (model === 'text-embedding-ada-002') return 1536;

        // Dynamic fallback: embed a sample to determine dimensions
        const sample = await this.model.embedQuery('sample');
        return sample.length;
    }

    override async embedDocuments(texts: string[]): Promise<number[][]> {
        return this.model.embedDocuments(texts);
    }

    override async embedQuery(text: string): Promise<number[]> {
        return this.model.embedQuery(text);
    }
}
