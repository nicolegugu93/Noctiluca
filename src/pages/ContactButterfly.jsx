//export default function ContactButterfly() {
  //return <div>Contact Butterfly Page</div>;
//}

//import React from "react";
export default function ContactButterfly() {
  const team = [
    {
      name: "Esther Tapias",
      email: "esthertpc93@gmail.com",
      linkedin: "https://www.linkedin.com/in/esther-tapias-paez-camino/",
      github: "https://github.com/EstherTapias",
    },
    {
      name: "Valentina Montilla",
      email: "valenmontillaes@gmail.com",
      linkedin: "https://www.linkedin.com/in/valentina-montilla",
      github: "",
    },
    {
      name: "Mariana Moreno",
      email: "mariana@example.com",
      linkedin: "https://www.linkedin.com/in/mariana-moreno",
      github: "",
    },
    {
      name: "Nicole Guevara",
      email: "nicole@example.com",
      linkedin: "https://www.linkedin.com/in/nicole-guevara",
      github: "",
    },
    {
      name: "Maryori Cruz",
      email: "maryori.eguizabal@gmail.com",
      linkedin: "https://www.linkedin.com/in/maryori-cruz",
      github: "https://github.com/MaryoriCruz",
    },
    {
      name: "Rocio",
      email: "rocio@example.com",
      linkedin: "https://www.linkedin.com/in/rocio",
      github: "",
    },
  ];

  return (
    <div>
      <h1>Sobre el proyecto</h1>
      <p>
        Este es un proyecto sin animo de lucro, que pretende ayudar a sus
        desarrolladoras en su aprendizaje sobre el desarrollo web y de paso
        concientizar a los visitantes y brindar un espacio para compartir
        conocimientos.
      </p>

      <h2>Contacta con nosotras</h2>
      <ul>
        {team.map((person, index) => (
          <li key={index}>
            <p>Nombre: {person.name}</p>
            <p>Correo: {person.email}</p>
            <p>
              LinkedIn:{" "}
              <a href={person.linkedin} target="_blank" rel="noreferrer">
                {person.linkedin}
              </a>
            </p>
            <p>Teléfono: {person.phone}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
