import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Box,
  Group,
  Space,
  Button,
  Text,
  MediaQuery,
  Burger,
  ActionIcon,
  Anchor,
  Breadcrumbs,
  useMantineTheme,
} from '@mantine/core';
import AddTripForm from "../../../components/trip/addTripForm";
import { signOut } from "../../../util/auth";
import CustomAppShell from "../../../components/customAppShell";

export default function AddTrip() {


  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const signout = () => {
    signOut();
    router.push("/login")
  }

  const items = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Trips', href: '/dashboard/trips' },
    { title: 'Add Trip', href: '/dashboard/trips/add' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <CustomAppShell>
      <Breadcrumbs className="ml-7 mb-4">{items}</Breadcrumbs>
      <AddTripForm />
    </CustomAppShell>
  )
}