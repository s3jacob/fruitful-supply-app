import {useField, useForm, notEmpty, lengthMoreThan} from '@shopify/react-form';

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

export function CreateCustomerCopy() {

    const {fields, submit, submitting, dirty, reset, submitErrors, makeClean} =
    useForm({
      fields: {
        firstName: useField({
          value: '',
          validates: [
            notEmpty('First Name is required'),
          ],
        }),
        lastName: useField({
            value: '',
            validates: [
              notEmpty('Last Name is required'),
            ],
          }),
        email: useField(''),
        phone: useField(''),
      },
      async onSubmit(form) {
        const remoteErrors = []; // your API call goes here
        if (remoteErrors.length > 0) {
          return {status: 'fail', errors: remoteErrors};
        }

        return {status: 'success'};
      },
    });  

    const contextBar = dirty ? (
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
      ) : null;

    const errorBanner =
      submitErrors.length > 0 ? (
        <Layout.Section>
          <Banner status="critical">
            <p>There were some issues with your form submission:</p>
            <ul>
              {submitErrors.map(({message}, index) => {
                return <li key={`${message}${index}`}>{message}</li>;
              })}
            </ul>
          </Banner>
        </Layout.Section>
      ) : null;  

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