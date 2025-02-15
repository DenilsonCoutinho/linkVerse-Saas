import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { usePathname, useSearchParams  } from "next/navigation";
interface CountProps {
  initialDate: string | undefined; // Data inicial
  initialHour: string | undefined; // Hora inicial
  typeColor?: string | undefined; // Hora inicial
}

function ContadorEterno({ initialDate, initialHour, typeColor }: CountProps) {

  const pathname = usePathname();
  console.log(pathname)

  const [tempo, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    if (!initialDate || !initialHour) {
      console.error("Data ou hora inicial não fornecida.");
      return;
    }

    const dataInicial = moment(`${initialDate}T${initialHour}`, "YYYY-MM-DDTHH:mm");
    if (!dataInicial.isValid()) {
      console.error("Data inicial inválida.");
      return;
    }

    const atualizarContador = () => {
      const agora = moment();

      // Calcula as diferenças
      const diffAnos = agora.diff(dataInicial, "years");
      const diffMeses = agora.diff(dataInicial, "months") % 12; // Resto da divisão para meses
      const diffDias = agora.diff(dataInicial.clone().add(diffAnos, "years").add(diffMeses, "months"), "days");

      const diffHoras = agora.hours() - dataInicial.hours();
      const diffMinutos = agora.minutes() - dataInicial.minutes();
      const diffSegundos = agora.seconds() - dataInicial.seconds();

      setTempo({
        anos: diffAnos,
        meses: diffMeses,
        dias: diffDias,
        horas: diffHoras < 0 ? diffHoras + 24 : diffHoras,
        minutos: diffMinutos < 0 ? diffMinutos + 60 : diffMinutos,
        segundos: diffSegundos < 0 ? diffSegundos + 60 : diffSegundos,
      });
    };

    // Atualiza o contador a cada segundo
    const interval = setInterval(atualizarContador, 1000);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [initialDate, initialHour]);

  return (
    <div>
      <h1 className={`${typeColor === "dark" ? "text-white" : "text-black"} text-black text-center font-semibold text-sm`}>Existimos há:</h1>
      {initialDate && initialHour && <div className="flex flex-wrap items-center justify-center md:max-w-[340px] max-w-[300px] gap-2 mt-2">

        <div className={`bg-white shadow-md md:p-[8px] p-[5px] rounded-md text-xs font-medium`}>
          {tempo.anos} {tempo.anos > 1 ? "anos" : "ano"},
        </div>

        <div className={`bg-white shadow-md md:p-[8px] p-[5px] rounded-md text-xs font-medium`}>
          {tempo.meses} {tempo.meses > 1 ? "meses" : "mês"}
        </div>

        <div className={`bg-white shadow-md md:p-[8px] p-[5px] rounded-md text-xs font-medium`}>
          {tempo.dias} {tempo.dias > 1?"dias":"dia"} 
        </div>
        <div className={`bg-white shadow-md md:p-[8px] p-[5px] rounded-md text-xs font-medium`}>
          {tempo.horas} horas
        </div>
        <div className={`bg-white shadow-md md:p-[8px] p-[5px] rounded-md text-xs font-medium`}>
          {tempo.minutos} minutos
        </div>

        <div className={`bg-white shadow-md md:p-[8px] py-[5px] md:w-[97px] w-[85px] rounded-md text-xs font-medium`}>
          {tempo.segundos} segundos
        </div>

      </div>
      }
    </div>
  );
}

export default ContadorEterno;
