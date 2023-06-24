import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { IUsuario } from "../../entities/interfaces/IUsuario";
import { getPasswordHash } from "../../utils/getPasswordHash";

export class AlterarUsuarioUseCase {
  private usuarioRepository = new UsuarioRepository();

  async execute(id: number, usuarioData: IUsuario) {
    try {
      if (usuarioData.senha) {
        usuarioData.senha = await getPasswordHash(usuarioData.senha);
      }
  
      const usuarioAtualizado: IUsuario = this.removerCamposUndefined(usuarioData);

      const usuarioSalvo = await this.usuarioRepository.update(
        id,
        usuarioAtualizado
      );
  
      return { usuario: usuarioSalvo };
    } catch (error: any) {
      console.log(error);
      return { error: "Falha ao alterar usuário" };
    }
  }
  
  private removerCamposUndefined(obj: any): any {
    const newObj: any = {};
  
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        const nestedObj = this.removerCamposUndefined(value);
        if (Object.keys(nestedObj).length > 0) {
          newObj[key] = nestedObj;
        }
      } else if (value) {
        newObj[key] = value;
      }
    }
  
    return newObj;
  }
  
}
