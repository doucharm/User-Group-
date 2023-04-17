import { data } from "Data/data";
import { Get_Card_Display } from "./Card_Display";
import { Search_Bar_Display } from "./Search_Bar";
import 'bootstrap/dist/css/bootstrap.min.css';
export const Display = () => {
    const id = '95f19c4d-2710-41ee-9e48-9eb0314eedb3'
    return (
        <main>
            <div>
                <Search_Bar_Display data={data} />
            </div>
            
        </main>
    )
}