import axios from "~/plugins/axios";


export default async ({ store }) => {
    try {
        let token = localStorage.getItem('token')
       // console.log(token)
        let data = await axios.get("/admin/statistik", {
            headers: {
                Authorization: `bearer ${token}`
            }

        })
     
           console.log(data.data)
       store.dispatch('setSeries',data.data.series)
       
        store.dispatch('setOptions',data.data.categoris)
        }




     catch (error) {
        console.error(error)
        // localStorage.removeItem("token");
        // return redirect('/')
    }


} 