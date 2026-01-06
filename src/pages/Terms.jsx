// src/pages/Terms.jsx
import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabecera */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Términos y Condiciones</h1>
          <p className="text-muted-foreground text-sm">
            Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Contenido Legal */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introducción</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bienvenido a nuestra plataforma. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones de uso, que junto con nuestra política de privacidad gobiernan la relación contigo en relación a este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Propiedad Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              El contenido, diseño, logotipos, gráficos y código fuente de este sitio web son propiedad exclusiva nuestra o de nuestros licenciantes y están protegidos por las leyes de propiedad intelectual internacionales. Queda prohibida su reproducción sin consentimiento explícito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Uso del Sitio</h2>
            <p className="text-muted-foreground leading-relaxed">
              Te comprometes a utilizar el sitio web únicamente con fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del sitio por parte de cualquier tercero.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio se proporciona "tal cual". No garantizamos que el sitio esté libre de errores o que el acceso al mismo sea ininterrumpido. No seremos responsables de ningún daño directo, indirecto o consecuente que surja del uso de este sitio.
            </p>
          </section>

          <section className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Si tienes alguna duda sobre estos términos, por favor contáctanos.
            </p>
            <div className="mt-4">
              <Link to="/" className="text-primary hover:underline font-medium">
                &larr; Volver al inicio
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;