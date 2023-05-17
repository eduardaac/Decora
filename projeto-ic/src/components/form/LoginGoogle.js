import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';


function LoginGoogle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential)
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setIsLoggedIn(true);
    document.getElementById("signInDiv").hidden = true;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "841263632389-9rrtod64vn2jfsa96plajok5pcb0nan9.apps.googleusercontent.com",
      callback: handleCallbackResponse

    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        text: "signin_with.",
        size: "medium",
        logo_alignment: "center",
        width: "400"
      }
    );
  }, []);
  return (
    <div className="LoginGoogle">
      <div id="signInDiv"></div>
      {isLoggedIn ? (
        <Navigate to="/LoginComplementar"></Navigate>
      ) : (
        ""
      )}

    </div>
  );
}

export default LoginGoogle;
