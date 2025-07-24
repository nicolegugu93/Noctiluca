//export default function ContactButterfly() {
  //return <div>Contact Butterfly Page</div>;
//}


//import React from "react";

export default function ContactButterfly() {
  const team = [
    {
      name: "Esther Tapias",
      email: "esther@example.com",
      linkedin: "https://www.linkedin.com/in/esther-tapias",
      phone: "+57 300 000 0001",
    },
    {
      name: "Valentina Montilla",
      email: "valentina@example.com",
      linkedin: "https://www.linkedin.com/in/valentina-montilla",
      phone: "+57 300 000 0002",
    },
    {
      name: "Mariana Moreno",
      email: "mariana@example.com",
      linkedin: "https://www.linkedin.com/in/mariana-moreno",
      phone: "+57 300 000 0003",
    },
    {
      name: "Nicole Guevara",
      email: "nicole@example.com",
      linkedin: "https://www.linkedin.com/in/nicole-guevara",
      phone: "+57 300 000 0004",
    },
    {
      name: "Maryori Cruz",
      email: "maryori@example.com",
      linkedin: "https://www.linkedin.com/in/maryori-cruz",
      phone: "+57 300 000 0005",
    },
    {
      name: "Rocio",
      email: "rocio@example.com",
      linkedin: "https://www.linkedin.com/in/rocio",
      phone: "+57 300 000 0006",
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
