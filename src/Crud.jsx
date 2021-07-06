import { useState } from 'react';
import Navbar from './components/Navbar'
import TableCrud from './components/TableCrud'
import NewUser from './components/NewUser'
import {Container} from '@material-ui/core'

const Crud = () => {

    const [tab, setTab] = useState(0)

  
    return (
        <Container fixed>

            <Navbar tab={tab} setTab={setTab}/>
            
            { tab === 0 && <NewUser />}


            { tab === 1 && <TableCrud/>}

        </Container>
    )
}

export default Crud
