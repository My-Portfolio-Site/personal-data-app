import { pipeline, PipelineType, ProgressCallback } from "@huggingface/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
const P = () => class PipelineSingleton {
  static task: PipelineType = 'summarization';
  static model = 'google-t5/t5-small';
  static instance: PipelineSingleton | null = null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  static async getInstance(progress_callback: ProgressCallback | undefined = undefined) {
    if (!this.instance) {
      this.instance = pipeline(this.task);
    }
    return this.instance;
  }
}

let PipelineSingleton: ReturnType<typeof P>;
if (process.env.NODE_ENV !== 'production') {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  const globalWithPipeline = global as typeof global & { PipelineSingleton: ReturnType<typeof P> };

  if (!globalWithPipeline.PipelineSingleton) {
    globalWithPipeline.PipelineSingleton = P();
  }

  PipelineSingleton = globalWithPipeline.PipelineSingleton;
} else {
  PipelineSingleton = P();
}
export default PipelineSingleton;