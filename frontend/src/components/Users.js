import React, {useState, useEffect} from 'react';


const API = process.env.REACT_APP_SUMMIT;

export const Users = () => {

    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [users, setUsers] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un usuario
        if(!editing) {
            const res = await fetch(`${API}/users`, {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization':  'Bearer '+ "token"
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password
                })
    
            })
            const data =await res.json();
            console.log(data)

        } else {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password
                })
            })
                
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('');
        }

        await getUsers();

        setName('');
        setUserName('');
        setEmail('');
        setPassword('')

    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        setUsers(data)
    }

    useEffect(() => {
        getUsers();
    },[])

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();

        setEditing(true);
        setId(id)
        
        setName(data.name)
        setUserName(data.username)
        setEmail(data.email)
        setPassword(data.password)
            
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('¿ Esta seguro que desea eliminarlo ?')
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data)
            await getUsers();
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    {/* Nombre */}
                    <div className="form-group">
                        <input 
                            type="text"
                            /* Cuando el usuario tipea algo será asignado a onChange */
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Apellido, Nombre"
                            autoFocus
                            required
                            />
                    </div>
                    {/* Nombre de usuario */}
                    <div className="form-group">
                        <input 
                            type="text"
                            /* Cuando el usuario tipea algo será asignado a onChange */
                            onChange={e => setUserName(e.target.value)}
                            value={username}
                            className="form-control"
                            placeholder="Usuario"
                            required
                            />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <input 
                            type="email"
                            /* Cuando el usuario tipea algo será asignado a onChange */
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="Email"
                            required
                            />
                    </div>
                    {/* Contraseña */}
                    <div className="form-group">
                        <input 
                            type="password"
                            /* Cuando el usuario tipea algo será asignado a onChange */ 
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="Password"
                            required
                            />
                    </div>
                    <button className="btn btn primary btn-block">
                        {editing ? 'Editar' : 'Crear'}
                    </button>

                </form>

            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Apellido, Nombre</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Cambios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                <button className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => editUser(user._id)}
                                        >
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deleteUser(user._id)}
                                        >
                                    Eliminar
                                </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}