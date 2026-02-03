import { useContext, useState } from "react";
import { Grid } from "../../Components/ui/Grid/Grid";
import { Input } from "../../Components/ui/Input/Input";
import { Submit } from "../../Components/ui/Submit/Submit";
import { AuthContext } from "../../context/AuthContext";

export function Login() {
  const [error, setError] = useState<string | null>(null);
  const { userData, setUserData } = useContext(AuthContext);

  function postLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Gem input values
    const form = e.target as HTMLFormElement;
    const userName = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const passWord = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    // Opret body (URLSearchParams)
    const body = new URLSearchParams();

    // append input values til body
    body.append("username", userName);
    body.append("password", passWord);

    const url = "http://localhost:3000/login";

    // POST body til backend server og håndter response (success/error)
    fetch(url, { method: "POST", body: body })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setError("");
      })
      .catch((error) => {
        console.error("Error logging in: ", error);
        setError("Der opstod en fejl - prøv igen");
      });
  }

  console.log("UserData: ", userData);

  return (
    <>
      {userData && (
        <b>
          Velkommen {userData.user.firstname} {userData.user.lastname}
        </b>
      )}
      {error && <b>{error}</b>}
      <form style={{ width: "30vw" }} onSubmit={postLogin}>
        <Grid gtr={"1fr 1fr 1fr"} gap={8}>
          <Input type="email" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <Submit value="Login" />
        </Grid>
      </form>
    </>
  );
}
