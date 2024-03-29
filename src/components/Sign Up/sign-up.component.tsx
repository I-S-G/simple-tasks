import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTaskStore } from "../../store/tasks-store";

import { Button, TextInput } from "@mantine/core";

import { signUpWithEmail, createUser } from "../../utils/firebase/firebase.utils";
import "./sign-up.styles.scss";

type SignUpInputTypes = {
    email: string,
    password: string,
    confirmPassword: string
}

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

export default function SignUp() {

    const tasks = useTaskStore((store) => store.tasks);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset

    } = useForm<SignUpInputTypes>({
        resolver: zodResolver(signUpSchema)
    });

    const onSignUp: SubmitHandler<SignUpInputTypes> = async (data) => {
        const { email, password } = data;
        const { user } = await signUpWithEmail(email, password);
        await createUser(user, tasks);
        console.log(user);
        reset();
    }

    return (
        <div className="auth-component">
            <h2> I don't have an account </h2>
            <form onSubmit={handleSubmit(onSignUp)} className="auth-form">
                <TextInput {...register("email")} placeholder="Email"  />
                    {
                        errors.email && <p> {`${errors.email.message}`} </p>
                    }
                <TextInput {...register("password")} placeholder="Password" type="password"  />
                    {
                        errors.password && <p> {`${errors.password.message}`} </p>
                    }
                <TextInput {...register("confirmPassword")} placeholder="Confirm password" type="password"   />
                    {
                        errors.confirmPassword && <p> {`${errors.confirmPassword.message}`} </p>
                    }
                <div className="buttons">
                    <Button type="submit"> sign up </Button>
                </div>
            </form>  
        </div>
    )
}