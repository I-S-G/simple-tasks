import { Container } from "@mantine/core";
import SignUp from "../../components/Sign Up/sign-up.component";
import SignIn from "../../components/Sign In/sign-in.component";
import { useMediaQuery } from "react-responsive";

import { useUserStore } from "../../store/user-store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./authentication.styles.scss";

export default function Authentication() {

    const currentUser = useUserStore((store) => store.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        } 
    }, [currentUser])

    return (
        <Container size= "md" className="auth">
            <SignIn />
            <SignUp />
        </Container>
    )
}