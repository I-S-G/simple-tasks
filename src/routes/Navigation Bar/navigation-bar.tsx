import { Outlet, Link ,useNavigate } from "react-router-dom";

import { Button, Container } from "@mantine/core";
import { useUserStore } from "../../store/user-store";

import "./navigation-bar.styles.scss";
import { logOut } from "../../utils/firebase/firebase.utils";
import { useTaskStore } from "../../store/tasks-store";

export default function NavigationBar () {

    const currentUser = useUserStore((store) => store.currentUser);
    const setTasks = useTaskStore((store) => store.setTasks);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/auth");
    }

    const handleSignOut = async () => {
        await logOut();
        setTasks([]);
    }

    return (
        <>
            <Container size= "xl" className="nav-bar" >
                <Link to="/">
                    <p> simple tasks </p> 
                </Link>
                {
                    currentUser? (
                        <Button color="#4e399b" size="md" radius="md" onClick={handleSignOut}>sign out</Button>
                    ): (
                        <Button color="#4e399b" size="md" radius="md" onClick={handleClick}> sign up</Button>
                    )
                }
            </Container>
            <Outlet />
        </>
    )
}