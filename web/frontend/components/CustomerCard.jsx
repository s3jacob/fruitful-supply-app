import { useState, useEffect} from "react";
import SearchBar from "./SearchBar";
import UserInfoCard from "./UserInfoCard";

import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";

import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";


export function CustomerCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchCustomerCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/customer/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(Object);

  useEffect(() => {
    handlePopulate();
  }, [username]);
  
//   const getUserData = async () => {
//     setIsLoading(true);
//     console.log(`hereere....${username}`)
//     const response = await fetch("/api/customer/search");
//     if (response.ok) {
//       await refetchCustomerCount();
//       setToastProps({ content: "Found Customer!" });
//     } else {
//       setIsLoading(false);
//       setToastProps({
//         content: "There was an while searching user",
//         error: true,
//       });
//     }
//     const jsonData = await response.json();
//     if (jsonData && jsonData.message !== "Not Found") {
//         setUserData(jsonData);
//         console.log(jsonData)
//     }
//     else if (username !== "") {
//         console.log('Username does not exist');
//     }
//     else {
//         setUserData({})
//     }
// };
  const handlePopulate = async () => {
    setIsLoading(true);
    
    const headers = { 'username': `${username}` }
    const response = await fetch("/api/customer/search",{ headers });

    if (response.ok) {
      await refetchCustomerCount();
      const jsonData = await response.json();
      if (Object.keys(jsonData.customers).length > 0) {
        setToastProps({ content: `User found` });
        setUserData(jsonData);
      }else{
        setUserData(`{"customers":[{}]}`);
        setToastProps({ content: `User not found` });
      }
      // if(jsonData.customers.length == 0 || username !== ""){
       
      //   setUserData({"customers":[{}]});
      // }else{
      //   setUserData(jsonData);
      // }
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error searching customer",
        error: true,
      });
    }
  };

  
  return (
    <>
      {toastMarkup}
      <Card
        title="Add Customer"
        sectioned
        primaryFooterAction={{
          content: "Find Customer",
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <p>
        <SearchBar username={username} 
                setUsername={setUsername} />
        </p>
        <div>
        <UserInfoCard userData={userData} />
        </div>
        <TextContainer spacing="loose">
          <p>
            Look for customer {username}
          </p>
          <Heading element="h4">
            Total Customers
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {isLoadingCount ? "-" : data.count}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
