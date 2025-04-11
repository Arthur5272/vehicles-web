"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./login.css";

const loginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [mainError, setMainError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setMainError(""); // limpa erro anterior
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setMainError(error.response.data.message || "Email ou senha inválidos");
      } else {
        setMainError("Erro de conexão com o servidor.");
      }
      reset({ password: "" }); // limpa apenas o campo senha
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <Image src="/logo.svg" alt="Logo" width={157} height={44} />

          <h1 className="login-title">
            Bem-vindo de volta! Insira seus dados.
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="input-group">
              <label htmlFor="email" className="login-text">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`input-field ${errors.email ? "error" : ""}`}
                placeholder="Digite seu email"
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password" className="login-text">
                Senha
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`input-field ${errors.password ? "error" : ""}`}
                placeholder="Digite sua senha"
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            {mainError && (
              <div className="error-message main-error">{mainError}</div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="contact-text">
            Não tem uma conta?{" "}
            <Link href="/register" className="link">
              Cadastre-se gratuitamente!
            </Link>
          </p>
        </div>

        <div className="login-image">
          <Image
            src="/image.svg"
            alt="Ilustração de login"
            width={51}
            height={51}
          />
        </div>
      </div>
    </div>
  );
}
