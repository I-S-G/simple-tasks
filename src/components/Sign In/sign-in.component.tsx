import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createUser } from "../../utils/firebase/firebase.utils";
import { useTaskStore } from "../../store/tasks-store";

import { Button } from "@mantine/core";

import { signInWithEmail, signInWithGoogle } from "../../utils/firebase/firebase.utils";

type SignInInputTypes = {
    email: string,
    password: string,
    confirmPassword: string
}

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 characters"),
});

export default function SignIn() {

    const tasks = useTaskStore((store) => store.tasks);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset

    } = useForm<SignInInputTypes>({
        resolver: zodResolver(signInSchema)
    });

    const onSignIn: SubmitHandler<SignInInputTypes> = async (data) => {
        const { email, password } = data;
        await signInWithEmail(email, password);
        reset();
    }

    const onGoogleSignIn = async () => {
        try {
            const { user } = await signInWithGoogle();
            await createUser(user, tasks);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h2> I have an account </h2>
            <form onSubmit={handleSubmit(onSignIn)} className="auth-form">
                <input {...register("email")} placeholder="Email"  />
                    {
                        errors.email && <p> {`${errors.email.message}`} </p>
                    }
                <input {...register("password")} placeholder="Password"  type="password"  />
                    {
                        errors.password && <p> {`${errors.password.message}`} </p>
                    }
                <div className="buttons">
                    <Button type="submit"> sign in </Button>
                    <Button onClick={onGoogleSignIn}> sign in with google</Button>
                </div>
            </form>  
        </div>
    )
}