import React, { useState, useEffect } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";

import { AiOutlineDownload } from "react-icons/ai";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDetalles from '../../components/PdfDetalles';

const Reportes = () => {
  const [forms, setForms] = useState([]);
  const [selectedVereda, setSelectedVereda] = useState("");
  const [maxCasos, setMaxCasos] = useState(0);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("forms")) || [];
    setForms(savedForms);
    setSelectedVereda("");
  }, []);

  useEffect(() => {
    const maxCasos = calculateMaxCasos();
    setMaxCasos(maxCasos);
  }, [forms, selectedVereda]);

  const getUniqueVeredas = () => {
    const uniqueVeredas = new Set();
    forms.forEach((formData) => {
      if (formData.demandante?.vereda?.label) {
        uniqueVeredas.add(formData.demandante.vereda.label);
      }
      if (formData.demandados && formData.demandados.length > 0) {
        formData.demandados.forEach((demandado) => {
          if (demandado.vereda?.label) {
            uniqueVeredas.add(demandado.vereda.label);
          }
        });
      }
    });
    return Array.from(uniqueVeredas);
  };

  const generateBarChartData = () => {
    const veredaTipoDemandaCounts = {};

    forms.forEach((formData) => {
      const vereda = formData.demandante?.vereda?.label || "";
      const tipoDemanda = formData.demandante?.tipoDemanda?.label;

      if (!selectedVereda || vereda === selectedVereda) {
        if (!veredaTipoDemandaCounts[vereda]) {
          veredaTipoDemandaCounts[vereda] = {};
        }
        if (tipoDemanda) {
          veredaTipoDemandaCounts[vereda][tipoDemanda] =
            (veredaTipoDemandaCounts[vereda][tipoDemanda] || 0) + 1;
        }

        if (formData.demandados) {
          formData.demandados.forEach((demandado) => {
            const demandadoVereda = demandado.vereda?.label || "";
            const demandadoTipoDemanda = demandado.tipoDemanda?.label;

            if (!selectedVereda || demandadoVereda === selectedVereda) {
              if (!veredaTipoDemandaCounts[demandadoVereda]) {
                veredaTipoDemandaCounts[demandadoVereda] = {};
              }
              if (demandadoTipoDemanda) {
                veredaTipoDemandaCounts[demandadoVereda][demandadoTipoDemanda] =
                  (veredaTipoDemandaCounts[demandadoVereda][
                    demandadoTipoDemanda
                  ] || 0) + 1;
              }
            }
          });
        }
      }
    });

    const chartData = [];
    Object.entries(veredaTipoDemandaCounts).forEach(
      ([vereda, tipoDemandaCounts]) => {
        Object.entries(tipoDemandaCounts).forEach(([tipo, count]) => {
          chartData.push({ vereda, tipoDemanda: tipo, value: count });
        });
      }
    );

    return chartData;
  };

  const calculateMaxCasos = () => {
    let max = 0;
    const chartData = generateBarChartData();
    chartData.forEach((data) => {
      if (data.value > max) {
        max = data.value;
      }
    });
    return max;
  };

  const createBarChart = () => {
    const chart = anychart.bar();
    chart.title("Casos por Vereda y Tipo de Demanda");
    chart.yScale().minimum(0);
    const chartData = generateBarChartData();
    chart.data(chartData);
    return chart;
  };

  const createPieChart = () => {
    const chart = anychart.pie();
    chart.title(
      `Tipos de Demanda en Vereda: ${selectedVereda || "Todas las Veredas"}`
    );
    const chartData = generatePieChartData();
    chart.data(chartData);
    return chart;
  };

  const generatePieChartData = () => {
    const tipoDemandaCounts = {};
    forms.forEach((formData) => {
      const vereda = formData.demandante?.vereda?.label || "";
      const tipoDemanda = formData.demandante?.tipoDemanda?.label;
      if (!selectedVereda || vereda === selectedVereda) {
        if (tipoDemanda) {
          tipoDemandaCounts[tipoDemanda] =
            (tipoDemandaCounts[tipoDemanda] || 0) + 1;
        }
      }
      if (formData.demandados) {
        formData.demandados.forEach((demandado) => {
          const demandadoVereda = demandado.vereda?.label || "";
          const demandadoTipoDemanda = demandado.tipoDemanda?.label;
          if (!selectedVereda || demandadoVereda === selectedVereda) {
            if (demandadoTipoDemanda) {
              tipoDemandaCounts[demandadoTipoDemanda] =
                (tipoDemandaCounts[demandadoTipoDemanda] || 0) + 1;
            }
          }
        });
      }
    });
    return Object.entries(tipoDemandaCounts).map(([tipo, count]) => ({
      x: tipo,
      value: count,
    }));
  };



  return (
    <div className="container mx-auto py-8">
      <div className="bg-gray-100 p-8 rounded-xl">
        <h2 className="text-2xl text-gray-800 mb-4">Reportes Gráficamente</h2>
        <div className="flex justify-center mb-4">
          <select
            id="veredaSelect"
            value={selectedVereda}
            onChange={(e) => setSelectedVereda(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mr-2 focus:outline-none"
          >
            <option value="">Todas las Veredas</option>
            {getUniqueVeredas().map((vereda) => (
              <option key={vereda} value={vereda}>
                {vereda}
              </option>
            ))}
          </select>
          <button className=" bg-blue-600 px-4 py-2 border border-gray-300 rounded mr-2 ">GENERAR REPORTE</button>
      
        </div>
        <div className="grid  gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tipos de Demanda en Vereda
            </h3>
            <div className="mt-4">
            <AnyChart instance={createPieChart()} width="100%" height={400} />
            <AnyChart instance={createBarChart()} width="100%" height={400} />
            </div>
          </div>
          
        </div>

       

     
    
      </div>
    </div>
  );
};

export default Reportes;
