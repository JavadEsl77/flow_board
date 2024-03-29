import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
const BaseUrl = process.env.REACT_APP_API_BASE_URL || '';
function axiosInstanceConfig(url: string, method: string, data?: any) {

    const config: AxiosRequestConfig = {
        url: url,
        method: method,
        data: data,
        validateStatus: (status: number) => {
                if (status === 401) {
                    localStorage.setItem('access_token', '')
                    window.location.assign('/')
                }
                return true
        },

    }
    const axiosInstanceRequest: AxiosInstance = axios.create({
        baseURL: BaseUrl,
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
        baseURL: BaseUrl,
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

export const getProjects = async (): Promise<AxiosResponse> => {
    return axiosInstanceConfig('/project', 'GET')
}

export const getProjectInfo = async (projectId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}`, 'GET')
}

export const getBorders = async (projectId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board?sort=order:asc`, 'GET')
}

export const getTasks = async (projectId: any, borderId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board/${borderId}/task?sort=order:asc`, 'GET')
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

export const updateBoard = async (projectId: any, boardId: any, name: string, order: number, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`project/${projectId}/board/${boardId}`, 'POST', {name, order, status})
}

export const updateProjectInfo = async (projectId: any, name: string, description: string, status: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}`, 'POST', {name, description, status})
}

export const deleteProject = async (projectId: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}`, 'DELETE')
}

export const searchProjects = async (search: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project?search=${search}`, 'GET')
}

export const updateTask = async (boardId: any, taskId: any, projectId: any, name: string, description: string, status: string, work_log: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}`, 'POST', {
        name,
        description,
        status,
        work_log
    })
}

export const updateOrderingTask = async (projectId: any, boardId: any, task_ids: []): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/ordering`, 'POST', {task_ids})
}

export const searchUser = async (search: string): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/user?sort=updated_at:asc&search=${search}`, 'GET')
}

export const projectMemberAttach = async (projectId: any, user_id: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/member/attach`, 'POST', {user_id})
}

export const projectMemberDetach = async (projectId: any, user_id: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/member/detach`, 'POST', {user_id})
}

export const taskAssignUser = async (projectId: any,boardId: any,taskId:any, user_id: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}/user/assign`, 'POST', {user_id})
}

export const taskUnAssignUser = async (projectId: any,boardId: any,taskId:any, user_id: any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}/user/unassign`, 'POST', {user_id})
}

export const searchAssignUser = async (search: string , project_id:number): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/user?sort=id:asc&search=${search}&project_id=${project_id}`, 'GET')
}

export const deleteTask = async (projectId: any, boardId: any , taskId:any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}`, 'DELETE')
}

export const setWorkLog = async (projectId: any,  boardId: any , taskId:any , data:any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}/work-log`, 'POST', data)
}

export const getWorkLogs = async (projectId: any,  boardId: any , taskId:any ): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}/work-log?sort=updated_at:asc`, 'GET')
}

export const deleteWorkLog = async (projectId: any, boardId: any , taskId:any , logId:any): Promise<AxiosResponse> => {
    return axiosInstanceConfig(`/project/${projectId}/board/${boardId}/task/${taskId}/work-log/${logId}`, 'DELETE')
}



