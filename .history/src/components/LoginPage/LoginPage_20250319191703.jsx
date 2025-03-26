// import { useState, useEffect } from 'react';
// import useStore from '../../zustand/store';


// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const logIn = useStore((state) => state.logIn)
//   const errorMessage = useStore((state) => state.authErrorMessage);
//   const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

//   useEffect(() => {
//     // Clear the auth error message when the component unmounts:
//     return () => {
//       setAuthErrorMessage('');
//     }
//   }, [])

//   const handleLogIn = (event) => {
//     event.preventDefault();

//     logIn({
//       username: username,
//       password: password,
//     })
//   };

//   return (
//     <>
//       <h2>Login Page</h2>
//       <form onSubmit={handleLogIn}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">
//           Log In
//         </button>
//       </form>
//       { // Conditionally render login error:
//         errorMessage && (
//           <h3>{errorMessage}</h3>
//         )
//       }
//     </>
//   );
// }


// export default LoginPage;

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to log in.');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
