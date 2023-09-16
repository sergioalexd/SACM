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

    static async getCitasByParamedico(id, token) {
        const response = await fetch(url + "/paramedicos/citas/" + id,
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

    static async getAllCitas(token) {
        const response = await fetch(url + "/citas",
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

    static async inhabilitarParamedico(id, token) {
        const response = await fetch(url + "/paramedicos/inhabilitar/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async habilitarParamedico(id, token) {
        const response = await fetch(url + "/paramedicos/habilitar/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async deleteParamedico(id, token) {
        const response = await fetch(url + "/paramedicos/delete/" + id,
        {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async registerParamedico(data) {
        const response = await fetch(url + "/paramedicos/",
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

    static async getParamedicosByNames(names, token) {
        const response = await fetch(url + "/paramedicos/bynames/" + names,
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

    static async getCitasByIdParamedico(id, token) {
        const response = await fetch(url + "/citas/byidparamedico/" + id,
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

    static async updateCitaMedica(data, id, token) {
        const response = await fetch(url + "/citas/update/" + id,
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

    static async cancelarCitaMedica(id, token) {
        const response = await fetch(url + "/citas/cancelar/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async finalizarCitaMedica(id, token) {
        const response = await fetch(url + "/citas/finalizar/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async getFichaMedicaByIdPaciente(id, token) {
        const response = await fetch(url + "/pacientes/fichamedica/" + id,
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

    static async updateDataParamedico(id, token, data) {
        const response = await fetch(url + "/paramedicos/update/" + id,
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

    static async deletePaciente(id, token) {
        const response = await fetch(url + "/pacientes/delete/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "access_token": token,
            },
        }
        );
        return response;
    }

    static async updateFichaMedica(id, token, data) {
        const response = await fetch(url + "/fichamedica/update/" + id,
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

}