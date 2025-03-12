import apiClient from "../plugins/axios";

export async function  getDataurl(url){
    try {
        const response = await apiClient.get('url');
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('error en la peticion get',error);
       throw error;
    } 
}

export async function  postDataurl(url, data){
    try {
        const response = await apiClient.post(url, data);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('error en la peticion post',error);
       throw error;
    }
}

export async function  putDataurl(url, data){
    try {
        const response = await apiClient.put(url, data);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('error en la peticion put',error);
       throw error;
    }
}