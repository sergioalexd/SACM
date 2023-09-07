
const url = 'http://localhost:8080/api/v1';

export class Api {
    static async loginUser() {
            const response = await fetch(url + "/usuarios/login");
        const data = await response.json();
        return data;
    }
}