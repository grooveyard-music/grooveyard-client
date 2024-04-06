
import { Container,} from "@mantine/core";

import { Outlet } from "react-router-dom";
import { SettingsSidebar } from "../components/SettingsSidebar";


export const SettingsPage = () => {

  return (
    <Container size="xl" className="min-h-screen flex mt-20">
    <SettingsSidebar />
    <Outlet /> 
  </Container>
  );
};



