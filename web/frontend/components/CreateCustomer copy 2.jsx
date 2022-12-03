import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
export function CreateCustomerCopy2() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const [loyalty, setLoyalty] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
 
  const handleSubmit = useCallback((_event) => {
    const data = `{
        "firstName": ${firstName},
        "lastName": "${lastName}",
        "phone": "${phone}",
        "email": "${email}",
        "loyalty": "${loyalty}"
      }`;
    // const response = fetch("/api/customer/create", {
    //     method: `POST`,
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: data
    // });

    setEmail('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setLoyalty(false);
  }, []);

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setEmail('');
//     setFirstName('');
//     setLastName('');
//     setPhone('');
//     setLoyalty(false);
//     //const response = await fetch("/api/customer/create");

//     if (response.ok) {
//       //await refetchProductCount();
//       setToastProps({ content: "Customer created!" });
//     } else {
//       setIsLoading(false);
//       setToastProps({
//         content: "There was an error creating products",
//         error: true,
//       });
//     }
//   };

  const handleLoyaltyChange = useCallback(
    (value) => setLoyalty(value),
    [],
  );

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleFirstNameChange = useCallback((value) => setFirstName(value), []);
  const handleLastNameChange = useCallback((value) => setLastName(value), []);
  const handlePhoneChange = useCallback((value) => setPhone(value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Opt in for Rewards"
          checked={loyalty}
          onChange={handleLoyaltyChange}
        />
        <TextField
          value={firstName}
          onChange={handleFirstNameChange}
          label="First Name"
          type="firstName"
          autoComplete="firstName"
        />
        <TextField
          value={lastName}
          onChange={handleLastNameChange}
          label="Last Name"
          type="lastName"
          autoComplete="lastName"
        />
        <TextField
          value={phone}
          onChange={handlePhoneChange}
          label="Phone"
          type="phone"
          autoComplete="phone"
        />
        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
          helpText={
            <span>
              We’ll use this email address to inform you on future changes
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}