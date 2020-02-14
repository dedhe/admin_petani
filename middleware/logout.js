

export default async ({ redirect, store }) => {
   try {
    localStorage.removeItem("token");
    store.dispatch('setToken', "")
 
    return redirect('/')
   } catch (error) {
        console.error(error)
        localStorage.removeItem("token");
        return redirect('/')
   }


} 