const urlApi = import.meta.env.VITE_API;
const url = urlApi;

export class Api {
    static async loginUser(data) {
            const response = await fetch(url + "/usuarios/login",
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            );
        return response;
    }

    static async registerPaciente(data) {
        const response = await fetch(url + "/pacientes/",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        );
        return response;
    }

    static async pacientesLogin(data) {
        const response = await fetch(url + "/pacientes/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        );
        return response;
    }


    static async updatePaciente(data, id, token) {
        const response = await fetch(url + "/pacientes/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
            body: JSON.stringify(data),
        }
        );
        return response;
    }

    static async createCita(data, token) {
        const response = await fetch(url + "/citas/",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
            body: JSON.stringify(data),
        }
        );
        return response;
    }

    static async getParamedicos() {
        const response = await fetch(url + "/paramedicos/getall",
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        }
        );
        return response;
    }

    static async getCitasByPaciente(id, token) {
        const response = await fetch(url + "/citas/byidpaciente/" + id,
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async loginParamedico(data) {
        const response = await fetch(url + "/paramedicos/login",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        );
        return response;
    }

    static async getAllPacientes(token) {
        const response = await fetch(url + "/pacientes/",
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async getPacientesByNames(names, token) {
        const response = await fetch(url + "/pacientes/bynames/" + names,
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

}