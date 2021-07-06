import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'

const NewUser = () => {

    const [userData, setUserData] = useState({
        user: '',
        password: ''
    });
    const {user, password} = userData
    
    
    const handleChange = e => {
        setUserData(preData => ({
            ...preData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://192.99.144.232:8080/api/usuario', {
            usuario: user,
            password: password
        }) 
         
        .then(
            (response) =>{
                alert("Esaa!!")
            },
            (error) => {
                alert("Error")
            }
        )

        setUserData({
            user: '',
            password: ''
        })
    }

   
    return (
        <Container component="main" maxWidth="xs" className="mt-5">

            <Typography component="h1" variant="h5">
            Ingresa un usuario
            </Typography>

            <form  onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Nombre usuario"
                    autoComplete="email"
                    autoFocus  
                    name="user"
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // onClick={() => addData()}
                > 
                    Añadir usuario
                </Button>

            </form>

           

        </Container>
    )
}

export default NewUser
