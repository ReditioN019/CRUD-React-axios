import { AppBar,Tabs, Tab } from '@material-ui/core'

const Navbar = ({tab, setTab}) => {

    //Retornamos el valor del parametro
    const changeValue = index =>  index

    //seteamos el nuevo valor
    const handleChange = (e, newValue) =>{
        setTab(newValue)
    }

    return (
        <AppBar position="static" >
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Registrar usuario" {...changeValue(0)}/>
                <Tab label="Lista" {...changeValue(1)}/>
            </Tabs>
        </AppBar>     
    )
}

export default Navbar
