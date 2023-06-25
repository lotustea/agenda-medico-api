import { FastQueueWorker } from '../FastQWorker';
import { sendMail } from '../../mail/SendMail';

export class BaseMail {
  private fastQueueWorker: FastQueueWorker;

  constructor() {
    this.fastQueueWorker = new FastQueueWorker();
    this.processMailJobs();
  }

  public async addMailJob(email: string, subject: string, template: string, context: any) {
    const jobData = { email, subject, template, context };
    const jobId = this.fastQueueWorker.addJob(jobData);

    return jobId;
  }

  public processMailJobs() {
    const processor = async (job: any) => {
      const { email, subject, template, context } = job.data;
      await sendMail(email, subject, template, context);
    };
    this.fastQueueWorker.setProcessor(processor);
  }
}
