import User from "@/models/User";
import { connectDB } from "@/libs/mongodb";

// Establish database connection
connectDB();

export async function GET(req) {
  try {
    const users = await User.find();
    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new Response('Error fetching users', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const newUser = new User({ name, email, password });
    await newUser.save();
    return new Response(JSON.stringify({ message: "User created!" }), {
      status: 201,
    });
  } catch (error) {
    return new Response('Error creating user', { status: 500 });
  }
}
