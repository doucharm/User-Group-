import { Display } from 'Components/Card_Display';
import { data } from 'Data/data';
export const GroupPage = ({id}) => {
    const [group, setGroup] = useState(null)
    
    useEffect(
        () => {
            data(id)
                .then(response => response.json())    
                .then((json) => setGroup(json))
        }, [id]
    )
    
    
    
    if (group) {
        return (
            <Display group={group} />
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}