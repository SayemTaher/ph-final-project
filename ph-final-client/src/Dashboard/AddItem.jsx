import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../Components/SectionTitle';
import { ImSpoonKnife } from "react-icons/im";
import useAxiosPublic from '../Custom/AxiosPublic/useAxiosPublic';
import useAxios from '../Custom/CustomAxios/useAxios';
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
 const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItem = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxios()
    const onSubmit = async(data) => {
         const imageFile = { image: data.image[0] };
        console.log(data);
        const res = await axiosPublic.post(image_hosting_url, imageFile, {
            headers: {
                'content-Type' : 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe
            }
            const sendMenutoServer = await axiosSecure.post('/menu', menuItem)
            console.log(sendMenutoServer.data)
            if (sendMenutoServer.data.insertedId) {
                Swal.fire({
                  title: "Success!",
                  text: "Your item has been added.",
                  icon: "success",
                });
                
            }


        }
        console.log(res.data)
    }
        
       
    
    return (
      <div>
        <SectionTitle
          heading="Add Item to the Menu"
          subHeading="Add your latest favourite item"
        ></SectionTitle>
        <div className="border-2 flex flex-col justify-center  border-dashed border-blue-900 p-5 rounded-md">
          <form
            className="grid grid-cols-1  gap-10  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter dish name"
              className="input input-bordered w-full "
            />
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Mention the price"
              className="input input-bordered w-full "
            />
            <textarea
              type="text"
              {...register("recipe", { required: true })}
              placeholder="Write recipe details"
              className="textarea textarea-bordered textarea-lg w-full "
            />
            <select
              className="select select-bordered w-full "
                        {...register("category", { required: true })}
                        defaultValue='default'
            >
              <option disabled value='default'>
                Select a category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full "
                    />
                    <div>
                        <button type='submit' className='btn w-[200px] btn-primary text-white flex items-center gap-2'><ImSpoonKnife></ImSpoonKnife> Add Item</button>
                    </div>
            
          </form>
        </div>
      </div>
    );
};

export default AddItem;