import axios from "~/plugins/axios";


export default async ({ redirect, store }) => {
    try {
        let token = localStorage.getItem('token')
        console.log(token)
        let data = await axios.get("/cek", {
            headers: {
                Authorization: `bearer ${token}`
            }

        })
        if (data.data.level == 'admin') {
            console.log(data.data)
            store.dispatch('setUser',data.data)
            store.dispatch('setToken',token)
        }
        else {
           
            localStorage.removeItem("token");
            return redirect('/')
        }



    } catch (error) {
        console.error(error)
        localStorage.removeItem("token");
        return redirect('/')
    }


} 