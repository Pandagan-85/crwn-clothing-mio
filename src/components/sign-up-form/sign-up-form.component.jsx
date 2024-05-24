import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";
import "./sign-up-form.styles.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("le psw non coincidono");
      return;
    }

    //se invece coincidono
    // const { user } = await createAuthUserWithEmailAndPassword(email, password);
    // const userDocRef = await createUserDocumentFromAuth(user);
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      //Aggiungiamo questo spread, perchè il display non viene passato dall'autenticazione, ma dal nostro form di sign up, e lo aggiungiamo al db.
      resetFormFields();
      //console.log(user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Errore email già usata");
      } else {
        console.log("la creazione dell utente ha un problema", error);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and passoword</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          inputOptions={{
            required: true,
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label='Email'
          inputOptions={{
            required: true,
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label='Password'
          inputOptions={{
            required: true,
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
            minLength: 6,
          }}
        />
        <FormInput
          label='Confirm Password'
          inputOptions={{
            required: true,
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
            minLength: 6,
          }}
        />
        <Button type='submit'>Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
