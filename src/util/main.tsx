import ReactDOM from "react-dom/client"
import App from "@/util/App"
import "@/util/App.css"
import { Provider } from "react-redux"
import { store } from "@/services/toolkit/store"



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Provider store={store}>
    <App/> </Provider>) //Acces to the store, redux setup

export default {} 