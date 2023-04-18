import { data } from "Data/data";
import { Get_Card_Display } from "./Card_Display";
import { Search_Bar_Display } from "./Search_Bar";
import 'bootstrap/dist/css/bootstrap.min.css';
export const Display = ({id}) => {
    if(id)
    {
        return (
            <main>
            <div>
                <Search_Bar_Display data={data} />
                <Get_Card_Display data={data} id = {id}/>
            </div>
            
        </main>
            
        )
    } else {
    return (
        <main>
            <div>
                <Search_Bar_Display data={data} />
            </div>
            
        </main>
    )
    }
}