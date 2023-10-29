import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@mantine/core";

import { signInWithEmail } from "../../utils/firebase/firebase.utils";

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

    return (
        <>
            <form onSubmit={handleSubmit(onSignIn)}>
                <input {...register("email")} placeholder="email"  />
                    {
                        errors.email && <p> {`${errors.email.message}`} </p>
                    }
                <input {...register("password")} placeholder="password"  />
                    {
                        errors.password && <p> {`${errors.password.message}`} </p>
                    }
                <Button type="submit"> sign up </Button>
            </form>  
        </>
    )
}