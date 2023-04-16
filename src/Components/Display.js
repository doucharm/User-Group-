import { data } from "Data/data";
import { Get_Card_Display } from "./Card_Display";
import 'bootstrap/dist/css/bootstrap.min.css';
export const Display = () => {
    return (
        <div>
            <Get_Card_Display data={data} />
        </div>
    )
}