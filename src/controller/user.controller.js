import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from '../models/user.models.js'
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const {fullname, email, username, password} = req.body
    console.log("email: ", email);
    
    if(
        [fullname, email, username, password].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are requried")
    }
    const exitedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(exitedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

   const avatarLocalPath = req.files?.avatar[0]?.path
//    const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    } 

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is requried")
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage =  await uploadToCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is requried")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export {registerUser}