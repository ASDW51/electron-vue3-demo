export default [
    {
        path:"/",
        redirect:"/login"
    },
    {
        path:"/login",
        component:()=>import("../components/login.vue")
    },
    {
        path:"/index",
        component:()=>import("../components/index.vue")
    }
]