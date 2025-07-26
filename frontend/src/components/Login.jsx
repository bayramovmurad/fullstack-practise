import { useDispatch, useSelector } from "react-redux"
import { useAddLoginUserMutation } from "../redux/userApiSlice"
import { setLoginForm } from "../redux/userSlice"



const Login = () => {

    const dispatch = useDispatch();
    const {loginForm} = useSelector(state => state.user);
const [addLoginUser] = useAddLoginUserMutation();

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setLoginForm({name, value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addLoginUser(loginForm)
            alert(response.data.message)
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }



  return (
      <form onSubmit={handleSubmit}>
          <input className="border border-black" type="email" name="email" value={loginForm.email} onChange={handleChange} />
          <input className="border border-black" type="password" name="password" value={loginForm.password} onChange={handleChange} />
          <input type="submit" value="submit" className="border border-black" />
    </form>
  )
}
export default Login