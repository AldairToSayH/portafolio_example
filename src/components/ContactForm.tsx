import type { FormEvent } from "react";
import { useState } from "react";

type ContactFormProps = {
  recipient: string;
};

export default function ContactForm({ recipient }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Mensaje desde el portafolio - ${name || "Contacto"}`);
    const body = encodeURIComponent(
      [`Nombre: ${name}`, `Correo: ${email}`, "", "Mensaje:", message].join("\n"),
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="glass-panel rounded-[2rem] p-6 sm:p-8" aria-label="Formulario de contacto" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="font-display text-2xl font-bold text-white">Mensaje rápido</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Completa los campos y se abrirá tu cliente de correo con el mensaje listo para enviar.
        </p>
      </div>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          Nombre
          <input
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white placeholder:text-slate-600"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          Correo
          <input
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white placeholder:text-slate-600"
            type="email"
            placeholder="tu-correo@ejemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          Mensaje
          <textarea
            className="min-h-32 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white placeholder:text-slate-600"
            placeholder="Cuéntame sobre tu idea o propuesta"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Enviar correo
        </button>
      </div>
    </form>
  );
}
