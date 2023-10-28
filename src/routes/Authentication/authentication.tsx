import { Container } from "@mantine/core";
import SignUp from "../../components/Sign Up/sign-up.component";
import SignIn from "../../components/Sign In/sign-in.component";

import { useUserStore } from "../../store/user-store";
import { useNavigate } from "react-router-dom";

export default function Authentication() {

    const currentUser = useUserStore((store) => store.currentUser);
    const navigate = useNavigate();

    if (currentUser) navigate("/")
    else {
        return (
            <Container size= "xl">
                <SignUp />
                <SignIn />
            </Container>
        )
    }
}