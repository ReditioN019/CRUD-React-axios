import { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel  } from '@material-ui/core';
// import Form from './Form'
import { 
    TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Button,Grid 
} from '@material-ui/core';
import axios from 'axios'


const TableCrud = () => {

    const [userList, setUserList] = useState([]);
    const [deleteUser, setDeleteUSer] = useState(false);
    const [idSelected, setIdSelected] = useState()
    const [updateData, setUpdateData] = useState({
       user: '',
       password: ''
    });
    const {user, password} = updateData

    useEffect(() => {

        getData();

    }, [deleteUser])


    //se listan los usuario
    const getData = async() => {
        const url = `http://192.99.144.232:8080/api/usuario`;        
        const resp = await axios.get(url);
        setUserList(resp.data);
    }

    const updateDatax = async(id) => {
        const url = `http://192.99.144.232:8080/api/usuario/${id}`;
        await axios.put(url, {
            usuario: user,
            password: password
        })
        setDeleteUSer(!deleteUser);
    }

    //se elimina un usuario
    const deleteData = async(id) => {
        const url = `http://192.99.144.232:8080/api/usuario/${id}`;
        await axios.delete(url);
        setDeleteUSer(!deleteUser);
    }

    const handleChange = (e) => {
        setUpdateData(preData => ({
            ...preData,
            [e.target.name]: e.target.value
        }))
    }

    const openModal = (thisId, thisUser, thisPass) => {
        setUpdateData({
            user: thisUser,
            password: thisPass
        })

        setIdSelected(thisId)
    }

    return (
        <TableContainer className="mt-5">
            <Table size="small">
                <TableHead>
                    <TableRow >
                        <TableCell>ID</TableCell>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell >Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {userList.map(data => (
                        <TableRow key={data.id}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.usuario}</TableCell>
                            <TableCell>{data.password}</TableCell>
                            <TableCell>
                                <Grid container justify="space-around">
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => openModal(data.id, data.usuario, data.password)}
                                        //para abrir el modal de boostrap
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    >Editar</Button>
                                    <Button 
                                        variant="outlined" 
                                        color="secondary"
                                        onClick={() => deleteData(data.id)}
                                    >Eliminar</Button>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>


   
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">EDITAR REGISTRO</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Grid container className="d-inline-block">
                            <Grid item md={12}>
                                <FormControl>
                                    <InputLabel htmlFor="user">Ingresa el usuario</InputLabel>
                                    <Input id="user" type="text" aria-describedby="my-helper-text" autoComplete="off" name='user' value={user} onChange={handleChange}/>
                                </FormControl>
                            </Grid>

                            <Grid item md={12} className="mt-4">
                                <FormControl mt={12}>
                                    <InputLabel htmlFor="pass">Ingresa la contraseña</InputLabel>
                                    <Input id="pass" type="text" aria-describedby="my-helper-text" name='password' value={password} onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => updateDatax(idSelected)}>Guardar Cambios</button>
                    </div>
                    </div>
                </div>
            </div>
           
        </TableContainer>    
    )
}

export default TableCrud
