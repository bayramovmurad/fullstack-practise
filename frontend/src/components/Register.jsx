import { useDispatch, useSelector } from "react-redux"
import { setCreateForm } from '../redux/userSlice'
import { useAddRegisterUserMutation } from "../redux/userApiSlice";


const Register = () => {
  const dispatch = useDispatch();
  const {createForm} = useSelector(state => state.user);
  const [addRegisterUser] = useAddRegisterUserMutation();


  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch(setCreateForm({name, value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addRegisterUser(createForm);
      alert(response.data.message)
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="border border-black" name="username" value={createForm.username} onChange={handleChange} type="text" />
      <input className="border border-black" name="email" value={createForm.email} onChange={handleChange} type="email" />
      <input className="border border-black" name="password" value={createForm.password} onChange={handleChange} type="password" />
      <input className="border border-black" type="submit" />
    </form>
  )
}
export default Register