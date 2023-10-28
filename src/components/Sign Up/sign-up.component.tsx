import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTaskStore } from "../../store/tasks-store";

import { Button } from "@mantine/core";

import { signUpWithEmail, createUser } from "../../utils/firebase/firebase.utils";

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
        <>
            <form onSubmit={handleSubmit(onSignUp)}>
                <input {...register("email")} placeholder="email"  />
                    {
                        errors.email && <p> {`${errors.email.message}`} </p>
                    }
                <input {...register("password")} placeholder="password"  />
                    {
                        errors.password && <p> {`${errors.password.message}`} </p>
                    }
                <input {...register("confirmPassword")} placeholder="confirm password"  />
                    {
                        errors.confirmPassword && <p> {`${errors.confirmPassword.message}`} </p>
                    }
                <Button type="submit"> sign up </Button>
            </form>  
        </>
    )
}