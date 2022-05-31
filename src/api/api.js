import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "fd4ca5d8-d6c6-4455-a6f0-9223d3ba2b4d"
    }
})


export const usersAPI =  {
    getUsers (activePage, usersOnPage) {
        return instance.get(`users?page=${activePage}&count=${usersOnPage}`).then(response => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`,{}).then(response => response.data)
    },
    unFollowUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(idFromURL){
        return instance.get(`profile/${idFromURL}`).then(response => response.data)
    },
    getUserStatus(id){
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status){
        return instance.put('profile/status',{status:status}).then(response => response.data)
    }
}
export const authAPI =  {
    getAuth () {
        return instance.get(`auth/me`).then(response => response.data)
    }
}