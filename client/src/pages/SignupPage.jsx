import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import useRegisterUserService from "../services/useRegisterUserService.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerUserService = useRegisterUserService(
    email,
    password,
    confirmPassword
  );

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    await registerUserService.signUser().then(() => {
      registerUserService.status === 200
        ? toast.success("Cadastro efetuado com sucesso!") && navigate("/login")
        : toast.error("Erro ao fazer cadastro. Por favor, tente novamente.");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Registrar</CardTitle>
          <CardDescription>
            Digite seu email e senha para criar uma conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@solvelight.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Criar Conta
            </Button>
            <Button
              type="button"
              className="w-full mt-4 cursor-pointer"
              // eslint-disable-next-line no-undef
              onClick={() => navigate("/login")}
            >
              Acessar Conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
