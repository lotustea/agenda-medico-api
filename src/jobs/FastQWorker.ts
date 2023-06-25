import fastq from 'fastq';

export class FastQueueWorker {
  private queue: any;

  constructor() {
    this.queue = fastq(this.worker.bind(this), 1);
  }

  private async worker(job: any, cb: (error: Error | null, result?: any) => void) {
    try {
      const result = await this.processJob(job);
      cb(null, result);
    } catch (error: any) {
      cb(error);
    }
  }

  private async processJob(job: any): Promise<any> {
    console.log('Processando job', job);
    return 'success';
  }

  public addJob(jobData: any) {
    const taskId = Date.now();
    this.queue.push({ id: taskId, data: jobData }, (err: { message: any; }, result: any) => {
      if (err) {
        console.error(`Job ${taskId} executado com erro: ${err.message}`);
      }
    });
    return taskId;
  }

  public setProcessor(processor: (job: any) => Promise<any>) {
    this.processJob = processor;
  }
}
