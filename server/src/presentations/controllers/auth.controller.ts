import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";

export class AuthController {
  private authService = new AuthService();

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { payload, token } = await this.authService.authenticate(
        email,
        password
      );
      return res.json({ payload, token });
    } catch (error) {
      return res.status(401).json({ error: "Erro na autenticação." });
    }
  }
}
