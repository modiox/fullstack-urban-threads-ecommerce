import ReactDOM from "react-dom/client"
import App from "@/util/App"
import "@/util/App.css"
import { Provider } from "react-redux"
import { store } from "@/services/toolkit/store"



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Provider store={store}>
    <App/> </Provider>) //Acces to the store, redux setup

export default {} 

//Tried adding Query Client but did not help 

// import ReactDOM from "react-dom"
// import App from "./App"
// import { Provider } from "react-redux"
// import { store } from "./services/toolkit/store"
// import { QueryClient, QueryClientProvider } from "react-query"


// const queryClient = new QueryClient()


// ReactDOM.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </QueryClientProvider>
//   </React.StrictMode>,
//   document.getElementById("root") )

