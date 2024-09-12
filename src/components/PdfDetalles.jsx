import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import fondoImage from "../assets/fondo_1.jpg";
import lado from "../assets/imagenlado.png";
import footer from "../assets/footerr.png";
import RobotoThinFont from "../assets/fonts/Roboto-Regular.ttf";

// Registra la fuente Roboto-Thin
Font.register({ family: "Roboto-Regular", src: RobotoThinFont });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 100,
    paddingBottom: 60,
    paddingHorizontal: 50,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    color: "black",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 50,
  },
  imageContainer: {
    marginRight: 11,
    left: 80,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  imagemargen: {
    width: 40,
    height: 800,
    marginTop: 750,
    marginRight: 10,
    right: 180,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    right: 60,
    textAlign: "center",
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    color: "black",
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 10,
  },
  footerImage: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    marginBottom: 10,
    marginTop: 20,
    textAlign: "justify", // Establece el justificado del texto
  },
});

const Header = () => (
  <View style={styles.header}>
    <View style={styles.imageContainer}>
      <Image src={fondoImage} style={styles.image} />
    </View>
    <View style={styles.imageContainer}>
      <Image src={lado} style={styles.imagemargen} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ ...styles.headerText, fontSize: 12, marginLeft: 45 }}>
        CABILDO INDÍGENA DEL RESGUARDO DE HONDURAS
      </Text>
      <Text style={{ ...styles.headerText, fontSize: 11 }}>
        Autoridad Tradicional
      </Text>
      <Text style={{ ...styles.headerText, fontSize: 11 }}>
        Ley 89 de 1890 Art.246-230C.P.C 1991
      </Text>
      <Text style={{ ...styles.headerText, fontSize: 9 }}>
        Nit. 817.002251-5
      </Text>
      <View style={styles.lineContainer}>
        <View
          style={{
            ...styles.line,
            width: "85%",
            marginLeft: 45,
            marginRight: "auto",
            marginTop: 5,
            borderBottomColor: "green",
            borderBottomWidth: 1,
            right: 60,
          }}
        />
      </View>
    </View>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <View style={styles.imageContainer}></View>
    <View
      style={{
        ...styles.line,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 3,
        borderBottomColor: "red",
        borderBottomWidth: 1,
      }}
    />
    <Image src={footer} style={styles.footerImage} />
    <Text
      style={{
        ...styles.header,
        margin: 4,
        left: 80,
        textAlign: "center",
        fontSize: 12,
      }}
    >
      Morales, Calle 3 No. 1 – 41. E-mail: cabildodehonduras@hotmail.com
    </Text>
  </View>
);

