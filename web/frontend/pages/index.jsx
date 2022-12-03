import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { CreateCustomer } from "../components";

import { CustomerCard } from "../components";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <CustomerCard />
          <CreateCustomer />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
