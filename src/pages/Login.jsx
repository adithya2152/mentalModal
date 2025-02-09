export default function Login()
{
    return(
        <div>
           <form >
               <label>Username(use : HCIPROJ)</label>
               <input type="text" name="name" placeholder="Enter your name"></input>
               <label>Password(USE: PASSPROJ)</label>
               <input type="password" name="password" placeholder="Enter your password"></input>
               <button type="submit">Login</button>
           </form>
        </div>
    )
}