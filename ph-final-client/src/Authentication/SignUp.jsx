import React from 'react';
import { useForm } from "react-hook-form"


const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    console.log(watch("example")) // watch input value by passing the name of it

    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="Enter your name" {...register("name")} />
        <input defaultValue="Enter your email" {...register("email")} />
        <input defaultValue="Enter your password" {...register("password")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("name", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {/* {errors.name && <span>This field is required</span>} */}

        <input type="submit" />
      </form>
    );
}
export default SignUp