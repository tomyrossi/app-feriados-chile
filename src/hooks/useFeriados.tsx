import { useState, useEffect } from "react";
import { Feriado } from "../interfaces/Feriado";

/**
 * Se crea un Custom Hook que devuelve los feriados a partir del año
 * que se envia por parametro para que sea reutilizable
 */

export const useFeriados = (añoInicial: number) => {
  const [feriados, setFeriados] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeriados = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: currentYear - añoInicial + 1 },
        (valor, index) => index + añoInicial
      );
      let allFeriados: string[] = [];

      try {
        for (const year of years) {
          const response = await fetch(`/fl/feriados/${year}`);
          if (!response.ok) {
            throw new Error("Error de comunicación");
          }
          const data: Feriado[] = await response.json();
          const feriadosDelAño = data.map(
            (feriado) =>
              feriado.fecha + " - " + feriado.nombre + " - " + feriado.tipo
          );
          allFeriados = allFeriados.concat(feriadosDelAño);
        }
        setFeriados(allFeriados);
      } catch (error: any) {
        console.error("Error al obtener datos:", error);
        setError(error.message);
      }
    };

    getFeriados();
  }, []);

  return { feriados, error };
};
