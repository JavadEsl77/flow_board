import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const baseURL = 'http://185.208.79.133:6070/api';


function axiosInstanceConfig(url: string, method: string, data?: any) {
    const config: AxiosRequestConfig = {
        url: url,
        method: method,
        data: data
    }
    const axiosInstanceRequest: AxiosInstance = axios.create({
        baseURL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (localStorage.getItem("access_token") ?? 'is null'),
        },
    });

    try {
        return axiosInstanceRequest(config)
    } catch (error) {
        throw error
    }

}

export const login = async (username: string, password: string): Promise<AxiosResponse> => {

    const axiosLoginInstance: AxiosInstance = axios.create({
        baseURL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const config: AxiosRequestConfig = {
        url: '/login',
        method: 'POST',
        data:
            {
                username,
                password
            }

    };

    try {
        return await axiosLoginInstance(config);
    } catch (error) {
        throw error;
    }
};

export const logout = async (): Promise<AxiosResponse> => {
    return axiosInstanceConfig("/logout", 'POST')
}

export const getUserInfo = async (): Promise<AxiosResponse> => {
    return axiosInstanceConfig("/user", 'POST')
}

export const setTodoInfo = async (title: string, description: string, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig('/todo', 'POST', {title, description, status})
}

export const updateTodoInfo = async (id: any, title: string, description: string, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/todo/${id}`, 'POST', {title, description, status})
}


export const getProjects = async (): Promise<AxiosResponse> => {
    return axiosInstanceConfig('/project', 'GET')
}

export const getProjectInfo = async (projectId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}`, 'GET')
}

export const getBorders = async (projectId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board?sort=updated_at:asc`, 'GET')
}

export const getTasks = async (projectId: any, borderId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board/${borderId}/task`, 'GET')
}

export const setProject = async (name: string, description: string, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project`, 'POST', {name, description, status})
}

export const setBoard = async (id: any, name: string, order: number, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${id}/board`, 'POST', {name, order, status})
}

export const setTask = async (bordId: any, projectId: any, name: string, description: string, work_log: string, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board/${bordId}/task`, 'POST', {
        name,
        description,
        status,
        work_log
    })
}

export const deleteBoard = async (projectId: any, boardId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}`, 'DELETE')
}

export const updateBoard = async (projectId: any,boardId:any, name: string, order: number, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board/${boardId}`, 'POST', {name, order, status})
}

export const updateProjectInfo = async (projectId: any, name: string, description: string, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}`, 'POST', {name, description, status})
}

export const deleteProject = async (projectId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}`, 'DELETE')
}








