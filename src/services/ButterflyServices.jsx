const URL_API = "http://localhost:3002/butterfly";

// Método GET para leer todas las mariposas
export async function getAllButterflies() {
  try {
    const response = await fetch(URL_API); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las mariposas:", error);
  }
}

// Método GET para obtener una sola mariposa por ID
export async function getOneButterfly(id) {
  try {
    const response = await fetch(`${URL_API}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener la mariposa con ID ${id}:`, error);
  }
}

//Metodo Post para el create
export async function createButterfly(butterflyData) {
  try {
    const response = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(butterflyData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear la mariposa:", error);
  }
}
//Metodo Put para actualizar 
export async function updateButterfly(id, updatedData) {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al actualizar la mariposa con ID ${id}:`, error);
  }
}

//Metodo Delete para eliminar
export async function deleteButterfly(id) {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      console.log(`Mariposa con ID ${id} eliminada correctamente.`);
    } else {
      console.error(`Error al eliminar la mariposa con ID ${id}`);
    }
  } catch (error) {
    console.error(`Error al eliminar la mariposa con ID ${id}:`, error);
  }
}
//Metodo Post para contacto
export async function createContact(contactData) {
  try {
    const response = await fetch(URL_CONTACT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar el mensaje de contacto:", error);
    throw error;
  }
}