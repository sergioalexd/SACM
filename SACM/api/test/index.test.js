const axios = require('axios');

const url = 'http://localhost:4000/api/v1';

describe("Test de ruta creacion de usuario", () => {
    test("Debe crear un usuario", async () => {
        const res = await axios.post(`${url}/usuarios/createuser`, {
            nombre: "test",
            apellido: "test",
            correo: "mail@mail.com",
            contrasena: "test"
        });
        expect(res.status).toEqual(200);
    });


    test("Debe retornar un error si no se envian los datos", async () => {
        try {
            await axios.post(`${url}/usuarios/createuser`, {
                nombre: "",
                apellido: "",
                correo: "",
                contrasena: ""
            });
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }  
    });
});
            