import { BaseMail } from "./BaseMail";
import { IEnviarTokenRecuperarSenha } from './interfaces/IEnviarTokenRecuperarSenha';

export class EnviarTokenRecuperarSenhaMail extends BaseMail {
  protected subject = 'Recuperação de senha';
  protected template = 'EnviarTokenRecuperarSenha';

  public async enviar(job: IEnviarTokenRecuperarSenha) {
    await this.addMailJob(job.email, this.subject, this.template,  job);

    return 'Job adicionado à fila de e-mails.';
  }
}
