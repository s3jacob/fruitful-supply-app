import {
    useField,
    useReset,
    useDirty,
    useSubmit,
    notEmpty,
    lengthMoreThan,
  } from '@shopify/react-form';

import {
  Page,
  Layout,
  FormLayout,
  Form,
  Card,
  TextField,
  ContextualSaveBar,
  Frame,
  Banner,
} from '@shopify/polaris';

import { useAuthenticatedFetch } from "../hooks";

export function CreateCustomer() {
    const fetch = useAuthenticatedFetch();
    const firstName = useField({
        value: '',
        validates: [
          notEmpty('First Name is required'),
          lengthMoreThan(3, 'First Name must be more than 3 characters'),
        ],
      });
      const lastName = useField('');
      const email = useField('');
      const phone = useField('');

      const fields = {firstName, lastName, email, phone};
    
      // track whether any field has been changed from its initial values
      const dirty = useDirty(fields);
    
      // generate a reset callback
      const reset = useReset(fields);
    
      // handle submission state
      const {submit, submitting, errors, setErrors} = useSubmit(
        async (fieldValues) => {
          const remoteErrors = []; 
          const data = `{
            "firstName": "${fieldValues.firstName}",
            "lastName": "${fieldValues.lastName}",
            "phone": "${fieldValues.phone}",
            "email": "${fieldValues.email}"
          }`;
          const response = fetch("/api/customer/create", {
            method: `POST`,
            headers: {
                "Content-Type": "application/json"
            },
            body: data
          });

          if (remoteErrors.length > 0) {
            return {status: 'fail', errors: remoteErrors};
          }
    
          return {status: 'success'};
        },
        fields,
        reset
      );
    
      const contextBar = dirty && (
        <ContextualSaveBar
          message="Unsaved Customer"
          saveAction={{
            onAction: submit,
            loading: submitting,
            disabled: false,
          }}
          discardAction={{
            onAction: reset,
          }}
        />
      );
    
      const errorBanner = errors.length > 0 && (
        <Layout.Section>
          <Banner status="critical">
            <p>There were some issues with your form submission:</p>
            <ul>
              {errors.map(({message}, index) => {
                return <li key={`${message}${index}`}>{message}</li>;
              })}
            </ul>
          </Banner>
        </Layout.Section>
      );

return (
    <Frame>
      <Form onSubmit={submit}>
        <Page title="Add Customer">
          {contextBar}
          <Layout>
            {errorBanner}
            <Layout.Section>
              <Card sectioned>
                <FormLayout>
                  <TextField label="First Name" {...fields.firstName} />
                  <TextField label="Last Name" {...fields.lastName} />
                  <TextField label="Email" {...fields.email} 
                    helpText={
                        <span>
                        We’ll use this email address to inform you on future changes
                        </span>
                    } />
                  <TextField label="Phone" {...fields.phone} /> 
                </FormLayout>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </Form>
    </Frame>
  );
}