const Headersub = () => (
  <View>
    <View
      style={{
        ...styles.section,
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      <Text>MUNICIPIO DE MORALES CAUCA</Text>
    </View>
    <View
      style={{
        ...styles.section,
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold",
        marginTop: 15,
        fontSize: 14,
      }}
    >
      <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
        LOS SUSCRITOS MIEMBROS DE LA AUTORIDAD TRADICIONAL DEL{" "}
      </Text>
      <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
        RESGUARDO INDÍGENA DE HONDURAS, EN USO DE SUS FACULTADES{" "}
      </Text>
      <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
        LEGALES Y CONSTITUCIONALES QUE LE CONFIERE LA LEY 89 DE{" "}
      </Text>
      <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
        1890, Y LOS ARTÍCULOS 246 -330 DE LA CONSTITUCIÓN NACIONAL DE{" "}
      </Text>
      <Text style={{ marginLeft: "auto", marginRight: "auto" }}>1991 </Text>
    </View>
  </View>
);

const generateContent = (type, seguimientoActual, selectedForm) => {
  
  switch (type) {
    case "reportes":
      return {
        title: "Título del reporte",
        content: "Contenido del reporte aquí",
      };
    case "citaciones":
      return {
        title: "Título de la citación",
        content: "Contenido de la citación aquí",
      };
    case "actas":
      // Función para obtener la fecha y hora actual formateada con AM/PM
      const obtenerFechaHoraActual = () => {
        const fechaHoraActual = new Date();
        const dia = fechaHoraActual.getDate().toString().padStart(2, "0");
        const mes = (fechaHoraActual.getMonth() + 1)
          .toString()
          .padStart(2, "0"); // Los meses comienzan desde 0
        const año = fechaHoraActual.getFullYear();
        let hora = fechaHoraActual.getHours();
        const am_pm = hora >= 12 ? "PM" : "AM";
        hora = (hora % 12 || 12).toString().padStart(2, "0");
        const minutos = fechaHoraActual
          .getMinutes()
          .toString()
          .padStart(2, "0");
        return `${dia}/${mes}/${año}, ${hora}:${minutos} ${am_pm}`;
        
      };

      // Función para generar el contenido del acta con los nombres y cargos de las autoridades
      const generarContenidoActa = (acta) => {
        let autoridadesPresentes = acta.autoridades
          .map((autoridad) => `${autoridad.nombre} - ${autoridad.cargo.label}`)
          .join(", ");

         

        return `
            En consonancia con nuestras tradiciones ancestrales y como pueblo autónomo y originario, poseemos el derecho inherente a la autonomía sobre nuestro territorio. Este derecho encuentra respaldo tanto en las leyes superiores como en la Constitución de Colombia, las cuales nos reconocen y ratifican como una comunidad autónoma. No obstante, más allá de esta legitimidad legal, nos regimos por una estructura organizativa propia, sustentada en nuestra legislación indígena del Cauca. Esta legislación no solo nos otorga herramientas para la gestión de nuestro territorio, sino que también representa una plataforma de resistencia y lucha, enraizada en nuestra cosmovisión indígena. A través de estas leyes y principios, no solo protegemos nuestra identidad cultural y nuestros recursos naturales, sino que también defendemos nuestro derecho ancestral a la autodeterminación y la preservación de nuestro modo de vida
      
            
            Fecha: ${acta.fechaInicio}
            Lugar de reunión: ${acta.lugarReunion}
            Tipo Desarmonia: 
            Autoridades Presentes: ${autoridadesPresentes}
            Implicados: 

            
            Declaración del mandante:
            ${acta.declaracionMandante}\n\n
            Declaración del demandado:
            ${acta.declaracionDemandado}\n\n
            Desarrollo del caso:
            ${acta.desarrollo}\n\n
            Conclusiones:
            ${acta.conclusiones}\n\n
            Compromisos:
            ${acta.compromisos}\n\n
            Cierre:
            ${acta.cierre}\n\n
            Fecha Actual del cierre del caso:
            ${obtenerFechaHoraActual()} 
          `;
      };

      return {
        title: (
          <Text
            style={{ fontSize: 13, textAlign: "center" }}
          >{`\nACTA N°: ${seguimientoActual.radicado}`}</Text>
        ),
        content: generarContenidoActa(seguimientoActual),
      };

    case "recibidos":
      
      // Extraer datos del demandante y demandados
      const demandante = selectedForm.demandante;
      const demandados = selectedForm.demandados;

      // Construir el contenido con los datos extraídos
      let content =  `El comunero ${demandante.nombres} ${
        demandante.apellidos
      } identificado con ${
        demandante.tipoIdentificacion === "Cédula de ciudadanía"
          ? "CC"
          : demandante.tipoIdentificacion === "Tarjeta de Identidad"
          ? "TI"
          : "PS"
      } N° ${
        demandante.numeroIdentificacion
      } es miembro del territorio ancestral del Resguardo de Honduras de la vereda ${
        demandante.vereda.label
      } donde preserva su identidad y cultura. el dia ${
        demandante.fecha
      } a las ${demandante.hora}, se presenta para interponer una desarmonia ${
        demandante.tipoDemanda.label
      } en contra del comunero(a)`;
      demandados.forEach((demandado, index) => {
        content += ` ${demandado.nombres} ${
          demandado.apellidos
        } identificado con ${
          demandado.tipoIdentificacion === "Cédula de ciudadanía"
            ? "CC"
            : demandado.tipoIdentificacion === "Tarjeta de Identidad"
            ? "TI"
            : "PS"
        } ${demandado.numeroIdentificacion},`;
      });

      // Quitar la última coma y agregar el punto aparte y la descripción
      content =
        content.slice(0, -1) +
        `\n\nDESCRIPCION DESARMONIA:\n\n${demandante.descripcion} \n\nAsimismo, se hace constar que el señor ${demandante.nombres} ${demandante.apellidos} se acercó a las oficinas jurídicas de Desarmonías para presentar su queja ante la autoridad competente, encargada del territorio ancestral.\n\nPara dejar constancia de lo anterior, se firma en las oficinas facilitadas por el cabildo el día ${demandante.fecha} \n\n`   ;
      return {
        title: (
          <Text
            style={{ fontSize: 13, textAlign: "center" }}
          >{`\nARECOLECCION DESARMONIA CON EL RADICADO N°: ${selectedForm.radicado}`}</Text>
        ),

        content: content,
      };
    default:

      return {
        title: "Tipo de contenido no válido",
        content: "Tipo de contenido no válido",
      };
  }
};

const PdfDetalles = ({ type, seguimientoActual, selectedForm }) => {
  const { title, content } = generateContent(
    type,
    seguimientoActual,
    selectedForm
  );

  const loremIpsum = `
    ${(title, content)}

    Aquí va el texto largo adicional que deseas agregar.
  `;

  // Función para dividir el contenido en páginas
  const splitContentIntoPages = (content) => {
    const pages = [];
    const words = content.split(" ");
    let currentPage = "";

    words.forEach((word) => {
      if (currentPage.length + word.length <= 1400) {
        // Ajusta el número de caracteres por página según sea necesario
        currentPage += `${word} `;
      } else {
        pages.push(currentPage.trim());
        currentPage = `${word} `;
      }
    });

    // Agregar la última página
    if (currentPage.length > 0) {
      pages.push(currentPage.trim());
    }

    return pages;
  };

  const contentPages = splitContentIntoPages(loremIpsum);

  return (
    <Document>
      {contentPages.map((pageContent, index) => (
        <Page key={index} size="A4" style={styles.page}>
          {index === 0 && <Headersub />}{" "}
          {/* Renderizar Headersub solo en la primera página */}
          <Header />
          <Text style={styles.section}>{title}</Text>
          <Text style={styles.text}>{pageContent}</Text>
          <Footer />
        </Page>
      ))}
    </Document>
  );
};

export default PdfDetalles;
