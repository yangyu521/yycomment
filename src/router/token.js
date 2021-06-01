// import Vue from "vue"

// // let accesstoken = localStorage.getItem('token')
// // Vue.prototype.$checkAuth = (callback,accesstoken)=>{
// //     if(!accesstoken){
// //         this.$router.push('/login')
// //     }else{
// //         callback()
// //     }

// // }
// // const checkAuth = (callback,accesstoken)=>{
// //       if(!accesstoken){
// //         this.$router.push('/login')
// //     }else{
// //         callback()
// //     }  
// // }

//     const checkAuth = (callback,accesstoken)=>{
//         accesstoken = localStorage.getItem('token')
//         if(!accesstoken){
//             this.$router.push('/login')
//         }else{
//             callback()
//         }
//     }
    Vue.prototype.$checkAuth = checkAuth