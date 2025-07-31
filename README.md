# ✨ Noctiluca


**Noctiluca** es una aplicación web interactiva pensada para explorar, aprender y valorar la biodiversidad de polinizadores en diferentes continentes. Esta edición se centra en el continente europeo y ha sido desarrollada como parte de un proyecto colaborativo en un bootcamp de desarrollo Fullstack + DevOps.


> 🌍 *Descubre mariposasde Europa en un entorno visual, educativo y accesible.*

---


## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [json-server](https://github.com/typicode/json-server) (para simular una API REST)
- [Vitest](https://vitest.dev/) (testing)
- [Cloudinary](https://cloudinary.com/) (gestión de imágenes)
- CSS Modules

---

## 📁 Instalación y uso local

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/usuario/noctiluca.git
   cd noctiluca
    ```
2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Inicia el servidor JSON (simula una API REST):**
    ```
    bash

    npm run api-fake
    ```

4. **Inicia la app:**
    ```
    bash

    npm run dev
    ```
5. Abre tu navegador en http://localhost:5173 para ver la aplicación.

## 👩‍💻 Equipo de desarrollo
Este proyecto ha sido desarrollado por el equipo Noctiluca dentro del bootcamp de Desarrollo Fullstack + DevOps:

| Nombre             | Rol                     | GitHub                                                     |
| ------------------ | ----------------------- | ---------------------------------------------------------- |
| Mariana Moreno     | Product Owner & Developer         | [@MarianaMH1195](https://github.com/MarianaMH1195)             |
| Nicole Guevara     | Scrum Master & Developer       | [@nicolegugu93](https://github.com/nicolegugu93)         |
| Maryori Cruz       | Developer      | [@MaryoriCruz](https://github.com/MaryoriCruz)             |
| Valentina Montilla | Developer     | [@ValenMontilla7](https://github.com/ValenMontilla7) |
| Rocío Coronel      | Developer | [@Rocio-Coronel](https://github.com/Rocio-Coronel)                 |
| Esther Tapias      | Developer      | [@EstherTapias](https://github.com/EstherTapias)             |

## 🌱 Funcionalidades
🌼 CRUD completo de polinizadores: crea, edita, elimina y consulta especies.

🗺️ Mapa interactivo con países de Europa.

🦋 Visualización de mariposas .

📸 Subida de imágenes vía Cloudinary.

✅ Validaciones de formularios con feedback visual.

🧪 Pruebas unitarias con Vitest.

## 📌 Estructura del proyecto
```
noctiluca/
├── public/
├── server/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── style/
│   └── test/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
```
## 🧪 Tests
Para ejecutar los tests:
```
bash
npm run test
 ```

## 📦 Próximas mejoras
🔍 Buscador de especies por nombre o país.

📊 Estadísticas visuales sobre biodiversidad.

🌐 Traducción multilingüe (i18n).

🔒 Autenticación y perfiles de usuario.

## 📄 Licencia
Este proyecto está bajo la licencia MIT.

>“Noctiluca” significa luz nocturna, como la bioluminiscencia en el océano o el brillo sutil de los insectos en la oscuridad. Queremos que esta app sea una chispa de conocimiento que ilumine la importancia de los polinizadores en Europa.
